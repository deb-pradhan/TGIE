import type { ReactNode } from "react";
import { C, IsoBox, makeIso } from "../kit";

/**
 * Helpers shared by the four pillar signature scenes (isometric register).
 * Everything resolves to kit.tsx palette `C`; geometry from `makeIso`.
 */
export function makeScene(ox: number, oy: number, k = 20, hz = 14) {
  const base = makeIso(ox, oy, k, hz);
  const r1 = (n: number) => Math.round(n * 10) / 10;
  /** projection rounded to 0.1px (keeps markup small) */
  const proj = (x: number, y: number, z = 0): readonly [number, number] => {
    const [a, b] = base.proj(x, y, z);
    return [r1(a), r1(b)];
  };
  const iso = { ...base, proj };
  /** matrix that maps unit board coords (x, y) onto the horizontal plane at height z */
  const topM = (z = 0) => `matrix(${k} ${k / 2} ${-k} ${k / 2} ${ox} ${oy - z * hz})`;
  /** polyline in screen space from plane coords at height z */
  const path = (list: ReadonlyArray<readonly [number, number]>, z = 0, close = false) =>
    "M" + list.map(([x, y]) => proj(x, y, z).join(" ")).join(" L") + (close ? " Z" : "");
  /** ellipse that a circle of radius r (units) makes in a horizontal plane */
  const ell = (x: number, y: number, z: number, r: number) => {
    const [cx, cy] = proj(x, y, z);
    const rx = r1(r * k * 1.4142);
    return { cx, cy, rx, ry: r1(rx / 2) };
  };
  return { ...iso, topM, path, ell, k, hz, ox, oy };
}
export type Scene = ReturnType<typeof makeScene>;

/** Vertical cylinder (spool, bushing, reel, coin). */
export function Cyl({
  sc, x, y, z0, z1, r, top = C.faceTop, side = C.faceL, stroke = C.line, sw = 1, className,
}: {
  sc: Scene; x: number; y: number; z0: number; z1: number; r: number;
  top?: string; side?: string; stroke?: string; sw?: number; className?: string;
}) {
  const a = sc.ell(x, y, z0, r);
  const b = sc.ell(x, y, z1, r);
  return (
    <g className={className}>
      <path
        d={`M${(a.cx - a.rx).toFixed(1)} ${b.cy.toFixed(1)} V${a.cy.toFixed(1)} A${a.rx.toFixed(1)} ${a.ry.toFixed(1)} 0 0 0 ${(a.cx + a.rx).toFixed(1)} ${a.cy.toFixed(1)} V${b.cy.toFixed(1)} Z`}
        fill={side}
      />
      <ellipse cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill={top} stroke={stroke} strokeWidth={sw} />
    </g>
  );
}

/** White iso slab with a faint 1-unit grid, the stage every scene stands on. */
export function Ground({ sc, w, d, t = 0.45 }: { sc: Scene; w: number; d: number; t?: number }) {
  const grid: string[] = [];
  for (let i = 1; i < w; i++) grid.push(sc.seg(sc.proj(i, 0, 0), sc.proj(i, d, 0)));
  for (let j = 1; j < d; j++) grid.push(sc.seg(sc.proj(0, j, 0), sc.proj(w, j, 0)));
  return (
    <g>
      <path d={sc.path([[0.4, 0.5], [w + 0.4, 0.5], [w + 0.4, d + 0.5], [0.4, d + 0.5]], -t, true)} fill={C.ink} opacity={0.05} />
      <IsoBox faces={sc.box(0, 0, w, d, -t, 0)} right={C.faceDark} front={C.faceR} stroke={C.line} />
      <path d={grid.join(" ")} stroke={C.line} strokeWidth={1} fill="none" />
    </g>
  );
}

/** Card standing on a back wall (slope -0.5 = back-left wall, +0.5 = back-right wall). */
export function WallCard({
  x, y, w, h, slope, children, className,
}: {
  x: number; y: number; w: number; h: number; slope: number; children?: ReactNode; className?: string;
}) {
  return (
    <g className={className}>
      <g transform={`matrix(1 ${slope} 0 1 ${x} ${y})`}>
        <rect x={4} y={6} width={w} height={h} rx={6} fill={C.ink} opacity={0.06} />
        <rect width={w} height={h} rx={6} fill={C.card} stroke={C.line} />
        {children}
      </g>
    </g>
  );
}

/** A cluster of small square "dither" particles: [dx, dy, size] relative to an origin. */
export function Dots({
  at, pts, fill = C.accent, className, opacity = 1,
}: {
  at: readonly [number, number]; pts: ReadonlyArray<readonly [number, number, number]>;
  fill?: string; className?: string; opacity?: number;
}) {
  return (
    <g className={className} transform={`translate(${at[0]} ${at[1]})`} opacity={opacity}>
      {pts.map(([dx, dy, s], i) => (
        <rect key={i} x={dx} y={dy} width={s} height={s} fill={fill} />
      ))}
    </g>
  );
}

/** Deterministic spray of particles fanning out from (0,0) at angle `a` (radians). */
export function spray(n: number, a: number, spread: number, reach: number, seed = 1) {
  const out: [number, number, number][] = [];
  let s = seed * 9301 + 49297;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < n; i++) {
    const ang = a + (rnd() - 0.5) * spread;
    const r = 4 + rnd() * reach;
    const sz = rnd() > 0.7 ? 3 : 2;
    out.push([Math.round(Math.cos(ang) * r), Math.round(Math.sin(ang) * r + r * r * 0.004), sz]);
  }
  return out;
}
