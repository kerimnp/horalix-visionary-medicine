import { Brain, Network, LineChart, Shield } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI Excellence",
      description: "Advanced AI algorithms driving medical decisions",
    },
    {
      icon: Network,
      title: "Seamless Integration",
      description: "Effortless integration with existing systems",
    },
    {
      icon: LineChart,
      title: "Real-time Analytics",
      description: "Live insights for informed decision-making",
    },
    {
      icon: Shield,
      title: "Premium Support",
      description: "24/7 dedicated expert assistance",
    },
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-medical-deep mb-4">
          Transformative Features
        </h2>
        <p className="text-xl text-medical-deep/60">
          Discover the power of AI-driven healthcare solutions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-all duration-300"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-medical-electric/10 flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-medical-electric" />
              </div>
              <h3 className="text-xl font-semibold text-medical-deep mb-2">
                {feature.title}
              </h3>
              <p className="text-medical-deep/60">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}