import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.webp";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero background image */}
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
      
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/24 via-primary/14 to-primary/6" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/18 via-transparent to-primary/6" />
      
      {/* Subtle animated accent */}
      <motion.div 
        className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-accent-warm/10 rounded-full blur-[150px]"
        animate={{ 
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-24 sm:pb-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
        
          {/* Main headline - bold and clear */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 sm:mb-8 font-semibold tracking-tight drop-shadow-[0_6px_18px_#00000070]"
          >
            Stop Automating
            <br />
            <span className="text-gradient-gold">Broken Processes.</span>
          </motion.h1>

          {/* Single clear value proposition */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed"
            itemProp="description"
          >
            Decide which business problems are worth solving with AI before you invest time, money, or trust.
          </motion.p>

          {/* Single prominent CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-10"
          >
            <Button variant="hero" size="xl" className="group shimmer" asChild>
              <a href="https://tally.so/r/68jDMA" target="_blank" rel="noopener noreferrer">
                AI Readiness Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="backdrop-blur-sm" asChild>
              <a href="https://calendly.com/integroai-consulting/30min" target="_blank" rel="noopener noreferrer">
                Book Strategy Call
              </a>
            </Button>
          </motion.div>

          {/* Process clarity line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 text-sm sm:text-base text-[#e5eded] max-w-xl mx-auto"
         >
           Assessment → Strategy Call → Clear AI Priorities
         </motion.p>       
                    
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a 
          href="#services"
          aria-label="Scroll to learn more"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/40 hover:text-white/60 transition-colors"
        >
          <ChevronDown className="w-6 h-6" aria-hidden="true" />
        </motion.a>
      </motion.div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none leading-none overflow-hidden">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
      >
         <path
           d="M0 80L60 74C120 68 240 56 360 52C480 48 600 52 720 56C840 60 960 64 1080 62C1200 60 1320 52 1380 48L1440 44V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
           fill="#FFFFFF"
        />
      </svg>
    </div>
    </section>
  );
};

export default Hero;
