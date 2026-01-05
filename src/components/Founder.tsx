import { motion } from "framer-motion";
import { Linkedin, Target, Compass, CheckCircle, Rocket } from "lucide-react";
import selinaPhoto from "@/assets/selina-founder.png";

const Founder = () => {
  const framework = [
    {
      icon: Compass,
      title: "Discover",
      description: "Identify where AI genuinely adds value and where it introduces risk"
    },
    {
      icon: Target,
      title: "Design",
      description: "Map the strategy to prioritize direction before tools"
    },
    {
      icon: CheckCircle,
      title: "Validate",
      description: "Confirm the solution solves a specific business pain with measurable ROI"
    },
    {
      icon: Rocket,
      title: "Deliver",
      description: "Move from strategy to implementation with accountability"
    }
  ];

  return (
    <section id="founder" className="py-20 lg:py-28 bg-gradient-to-b from-primary/95 to-primary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Founder Info - Now on Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 order-2 lg:order-1"
          >
            <div>
              <span className="text-accent-warm font-semibold text-sm tracking-wider uppercase">
                Leadership
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mt-2">
                Meet the Founder
              </h2>
            </div>

            <p className="text-primary-foreground/90 text-lg leading-relaxed">
              Most AI failures are not technical—they are strategic. I provide the Decision Clarity 
              leaders need to ensure AI is a business win, not a waste of budget.
            </p>

            <p className="text-primary-foreground/80 leading-relaxed">
              With 20 years of experience across product management, technology, and building 
              commercial businesses, I collaborate with a network of certified AI consultants 
              and implementation specialists to provide comprehensive support for SMEs.
            </p>

            <blockquote className="border-l-4 border-accent-warm pl-6 py-2 italic text-primary-foreground/90">
              "If you want clarity on where AI fits before committing time or budget, I help you 
              determine if AI is your next big win or your next big waste of resources."
            </blockquote>

            {/* Framework */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-4">
              {framework.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white/10 border border-white/20 cursor-default transition-all duration-300 hover:bg-white/15 hover:border-accent-warm/30 hover:shadow-lg"
                >
                  <div className="p-2 rounded-lg bg-accent-warm/20 shrink-0">
                    <item.icon className="w-4 h-4 text-accent-warm" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-primary-foreground text-sm">{item.title}</h4>
                    <p className="text-xs text-primary-foreground/70 leading-relaxed line-clamp-3 sm:line-clamp-none">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* LinkedIn Link */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 group">
              <a
                href="https://www.linkedin.com/in/selinafischer8/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-warm hover:text-accent-warm/80 transition-all duration-300 font-medium group-hover:translate-x-1 py-2 min-h-[44px]"
              >
                <Linkedin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                Connect on LinkedIn
              </a>
              <span className="text-primary-foreground/60 text-sm italic sm:border-l sm:border-primary-foreground/30 sm:pl-3">Learn more about me</span>
            </div>
          </motion.div>

          {/* Founder Image - Now on Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative max-w-md lg:max-w-lg">
              <img 
                src={selinaPhoto} 
                alt="Selina Fischer - IntegroAI Founder and CEO" 
                width={500}
                height={500}
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Founder;
