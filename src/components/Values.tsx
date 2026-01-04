import { Lightbulb, Shield, Award, BarChart3 } from "lucide-react";

const Values = () => {
  const values = [
    {
      icon: Lightbulb,
      title: "Clarity",
      description: "Clear communication and transparent processes that cut through complexity. No jargon, just straight talk.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Honest guidance and ethical practices that build lasting trust. We'll tell you when AI isn't the answer.",
    },
    {
      icon: Award,
      title: "Capability",
      description: "Deep expertise and practical skills that deliver real results. We've been in your shoes.",
    },
    {
      icon: BarChart3,
      title: "Results",
      description: "Measurable outcomes and accountable delivery that drive growth. If we can't measure it, we don't do it.",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left content */}
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider mb-4 block">
                About IntegroAI
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
                AI Succeeds When Strategy, Data & People Align
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Most organisations fail because they rush into tools without clarity and purpose. IntegroAI applies a simple principle:
              </p>
              <blockquote className="border-l-4 border-accent pl-6 py-2 mb-8">
                <p className="text-xl font-serif text-foreground italic">
                  "Clarity first. Solutions second. Results that can be measured."
                </p>
              </blockquote>
              <p className="text-muted-foreground">
                Built on a commitment to help organisations use AI responsibly and effectively. Our mission is to simplify the complex, amplify what works, and help leaders and teams grow with confidence.
              </p>
            </div>

            {/* Right - Values grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card rounded-xl p-6 shadow-card border border-border/50 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <value.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
