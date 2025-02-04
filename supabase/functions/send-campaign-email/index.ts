import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CampaignEmailRequest {
  subject: string;
  content: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting campaign email send process...");
    const { subject, content }: CampaignEmailRequest = await req.json();

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch all active subscribers
    console.log("Fetching active subscribers...");
    const { data: subscribers, error: fetchError } = await supabaseClient
      .from('subscribers')
      .select('email, name')
      .eq('status', 'active');

    if (fetchError) {
      console.error('Error fetching subscribers:', fetchError);
      throw new Error('Failed to fetch subscribers');
    }

    if (!subscribers || subscribers.length === 0) {
      console.log("No active subscribers found");
      return new Response(
        JSON.stringify({ message: "No active subscribers found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Found ${subscribers.length} active subscribers`);

    // Send emails to all subscribers one by one
    const emailResults = [];
    for (const subscriber of subscribers) {
      try {
        console.log(`Sending email to ${subscriber.email}...`);
        const emailResult = await resend.emails.send({
          from: "Horalix <onboarding@resend.dev>",
          to: subscriber.email,
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
                    <h1>Hello ${subscriber.name}!</h1>
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
        });
        
        console.log(`Email sent successfully to ${subscriber.email}`);
        emailResults.push({ email: subscriber.email, status: 'success', result: emailResult });
        
        // Add a delay between emails to prevent rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error sending email to ${subscriber.email}:`, error);
        emailResults.push({ email: subscriber.email, status: 'error', error: error.message });
      }
    }

    const successCount = emailResults.filter(r => r.status === 'success').length;
    const failureCount = emailResults.filter(r => r.status === 'error').length;

    console.log(`Campaign completed. Success: ${successCount}, Failures: ${failureCount}`);

    return new Response(
      JSON.stringify({ 
        message: `Campaign sent successfully to ${successCount} subscribers${failureCount > 0 ? `, ${failureCount} failed` : ''}`,
        results: emailResults 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending campaign:", error);
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