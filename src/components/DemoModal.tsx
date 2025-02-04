import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Sending demo request email...');
      // Send demo request email
      const { error: demoError } = await supabase.functions.invoke('send-demo-email', {
        body: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        },
      });

      if (demoError) {
        console.error('Demo email error:', demoError);
        throw demoError;
      }

      console.log('Sending welcome email...');
      // Send welcome email
      const { error: welcomeError } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          type: 'demo'
        },
      });

      if (welcomeError) {
        console.error('Welcome email error:', welcomeError);
        throw welcomeError;
      }

      toast({
        title: "Demo Request Received!",
        description: "We'll send you an email with the demo link shortly.",
      });

      onClose();
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error processing demo request:", error);
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Demo Access</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="w-full"
              placeholder="John"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="w-full"
              placeholder="Doe"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full"
              placeholder="john@example.com"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full"
              placeholder="+1234567890"
              disabled={isSubmitting}
            />
          </div>
          <button 
            type="submit" 
            className="w-full premium-button disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Request Demo"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}