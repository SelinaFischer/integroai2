import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_CONSENT_KEY = "integroai-cookie-consent";

type ConsentStatus = "accepted" | "declined" | null;

const CookieConsent = () => {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!storedConsent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    setConsentStatus(storedConsent as ConsentStatus);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setConsentStatus("accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setConsentStatus("declined");
    setIsVisible(false);
  };

  // Don't render if consent already given
  if (consentStatus) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card border border-border rounded-2xl shadow-xl p-6 sm:p-8 relative">
              <button
                onClick={handleDecline}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
                aria-label="Decline cookies"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pr-8">
                <h2 
                  id="cookie-consent-title" 
                  className="text-lg font-bold mb-2"
                >
                  We value your privacy
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  We use cookies to enhance your browsing experience and analyse site traffic. 
                  By clicking &quot;Accept&quot;, you consent to our use of cookies as described in our{" "}
                  <Link 
                    to="/privacy-policy" 
                    className="text-primary hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAccept}
                    variant="hero"
                    className="sm:w-auto"
                  >
                    Accept All
                  </Button>
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="sm:w-auto"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
