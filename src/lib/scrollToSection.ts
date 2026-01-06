/**
 * Scrolls to a section by ID with smooth behavior.
 * Handles navigation from different pages by waiting for DOM to update.
 * 
 * @param sectionId - The ID of the section to scroll to (without #)
 * @param delay - Delay in ms before scrolling (default: 100ms for page transitions)
 */
export const scrollToSection = (sectionId: string, delay: number = 100): void => {
  setTimeout(() => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, delay);
};

/**
 * Creates an onClick handler for navigation + scroll.
 * Use with React Router Link components.
 * 
 * @param sectionId - The ID of the section to scroll to (without #)
 */
export const createScrollHandler = (sectionId: string) => (): void => {
  scrollToSection(sectionId);
};
