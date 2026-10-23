import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import WhoWeWorkWith from "@/components/WhoWeWorkWith";
import RealityBand from "@/components/RealityBand";
import Founder from "@/components/Founder";
import AssessmentSection from "@/components/AssessmentSection";
import FAQ from "@/components/FAQ";
import GuideBanner from "@/components/GuideBanner";
import BlogPosts from "@/components/BlogPosts";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";


const Index = () => {
  // One business entity only: it is declared site-wide in index.html
  // (Organization + ProfessionalService). A second LocalBusiness entity here
  // split it in two, with conflicting service areas.


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
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      <div className="min-h-screen overflow-x-hidden">
        <Header />
        <main id="main-content">
          <Hero />
          <TrustStrip />
          <WhoWeWorkWith />
          <RealityBand />
          <Founder />
          <AssessmentSection />
          <Services />
          <FAQ />
          <GuideBanner location="homepage" className="bg-white pt-14 sm:pt-16" />
          <BlogPosts compact />
          <FinalCTA />
        </main>
        <Footer />
        <BackToTop />
        </div>
    </>
  );
};

export default Index;
