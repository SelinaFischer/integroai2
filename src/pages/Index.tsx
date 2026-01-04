import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Framework from "@/components/Framework";
import Services from "@/components/Services";
import Values from "@/components/Values";
import Founder from "@/components/Founder";
import BlogPosts from "@/components/BlogPosts";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://integroai.tech/#localbusiness",
    "name": "IntegroAI Consulting",
    "description": "AI Strategy and Consulting for SME Leaders. Turn AI confusion into confident action with clear strategy, solid foundations, and measurable outcomes.",
    "url": "https://integroai.tech",
    "logo": "https://integroai.tech/apple-touch-icon.png",
    "image": "https://integroai.tech/og-image.png",
    "telephone": "",
    "email": "hello@integroai.tech",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "",
      "longitude": ""
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Germany"
      },
      {
        "@type": "Country", 
        "name": "United Kingdom"
      },
      {
        "@type": "Place",
        "name": "Worldwide"
      }
    ],
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://twitter.com/IntegroAI",
      "https://linkedin.com/company/integroai"
    ],
    "founder": {
      "@type": "Person",
      "name": "Selina Fischer",
      "jobTitle": "Founder & AI Strategist"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "AI Strategy",
      "Data Strategy",
      "Business Transformation",
      "AI Implementation",
      "SME Consulting"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Consulting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Discovery & Assessment",
            "description": "Comprehensive assessment of your current state, opportunities, and AI readiness"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Strategy & Roadmapping",
            "description": "Clear, actionable AI strategy aligned with your business goals"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ongoing AI Advisory",
            "description": "Regular strategic guidance to keep AI initiatives on track"
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <PainPoints />
          <Framework />
          <Services />
          <Values />
          <Founder />
          <BlogPosts />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
