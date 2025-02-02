import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/a4f68104-c835-4dc9-b7bb-3b985fbb8253.png" 
            alt="Horalix Logo" 
            className="H9lube h-8 md:h-10 w-auto animate-fade-in hover:scale-105 transition-all duration-500"
          />
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {[
            ["features", "Features"],
            ["solutions", "Solutions"],
            ["pricing", "Pricing"],
            ["about", "About"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-medical-deep/80 hover:text-medical-deep transition-all duration-300 relative group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-medical-electric transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollToSection("pricing")}
          className="premium-button group overflow-hidden"
        >
          <span className="relative z-10 group-hover:text-white transition-all duration-500">
            Get Started
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-medical-electric to-medical-cyan transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
        </button>
      </div>
    </nav>
  );
}