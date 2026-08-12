import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#012F46] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent-warm/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
            Make Clearer AI Decisions Before You Invest.
          </h2>
          <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Identify where operational friction is limiting performance, where AI may create value, and what the most appropriate next step should be.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" className="group w-full sm:w-auto" asChild>
              <a href="https://integroai.tech/assessment" target="_blank" rel="noopener noreferrer">
                Start the AI Readiness Assessment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="w-full sm:w-auto" asChild>
              <a href="https://calendly.com/integroai-tech/30min" target="_blank" rel="noopener noreferrer">
                Book a Discovery Call
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
