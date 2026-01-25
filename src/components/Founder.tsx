import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import selinaPhoto from "@/assets/selina-founder.png";

const Founder = () => {
  return (
    <section id="founder" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-4 px-3 py-1 bg-accent-warm/10 rounded-full">
            Leadership
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Meet the Founder &amp; CEO –{" "}
            <span className="text-shimmer-gold">Selina</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[auto,1fr] gap-10 lg:gap-16 items-start">
            {/* Founder Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center lg:justify-start self-start"
            >
              {/* Decorative background */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90%] h-[90%] bg-gradient-to-br from-primary/10 via-accent-warm/10 to-primary/5 rounded-full blur-3xl" />
              </div>

              <div className="relative w-72 sm:w-96 lg:w-[28rem] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/20">
                <img
                  src={selinaPhoto}
                  alt="Selina Fischer - IntegroAI Founder and CEO"
                  width={400}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto relative z-10"
                />
              </div>
            </motion.div>

            {/* Founder Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-center lg:text-left self-start"
            >
              {/* Credentials badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  20+ Years in Product & Tech
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  AI & Data Strategy
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Leadership-Led Adoption
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  Applied AI for SMEs
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  I’ve worked in technology for over 20 years, driven by curiosity and a genuine interest in how things work. Much of my career has been in product management and delivery, turning ideas into real solutions.
               </p>

               <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                That experience shaped how I think about technology. Whatever you build needs a clear purpose. You need to understand the problem you’re solving and why it matters. Without that clarity, even good technology struggles to deliver value.
              </p>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                <span className="font-semibold text-foreground">
                  IntegroAI means integration and growth.
               </span>{" "}
              AI should integrate into how a business already operates and help it grow with intent, rather than sit on top as another disconnected layer.
             </p>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              I started IntegroAI Consulting to bring that product-led thinking to AI adoption, helping leaders approach AI with clarity, practicality, and purpose, supported by hands-on experience and formal training in AI consulting, implementation, data foundations, and leadership-led technology adoption.
           </p>
        </div>                        
                                                           
              {/* LinkedIn Link */}
              <div className="flex justify-center lg:justify-start">
                <a
                  href="https://www.linkedin.com/in/selinafischer8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-accent-warm hover:text-accent-warm/80 transition-all duration-300 font-medium hover:translate-x-1 py-2 min-h-[44px] group"
                >
                  <Linkedin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  Connect with me on LinkedIn
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
