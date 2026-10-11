import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import logo from "@/assets/integroai-logo-mark-112.webp";
import ContactFormModal from "./ContactFormModal";
import { ASSESSMENT_URL } from "@/lib/motion";

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

  // Desktop shows the three main pages plus the assessment button. The
  // mobile menu adds Home, the assessment link and Contact.
  const primaryLinks = [
    { to: "/work-with-me", label: "Work With Me" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
  ];

  const menuLinks = [{ to: "/", label: "Home" }, ...primaryLinks];

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const scrollTopIfHome = () => {
    // React Router doesn't re-navigate (or re-trigger ScrollToTop) when the
    // target path matches the current one, so clicking the logo or "Home"
    // while already on "/" otherwise does nothing visible.
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-brand-sand bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_16px_rgba(4,27,43,0.08)]" : ""
      }`}
    >
      <div className="wrap relative">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[78px]">
          {/* Logo: mark, name and the tagline beneath it. Phones narrower
              than 390px keep the shorter two-line name with no tagline, because
              the full name does not fit beside the assessment button there; the
              tagline still shows at the foot of the menu. */}
          <Link
            to="/"
            onClick={scrollTopIfHome}
            aria-label="IntegroAI Consulting, go to homepage"
            className="flex items-center gap-2.5 rounded-lg text-brand-navy sm:gap-3"
          >
            <img
              src={logo}
              alt=""
              width={50}
              height={50}
              fetchPriority="high"
              decoding="async"
              className="h-9 w-9 flex-none object-contain sm:h-10 sm:w-10 lg:h-[50px] lg:w-[50px]"
            />
            <span className="flex flex-col gap-px min-[390px]:hidden">
              <span className="text-lg font-bold leading-[1.1] tracking-[0.01em]">IntegroAI</span>
              <span className="text-[9px] font-bold leading-tight tracking-[0.22em]">CONSULTING</span>
            </span>
            <span className="hidden flex-col gap-[3px] min-[390px]:flex">
              <span className="whitespace-nowrap text-sm font-bold leading-[1.1] tracking-[0.01em] sm:text-lg lg:text-xl">
                IntegroAI Consulting
              </span>
              <span className="whitespace-nowrap text-[9.5px] font-semibold leading-tight text-brand-slate [word-spacing:0.16em] sm:text-xs lg:text-[13px]">
                Simplify · Prioritise · Grow
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2 lg:gap-9">
            {/* Desktop navigation */}
            <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
              {primaryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  aria-current={isActive(link.to) ? "page" : undefined}
                  className={`rounded py-3 text-base font-semibold text-brand-navy underline-offset-8 decoration-brand-amber decoration-2 hover:underline ${
                    isActive(link.to) ? "underline" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <a
              href={ASSESSMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start the free AI Readiness Assessment (opens in a new tab)"
              className="inline-flex items-center whitespace-nowrap rounded-full bg-brand-amber px-3 py-2.5 text-[12.5px] font-semibold leading-tight text-brand-navy transition-colors duration-200 hover:bg-[#FFAA2B] sm:px-5 sm:text-sm lg:py-[11px] lg:text-[15px]"
            >
              <span className="sm:hidden">Free assessment</span>
              <span className="hidden sm:inline">Start the free assessment</span>
            </a>

            {/* Menu toggle (mobile and tablet) */}
            <button
              ref={menuButtonRef}
              className="-mr-2 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-brand-navy transition-colors hover:bg-brand-ivory lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
          className={`absolute top-full right-4 w-60 rounded-2xl border border-brand-sand bg-white py-3 shadow-xl transition-all duration-200 lg:hidden ${
            mobileMenuOpen
              ? "opacity-100 visible translate-y-0 pointer-events-auto"
              : "opacity-0 invisible -translate-y-2 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col gap-1 px-2" aria-label="Mobile navigation">
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.to === "/") scrollTopIfHome();
                }}
                aria-current={isActive(link.to) ? "page" : undefined}
                className={`w-full rounded-lg px-4 py-3 text-left text-[15px] font-semibold text-brand-navy transition-colors hover:bg-brand-ivory ${
                  isActive(link.to) ? "bg-brand-ivory" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={ASSESSMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-lg px-4 py-3 text-left text-[15px] font-semibold text-brand-navy transition-colors hover:bg-brand-ivory"
            >
              AI Readiness Assessment
            </a>
            <ContactFormModal
              trigger={
                <button className="w-full rounded-lg px-4 py-3 text-left text-[15px] font-semibold text-brand-navy transition-colors hover:bg-brand-ivory">
                  Contact
                </button>
              }
            />
          </nav>
          <p className="mx-2 mt-2 border-t border-brand-sand px-4 pt-3 text-xs font-semibold text-brand-slate [word-spacing:0.16em]">
            Simplify · Prioritise · Grow
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
