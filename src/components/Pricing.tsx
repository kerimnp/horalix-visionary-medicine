import { Check } from "lucide-react";

export function Pricing() {
  return (
    <div className="container mx-auto px-6 py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-medical-cyan/5 to-transparent pointer-events-none" />
      
      <div className="text-center mb-20 relative">
        <h2 className="text-5xl font-semibold tracking-tight mb-6">
          Choose your <span className="text-gradient bg-gradient-to-r from-medical-deep via-medical-electric to-medical-cyan">premium solution</span>
        </h2>
        <p className="text-xl text-medical-deep/60 max-w-2xl mx-auto">
          Elevate your healthcare practice with our comprehensive solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative">
        {/* Innovator Package */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-medical-electric/10 to-medical-cyan/5 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
          <div className="glass-card rounded-[2rem] p-10 h-full flex flex-col justify-between relative backdrop-blur-xl">
            <div>
              <div className="flex flex-col mb-8">
                <h3 className="text-2xl font-semibold text-medical-deep mb-2">Innovator Package</h3>
                <p className="text-medical-deep/60">Perfect for growing practices</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-medical-deep">$10,000</span>
                  <span className="text-medical-deep/60 ml-2">per quarter</span>
                </div>
              </div>
              <ul className="space-y-5 mb-10">
                <li className="flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-medical-electric to-medical-cyan p-1">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">3 Core Applications</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-medical-electric to-medical-cyan p-1">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Basic Support</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-medical-electric to-medical-cyan p-1">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Quarterly Updates</span>
                </li>
              </ul>
            </div>
            <button className="premium-button w-full group">
              <span className="relative z-10">Get Started</span>
            </button>
          </div>
        </div>

        {/* Pioneer Package */}
        <div className="relative group scale-105 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-medical-electric/20 to-medical-cyan/10 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-500" />
          <div className="glass-card rounded-[2rem] p-10 h-full flex flex-col justify-between relative border-medical-electric/20 backdrop-blur-xl">
            <div className="absolute top-0 right-8 -translate-y-1/2">
              <span className="px-4 py-1 bg-gradient-to-r from-medical-electric to-medical-cyan text-white text-sm rounded-full font-medium">
                Most Popular
              </span>
            </div>
            <div>
              <div className="flex flex-col mb-8">
                <h3 className="text-2xl font-semibold text-medical-deep mb-2">Pioneer Package</h3>
                <p className="text-medical-deep/60">For established medical centers</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-medical-deep">$15,000</span>
                  <span className="text-medical-deep/60 ml-2">per quarter</span>
                </div>
              </div>
              <ul className="space-y-5 mb-10">
                <li className="flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-medical-electric to-medical-cyan p-1">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">5 Applications</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-medical-electric to-medical-cyan p-1">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Priority Support</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-medical-electric to-medical-cyan p-1">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Monthly Updates</span>
                </li>
              </ul>
            </div>
            <button className="premium-button w-full group bg-gradient-to-r from-medical-electric to-medical-cyan">
              <span className="relative z-10">Get Started</span>
            </button>
          </div>
        </div>

        {/* Enterprise Package */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-b from-medical-electric/10 to-medical-cyan/5 rounded-[2rem] blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
          <div className="glass-card rounded-[2rem] p-10 h-full flex flex-col justify-between relative backdrop-blur-xl">
            <div>
              <div className="flex flex-col mb-8">
                <h3 className="text-2xl font-semibold text-medical-deep mb-2">Enterprise Package</h3>
                <p className="text-medical-deep/60">For large healthcare networks</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-medical-deep">$20,000</span>
                  <span className="text-medical-deep/60 ml-2">per quarter</span>
                </div>
              </div>
              <ul className="space-y-5 mb-10">
                <li className="flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-medical-electric to-medical-cyan p-1">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Full Suite Access</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-medical-electric to-medical-cyan p-1">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Dedicated Support Team</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="rounded-full bg-gradient-to-r from-medical-electric to-medical-cyan p-1">
                    <Check className="text-white h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Weekly Updates</span>
                </li>
              </ul>
            </div>
            <button className="premium-button w-full group">
              <span className="relative z-10">Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}