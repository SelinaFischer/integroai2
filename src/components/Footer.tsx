import { Mail, ArrowRight } from "lucide-react";
import logo from "@/assets/integroai-logo-icon-white.png";
import linkedinLogo from "@/assets/linkedin-logo.avif";
import instagramLogo from "@/assets/instagram-logo.avif";
import ContactFormModal from "./ContactFormModal";
import { Button } from "./ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "#services", label: "Services" },
    { href: "#framework", label: "Framework" },
    { href: "#about", label: "About" },
    { href: "#faq", label: "FAQ" },
  ];


  return (
    <footer className="bg-primary relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={logo} 
                alt="IntegroAI Consulting" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-primary-foreground/70 text-base max-w-md mb-6 leading-relaxed">
              Helping SME leaders turn AI confusion into confident action with clear strategy, solid foundations, and measurable outcomes.
            </p>
            <p className="text-primary-foreground/40 text-sm font-medium tracking-wider">
              Discover › Design › Validate › Deliver
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-6 text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-medium inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-warm/50 group-hover:bg-accent-warm transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h4 className="font-bold text-primary-foreground mb-6 text-sm uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-4 mb-6">
              <li>
                <a
                  href="mailto:info@integroai.tech"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-medium"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  info@integroai.tech
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/integroai-consulting/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-medium"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="w-8 h-8 rounded-lg" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/integroai.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-medium"
                >
                  <img src={instagramLogo} alt="Instagram" className="w-8 h-8 rounded-lg" />
                  Instagram
                </a>
              </li>
            </ul>
            <ContactFormModal 
              trigger={
                <Button variant="heroOutline" size="sm" className="group">
                  Send a Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              }
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/50">
            <p>© {currentYear} IntegroAI Consulting. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-foreground/70 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;