#!/usr/bin/env node
/**
 * Print public/brochure.html to public/brochure.pdf with headless Chrome.
 * The page sets its own A4 @page and print colours, so no extra flags are needed.
 *
 * Run:
 *   pnpm brochure
 *   CHROME_PATH=/path/to/chrome pnpm brochure   # if Chrome is not auto-detected
 *
 * Needs network access once: the brochure loads Hanken Grotesk and Space Mono from Google Fonts.
 */

import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = join(root, "public", "brochure.html");
const pdf = join(root, "public", "brochure.pdf");

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("Chrome not found. Set CHROME_PATH to a Chrome/Chromium binary.");
  process.exit(1);
}

execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--virtual-time-budget=20000", // let the web fonts and images finish loading
    `--print-to-pdf=${pdf}`,
    pathToFileURL(html).href,
  ],
  { stdio: "inherit" },
);

console.log(`Wrote ${pdf} (${(statSync(pdf).size / 1024).toFixed(0)} KB)`);
