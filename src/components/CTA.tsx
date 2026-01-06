import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 mb-6"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-accent-warm" aria-hidden="true" />
            <span className="text-white/80 text-xs sm:text-sm font-medium">Start Your AI Journey</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white mb-4 font-bold">
            Ready for{" "}
            <span className="text-gradient-gold">Measurable ROI?</span>
          </h2>
          <p className="text-white/70 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Book a free 30-minute discovery call. I turn business challenges into measurable results — no pressure, no jargon, just a candid conversation about your AI opportunities.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button variant="hero" size="lg" className="group shimmer" asChild>
              <a href="https://calendly.com/integroai-consulting/30min" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                Book Your Discovery Call
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-white/50 text-xs sm:text-sm mt-8"
          >
            <span>✓ Free 30-minute consultation</span>
            <span>✓ No commitment required</span>
            <span>✓ Actionable insights guaranteed</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;