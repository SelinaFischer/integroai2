import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: "autoUpdate",
      // Load the service worker script without holding up the first paint.
      injectRegister: "script-defer",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "favicon-32x32.png"],
      manifest: {
        name: "IntegroAI Consulting",
        short_name: "IntegroAI",
        description: "Independent AI consultancy for founder-led service businesses.",
        theme_color: "#041B2B",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/pwa-icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/pwa-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        // HTML is deliberately excluded from the precache manifest (and from
        // navigateFallback below). JS/CSS/image filenames are content-hashed
        // by Vite, so precaching THEM is genuinely free speed: a new deploy
        // gets a new hash, so there's no staleness risk and repeat visits
        // load instantly from cache. HTML has no hash in its filename, so
        // precaching it was the actual bug: visitors could get served an
        // old index.html referencing old routes/copy until the new service
        // worker fully took over. The navigateFallback + NetworkFirst rule
        // below makes every page load fetch the latest HTML from the network
        // first (near-instant on GitHub Pages' CDN), falling back to the
        // last-seen cached copy only if the network is unreachable.
        globPatterns: ["**/*.{js,css,ico,png,svg,woff2}"],
        // The server renderer is only used while pages are being saved at
        // build time (scripts/prerender.mjs). Visitors never need it.
        globIgnores: ["**/server.browser-*.js", "**/AdminStats-*.js", "og-image.png"],
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
              networkTimeoutSeconds: 3,
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
