import type { ReactNode } from "react";
import { C, IsoBox, makeIso, type Pt } from "../../kit";

/**
 * Small drawing helpers for the enablement + fabrication sub-service art.
 * House style: 2:1 isometric, white slabs, accent line work, dashed accent
 * connectors, billboard chips (screen-aligned text), tiny pixel-dot sparks.
 */

export const mono = { fontFamily: "var(--font-mono), ui-monospace, monospace" } as const;

export type Iso = ReturnType<typeof mkIso>;

/** makeIso + helpers to lay 2D content onto the ground plane or a wall. */
export function mkIso(ox: number, oy: number, k = 22, hz = 15) {
  const b = makeIso(ox, oy, k, hz);
  const at = (x: number, y: number, z: number) => b.proj(x, y, z).map((n) => n.toFixed(1));
  return {
    ...b,
    k,
    hz,
    /** ground-plane transform; children are drawn in px (1 grid unit = k px) */
    flat: (x: number, y: number, z = 0) => {
      const [X, Y] = at(x, y, z);
      return `matrix(1 .5 -1 .5 ${X} ${Y})`;
    },
    /** front wall (faces bottom-left): origin = top-left corner, u runs along +x */
    wallF: (x: number, y: number, z: number) => {
      const [X, Y] = at(x, y, z);
      return `matrix(1 .5 0 1 ${X} ${Y})`;
    },
    /** right wall (faces bottom-right): origin = top-left corner, u runs along -y */
    wallR: (x: number, y: number, z: number) => {
      const [X, Y] = at(x, y, z);
      return `matrix(1 -.5 0 1 ${X} ${Y})`;
    },
  };
}

export function Slab({
  iso,
  b,
  top = C.faceTop,
  right = C.faceR,
  front = C.faceL,
  stroke = C.line,
  sw = 1,
  className,
}: {
  iso: Iso;
  b: [number, number, number, number, number, number];
  top?: string;
  right?: string;
  front?: string;
  stroke?: string;
  sw?: number;
  className?: string;
}) {
  return (
    <IsoBox
      faces={iso.box(...b)}
      top={top}
      right={right}
      front={front}
      stroke={stroke}
      strokeWidth={sw}
      className={className}
    />
  );
}

/** Faint iso ground mat the hero object stands on. */
export function Mat({ iso, w, d, fill = C.soft }: { iso: Iso; w: number; d: number; fill?: string }) {
  return <Slab iso={iso} b={[0, 0, w, d, -0.35, 0]} top={fill} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />;
}

/** Billboard label chip. Text stays screen-aligned so it is always legible. */
export function Chip({
  x,
  y,
  label,
  tone = "white",
  size = 11,
  className,
}: {
  x: number;
  y: number;
  label: string;
  tone?: "white" | "accent" | "accentPale" | "ink";
  size?: number;
  className?: string;
}) {
  const w = Math.round(label.length * size * 0.62 + 14);
  const h = size + 10;
  const s = {
    white: { f: C.card, s: C.lineStrong, t: C.ink2 },
    accent: { f: C.accentDeep, s: C.graphite, t: "#fff" },
    accentPale: { f: C.accentPale, s: C.accentSoft, t: C.accentDeep },
    ink: { f: C.graphiteDeep, s: C.graphite, t: "#f1f2f0" },
  }[tone];
  return (
    <g className={className}>
      <rect x={x - w / 2} y={y - h / 2 + 2} width={w} height={h} rx={5} fill={C.lineStrong} opacity={0.55} />
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={5} fill={s.f} stroke={s.s} strokeWidth={1} />
      <text x={x} y={y + size * 0.36} textAnchor="middle" fontSize={size} fill={s.t} style={mono}>
        {label}
      </text>
    </g>
  );
}

/** Dashed accent connector (animated flow). */
export function Dash({ d, w = 1.6, flow = true, color = C.accent }: { d: string; w?: number; flow?: boolean; color?: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={w}
      strokeDasharray="5 5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={flow ? "ill-dash" : undefined}
    />
  );
}

/** Tiny square "pixel" dots (dither register accent used for sparks etc). */
export function Dots({ pts, s = 3, fill = C.accent, className }: { pts: Pt[]; s?: number; fill?: string; className?: string }) {
  return (
    <g className={className} fill={fill}>
      {pts.map(([x, y], i) => (
        <rect key={i} x={x - s / 2} y={y - s / 2} width={s} height={s} opacity={i % 3 === 2 ? 0.45 : 1} />
      ))}
    </g>
  );
}

export const STAR = "M0 -5 L1.5 -1.6 L5 -1.5 L2.3 .7 L3.1 4.2 L0 2.3 L-3.1 4.2 L-2.3 .7 L-5 -1.5 L-1.5 -1.6Z";

export function Tick({ x, y, s = 1, stroke = C.accent, w = 2.2 }: { x: number; y: number; s?: number; stroke?: string; w?: number }) {
  return (
    <path
      d="M-4 0 L-1 3 L4.5 -3.5"
      transform={`translate(${x} ${y}) scale(${s})`}
      fill="none"
      stroke={stroke}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/** Flat-on-ground gear path (spins in-plane when wrapped in className ill-spin). */
export function gearPath(r: number, teeth = 8, depth = 0.22) {
  const ro = r * (1 + depth);
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const w = Math.PI / teeth;
    const p = (rad: number, ang: number) => `${(Math.cos(ang) * rad).toFixed(1)} ${(Math.sin(ang) * rad).toFixed(1)}`;
    pts.push(p(r, a - w * 0.9), p(ro, a - w * 0.5), p(ro, a + w * 0.5), p(r, a + w * 0.9));
  }
  return "M" + pts.join(" L") + " Z";
}

/** Little human node: head + shoulders, inside a round white puck. */
export function Person({ x, y, s = 1, tone = "white" }: { x: number; y: number; s?: number; tone?: "white" | "accent" }) {
  const on = tone === "accent";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={0} cy={10} rx={17} ry={8.5} fill={C.faceDark} />
      <ellipse cx={0} cy={6} rx={17} ry={8.5} fill={on ? C.accentDeep : C.faceR} />
      <ellipse cx={0} cy={2} rx={17} ry={8.5} fill={on ? C.accent : C.card} stroke={on ? C.accentDeep : C.lineStrong} strokeWidth={1} />
      <circle cx={0} cy={-7} r={4.6} fill={on ? "#fff" : C.card} stroke={on ? "#fff" : C.accentDeep} strokeWidth={1.5} />
      <path d="M-8 6 C-8 -1 8 -1 8 6" fill={on ? "#fff" : C.accentPale} stroke={on ? "#fff" : C.accentDeep} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

/** Stack of isometric coins (screen-space ellipses). */
export function Coins({ x, y, n = 4, r = 15 }: { x: number; y: number; n?: number; r?: number }) {
  const rows = [];
  for (let i = 0; i < n; i++) {
    const cy = y - i * 6;
    rows.push(
      <g key={i}>
        <path d={`M${x - r} ${cy} v6 a${r} ${r / 2} 0 0 0 ${r * 2} 0 v-6`} fill={C.accentDeep} />
        <ellipse cx={x} cy={cy} rx={r} ry={r / 2} fill={C.accent} stroke={C.accentDeep} strokeWidth={1} />
        {i === n - 1 && <ellipse cx={x} cy={cy} rx={r * 0.55} ry={r * 0.27} fill="none" stroke="#fff" strokeWidth={1.2} opacity={0.8} />}
      </g>,
    );
  }
  return <g>{rows}</g>;
}

/** Soft elliptical contact shadow under a floating object. */
export function Shadow({ x, y, rx = 22, o = 0.18 }: { x: number; y: number; rx?: number; o?: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={rx / 2} fill={C.ink} opacity={o} />;
}

/** Row of "text lines" (rects) on a flat/wall plane. */
export function Lines({
  x,
  y,
  widths,
  gap = 7,
  h = 2.6,
  fill = C.line,
}: {
  x: number;
  y: number;
  widths: number[];
  gap?: number;
  h?: number;
  fill?: string;
}): ReactNode {
  return (
    <g fill={fill}>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={h / 2} />
      ))}
    </g>
  );
}

/** Uniformly scale a whole scene about a point so it fills the 640x480 frame. */
export function Fit({
  s = 1.15,
  cx = 320,
  cy = 250,
  dx = 0,
  dy = 0,
  children,
}: {
  s?: number;
  cx?: number;
  cy?: number;
  dx?: number;
  dy?: number;
  children: ReactNode;
}) {
  return <g transform={`translate(${dx} ${dy}) translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`}>{children}</g>;
}

/** Isometric box truck facing +x. Occupies x..x+3.8, y..y+1.8. */
export function Truck({ iso, x, y, cargo = C.card }: { iso: Iso; x: number; y: number; cargo?: string }) {
  const { k, hz } = iso;
  return (
    <g>
      <Slab iso={iso} b={[x, y + 0.1, x + 3.8, y + 1.7, 0.3, 0.55]} top={C.faceDark} right={C.ink2} front={C.ink2} stroke={C.ink2} />
      <Slab iso={iso} b={[x, y, x + 2.55, y + 1.8, 0.55, 2.5]} top={cargo} right={C.faceR} front={C.faceL} />
      <Slab iso={iso} b={[x + 2.55, y + 0.1, x + 3.8, y + 1.7, 0.55, 1.55]} top={C.accentPale} right={C.accentSoft} front={C.accent} stroke={C.accentDeep} />
      <g transform={iso.wallF(x, y + 1.8, 2.5)}>
        <rect x={k * 0.3} y={hz * 0.55} width={k * 1.9} height={hz * 0.35} rx={2} fill={C.accent} />
        <rect x={k * 0.3} y={hz * 1.1} width={k * 1.2} height={2.2} rx={1.1} fill={C.lineStrong} />
      </g>
      <g transform={iso.wallF(x + 2.55, y + 1.7, 1.55)}>
        <rect x={k * 0.3} y={hz * 0.12} width={k * 0.7} height={hz * 0.5} rx={2} fill="#fff" opacity={0.9} />
      </g>
      <g transform={iso.wallF(x, y + 1.7, 0.55)}>
        {[0.7, 1.9, 3.2].map((u) => (
          <g key={u}>
            <circle cx={k * u} cy={hz * 0.1} r={6.4} fill={C.graphiteDeep} />
            <circle cx={k * u} cy={hz * 0.1} r={2.4} fill={C.lineStrong} />
          </g>
        ))}
      </g>
    </g>
  );
}
