import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(onComplete, 500); // Wait for fade out animation
    }, 2000); // Show animation for 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-medical-deep flex items-center justify-center transition-opacity duration-500 z-50 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative">
        <img 
          src="/lovable-uploads/5b64343c-94ba-4c75-9597-91c77719092d.png" 
          alt="HORALIX"
          className="h-16 animate-fade-in relative z-10"
        />
        {/* Primary glow layer */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 blur-3xl animate-pulse-slow">
            <div className="absolute inset-0 bg-medical-electric/30 rounded-full" />
          </div>
        </div>
        
        {/* Secondary glow layer */}
        <div className="absolute inset-0 -z-20">
          <div className="absolute inset-0 blur-2xl animate-float">
            <div className="absolute inset-0 bg-medical-cyan/20 rounded-full" />
          </div>
        </div>
        
        {/* Outer energy ring */}
        <div className="absolute -inset-4 -z-30">
          <div className="absolute inset-0 blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-medical-electric/10 via-medical-cyan/20 to-medical-electric/10 rounded-full animate-spin-slow" />
          </div>
        </div>
        
        {/* Background pulse effect */}
        <div className="absolute -inset-8 -z-40">
          <div className="absolute inset-0 blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-medical-deep via-medical-electric/5 to-medical-cyan/10 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};