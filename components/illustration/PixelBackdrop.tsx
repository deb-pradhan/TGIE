import { cn } from "@/lib/cn";

/**
 * On-brand pixel mat — a static ordered (Bayer) dither in the forest palette,
 * the still cousin of the footer DitherField. ONLY ever behind a floating white
 * card (design system §7.3), never behind text. Purely decorative.
 */

// 4×4 Bayer threshold matrix (values 0–15).
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

const COLS = 44;
const ROWS = 10;
const CELL = 4; // viewBox units per pixel

/** Two-tone forest palettes — subtle per-card variation. */
const TONES = [
  { dark: "#123f31", light: "#3f8f70" }, // firmware
  { dark: "#0f3a34", light: "#2f8f86" }, // data-viz (teal)
  { dark: "#164129", light: "#529760" }, // edge AI (olive)
];

export function PixelBackdrop({
  tone = 0,
  className,
}: {
  tone?: number;
  className?: string;
}) {
  const { dark, light } = TONES[tone % TONES.length];

  // Precompute the "lit" pixels: a top→bottom dithered gradient.
  const lit: string[] = [];
  for (let r = 0; r < ROWS; r++) {
    const t = r / (ROWS - 1); // 0 (top) → 1 (bottom)
    for (let c = 0; c < COLS; c++) {
      const threshold = (BAYER[r % 4][c % 4] + 0.5) / 16;
      if (t > threshold) {
        lit.push(`M${c * CELL} ${r * CELL}h${CELL}v${CELL}h-${CELL}z`);
      }
    }
  }

  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden rounded-card", className)}
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
        preserveAspectRatio="none"
        style={{ imageRendering: "pixelated" }}
      >
        <rect width="100%" height="100%" fill={dark} />
        <path d={lit.join(" ")} fill={light} />
      </svg>
    </div>
  );
}
