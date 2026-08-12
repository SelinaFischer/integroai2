import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import selinaPhoto from "@/assets/selina-founder.png";

// Short homepage introduction. Selina's fuller professional story lives on the About page.
const Founder = () => {
  return (
    <section id="founder" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[auto,1fr] gap-10 lg:gap-14 items-center">
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center lg:justify-start"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[85%] h-[85%] bg-gradient-to-br from-primary/10 via-accent-warm/10 to-primary/5 rounded-full blur-3xl" />
              </div>
              <img
                src={selinaPhoto}
                alt="Selina Fischer, Founder of IntegroAI Consulting"
                width={320}
                height={320}
                loading="lazy"
                decoding="async"
                className="relative w-64 sm:w-72 lg:w-80 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/20 z-10 h-auto"
              />
            </motion.div>

            {/* Founder Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-left"
            >
              <div>
                <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-3 px-3 py-1 bg-accent-warm/10 rounded-full">
                  Leadership
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  Meet Selina
                </h2>
                <p className="text-sm sm:text-base font-semibold text-foreground">
                  Founder of IntegroAI Consulting
                </p>
                <p className="text-sm sm:text-base text-accent-warm font-medium mb-4">
                  AI Consultant | Business &amp; Operations Advisor
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  I help business leaders understand where AI can genuinely improve how their business operates, before they invest in tools, platforms or automation.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  My approach combines practical AI consulting with more than 20 years of experience across operations, product, technology and data. I focus on understanding how work actually gets done, where operational friction exists and where technology can create measurable value.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  Successful AI adoption requires more than selecting the right technology. It depends on clear priorities, appropriate foundations, responsible implementation and the ability of the organisation to adopt new ways of working.
                </p>
              </div>

              <div className="pt-2">
                <Button variant="outline" size="default" className="group" asChild>
                  <Link to="/about">
                    More About Selina
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
