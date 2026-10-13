import type { ReactNode } from "react";
import { C, SceneFrame } from "../kit";
import { Arcs, Block, Chip, Cyl, Dim, Gear, Ground, Led, mk, MONO, Prism, Shadow, Tag, type S } from "./_shared/iso";

/** Sub-service illustrations for the "products" pillar, keyed by sub slug. */

const dash = { stroke: C.accent, strokeWidth: 1.8, strokeDasharray: "5 5", fill: "none" } as const;
const dly = (v: string, w: string) => ({ ["--dx" as string]: "0px", ["--dy" as string]: v, animationDelay: w });

/** Diagonal carbon-weave hatch inside a w x d rectangle (floor-plane coords). */
function hatch(w: number, d: number, step = 0.4) {
  let out = "";
  for (let c = step; c < w + d; c += step) {
    const u0 = Math.min(c, w);
    const v1 = Math.min(c, d);
    out += `M${u0} ${c - u0}L${c - v1} ${v1}`;
  }
  return out;
}

/** Rectangular ring (outer minus inset) at height z, drawn as one evenodd path. */
function ring(s: S, x0: number, y0: number, x1: number, y1: number, z: number, t: number) {
  const q = (a: number, b: number, c: number, d: number) => s.poly([s.proj(a, b, z), s.proj(c, b, z), s.proj(c, d, z), s.proj(a, d, z)]);
  return q(x0, y0, x1, y1) + q(x0 + t, y0 + t, x1 - t, y1 - t);
}

/* ------------------------------------------------- 1. Industrial enclosure */
function Industrial() {
  const s = mk(282, 238, 30, 26);
  const W = 4.6;
  const D = 3.2;
  const zl = 3.7;
  const lidTop = zl + 0.6;
  return (
    <>
      <Ground s={s} x0={-1.6} y0={-1.4} x1={6.4} y1={4.6} />
      <Shadow s={s} x0={0} y0={0} x1={W} y1={D} />
      {/* base: walls + open cavity */}
      <path d={s.box(0, 0, W, D, 0, 1.6).right} fill={C.faceR} />
      <path d={s.box(0, 0, W, D, 0, 1.6).front} fill={C.faceL} />
      <path d={ring(s, 0, 0, W, D, 1.6, 0.4)} fill={C.faceTop} fillRule="evenodd" stroke={C.lineStrong} strokeLinejoin="round" />
      <path d={s.poly([s.proj(0.4, 0.4, 1.6), s.proj(W - 0.4, 0.4, 1.6), s.proj(W - 0.4, D - 0.4, 1.6), s.proj(0.4, D - 0.4, 1.6)])} fill={C.faceDark} />
      {/* gasket ring on the rim */}
      <path d={ring(s, 0.08, 0.08, W - 0.08, D - 0.08, 1.64, 0.2)} fill={C.accent} fillRule="evenodd" stroke={C.accentDeep} strokeWidth={1} />
      {/* connector cut-outs: right face (M12 + gland), front face (USB-C, RJ45, vents) */}
      <g transform={s.wallY(W, 0, 0)}>
        <circle cx={1.4} cy={0.85} r={0.4} fill={C.ink2} stroke={C.ink} strokeWidth={0.05} />
        <circle cx={1.4} cy={0.85} r={0.26} fill={C.ink} />
        {[[1.4, 1.0], [1.4, 0.7], [1.27, 0.85], [1.53, 0.85]].map(([u, v]) => <circle key={`${u}${v}`} cx={u} cy={v} r={0.04} fill={C.accentSoft} />)}
        <circle cx={2.4} cy={0.85} r={0.24} fill={C.card} stroke={C.lineStrong} strokeWidth={0.05} />
        <circle cx={2.4} cy={0.85} r={0.1} fill={C.lineStrong} />
      </g>
      <g transform={s.wallX(0, D, 0)}>
        <rect x={0.6} y={0.7} width={1.0} height={0.4} rx={0.2} fill={C.ink2} />
        <rect x={0.72} y={0.8} width={0.76} height={0.2} rx={0.1} fill={C.ink} />
        <rect x={2.1} y={0.55} width={0.9} height={0.65} rx={0.06} fill={C.ink2} />
        <path d="M2.3 0.75V0.95M2.45 0.75V0.95M2.6 0.75V0.95M2.75 0.75V0.95" stroke={C.accentSoft} strokeWidth={0.04} />
        {[3.5, 3.7, 3.9].map((u) => <rect key={u} x={u} y={0.4} width={0.08} height={0.8} rx={0.04} fill={C.lineStrong} />)}
      </g>
      {/* lid lifts off: dashed alignment guides + floating lid */}
      <path d={s.route([[0, D, 1.9], [0, D, zl - 0.1]]) + s.route([[W, D, 1.9], [W, D, zl - 0.1]]) + s.route([[W, 0, 1.9], [W, 0, zl - 0.1]])} {...dash} className="ill-dash" strokeWidth={1.4} />
      <g className="ill-float">
        <Block s={s} x0={0} y0={0} x1={W} y1={D} z0={zl} z1={lidTop} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
        <g transform={s.floor(0, 0, lidTop)}>
          <path d={hatch(W, D)} stroke={C.line} strokeWidth={0.03} fill="none" />
          {[[0.3, 0.3], [W - 0.3, 0.3], [0.3, D - 0.3], [W - 0.3, D - 0.3]].map(([u, v]) => <circle key={`${u}${v}`} cx={u} cy={v} r={0.11} fill={C.lineStrong} stroke={C.muted} strokeWidth={0.03} />)}
        </g>
        {[1.1, 1.5, 1.9, 2.3, 2.7].map((x) => (
          <Block key={x} s={s} x0={x} y0={0.6} x1={x + 0.16} y1={2.6} z0={lidTop} z1={lidTop + 0.5} top={C.faceTop} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
        ))}
        <Cyl s={s} x={3.9} y={0.9} z0={lidTop} z1={lidTop + 0.4} r={0.18} side={C.ink2} top={C.ink} stroke={C.ink} />
        <path d={s.route([[3.9, 0.9, lidTop + 0.4], [3.9, 0.9, lidTop + 1.9]])} stroke={C.ink2} strokeWidth={2.4} strokeLinecap="round" />
      </g>
      <Tag x={24} y={64} size={13} tone="accent">PA-CF composite</Tag>
      <Tag x={24} y={96} size={13}>no mold tooling</Tag>
      <path d={`M${s.proj(0, D, 1.7)[0]} ${s.proj(0, D, 1.7)[1]}h-44`} stroke={C.muted} strokeWidth={1} />
      <Tag x={s.proj(0, D, 1.7)[0] - 44 - 107} y={s.proj(0, D, 1.7)[1]} size={13} w={107}>gasket seal</Tag>
      <path d={`M${s.proj(W, 1.4, 0.85)[0]} ${s.proj(W, 1.4, 0.85)[1]}h60`} stroke={C.muted} strokeWidth={1} />
      <Tag x={s.proj(W, 1.4, 0.85)[0] + 60} y={s.proj(W, 1.4, 0.85)[1]} size={13}>M12 · USB-C</Tag>
    </>
  );
}

/* ----------------------------------------------------------------- 2. Kinetic */
function Kinetic() {
  const s = mk(239, 176, 30, 26);
  return (
    <>
      <Ground s={s} x0={-1} y0={-1.2} x1={8.8} y1={3.6} />
      <Shadow s={s} x0={0} y0={0} x1={7.8} y1={2.4} />
      {/* plinth with the gear train on its front face */}
      <Block s={s} x0={0} y0={0} x1={7.8} y1={2.4} z0={0} z1={1.5} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <g transform={s.wallX(0, 2.4, 0)}>
        <rect x={0.25} y={0.2} width={4.4} height={1.1} rx={0.12} fill={C.cell} stroke={C.line} strokeWidth={0.04} />
        <g transform="translate(1.1 0.75)"><Gear r={0.46} teeth={10} spin style={{ animationDuration: "9s" }} sw={0.045} /></g>
        <g transform="translate(2.15 0.75)"><Gear r={0.55} teeth={12} spin style={{ animationDuration: "10.8s", animationDirection: "reverse" }} fill={C.accentPale} sw={0.045} /></g>
        <g transform="translate(3.22 0.75)"><Gear r={0.46} teeth={10} spin style={{ animationDuration: "9s" }} sw={0.045} /></g>
        <rect x={5.3} y={0.55} width={1.7} height={0.4} rx={0.2} fill={C.ink2} />
        <rect x={5.4} y={0.65} width={0.9} height={0.2} rx={0.1} fill={C.accent} />
      </g>
      {/* cam-driven wave: discs rise and fall with a phase offset */}
      {Array.from({ length: 7 }, (_, i) => {
        const x = 0.7 + i * 0.82;
        const zTop = 2.75 + Math.sin(i * 0.95) * 0.55;
        const [px, py] = s.proj(x, 1.2, zTop);
        const [bx, by] = s.proj(x, 1.2, 1.5);
        const hot = i % 3 === 1;
        return (
          <g key={i} className="ill-slide" style={dly("-10px", `${-i * 0.6}s`)}>
            <path d={`M${bx} ${by}L${px} ${py}`} stroke={C.lineStrong} strokeWidth={2.4} />
            <ellipse cx={px} cy={py} rx={17} ry={8.5} fill={hot ? C.accentSoft : C.card} stroke={hot ? C.accent : C.lineStrong} strokeWidth={1.4} />
          </g>
        );
      })}
      {/* controller + Wi-Fi */}
      <Chip s={s} x={6.5} y={0.6} z={1.5} w={0.9} d={0.9} h={0.3} pins={3} />
      <Led s={s} x={6.2} y={1.9} z={1.55} />
      <Arcs x={s.proj(6.95, 1.05, 1.8)[0]} y={s.proj(6.95, 1.05, 1.8)[1] - 8} rot={-90} n={3} r0={16} gap={11} spread={90} />
      <Tag x={s.proj(6.95, 1.05, 1.8)[0] - 14} y={s.proj(6.95, 1.05, 1.8)[1] - 84} size={13} tone="accent">Wi-Fi · BLE</Tag>
      <Tag x={24} y={64} size={13}>cam + motor</Tag>
    </>
  );
}

/* ------------------------------------------------------------- 3. Automotive */
function Automotive() {
  const s = mk(296, 250, 32, 26);
  const [hx, hy] = s.proj(-1.4, -1.0, 3.6);
  const sweep = (x: number) => `M${hx} ${hy}L${s.proj(x, -0.15, 0.62)[0]} ${s.proj(x, -0.15, 0.62)[1]}L${s.proj(x, 2.35, 0.62)[0]} ${s.proj(x, 2.35, 0.62)[1]}Z`;
  const tz = 0.45;
  return (
    <>
      <Ground s={s} x0={-2.4} y0={-2} x1={5.6} y1={3.8} />
      <Shadow s={s} x0={-0.9} y0={-0.9} x1={4.3} y1={3.3} />
      {/* turntable */}
      <Cyl s={s} x={1.7} y={1.1} z0={0} z1={0.35} r={2.35} side={C.faceR} top={C.faceTop} />
      <Cyl s={s} x={1.7} y={1.1} z0={0.35} z1={tz} r={2.1} side={C.faceDark} top={C.accentPale} stroke={C.accentSoft} />
      {/* dashboard bezel being scanned */}
      <Block s={s} x0={0} y0={0.1} x1={3.4} y1={2.1} z0={tz} z1={tz + 0.5} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <Block s={s} x0={3.4} y0={0.8} x1={3.8} y1={1.4} z0={tz} z1={tz + 0.3} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <g transform={s.floor(0, 0, tz + 0.5)}>
        {[0.45, 0.8, 1.15, 1.5].map((u) => <rect key={u} x={0.4 + u * 0.9} y={0.4} width={0.1} height={1.1} rx={0.05} fill={C.ink2} transform="translate(0 0.1)" />)}
        <circle cx={0.9} cy={1.85} r={0.2} fill={C.ink2} />
        <circle cx={1.6} cy={1.85} r={0.2} fill={C.ink2} />
        <circle cx={2.3} cy={1.85} r={0.2} fill={C.ink2} />
        <rect x={2.9} y={0.45} width={0.35} height={0.35} rx={0.06} fill="none" stroke={C.accent} strokeWidth={0.05} />
        <path d="M0.3 0.2H3.1" stroke={C.line} strokeWidth={0.03} />
      </g>
      {/* trim clip beside it */}
      <Block s={s} x0={4.4} y0={2.4} x1={5.1} y1={2.7} z0={0} z1={0.3} top={C.card} stroke={C.lineStrong} />
      <Block s={s} x0={4.4} y0={2.4} x1={4.6} y1={2.7} z0={0.3} z1={0.9} top={C.card} stroke={C.lineStrong} />
      <Block s={s} x0={4.4} y0={2.4} x1={5.1} y1={2.55} z0={0.8} z1={0.9} top={C.card} stroke={C.lineStrong} />
      {/* scanner on a rail: laser fan sweeps across the part */}
      <Block s={s} x0={-2.2} y0={-1.3} x1={4.8} y1={-1.1} z0={0} z1={0.2} top={C.card} stroke={C.lineStrong} />
      <g className="ill-slide" style={{ ["--dx" as string]: "56px", ["--dy" as string]: "28px" }}>
        <path d={sweep(0.2)} fill={C.accent} opacity={0.14} />
        <path d={`M${hx} ${hy}L${s.proj(0.2, -0.15, 0.62)[0]} ${s.proj(0.2, -0.15, 0.62)[1]}M${hx} ${hy}L${s.proj(0.2, 2.35, 0.62)[0]} ${s.proj(0.2, 2.35, 0.62)[1]}`} stroke={C.accent} strokeWidth={1.2} strokeDasharray="4 4" fill="none" />
        <path d={`M${s.proj(0.2, -0.15, 0.62)[0]} ${s.proj(0.2, -0.15, 0.62)[1]}L${s.proj(0.2, 2.35, 0.62)[0]} ${s.proj(0.2, 2.35, 0.62)[1]}`} stroke={C.accent} strokeWidth={3} strokeLinecap="round" />
        <path d={s.route([[-1.4, -1.2, 0.2], [-1.4, -1.0, 3.3]])} stroke={C.ink2} strokeWidth={2.4} />
        <Block s={s} x0={-1.7} y0={-1.3} x1={-1.1} y1={-0.7} z0={3.3} z1={3.7} top={C.card} right={C.faceDark} front={C.faceL} stroke={C.accentDeep} />
      </g>
      <Dim a={s.proj(-0.6, 0.1, tz)} b={s.proj(-0.6, 2.1, tz)} label="±0.1 mm" off={-52} />
      <Tag x={24} y={64} size={13} tone="accent">3D scan → CAD</Tag>
      <Tag x={24} y={96} size={13}>ASA · ABS · nylon</Tag>
    </>
  );
}

/* --------------------------------------------------------------- 4. Miniature */
function Miniature() {
  const s = mk(282, 262, 34, 28);
  const zp = 0.9;
  const body: [number, number][] = [[0, 0.3], [4, 0.3], [4, 0.85], [3.4, 0.95], [2.8, 1.0], [2.25, 1.5], [1.0, 1.5], [0.4, 1.0], [0, 0.95]];
  const [y0, y1] = [0, 1.7];
  const cx = (x0: number, x1: number, zt: number) => s.box(x0, -0.35, x1, y1 + 0.35, zp, zt);
  const cs = cx(-0.35, 4.35, 3.0);
  return (
    <>
      <Ground s={s} x0={-1.6} y0={-1.5} x1={5.8} y1={3.6} />
      <Shadow s={s} x0={-0.6} y0={-0.6} x1={4.9} y1={2.6} />
      {/* museum plinth with a plaque */}
      <Block s={s} x0={-0.6} y0={-0.6} x1={4.9} y1={2.6} z0={0} z1={zp} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <g transform={s.wallX(-0.6, 2.6, 0)}>
        <rect x={2.2} y={0.28} width={1.7} height={0.36} rx={0.05} fill={C.cell} stroke={C.lineStrong} strokeWidth={0.03} />
        <path d="M2.35 0.42H3.2M2.35 0.54H2.9" stroke={C.muted} strokeWidth={0.04} strokeLinecap="round" />
      </g>
      {/* the replica */}
      <g transform={`translate(0 0)`}>
        <Prism s={s} pts={body.map(([x, z]) => [x, z + zp] as [number, number])} y0={y0} y1={y1} front={C.accentSoft} top={C.accentPale} right={C.accent} stroke={C.accentDeep} />
        <g transform={s.wallX(0, y1, zp)}>
          <path d="M0.62 1.04L1.08 1.42H2.14L2.55 1.04Z" fill={C.card} stroke={C.accentDeep} strokeWidth={0.05} strokeLinejoin="round" />
          <path d="M1.6 1.04V1.42M0.3 0.62H3.9" stroke={C.accentDeep} strokeWidth={0.035} opacity={0.5} />
          {[0.8, 3.2].map((u) => (
            <g key={u}>
              <circle cx={u} cy={0.3} r={0.42} fill={C.faceDark} />
              <circle cx={u} cy={0.3} r={0.34} fill={C.ink2} />
              <circle cx={u} cy={0.3} r={0.15} fill={C.card} stroke={C.lineStrong} strokeWidth={0.03} />
            </g>
          ))}
        </g>
        <g transform={s.wallY(4, 0, zp)}>
          {[0.3, 1.4].map((u) => <ellipse key={u} cx={u} cy={0.56} rx={0.14} ry={0.1} fill={C.accentSoft} stroke={C.accent} strokeWidth={0.04} className="ill-blink" />)}
        </g>
        <g transform={s.floor(0, 0, zp + 0.95)}>
          <path d="M3.45 0.15H3.95M3.45 0.45H3.95M3.45 0.75H3.95M3.45 1.05H3.95M3.45 1.35H3.95" stroke={C.lineStrong} strokeWidth={0.03} />
        </g>
      </g>
      {/* glass case */}
      <path d={cs.right + cs.front + cs.top} fill={C.accentPale} opacity={0.3} stroke={C.accentSoft} strokeWidth={1.4} strokeLinejoin="round" />
      <path d={s.route([[-0.35, y1 + 0.35, zp], [-0.35, y1 + 0.35, 3.0]]) + s.route([[4.35, y1 + 0.35, zp], [4.35, y1 + 0.35, 3.0]])} stroke={C.accent} strokeWidth={1.2} fill="none" opacity={0.5} />
      <Tag x={30} y={72} size={18} tone="accent" w={74}>1:24</Tag>
      <Tag x={30} y={116} size={13}>multi-material</Tag>
      <Dim a={s.proj(4.9, 2.6, zp)} b={s.proj(4.9, -0.6, zp)} label="168 mm" off={40} />
    </>
  );
}

/* ---------------------------------------------------------------- 5. Retail */
function Retail() {
  const s = mk(290, 276, 30, 28);
  const bars = [0.32, 0.46, 0.4, 0.62, 0.78, 1];
  const barcode = "M0.2 0.3V1.7M0.35 0.3V1.7M0.6 0.3V1.7M0.7 0.3V1.7M0.95 0.3V1.7M1.2 0.3V1.7M1.3 0.3V1.7M1.55 0.3V1.7M1.65 0.3V1.7M1.9 0.3V1.7";
  return (
    <>
      <Ground s={s} x0={-2.6} y0={-1.6} x1={6.2} y1={3.8} />
      {/* shelf with product boxes (back-left) */}
      <Shadow s={s} x0={-2.3} y0={-1.3} x1={1.7} y1={0.3} />
      <Block s={s} x0={-2.2} y0={-1.2} x1={1.6} y1={0.2} z0={1.2} z1={1.3} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      {[-2.2, 1.5].map((x) => <Block key={x} s={s} x0={x} y0={-1.2} x1={x + 0.1} y1={0.2} z0={0} z1={1.3} top={C.card} stroke={C.lineStrong} />)}
      {[0, 1, 2].map((i) => (
        <Block key={i} s={s} x0={-2.0 + i * 1.15} y0={-1.0} x1={-1.2 + i * 1.15} y1={0} z0={1.3} z1={2.2} top={C.card} right={C.faceDark} front={i === 1 ? C.accentPale : C.faceR} stroke={i === 1 ? C.accent : C.lineStrong} />
      ))}
      <Block s={s} x0={-2.0} y0={-1.0} x1={1.5} y1={0} z0={0.08} z1={0.18} top={C.card} stroke={C.lineStrong} />
      {/* hero product box with barcode */}
      <Shadow s={s} x0={0.4} y0={0.8} x1={3.8} y1={3} />
      <Block s={s} x0={0.6} y0={1.0} x1={3.4} y1={2.6} z0={0} z1={2.2} top={C.card} right={C.faceDark} front={C.card} stroke={C.lineStrong} />
      <g transform={s.wallX(0.6, 2.6, 0)}>
        <rect x={0} y={1.5} width={2.8} height={0.32} fill={C.accent} />
        <path d="M0.3 0.95H1.5M0.3 0.75H1.0" stroke={C.ink2} strokeWidth={0.1} strokeLinecap="round" />
        <rect x={1.6} y={0.18} width={1.0} height={0.7} rx={0.04} fill={C.cell} stroke={C.line} strokeWidth={0.03} />
        <path d={barcode} transform="translate(1.65 -0.05) scale(0.5 0.55)" stroke={C.ink} strokeWidth={0.07} />
        <circle cx={0.55} cy={0.5} r={0.22} fill={C.accentPale} stroke={C.accent} strokeWidth={0.05} />
      </g>
      {/* parcel on the right, route from shelf to parcel */}
      <Shadow s={s} x0={4.2} y0={1.4} x1={6} y1={3.1} />
      <Block s={s} x0={4.4} y0={1.6} x1={5.8} y1={2.9} z0={0} z1={1.1} top={C.faceL} right={C.faceDark} front={C.faceR} stroke={C.muted} />
      <path d={s.route([[4.4, 2.25, 1.1], [5.8, 2.25, 1.1]])} stroke={C.accent} strokeWidth={5} />
      <path d={s.route([[5.1, 1.6, 1.1], [5.1, 2.9, 1.1]]) + s.route([[5.8, 1.6, 0.55], [5.8, 2.9, 0.55]])} stroke="none" />
      <path d={s.route([[1.6, -0.5, 0.15], [4.0, -0.5, 0.15], [4.0, 2.2, 0.15], [4.3, 2.2, 0.15]])} {...dash} className="ill-dash" />
      {/* sales + cart cards */}
      <g transform="translate(404 40)">
        <rect width={206} height={126} rx={10} fill={C.card} stroke={C.lineStrong} />
        <text x={14} y={24} fontFamily={MONO} fontSize={12} fill={C.muted}>sales / week</text>
        {bars.map((h, i) => (
          <rect key={i} className="ill-grow" style={{ animationDelay: `${i * 0.35}s` }} x={16 + i * 30} y={104 - h * 62} width={20} height={h * 62} rx={4} fill={i === bars.length - 1 ? C.accent : C.lineStrong} />
        ))}
        <path d="M24 82L56 74L86 76L116 60L146 48L190 34" stroke={C.accentDeep} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M182 31L192 33L189 43" stroke={C.accentDeep} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g transform="translate(36 40)">
        <rect width={96} height={72} rx={10} fill={C.card} stroke={C.lineStrong} />
        <path d="M22 26h8l5 22h28l5-16H33" fill="none" stroke={C.ink2} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={39} cy={55} r={3.4} fill={C.ink2} />
        <circle cx={60} cy={55} r={3.4} fill={C.ink2} />
        <circle cx={72} cy={22} r={11} fill={C.ink} />
        <text x={72} y={26.5} textAnchor="middle" fontFamily={MONO} fontSize={13} fill="#fff">3</text>
      </g>
    </>
  );
}

export const productsArt: Record<string, () => ReactNode> = {
  "industrial-enclosures": () => <SceneFrame><Industrial /></SceneFrame>,
  "kinetic-iot-decor": () => <SceneFrame><Kinetic /></SceneFrame>,
  "automotive-plastics": () => <SceneFrame><Automotive /></SceneFrame>,
  "scale-miniatures": () => <SceneFrame><Miniature /></SceneFrame>,
  "retail-ecommerce": () => <SceneFrame><Retail /></SceneFrame>,
};
