// Free guide "Does AI know your business exists?" used for lead generation.
// Visitors request it through a Google Form. Responses land in a Google
// Sheet, and the guide is sent to them by email.
export const GUIDE_PAGE_PATH = "/ai-visibility-guide";
export const GUIDE_TITLE = "Does AI know your business exists?";
export const GUIDE_SUBTITLE =
  "A practical guide to being found, understood and recommended in the age of AI search.";
export const GUIDE_FORM_URL =
  "https://docs.google.com/forms/d/1TSKiPL84FZr7u8Wm4NfXrRubjq87Tjgf1tVLBdsD2Yw/viewform";

// Sends a "guide_cta_click" event to Google Tag Manager, with the place on
// the site the button was clicked, so sign-up sources can be compared.
export const trackGuideClick = (location: string) => {
  try {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "guide_cta_click", cta_location: location });
  } catch {
    // Tracking must never block the click.
  }
};
