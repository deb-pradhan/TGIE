import { C, IsoBox, SceneFrame } from "../kit";
import { Cyl, Ground, WallCard, makeScene } from "./shared";

/**
 * Pillar C. The company around the idea: an office tile wearing the TGIE mark,
 * an incorporation certificate, a funding staircase topped by a coin, a
 * brand-identity card and an investor network card. Dashed route = the path
 * from "legal entity" to "funded". Motion: route + network dashes, coin float,
 * lit window, node pulse.
 */
const sc = makeScene(281, 158, 26, 18);
const { proj, box, seg, path, poly, topM } = sc;

const BX0 = 3.6, BY0 = 0.6, BX1 = 6.4, BY1 = 3.2, BH = 3.6;

// facade windows on the two visible faces
const wins: { d: string; lit: boolean; blink?: boolean }[] = [];
for (let r = 0; r < 3; r++) {
  const z0 = 0.75 + r * 0.95;
  for (let c = 0; c < 3; c++) {
    const a = BX0 + 0.3 + c * 0.88;
    wins.push({ d: poly([proj(a, BY1, z0), proj(a + 0.55, BY1, z0), proj(a + 0.55, BY1, z0 + 0.55), proj(a, BY1, z0 + 0.55)]), lit: (r + c) % 2 === 0, blink: r === 1 && c === 2 });
  }
  for (let c = 0; c < 3; c++) {
    const a = BY0 + 0.3 + c * 0.76;
    wins.push({ d: poly([proj(BX1, a, z0), proj(BX1, a + 0.5, z0), proj(BX1, a + 0.5, z0 + 0.55), proj(BX1, a, z0 + 0.55)]), lit: (r + c) % 2 === 1 });
  }
}

// funding staircase (ascending toward the back-right)
const STEPS = [4, 3, 2, 1, 0].map((i) => {
  const y1 = 6.5 - 1.1 * i;
  return { i, b: box(7.6, y1 - 1.1, 10.0, y1, 0, 0.8 * (i + 1)), h: 0.8 * (i + 1), y0: y1 - 1.1, y1 };
});
const ARROW = (() => {
  const pts: [number, number, number][] = [];
  for (let i = 0; i < 5; i++) {
    const yc = 5.95 - 1.1 * i;
    const zt = 0.8 * (i + 1) + 0.15;
    pts.push([8.8, yc, zt]);
    if (i < 4) pts.push([8.8, yc - 0.55, zt], [8.8, yc - 0.55, zt + 0.8]);
  }
  return "M" + pts.map(([x, y, z]) => proj(x, y, z).map((n) => n.toFixed(1)).join(" ")).join(" L");
})();

const NODES: [number, number][] = [[30, 30], [140, 32], [152, 82], [84, 108], [20, 84]];

export function EnablementScene() {
  return (
    <SceneFrame viewBox="0 0 640 480" tone="cell">
      <Ground sc={sc} w={11} d={8} />

      {/* route: entity -> certificate -> funded */}
      <path d={path([[5.0, 3.2], [5.0, 4.5], [8.8, 4.5], [8.8, 5.4]], 0.02)} className="ill-dash" stroke={C.accent} strokeWidth={1.6} strokeDasharray="4 6" fill="none" strokeLinejoin="round" />

      {/* ---------- office tile ---------- */}
      <IsoBox faces={box(BX0, BY0, BX1, BY1, 0, BH)} top={C.card} right={C.faceR} front={C.faceL} stroke={C.accentDeep} strokeWidth={1.2} />
      <IsoBox faces={box(BX0 - 0.1, BY0 - 0.1, BX1 + 0.1, BY1 + 0.1, BH, BH + 0.18)} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      {wins.map((w, i) => (
        <path key={i} d={w.d} fill={w.lit ? C.accentSoft : C.accentPale} stroke={C.accentSoft} strokeWidth={0.8} className={w.blink ? "ill-blink" : undefined} />
      ))}
      <path d={poly([proj(4.7, BY1, 0), proj(5.3, BY1, 0), proj(5.3, BY1, 1.0), proj(4.7, BY1, 1.0)])} fill={C.accent} />
      <path d={seg(proj(BX0, BY1, 2.55), proj(BX1, BY1, 2.55))} stroke={C.line} strokeWidth={1} />
      {/* logo tile + roof unit on the roof plane */}
      <g transform={topM(BH + 0.18)}>
        <rect x={4.15} y={0.95} width={1.5} height={1.5} rx={0.28} fill={C.graphite} />
        <text x={4.9} y={2.1} textAnchor="middle" fontSize={1.15} fill={C.card} fontFamily="ui-monospace, Menlo, monospace" fontWeight={700}>
          T
        </text>
      </g>
      <IsoBox faces={box(5.7, 2.2, 6.2, 2.9, BH + 0.18, BH + 0.5)} top={C.faceR} right={C.faceDark} front={C.faceL} stroke={C.lineStrong} strokeWidth={0.8} />

      {/* ---------- incorporation certificate (standing on the ground) ---------- */}
      <g transform={`matrix(1 0.5 0 1 ${proj(0.7, 6.1, 3.7)[0]} ${proj(0.7, 6.1, 3.7)[1]})`}>
        <rect x={5} y={7} width={96} height={66} rx={4} fill={C.ink} opacity={0.06} />
        <rect width={96} height={66} rx={4} fill={C.card} stroke={C.line} />
        <rect x={5} y={5} width={86} height={56} rx={2} fill="none" stroke={C.accentSoft} strokeWidth={1} />
        <text className="hidden sm:inline" x={48} y={21} textAnchor="middle" fontSize={10.5} fill={C.accentDeep} fontFamily="ui-monospace, Menlo, monospace" letterSpacing={0.4}>
          CERTIFICATE
        </text>
        <rect x={20} y={26} width={56} height={3} rx={1.5} fill={C.lineStrong} />
        <rect x={28} y={33} width={40} height={3} rx={1.5} fill={C.line} />
        <path d="M14 53c6-8 9 4 14-2s6-3 9-2" stroke={C.ink2} strokeWidth={1.2} fill="none" strokeLinecap="round" />
        <circle cx={72} cy={47} r={9} fill={C.accent} />
        <circle cx={72} cy={47} r={6} fill="none" stroke={C.card} strokeWidth={1} />
        <path d="M67 54l-2 8 7-3 7 3-2-8" fill={C.accentDeep} />
      </g>
      <path d={seg(proj(0.7, 6.1, 0), proj(3.4, 6.1, 0))} stroke={C.lineStrong} strokeWidth={1.4} />

      {/* ---------- funding staircase ---------- */}
      {STEPS.map((s) => (
        <g key={s.i}>
          <IsoBox faces={s.b} top={s.i === 4 ? C.accentPale : C.card} right={C.faceR} front={C.faceL} stroke={s.i === 4 ? C.accent : C.accentDeep} strokeWidth={1.1} />
          <path d={seg(proj(7.8, s.y1, s.h * 0.5), proj(9.8, s.y1, s.h * 0.5))} stroke={C.line} strokeWidth={1} />
        </g>
      ))}
      <path d={ARROW} className="ill-dash" stroke={C.accent} strokeWidth={1.6} strokeDasharray="4 6" fill="none" strokeLinejoin="round" />
      <g className="ill-float">
        <Cyl sc={sc} x={8.8} y={1.55} z0={4.55} z1={4.7} r={0.62} top={C.accentSoft} side={C.accent} stroke={C.accent} />
        <g transform={topM(4.7)}>
          <text x={8.8} y={1.9} textAnchor="middle" fontSize={0.8} fill={C.graphite} fontFamily="ui-monospace, Menlo, monospace" fontWeight={700}>
            ₹
          </text>
        </g>
      </g>
      <g className="ill-float-2">
        <Cyl sc={sc} x={7.3} y={5.0} z0={1.5} z1={1.62} r={0.34} top={C.accentSoft} side={C.accent} stroke={C.accent} />
        <Cyl sc={sc} x={7.3} y={5.0} z0={1.7} z1={1.82} r={0.34} top={C.accentSoft} side={C.accent} stroke={C.accent} />
      </g>

      {/* ---------- brand identity card (back-left wall) ---------- */}
      <WallCard x={18} y={104} w={176} h={126} slope={-0.5} className="ill-float-2">
        <rect x={12} y={12} width={34} height={34} rx={9} fill={C.graphite} />
        <text x={29} y={37} textAnchor="middle" fontSize={22} fill={C.card} fontFamily="ui-monospace, Menlo, monospace" fontWeight={700}>
          T
        </text>
        <rect x={54} y={18} width={62} height={7} rx={3.5} fill={C.ink2} />
        <rect x={54} y={32} width={42} height={5} rx={2.5} fill={C.lineStrong} />
        <text x={12} y={82} fontSize={26} fill={C.ink} fontFamily="ui-monospace, Menlo, monospace">
          Aa
        </text>
        {[C.graphite, C.accentDeep, C.accent, C.accentSoft, C.accentPale].map((f, i) => (
          <rect key={i} x={72 + i * 20} y={58} width={16} height={34} rx={4} fill={f} stroke={C.line} />
        ))}
        <rect x={12} y={104} width={150} height={4} rx={2} fill={C.line} />
        <rect x={12} y={112} width={96} height={4} rx={2} fill={C.line} />
      </WallCard>

      {/* ---------- investor network card (back-right wall) ---------- */}
      <WallCard x={452} y={30} w={170} h={126} slope={0.5} className="ill-float">
        {NODES.map(([x, y], i) => (
          <g key={i}>
            <path d={`M85 62L${x} ${y}`} stroke={C.line} strokeWidth={1.6} />
            <path d={`M85 62L${x} ${y}`} className="ill-dash" stroke={C.accent} strokeWidth={1.4} strokeDasharray="4 6" />
          </g>
        ))}
        {NODES.map(([x, y], i) => (
          <g key={`n${i}`}>
            <circle cx={x} cy={y} r={11} fill={C.card} stroke={C.accentDeep} strokeWidth={1.3} className={i === 1 ? "ill-pulse" : undefined} />
            <circle cx={x} cy={y - 2.5} r={3} fill={C.accentDeep} />
            <path d={`M${x - 5.5} ${y + 6}c0-5 11-5 11 0`} fill={C.accentDeep} />
          </g>
        ))}
        <circle cx={85} cy={62} r={16} fill={C.accent} />
        <rect x={77} y={54} width={16} height={16} rx={4} fill={C.graphite} />
        <text x={85} y={67} textAnchor="middle" fontSize={11} fill={C.card} fontFamily="ui-monospace, Menlo, monospace" fontWeight={700}>
          T
        </text>
        {/* handshake: two interlocked rings on the main link */}
        <circle cx={54} cy={44} r={5} fill="none" stroke={C.accentDeep} strokeWidth={1.4} />
        <circle cx={60} cy={48} r={5} fill="none" stroke={C.accentDeep} strokeWidth={1.4} />
      </WallCard>
    </SceneFrame>
  );
}
