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

  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-medical-cyan/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(124,210,255,0.15)_0%,transparent_50%)]" />
      
      <div className="container mx-auto px-6 py-20">
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
            <button onClick={scrollToPricing} className="premium-button">
              Get Started
            </button>
            <a 
              href="https://preview--mintmed-recommendation-helper.lovable.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-3 rounded-lg bg-medical-electric text-white hover:bg-medical-electric/90 transition-all duration-300 flex items-center gap-2"
            >
              Try Demo
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
            <button className="px-8 py-3 rounded-lg border-2 border-medical-deep/10 text-medical-deep hover:bg-medical-deep/5 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}