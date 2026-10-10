// Shared scroll-reveal settings so every homepage section animates the same way.
export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.5 },
} as const;

export const fadeUpDelayed = (index: number, step = 0.06) => ({
  ...fadeUp,
  transition: { duration: 0.5, delay: index * step },
});

export const ASSESSMENT_URL = "https://integroai.tech/assessment";
export const DISCOVERY_CALL_URL = "https://calendly.com/integroai-tech/30min";
