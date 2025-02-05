import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { DemoModal } from "./DemoModal";
import { useTranslation } from "@/contexts/TranslationContext";

export function Hero() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      containerRef.current.style.setProperty("--mouse-x", `${x * 100}%`);
      containerRef.current.style.setProperty("--mouse-y", `${y * 100}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTryDemo = () => {
    setIsDemoModalOpen(true);
  };

  const handleLearnMore = () => {
    const element = document.getElementById("features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div ref={containerRef} className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-medical-cyan/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(124,210,255,0.15)_0%,transparent_50%)]" />
        
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block animate-fade-in opacity-0 [animation-delay:0.2s] px-4 py-1.5 mb-6 text-sm font-medium text-medical-electric bg-medical-electric/10 rounded-full">
              {t("hero.leading_text")}
            </span>
            
            <h1 className="animate-fade-up opacity-0 [animation-delay:0.4s] text-5xl md:text-7xl font-bold text-medical-deep mb-6">
              {t("hero.title_1")}<br />{t("hero.title_2")}
            </h1>
            
            <p className="animate-fade-up opacity-0 [animation-delay:0.6s] text-xl text-medical-deep/60 mb-12">
              {t("hero.description")}
            </p>
            
            <div className="animate-fade-up opacity-0 [animation-delay:0.8s] flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={scrollToPricing} 
                className="w-full sm:w-auto bg-medical-deep text-white px-8 py-3 rounded-lg hover:bg-medical-deep/90 transition-all duration-300"
              >
                {t("hero.get_started")}
              </button>
              <button 
                onClick={handleTryDemo}
                className="w-full sm:w-auto bg-medical-electric text-white px-8 py-3 rounded-lg hover:bg-medical-electric/90 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {t("hero.try_demo")} <ExternalLink className="w-4 h-4" />
              </button>
              <button 
                onClick={handleLearnMore}
                className="w-full sm:w-auto px-8 py-3 rounded-lg border-2 border-medical-deep/10 text-medical-deep hover:bg-medical-deep/5 transition-colors duration-300"
              >
                {t("hero.learn_more")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <DemoModal 
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </>
  );
}