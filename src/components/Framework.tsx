import { Compass, Map, Settings, TrendingUp, RefreshCw, ArrowRight } from "lucide-react";

const Framework = () => {
  const steps = [
    {
      icon: Compass,
      step: "01",
      title: "Discover",
      description: "Understand your current state and identify real opportunities for AI impact",
      color: "bg-accent-warm",
    },
    {
      icon: Map,
      step: "02",
      title: "Strategise",
      description: "Define priorities and create a focused plan with achievable first steps",
      color: "bg-primary",
    },
    {
      icon: Settings,
      step: "03",
      title: "Implement",
      description: "Turn ideas into solutions with guided implementation support",
      color: "bg-accent-warm",
    },
    {
      icon: TrendingUp,
      step: "04",
      title: "Grow",
      description: "Measure progress, refine the approach, and scale what works",
      color: "bg-primary",
    },
    {
      icon: RefreshCw,
      step: "05",
      title: "Iterate",
      description: "Continuous improvement through each cycle of the journey",
      color: "bg-accent-warm",
    },
  ];

  return (
    <section id="framework" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent-warm font-semibold text-sm uppercase tracking-wider mb-4 block">
            Our Approach
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
            A Clear Journey for AI Success
          </h2>
          <p className="text-muted-foreground text-lg">
            From uncertainty to confident execution—a proven framework that guides you every step of the way.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-warm via-primary to-accent-warm" />
            
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className={`relative z-10 w-14 h-14 rounded-full ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  {/* Arrow (except last) */}
                  {index < steps.length - 1 && (
                    <ArrowRight className="absolute top-5 -right-2 w-4 h-4 text-muted-foreground z-20" />
                  )}
                  
                  <span className="text-accent-warm font-bold text-sm mb-2">{step.step}</span>
                  <h3 className="font-serif text-xl text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Timeline */}
        <div className="lg:hidden max-w-lg mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-warm via-primary to-accent-warm" />
            
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.title} className="relative flex gap-6">
                  <div className={`relative z-10 w-14 h-14 rounded-full ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="pt-2">
                    <span className="text-accent-warm font-bold text-sm">{step.step}</span>
                    <h3 className="font-serif text-xl text-foreground mb-1">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Framework;
