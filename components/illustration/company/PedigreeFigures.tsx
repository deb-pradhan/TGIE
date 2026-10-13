import { C, IsoBox, makeIso } from "../kit";
import { Stage, flatT, pl, qF, qT, shadow, type IsoO } from "./bits";

const W = 360;
const H = 240;
const o: IsoO = { ox: 180, oy: 34, k: 16, hz: 12 };
const P = makeIso(o.ox, o.oy, o.k, o.hz);
const { proj } = P;

function Plate() {
  return (
    <g>
      <IsoBox faces={P.box(0, 0, 10, 10, -0.5, 0)} top={C.soft} stroke={C.lineStrong} />
      <g stroke={C.line} strokeWidth="1" fill="none">
        {[2.5, 5, 7.5].map((i) => (
          <path key={i} d={P.seg(proj(i, 0, 0), proj(i, 10, 0)) + P.seg(proj(0, i, 0), proj(10, i, 0))} />
        ))}
      </g>
    </g>
  );
}

/** 12-point seal used as the credential badge */
function Seal({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const a = (i * Math.PI) / 12;
    const rr = i % 2 ? r * 0.86 : r;
    return `${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`;
  });
  return <path d={"M" + pts.join(" L") + " Z"} fill={C.card} stroke={C.teal} strokeWidth="1.4" strokeLinejoin="round" />;
}

/* ------------------------------------------------ 01 · research foundation */
export function FoundationFigure() {
  const sensors = [
    { x: 0.8, y: 0.8 },
    { x: 7.6, y: 0.8 },
    { x: 0.8, y: 7.6 },
  ];
  const wave = Array.from({ length: 9 }, (_, t) => [7.9 + t * 0.15, 1.6 + 0.32 * Math.sin(t * 0.95), 0.5] as [number, number, number]);
  return (
    <Stage w={W} h={H} tone="paper2" label="Isometric low-power silicon die linked to three sensors, with an IIT Madras credential badge.">
      <Plate />
      {/* ground links */}
      <g fill="none" stroke={C.teal} strokeWidth="1.5" strokeDasharray="5 5" strokeLinejoin="round" className="ill-dash">
        <path d={pl(P, [[2.4, 1.6, 0], [5, 1.6, 0], [5, 4, 0]])} />
        <path d={pl(P, [[7.6, 2.2, 0], [5.6, 2.2, 0], [5.6, 4, 0]])} />
        <path d={pl(P, [[2.4, 8.4, 0], [5, 8.4, 0], [5, 6, 0]])} />
      </g>
      {/* sensor pucks */}
      {sensors.map((s) => (
        <IsoBox key={`${s.x}-${s.y}`} faces={P.box(s.x, s.y, s.x + 1.6, s.y + 1.6, 0, 0.5)} />
      ))}
      <g fill="none" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={pl(P, [[1.0, 1.6, 0.5], [2.2, 1.6, 0.5]]) + pl(P, [[1.6, 1.0, 0.5], [1.6, 2.2, 0.5]]) + pl(P, [[1.6, 1.6, 0.5], [1.6, 1.6, 1.5]])} />
        <path d={pl(P, wave)} />
      </g>
      <g transform={flatT(o, 1.6, 8.4, 0.5)} fill="none" stroke={C.teal} strokeWidth="1.4">
        <circle r="0.2" fill={C.teal} vectorEffect="non-scaling-stroke" />
        <circle r="0.5" vectorEffect="non-scaling-stroke" />
        <circle r="0.78" vectorEffect="non-scaling-stroke" opacity=".55" />
      </g>
      {/* low-power silicon: package on a carrier */}
      <IsoBox faces={P.box(3.8, 4, 6.2, 6, 0, 0.5)} />
      <g stroke={C.lineStrong} strokeWidth="1.2" strokeLinecap="round">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path d={P.seg(proj(4.1 + i * 0.45, 6, 0.15), proj(4.1 + i * 0.45, 6.4, 0.15))} />
            <path d={P.seg(proj(6.2, 4.3 + i * 0.35, 0.15), proj(6.6, 4.3 + i * 0.35, 0.15))} />
          </g>
        ))}
      </g>
      <IsoBox faces={P.box(4.3, 4.4, 5.7, 5.6, 0.5, 0.95)} top={C.teal} right={C.tealDeep} front={C.tealDeep} stroke={C.tealDeep} />
      <path d={qT(P, 4.7, 4.8, 5.3, 5.2, 0.95)} fill="none" stroke={C.mint} strokeWidth="1.2" />
      {/* credential badge */}
      <g className="ill-float">
        <path d={P.seg(proj(5, 5, 1.0), [180, 62])} stroke={C.teal} strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
        <Seal cx={180} cy={46} r={19} />
        <text x="180" y="49.5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="700" fill={C.tealDeep}>
          IITM
        </text>
      </g>
    </Stage>
  );
}

/* ------------------------------------------------ 02 · medical-grade */
export function MedicalFigure() {
  const ecg: [number, number, number][] = [
    [2.9, 1.1, 1.7], [3.7, 1.1, 1.7], [3.95, 1.1, 1.95], [4.2, 1.1, 1.7], [4.55, 1.1, 1.7],
    [4.75, 1.1, 1.2], [5.0, 1.1, 2.8], [5.25, 1.1, 1.1], [5.5, 1.1, 1.7], [6.1, 1.1, 1.7],
    [6.4, 1.1, 2.05], [6.7, 1.1, 1.7], [7.1, 1.1, 1.7],
  ];
  return (
    <Stage w={W} h={H} tone="paper2" label="Isometric monitor with an ECG trace above a fault-tolerant board with two redundant chips and a shield badge.">
      <Plate />
      {/* monitor */}
      <IsoBox faces={P.box(2.5, 0.9, 7.5, 1.3, 0.2, 3.3)} top={C.faceTop} />
      <path d={qF(P, 2.7, 7.3, 0.5, 3.1, 1.3)} fill={C.forest} />
      <path d={pl(P, [[2.7, 1.3, 1.7], [7.3, 1.3, 1.7]])} stroke={C.forestDeep} strokeWidth="1" />
      <path
        className="ill-dash"
        d={pl(P, ecg.map(([x, , z]) => [x, 1.3, z] as [number, number, number]))}
        fill="none"
        stroke={C.tealSoft}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeDasharray="60 6"
      />
      <path d={P.seg(proj(4, 1.1, 0), proj(4, 1.1, 0.2)) + P.seg(proj(6, 1.1, 0), proj(6, 1.1, 0.2))} stroke={C.lineStrong} strokeWidth="3" />
      {/* board */}
      <IsoBox faces={P.box(1, 3, 9, 9, 0, 0.35)} top={C.mint} stroke={C.teal} />
      <g fill="none" stroke={C.teal} strokeWidth="1.2" strokeLinejoin="round" opacity=".8">
        <path d={pl(P, [[1.4, 4.2, 0.35], [2.2, 4.2, 0.35], [2.6, 4.6, 0.35]])} />
        <path d={pl(P, [[8.6, 4.2, 0.35], [7.8, 4.2, 0.35], [7.4, 4.6, 0.35]])} />
        <path d={pl(P, [[1.4, 8.2, 0.35], [3.6, 8.2, 0.35], [4.2, 7.6, 0.35], [5.8, 7.6, 0.35], [6.4, 8.2, 0.35], [8.6, 8.2, 0.35]])} />
        <path d={pl(P, [[1.4, 7.4, 0.35], [3, 7.4, 0.35], [3.4, 7.0, 0.35]])} />
      </g>
      {/* redundant chips with cross-check link */}
      <g fill="none" stroke={C.teal} strokeWidth="1.5" strokeDasharray="4 4" className="ill-dash">
        <path d={pl(P, [[3.9, 5.5, 0.35], [6.1, 5.5, 0.35]])} />
      </g>
      <IsoBox faces={P.box(2.2, 4.6, 3.9, 6.4, 0.35, 0.9)} top={C.forest} right={C.forestDeep} front={C.forestDeep} stroke={C.forestDeep} />
      <IsoBox faces={P.box(6.1, 4.6, 7.8, 6.4, 0.35, 0.9)} top={C.forest} right={C.forestDeep} front={C.forestDeep} stroke={C.forestDeep} />
      <g fill={C.tealSoft}>
        <circle cx={proj(3.05, 5.5, 0.9)[0]} cy={proj(3.05, 5.5, 0.9)[1]} r="2.4" />
        <circle className="ill-blink" cx={proj(6.95, 5.5, 0.9)[0]} cy={proj(6.95, 5.5, 0.9)[1]} r="2.4" />
      </g>
      {/* shield badge */}
      <g className="ill-float">
        <g transform="translate(180 30)">
          <path d="M0 -20 L16 -14 V0 C16 10 8 17 0 21 C-8 17 -16 10 -16 0 V-14 Z" fill={C.card} stroke={C.teal} strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M-7 0 L-2 5.5 L8 -6" fill="none" stroke={C.teal} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    </Stage>
  );
}

/* ------------------------------------------------ 03 · ISO 9001:2015 fabrication */
export function FabricationFigure() {
  const spark = [
    [3.0, 3.1, 1.3], [3.4, 3.0, 1.9], [2.7, 3.2, 2.2], [3.7, 3.2, 1.6], [3.1, 2.9, 2.7],
  ] as const;
  return (
    <Stage w={W} h={H} tone="paper2" label="Isometric steel plates with a weld bead and sparks, beside a transformer tank and a certificate with a quality seal.">
      <Plate />
      {/* tank with cooling fins */}
      <IsoBox faces={P.box(6.2, 0.8, 9.2, 4.2, 0, 2.4)} />
      <g stroke={C.lineStrong} strokeWidth="1.2">
        {[1.3, 1.8, 2.3, 2.8, 3.3, 3.8].map((y) => (
          <path key={y} d={P.seg(proj(9.2, y, 0.2), proj(9.2, y, 2.2))} />
        ))}
      </g>
      <path d={qT(P, 6.6, 1.2, 8.8, 3.8, 2.4)} fill="none" stroke={C.line} />
      <IsoBox faces={P.box(7.2, 1.7, 7.8, 2.3, 2.4, 3.0)} top={C.faceTop} right={C.faceDark} front={C.faceR} />
      {/* steel plates + weld bead */}
      <IsoBox faces={P.box(0.6, 0.8, 3.8, 3.4, 0, 0.45)} top={C.faceTop} right={C.faceDark} front={C.faceR} />
      <IsoBox faces={P.box(1.1, 1.2, 3.3, 3.0, 0.45, 0.9)} top={C.faceTop} right={C.faceDark} front={C.faceR} />
      <path className="ill-dash" d={pl(P, [[1.3, 3.0, 0.9], [3.1, 3.0, 0.9]])} fill="none" stroke={C.teal} strokeWidth="2.6" strokeLinecap="round" strokeDasharray="7 3" />
      {spark.map(([x, y, z], i) => (
        <rect key={i} className={i % 2 ? "ill-pulse" : "ill-blink"} x={proj(x, y + 0.6, z)[0]} y={proj(x, y + 0.6, z)[1]} width="3" height="3" fill={i % 2 ? C.teal : C.tealSoft} />
      ))}
      {/* certificate */}
      {shadow(P, 2.6, 5.0, 7.2, 8.6)}
      <g className="ill-float-2">
        <IsoBox faces={P.box(2.6, 5.0, 7.2, 8.6, 1.3, 1.42)} stroke={C.teal} />
        <g transform={flatT(o, 2.6, 5.0, 1.42)} fill="none">
          <path d="M.5 .6H2.6M.5 1.05H3.4M.5 1.5H2.9M.5 2.6H3.6M.5 3.05H2.8" stroke={C.lineStrong} strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <circle cx="3.9" cy="1.5" r=".62" fill={C.card} stroke={C.teal} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <circle cx="3.9" cy="1.5" r=".36" fill={C.teal} />
        </g>
      </g>
      <g className="ill-float">
        <path d={P.seg(proj(7.7, 2.0, 3.0), [265, 66])} stroke={C.teal} strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
        <Seal cx={265} cy={46} r={19} />
        <path d="M257 46 L263 52 L274 40" fill="none" stroke={C.teal} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Stage>
  );
}
