import { Brain, Network, LineChart, Shield } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

export function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: t("features.ai_excellence.title"),
      description: t("features.ai_excellence.description"),
    },
    {
      icon: Network,
      title: t("features.seamless_integration.title"),
      description: t("features.seamless_integration.description"),
    },
    {
      icon: LineChart,
      title: t("features.real_time_analytics.title"),
      description: t("features.real_time_analytics.description"),
    },
    {
      icon: Shield,
      title: t("features.premium_support.title"),
      description: t("features.premium_support.description"),
    },
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-medical-deep mb-4">
          {t("features.section_title")}
        </h2>
        <p className="text-xl text-medical-deep/60">
          {t("features.section_description")}
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