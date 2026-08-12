export interface FaqItem {
  question: string;
  answer: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOMEPAGE FAQ — exactly 8 questions, shown on the homepage and used to build
// the visible FAQPage structured data. Do not add further questions here
// without also updating the schema and the acceptance criteria in the brief.
// The three former assessment-related questions (what it is / how long and
// cost / what happens after) are consolidated into a single question below.
// ─────────────────────────────────────────────────────────────────────────────

export const homepageFaqs: FaqItem[] = [
  {
    question: "What makes IntegroAI different from other AI consultancies?",
    answer:
      "IntegroAI is an independent, technology-agnostic AI consultancy. We start with operational clarity, understanding how your business actually works, before considering where AI or automation is worth introducing. Recommendations are shaped around your priorities and constraints rather than a preferred platform or vendor.",
  },
  {
    question: "Who is IntegroAI best suited for?",
    answer:
      "IntegroAI is best suited to founder-led service businesses, and the leaders and operations teams within them, where manual work, fragmented processes or capacity pressure are affecting performance and where clarity is needed before any AI investment.",
  },
  {
    question: "What is the 5-Minute AI Readiness Assessment, and what happens after I complete it?",
    answer:
      "The 5-Minute AI Readiness Assessment is a free introductory self-assessment that gives you an initial view of where your business stands and where readiness gaps may exist. It considers areas including workflow, data, systems, adoption and investment priorities. After completing it, you receive an initial score and summary, and you can book a free Discovery Call to talk through the results and appropriate next steps. It is not a full operational diagnostic and does not replace consultant-led analysis; that deeper work is covered separately by the AI & Operations Diagnostic.",
  },
  {
    question: "When should a business not invest in AI?",
    answer:
      "A business should hold off on AI when the core problem is unclear, processes are inconsistent, or data is unreliable. AI tends to amplify what already exists, so introducing it on top of unclear foundations can add cost and complexity without creating value.",
  },
  {
    question: "Do our processes need to be perfect before using AI?",
    answer:
      "No. Processes do not need to be perfect, but it helps to understand where the workflow bottlenecks, data issues and ownership gaps sit first. Once those foundations are clearer, AI can be applied selectively where it genuinely reduces friction.",
  },
  {
    question: "Can IntegroAI help us decide between AI, automation and process improvement?",
    answer:
      "Yes. Part of our role is helping you decide whether the right next step is AI, automation, clearer process design, better data or improved ownership. Not every operational issue needs an AI solution.",
  },
  {
    question: "Do we need technical staff or a data team to work with IntegroAI?",
    answer:
      "No. You do not need a data team or in-house technical staff to get started. Engagements begin with understanding your operations, goals and constraints. Specialist technical support can be introduced later if it is genuinely needed.",
  },
  {
    question: "What does a typical engagement with IntegroAI look like, and how is consulting priced?",
    answer:
      "Most engagements begin with the free 5-Minute AI Readiness Assessment, followed where appropriate by a Discovery Call and, if needed, an AI & Operations Diagnostic to build a clear, evidence-based view of the business. From there, IntegroAI can support prioritisation, preparation, implementation or ongoing advisory, depending on what adds value. Pricing is scoped individually based on the nature and depth of the engagement, and there is no obligation until scope and cost are agreed.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXTENDED FAQ — the fuller original question set, preserved for a possible
// future dedicated FAQ page and for SEO reference. Not currently rendered
// anywhere, and intentionally excluded from the homepage FAQPage schema so
// that structured data matches visible content.
// ─────────────────────────────────────────────────────────────────────────────

export const extendedFaqs: FaqItem[] = [
  ...homepageFaqs,
  {
    question: "Can you help us choose between AI, automation, and workflow improvement?",
    answer:
      "Yes. IntegroAI helps you decide whether the right solution is AI, automation, workflow redesign, clearer data structure, or better process ownership. Not every operational problem needs AI.",
  },
  {
    question: "What is an AI Readiness Assessment and what does IntegroAI cover?",
    answer:
      "Our free 5-Minute AI Readiness Assessment is a short online questionnaire that helps you understand whether your business is ready to invest in AI at all. It looks at leadership alignment, process quality, data foundations, team capacity, and where AI is actually relevant, so you can see where AI is worth pursuing and where it is not.",
  },
  {
    question: "How long does the AI Readiness Assessment take and how much does it cost?",
    answer:
      "The assessment takes around five minutes to complete and is free. You receive an initial score and a clear view of your operational readiness for AI without any obligation.",
  },
  {
    question: "What happens after I complete the AI Readiness Assessment?",
    answer:
      "You receive your AI readiness score and summary on screen and by email. Based on the results, you can then book a free Discovery Call to walk through the analysis and define practical next steps for your business.",
  },
];
