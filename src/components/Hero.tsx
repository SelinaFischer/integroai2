import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Hero = () => {
  const trustPoints = [
    "No jargon, just clarity",
    "ROI-focused approach",
    "SME-tailored solutions",
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-hero overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-accent-teal/10 rounded-full blur-3xl animate-float animation-delay-200" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 mb-8 animate-fade-up">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-primary-foreground/80 text-sm font-medium">
              Trusted by SME leaders across the UK
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground leading-tight mb-6 animate-fade-up animation-delay-100">
            Turn AI Confusion Into{" "}
            <span className="text-gradient">Confident Action</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-8 animate-fade-up animation-delay-200">
            Helping SME leaders cut through the AI hype with clear strategy, solid foundations, and measurable outcomes that actually drive business growth.
          </p>

          {/* Trust points */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 animate-fade-up animation-delay-300">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2 text-primary-foreground/80">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">{point}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animation-delay-400">
            <Button variant="hero" size="xl" asChild>
              <a href="https://calendly.com/integroai-consulting/30min" target="_blank" rel="noopener noreferrer">
                Book Your Free Discovery Call
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#services">
                Explore Services
              </a>
            </Button>
          </div>

          {/* Social proof hint */}
          <p className="text-primary-foreground/50 text-sm mt-10 animate-fade-up animation-delay-400">
            Join 50+ SME leaders who've transformed their AI strategy
          </p>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(220 25% 97%)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
