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
      answer: "AI consulting for SMEs helps leaders decide where AI fits in the business before committing budget, tools, or teams. It focuses on decision clarity, readiness, and commercially grounded prioritisation. Typical work includes defining the business problem, assessing process and data foundations, and mapping a realistic sequence of initiatives. The goal is to avoid wasted spend and pursue AI only where it can deliver measurable value.",
    },
    {
      question: "Who is IntegroAI Consulting best suited for?",
      answer: "IntegroAI Consulting is best suited for SME leaders who want clear judgement before investing in AI initiatives. This includes founders, managing directors, and functional leaders who need clarity on priorities, risks, and readiness. If you want vendor-agnostic advice and a structured decision path, you will fit well. A good starting point is the AI Readiness Assessment.",
    },
    {
      question: "How much does AI consulting cost for small businesses?",
      answer: "Costs depend on scope, complexity, and how much decision clarity already exists. Most SME engagements begin with an AI Readiness Assessment to establish priorities, gaps, and risks before any roadmap or delivery work. Strategy and roadmapping typically follows once the decision to proceed is justified. This approach helps ensure investment decisions are proportionate and grounded.",
    },
    {
      question: "Do you help with AI tool selection?",
      answer: "Yes, when tool selection is the right step. We stay vendor-agnostic and evaluate tools against your business needs, constraints, and risk profile. Tool selection comes after problem clarity, readiness, and success measures are defined. This keeps decisions grounded and reduces the chance of automating the wrong process.",
    },
    {
      question: "What if we're not sure where to start with AI?",
      answer: "Start by clarifying the business problem and whether AI is worth pursuing right now. The AI Readiness Assessment helps you identify readiness gaps across leadership, process, and data, and highlights where clarity is still missing. From there, you can prioritise a small number of initiatives based on value, risk, and feasibility. This approach protects budget and avoids rushed decisions.",
    },
    {
      question: "How long does it take to see value from AI?",
      answer: "Timelines vary because value depends on problem clarity, foundations, and adoption. Some organisations see early value from narrow, well-defined use cases, while others need to address process or data gaps first. The fastest route to value is choosing the right problem and defining success measures before tools are selected. The AI Readiness Assessment is designed to establish that starting point.",
    },
    {
    question: "What is an AI Readiness Assessment?",
    answer:
      "An AI Readiness Assessment helps SME leaders understand whether their business is prepared to invest in AI. It examines the clarity of the business problem, current processes, data foundations, and organisational readiness before any tools or platforms are considered. The assessment highlights risks, gaps, and priority areas so decisions are made with confidence rather than assumption.",
    },
    {
    question: "When should a business not invest in AI?",
    answer:
      "A business should pause AI investment when the underlying problem is unclear, processes are broken, or data foundations are weak. If success measures are undefined or leadership alignment is missing, AI often adds complexity rather than value. In these situations, restraint is the smarter decision until fundamentals are addressed.",
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
