
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CampaignEmailRequest {
  subject: string;
  content: string;
  replyTo?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Starting campaign email send process...");
    const { subject, content, replyTo = "support@horalix.com" }: CampaignEmailRequest = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    // We'll process emails in batches to avoid rate limits
    const batchSize = 20;
    const batches = [];
    
    for (let i = 0; i < subscribers.length; i += batchSize) {
      batches.push(subscribers.slice(i, i + batchSize));
    }
    
    console.log(`Split ${subscribers.length} subscribers into ${batches.length} batches`);
    
    let successCount = 0;
    let failureCount = 0;
    const failedEmails = [];

    // Process each batch sequentially
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      console.log(`Processing batch ${batchIndex + 1} of ${batches.length} (${batch.length} subscribers)`);
      
      // Send emails in the current batch concurrently
      const emailPromises = batch.map(async (subscriber) => {
        try {
          console.log(`Sending campaign email to ${subscriber.email}...`);
          
          const res = await resend.emails.send({
            from: "Horalix <support@horalix.com>",
            reply_to: replyTo,
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
                      <p>To unsubscribe, please reply with "unsubscribe" in the subject line.</p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          });

          if (!res.id) {
            throw new Error(`Failed to send email to ${subscriber.email}`);
          }

          console.log(`Successfully sent email to ${subscriber.email} with ID: ${res.id}`);
          return { email: subscriber.email, status: 'success', id: res.id };
        } catch (error) {
          console.error(`Error sending to ${subscriber.email}:`, error);
          failedEmails.push(subscriber.email);
          return { email: subscriber.email, status: 'error', error: error.message };
        }
      });

      // Wait for all emails in this batch to be sent
      const batchResults = await Promise.all(emailPromises);
      
      // Count successes and failures
      batchResults.forEach(result => {
        if (result.status === 'success') {
          successCount++;
        } else {
          failureCount++;
        }
      });
      
      // Add a small delay between batches to avoid rate limits
      if (batchIndex < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`Campaign sending completed: ${successCount} successes, ${failureCount} failures`);

    // Log any failed emails for later retry
    if (failedEmails.length > 0) {
      console.error('Failed to send to these emails:', failedEmails);
    }

    // Return appropriate response based on results
    if (failureCount > 0) {
      if (successCount > 0) {
        return new Response(
          JSON.stringify({ 
            message: `Campaign sent to ${successCount} subscribers with ${failureCount} failures`,
            successCount,
            failureCount,
            totalAttempted: subscribers.length
          }),
          {
            status: 207, // Partial success
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      } else {
        throw new Error(`Failed to send any emails. Check logs for details.`);
      }
    }

    return new Response(
      JSON.stringify({ 
        message: `Campaign sent successfully to all ${successCount} subscribers`,
        successCount
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
        error: error.message || "Failed to send campaign emails",
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
