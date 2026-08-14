import { ClipboardCheck, Search, Target, ShieldCheck, Cog, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Prospect-facing consulting journey. This is intentionally distinct from the
// IntegroAI Operating Framework (Discover → Design → Validate → Deliver → Iterate),
// which describes how IntegroAI executes work rather than the stages a client can engage.
// Visual language (gradient icon tiles, gold step numbers) intentionally matches
// the Operating Framework section for a consistent look across the homepage.
// Full detail on each stage lives on /work-with-me, one click away via the
// button below. `description` isn't rendered on screen — it only feeds the
// hidden schema.org microdata so search engines still see a full description.
// Numbering (01–06) matches the stage numbers on /work-with-me, where the
// free assessment is Stage 01 rather than a separate, unnumbered item.
const stages = [
  {
    icon: ClipboardCheck,
    number: "01",
    title: "AI Readiness Assessment",
    description: "A 5-minute self-assessment to see where you stand before you invest in AI.",
    gradient: "from-accent-warm to-amber-400",
    ctaLabel: "Start free assessment",
    ctaHref: "https://integroai.tech/assessment",
  },
  {
    icon: Search,
    number: "02",
    title: "AI & Operations Diagnostic",
    description: "Identify the workflow bottlenecks costing you time, capacity or control.",
    gradient: "from-primary to-cyan-600",
  },
  {
    icon: Target,
    number: "03",
    title: "AI Strategy & Prioritisation Roadmap",
    description: "Identify which opportunities are worth pursuing first.",
    gradient: "from-accent-warm to-amber-400",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "AI Foundations & Responsible Adoption",
    description: "Get the foundations right before you adopt AI.",
    gradient: "from-primary to-cyan-600",
  },
  {
    icon: Cog,
    number: "05",
    title: "AI & Automation Implementation",
    description: "Turn validated opportunities into working solutions.",
    gradient: "from-accent-warm to-amber-400",
  },
  {
    icon: TrendingUp,
    number: "06",
    title: "Ongoing AI & Operations Advisory",
    description: "Review what's working, and refine what's next.",
    gradient: "from-primary to-cyan-600",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-warm/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-3 px-3 py-1 bg-accent-warm/10 rounded-full">
              Our Approach
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 text-center">
              How IntegroAI Helps
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              Start with the free assessment. Then focus on the areas your business needs most.
            </p>
          </motion.div>

          {/* Stage cards — every card shares the same icon/number/title rows so
              they align across the grid; only the free assessment card (01)
              has a trailing CTA, added after those shared rows so it never
              throws off the alignment of the others. A faint numeral
              watermark plus a visible one-line description give each card
              enough visual weight that the grid doesn't read as empty. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {stages.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group bg-card rounded-2xl border border-border/40 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 p-7 sm:p-8 flex flex-col items-center text-center relative overflow-hidden"
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemListElement"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative z-10`}>
                  <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>

                <span className="text-accent-warm font-bold text-xs tracking-wider mb-1.5 relative z-10">
                  {item.number}
                </span>

                <h3 className="text-base sm:text-lg font-bold tracking-tight leading-snug relative z-10" itemProp="name">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mt-2 relative z-10" itemProp="description">
                  {item.description}
                </p>

                {item.ctaHref && (
                  <a
                    href={item.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-full bg-accent-warm/10 text-accent-warm font-semibold text-sm hover:bg-accent-warm/15 hover:gap-2.5 transition-all relative z-10"
                  >
                    {item.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </motion.article>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10 sm:mt-14"
          >
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to="/work-with-me">
                Explore How We Can Work Together
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Services;
