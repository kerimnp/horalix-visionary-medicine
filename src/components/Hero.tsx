import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

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
            <Dialog>
              <DialogTrigger asChild>
                <button className="premium-button">
                  Get Started
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-medical-deep mb-6">
                    Choose Your Package
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 mt-4">
                  {/* Innovator Package */}
                  <div className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-medical-deep">Innovator Package</h3>
                        <p className="text-medical-deep/60">Perfect for growing practices</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-medical-deep">$10,000</div>
                        <div className="text-sm text-medical-deep/60">per quarter</div>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Check className="text-medical-electric h-5 w-5" />
                        <span>3 Core Applications</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="text-medical-electric h-5 w-5" />
                        <span>Basic Support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="text-medical-electric h-5 w-5" />
                        <span>Quarterly Updates</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pioneer Package */}
                  <div className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden">
                    <div className="absolute top-3 right-3 bg-medical-electric text-white text-xs px-2 py-1 rounded-full">
                      Popular
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-medical-deep">Pioneer Package</h3>
                        <p className="text-medical-deep/60">For established medical centers</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-medical-deep">$15,000</div>
                        <div className="text-sm text-medical-deep/60">per quarter</div>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Check className="text-medical-electric h-5 w-5" />
                        <span>5 Applications</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="text-medical-electric h-5 w-5" />
                        <span>Priority Support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="text-medical-electric h-5 w-5" />
                        <span>Monthly Updates</span>
                      </li>
                    </ul>
                  </div>

                  {/* Enterprise Package */}
                  <div className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-transform duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-medical-deep">Enterprise Package</h3>
                        <p className="text-medical-deep/60">For large healthcare networks</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-medical-deep">$20,000</div>
                        <div className="text-sm text-medical-deep/60">per quarter</div>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Check className="text-medical-electric h-5 w-5" />
                        <span>Full Suite Access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="text-medical-electric h-5 w-5" />
                        <span>Dedicated Support Team</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="text-medical-electric h-5 w-5" />
                        <span>Weekly Updates</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <button className="px-8 py-3 rounded-lg border-2 border-medical-deep/10 text-medical-deep hover:bg-medical-deep/5 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}