import { Activity, Brain, BarChart3 } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

export function Solutions() {
  const { t } = useTranslation();

  const solutions = [
    {
      icon: Activity,
      title: t("solutions.patient_flow.title"),
      description: t("solutions.patient_flow.description"),
      features: [
        t("solutions.patient_flow.features.monitoring"),
        t("solutions.patient_flow.features.routing"),
        t("solutions.patient_flow.features.optimization"),
      ],
    },
    {
      icon: Brain,
      title: t("solutions.ai_diagnostics.title"),
      description: t("solutions.ai_diagnostics.description"),
      features: [
        t("solutions.ai_diagnostics.features.analysis"),
        t("solutions.ai_diagnostics.features.suggestions"),
        t("solutions.ai_diagnostics.features.assessment"),
      ],
    },
    {
      icon: BarChart3,
      title: t("solutions.predictive_analytics.title"),
      description: t("solutions.predictive_analytics.description"),
      features: [
        t("solutions.predictive_analytics.features.forecasting"),
        t("solutions.predictive_analytics.features.planning"),
        t("solutions.predictive_analytics.features.metrics"),
      ],
    },
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-medical-deep mb-4">
          {t("solutions.section_title")}
        </h2>
        <p className="text-xl text-medical-deep/60">
          {t("solutions.section_description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {solutions.map((solution, index) => (
          <div
            key={solution.title}
            className="glass-card p-8 rounded-xl hover:scale-[1.02] transition-all duration-300"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-medical-electric/10 flex items-center justify-center mb-4">
                <solution.icon className="w-8 h-8 text-medical-electric" />
              </div>
              <h3 className="text-xl font-semibold text-medical-deep mb-2">
                {solution.title}
              </h3>
              <p className="text-medical-deep/60 mb-6">{solution.description}</p>
              <ul className="space-y-2">
                {solution.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-medical-deep/80 flex items-center justify-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-medical-electric" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}