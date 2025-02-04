import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
  package?: string;
  subscribe?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message, package: selectedPackage, subscribe }: ContactEmailRequest = await req.json();

    // For testing, we'll send all emails to your verified email
    const testEmail = "kerim.sabic@gmail.com";

    // Send notification to owner
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "Horalix Contact <onboarding@resend.dev>",
        to: [testEmail],
        subject: `Nova Poruka sa Kontakt Forme${selectedPackage ? ` - ${selectedPackage} Paket` : ''}`,
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
                  <h1>Nova Poruka sa Kontakt Forme</h1>
                </div>
                <div class="content">
                  <h2>Detalji Kontakta:</h2>
                  <p><strong>Ime:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  ${selectedPackage ? `<p><strong>Paket:</strong> ${selectedPackage}</p>` : ''}
                  ${subscribe ? `<p><strong>Pretplata:</strong> Da</p>` : ''}
                  <h2>Poruka:</h2>
                  <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
                <div class="footer">
                  <p>Ova poruka je poslana preko Horalix kontakt forme.</p>
                </div>
              </div>
            </body>
          </html>
        `,
        reply_to: email
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to send owner notification: ${await res.text()}`);
    }

    console.log("Owner notification email sent:", await res.json());

    // Send confirmation to sender
    const senderRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      },
      body: JSON.stringify({
        from: "Horalix <onboarding@resend.dev>",
        to: [testEmail],
        subject: "Hvala na poruci | Thank you for contacting Horalix",
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
                  <h1>Hvala na poruci!</h1>
                </div>
                <div class="content">
                  <p>Poštovani/a ${name},</p>
                  <p>Hvala vam što ste nas kontaktirali. Naš tim će pregledati vašu poruku i javiti vam se u najkraćem mogućem roku.</p>
                  ${subscribe ? '<p>Hvala vam što ste se pretplatili na naš newsletter!</p>' : ''}
                  <br>
                  <p>Dear ${name},</p>
                  <p>Thank you for contacting us. Our team will review your message and get back to you as soon as possible.</p>
                  ${subscribe ? '<p>Thank you for subscribing to our newsletter!</p>' : ''}
                </div>
                <div class="footer">
                  <p>Horalix - Vodeća AI Healthcare Tehnologija u Bosni</p>
                  <p>Leading AI Healthcare Technology in Bosnia</p>
                </div>
              </div>
            </body>
          </html>
        `
      }),
    });

    if (!senderRes.ok) {
      throw new Error(`Failed to send confirmation email: ${await senderRes.text()}`);
    }

    console.log("Sender confirmation email sent:", await senderRes.json());

    return new Response(
      JSON.stringify({ message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
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