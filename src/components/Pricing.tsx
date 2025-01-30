import { Check } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";

export function Pricing() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Store the selected package in sessionStorage so the contact form can access it
      sessionStorage.setItem("selectedPackage", selectedPackage);
      setIsInquiryModalOpen(false);
    }
  };

  const handleInquiry = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsInquiryModalOpen(true);
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-medical-deep mb-4 animate-fade-in">
          Premium Solutions
        </h2>
        <p className="text-xl text-medical-deep/60 animate-fade-in [animation-delay:200ms]">
          Choose the perfect package for your healthcare facility
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Innovator Package */}
        <div className="bg-white/90 p-8 rounded-2xl hover:scale-[1.02] transition-all duration-500 shadow-lg hover:shadow-xl border border-medical-electric/10">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-medical-deep mb-2">Innovator Package</h3>
                <p className="text-medical-deep/60">Perfect for growing practices</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="text-medical-electric h-5 w-5 flex-shrink-0" />
                  <span className="text-medical-deep/80">3 Core Applications</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-medical-electric h-5 w-5 flex-shrink-0" />
                  <span className="text-medical-deep/80">Basic Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-medical-electric h-5 w-5 flex-shrink-0" />
                  <span className="text-medical-deep/80">Quarterly Updates</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleInquiry("Innovator")}
              className="premium-button w-full group"
            >
              <span className="relative z-10">Request Information</span>
            </button>
          </div>
        </div>

        {/* Professional Package */}
        <div className="bg-white/95 p-8 rounded-2xl hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-2xl border-2 border-medical-electric/20 relative transform translate-y-[-1rem]">
          <div className="absolute top-4 right-4 bg-medical-electric text-white text-sm px-3 py-1 rounded-full font-medium">
            Popular
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-medical-deep mb-2">Pioneer Package</h3>
                <p className="text-medical-deep/60">For established medical centers</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="text-medical-electric h-5 w-5 flex-shrink-0" />
                  <span className="text-medical-deep/80">5 Applications</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-medical-electric h-5 w-5 flex-shrink-0" />
                  <span className="text-medical-deep/80">Priority Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-medical-electric h-5 w-5 flex-shrink-0" />
                  <span className="text-medical-deep/80">Monthly Updates</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleInquiry("Pioneer")}
              className="premium-button w-full group bg-gradient-to-r from-medical-electric to-medical-cyan"
            >
              <span className="relative z-10">Request Information</span>
            </button>
          </div>
        </div>

        {/* Enterprise Package */}
        <div className="bg-white/90 p-8 rounded-2xl hover:scale-[1.02] transition-all duration-500 shadow-lg hover:shadow-xl border border-medical-electric/10">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-medical-deep mb-2">Enterprise Package</h3>
                <p className="text-medical-deep/60">For large healthcare networks</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="text-medical-electric h-5 w-5 flex-shrink-0" />
                  <span className="text-medical-deep/80">Full Suite Access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-medical-electric h-5 w-5 flex-shrink-0" />
                  <span className="text-medical-deep/80">Dedicated Support Team</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-medical-electric h-5 w-5 flex-shrink-0" />
                  <span className="text-medical-deep/80">Weekly Updates</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleInquiry("Enterprise")}
              className="premium-button w-full group"
            >
              <span className="relative z-10">Request Information</span>
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isInquiryModalOpen} onOpenChange={setIsInquiryModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Interested in {selectedPackage} Package?</DialogTitle>
            <DialogDescription>
              We'll help you find the perfect solution for your healthcare facility. Our team will contact you with detailed information about our {selectedPackage} package.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 space-y-4">
            <Button 
              onClick={scrollToContact} 
              className="w-full bg-medical-electric hover:bg-medical-electric/90"
            >
              Contact Us Now
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsInquiryModalOpen(false)}
              className="w-full"
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}