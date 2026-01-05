import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import logo from "@/assets/logo-icon-new.png";
import ContactFormModal from "./ContactFormModal";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#framework", label: "Framework" },
    { href: "#about", label: "About" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628] shadow-lg border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 lg:gap-4 relative z-10">
            <img 
              src={logo} 
              alt="IntegroAI Consulting" 
              width={80}
              height={80}
              fetchPriority="high"
              decoding="async"
              className="h-10 sm:h-14 lg:h-20 w-auto transition-all duration-300"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-base sm:text-lg lg:text-2xl font-bold tracking-tight text-white">
                IntegroAI Consulting
              </span>
              <span className="text-[10px] sm:text-xs lg:text-sm font-medium tracking-wide text-accent-warm">
                Simplify · Amplify · Grow
              </span>
            </div>
          </Link>


          {/* CTA Buttons - Always visible, matching Hero style */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
            <Button 
              variant="heroOutline"
              size="sm"
              className="hidden xs:inline-flex text-[10px] sm:text-xs lg:text-sm px-2 sm:px-3 lg:px-5 h-8 sm:h-9 lg:h-10" 
              asChild
            >
              <a href="https://tally.so/r/68jDMA" target="_blank" rel="noopener noreferrer">
                AI Readiness Audit
              </a>
            </Button>
            <Button 
              variant="hero"
              size="sm"
              className="group text-[10px] sm:text-xs lg:text-sm px-2 sm:px-3 lg:px-5 h-8 sm:h-9 lg:h-10" 
              asChild
            >
              <a href="https://calendly.com/integroai-consulting/30min" target="_blank" rel="noopener noreferrer">
                <span className="hidden sm:inline">Book a Call</span>
                <span className="sm:hidden">Book</span>
                <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            {/* Menu Toggle - Always visible */}
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

        {/* Dropdown Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute top-full right-4 w-56 py-3 bg-background border border-border/50 rounded-xl shadow-xl animate-fade-in"
          >
            <nav className="flex flex-col gap-1 px-2" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors text-sm font-semibold py-3 px-4 rounded-lg hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;