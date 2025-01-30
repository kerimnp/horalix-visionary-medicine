import { Award, Lightbulb, Brain } from "lucide-react";

export function About() {
  const stats = [
    {
      icon: Brain,
      value: "99.9%",
      label: "AI Accuracy in Testing",
    },
    {
      icon: Lightbulb,
      value: "5+",
      label: "AI Models",
    },
    {
      icon: Award,
      value: "24/7",
      label: "Support Availability",
    },
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-medical-deep mb-4">
          About Horalix
        </h2>
        <p className="text-xl text-medical-deep/60 max-w-2xl mx-auto">
          Pioneering the future of healthcare with innovative AI solutions and a commitment to transforming medical diagnostics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="glass-card p-8 rounded-xl hover:scale-[1.02] transition-all duration-300"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-medical-electric/10 flex items-center justify-center mb-4">
                <stat.icon className="w-8 h-8 text-medical-electric" />
              </div>
              <div className="text-3xl font-bold text-medical-deep mb-2">
                {stat.value}
              </div>
              <div className="text-medical-deep/60">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-lg text-medical-deep/80 max-w-3xl mx-auto">
          At Horalix, we're at the forefront of medical innovation, developing cutting-edge AI solutions that promise to revolutionize healthcare delivery. Our team of experts combines deep medical knowledge with advanced artificial intelligence to create tools that will enhance diagnostic accuracy and improve patient outcomes. We're committed to building a future where healthcare is more accurate, accessible, and efficient.
        </p>
      </div>
    </div>
  );
}