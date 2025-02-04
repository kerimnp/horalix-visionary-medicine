import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  firstName: string;
  lastName: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName }: EmailRequest = await req.json();
    
    // For testing, we'll send all emails to your verified email
    const testEmail = "kerim.sabic@gmail.com";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "Horalix Demo <demo@horalix.com>",
        to: [testEmail],
        subject: "Your Horalix Demo Access",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #0A2540; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; background-color: #f9f9f9; }
                .footer { text-align: center; padding: 20px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Welcome to Horalix Demo</h1>
                </div>
                <div class="content">
                  <p>Hello ${firstName},</p>
                  <p>Thank you for expressing interest in Horalix AI Medical Suite. We're excited to show you how our platform can help streamline your processes and add value to your organization.</p>
                  <p>You can access our demo at: antibiotikapp.netlify.com</p>
                  <p>I'd be happy to schedule a personalized demo at your earliest convenience. Could you please let me know a few dates and times that work best for you? Once we settle on a time, I will send over a calendar invite with all the necessary details.</p>
                  <p>In the meantime, feel free to let me know if there are any specific features or topics you would like us to focus on during the demo. We want to make sure the session is as relevant and helpful for you as possible.</p>
                  <p>Thank you again for your interest. I look forward to hearing from you and demonstrating how Horalix can support your goals.</p>
                </div>
                <div class="footer">
                  <p>Best regards,<br>Horalix Team<br>support@horalix.com</p>
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send email: ${await res.text()}`);
    }

    const data = await res.json();
    console.log("Demo email sent successfully:", data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Error in send-demo-email function:", error);
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