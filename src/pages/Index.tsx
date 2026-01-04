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
  return (
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
  );
};

export default Index;
