import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface EmailConfig {
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_pass: string;
  from_email: string;
  to_email: string;
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate form data
function validateFormData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length === 0) {
    errors.push('Subject is required');
  }

  if (!data.message || typeof data.message !== 'string' || data.message.trim().length === 0) {
    errors.push('Message is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Send email notification
async function sendEmailNotification(formData: ContactFormData, emailConfig: EmailConfig) {
  try {
    const emailBody = `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Submitted at: ${new Date().toISOString()}
    `.trim();

    // Using SMTP with basic authentication
    const emailPayload = {
      from: emailConfig.from_email,
      to: emailConfig.to_email,
      subject: `New Contact Form: ${formData.subject}`,
      text: emailBody,
      html: emailBody.replace(/\n/g, '<br>')
    };

    // For demonstration, we'll use a simple SMTP approach
    // In production, you might want to use SendGrid, Mailgun, or similar
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'your_service_id', // You'll need to configure this
        template_id: 'your_template_id', // You'll need to configure this
        user_id: 'your_user_id', // You'll need to configure this
        template_params: {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: emailConfig.to_email
        }
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Parse request body
    const formData: ContactFormData = await req.json()

    // Validate form data
    const validation = validateFormData(formData)
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ 
          error: 'Validation failed', 
          details: validation.errors 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Save to database
    const { data: dbData, error: dbError } = await supabase
      .from('contact_submissions') // You can change this table name
      .insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          submitted_at: new Date().toISOString(),
          ip_address: req.headers.get('x-forwarded-for') || 'unknown'
        }
      ])
      .select()

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save submission', 
          details: dbError.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Email configuration (you'll need to set these environment variables)
    const emailConfig: EmailConfig = {
      smtp_host: Deno.env.get('SMTP_HOST') || 'smtp.gmail.com',
      smtp_port: parseInt(Deno.env.get('SMTP_PORT') || '587'),
      smtp_user: Deno.env.get('SMTP_USER') || '',
      smtp_pass: Deno.env.get('SMTP_PASS') || '',
      from_email: Deno.env.get('FROM_EMAIL') || '',
      to_email: Deno.env.get('TO_EMAIL') || ''
    }

    // Send email notification (optional - won't fail if email fails)
    let emailSent = false
    if (emailConfig.smtp_user && emailConfig.to_email) {
      emailSent = await sendEmailNotification(formData, emailConfig)
    }

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        data: {
          id: dbData?.[0]?.id,
          submitted_at: dbData?.[0]?.submitted_at,
          email_sent: emailSent
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})