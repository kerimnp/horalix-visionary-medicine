import { Brain, Shield, Cpu } from "lucide-react";

export function About() {
  const stats = [
    {
      icon: Brain,
      value: "Advanced",
      label: "Neural Networks",
    },
    {
      icon: Cpu,
      value: "Real-time",
      label: "Processing Engine",
    },
    {
      icon: Shield,
      value: "HIPAA",
      label: "Compliant System",
    },
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-medical-deep mb-4">
          About Horalix
        </h2>
        <p className="text-xl text-medical-deep/60 max-w-2xl mx-auto">
          Advancing healthcare through state-of-the-art artificial intelligence and machine learning technologies
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
              <div className="text-2xl font-bold text-medical-deep mb-2">
                {stat.value}
              </div>
              <div className="text-medical-deep/60">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-lg text-medical-deep/80 max-w-3xl mx-auto">
          At Horalix, we're developing sophisticated artificial intelligence systems specifically designed for medical applications. Our proprietary neural networks and machine learning algorithms are built to process complex medical data with unprecedented accuracy. By leveraging cutting-edge technology and adhering to the highest security standards, we're creating a new paradigm in healthcare diagnostics and decision support systems.
        </p>
      </div>
    </div>
  );
}