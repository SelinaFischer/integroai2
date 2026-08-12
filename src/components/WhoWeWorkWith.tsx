import { Building2, UserRound, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const audiences = [
  {
    icon: Building2,
    title: "Founder-Led Service Businesses",
    description:
      "Businesses where growth has increased operational complexity, manual work or coordination across teams and systems.",
  },
  {
    icon: UserRound,
    title: "Founders & Managing Directors",
    description:
      "Leaders seeking greater clarity on where operational improvement and AI investment can create meaningful value.",
  },
  {
    icon: Users,
    title: "Operations Leaders",
    description:
      "COOs and operational teams looking to reduce repetitive work, improve visibility and strengthen process ownership.",
  },
  {
    icon: TrendingUp,
    title: "Growing Teams",
    description:
      "Businesses reaching the point where manual processes, workarounds or people-dependent ways of working are becoming difficult to scale.",
  },
];

const WhoWeWorkWith = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-3 px-3 py-1 bg-accent-warm/10 rounded-full">
            Who We Serve
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4">Who We Work With</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 sm:p-7 shadow-sm border border-border/40 hover:shadow-md hover:border-primary/15 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                  <audience.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2">{audience.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{audience.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
