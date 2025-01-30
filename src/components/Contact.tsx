import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    package: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if there's a selected package in sessionStorage
    const selectedPackage = sessionStorage.getItem("selectedPackage");
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        message: `I'm interested in the ${selectedPackage} Package. ${prev.message}`,
        package: selectedPackage
      }));
      // Clear the sessionStorage after using it
      sessionStorage.removeItem("selectedPackage");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", message: "", package: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-medical-deep mb-4">Contact Us</h2>
        <p className="text-xl text-medical-deep/60">
          {formData.package 
            ? `Tell us more about your needs for the ${formData.package} Package`
            : "Get in touch with our team of experts"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto space-y-6 glass-card p-8 rounded-xl"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-medical-deep mb-2">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full"
            placeholder="Your name"
            itemProp="name"
            aria-label="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-medical-deep mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full"
            placeholder="your@email.com"
            itemProp="email"
            aria-label="Your email address"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-medical-deep mb-2">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="w-full min-h-[150px]"
            placeholder="How can we help you?"
            itemProp="description"
            aria-label="Your message"
          />
        </div>

        <button 
          type="submit" 
          className="premium-button w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}