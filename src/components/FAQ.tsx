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
      answer: "AI consulting for SMEs is a specialised service that helps small and medium-sized businesses (typically 20-500 employees) understand, plan, and implement artificial intelligence solutions. Unlike enterprise consulting, SME-focused AI consulting provides practical, achievable strategies tailored to smaller budgets and teams, focusing on quick wins and measurable ROI rather than complex, multi-year transformations.",
    },
    {
      question: "Who is IntegroAI best suited for?",
      answer: "IntegroAI works primarily with SME leaders and decision-makers who want to leverage AI strategically but feel overwhelmed by the options. If you're a business owner, managing director, or department head at a company with 20-500 employees looking to cut through the AI hype and get practical results, we're a good fit. Our clients typically want vendor-agnostic guidance and a clear roadmap rather than being sold specific tools.",
    },
    {
      question: "How much does AI consulting cost for small businesses?",
      answer: "AI consulting costs for SMEs vary based on scope. A focused AI readiness assessment typically takes 2-4 weeks. Strategy and roadmapping projects run 4-8 weeks. Implementation support can range from 3-12 months. We always start with a free discovery call to understand your situation and provide a tailored proposal. Our approach is designed to deliver measurable ROI, ensuring the investment pays for itself.",
    },
    {
      question: "Do you help with specific AI tool selection?",
      answer: "Yes, vendor-agnostic guidance is core to our service. We help you evaluate AI tools and platforms based on your specific needs, budget, and technical environment. We don't push any particular vendors or receive commissions—our only interest is finding what works best for your business. This includes comparing options for automation, analytics, generative AI, and industry-specific solutions.",
    },
    {
      question: "What if we're not sure where to start with AI?",
      answer: "That's exactly why our Discovery service exists. Many clients come to us knowing they need to 'do something with AI' but aren't sure what. We'll help you understand your current state through our AI readiness assessment, identify high-impact opportunities, and create a clear starting point with prioritised use cases. No technical background required—we translate AI possibilities into business outcomes.",
    },
    {
      question: "How long does it take to see ROI from AI implementation?",
      answer: "With our Discover-Design-Validate-Deliver framework, most clients see initial ROI within 3-6 months through quick-win automation and efficiency gains. We focus on identifying high-impact, low-effort opportunities first, then build toward more transformative projects. Our ongoing advisory service includes monthly KPI tracking to ensure AI initiatives continue delivering measurable value.",
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