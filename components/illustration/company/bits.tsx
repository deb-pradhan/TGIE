import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { C, makeIso } from "../kit";
import { Live } from "../Live";

export type IsoP = ReturnType<typeof makeIso>;

/** flat quad on the plane y = y (the visible "front" wall, faces lower-left) */
export const qF = (P: IsoP, x0: number, x1: number, z0: number, z1: number, y: number) =>
  P.poly([P.proj(x0, y, z0), P.proj(x1, y, z0), P.proj(x1, y, z1), P.proj(x0, y, z1)]);
/** flat quad on the plane x = x (the visible "right" wall, faces lower-right) */
export const qR = (P: IsoP, y0: number, y1: number, z0: number, z1: number, x: number) =>
  P.poly([P.proj(x, y0, z0), P.proj(x, y1, z0), P.proj(x, y1, z1), P.proj(x, y0, z1)]);
/** flat quad on a horizontal plane z = z */
export const qT = (P: IsoP, x0: number, y0: number, x1: number, y1: number, z: number) =>
  P.poly([P.proj(x0, y0, z), P.proj(x1, y0, z), P.proj(x1, y1, z), P.proj(x0, y1, z)]);
/** polyline through iso points */
export const pl = (P: IsoP, pts: [number, number, number][]) =>
  "M" + pts.map(([x, y, z]) => P.proj(x, y, z).map((n) => n.toFixed(1)).join(" ")).join(" L");

/** Simple geometric engineer: capsule body, round head, optional hard hat. Feet at (x, y). */
export function Person({
  x,
  y,
  s = 1,
  body = C.accent,
  hat = false,
  className,
}: {
  x: number;
  y: number;
  s?: number;
  body?: string;
  hat?: boolean;
  className?: string;
}) {
  return (
    <g transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s})`} className={className}>
      <ellipse cx="0" cy="1" rx="8" ry="2.6" fill={C.lineStrong} opacity=".55" />
      <rect x="-4" y="-9" width="3.2" height="9" rx="1.4" fill={C.ink2} />
      <rect x="0.8" y="-9" width="3.2" height="9" rx="1.4" fill={C.ink2} />
      <rect x="-5.2" y="-23" width="10.4" height="16" rx="5" fill={body} />
      <circle cx="0" cy="-28.5" r="4.4" fill={C.faceTop} stroke={C.ink2} strokeWidth="1.2" />
      {hat && <path d="M-5.2 -29.6 a5.2 5.2 0 0 1 10.4 0 z" fill={C.accentDeep} />}
    </g>
  );
}

/**
 * Responsive stage: the SVG keeps its exact aspect ratio, centred in the cell,
 * so HTML overlays (real, legible text) can be positioned in % of the viewBox.
 * Animations are gated by <Live>.
 */
export function Stage({
  w,
  h,
  label,
  children,
  overlay,
  ground = true,
  tone = "cell",
  hero = false,
  heroClass = "h-[340px] sm:h-[420px]",
  className,
}: {
  w: number;
  h: number;
  label?: string;
  children: ReactNode;
  overlay?: ReactNode;
  ground?: boolean;
  tone?: "cell" | "accentPale" | "paper2";
  /** inside PageHero's art cell: gives mobile a taller in-flow box, fills the cell on lg */
  hero?: boolean;
  /** override the in-flow height of the hero box below lg */
  heroClass?: string;
  className?: string;
}) {
  const bg = { cell: "bg-cell", accentPale: "bg-accent-pale", paper2: "bg-paper-2" }[tone];
  return (
    <div className={hero ? cn("relative lg:absolute lg:inset-0 lg:h-auto", heroClass) : "absolute inset-0"}>
    <div className={cn("absolute inset-0 overflow-hidden [container-type:size]", bg, ground && "iso-grid", className)}>
      <Live className="grid place-items-center">
        <div className="relative" style={{ width: `min(100cqw, calc(100cqh * ${w} / ${h}))`, aspectRatio: `${w} / ${h}` }}>
          <svg
            viewBox={`0 0 ${w} ${h}`}
            className="absolute inset-0 h-full w-full"
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
          >
            {children}
          </svg>
          {overlay}
        </div>
      </Live>
    </div>
    </div>
  );
}

/** percent position inside a Stage for a viewBox coordinate */
export const at = (w: number, h: number, x: number, y: number): CSSProperties => ({
  left: `${(x / w) * 100}%`,
  top: `${(y / h) * 100}%`,
});

/** floating HTML label that sits on a Stage (real text, stays legible) */
export function Tag({ children, style, className }: { children: ReactNode; style: CSSProperties; className?: string }) {
  return (
    <span
      style={style}
      className={cn(
        "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-card px-2.5 py-[3px] font-mono text-[10.5px] font-medium text-ink-2 shadow-[0_1px_0_var(--color-line)] sm:text-[11px]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export type IsoO = { ox: number; oy: number; k: number; hz: number };

/**
 * Lay flat 2D art (drawn in grid units, u along x, v along y) onto the iso
 * plane at height z. Use vectorEffect="non-scaling-stroke" on strokes.
 */
export const flatT = (o: IsoO, x: number, y: number, z = 0) =>
  `matrix(${o.k} ${o.k / 2} ${-o.k} ${o.k / 2} ${(o.ox + (x - y) * o.k).toFixed(1)} ${(o.oy + ((x + y) * o.k) / 2 - z * o.hz).toFixed(1)})`;

/** soft diamond shadow under a floating slab */
export const shadow = (P: IsoP, x0: number, y0: number, x1: number, y1: number) => (
  <path d={qT(P, x0, y0, x1, y1, 0)} fill={C.lineStrong} opacity=".35" />
);

/** numbered marker that sits on a Stage (links a scene object to a caption card) */
export function Mark({ n, style }: { n: number | string; style: CSSProperties }) {
  return (
    <span
      style={style}
      className="pointer-events-none absolute grid h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent font-mono text-[11px] font-bold text-ink shadow-[0_0_0_3px_var(--color-accent-pale)]"
    >
      {n}
    </span>
  );
}
