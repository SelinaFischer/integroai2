import { MonitorSmartphone, PhoneCall, ScanSearch, type LucideIcon } from "lucide-react";
import { GUIDE_FORM_URL } from "@/lib/guide";

// Standalone services offered alongside the six consulting stages.
// Kept brief on purpose. Shown on the homepage and on /work-with-me.
export const EXTRA_SERVICES_SECTION_ID = "more-ways-we-help";

type ExtraService = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Optional link shown under the description. Opens in a new tab. */
  link?: { label: string; href: string };
};

export const extraServices: ExtraService[] = [
  {
    title: "AI Voice Receptionist",
    icon: PhoneCall,
    description:
      "Spend less time answering calls and capture enquiries while you’re busy. An AI phone assistant answers 24/7, books appointments, takes messages and passes callers to your team when needed.",
  },
  {
    title: "Website Design & Build",
    icon: MonitorSmartphone,
    description:
      "Make it easy for customers to understand what you offer and get in touch. A professional website for your business, designed, built and launched for you.",
  },
  {
    title: "AI Search Visibility (AEO & GEO)",
    icon: ScanSearch,
    description:
      "Be found, understood and recommended when customers ask AI for a business like yours. We review how Google and AI tools see your business, then improve the clarity, consistency and content that help you get recommended.",
    link: { label: "Get your free guide: Does AI know your business exists?", href: GUIDE_FORM_URL },
  },
];
