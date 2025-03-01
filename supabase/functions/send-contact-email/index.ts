
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
  package?: string;
  subscribe: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message, package: packageName, subscribe }: ContactFormRequest = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      throw new Error("Missing required fields: name, email, or message");
    }

    // Send notification to admin
    const emailResponse = await resend.emails.send({
      from: "Horalix Contact Form <onboarding@resend.dev>",
      to: ["support@horalix.com"], // Change this to your admin email
      reply_to: email, // Set reply-to as the contact's email
      subject: `New Contact Form Submission${packageName ? ` - ${packageName} Package` : ''}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${packageName ? `<p><strong>Package:</strong> ${packageName}</p>` : ''}
        <p><strong>Subscribed to newsletter:</strong> ${subscribe ? 'Yes' : 'No'}</p>
        <h2>Message:</h2>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify(emailResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
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
