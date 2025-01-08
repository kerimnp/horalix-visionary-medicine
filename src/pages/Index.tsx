import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Solutions } from "@/components/Solutions";
import { About } from "@/components/About";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section id="hero">
        <Hero />
      </section>
      <section id="features" className="min-h-screen bg-gradient-to-b from-white to-medical-cyan/5 py-20">
        <Features />
      </section>
      <section id="solutions" className="min-h-screen bg-gradient-to-b from-medical-cyan/5 to-white py-20">
        <Solutions />
      </section>
      <section id="about" className="min-h-screen bg-gradient-to-b from-white to-medical-cyan/5 py-20">
        <About />
      </section>
    </main>
  );
};

export default Index;