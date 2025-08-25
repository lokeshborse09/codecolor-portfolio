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

interface EmailJSConfig {
  service_id: string;
  template_id: string;
  user_id: string;
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

// Send email notification using EmailJS
async function sendEmailNotification(formData: ContactFormData, emailConfig: EmailJSConfig) {
  try {
    const emailPayload = {
      service_id: emailConfig.service_id,
      template_id: emailConfig.template_id,
      user_id: emailConfig.user_id,
      template_params: {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Lokesh Borse', // Your name
        reply_to: formData.email
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('EmailJS API error:', errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

// Get client IP address
function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  return forwarded?.split(',')[0] || realIP || cfConnectingIP || 'unknown';
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
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
      );
    }

    // Parse request body
    const formData: ContactFormData = await req.json();

    // Validate form data
    const validation = validateFormData(formData);
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
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create Supabase client
    const { createClient } = await import('npm:@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get client IP address
    const clientIP = getClientIP(req);

    // Save to database
    const { data: dbData, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          submitted_at: new Date().toISOString(),
          ip_address: clientIP
        }
      ])
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to save submission', 
          details: dbError.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // EmailJS configuration
    const emailConfig: EmailJSConfig = {
      service_id: Deno.env.get('EMAILJS_SERVICE_ID') || '',
      template_id: Deno.env.get('EMAILJS_TEMPLATE_ID') || '',
      user_id: Deno.env.get('EMAILJS_USER_ID') || ''
    };

    // Send email notification
    let emailSent = false;
    if (emailConfig.service_id && emailConfig.template_id && emailConfig.user_id) {
      emailSent = await sendEmailNotification(formData, emailConfig);
    } else {
      console.warn('EmailJS configuration incomplete - email not sent');
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
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});