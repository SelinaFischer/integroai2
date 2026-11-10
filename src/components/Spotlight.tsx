import type { HTMLAttributes, PointerEvent } from "react";

// A soft pool of light that follows the pointer across a card. Adapted from
// the "Spotlight Card" idea on reactbits.dev, kept to a few lines of code.
// The light itself is drawn in CSS (.spotlight in src/index.css) and only on
// devices with a mouse or trackpad, so phones and tablets are unaffected.
const trackPointer = (event: PointerEvent<HTMLElement>) => {
  if (event.pointerType !== "mouse") return;
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
};

/** Spread onto any card: `<div {...spotlight} className="spotlight ...">`. */
export const spotlight: Pick<HTMLAttributes<HTMLElement>, "onPointerMove"> = {
  onPointerMove: trackPointer,
};
