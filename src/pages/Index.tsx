import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Services from "@/components/Services";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import Framework from "@/components/Framework";
import WhyIntegroAI from "@/components/WhyIntegroAI";
import RealityBand from "@/components/RealityBand";
import Founder from "@/components/Founder";
import AssessmentSection from "@/components/AssessmentSection";
import FAQ from "@/components/FAQ";
import GuideBanner from "@/components/GuideBanner";
import BlogPosts from "@/components/BlogPosts";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CookieConsent from "@/components/CookieConsent";


const Index = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://integroai.tech/#localbusiness",
    "name": "IntegroAI Consulting",
    "description": "IntegroAI Consulting is an independent AI consultancy for founder-led service businesses. We help founders and leaders reduce operational firefighting and repetitive work, strengthen operational control and identify where AI can create measurable business value, through our Discover-Design-Validate-Deliver-Iterate operating framework. Services include the AI & Operations Diagnostic, AI strategy and prioritisation roadmapping, foundations and responsible adoption, implementation, and ongoing advisory.",
    "url": "https://integroai.tech",
    "logo": "https://integroai.tech/apple-touch-icon.png",
    "image": "https://integroai.tech/og-image.png",
    "email": "info@integroai.tech",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB"
    },
    "areaServed": [
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
      "jobTitle": "Founder | AI Adoption & Transformation Consultant",
      "description": "AI Adoption & Transformation Consultant helping founder-led service businesses reduce repetitive work, strengthen operational control and adopt AI responsibly, with a human-led approach."
    },
    "knowsAbout": [
      "Artificial Intelligence Strategy",
      "AI Implementation for Founder-Led Service Businesses",
      "AI Readiness Assessment",
      "Business & Operations Advisory",
      "Data Strategy",
      "Machine Learning Consulting",
      "AI Governance and Ethics",
      "Workflow Automation",
      "Technology-Agnostic AI Consulting"
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI & Operations Diagnostic",
          "description": "Establish a clear view of how the business operates today, where friction exists, and where time, capacity or operational control may be being lost."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Strategy & Prioritisation Roadmap",
          "description": "Evaluate where AI, automation or process improvement could create meaningful business value, and determine which opportunities should be addressed first."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Foundations & Responsible Adoption",
          "description": "Put the organisational and operational conditions in place for AI to be introduced responsibly and effectively."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI & Automation Implementation",
          "description": "Support validated AI and automation opportunities through appropriate implementation, proof of concept, integration and delivery oversight."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Ongoing AI & Operations Advisory",
          "description": "Review performance, strengthen adoption, refine priorities and identify where further operational or AI improvements can create value."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Voice Receptionist",
          "description": "An AI phone assistant that answers business calls 24/7, books appointments, takes messages and hands over to the team when a person is needed."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website Design & Build",
          "description": "A professional business website, designed, built and launched for the client."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Search Visibility (AEO & GEO)",
          "description": "A review of how search engines and AI tools find, understand and recommend a business, followed by improvements to the clarity, consistency and content of its website and online profiles. Covers SEO, answer engine optimisation (AEO) and generative engine optimisation (GEO)."
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
        <link rel="canonical" href="https://integroai.tech/" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen overflow-x-hidden">
        <Header />
        <main id="main-content">
          <Hero />
          <PainPoints />
          <AssessmentSection />
          <Services />
          <WhoWeWorkWith />
          <RealityBand />
          <Founder />
          <WhyIntegroAI />
          <Framework />
          <FAQ />
          <GuideBanner location="homepage" className="bg-brand-ivory pb-14 sm:pb-16" />
          <BlogPosts />
          <FinalCTA />
        </main>
        <Footer />
        <BackToTop />
        <CookieConsent />
        </div>
    </>
  );
};

export default Index;
