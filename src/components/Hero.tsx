import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";

const Hero = () => {
  const trustPoints = [
    "No jargon, just clarity",
    "ROI-focused approach",
    "SME-tailored solutions",
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero background image - preloaded for LCP */}
      <div className="absolute inset-0 scale-105">
        <img 
          src={heroBg}
          alt=""
          role="presentation"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Gradient overlay for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-accent-warm/20 rounded-full blur-[100px]"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-accent-teal/15 rounded-full blur-[100px]"
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-8"
          >
            <span className="w-2 h-2 bg-accent-warm rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide">
              AI Strategy for SME Leaders
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.1] mb-6 font-extrabold"
          >
            AI Strategy.{" "}
            <span className="text-gradient-gold">Done Right.</span>
          </motion.h1>

          {/* Direct answer for AI engines - What does IntegroAI do? */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hero-description text-lg sm:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto mb-4 font-medium"
          >
            Discover › Design › Validate › Deliver
          </motion.p>
          
          {/* Concise value proposition for AI citation */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-10"
            itemProp="description"
          >
            IntegroAI helps SME leaders with 20-500 employees turn AI confusion into confident action through clear strategy, solid data foundations, and measurable ROI.
          </motion.p>

          {/* Trust points */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
          >
            {trustPoints.map((point, index) => (
              <motion.div 
                key={point} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 text-white/90"
              >
                <CheckCircle2 className="w-5 h-5 text-accent-warm" aria-hidden="true" />
                <span className="text-sm font-medium">{point}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="xl" className="group shimmer" asChild>
              <a href="https://calendly.com/integroai-consulting/30min" target="_blank" rel="noopener noreferrer">
                Book Your Free Discovery Call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="backdrop-blur-sm" asChild>
              <a href="#services">
                Explore Services
              </a>
            </Button>
          </motion.div>

          {/* Social proof hint */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-white/60 text-sm mt-12"
          >
            Trusted by SME leaders across the UK
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a 
          href="#services"
          aria-label="Scroll down to services section"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors"
        >
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" aria-hidden="true" />
        </motion.a>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 100L48 95C96 90 192 80 288 72C384 64 480 58 576 60C672 62 768 72 864 76C960 80 1056 78 1152 74C1248 70 1344 64 1392 61L1440 58V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z" fill="hsl(0 0% 100%)" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;