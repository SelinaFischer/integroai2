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
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 lg:gap-4 relative z-10">
            <img 
              src={logo} 
              alt="IntegroAI Consulting" 
              width={80}
              height={80}
              fetchPriority="high"
              decoding="async"
              className="h-14 sm:h-16 lg:h-20 w-auto transition-all duration-300"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-lg lg:text-2xl font-bold tracking-tight text-white">
                IntegroAI Consulting
              </span>
              <span className="text-xs lg:text-sm font-medium tracking-wide text-accent-warm">
                Simplify · Amplify · Grow
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 text-sm font-semibold tracking-wide link-underline text-white/80 hover:text-white py-2 px-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons - Always visible, matching Hero style */}
          <div className="flex items-center gap-2 lg:gap-3">
            <Button 
              variant="heroOutline"
              size="sm"
              className="text-xs lg:text-sm px-3 lg:px-5 h-9 lg:h-10" 
              asChild
            >
              <a href="https://tally.so/r/68jDMA" target="_blank" rel="noopener noreferrer">
                AI Readiness Audit
              </a>
            </Button>
            <Button 
              variant="hero"
              size="sm"
              className="group text-xs lg:text-sm px-3 lg:px-5 h-9 lg:h-10" 
              asChild
            >
              <a href="https://calendly.com/integroai-consulting/30min" target="_blank" rel="noopener noreferrer">
                Book a Call
                <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            
            {/* Mobile Menu Toggle */}
            <button
              ref={menuButtonRef}
              className="lg:hidden p-3 -mr-2 relative z-10 text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="lg:hidden py-6 border-t border-border/50 bg-background animate-fade-in"
          >
            <nav className="flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
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
              <div className="pt-4 mt-2 border-t border-border/50 space-y-3">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://tally.so/r/68jDMA" target="_blank" rel="noopener noreferrer">
                    AI Readiness Audit
                  </a>
                </Button>
                <Button variant="hero" className="w-full group" asChild>
                  <a href="https://calendly.com/integroai-consulting/30min" target="_blank" rel="noopener noreferrer">
                    Book a Call
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;