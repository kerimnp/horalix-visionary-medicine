import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "./ui/use-toast";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would typically send the data to your backend
      // For now, we'll just show a success message
      toast({
        title: "Demo Request Received!",
        description: "We'll send you an email with the demo link shortly.",
      });
      
      // Email template with the demo link
      const emailSubject = "Your Horalix Demo Access";
      const emailBody = `
Hello ${formData.firstName},

I hope you're doing well. Thank you for expressing interest in Horalix AI Medical Suite. We're excited to show you how our platform can help streamline your processes and add value to your organization.

You can access our demo at: antibiotikapp.netlify.com

I'd be happy to schedule a personalized demo at your earliest convenience. Could you please let me know a few dates and times that work best for you? Once we settle on a time, I will send over a calendar invite with all the necessary details.

In the meantime, feel free to let me know if there are any specific features or topics you would like us to focus on during the demo. We want to make sure the session is as relevant and helpful for you as possible.

Thank you again for your interest. I look forward to hearing from you and demonstrating how Horalix can support your goals.

Best regards,
Horalix Team
support@horalix.com
      `;

      // Store the user data (you would typically do this in a database)
      console.log("Demo request data:", formData);
      console.log("Email template:", { subject: emailSubject, body: emailBody });

      onClose();
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
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
            />
          </div>
          <button type="submit" className="w-full premium-button">
            Request Demo
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}