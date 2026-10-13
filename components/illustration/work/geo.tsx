import type { ReactNode } from "react";
import { C, makeIso } from "../kit";

/**
 * Small geometry layer for the /work + /start illustrations (isometric register).
 * Wraps kit.makeIso with the scale, plane transforms and a cylinder primitive.
 */
export function mk(ox: number, oy: number, k: number) {
  const hz = k * 0.62;
  const iso = makeIso(ox, oy, k, hz);
  /** transform that maps (x, z) on the plane y = y0 into the front (lit) iso plane */
  const front = (y0: number) => {
    const [px, py] = iso.proj(0, y0, 0);
    return `matrix(${k} ${k / 2} 0 ${-hz} ${px.toFixed(1)} ${py.toFixed(1)})`;
  };
  /** transform that maps (y, z) on the plane x = x0 into the right iso plane */
  const right = (x0: number) => {
    const [px, py] = iso.proj(x0, 0, 0);
    return `matrix(${-k} ${k / 2} 0 ${-hz} ${px.toFixed(1)} ${py.toFixed(1)})`;
  };
  return { ...iso, k, hz, ox, oy, front, right };
}
export type Ctx = ReturnType<typeof mk>;

/** Context whose local point (cx, cy, 0) lands on screen point (sx, sy). */
export function placed(cx: number, cy: number, sx: number, sy: number, k: number) {
  return mk(sx - (cx - cy) * k, sy - ((cx + cy) * k) / 2, k);
}

export function Box({
  c,
  b,
  top = C.faceTop,
  right = C.faceR,
  front = C.faceL,
  stroke = C.line,
  className,
}: {
  c: Ctx;
  b: [number, number, number, number, number, number];
  top?: string;
  right?: string;
  front?: string;
  stroke?: string;
  className?: string;
}) {
  const f = c.box(...b);
  return (
    <g className={className}>
      <path d={f.right} fill={right} />
      <path d={f.front} fill={front} />
      <path d={f.top} fill={top} stroke={stroke} strokeWidth={1} strokeLinejoin="round" />
    </g>
  );
}

export function Cyl({
  c,
  x,
  y,
  r,
  z0,
  z1,
  side = C.faceR,
  top = C.faceTop,
  stroke = C.line,
}: {
  c: Ctx;
  x: number;
  y: number;
  r: number;
  z0: number;
  z1: number;
  side?: string;
  top?: string;
  stroke?: string;
}) {
  const [cx, b] = c.proj(x, y, z0);
  const [, t] = c.proj(x, y, z1);
  const rx = r * c.k * Math.SQRT2;
  const ry = rx / 2;
  return (
    <g>
      <path
        d={`M${(cx - rx).toFixed(1)} ${t.toFixed(1)} L${(cx - rx).toFixed(1)} ${b.toFixed(1)} A${rx.toFixed(1)} ${ry.toFixed(1)} 0 0 0 ${(cx + rx).toFixed(1)} ${b.toFixed(1)} L${(cx + rx).toFixed(1)} ${t.toFixed(1)} Z`}
        fill={side}
      />
      <ellipse cx={cx} cy={t} rx={rx} ry={ry} fill={top} stroke={stroke} strokeWidth={1} />
    </g>
  );
}

/** Small iso puck (flat tile) carrying a centered line glyph. */
export function GlyphPuck({
  c,
  x,
  y,
  s = 1.7,
  glyph,
  className,
  tint = C.faceTop,
}: {
  c: Ctx;
  x: number;
  y: number;
  s?: number;
  glyph: string;
  className?: string;
  tint?: string;
}) {
  const [gx, gy] = c.proj(x + s / 2, y + s / 2, 0.22);
  return (
    <g className={className}>
      <Box c={c} b={[x, y, x + s, y + s, 0, 0.22]} top={tint} />
      <g transform={`translate(${gx.toFixed(1)} ${gy.toFixed(1)}) scale(${(c.k / 26).toFixed(2)})`}>
        <path
          d={glyph}
          fill="none"
          stroke={C.accent}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="scale(1,0.7)"
        />
      </g>
    </g>
  );
}

/** Centered glyph paths (about +-9 units) shared by vignettes and scenes. */
export const GLYPH = {
  doc: "M-6 -8h8l4 4v12h-12z M2 -8v4h4 M-3 0h6 M-3 3h6",
  listing: "M-9 -6h3l2 9h9l2 -7h-13 M-3 8h.01 M5 8h.01",
  handshake: "M-9 1h5l3 -3 3 3h6 M-5 1l3 4 M5 1l-3 4 M-9 -3v8 M9 -3v8",
  wave: "M-9 0h3l2 -6 3 12 3 -9 2 3h5",
  check: "M-6 0l4 4 8 -8",
  star: "M0 -6v12 M-6 0h12",
} as const;

export function Sparkle({ x, y, s = 5, className }: { x: number; y: number; s?: number; className?: string }) {
  return (
    <path
      className={className}
      d={`M${x} ${y - s} L${x + s / 4} ${y - s / 4} L${x + s} ${y} L${x + s / 4} ${y + s / 4} L${x} ${y + s} L${x - s / 4} ${y + s / 4} L${x - s} ${y} L${x - s / 4} ${y - s / 4} Z`}
      fill={C.accentSoft}
    />
  );
}

export function Defs({ children }: { children: ReactNode }) {
  return <defs>{children}</defs>;
}
