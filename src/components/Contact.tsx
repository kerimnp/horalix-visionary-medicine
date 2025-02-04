import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    package: "",
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
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message,
          package: formData.package || null
        }]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", message: "", package: "" });
      sessionStorage.removeItem("selectedPackage");
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20" itemScope itemType="https://schema.org/ContactPage">
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