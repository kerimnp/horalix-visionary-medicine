import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailCampaignRequest {
  subject: string;
  content: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, content }: EmailCampaignRequest = await req.json();

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Fetch all active subscribers
    const { data: subscribers, error: fetchError } = await supabaseClient
      .from('subscribers')
      .select('email, name')
      .eq('status', 'active');

    if (fetchError) throw fetchError;

    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ message: "No active subscribers found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Sending campaign to ${subscribers.length} subscribers`);

    // Send emails to all subscribers
    const emailPromises = subscribers.map(subscriber => 
      resend.emails.send({
        from: "Horalix <onboarding@resend.dev>",
        to: subscriber.email,
        subject: subject,
        html: `
          <h1>Hello ${subscriber.name}!</h1>
          ${content}
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            To unsubscribe, please contact support.
          </p>
        `,
      })
    );

    await Promise.all(emailPromises);

    console.log("Campaign sent successfully to all subscribers");

    return new Response(
      JSON.stringify({ message: "Campaign sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
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