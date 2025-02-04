import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function EmailCampaigns() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !content) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSending(true);

    try {
      const { error } = await supabase.functions.invoke('send-campaign-email', {
        body: { subject, content }
      });

      if (error) throw error;

      toast.success("Campaign sent successfully!");
      setSubject("");
      setContent("");
    } catch (error) {
      console.error('Error sending campaign:', error);
      toast.error("Failed to send campaign. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
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
        <label htmlFor="content" className="text-sm font-medium">
          Email Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter email content..."
          className="min-h-[200px]"
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSending}
      >
        {isSending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Campaign"
        )}
      </Button>
    </form>
  );
}