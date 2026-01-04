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
      question: "Who is IntegroAI best suited for?",
      answer: "We work primarily with SME leaders and decision-makers who want to leverage AI strategically but feel overwhelmed by the options. If you're a business owner, managing director, or department head looking to cut through the AI hype and get practical results, we're a good fit.",
    },
    {
      question: "What size businesses do you typically work with?",
      answer: "We specialise in SMEs with 20-500 employees. Large enough to benefit from AI transformation, small enough that we can make a real impact quickly. Our approach is tailored for organisations that need practical, achievable AI strategies—not enterprise-level complexity.",
    },
    {
      question: "How long does a typical engagement last?",
      answer: "It depends on your needs. A focused assessment can be completed in 2-4 weeks. Strategy and roadmapping typically takes 4-8 weeks. Implementation support can range from 3-12 months depending on scope. We always start with a discovery call to understand your situation.",
    },
    {
      question: "Do you help with specific AI tool selection?",
      answer: "Yes, vendor-agnostic guidance is part of our service. We help you evaluate options based on your specific needs, budget, and technical environment. We don't push any particular tools—our only interest is finding what works best for you.",
    },
    {
      question: "What if we're not sure where to start?",
      answer: "That's exactly why our Discovery service exists. Many clients come to us knowing they need to 'do something with AI' but aren't sure what. We'll help you understand your current state, identify opportunities, and create a clear starting point.",
    },
    {
      question: "Do you provide ongoing support after implementation?",
      answer: "Absolutely. Our Ongoing Advisory service provides regular strategic check-ins to ensure AI initiatives stay on track, adapt to change, and continue delivering value. Many clients find this invaluable as AI technology and their business needs evolve.",
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
      <section id="faq" className="py-24 lg:py-32 bg-subtle relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-accent-warm font-semibold text-sm uppercase tracking-widest mb-4 px-4 py-1.5 bg-accent-warm/10 rounded-full">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Quick answers to the questions we hear most often from SME leaders.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl border border-border/50 shadow-card px-6 data-[state=open]:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
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