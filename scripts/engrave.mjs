#!/usr/bin/env node
/**
 * Convert the four pillar photos into Renaissance-engraving illustrations using
 * Google "Nano Banana" (Gemini 2.5 Flash Image).
 *
 * Run:
 *   GEMINI_API_KEY=your_key node scripts/engrave.mjs
 *
 * Outputs <name>-engraved.png next to the sources in public/pillars/.
 * Get a key at https://aistudio.google.com/apikey
 */

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PILLARS = join(__dirname, "..", "public", "pillars");
const MODEL = "gemini-2.5-flash-image"; // Nano Banana
const KEY = process.env.GEMINI_API_KEY;

// Sources to convert (basename in public/pillars, without extension).
const IMAGES = ["engineering", "products", "enablement-writing", "fabrication"];

const PROMPT =
  "Transform the image into a classical Renaissance engraving illustration in the " +
  "style of Albrecht Dürer or 16th-century master etchers. Render as detailed " +
  "black-and-white line art with intricate cross-hatching, parallel line shading, " +
  "and fine stippling techniques. Use dense parallel hatching lines for shadows and " +
  "form, with dramatic chiaroscuro contrast between light and dark areas. Include a " +
  "dark circular or spherical background element with heavy radial cross-hatching. " +
  "Render the subject with classical sculptural anatomy, emphasizing musculature, " +
  "defined contours, and engraved texture throughout. Use only black ink on " +
  "cream/off-white parchment background. Every form must be constructed from " +
  "thousands of fine carved lines — no solid fills, no grayscale gradients, no color. " +
  "Add subtle decorative flourishes reminiscent of antique woodcut prints. " +
  "Avoid: color, watercolor, photograph, 3D render, smooth gradients, soft shading, " +
  "modern, anime, cartoon, flat shading, solid black fills, blurry, low detail, pixelated.";

if (!KEY) {
  console.error("Missing GEMINI_API_KEY. Run: GEMINI_API_KEY=your_key node scripts/engrave.mjs");
  process.exit(1);
}

const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

async function engrave(name) {
  const src = join(PILLARS, `${name}.jpg`);
  const bytes = await readFile(src);
  const body = {
    contents: [
      {
        parts: [
          { text: PROMPT },
          { inline_data: { mime_type: "image/jpeg", data: bytes.toString("base64") } },
        ],
      },
    ],
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`${name}: HTTP ${res.status} — ${(await res.text()).slice(0, 300)}`);
  }

  const json = await res.json();
  const parts = json?.candidates?.[0]?.content?.parts ?? [];
  const img = parts.find((p) => p.inline_data || p.inlineData);
  const data = img?.inline_data?.data || img?.inlineData?.data;
  if (!data) {
    throw new Error(`${name}: no image in response — ${JSON.stringify(json).slice(0, 300)}`);
  }

  const out = join(PILLARS, `${name}-engraved.png`);
  await writeFile(out, Buffer.from(data, "base64"));
  console.log(`✓ ${name} → ${out}`);
}

for (const name of IMAGES) {
  try {
    await engrave(name);
  } catch (err) {
    console.error(`✗ ${err.message}`);
  }
}
