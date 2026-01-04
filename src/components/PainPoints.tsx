import { AlertTriangle, Users, Database, GraduationCap, Target } from "lucide-react";

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

  return (
    <section className="py-20 lg:py-28 bg-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
            The Reality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            Why AI Fails for Most SMEs
          </h2>
          <p className="text-muted-foreground text-lg">
            Most organisations push ahead with implementation without addressing the real problems. Sound familiar?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={point.title}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                <point.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">
                {point.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-lg text-foreground font-medium bg-accent/10 border border-accent/20 rounded-xl p-6">
            <span className="text-accent font-semibold">IntegroAI</span> provides the structure, discipline, and clarity required to make AI deliver measurable outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
