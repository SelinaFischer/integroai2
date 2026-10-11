import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";

const COOKIE_CONSENT_KEY = "integroai-cookie-consent";
const OPEN_SETTINGS_EVENT = "integroai:cookie-settings";

type AnalyticsWindow = Window & {
  /** Defined in index.html. Loads Google Tag Manager once; safe to call twice. */
  __loadAnalytics?: () => void;
  google_tag_manager?: Record<string, unknown>;
} & Record<string, unknown>;

/** Reopens the banner so a visitor can change their choice (footer link). */
export const openCookieSettings = () => {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
};

const readChoice = (): string | null => {
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
};

const saveChoice = (choice: "accepted" | "declined") => {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
  } catch {
    // Storage unavailable: the choice applies to this visit only.
  }
};

/**
 * Used when a visitor who had accepted changes their mind. Analytics is never
 * loaded for a visitor who has not accepted, so there is nothing to undo then.
 */
const stopAnalytics = () => {
  const w = window as unknown as AnalyticsWindow;

  // Tell any Google Analytics already running on this page to stop sending.
  Object.keys(w.google_tag_manager ?? {})
    .filter((id) => id.startsWith("G-"))
    .forEach((id) => {
      w[`ga-disable-${id}`] = true;
    });

  // Remove the Google Analytics cookies.
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name.startsWith("_gat"))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
      });
    });
};

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // The footer's "Cookie settings" link reopens the banner at any time.
    const reopen = () => setIsVisible(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);

    // First visit: show the banner after a short pause.
    const timer = readChoice() ? undefined : window.setTimeout(() => setIsVisible(true), 1500);

    return () => {
      window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const handleAccept = () => {
    saveChoice("accepted");
    setIsVisible(false);
    (window as unknown as AnalyticsWindow).__loadAnalytics?.();
  };

  const handleDecline = () => {
    const hadAccepted = readChoice() === "accepted";
    saveChoice("declined");
    setIsVisible(false);
    if (hadAccepted) stopAnalytics();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-md"
          role="dialog"
          aria-labelledby="cookie-consent-title"
        >
          <div className="bg-nav text-white rounded-xl shadow-2xl p-4 sm:p-5 border border-white/10">
            <p
              id="cookie-consent-title"
              className="text-sm leading-relaxed text-white/90"
            >
              We'd like to use Google Analytics cookies to see how this site is used. They're only set if you accept.{" "}
              <Link
                to="/privacy-policy"
                className="text-accent-warm hover:underline font-medium"
              >
                Read our privacy policy
              </Link>
            </p>
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                onClick={handleDecline}
                className="text-xs font-medium text-white/70 hover:text-white transition-colors px-3 py-2"
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
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
