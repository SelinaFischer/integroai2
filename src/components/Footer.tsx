import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import footerLogo from "@/assets/integroai-footer-logo.png";
import linkedinLogo from "@/assets/linkedin-logo.avif";
import instagramLogo from "@/assets/instagram-logo.avif";
import ContactFormModal from "./ContactFormModal";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const solutionsLinks = [
    "AI Readiness Assessments",
    "Workflow & Process Analysis",
    "AI Opportunity Mapping & Roadmap",
    "AI Governance & Responsible Adoption",
    "Custom GPTs & Workflow Automations",
    "Prompt & Context Engineering",
    "AI Training & Adoption Support",
  ];

  const companyLinks = [
    { href: "#about", label: "About" },
    { href: "#founder", label: "Founder" },
    { href: "#framework", label: "Framework" },
    { href: "#blog", label: "Blog" },
    { href: "#faq", label: "FAQ" },
  ];

  const linkClass =
    "text-white/70 hover:text-[#F6C35B] transition-colors duration-200 text-xs sm:text-sm py-1.5 block leading-relaxed";

  return (
    <footer className="bg-gradient-to-b from-[#012F46] to-[#031523] relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-[#F6C35B]/20" />
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" />

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8 xl:gap-12 mb-10 sm:mb-12">

          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src={footerLogo}
                alt="IntegroAI Consulting"
                loading="lazy"
                decoding="async"
                className="w-32 sm:w-36 h-auto object-contain"
              />
            </div>
            <p className="text-white/75 text-xs sm:text-sm max-w-xs mb-5 leading-relaxed">
              Helping business leaders find where AI can save time, reduce cost and protect margin before they invest.
            </p>
            <p className="text-[#F6C35B] text-xs sm:text-sm font-semibold tracking-wider">
              Discover › Design › Validate › Deliver › Iterate
            </p>
          </div>

          {/* Column 2 — Solutions We Offer */}
          <div>
            <h4 className="font-semibold text-white mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">
              Solutions We Offer
            </h4>
            <ul className="space-y-0.5">
              {solutionsLinks.map((label) => (
                <li key={label}>
                  <span className={linkClass}>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4 className="font-semibold text-white mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-0.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Get in Touch + Footer CTA */}
          <div>
            <h4 className="font-semibold text-white mb-4 sm:mb-5 text-xs sm:text-sm uppercase tracking-wider">
              Get in Touch
            </h4>
            <ul className="space-y-2 mb-8">
              <li>
                <a
                  href="https://www.linkedin.com/company/integroai-consulting/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-[#F6C35B] transition-colors duration-200 text-xs sm:text-sm group py-1"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:border-[#F6C35B]/50">
                    <img src={linkedinLogo} alt="" width={16} height={16} loading="lazy" decoding="async" className="w-4 h-4 rounded-sm" />
                  </div>
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/integroai_tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-[#F6C35B] transition-colors duration-200 text-xs sm:text-sm group py-1"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:border-[#F6C35B]/50">
                    <img src={instagramLogo} alt="" width={16} height={16} loading="lazy" decoding="async" className="w-4 h-4 rounded-sm" />
                  </div>
                  Instagram
                </a>
              </li>
              <li>
                <ContactFormModal
                  trigger={
                    <button className="flex items-center gap-3 text-white/70 hover:text-[#F6C35B] transition-colors duration-200 text-xs sm:text-sm group py-1 w-full">
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:border-[#F6C35B]/50">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      Send a Message
                    </button>
                  }
                />
              </li>
            </ul>

            {/* Footer CTA */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-white text-xs sm:text-sm font-semibold mb-1.5">
                Start with clarity
              </p>
              <p className="text-white/60 text-xs leading-relaxed mb-3">
                Find where AI can save time, reduce cost and protect margin before you invest.
              </p>
              <a
                href="https://integroai.tech/assessment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-[#F6C35B]/50 text-[#F6C35B] hover:bg-[#F6C35B]/10 hover:border-[#F6C35B] transition-all duration-200 rounded-lg px-3.5 py-2 text-xs font-medium"
              >
                Start the Assessment
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom legal bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col items-center gap-3 text-xs text-white/55">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                to="/privacy-policy"
                className="text-white/55 hover:text-[#F6C35B] transition-colors duration-200 font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-white/55 hover:text-[#F6C35B] transition-colors duration-200 font-medium"
              >
                Terms of Service
              </Link>
            </div>
            <p>© {currentYear} IntegroAI Consulting. All rights reserved.</p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
