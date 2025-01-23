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
          src="/lovable-uploads/1c97346c-b67d-4bee-ad7c-b1f8ebc5676e.png" 
          alt="HORALIX"
          className="h-20 animate-fade-in relative z-10 brightness-200"
        />
        
        {/* Core glow effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 blur-[50px] animate-pulse-slow">
            <div className="absolute inset-0 bg-medical-electric/50 rounded-full" />
          </div>
        </div>
        
        {/* Electric field effect */}
        <div className="absolute -inset-4 -z-20">
          <div className="absolute inset-0 blur-3xl animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-medical-electric/30 via-medical-cyan/20 to-medical-electric/30 rounded-full" />
          </div>
        </div>
        
        {/* Dynamic energy ring */}
        <div className="absolute -inset-8 -z-30">
          <div className="absolute inset-0 blur-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-medical-electric/20 via-medical-cyan/30 to-medical-electric/20 rounded-full animate-spin-slow" />
          </div>
        </div>
        
        {/* Outer pulse waves */}
        <div className="absolute -inset-12 -z-40">
          <div className="absolute inset-0 blur-[100px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-medical-deep via-medical-electric/10 to-medical-cyan/20 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};