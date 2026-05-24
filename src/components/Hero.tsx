import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.webp";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#012F46]">

      {/* Layer 1 — Hero background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          role="presentation"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-right opacity-[0.78] brightness-[0.72] contrast-[1.08] saturate-[0.95] scale-[1.01]"
        />
      </div>

      {/* Layer 2 — Navy depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020B14] via-[#012F46]/80 to-[#031523]" />

      {/* Layer 3 — Subtle right-side blue glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(11,78,138,0.28)_0%,rgba(1,47,70,0.12)_32%,rgba(2,11,20,0)_62%)]" />

      {/* Layer 4 — Left-to-right readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020B14]/88 via-[#012F46]/58 to-[#020B14]/22" />

      {/* Layer 5 — Bottom depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020B14]/45" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-24 sm:pb-32 relative z-10">
        <div className="max-w-[660px] text-left lg:mt-8">

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-white leading-[1.05] mb-10 sm:mb-12 md:mb-14 font-semibold tracking-tight"
          >
            Stop Automating
            <br />
            <span className="text-gradient-gold">Broken Processes.</span>
          </motion.h1>

          {/* Destination outcome line */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-2xl mb-6 sm:mb-8 leading-snug font-medium"
          >
            Find where AI can save time, reduce cost and protect margin before you invest.
          </motion.p>

          {/* Supporting value proposition */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="text-sm sm:text-base text-white/60 max-w-xl mb-10 sm:mb-12 lg:mb-14 leading-relaxed italic"
          >
            Built around your operations, your priorities and measurable ROI.
          </motion.p>

          {/* SEO context line */}
          <p className="sr-only">
            AI consulting for SME leaders focused on driving operational efficiency &amp; ROI for SMEs. AI Readiness &amp; Strategic Adoption.
          </p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4 mb-8 sm:mb-10"
          >
            <Button variant="hero" size="xl" className="group shimmer h-[46px] px-6 text-[16px]" asChild>
              <a href="https://integroai.tech/assessment" target="_blank" rel="noopener noreferrer">
                Start the Assessment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="backdrop-blur-sm h-[46px] px-5 text-[16px]" asChild>
              <a href="https://calendly.com/integroai-tech/30min" target="_blank" rel="noopener noreferrer">
                Book a Free Discovery Call
              </a>
            </Button>
          </motion.div>

          {/* Process clarity line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 text-sm sm:text-base text-[#e5eded] max-w-xl"
          >
            5-minute Assessment → Strategy Call → Clear Next Steps
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
