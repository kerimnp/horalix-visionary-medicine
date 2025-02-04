import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    package: "",
    subscribe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const selectedPackage = sessionStorage.getItem("selectedPackage");
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        message: `I'm interested in the ${selectedPackage} Package.\n\nMy requirements are: `,
        package: selectedPackage
      }));
      sessionStorage.removeItem("selectedPackage");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // First, save contact submission to database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message,
          package: formData.package || null
        }]);

      if (dbError) {
        console.error('Supabase error:', dbError);
        throw dbError;
      }

      // If user wants to subscribe, add them to subscribers
      if (formData.subscribe) {
        const { error: subscribeError } = await supabase
          .from('subscribers')
          .insert([{
            name: formData.name,
            email: formData.email
          }]);

        if (subscribeError && !subscribeError.message.includes('unique constraint')) {
          console.error('Subscription error:', subscribeError);
          throw subscribeError;
        }
      }

      // Send welcome email
      const { error: welcomeError } = await supabase.functions.invoke('send-welcome-email', {
        body: {
          name: formData.name,
          email: formData.email,
          type: 'contact'
        },
      });

      if (welcomeError) {
        console.error('Welcome email error:', welcomeError);
        throw welcomeError;
      }

      // If subscribed, send subscriber welcome email
      if (formData.subscribe) {
        const { error: subscriberWelcomeError } = await supabase.functions.invoke('send-welcome-email', {
          body: {
            name: formData.name,
            email: formData.email,
            type: 'subscriber'
          },
        });

        if (subscriberWelcomeError) {
          console.error('Subscriber welcome email error:', subscriberWelcomeError);
          // Don't throw here as the main submission was successful
        }
      }

      // Send notification email to admin
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          package: formData.package,
          subscribe: formData.subscribe
        }
      });

      if (emailError) {
        console.error('Email sending error:', emailError);
        throw emailError;
      }

      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", message: "", package: "", subscribe: false });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20" id="contact" itemScope itemType="https://schema.org/ContactPage">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-medical-electric bg-medical-electric/10 rounded-full">
          Get in Touch
        </span>
        <h2 className="text-4xl font-bold text-medical-deep mb-4" itemProp="name">Contact Us</h2>
        <p className="text-xl text-medical-deep/60 max-w-2xl mx-auto" itemProp="description">
          {formData.package 
            ? `Tell us more about your needs for the ${formData.package} Package`
            : "Transform your healthcare facility with AI-powered solutions"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-8 glass-card p-8 rounded-xl"
        itemScope
        itemType="https://schema.org/ContactForm"
      >
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-medical-deep">
            Full Name *
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full"
            placeholder="Dr. John Smith"
            itemProp="name"
            aria-label="Your full name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-medical-deep">
            Professional Email *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full"
            placeholder="john.smith@hospital.com"
            itemProp="email"
            aria-label="Your professional email address"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-medical-deep">
            Message *
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="w-full min-h-[150px]"
            placeholder="Tell us about your healthcare facility and requirements..."
            itemProp="description"
            aria-label="Your message"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="subscribe"
            checked={formData.subscribe}
            onCheckedChange={(checked) => 
              setFormData({ ...formData, subscribe: checked as boolean })
            }
          />
          <label
            htmlFor="subscribe"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Subscribe to our newsletter for updates and events
          </label>
        </div>

        <button 
          type="submit" 
          className="premium-button w-full group flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}