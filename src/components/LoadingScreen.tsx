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
          className="h-16 animate-fade-in"
        />
        {/* Modern glow effects */}
        <div className="absolute inset-0 blur-2xl animate-pulse-slow">
          <div className="absolute inset-0 bg-medical-electric/20 rounded-full" />
        </div>
        <div className="absolute inset-0 blur-3xl">
          <div className="absolute inset-0 bg-medical-cyan/20 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};