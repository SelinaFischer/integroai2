import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const FAQ = () => {
  const faqs = [
    {
      question: "What is AI consulting for SMEs?",
      answer: "AI consulting for SMEs focuses on helping leaders decide where AI is worth pursuing before committing budget, tools, or teams. The work centres on readiness, prioritisation, and commercially grounded decision-making. The goal is to avoid wasted spend and apply AI only where it can deliver measurable value.",
    },
    {
      question: "Who is IntegroAI Consulting best suited for?",
      answer: "IntegroAI Consulting is best suited for SME leaders who want clear judgement before investing in AI. This includes founders and senior leaders responsible for priorities, risk, and outcomes. If you value structured, vendor-agnostic decision support, the approach is a strong fit.",
    },
    {
      question: "How much does AI consulting cost for small businesses?",
      answer: "Costs depend on scope, complexity, and the level of clarity already in place. Engagements are scoped per project and anchored in the value created, not hours. Most work begins with an AI Readiness Assessment to clarify priorities, risks, and potential return.",
    },
    {
      question: "Do you help with AI tool selection?",
      answer: "Yes, when tool selection is the right step. All recommendations are vendor-agnostic and assessed against business needs, constraints, and risk. Tool decisions come after problem clarity and readiness are established, not before.",
    },
    {
      question: "What if we're not sure where to start with AI?",
      answer: "Uncertainty is a common starting point. The AI Readiness Assessment helps clarify whether AI is appropriate now, where gaps exist, and which problems are worth addressing first. This prevents rushed decisions and protects budget.",
    },
    {
      question: "How long does it take to see value from AI?",
      answer: "Timelines vary based on readiness, problem definition, and adoption. Some organisations see early value from focused use cases, while others need to address foundations first. Choosing the right problem is the fastest route to value.",
    },
    {
    question: "What is an AI Readiness Assessment?",
    answer:
      "An AI Readiness Assessment evaluates whether a business is prepared to invest in AI. It looks at problem clarity, processes, data foundations, and organisational readiness before tools are considered. The outcome is clearer priorities, risks, and next steps.",
    },
    {
    question: "When should a business not invest in AI?",
    answer:
      "AI investment should pause when problems are unclear, processes are broken, or data foundations are weak. Without leadership alignment and defined success measures, AI often adds complexity rather than value. In these cases, restraint is the better decision.",
    },
    ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-subtle relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-accent-warm font-semibold text-xs uppercase tracking-widest mb-3 px-3 py-1 bg-accent-warm/10 rounded-full">
            Common Questions
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Quick answers to the questions we hear most often from SME leaders.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg sm:rounded-xl border border-border/50 shadow-card px-4 sm:px-5 data-[state=open]:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-sm sm:text-base hover:no-underline py-4 sm:py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-4 sm:pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
      </section>
    </>
  );
};

export default FAQ;
