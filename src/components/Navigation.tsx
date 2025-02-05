import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "@/contexts/TranslationContext";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

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
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    ["features", t("nav.features")],
    ["solutions", t("nav.solutions")],
    ["pricing", t("nav.pricing")],
    ["about", t("nav.about")],
    ["contact", t("nav.contact")],
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out h-20",
        isScrolled ? "bg-white/90 backdrop-blur-xl shadow-lg" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex-shrink-0">
            <img 
              src="/lovable-uploads/a4f68104-c835-4dc9-b7bb-3b985fbb8253.png" 
              alt="Horalix Logo" 
              className="h-8 md:h-10 w-auto animate-fade-in hover:scale-110 transition-all duration-500 ease-in-out"
            />
          </div>
          
          <div className="hidden md:flex items-center justify-center flex-1 space-x-12">
            {navItems.map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-medical-deep/80 hover:text-medical-deep transition-all duration-500 ease-in-out relative group px-2"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-medical-electric transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out" />
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-6">
            <LanguageSelector />
            <button
              onClick={() => scrollToSection("pricing")}
              className="premium-button group overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-white transition-all duration-500 ease-in-out">
                {t("nav.get_started")}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-medical-electric to-medical-cyan transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}