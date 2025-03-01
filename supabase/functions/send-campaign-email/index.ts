
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  subject: string;
  content: string;
  replyTo: string;
  fromName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, content, replyTo, fromName = "Horalix Support" }: EmailRequest = await req.json();

    // Basic validation
    if (!subject || !content || !replyTo) {
      throw new Error("Missing required fields: subject, content, or replyTo");
    }

    const supabaseClient = await getSupabaseClient();

    // Fetch all active subscribers
    const { data: subscribers, error: fetchError } = await supabaseClient
      .from('subscribers')
      .select('email, name')
      .eq('status', 'active');

    if (fetchError) {
      console.error("Error fetching subscribers:", fetchError);
      throw new Error("Failed to fetch subscribers");
    }

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ message: "No active subscribers found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Sending campaign to ${subscribers.length} subscribers`);

    // Process subscribers in batches to avoid rate limits
    const batchSize = 10;
    const results = [];
    const failures = [];

    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      // Process each subscriber in the batch
      const batchPromises = batch.map(async (subscriber) => {
        try {
          // IMPORTANT: Using a verified sending domain from Resend
          // Using onboarding@resend.dev as the FROM address which is pre-verified
          // Setting the reply-to header to the custom address
          const emailResponse = await resend.emails.send({
            from: `${fromName} <onboarding@resend.dev>`,
            to: [subscriber.email],
            reply_to: replyTo, // This is the correct property name for reply-to
            subject: subject,
            html: content,
          });

          console.log(`Email sent to ${subscriber.email}:`, emailResponse);
          return { success: true, email: subscriber.email, id: emailResponse.id };
        } catch (error) {
          console.error(`Failed to send to ${subscriber.email}:`, error);
          failures.push({ email: subscriber.email, error: error.message });
          return { success: false, email: subscriber.email, error: error.message };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Introduce a small delay between batches to avoid rate limits
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successCount = results.filter(r => r.success).length;
    
    return new Response(
      JSON.stringify({
        message: `Campaign sent to ${successCount} of ${subscribers.length} subscribers`,
        failureCount: failures.length,
        failures: failures.length > 0 ? failures : undefined
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error) {
    console.error("Error in send-campaign-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

// Helper function to get Supabase client
const getSupabaseClient = async () => {
  const { createClient } = await import("https://esm.sh/@supabase/supabase-js");
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  
  return createClient(supabaseUrl, supabaseKey);
};

serve(handler);
