// Old-style addresses ending in .html are sent to the clean address instead.
const isOldHtmlAddress = window.location.pathname.endsWith('.html');
if (isOldHtmlAddress) {
  const newPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  window.location.replace(newPath + window.location.search + window.location.hash);
}

import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Every page is saved as ready-made HTML at build time (scripts/prerender.mjs),
// so visitors and crawlers get the content before any JavaScript runs.
// When that saved page is present, React takes it over in place instead of
// drawing it again, and entrance animations are skipped so nothing flickers.
const hasSavedPage = container.firstElementChild !== null;
const isBeingSaved = (window as Window & { __PRERENDER__?: boolean }).__PRERENDER__ === true;

if (isOldHtmlAddress) {
  // Leaving this address; nothing to draw.
} else if (hasSavedPage) {
  hydrateRoot(container, <App skipEntrance />);
} else {
  createRoot(container).render(<App skipEntrance={isBeingSaved} />);
}

// Used only by scripts/prerender.mjs: returns this page as HTML that React
// can take over in place. The server renderer is loaded on demand, so it is
// never downloaded by visitors.
if (isBeingSaved) {
  (window as Window & { __renderSavedPage?: () => Promise<string> }).__renderSavedPage = async () => {
    const { renderToString } = await import("react-dom/server");
    return renderToString(<App skipEntrance />);
  };
}
