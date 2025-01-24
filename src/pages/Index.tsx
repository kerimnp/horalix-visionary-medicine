import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Solutions } from "@/components/Solutions";
import { About } from "@/components/About";
import { Pricing } from "@/components/Pricing";
import { Contact } from "@/components/Contact";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Helmet } from "react-helmet";

const Index = () => {
  useScrollAnimation();

  return (
    <main className="min-h-screen bg-white">
      <Helmet>
        <title>Horalix - AI-Powered Medical Solutions | Visionary Healthcare Technology</title>
        <meta name="description" content="Transform healthcare with Horalix's AI-powered medical solutions. Advanced diagnostics, real-time monitoring, and innovative healthcare technology for medical professionals." />
        <meta name="keywords" content="healthcare AI, medical technology, patient care, healthcare solutions, medical diagnostics, AI diagnostics" />
      </Helmet>

      <Navigation />
      
      <section id="hero" className="min-h-screen pt-20">
        <Hero />
      </section>

      <section id="features" className="section-fade-up bg-gradient-to-b from-white to-medical-cyan/5 py-20">
        <Features />
      </section>

      <section id="solutions" className="section-fade-up bg-gradient-to-b from-medical-cyan/5 to-white py-20">
        <Solutions />
      </section>

      <section id="pricing" className="section-fade-up bg-gradient-to-b from-white to-medical-cyan/5 py-20">
        <Pricing />
      </section>

      <section id="about" className="section-fade-up bg-gradient-to-b from-medical-cyan/5 to-white py-20">
        <About />
      </section>

      <section id="contact" className="section-fade-up bg-gradient-to-b from-white to-medical-cyan/5 py-20">
        <Contact />
      </section>
    </main>
  );
};

export default Index;