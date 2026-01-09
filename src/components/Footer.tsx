import { Mail, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/integroai-logo-icon-white.png";
import linkedinLogo from "@/assets/linkedin-logo.avif";
import instagramLogo from "@/assets/instagram-logo.avif";
import ContactFormModal from "./ContactFormModal";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "#framework", label: "Framework" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#founder", label: "Founder" },
    { href: "#blog", label: "Blog" },
    { href: "#faq", label: "FAQ" },
  ];


  return (
    <footer className="bg-nav relative overflow-hidden border-t border-white/10">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <img 
                src={logo} 
                alt="IntegroAI Consulting" 
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
                className="h-14 sm:h-16 lg:h-20 w-auto"
              />
            </div>
            <p className="text-primary-foreground/70 text-sm sm:text-base max-w-md mb-4 sm:mb-6 leading-relaxed">
              Helping SME leaders turn AI confusion into confident decisions with clear strategy, solid foundations, and measurable outcomes.
            </p>
            <p className="text-accent-warm text-xs sm:text-sm font-medium tracking-wider">
              Discover › Design › Validate › Deliver › Iterate
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-1 sm:space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-xs sm:text-sm font-medium inline-flex items-center gap-2 group py-1.5 sm:py-2 min-h-[40px] sm:min-h-[44px]"
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent-warm/50 group-hover:bg-accent-warm transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/company/integroai-consulting/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-all text-xs sm:text-sm font-medium group py-1.5 sm:py-2 min-h-[40px] sm:min-h-[44px]"
                >
                  <img src={linkedinLogo} alt="LinkedIn" width={24} height={24} loading="lazy" decoding="async" className="w-5 h-5 sm:w-6 sm:h-6 rounded transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/integroai.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-all text-xs sm:text-sm font-medium group py-1.5 sm:py-2 min-h-[40px] sm:min-h-[44px]"
                >
                  <img src={instagramLogo} alt="Instagram" width={24} height={24} loading="lazy" decoding="async" className="w-5 h-5 sm:w-6 sm:h-6 rounded transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
                  Instagram
                </a>
              </li>
              <li>
                <ContactFormModal 
                  trigger={
                    <button className="flex items-center gap-2 sm:gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-all text-xs sm:text-sm font-medium group py-1.5 sm:py-2 min-h-[40px] sm:min-h-[44px]">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-white/10 flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:bg-white/20 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.4)]">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                      Send a Message
                    </button>
                  }
                />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col items-center gap-4 text-xs sm:text-sm text-primary-foreground/50">
            {/* Links - wrap on mobile */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6">
              <Link 
                to="/install" 
                className="text-primary-foreground/80 hover:text-accent-warm transition-colors py-1.5 sm:py-2 font-medium inline-flex items-center gap-1.5"
              >
                <Smartphone className="w-3.5 h-3.5" />
                Install App
              </Link>
              <Link 
                to="/privacy-policy" 
                className="text-primary-foreground/80 hover:text-accent-warm transition-colors py-1.5 sm:py-2 font-medium"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service" 
                className="text-primary-foreground/80 hover:text-accent-warm transition-colors py-1.5 sm:py-2 font-medium"
              >
                Terms of Service
              </Link>
            </div>
            <p>© {currentYear} IntegroAI Consulting. All rights reserved.</p>
            <p className="text-primary-foreground/30 text-[10px] font-mono">v2.0.6</p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
