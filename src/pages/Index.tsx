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
        <title>Horalix - Leading AI Medical Solutions in Bosnia | Advanced Healthcare Technology</title>
        <meta name="description" content="Transform healthcare in Bosnia with Horalix's AI-powered medical solutions. Advanced diagnostics, real-time monitoring, and innovative healthcare technology for medical professionals." />
        <meta name="keywords" content="AI medicine Bosnia, healthcare technology Bosnia, medical AI solutions, Bosnian healthcare innovation, artificial intelligence healthcare, medical diagnostics Bosnia, healthcare automation, medical imaging AI, patient care technology, healthcare data analytics" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Horalix" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Horalix - Leading AI Medical Solutions in Bosnia" />
        <meta property="og:description" content="Transform healthcare with Horalix's AI-powered medical solutions. Advanced diagnostics and innovative healthcare technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://horalix.com" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Horalix - AI Medical Solutions" />
        <meta name="twitter:description" content="Transform healthcare with Horalix's AI-powered medical solutions." />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="geo.region" content="BA" />
        <meta name="geo.placename" content="Bosnia and Herzegovina" />
        <link rel="canonical" href="https://horalix.com" />
        <link rel="alternate" hrefLang="bs" href="https://horalix.com/bs" />
        <link rel="alternate" hrefLang="hr" href="https://horalix.com/hr" />
        <link rel="alternate" hrefLang="sr" href="https://horalix.com/sr" />
        
        {/* Schema.org structured data for better SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Horalix",
            "description": "AI-powered medical solutions provider in Bosnia",
            "url": "https://horalix.com",
            "logo": "https://horalix.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+387-XX-XXXXXX",
              "contactType": "customer service",
              "areaServed": "BA",
              "availableLanguage": ["Bosnian", "Croatian", "Serbian", "English"]
            },
            "sameAs": [
              "https://facebook.com/horalix",
              "https://twitter.com/horalix",
              "https://linkedin.com/company/horalix"
            ]
          })}
        </script>
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