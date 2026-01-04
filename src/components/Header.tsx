import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo-icon-new.png";
import ContactFormModal from "./ContactFormModal";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#framework", label: "Framework" },
    { href: "#about", label: "About" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-primary shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 relative z-10">
            <img 
              src={logo} 
              alt="IntegroAI Consulting" 
              className="h-12 lg:h-14 w-auto transition-all duration-300"
            />
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-bold tracking-tight text-white">
                IntegroAI Consulting
              </span>
              <span className="text-xs lg:text-sm font-medium tracking-wide text-amber-400">
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
                className="transition-colors duration-200 text-sm font-semibold tracking-wide link-underline text-white/80 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <ContactFormModal 
              trigger={
                <Button 
                  variant="ghost" 
                  size="default"
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  Get in Touch
                </Button>
              }
            />
            <Button variant="hero" size="default" className="group" asChild>
              <a href="https://calendly.com/integroai-consulting/30min" target="_blank" rel="noopener noreferrer">
                Book a Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 relative z-10 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border/50 bg-background animate-fade-in">
            <nav className="flex flex-col gap-2">
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
                <ContactFormModal 
                  trigger={
                    <Button variant="outline" size="default" className="w-full">
                      Get in Touch
                    </Button>
                  }
                />
                <Button variant="hero" size="default" className="w-full group" asChild>
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