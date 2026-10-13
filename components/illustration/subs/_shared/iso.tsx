import type { CSSProperties, ReactNode } from "react";
import { C, IsoBox, makeIso, type Pt } from "../../kit";

/**
 * Shared isometric parts for the sub-service illustrations (one family:
 * same projection, same face tints, same teal line-work). Everything here is
 * a plain server-side SVG fragment — compose inside <SceneFrame>.
 */

export const MONO = "var(--font-mono), ui-monospace, Menlo, monospace";

export type S = ReturnType<typeof mk>;
export type P3 = readonly [number, number, number?];

/** 2:1 iso scene: k = half tile width (px), hz = px per z unit. */
export function mk(ox: number, oy: number, k = 24, hz = 16) {
  const b = makeIso(ox, oy, k, hz);
  const f = (n: number) => n.toFixed(2);
  return {
    ...b,
    k,
    hz,
    /** transform that lays a flat drawing (u, v in world units) on the floor plane at (x,y,z) */
    floor(x: number, y: number, z = 0) {
      const [px, py] = b.proj(x, y, z);
      return `matrix(${k} ${k / 2} ${-k} ${k / 2} ${f(px)} ${f(py)})`;
    },
    /** upright wall facing the viewer's left (u runs along +x, v is up) */
    wallX(x: number, y: number, z = 0) {
      const [px, py] = b.proj(x, y, z);
      return `matrix(${k} ${k / 2} 0 ${-hz} ${f(px)} ${f(py)})`;
    },
    /** upright wall facing the viewer's right (u runs along +y, v is up) */
    wallY(x: number, y: number, z = 0) {
      const [px, py] = b.proj(x, y, z);
      return `matrix(${-k} ${k / 2} 0 ${-hz} ${f(px)} ${f(py)})`;
    },
    /** polyline through world points, as a screen path */
    route(pts: P3[]) {
      return (
        "M" +
        pts
          .map(([x, y, z = 0]) => {
            const [a, c] = b.proj(x, y, z);
            return `${a.toFixed(1)} ${c.toFixed(1)}`;
          })
          .join(" L")
      );
    },
  };
}

type BlockProps = {
  s: S;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  z0?: number;
  z1?: number;
  top?: string;
  right?: string;
  front?: string;
  stroke?: string;
  sw?: number;
  className?: string;
};

export function Block({ s, x0, y0, x1, y1, z0 = 0, z1 = 1, top, right, front, stroke, sw, className }: BlockProps) {
  return (
    <IsoBox
      faces={s.box(x0, y0, x1, y1, z0, z1)}
      top={top}
      right={right}
      front={front}
      stroke={stroke}
      strokeWidth={sw}
      className={className}
    />
  );
}

/** Soft contact shadow (iso diamond) under an object. */
export function Shadow({ s, x0, y0, x1, y1, z = 0, o = 0.09 }: { s: S; x0: number; y0: number; x1: number; y1: number; z?: number; o?: number }) {
  return (
    <path
      d={s.poly([s.proj(x0, y0, z), s.proj(x1, y0, z), s.proj(x1, y1, z), s.proj(x0, y1, z)])}
      fill={C.ink}
      opacity={o}
    />
  );
}

/** Thin white ground slab with a faint 1-unit grid. */
export function Ground({ s, x0, y0, x1, y1 }: { s: S; x0: number; y0: number; x1: number; y1: number }) {
  const lines: string[] = [];
  for (let x = Math.ceil(x0); x < x1; x++) lines.push(`M${x} ${y0}L${x} ${y1}`);
  for (let y = Math.ceil(y0); y < y1; y++) lines.push(`M${x0} ${y}L${x1} ${y}`);
  return (
    <g>
      <Block s={s} x0={x0} y0={y0} x1={x1} y1={y1} z0={-0.3} z1={0} top={C.soft} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <path d={lines.join("")} transform={s.floor(0, 0, 0)} stroke={C.line} strokeWidth={0.03} fill="none" />
    </g>
  );
}

/** Rigid circuit board: slab + silkscreen outline + mounting holes. Children are drawn on top. */
export function Pcb({
  s, x, y, z = 0, w = 6, d = 4, t = 0.2, top = C.mint, holes = true, outline = true, children,
}: {
  s: S; x: number; y: number; z?: number; w?: number; d?: number; t?: number; top?: string; holes?: boolean; outline?: boolean; children?: ReactNode;
}) {
  return (
    <g>
      <Block s={s} x0={x} y0={y} x1={x + w} y1={y + d} z0={z} z1={z + t} top={top} right={C.faceDark} front={C.faceR} stroke={C.tealSoft} />
      <g transform={s.floor(x, y, z + t)}>
        {outline && <rect x={0.18} y={0.18} width={w - 0.36} height={d - 0.36} rx={0.12} fill="none" stroke={C.lineStrong} strokeWidth={0.04} />}
        {holes &&
          [[0.4, 0.4], [w - 0.4, 0.4], [0.4, d - 0.4], [w - 0.4, d - 0.4]].map(([hx, hy]) => (
            <circle key={`${hx}${hy}`} cx={hx} cy={hy} r={0.16} fill={C.card} stroke={C.lineStrong} strokeWidth={0.04} />
          ))}
      </g>
      {children}
    </g>
  );
}

/** Dark QFP-style chip with pins and a pin-1 dot. */
export function Chip({
  s, x, y, z = 0, w = 1.6, d = 1.6, h = 0.45, pins = 4, accent = true,
}: {
  s: S; x: number; y: number; z?: number; w?: number; d?: number; h?: number; pins?: number; accent?: boolean;
}) {
  const pz = z + h * 0.35;
  const out: string[] = [];
  for (let i = 0; i < pins; i++) {
    const u = x + ((i + 0.5) * w) / pins;
    const v = y + ((i + 0.5) * d) / pins;
    out.push(s.seg(s.proj(u, y, pz), s.proj(u, y - 0.25, pz)));
    out.push(s.seg(s.proj(x, v, pz), s.proj(x - 0.25, v, pz)));
    out.push(s.seg(s.proj(u, y + d, pz), s.proj(u, y + d + 0.25, pz)));
    out.push(s.seg(s.proj(x + w, v, pz), s.proj(x + w + 0.25, v, pz)));
  }
  return (
    <g>
      <path d={out.join("")} stroke={C.muted} strokeWidth={1.6} strokeLinecap="round" />
      <Block s={s} x0={x} y0={y} x1={x + w} y1={y + d} z0={z} z1={z + h} top={C.ink2} right={C.ink} front="#2b2a26" stroke={C.ink} />
      {accent && (
        <g transform={s.floor(x, y, z + h)}>
          <circle cx={0.3} cy={0.3} r={0.1} fill={C.teal} />
          <rect x={w * 0.3} y={d * 0.32} width={w * 0.5} height={d * 0.36} rx={0.05} fill="none" stroke={C.muted} strokeWidth={0.04} />
        </g>
      )}
    </g>
  );
}


/** Upright cylinder standing on the floor plane. */
export function Cyl({ s, x, y, z0 = 0, z1 = 1, r = 0.5, top = C.card, side = C.faceL, stroke = C.lineStrong, children }: { s: S; x: number; y: number; z0?: number; z1?: number; r?: number; top?: string; side?: string; stroke?: string; children?: ReactNode }) {
  const [cx, y0] = s.proj(x, y, z0);
  const [, y1] = s.proj(x, y, z1);
  const rx = r * s.k * Math.SQRT2;
  const ry = rx / 2;
  return (
    <g>
      <path d={`M${cx - rx} ${y0}V${y1}A${rx} ${ry} 0 0 0 ${cx + rx} ${y1}V${y0}A${rx} ${ry} 0 0 1 ${cx - rx} ${y0}Z`} fill={side} stroke={stroke} strokeLinejoin="round" />
      <ellipse cx={cx} cy={y1} rx={rx} ry={ry} fill={top} stroke={stroke} />
      {children}
    </g>
  );
}


/**
 * Prism: a profile polygon in (x, z) (counter-clockwise, x right, z up)
 * extruded along y. Draws the visible top/right quads then the front face.
 */
export function Prism({
  s, pts, y0, y1, front = C.faceTop, top = C.faceTop, right = C.faceR, stroke = C.lineStrong,
}: {
  s: S; pts: [number, number][]; y0: number; y1: number; front?: string; top?: string; right?: string; stroke?: string;
}) {
  const quads = pts.map(([ax, az], i) => {
    const [bx, bz] = pts[(i + 1) % pts.length];
    const nx = bz - az;
    const nz = -(bx - ax);
    if (nx <= 0 && nz <= 0) return null;
    return (
      <path key={i} d={s.poly([s.proj(ax, y0, az), s.proj(bx, y0, bz), s.proj(bx, y1, bz), s.proj(ax, y1, az)])} fill={nz > Math.abs(nx) ? top : right} stroke={stroke} strokeLinejoin="round" />
    );
  });
  return (
    <g>
      {quads}
      <path d={s.poly(pts.map(([x, z]) => s.proj(x, y1, z)))} fill={front} stroke={stroke} strokeLinejoin="round" />
    </g>
  );
}

/** Flat gear outline path (local coordinates, centred on 0,0). */
export function gearPath(r: number, teeth: number, depth = r * 0.22) {
  const step = (Math.PI * 2) / teeth;
  const pts: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    for (const [da, rr] of [[0, r - depth], [0.12, r], [0.45, r], [0.57, r - depth]] as const) {
      const an = a + da * step * 1.6;
      pts.push(`${(Math.cos(an) * rr).toFixed(2)} ${(Math.sin(an) * rr).toFixed(2)}`);
    }
  }
  return "M" + pts.join(" L") + " Z";
}

export function Gear({
  r, teeth = 12, fill = C.card, stroke = C.tealDeep, sw = 0.06, spin, style,
}: {
  r: number; teeth?: number; fill?: string; stroke?: string; sw?: number; spin?: boolean; style?: CSSProperties;
}) {
  return (
    <g className={spin ? "ill-spin" : undefined} style={style}>
      <path d={gearPath(r, teeth)} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
      <circle r={r * 0.5} fill="none" stroke={stroke} strokeWidth={sw * 0.7} opacity={0.5} />
      <circle r={r * 0.2} fill={stroke} />
    </g>
  );
}

/** Layered neural-net node graph in flat screen space. `hot` = indexes (layer,node) pairs of the lit path. */
export function NodeGraph({
  x, y, w, h, layers = [3, 4, 4, 2], hot = [], r = 5, flow = true,
}: {
  x: number; y: number; w: number; h: number; layers?: number[]; hot?: number[]; r?: number; flow?: boolean;
}) {
  const pos = layers.map((n, li) =>
    Array.from({ length: n }, (_, ni) => [x + (w * li) / (layers.length - 1), y + (h * (ni + 0.5)) / n] as Pt),
  );
  let edges = "";
  for (let l = 0; l < pos.length - 1; l++)
    for (const a of pos[l]) for (const c of pos[l + 1]) edges += `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${c[0].toFixed(1)} ${c[1].toFixed(1)}`;
  const lit = hot.map((ni, li) => pos[li][Math.min(ni, pos[li].length - 1)]);
  const litPath = "M" + lit.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L");
  return (
    <g>
      <path d={edges} stroke={C.lineStrong} strokeWidth={0.9} fill="none" />
      {hot.length > 1 && (
        <path d={litPath} stroke={C.teal} strokeWidth={1.8} strokeDasharray="5 5" fill="none" className={flow ? "ill-dash" : undefined} />
      )}
      {pos.flat().map(([px, py], i) => {
        const isHot = lit.some((p) => p[0] === px && p[1] === py);
        return <circle key={i} cx={px} cy={py} r={r} fill={isHot ? C.teal : C.card} stroke={isHot ? C.tealDeep : C.muted} strokeWidth={1.3} />;
      })}
    </g>
  );
}

/** Small mono label pill in screen space. (x,y) = left edge, vertical centre. */
export function Tag({
  x, y, children, tone = "card", size = 13, w,
}: {
  x: number; y: number; children: string; tone?: "card" | "teal" | "ink"; size?: number; w?: number;
}) {
  const width = w ?? children.length * size * 0.62 + 18;
  const fill = tone === "teal" ? C.teal : tone === "ink" ? C.ink : C.card;
  const text = tone === "card" ? C.ink2 : "#fff";
  return (
    <g>
      <rect x={x} y={y - size * 0.95} width={width} height={size * 1.9} rx={size * 0.5} fill={fill} stroke={tone === "card" ? C.lineStrong : "none"} strokeWidth={1} />
      <text x={x + width / 2} y={y + size * 0.36} textAnchor="middle" fontFamily={MONO} fontSize={size} fill={text}>
        {children}
      </text>
    </g>
  );
}

/** Engineering dimension line between two screen points, with end ticks and a centred label. */
export function Dim({ a, b, label, size = 13, off = 0 }: { a: Pt; b: Pt; label?: string; size?: number; off?: number }) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * 5;
  const ny = (dx / len) * 5;
  const mx = (a[0] + b[0]) / 2 + off;
  const my = (a[1] + b[1]) / 2;
  return (
    <g stroke={C.tealDeep} strokeWidth={1.2} fill="none">
      <path d={`M${a[0]} ${a[1]}L${b[0]} ${b[1]}M${a[0] - nx} ${a[1] - ny}L${a[0] + nx} ${a[1] + ny}M${b[0] - nx} ${b[1] - ny}L${b[0] + nx} ${b[1] + ny}`} />
      {label && (
        <g stroke="none">
          <rect x={mx - label.length * size * 0.31 - 6} y={my - size * 0.8} width={label.length * size * 0.62 + 12} height={size * 1.6} rx={4} fill={C.cell} />
          <text x={mx} y={my + size * 0.35} textAnchor="middle" fontFamily={MONO} fontSize={size} fill={C.tealDeep}>
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

/** Radio arcs (BLE / Wi-Fi). `rot` = direction in degrees (0 = right, -90 = up). */
export function Arcs({ x, y, rot = -45, n = 3, r0 = 16, gap = 11, spread = 80 }: { x: number; y: number; rot?: number; n?: number; r0?: number; gap?: number; spread?: number }) {
  const rad = (d: number) => (d * Math.PI) / 180;
  return (
    <g>
      <circle cx={x} cy={y} r={3.2} fill={C.teal} />
      {Array.from({ length: n }, (_, i) => {
        const r = r0 + i * gap;
        const a0 = rad(rot - spread / 2);
        const a1 = rad(rot + spread / 2);
        return (
          <path
            key={i}
            d={`M${(x + Math.cos(a0) * r).toFixed(1)} ${(y + Math.sin(a0) * r).toFixed(1)}A${r} ${r} 0 0 1 ${(x + Math.cos(a1) * r).toFixed(1)} ${(y + Math.sin(a1) * r).toFixed(1)}`}
            stroke={C.teal}
            strokeWidth={2.2}
            strokeLinecap="round"
            fill="none"
            className="ill-blink"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        );
      })}
    </g>
  );
}

/** Blinking status LED on the floor/board plane (world coords). */
export function Led({ s, x, y, z, delay = 0 }: { s: S; x: number; y: number; z: number; delay?: number }) {
  const [px, py] = s.proj(x, y, z);
  return <circle cx={px} cy={py} r={3} fill={C.teal} className="ill-blink" style={{ animationDelay: `${delay}s` }} />;
}

/** Defs-free forest "device screen" panel in screen space. */
export function Screen({ x, y, w, h, rx = 5, children }: { x: number; y: number; w: number; h: number; rx?: number; children?: ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={C.forest} />
      {children}
    </g>
  );
}
