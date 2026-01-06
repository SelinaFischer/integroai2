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
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
        >
          <div className="bg-nav text-white rounded-xl shadow-2xl p-4 sm:p-5 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <p 
                  id="cookie-consent-title" 
                  className="text-sm leading-relaxed text-white/90"
                >
                  We use cookies to improve your experience.{" "}
                  <Link 
                    to="/privacy-policy" 
                    className="text-accent-warm hover:underline font-medium"
                  >
                    Learn more
                  </Link>
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="text-xs font-medium text-white/60 hover:text-white transition-colors px-3 py-2"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="text-xs font-semibold bg-accent-warm hover:bg-accent-warm/90 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
