// supabase/functions/contact-form/index.js
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import emailjs from "https://cdn.jsdelivr.net/npm/emailjs-com/dist/email.min.js";

// ----- Environment Variables -----
const SUPABASE_URL = Deno.env.get("SUPABASE_URL"); // e.g., https://your-project.supabase.co
const SUPABASE_KEY = Deno.env.get("SUPABASE_ANON_KEY");
const TABLE_NAME = "contact_submissions";

const EMAILJS_SERVICE_ID = Deno.env.get("EMAILJS_SERVICE_ID");
const EMAILJS_TEMPLATE_ID = Deno.env.get("EMAILJS_TEMPLATE_ID");
const EMAILJS_USER_ID = Deno.env.get("EMAILJS_USER_ID");

// ----- Supabase Client -----
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
    }

    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validation
    const errors = [];
    if (!name) errors.push("Name is required");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Valid email is required");
    if (!subject) errors.push("Subject is required");
    if (!message) errors.push("Message is required");

    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: "Validation failed", details: errors }), { status: 400 });
    }

    // Save to Supabase
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert([{ name, email, subject, message, submitted_at: new Date().toISOString() }]);

    if (error) throw error;

    // Send Email via EmailJS
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      { name, email, subject, message },
      EMAILJS_USER_ID
    );

    return new Response(JSON.stringify({ success: true, message: "Form submitted successfully", data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
