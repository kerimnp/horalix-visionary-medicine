import { useEffect, useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-medical-cyan/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(124,210,255,0.15)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block animate-fade-in opacity-0 [animation-delay:0.2s] px-4 py-1.5 mb-6 text-sm font-medium text-medical-electric bg-medical-electric/10 rounded-full">
            Revolutionizing Healthcare
          </span>
          
          <h1 className="animate-fade-up opacity-0 [animation-delay:0.4s] text-5xl md:text-7xl font-bold text-medical-deep mb-6">
            AI-Powered Medical Suite
          </h1>
          
          <p className="animate-fade-up opacity-0 [animation-delay:0.6s] text-xl text-medical-deep/60 mb-12">
            Transform patient care with advanced AI diagnostics and real-time health monitoring
          </p>
          
          <div className="animate-fade-up opacity-0 [animation-delay:0.8s] flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="premium-button">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-lg border-2 border-medical-deep/10 text-medical-deep hover:bg-medical-deep/5 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}