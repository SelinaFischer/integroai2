// Redirect old .html blog URLs to clean SPA URLs
if (window.location.pathname.endsWith('.html')) {
  const newPath = window.location.pathname.replace('.html', '');
  window.location.replace(newPath + window.location.search + window.location.hash);
}

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
