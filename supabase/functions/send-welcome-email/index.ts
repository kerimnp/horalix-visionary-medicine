import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  name: string;
  email: string;
  type: 'contact' | 'demo' | 'subscriber';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, type }: WelcomeEmailRequest = await req.json();
    
    // For testing, we'll send all emails to your verified email
    const testEmail = "kerim.sabic@gmail.com";

    console.log(`Sending welcome email to ${testEmail} (${type})`);

    let subject, content;
    switch (type) {
      case 'contact':
        subject = "Thank you for contacting Horalix";
        content = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to Horalix, ${name}!</h2>
            <p>Thank you for reaching out to us. We've received your message and our team will get back to you shortly.</p>
            <p>In the meantime, feel free to explore our solutions and learn more about how we can help transform your healthcare facility.</p>
            <p>Best regards,<br>The Horalix Team</p>
          </div>
        `;
        break;
      case 'demo':
        subject = "Welcome to Horalix Demo";
        content = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to Horalix, ${name}!</h2>
            <p>Thank you for requesting a demo. Our team will be in touch shortly to schedule your personalized demonstration.</p>
            <p>We're excited to show you how our AI-powered solutions can benefit your healthcare facility.</p>
            <p>Best regards,<br>The Horalix Team</p>
          </div>
        `;
        break;
      case 'subscriber':
        subject = "Welcome to Horalix Newsletter";
        content = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome to Horalix, ${name}!</h2>
            <p>Thank you for subscribing to our newsletter. You'll now receive updates about our latest features, healthcare insights, and industry news.</p>
            <p>We're excited to have you join our community of healthcare innovators.</p>
            <p>Best regards,<br>The Horalix Team</p>
          </div>
        `;
        break;
    }

    const emailResult = await resend.emails.send({
      from: "Horalix <onboarding@resend.dev>",
      to: [testEmail],
      subject: subject,
      html: content,
    });

    console.log("Welcome email sent successfully:", emailResult);

    return new Response(
      JSON.stringify({ message: "Welcome email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);