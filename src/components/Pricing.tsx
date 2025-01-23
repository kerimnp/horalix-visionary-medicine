import { Check } from "lucide-react";

export function Pricing() {
  return (
    <div className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-medical-deep mb-4">
          Premium Solutions
        </h2>
        <p className="text-xl text-medical-deep/60">
          Choose the perfect package for your healthcare facility
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Innovator Package */}
        <div className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-transform duration-300">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-medical-deep">Innovator Package</h3>
                  <p className="text-medical-deep/60">Perfect for growing practices</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-medical-deep">$10,000</div>
                  <div className="text-sm text-medical-deep/60">per quarter</div>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="text-medical-electric h-5 w-5" />
                  <span>3 Core Applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-medical-electric h-5 w-5" />
                  <span>Basic Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-medical-electric h-5 w-5" />
                  <span>Quarterly Updates</span>
                </li>
              </ul>
            </div>
            <button className="premium-button w-full">Get Started</button>
          </div>
        </div>

        {/* Pioneer Package */}
        <div className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-transform duration-300 relative">
          <div className="absolute top-3 right-3 bg-medical-electric text-white text-xs px-2 py-1 rounded-full">
            Popular
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-medical-deep">Pioneer Package</h3>
                  <p className="text-medical-deep/60">For established medical centers</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-medical-deep">$15,000</div>
                  <div className="text-sm text-medical-deep/60">per quarter</div>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="text-medical-electric h-5 w-5" />
                  <span>5 Applications</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-medical-electric h-5 w-5" />
                  <span>Priority Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-medical-electric h-5 w-5" />
                  <span>Monthly Updates</span>
                </li>
              </ul>
            </div>
            <button className="premium-button w-full">Get Started</button>
          </div>
        </div>

        {/* Enterprise Package */}
        <div className="glass-card p-6 rounded-xl hover:scale-[1.02] transition-transform duration-300">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-medical-deep">Enterprise Package</h3>
                  <p className="text-medical-deep/60">For large healthcare networks</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-medical-deep">$20,000</div>
                  <div className="text-sm text-medical-deep/60">per quarter</div>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="text-medical-electric h-5 w-5" />
                  <span>Full Suite Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-medical-electric h-5 w-5" />
                  <span>Dedicated Support Team</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="text-medical-electric h-5 w-5" />
                  <span>Weekly Updates</span>
                </li>
              </ul>
            </div>
            <button className="premium-button w-full">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
}