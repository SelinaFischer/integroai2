import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import logo from "@/assets/logo-icon-new.png";
import ContactFormModal from "./ContactFormModal";
import { scrollToSection } from "@/lib/scrollToSection";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();

      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [mobileMenuOpen]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        menuButtonRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/", label: "Our Service", sectionId: "services" },
    { to: "/work-with-me", label: "Work With Me" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Insights" },
  ];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  // Only the homepage has a full-bleed dark hero behind the header, so only
  // the homepage gets the transparent-until-scrolled treatment. Every other
  // page sits on a light background, so the header stays solid there —
  // otherwise the translucent navy reads as a different, washed-out colour.
  const isHome = location.pathname === "/";
  const solidHeader = scrolled || !isHome;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      solidHeader
        ? 'bg-nav shadow-lg border-b border-white/10'
        : 'bg-nav/70 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" aria-label="Go to IntegroAI homepage" className="flex items-center gap-2 sm:gap-3 lg:gap-4 relative z-10">
            <img
              src={logo}
              alt="IntegroAI Consulting"
              width={80}
              height={80}
              fetchPriority="high"
              decoding="async"
              className={`w-auto transition-all duration-300 ${
                scrolled ? 'h-8 sm:h-10 lg:h-14' : 'h-10 sm:h-14 lg:h-20'
              }`}
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-base sm:text-lg lg:text-2xl font-bold tracking-tight text-white">
                IntegroAI Consulting
              </span>
              <span className="text-[10px] sm:text-xs lg:text-sm font-semibold tracking-wide text-[#F6C35B]">
                Simplify · Prioritise · Grow
              </span>
            </div>
          </Link>

          {/* CTA Button + Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
            <a
              href="https://integroai.tech/assessment"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AI Readiness Assessment (opens in a new tab)"
              className="inline-flex items-center gap-1 whitespace-nowrap font-medium transition-all duration-200
                border border-[#F6C35B] hover:border-[#F6C35B]
                bg-transparent hover:bg-[#F6C35B]/[0.08]
                text-[#F6C35B] hover:text-[#F6C35B]
                rounded-[10px]
                text-[10px] sm:text-xs lg:text-[13px]
                px-2 sm:px-3 lg:px-[20px]
                h-7 sm:h-8 lg:h-[38px]"
            >
              <span>AI Readiness Assessment</span>
              <ArrowRight className="w-3 h-3 sm:w-3 sm:h-3 lg:w-4 lg:h-4 ml-1" />
            </a>

            {/* Menu Toggle */}
            <button
              ref={menuButtonRef}
              className="p-2 sm:p-3 -mr-1 sm:-mr-2 relative z-10 text-white min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Dropdown Menu — always mounted (never unmounted via `mobileMenuOpen &&`)
            and toggled with CSS instead. ContactFormModal lives inside this tree and
            owns its own Dialog/Portal; if this block were conditionally unmounted,
            clicking into the Contact form (which renders in a Portal outside
            mobileMenuRef) would trip the outside-click handler below, set
            mobileMenuOpen to false, and destroy the form mid-fill. Keeping it always
            mounted means the form survives regardless of the hamburger's open state. */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          aria-hidden={!mobileMenuOpen}
          className={`absolute top-full right-4 w-56 py-3 bg-background border border-border/50 rounded-xl shadow-xl transition-all duration-200 ${
            mobileMenuOpen
              ? "opacity-100 visible translate-y-0 pointer-events-auto"
              : "opacity-0 invisible -translate-y-2 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col gap-1 px-2" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.sectionId) scrollToSection(link.sectionId);
                }}
                aria-current={!link.sectionId && isActive(link.to) ? "page" : undefined}
                className={`text-sm font-semibold py-3 px-4 rounded-lg hover:bg-muted text-left w-full transition-colors ${
                  !link.sectionId && isActive(link.to) ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://integroai.tech/assessment"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors text-sm font-semibold py-3 px-4 rounded-lg hover:bg-muted text-left w-full"
            >
              AI Readiness Assessment
            </a>
            <ContactFormModal
              trigger={
                <button className="text-foreground hover:text-primary transition-colors text-sm font-semibold py-3 px-4 rounded-lg hover:bg-muted text-left w-full">
                  Contact
                </button>
              }
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
