// Generates a real HTML page for every route after `vite build`.
//
// Why: the site is a single-page app. Without this step every address except
// the homepage is served from GitHub Pages' 404 fallback, so it answers with a
// "404 Not Found" status and an empty page until JavaScript runs. Search
// engines can work around that; most AI crawlers do not run JavaScript at all.
//
// What it does: opens each route from sitemap.xml in a headless browser,
// waits for the page to render, and saves the finished HTML into dist/ under
// the route's own name (about.html, blog/<slug>.html ...). GitHub Pages then
// serves those files with a normal "200 OK" status and the full content.
//
// It never breaks a deploy: if no browser is available the build carries on
// and the site behaves as it did before (set PRERENDER_STRICT=1 to fail instead).

import { chromium } from "playwright-core";
import http from "node:http";
import fs from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const SITE_ORIGIN = "https://integroai.tech";
const STRICT = process.env.PRERENDER_STRICT === "1";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

const log = (message) => console.log(`[prerender] ${message}`);

/** Routes come from the sitemap, so there is one list to maintain. */
async function readRoutes() {
  const sitemap = await fs.readFile(path.join(DIST, "sitemap.xml"), "utf8");
  const routes = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)]
    .map((match) => new URL(match[1]).pathname.replace(/\/+$/, "") || "/")
    // Skip addresses that are already real files (e.g. assessment.html).
    .filter((route) => route === "/" || !existsSync(path.join(DIST, `${route}.html`)));
  return [...new Set(routes)];
}

/** Serves dist/ and answers every unknown path with the app shell, like a dev server. */
function startServer(shell) {
  const server = http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const filePath = path.normalize(path.join(DIST, pathname));
      if (filePath.startsWith(DIST) && pathname !== "/" && existsSync(filePath)) {
        const stat = await fs.stat(filePath);
        if (stat.isFile()) {
          response.writeHead(200, { "content-type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream" });
          response.end(await fs.readFile(filePath));
          return;
        }
      }
      response.writeHead(200, { "content-type": MIME[".html"] });
      response.end(shell);
    } catch (error) {
      response.writeHead(500);
      response.end(String(error));
    }
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

/** Uses the Chrome already on the machine (GitHub's runners ship one), so nothing is downloaded. */
async function launchBrowser() {
  const candidates = [];
  if (process.env.CHROME_PATH) candidates.push({ executablePath: process.env.CHROME_PATH });
  candidates.push({ channel: "chrome" }, { channel: "chromium" });
  for (const base of ["/opt/pw-browsers", path.join(process.env.HOME || "", ".cache/ms-playwright")]) {
    if (!existsSync(base)) continue;
    for (const entry of readdirSync(base).filter((name) => /^chromium-\d+$/.test(name)).sort().reverse()) {
      candidates.push({ executablePath: path.join(base, entry, "chrome-linux", "chrome") });
    }
  }
  for (const options of candidates) {
    try {
      return await chromium.launch({ ...options, headless: true });
    } catch {
      // Try the next candidate.
    }
  }
  return null;
}

/**
 * Runs inside the page once it has rendered. Tidies the <head> so each saved
 * page describes itself rather than the homepage, then returns the HTML.
 */
function finalisePage({ route, origin }) {
  const head = document.head;
  const pageUrl = origin + (route === "/" ? "/" : route);

  // Per-page tags (added by react-helmet, marked data-rh) win over the
  // homepage defaults that ship in index.html.
  for (const tag of head.querySelectorAll("meta[data-rh], link[data-rh]")) {
    const key = tag.getAttribute("name")
      ? `meta[name="${tag.getAttribute("name")}"]`
      : tag.getAttribute("property")
        ? `meta[property="${tag.getAttribute("property")}"]`
        : tag.getAttribute("rel") === "canonical"
          ? 'link[rel="canonical"]'
          : null;
    if (!key) continue;
    for (const duplicate of head.querySelectorAll(`${key}:not([data-rh])`)) duplicate.remove();
  }

  const ensure = (selector, create) => head.querySelector(selector) || head.appendChild(create());
  const meta = (attribute, name) =>
    ensure(`meta[${attribute}="${name}"]`, () => {
      const element = document.createElement("meta");
      element.setAttribute(attribute, name);
      return element;
    });

  // Canonical: keep the page's own, otherwise point at this page (never the homepage).
  const canonical = ensure('link[rel="canonical"]', () => {
    const element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    return element;
  });
  if (!canonical.hasAttribute("data-rh")) canonical.setAttribute("href", pageUrl);
  const canonicalUrl = canonical.getAttribute("href");

  const title = document.title;
  const description = head.querySelector('meta[name="description"]')?.getAttribute("content") || "";

  // Social-share tags fall back to this page's own title and description.
  const fallbacks = [
    ["name", "title", title],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:url", canonicalUrl],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
    ["name", "twitter:url", canonicalUrl],
  ];
  if (route !== "/") {
    for (const [attribute, name, value] of fallbacks) {
      const element = meta(attribute, name);
      if (!element.hasAttribute("data-rh") && value) element.setAttribute("content", value);
    }
  }

  // The site-wide structured data describes the homepage as "this page".
  // On other pages, swap that entry for one describing the page itself.
  if (route !== "/") {
    for (const script of head.querySelectorAll('script[type="application/ld+json"]:not([data-rh])')) {
      try {
        const data = JSON.parse(script.textContent);
        if (!Array.isArray(data["@graph"])) continue;
        data["@graph"] = data["@graph"].filter((node) => !["WebPage", "HowTo"].includes(node["@type"]));
        data["@graph"].push({
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: title,
          ...(description ? { description } : {}),
          isPartOf: { "@id": `${origin}/#website` },
          about: { "@id": `${origin}/#organization` },
        });
        script.textContent = JSON.stringify(data);
      } catch {
        // Leave anything unparseable untouched.
      }
    }
  }

  const textLength = document.getElementById("root")?.innerText.length || 0;

  // Safety net: if this saved page is ever served at a different address
  // (for example as the host's "not found" fallback), empty it before it is
  // shown so the app draws the right page instead of taking over the wrong one.
  const root = document.getElementById("root");
  root.setAttribute("data-saved-route", route);
  const guard = document.createElement("script");
  guard.textContent =
    '(function(){var r=document.getElementById("root");if(!r)return;' +
    'var p=location.pathname.replace(/\\/+$/,"")||"/";' +
    'if(r.getAttribute("data-saved-route")!==p){r.innerHTML="";}})();';
  root.insertAdjacentElement("afterend", guard);

  // Nothing from analytics should be baked into the saved page.
  for (const script of document.querySelectorAll('script[src*="googletagmanager.com"]')) script.remove();

  return {
    html: "<!DOCTYPE html>\n" + document.documentElement.outerHTML,
    title,
    canonicalUrl,
    hasDescription: Boolean(description),
    heading: document.querySelector("h1")?.textContent?.trim() || "",
    textLength,
  };
}

async function renderRoute(context, baseUrl, route) {
  const page = await context.newPage();
  try {
    await page.goto(baseUrl + route, { waitUntil: "load", timeout: 30000 });
    await page.waitForSelector("#root h1", { timeout: 15000 });
    // Let fonts, images and any start-up effects settle before saving.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    // Ask the app for markup React can take over in place (see src/main.tsx),
    // and put it in the page in place of the live, already-running version.
    await page.evaluate(async () => {
      const markup = await window.__renderSavedPage();
      document.getElementById("root").innerHTML = markup;
    });
    return await page.evaluate(finalisePage, { route, origin: SITE_ORIGIN });
  } finally {
    await page.close();
  }
}

function outputFiles(route) {
  if (route === "/") return ["index.html"];
  const relative = route.replace(/^\//, "");
  return [`${relative}.html`];
}

async function main() {
  const shellPath = path.join(DIST, "index.html");
  if (!existsSync(shellPath)) throw new Error("dist/index.html not found. Run vite build first.");
  const shell = await fs.readFile(shellPath, "utf8");
  const routes = await readRoutes();

  const browser = await launchBrowser();
  if (!browser) {
    const message = "No Chrome or Chromium found. Skipping page generation; the site still works as a single-page app.";
    if (STRICT) throw new Error(message);
    console.warn(`[prerender] ${message}`);
    return;
  }

  const server = await startServer(shell);
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const results = [];
  const failures = [];

  try {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      serviceWorkers: "block",
    });
    // No cookie banner in the saved pages, and no calls to outside services.
    await context.addInitScript(() => {
      // Tells the app it is being saved, so it renders its finished state
      // with no entrance animations (see src/main.tsx).
      window.__PRERENDER__ = true;
      try {
        window.localStorage.setItem("integroai-cookie-consent", "declined");
      } catch {
        // Storage unavailable; the banner markup is harmless.
      }
    });
    await context.route("**/*", (request) =>
      new URL(request.request().url()).hostname === "127.0.0.1" ? request.continue() : request.abort(),
    );

    for (const route of routes) {
      try {
        const result = await renderRoute(context, baseUrl, route);
        const looksMissing = result.heading === "404" || result.textLength < 400;
        if (looksMissing) {
          failures.push(`${route} (rendered as not found or empty)`);
          continue;
        }
        results.push({ route, ...result });
      } catch (error) {
        failures.push(`${route} (${String(error.message || error).split("\n")[0]})`);
      }
    }
    await context.close();
  } finally {
    await browser.close();
    server.close();
  }

  // Write only after every page has been captured, so a page is never
  // rendered on top of an already generated one.
  const parents = new Set(results.map(({ route }) => path.posix.dirname(route)).filter((dir) => dir !== "/"));
  for (const { route, html } of results) {
    const files = outputFiles(route);
    // A route that also has child pages (e.g. /blog and /blog/<post>) gets an
    // index file too, so it resolves whichever way the host looks it up.
    if (parents.has(route)) files.push(`${route.replace(/^\//, "")}/index.html`);
    for (const file of files) {
      const target = path.join(DIST, file);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.writeFile(target, html);
    }
  }
  // Unknown addresses keep the plain app shell, which shows the "not found" page.
  await fs.writeFile(path.join(DIST, "404.html"), shell);

  for (const { route, title, textLength, hasDescription } of results) {
    log(`${route.padEnd(52)} ${String(textLength).padStart(6)} chars  ${hasDescription ? "" : "[no description] "}${title}`);
  }
  log(`${results.length} of ${routes.length} pages generated.`);
  if (failures.length) {
    const message = `Could not generate: ${failures.join("; ")}`;
    if (STRICT) throw new Error(message);
    console.warn(`[prerender] ${message}`);
  }
}

main().catch((error) => {
  console.error(`[prerender] ${error.message || error}`);
  process.exit(STRICT ? 1 : 0);
});
