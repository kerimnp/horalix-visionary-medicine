import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  firstName: string;
  lastName: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email }: EmailRequest = await req.json();

    const emailSubject = "Your Horalix Demo Access";
    const emailBody = `
Hello ${firstName},

I hope you're doing well. Thank you for expressing interest in Horalix AI Medical Suite. We're excited to show you how our platform can help streamline your processes and add value to your organization.

You can access our demo at: antibiotikapp.netlify.com

I'd be happy to schedule a personalized demo at your earliest convenience. Could you please let me know a few dates and times that work best for you? Once we settle on a time, I will send over a calendar invite with all the necessary details.

In the meantime, feel free to let me know if there are any specific features or topics you would like us to focus on during the demo. We want to make sure the session is as relevant and helpful for you as possible.

Thank you again for your interest. I look forward to hearing from you and demonstrating how Horalix can support your goals.

Best regards,
Horalix Team
support@horalix.com
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Horalix <onboarding@resend.dev>",
        to: [email],
        subject: emailSubject,
        html: emailBody.replace(/\n/g, "<br>"),
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${await res.text()}`);
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);