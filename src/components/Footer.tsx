import { Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/integroai-logo-mark.webp";
import hccLogo from "@/assets/hillingdon-chamber-logo.png";
import ContactFormModal from "./ContactFormModal";
import { ASSESSMENT_URL } from "@/lib/motion";
import { scrollToSection } from "@/lib/scrollToSection";
import { EXTRA_SERVICES_SECTION_ID } from "@/lib/extraServices";
import { GUIDE_PAGE_PATH } from "@/lib/guide";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // sectionId scrolls to that section of /work-with-me after navigating.
  const solutionsLinks: { label: string; sectionId?: string }[] = [
    { label: "AI & Operations Diagnostic" },
    { label: "AI Strategy & Prioritisation Roadmap" },
    { label: "AI Foundations & Responsible Adoption" },
    { label: "AI & Automation Implementation" },
    { label: "Ongoing AI & Operations Advisory" },
    { label: "AI Voice Receptionist", sectionId: EXTRA_SERVICES_SECTION_ID },
    { label: "Website Design & Build", sectionId: EXTRA_SERVICES_SECTION_ID },
    { label: "AI Search Visibility (AEO & GEO)", sectionId: EXTRA_SERVICES_SECTION_ID },
  ];

  const companyLinks = [
    { to: "/work-with-me", label: "Work With Me" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: GUIDE_PAGE_PATH, label: "Free AI Visibility Guide" },
  ];

  const headingClass = "mb-2 text-xs font-bold uppercase tracking-[0.14em] text-brand-navy";
  const linkClass =
    "block py-[5px] text-left text-[15px] text-[#42566A] underline-offset-4 transition-colors duration-200 hover:text-brand-navy hover:underline";
  const socialClass = `${linkClass} flex items-center gap-2.5`;

  return (
    <footer className="border-t border-brand-sand bg-white pt-14 pb-9">
      <div className="wrap flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.2fr_0.8fr_0.8fr]">
          {/* Column 1: brand */}
          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 text-brand-navy">
              <img src={logo} alt="" width={50} height={50} loading="lazy" decoding="async" className="h-[50px] w-[50px] object-contain" />
              <span className="flex flex-col gap-[3px]">
                <span className="text-xl font-bold leading-[1.1] tracking-[0.01em]">IntegroAI Consulting</span>
                <span className="text-[13px] font-bold leading-tight text-brand-amber [word-spacing:0.16em]">Simplify · Prioritise · Grow</span>
              </span>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-[#42566A]">
              Helping business leaders find where AI can save time, reduce cost and protect margin before they invest.
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-[#42566A]">
              IntegroAI Consulting is an independent AI consultancy for founder-led businesses, offering AI consulting across the UK: AI strategy consulting, AI advisory and business automation consulting.
            </p>
          </div>

          {/* Column 2: solutions */}
          <nav aria-label="Solutions we offer">
            <h2 className={`${headingClass}`}>Solutions We Offer</h2>
            <ul className="list-none">
              {solutionsLinks.map(({ label, sectionId }) => (
                <li key={label}>
                  <Link
                    to="/work-with-me"
                    className={linkClass}
                    onClick={sectionId ? () => scrollToSection(sectionId, 250) : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: company */}
          <nav aria-label="Company">
            <h2 className={`${headingClass}`}>Company</h2>
            <ul className="list-none">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={ASSESSMENT_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  AI Readiness Assessment
                </a>
              </li>
              <li>
                <ContactFormModal trigger={<button className={`${linkClass} w-full`}>Contact</button>} />
              </li>
            </ul>
          </nav>

          {/* Column 4: get in touch */}
          <div>
            <h2 className={`${headingClass}`}>Get in Touch</h2>
            <ul className="list-none">
              <li>
                <a
                  href="https://www.linkedin.com/company/integroai-consulting/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialClass}
                >
                  <Linkedin className="h-[18px] w-[18px] flex-none text-brand-navy" strokeWidth={2} aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/integroai_tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={socialClass}
                >
                  <Instagram className="h-[18px] w-[18px] flex-none text-brand-navy" strokeWidth={2} aria-hidden="true" />
                  Instagram
                </a>
              </li>
              <li>
                <ContactFormModal
                  trigger={
                    <button className={`${socialClass} w-full`}>
                      <Mail className="h-[18px] w-[18px] flex-none text-brand-navy" strokeWidth={2} aria-hidden="true" />
                      Send a Message
                    </button>
                  }
                />
              </li>
            </ul>
          </div>
        </div>

        {/* Membership logos, centred */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-brand-sand pt-6">
          {/* AIBL Verified Partner Badge */}
              <a
                href="https://aiblmedia.com/ai-enablement-directory/integroai-consulting/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IntegroAI Consulting, aibl Verified AI Enablement Partner 2026. View our directory listing."
                className="inline-flex flex-shrink-0 rounded-xl overflow-hidden transition-transform duration-200 hover:scale-[1.03]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 340 110"
                  width="170"
                  height="55"
                  role="img"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="badge-clip">
                      <rect width="340" height="110" rx="10" ry="10" />
                    </clipPath>
                  </defs>
                  {/* Background */}
                  <rect width="340" height="110" rx="10" ry="10" fill="#0B1829" />
                  {/* Bottom teal stripe */}
                  <rect y="96" width="340" height="14" fill="#00D4C8" clipPath="url(#badge-clip)" />
                  {/* aibl logo text */}
                  <text x="38" y="54" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="26" fill="#FFFFFF">aibl</text>
                  {/* Teal underline */}
                  <rect x="38" y="60" width="44" height="3" fill="#00D4C8" />
                  {/* Vertical divider */}
                  <rect x="100" y="18" width="1.5" height="64" fill="#00D4C8" opacity="0.7" />
                  {/* AI Enablement Directory */}
                  <text x="118" y="45" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18" fill="#C8F000">AI Enablement</text>
                  <text x="118" y="67" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18" fill="#C8F000">Directory</text>
                  {/* Verified partner 2026 */}
                  <text x="118" y="86" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="11" fill="#FFFFFF" opacity="0.9">Verified partner 2026</text>
                </svg>
              </a>

          {/* Hillingdon Chamber of Commerce */}
          <a
            href="https://hillingdonchamber.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="IntegroAI Consulting is a member of Hillingdon Chamber of Commerce"
            className="inline-flex flex-shrink-0 overflow-hidden rounded-xl transition-transform duration-200 hover:scale-[1.03]"
          >
            <img
              src={hccLogo}
              alt="Hillingdon Chamber of Commerce member"
              width={170}
              height={55}
              loading="lazy"
              decoding="async"
              className="block h-[55px] w-auto object-contain"
            />
          </a>
        </div>

        <div className="flex flex-col items-center justify-between gap-x-7 gap-y-3 border-t border-brand-sand pt-6 text-sm text-[#42566A] sm:flex-row">
          <p>© {currentYear} IntegroAI Consulting. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy-policy" className="py-1.5 underline-offset-4 hover:text-brand-navy hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="py-1.5 underline-offset-4 hover:text-brand-navy hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
