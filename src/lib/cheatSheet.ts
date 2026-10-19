// Free AI cheat sheet "Find the work AI could do for you" used for lead generation.
// Visitors request it through its own Google Form (separate from the AI visibility
// guide form). Responses land in a Google Sheet, and the cheat sheet is sent by email.
export const CHEAT_SHEET_TITLE = "Find the work AI could do for you";
export const CHEAT_SHEET_FORM_URL = "https://forms.gle/q2ksSyLWjmReEmVRA";

// Sends a "cheatsheet_cta_click" event to Google Tag Manager, with the place on
// the site the link was clicked, so sign-up sources can be compared.
export const trackCheatSheetClick = (location: string) => {
  try {
    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: "cheatsheet_cta_click", cta_location: location });
  } catch {
    // Tracking must never block the click.
  }
};
