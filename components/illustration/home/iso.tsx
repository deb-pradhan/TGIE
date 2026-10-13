import type { ReactNode } from "react";
import { C, makeIso, type Pt } from "../kit";

/**
 * Small isometric scene factory for the home illustrations.
 * Wraps kit.tsx makeIso() and adds:
 *  - plane transforms (T/F/R) so flat artwork can be drawn in world units on
 *    the top / front / right faces of boxes,
 *  - `bx()` — a toned iso box (optionally with printed-layer striations).
 * Everything is plain SVG, server-rendered.
 */

export const TONE = {
  white: { top: "#ffffff", right: "#dbe4de", front: "#e7edea" },
  mint: { top: "#f3fbf8", right: "#c6e3da", front: "#dcf0ea" },
  steel: { top: "#eaefec", right: "#b2c1b9", front: "#cbd7d1" },
  forest: { top: "#14493c", right: "#0b2c23", front: "#0e3a2e" },
  ink: { top: "#4a4943", right: "#1c1b18", front: "#2e2d28" },
  teal: { top: C.tealSoft, right: C.tealDeep, front: C.teal },
} as const;
export type Tone = keyof typeof TONE;

const EDGE = "rgba(28,27,24,.16)";
const n = (v: number) => v.toFixed(1);

export function makeScene(
  ox: number,
  oy: number,
  k: number,
  hz: number,
  id: string,
) {
  const I = makeIso(ox, oy, k, hz);
  const mat = (a: number, b: number, c: number, d: number, p: Pt) =>
    `matrix(${a} ${b} ${c} ${d} ${n(p[0])} ${n(p[1])})`;
  /** top plane at height z: draw with (x, y) world coords */
  const T = (z = 0) => mat(k, k / 2, -k, k / 2, I.proj(0, 0, z));
  /** front face plane at y = y1: draw with (x, z) */
  const F = (y: number) => mat(k, k / 2, 0, -hz, I.proj(0, y, 0));
  /** right face plane at x = x1: draw with (y, z) */
  const R = (x: number) => mat(-k, k / 2, 0, -hz, I.proj(x, 0, 0));

  /** toned iso box; `lay` overlays printed-layer striations on the two side faces */
  const bx = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    z0: number,
    z1: number,
    tone: Tone = "white",
    o: { cls?: string; key?: string | number; lay?: boolean } = {},
  ): ReactNode => {
    const f = I.box(x0, y0, x1, y1, z0, z1);
    const t = TONE[tone];
    return (
      <g key={o.key} className={o.cls}>
        <path
          d={f.right}
          fill={t.right}
          stroke={EDGE}
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
        <path
          d={f.front}
          fill={t.front}
          stroke={EDGE}
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
        {o.lay && <path d={f.right} fill={`url(#${id}-lr)`} />}
        {o.lay && <path d={f.front} fill={`url(#${id}-lf)`} />}
        <path
          d={f.top}
          fill={t.top}
          stroke={EDGE}
          strokeWidth={0.7}
          strokeLinejoin="round"
        />
      </g>
    );
  };

  /** layer-striation patterns used by `lay` (3D-printed look) */
  const LayerDefs = () => (
    <defs>
      <pattern
        id={`${id}-lr`}
        width="8"
        height="3.2"
        patternUnits="userSpaceOnUse"
        patternTransform="skewY(-26.57)"
      >
        <path
          d="M0 3H8"
          stroke="#0e6e5c"
          strokeOpacity=".22"
          strokeWidth=".7"
        />
      </pattern>
      <pattern
        id={`${id}-lf`}
        width="8"
        height="3.2"
        patternUnits="userSpaceOnUse"
        patternTransform="skewY(26.57)"
      >
        <path
          d="M0 3H8"
          stroke="#0e6e5c"
          strokeOpacity=".18"
          strokeWidth=".7"
        />
      </pattern>
    </defs>
  );

  /** iso ground slab with grid */
  const Slab = ({
    a,
    b,
    step = 1,
    top = "#fbfaf6",
  }: {
    a: number;
    b: number;
    step?: number;
    top?: string;
  }) => {
    const f = I.box(a, a, b, b, -0.4, 0);
    let g = "";
    for (let v = Math.ceil(a); v <= b; v += step) {
      g +=
        I.seg(I.proj(v, a, 0), I.proj(v, b, 0)) +
        I.seg(I.proj(a, v, 0), I.proj(b, v, 0));
    }
    return (
      <g>
        <path d={f.right} fill="#cfdad4" />
        <path d={f.front} fill="#dbe4de" />
        <path
          d={f.top}
          fill={top}
          stroke={C.lineStrong}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        <path d={g} stroke={C.line} strokeWidth={0.7} fill="none" />
      </g>
    );
  };

  /** white puck / tile an object stands on */
  const pad = (
    cx: number,
    cy: number,
    r = 1.15,
    h = 0.16,
    tone: Tone = "white",
  ) => bx(cx - r, cy - r, cx + r, cy + r, 0, h, tone);

  return { ...I, k, hz, id, T, F, R, bx, pad, LayerDefs, Slab };
}
export type Scene = ReturnType<typeof makeScene>;
