import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Live } from "./Live";

/**
 * Shared illustration kit. Every custom figure on the site is built from this:
 *  - one register per figure (isometric | engraved | pixel) — designsystem §11.1
 *  - palette below only (single teal accent + warm neutrals + forest tints)
 *  - pure inline SVG, server-rendered; animation = CSS classes `.ill-*`
 *    (see globals.css) gated by <Live>.
 */

export const C = {
  ink: "#1c1b18",
  ink2: "#3b3a35",
  muted: "#9c9a90",
  line: "#e5e1d8",
  lineStrong: "#cfcbb7",
  paper: "#e9e6de",
  paper2: "#efece4",
  cell: "#f5f3ee",
  card: "#ffffff",
  soft: "#fbfaf6",
  // iso face tints (top is brightest, left/front darker)
  faceTop: "#ffffff",
  faceR: "#dbe4de",
  faceL: "#e7edea",
  faceDark: "#cdd8d1",
  mint: "#e9f5f1",
  teal: "#2fae97",
  tealDeep: "#0e6e5c",
  tealSoft: "#6fd0bb",
  forest: "#0f3a2e",
  forestDeep: "#0b2c23",
} as const;

/* ---------------- isometric helpers (2:1 projection) ---------------- */
export type Pt = readonly [number, number];

export function makeIso(ox: number, oy: number, k = 18, hz = 12) {
  const proj = (x: number, y: number, z = 0): Pt => [ox + (x - y) * k, oy + (x + y) * (k / 2) - z * hz];
  const poly = (pts: Pt[]) =>
    "M" + pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join(" L") + " Z";
  const seg = (a: Pt, b: Pt) => `M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
  /** three visible faces of an axis-aligned box */
  const box = (x0: number, y0: number, x1: number, y1: number, z0: number, z1: number) => ({
    top: poly([proj(x0, y0, z1), proj(x1, y0, z1), proj(x1, y1, z1), proj(x0, y1, z1)]),
    right: poly([proj(x1, y0, z0), proj(x1, y1, z0), proj(x1, y1, z1), proj(x1, y0, z1)]),
    front: poly([proj(x0, y1, z0), proj(x1, y1, z0), proj(x1, y1, z1), proj(x0, y1, z1)]),
  });
  return { proj, poly, seg, box };
}

/** Standard iso box drawn with the house face tints. */
export function IsoBox({
  faces,
  stroke = C.line,
  strokeWidth = 1,
  top = C.faceTop,
  right = C.faceR,
  front = C.faceL,
  className,
}: {
  faces: { top: string; right: string; front: string };
  stroke?: string;
  strokeWidth?: number;
  top?: string;
  right?: string;
  front?: string;
  className?: string;
}) {
  return (
    <g className={className}>
      <path d={faces.right} fill={right} />
      <path d={faces.front} fill={front} />
      <path d={faces.top} fill={top} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </g>
  );
}

/* ---------------- frame ---------------- */
/**
 * Responsive illustration frame. Fills its parent cell (the cell supplies
 * overflow-hidden + radius). `ground` adds the faint iso grid; `cover` makes
 * the SVG fill-and-crop (xMidYMid slice) instead of letterbox.
 */
export function SceneFrame({
  viewBox = "0 0 640 480",
  label,
  children,
  ground = false,
  cover = false,
  tone = "cell",
  className,
}: {
  viewBox?: string;
  /** accessible description; omit for purely decorative figures */
  label?: string;
  children: ReactNode;
  ground?: boolean;
  cover?: boolean;
  tone?: "cell" | "paper2" | "mint" | "forest";
  className?: string;
}) {
  const bg = { cell: "bg-cell", paper2: "bg-paper-2", mint: "bg-mint", forest: "bg-forest-deep" }[tone];
  return (
    <div className={cn("relative h-full w-full overflow-hidden", bg, ground && "iso-grid", className)}>
      <Live>
        <svg
          viewBox={viewBox}
          preserveAspectRatio={cover ? "xMidYMid slice" : "xMidYMid meet"}
          className="absolute inset-0 h-full w-full"
          role={label ? "img" : undefined}
          aria-label={label}
          aria-hidden={label ? undefined : true}
        >
          {children}
        </svg>
      </Live>
    </div>
  );
}
