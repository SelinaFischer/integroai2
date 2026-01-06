import { AlertTriangle, Users, Database, GraduationCap, Target } from "lucide-react";
import { motion } from "framer-motion";

const PainPoints = () => {
  const painPoints = [
    {
      icon: Users,
      title: "Leadership not driving AI",
      description: "AI initiatives stall without executive sponsorship and clear ownership",
    },
    {
      icon: Target,
      title: "No clear priorities",
      description: "Too many ideas, not enough focus on what will actually move the needle",
    },
    {
      icon: Database,
      title: "Weak data foundations",
      description: "Rushing to implement AI tools before your data is ready to support them",
    },
    {
      icon: GraduationCap,
      title: "Team knowledge gaps",
      description: "Staff unsure how to use AI effectively or integrate it into their work",
    },
    {
      icon: AlertTriangle,
      title: "No success metrics",
      description: "Can't prove ROI because there's no baseline or measurement framework",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-subtle relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '48px 48px'
      }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-3 px-3 py-1 bg-accent-warm/10 rounded-full">
            The Reality
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4">
            Why AI Fails for Most SMEs
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Automating broken processes only scales the chaos. Most organisations rush to implement without fixing what's already broken.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-6xl mx-auto"
        >
          {painPoints.map((point) => (
            <motion.div
              key={point.title}
              variants={itemVariants}
              className="group bg-card rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-card hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-border/50 relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-destructive/15 group-hover:scale-110 transition-all duration-300">
                  <point.icon className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
                </div>
                <h3 className="text-sm sm:text-base font-bold mb-1.5 sm:mb-2">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-10 sm:mt-14 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent-warm/20 to-primary/20 rounded-xl blur-lg" />
            <p className="relative text-sm sm:text-base font-medium bg-card border border-border/50 rounded-xl p-5 sm:p-6 shadow-lg">
              <span className="text-primary font-bold">IntegroAI Consulting</span> provides the structure, discipline, and clarity required to make AI deliver measurable outcomes.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPoints;