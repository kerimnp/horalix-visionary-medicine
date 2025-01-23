import { Check } from "lucide-react";

export function Pricing() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          <span className="text-gradient">Premium Solutions</span>
        </h2>
        <p className="text-xl text-medical-deep/60">
          Choose the perfect package for your healthcare facility
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Innovator Package */}
        <div className="glass-card p-8 rounded-2xl relative group">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-medical-electric/20 to-transparent" />
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-medical-deep">Innovator Package</h3>
                  <p className="text-medical-deep/60 mt-1">Perfect for growing practices</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-medical-deep">$10,000</div>
                  <div className="text-sm text-medical-deep/60">per quarter</div>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-medical-electric/10 p-1">
                    <Check className="text-medical-electric h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">3 Core Applications</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-medical-electric/10 p-1">
                    <Check className="text-medical-electric h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Basic Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-medical-electric/10 p-1">
                    <Check className="text-medical-electric h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Quarterly Updates</span>
                </li>
              </ul>
            </div>
            <button className="premium-button w-full group">
              <span className="relative z-10 group-hover:text-white">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-medical-electric to-medical-cyan transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Pioneer Package */}
        <div className="glass-card p-8 rounded-2xl relative group transform scale-105">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-medical-electric/20 to-transparent" />
          <div className="absolute top-0 right-0 -translate-y-1/2 bg-gradient-to-r from-medical-electric to-medical-cyan text-white text-sm px-3 py-1 rounded-full">
            Popular
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-medical-deep">Pioneer Package</h3>
                  <p className="text-medical-deep/60 mt-1">For established medical centers</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-medical-deep">$15,000</div>
                  <div className="text-sm text-medical-deep/60">per quarter</div>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-medical-electric/10 p-1">
                    <Check className="text-medical-electric h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">5 Applications</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-medical-electric/10 p-1">
                    <Check className="text-medical-electric h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Priority Support</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-medical-electric/10 p-1">
                    <Check className="text-medical-electric h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Monthly Updates</span>
                </li>
              </ul>
            </div>
            <button className="premium-button w-full group">
              <span className="relative z-10 group-hover:text-white">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-medical-electric to-medical-cyan transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Enterprise Package */}
        <div className="glass-card p-8 rounded-2xl relative group">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-medical-electric/20 to-transparent" />
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-medical-deep">Enterprise Package</h3>
                  <p className="text-medical-deep/60 mt-1">For large healthcare networks</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-medical-deep">$20,000</div>
                  <div className="text-sm text-medical-deep/60">per quarter</div>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-medical-electric/10 p-1">
                    <Check className="text-medical-electric h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Full Suite Access</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-medical-electric/10 p-1">
                    <Check className="text-medical-electric h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Dedicated Support Team</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="rounded-full bg-medical-electric/10 p-1">
                    <Check className="text-medical-electric h-4 w-4" />
                  </div>
                  <span className="text-medical-deep/80">Weekly Updates</span>
                </li>
              </ul>
            </div>
            <button className="premium-button w-full group">
              <span className="relative z-10 group-hover:text-white">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-medical-electric to-medical-cyan transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}