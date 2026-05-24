import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import scorecardImg from "@/assets/ai-readiness-scorecard.png";

const CTA = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-hero relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-warm/20 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.25, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/15 rounded-full blur-[100px]"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.2, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Two-column CTA card */}
          <div className="bg-[#012F46]/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">

            {/* Left column — scorecard image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center justify-center bg-[#031523]/50 p-6 sm:p-8 lg:p-10"
            >
              <img
                src={scorecardImg}
                alt="AI Readiness Assessment scorecard showing business readiness score, dimensions and priority focus areas"
                className="w-full max-w-[500px] h-auto object-contain rounded-xl"
                loading="lazy"
                decoding="async"
              />
            </motion.div>

            {/* Right column — CTA copy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center p-8 sm:p-10 lg:p-12"
            >
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 bg-white/8 border border-[#F5A302]/30 rounded-full px-5 py-2.5">
                  <Sparkles className="w-4 h-4 text-[#F5A302]" aria-hidden="true" />
                  <span className="text-white text-sm font-semibold">Start with clarity</span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold leading-tight mb-4">
                Unsure where{" "}
                <span className="text-gradient-gold">AI is worth investing</span>{" "}
                first?
              </h2>

              {/* Supporting copy */}
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
                Take the free AI Readiness Assessment to see where your business stands, which operational gaps may be creating friction, and what needs attention before you invest.
              </p>

              {/* CTA button */}
              <div className="flex flex-col sm:flex-row items-start gap-3 mb-8">
                <Button variant="hero" size="lg" className="group shimmer" asChild>
                  <a href="https://integroai.tech/assessment" target="_blank" rel="noopener noreferrer">
                    Start the AI Readiness Assessment
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </a>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-white/50 text-xs sm:text-sm">
                <span>✓ Decide what is worth solving</span>
                <span>✓ Reduce risk before spend</span>
                <span>✓ Clear next steps</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
