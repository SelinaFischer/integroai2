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
    "description": "IntegroAI Consulting provides AI strategy and consulting services for SME leaders. We help businesses with 20-500 employees turn AI confusion into confident action through our proven Discover-Design-Validate-Deliver framework. Services include AI readiness assessment, strategy roadmapping, implementation support, training, and ongoing advisory.",
    "url": "https://integroai.tech",
    "logo": "https://integroai.tech/apple-touch-icon.png",
    "image": "https://integroai.tech/og-image.png",
    "email": "info@integroai.tech",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "DE"
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
      "https://www.linkedin.com/company/integroai-consulting/",
      "https://www.instagram.com/integroai.tech/"
    ],
    "founder": {
      "@type": "Person",
      "name": "Selina Fischer",
      "jobTitle": "Founder & AI Strategist",
      "description": "AI strategist helping SME leaders implement practical AI solutions"
    },
    "knowsAbout": [
      "Artificial Intelligence Strategy",
      "AI Implementation for SMEs",
      "AI Readiness Assessment",
      "Data Strategy",
      "Business Transformation",
      "Machine Learning Consulting",
      "AI Governance and Ethics",
      "Digital Transformation",
      "Vendor-Agnostic AI Consulting"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Readiness Assessment",
          "description": "Comprehensive assessment of your current state, opportunities, and AI readiness including gap analysis and opportunity mapping"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Strategy & Roadmapping",
          "description": "Prioritised AI implementation roadmap with business case analysis and quick wins identification"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Training & Capability Building",
          "description": "Hands-on workshops to upskill teams on AI tools, prompting, and workflow integration"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Implementation Support",
          "description": "Hands-on guidance from pilot to production including vendor selection and change management"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ongoing AI Advisory",
          "description": "Monthly strategic reviews with KPI tracking to ensure continued AI success"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Governance & Ethics",
          "description": "Responsible AI practices with policies, risk frameworks, and compliance guidance"
        }
      }
    ]
  };

  // Breadcrumb schema for better navigation signals
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://integroai.tech"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen">
        <Header />
        <main id="main-content">
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
