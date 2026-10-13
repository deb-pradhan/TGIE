import type { ReactNode } from "react";
import type { IconName } from "./Icon";

/**
 * TGIE glyph artwork: 24×24 grid, drawn for a 1.7px round stroke in
 * `currentColor`. Rules: 2 to 3 strokes of detail after the silhouette, no
 * fills (the family is outline only), 2px safe margin, 45° bevels over curves
 * where the object is mechanical. Wrapper attributes live in <Icon>.
 */

/** 8-tooth gear outline, generated once (static). */
function gearPath(): string {
  const c = 12;
  const rIn = 7.1;
  const rOut = 9.5;
  const pts: string[] = [];
  const rad = (d: number) => (d * Math.PI) / 180;
  const pt = (r: number, d: number) =>
    `${(c + r * Math.sin(rad(d))).toFixed(2)} ${(c - r * Math.cos(rad(d))).toFixed(2)}`;
  for (let i = 0; i < 8; i++) {
    const t = i * 45;
    pts.push(pt(rIn, t - 14), pt(rOut, t - 8.5), pt(rOut, t + 8.5), pt(rIn, t + 14));
  }
  return `M${pts.join("L")}Z`;
}
const GEAR = gearPath();

export const glyphs: Record<IconName, ReactNode> = {
  /* ---------------- pillars ---------------- */
  // A: a chip, the heart of embedded work
  engineering: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.8" />
      <path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
    </>
  ),
  // B: an isometric block, additive manufacturing
  products: (
    <>
      <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
  // C: the company around the idea
  enablement: (
    <>
      <path d="M4 20.5V9.5l8-5 8 5v11" />
      <path d="M2.5 20.5h19" />
      <path d="M9.5 20.5v-5h5v5M12 11.5h.01" />
    </>
  ),
  // D: saw-tooth factory roof and a stack
  fabrication: (
    <>
      <path d="M3 20.5V11l6 3.5V11l6 3.5V4.5h5.5v16z" />
      <path d="M3 20.5h17.5M7 18h.01M11 18h.01M15 18h.01M18 8h.01" />
    </>
  ),

  /* ---------------- engineering subs ---------------- */
  pcb: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <rect x="9" y="8.5" width="6.5" height="7" rx="1" />
      <path d="M9 10.5H6.5L5.3 9.3M9 13.5H6.5l-1.2 1.2M15.5 12H18" />
      <path d="M5.3 9.3h.01M5.3 14.7h.01M18 12h.01" strokeWidth="2.6" />
    </>
  ),
  enclosure: (
    <>
      <rect x="4.5" y="4" width="15" height="5.5" rx="1.6" />
      <rect x="3" y="11.5" width="18" height="8.5" rx="2.2" />
      <path d="M9.5 15.7h5" />
    </>
  ),
  firmware: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M7.5 9.5 11 12l-3.5 2.5M13 15h3.5" />
    </>
  ),
  "edge-ai": (
    <>
      <rect x="5.5" y="5.5" width="13" height="13" rx="2.5" />
      <path d="M9 3v2.5M15 3v2.5M9 18.5V21M15 18.5V21M3 9h2.5M3 15h2.5M18.5 9H21M18.5 15H21" />
      <circle cx="12" cy="9.5" r="1.1" />
      <circle cx="9.3" cy="14.3" r="1.1" />
      <circle cx="14.7" cy="14.3" r="1.1" />
      <path d="M11.4 10.5 9.9 13.3M12.6 10.5l1.5 2.8M10.4 14.3h3.2" strokeWidth="1.2" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M8 16v-3M12 16V9M16 16v-5" />
    </>
  ),
  "small-batch": (
    <>
      <rect x="8.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </>
  ),

  /* ---------------- products subs ---------------- */
  "industrial-enclosure": (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7.5h6M9 10.5h6" />
      <circle cx="12" cy="16" r="1.4" />
    </>
  ),
  kinetic: (
    <>
      <path d="M3.5 4h17" />
      <path d="M6.4 4v10.8M10.8 4v10.8" />
      <circle cx="6.4" cy="17" r="2.2" />
      <circle cx="10.8" cy="17" r="2.2" />
      <path d="m15.2 4 4.5 9.8" />
      <circle cx="20.7" cy="15.9" r="2.2" />
    </>
  ),
  automotive: (
    <>
      <path d="M5 17H3.5v-5L6 7.5h12l2.5 4.5v5H19" />
      <path d="M3.5 12h17" />
      <circle cx="7.5" cy="17.2" r="2" />
      <circle cx="16.5" cy="17.2" r="2" />
    </>
  ),
  miniature: (
    <>
      <circle cx="12" cy="6.2" r="2.7" />
      <path d="M9.2 11.5h5.6" />
      <path d="M10.2 11.5c0 3.4-1.7 4.6-2.2 7h8c-.5-2.4-2.2-3.6-2.2-7" />
      <path d="M6.5 21h11" />
    </>
  ),
  retail: (
    <>
      <path d="M5 8h14l-1 12.5H6z" />
      <path d="M9 8V7a3 3 0 0 1 6 0v1" />
    </>
  ),

  /* ---------------- enablement subs ---------------- */
  branding: (
    <>
      <path d="M12 21 6.5 11 9.3 4h5.4l2.8 7z" />
      <path d="M12 21v-9.5" />
      <circle cx="12" cy="10.8" r="1.2" />
    </>
  ),
  incorporation: (
    <>
      <path d="M6 3.5h8l4 4v13H6z" />
      <path d="M14 3.5v4h4" />
      <path d="M9.5 11.5h5" />
      <circle cx="12" cy="16" r="1.8" />
    </>
  ),
  funding: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 8h7M8.5 11h7M9.5 8c3.6 0 3.6 5.5 0 5.5H9l5.5 4" />
    </>
  ),
  audit: (
    <>
      <rect x="5" y="4.5" width="14" height="16.5" rx="2.5" />
      <path d="M9 4.5v-1h6v1" />
      <path d="m8.8 13.2 2.4 2.4 4.2-4.7" />
    </>
  ),
  leads: (
    <path d="M3.5 5h17l-6.5 7.6V19l-4 2v-8.4z" />
  ),
  operations: (
    <>
      <rect x="9" y="3" width="6" height="5" rx="1.2" />
      <rect x="3" y="16" width="6" height="5" rx="1.2" />
      <rect x="15" y="16" width="6" height="5" rx="1.2" />
      <path d="M12 8v4M6 16v-4h12v4" />
    </>
  ),

  /* ---------------- fabrication subs ---------------- */
  // one source feeding four outcomes
  accountability: (
    <>
      <circle cx="12" cy="12" r="2.6" />
      <circle cx="5" cy="5" r="1.7" />
      <circle cx="19" cy="5" r="1.7" />
      <circle cx="5" cy="19" r="1.7" />
      <circle cx="19" cy="19" r="1.7" />
      <path d="m6.3 6.3 3.8 3.8M17.7 6.3l-3.8 3.8M6.3 17.7l3.8-3.8M17.7 17.7l-3.8-3.8" />
    </>
  ),
  welding: (
    <>
      <path d="m17.5 3.5 3 3-6.5 6.5-3-3z" />
      <path d="M11 10 9.4 11.6" />
      <path d="m8 14-1.2 2.6 2.4.3L8 20" />
      <path d="M13 17.5l1.6 1M4 15.2l1.6.6M3.5 21H12" />
    </>
  ),
  partners: (
    <>
      <circle cx="12" cy="5.5" r="2.3" />
      <circle cx="5" cy="18" r="2.3" />
      <circle cx="19" cy="18" r="2.3" />
      <path d="m10.8 7.6-4.6 8.3M13.2 7.6l4.6 8.3M7.6 18h8.8" />
    </>
  ),
  quality: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m7.8 12.3 3 3 5.4-6" />
    </>
  ),

  /* ---------------- lab / equipment ---------------- */
  oscilloscope: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2.5" />
      <path d="M6.5 11.5c1.2-4 2.4-4 3.5 0s2.3 4 3.5 0 2.3-4 3.5 0" />
      <path d="M8 20.5h8M12 17v3.5" />
    </>
  ),
  solder: (
    <>
      <path d="m12.5 11.5 5.5-5.5a2.1 2.1 0 0 1 3 3L15.5 14.5z" />
      <path d="m12.5 11.5-3.2 3.2M9.3 14.7 4.8 19.2" />
      <path d="M3 21.5h9M16 18.5v3" />
    </>
  ),
  printer: (
    <>
      <path d="M3 4.5h18" />
      <path d="M9.5 4.5v3l2.5 3 2.5-3v-3" />
      <rect x="5" y="13.5" width="14" height="3.4" rx="1.2" />
      <rect x="5" y="17.6" width="14" height="3.4" rx="1.2" />
    </>
  ),
  laser: (
    <>
      <rect x="8.5" y="3" width="7" height="5.5" rx="1.4" />
      <path d="M12 8.5v10.5" />
      <path d="M3 19.5h7.5M13.5 19.5H21" />
      <path d="M8 14.5l2 1.2M16 14.5l-2 1.2" />
    </>
  ),
  "press-brake": (
    <>
      <path d="M9.8 3h4.4v6L12 12.5 9.8 9z" />
      <path d="M3 21v-5.5h5.6l3.4 4.2 3.4-4.2H21V21z" />
    </>
  ),

  /* ---------------- ownership ---------------- */
  cad: (
    <>
      <circle cx="12" cy="4.6" r="1.6" />
      <path d="M12 6.2 6 20M12 6.2 18 20M8.2 15.5h7.6" />
    </>
  ),
  bom: (
    <>
      <path d="M9.5 6.5H20M9.5 12H20M9.5 17.5H20" />
      <path d="M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01" strokeWidth="2.8" />
    </>
  ),
  "source-code": (
    <>
      <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  publish: (
    <>
      <path d="M3 5.5c3-1 6-1 9 1.5 3-2.5 6-2.5 9-1.5v13c-3-1-6-1-9 1.5-3-2.5-6-2.5-9-1.5z" />
      <path d="M12 7v13" />
    </>
  ),
  unlock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2.5" />
      <path d="M8 11V7.5a4 4 0 0 1 7.6-1.7" />
      <path d="M12 15v2.2" />
    </>
  ),

  /* ---------------- lifecycle ---------------- */
  discover: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.4 15.4 5.6 5.6" />
    </>
  ),
  design: (
    <>
      <path d="M4 20.5l1-4.5L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z" />
      <path d="m14.5 6.5 3 3" />
    </>
  ),
  build: (
    <>
      <path d="M12.8 4.3 19.7 11.2l-3.3 3.3-6.9-6.9z" />
      <path d="m10.2 9.9-6 7.6a1.8 1.8 0 0 0 2.5 2.5l7.6-6" />
    </>
  ),
  handover: (
    <>
      <circle cx="7.5" cy="16.5" r="3.5" />
      <path d="m10 14 9.5-9.5" />
      <path d="m16 8 2.5 2.5M13.5 10.5l2 2" />
    </>
  ),

  /* ---------------- audiences ---------------- */
  scholar: (
    <>
      <path d="M2.5 9.5 12 5l9.5 4.5L12 14z" />
      <path d="M6.5 11.8V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.2M21.5 9.5V15" />
    </>
  ),
  founder: (
    <>
      <path d="M3 20.5 9.5 10l3.5 5 2-2.5 6 8z" />
      <path d="M9.5 10V3.8l4.2 1.6-4.2 1.6" />
    </>
  ),
  oem: (
    <>
      <rect x="8" y="5.5" width="8" height="7.5" rx="1.2" />
      <path d="M12 5.5v3" />
      <path d="M3 16.5h18" />
      <circle cx="6" cy="19.4" r="1.6" />
      <circle cx="12" cy="19.4" r="1.6" />
      <circle cx="18" cy="19.4" r="1.6" />
    </>
  ),

  /* ---------------- principles / misc ---------------- */
  // an idea (dashed) taking solid form
  form: (
    <>
      <circle cx="9" cy="9" r="5.8" strokeDasharray="2 2.7" />
      <rect x="11" y="11" width="10" height="10" rx="2" />
    </>
  ),
  weight: (
    <>
      <path d="M9.2 9V7.4a2.8 2.8 0 0 1 5.6 0V9" />
      <path d="M8.3 9h7.4l2.3 8.4a2 2 0 0 1-1.9 2.6H7.9A2 2 0 0 1 6 17.4z" />
    </>
  ),
  vision: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 19.5 6v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z" />
      <path d="m9 12 2.2 2.2 4.3-4.4" />
    </>
  ),
  certificate: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="2.2" />
      <path d="M7 8.5h10M7 12h4" />
      <circle cx="16" cy="15.8" r="2.3" />
      <path d="m14.8 17.8-.9 3 2.1-1.1 2.1 1.1-.9-3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c-3.2 3.1-3.2 14.9 0 18M12 3c3.2 3.1 3.2 14.9 0 18" />
    </>
  ),
  spark: (
    <>
      <path d="M11 3.5 13 9.8 19.3 12 13 14.2 11 20.5 9 14.2 2.7 12 9 9.8z" />
      <path d="M19 3.5v3M17.5 5h3" />
    </>
  ),
  handshake: (
    <>
      <path d="M2.5 9v7.5M21.5 9v7.5" />
      <path d="M2.5 10.2 6.6 8h3.6L12 9.6 13.8 8h3.6l4.1 2.2" />
      <path d="M5.5 15.5l3.2 3a1.3 1.3 0 0 0 1.9-1.8M8.2 13.6l3.6 3.4a1.3 1.3 0 0 0 1.9-1.8M11 11.6l3.6 3.3a1.3 1.3 0 0 0 1.9-1.8L13.4 10" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3.5h5M10.5 3.5v6L5 19a1.6 1.6 0 0 0 1.4 2.4h11.2A1.6 1.6 0 0 0 19 19l-5.5-9.5v-6" />
      <path d="M7.6 15.2h8.8" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2.5c3 2 4.5 5.5 4.5 9.5v3.5h-9V12c0-4 1.5-7.5 4.5-9.5z" />
      <circle cx="12" cy="9.2" r="1.6" />
      <path d="M7.5 12.8 5 16.5V19l2.5-1M16.5 12.8l2.5 3.7V19l-2.5-1M12 18.5v3" />
    </>
  ),
  gear: (
    <>
      <path d={GEAR} />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),

  /* ---------------- ui ---------------- */
  "arrow-right": <path d="M4 12h15M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  phone: (
    <path d="M5 4h3.4l1.6 4.2-2.1 1.4a11.5 11.5 0 0 0 5.5 5.5l1.4-2.1 4.2 1.6V18a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  download: <path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
};
