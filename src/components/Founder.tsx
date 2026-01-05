import { motion } from "framer-motion";
import { Linkedin, Target, Compass, CheckCircle, Rocket } from "lucide-react";
import selinaPhoto from "@/assets/selina-fischer.jpg";

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
    <section id="founder" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent-warm font-semibold text-sm tracking-wider uppercase">
            Leadership
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
            Meet the Founder
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-accent-warm/20 overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src={selinaPhoto} 
                alt="Portrait of IntegroAI Founder and CEO" 
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-warm/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Founder Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Founder & CEO
              </h3>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Most AI failures are not technical—they are strategic. I provide the Decision Clarity 
              leaders need to ensure AI is a business win, not a waste of budget.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              With 20 years of experience across product management, technology, and building 
              commercial businesses, I collaborate with a network of certified AI consultants 
              and implementation specialists to provide comprehensive support for SMEs.
            </p>

            <blockquote className="border-l-4 border-accent-warm pl-6 py-2 italic text-foreground/80">
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
                  className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-background/50 border border-border/50 cursor-default transition-all duration-300 hover:bg-background/80 hover:border-accent-warm/30 hover:shadow-lg hover:shadow-accent-warm/5"
                >
                  <div className="p-2 rounded-lg bg-accent-warm/10 shrink-0 transition-colors duration-300 group-hover:bg-accent-warm/20">
                    <item.icon className="w-4 h-4 text-accent-warm" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-none">{item.description}</p>
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
              <span className="text-muted-foreground text-sm italic transition-opacity duration-300 group-hover:opacity-70 sm:border-l sm:border-muted-foreground/30 sm:pl-3">Learn more about me</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
