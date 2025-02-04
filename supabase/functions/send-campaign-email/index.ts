import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CampaignEmailRequest {
  subject: string;
  content: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting campaign email send process...");
    const { subject, content }: CampaignEmailRequest = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch all active subscribers
    const { data: subscribers, error: fetchError } = await supabaseClient
      .from('subscribers')
      .select('email, name')
      .eq('status', 'active');

    if (fetchError) {
      console.error('Error fetching subscribers:', fetchError);
      throw new Error(`Failed to fetch subscribers: ${fetchError.message}`);
    }

    console.log(`Found ${subscribers?.length ?? 0} active subscribers`);

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ message: "No active subscribers found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email to each subscriber
    const emailPromises = subscribers.map(async (subscriber) => {
      try {
        console.log(`Sending campaign email to ${subscriber.email}...`);
        
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
          },
          body: JSON.stringify({
            from: "Horalix <support@horalix.com>",
            to: [subscriber.email],
            subject: subject,
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
                      <h1>Horalix Newsletter</h1>
                    </div>
                    <div class="content">
                      ${content}
                    </div>
                    <div class="footer">
                      <p>You're receiving this email because you subscribed to our newsletter.</p>
                      <p>To unsubscribe, please contact support.</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          }),
        });

        const responseText = await res.text();
        console.log(`Response for ${subscriber.email}:`, responseText);

        if (!res.ok) {
          throw new Error(`Failed to send email to ${subscriber.email}: ${responseText}`);
        }

        return { email: subscriber.email, status: 'success', response: responseText };
      } catch (error) {
        console.error(`Error sending to ${subscriber.email}:`, error);
        return { email: subscriber.email, status: 'error', error: error.message };
      }
    });

    // Wait for all emails to be sent
    const results = await Promise.all(emailPromises);
    console.log("Campaign email results:", results);

    // Check if any emails failed
    const failures = results.filter(result => result.status === 'error');
    if (failures.length > 0) {
      console.error(`Failed to send ${failures.length} emails:`, failures);
      throw new Error(`Failed to send ${failures.length} out of ${results.length} emails`);
    }

    return new Response(
      JSON.stringify({ 
        message: `Campaign sent successfully to ${results.length} subscribers`,
        results 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in campaign sending:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: "Check the function logs for more information"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);