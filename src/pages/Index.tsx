import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Solutions } from "@/components/Solutions";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section id="hero" className="min-h-screen pt-20">
        <Hero />
      </section>
      <section id="features" className="bg-gradient-to-b from-white to-medical-cyan/5 py-20">
        <Features />
      </section>
      <section id="solutions" className="bg-gradient-to-b from-medical-cyan/5 to-white py-20">
        <Solutions />
      </section>
      <section id="pricing" className="bg-gradient-to-b from-white to-medical-cyan/5 py-20">
        <Pricing />
      </section>
      <section id="about" className="bg-gradient-to-b from-medical-cyan/5 to-white py-20">
        <About />
      </section>
      <section id="contact" className="bg-gradient-to-b from-white to-medical-cyan/5 py-20">
        <Contact />
      </section>
    </main>
  );
};

export default Index;