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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-bold text-medical-deep">Horalix</div>
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("features")}
            className="text-medical-deep/80 hover:text-medical-deep transition-colors duration-300"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("solutions")}
            className="text-medical-deep/80 hover:text-medical-deep transition-colors duration-300"
          >
            Solutions
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="text-medical-deep/80 hover:text-medical-deep transition-colors duration-300"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-medical-deep/80 hover:text-medical-deep transition-colors duration-300"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("pricing")}
            className="premium-button"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}