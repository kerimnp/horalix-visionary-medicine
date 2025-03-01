
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, AlertTriangle, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function EmailCampaigns() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState("onboarding@resend.dev");
  const [fromName, setFromName] = useState("Horalix Support");
  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [totalSubscribers, setTotalSubscribers] = useState(0);

  const handleSendCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!replyTo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) {
      toast.error("Please enter a valid reply-to email address");
      return;
    }

    // Check if using a non-verified domain and warn the user
    if (!replyTo.includes("resend.dev") && !replyTo.includes("gmail.com")) {
      const confirmed = window.confirm(
        "Important: You're using a custom domain for Reply-To. Make sure this domain is verified with Resend.com or replies will bounce. Continue?"
      );
      if (!confirmed) return;
    }

    setIsSending(true);
    setSendingProgress(0);

    try {
      // First check total subscriber count
      const { data: subscriberCount, error: countError } = await supabase
        .from('subscribers')
        .select('count')
        .eq('status', 'active')
        .single();
      
      if (countError) {
        console.error('Error counting subscribers:', countError);
        throw new Error('Failed to count subscribers');
      }

      setTotalSubscribers(subscriberCount.count);
      
      // Send the campaign
      const { data, error } = await supabase.functions.invoke('send-campaign-email', {
        body: { 
          subject, 
          content, 
          replyTo,
          fromName 
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error('No response from server');
      }

      toast.success(data.message || "Campaign sent successfully to all subscribers!");
      setSubject("");
      setContent("");
    } catch (error: any) {
      console.error('Error sending campaign:', error);
      toast.error(error.message || "Failed to send campaign. Please try again.");
    } finally {
      setIsSending(false);
      setSendingProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Emails will be sent to all active subscribers. Please use this feature responsibly.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-600" />
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Important:</strong> For Reply-To emails to work properly, your domain (e.g., horalix.com) must be verified with Resend.com. 
              Until verification is complete, use onboarding@resend.dev for testing.
            </p>
            <a 
              href="https://resend.com/domains" 
              target="_blank"
              rel="noopener noreferrer" 
              className="text-sm text-blue-600 hover:underline mt-1 inline-block"
            >
              Verify your domain →
            </a>
          </div>
        </div>
      </div>

      <form onSubmit={handleSendCampaign} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Email Subject
          </label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter email subject..."
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="fromName" className="text-sm font-medium">
            From Name
          </label>
          <Input
            id="fromName"
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
            placeholder="Sender's name (e.g., Horalix Support)..."
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="replyTo" className="text-sm font-medium">
            Reply-To Email
          </label>
          <Input
            id="replyTo"
            type="email"
            value={replyTo}
            onChange={(e) => setReplyTo(e.target.value)}
            placeholder="Email address for replies..."
            required
          />
          <p className="text-xs text-gray-500">
            <strong>Domain verification required:</strong> For custom domains (like @horalix.com), you must verify domain ownership in Resend.com. Until then, use onboarding@resend.dev.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Email Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter email content (HTML is supported)..."
            className="min-h-[200px]"
            required
          />
        </div>

        {isSending && totalSubscribers > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${(sendingProgress / totalSubscribers) * 100}%` }}
            ></div>
            <p className="text-xs text-center mt-1">
              Sending: {sendingProgress} of {totalSubscribers} emails
            </p>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full"
          disabled={isSending}
        >
          {isSending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending to all subscribers...
            </>
          ) : (
            "Send Campaign"
          )}
        </Button>
      </form>
    </div>
  );
}
