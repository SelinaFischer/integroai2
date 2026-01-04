import { Search, Route, GraduationCap, Cog, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Search,
      number: "01",
      title: "Assessment & Readiness",
      description: "Understand your current state, identify pain points, and evaluate realistic AI opportunities. Walk away with a clear picture of what's possible.",
      outcomes: ["Gap analysis", "Opportunity mapping", "Readiness score"],
      ctaLink: "https://tally.so/r/68jDMA",
      ctaText: "Take Assessment",
    },
    {
      icon: Route,
      number: "02",
      title: "Strategy & Roadmapping",
      description: "Prioritise use cases, analyse impact vs effort, and build a focused plan that moves your organisation forward with confidence.",
      outcomes: ["Prioritised roadmap", "Business case", "Quick wins"],
    },
    {
      icon: GraduationCap,
      number: "03",
      title: "Training & Capability",
      description: "Upskill your team to use AI effectively, covering tools, prompting, governance and integration into daily workflows.",
      outcomes: ["Hands-on workshops", "Best practices", "Team confidence"],
    },
    {
      icon: Cog,
      number: "04",
      title: "Implementation Support",
      description: "Hands-on guidance through your first AI projects. From pilot to production with practical support at every stage.",
      outcomes: ["Vendor selection", "Pilot programs", "Change management"],
    },
    {
      icon: Users,
      number: "05",
      title: "Ongoing Advisory",
      description: "Regular strategic check-ins to ensure AI initiatives stay on track, adapt to change, and continue delivering value.",
      outcomes: ["Monthly reviews", "KPI tracking", "Strategic pivots"],
    },
    {
      icon: ShieldCheck,
      number: "06",
      title: "Governance & Ethics",
      description: "Establish responsible AI practices with clear policies, risk frameworks, and compliance guidance.",
      outcomes: ["AI policy", "Risk framework", "Compliance checklist"],
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent-warm font-semibold text-sm uppercase tracking-wider mb-4 block">
            How We Help
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            Services That Drive Results
          </h2>
          <p className="text-muted-foreground text-lg">
            Clear structure. Practical support. Measurable outcomes. Everything you need to make AI work for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50 flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-muted-foreground/40 font-serif text-2xl font-bold">
                  {service.number}
                </span>
              </div>
              
              <h3 className="font-serif text-xl text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {service.outcomes.map((outcome) => (
                  <span
                    key={outcome}
                    className="text-xs font-medium bg-secondary/50 text-foreground px-3 py-1 rounded-full"
                  >
                    {outcome}
                  </span>
                ))}
              </div>

              {service.ctaLink && (
                <a
                  href={service.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
                >
                  {service.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <a href="https://calendly.com/integroai-consulting/30min" target="_blank" rel="noopener noreferrer">
              Discuss Your Needs
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
