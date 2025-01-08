import { Award, Users, Globe } from "lucide-react";

export function About() {
  const stats = [
    {
      icon: Users,
      value: "10M+",
      label: "Patients Served",
    },
    {
      icon: Globe,
      value: "500+",
      label: "Healthcare Providers",
    },
    {
      icon: Award,
      value: "99.9%",
      label: "Accuracy Rate",
    },
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-medical-deep mb-4">
          About Horalix
        </h2>
        <p className="text-xl text-medical-deep/60 max-w-2xl mx-auto">
          Redefining healthcare with cutting-edge AI technology and unwavering commitment to medical excellence
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
          At Horalix, we combine advanced artificial intelligence with deep medical expertise to create solutions that transform healthcare delivery. Our commitment to innovation drives us to continuously evolve and improve, ensuring healthcare providers can offer the best possible care to their patients.
        </p>
      </div>
    </div>
  );
}