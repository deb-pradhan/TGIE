import { C, IsoBox, SceneFrame } from "../kit";
import { Cyl, Ground, WallCard, makeScene } from "./shared";

/**
 * Pillar A. A four-layer PCB on an iso bench: traces, vias, silkscreen, MCU,
 * crystal, USB connector, an oscilloscope probe feeding a scope card, a
 * firmware code card, and the enclosure shell exploding above the board.
 * Motion: signal dashes along the traces + cable, blinking LED, lid float,
 * scope cursor, code cursor.
 */
const sc = makeScene(325, 196, 27, 17);
const { proj, box, seg, path, topM, ell } = sc;

const ZT = 1.95; // top copper
const TRACES: [number, number][][] = [
  [[5.0, 3.0], [5.5, 3.0], [5.5, 2.5], [5.9, 2.5]],
  [[5.0, 3.8], [6.6, 3.8], [6.6, 5.3]],
  [[3.8, 4.4], [3.8, 4.9], [3.1, 4.9], [3.1, 5.4]],
  [[4.6, 4.4], [4.6, 5.1], [3.9, 5.1], [3.9, 5.4]],
  [[3.8, 2.8], [3.8, 2.2], [2.4, 2.2]],
  [[4.6, 2.8], [4.6, 2.0], [5.4, 2.0], [5.8, 1.6]],
  [[3.4, 3.4], [2.7, 3.4], [2.7, 3.9]],
  [[6.6, 3.8], [7.05, 3.8], [7.05, 3.5]],
];
const VIAS: [number, number][] = [[2.4, 2.2], [5.8, 1.6], [2.7, 3.9], [6.6, 4.6], [4.2, 5.7]];
const HOLES: [number, number][] = [[1.9, 1.9], [7.1, 1.9], [7.1, 5.6], [1.9, 5.6]];

// pins around the MCU (unit space, board plane)
const pins: string[] = [];
for (let i = 0; i < 4; i++) {
  const t = 3.65 + i * 0.4 + 0.0;
  pins.push(`M${t} 2.6V2.8M${t} 4.4V4.6`); // top / bottom
  const u = 2.95 + i * 0.4;
  pins.push(`M3.2 ${u}H3.4M5.0 ${u}H5.2`); // left / right
}

// oscilloscope waveform (screen-card local coords)
const wave = Array.from({ length: 31 }, (_, i) => {
  const x = 10 + i * 4;
  const y = 42 + Math.sin(i * 0.62) * 15 * (i % 9 < 5 ? 1 : 0.55);
  return `${i ? "L" : "M"}${x} ${y.toFixed(1)}`;
}).join(" ");

const probeTip = proj(6.0, 3.8, ZT);
const probeEnd: [number, number] = [probeTip[0] + 40, probeTip[1] - 62];

export function EngineeringScene() {
  return (
    <SceneFrame viewBox="0 0 640 480" tone="cell">
      <Ground sc={sc} w={10} d={8} />

      {/* SMD reel on the bench */}
      <g>
        <Cyl sc={sc} x={9.0} y={6.3} z0={0} z1={0.5} r={0.95} top={C.card} side={C.faceR} />
        <ellipse {...ell(9.0, 6.3, 0.5, 0.42)} fill={C.faceL} stroke={C.line} />
        <ellipse {...ell(9.0, 6.3, 0.5, 0.16)} fill={C.cell} stroke={C.line} />
      </g>

      {/* coin cell + loose ICs on the bench */}
      <Cyl sc={sc} x={1.0} y={7.0} z0={0} z1={0.35} r={0.6} top={C.card} side={C.faceDark} />
      <ellipse {...ell(1.0, 7.0, 0.35, 0.34)} fill="none" stroke={C.lineStrong} />
      {[0, 1, 2].map((i) => (
        <IsoBox key={`ic${i}`} faces={box(8.5, 1.2 + i * 0.95, 9.4, 1.9 + i * 0.95, 0, 0.22)} top={C.graphite} right={C.graphiteDeep} front="#111312" stroke={C.graphiteDeep} strokeWidth={0.6} />
      ))}

      {/* standoffs + footprint shadow */}
      <path d={path([[1.9, 1.9], [7.9, 1.9], [7.9, 6.4], [1.9, 6.4]], 0, true)} fill={C.ink} opacity={0.06} />
      {HOLES.map(([x, y]) => (
        <Cyl key={`${x}${y}`} sc={sc} x={x} y={y} z0={0} z1={0.4} r={0.2} top={C.card} side={C.faceDark} sw={0.8} />
      ))}

      {/* layer 1 + 2 (inner copper) */}
      <IsoBox faces={box(1.5, 1.5, 7.5, 6.0, 0.35, 0.5)} top={C.faceR} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <path d={path([[2.2, 2.4], [6.8, 2.4], [6.8, 5.2]], 0.5)} stroke={C.accentSoft} strokeWidth={1} fill="none" opacity={0.7} />
      <path d={path([[2.2, 4.6], [5.0, 4.6]], 0.5)} stroke={C.accentSoft} strokeWidth={1} fill="none" opacity={0.7} />
      <IsoBox faces={box(1.5, 1.5, 7.5, 6.0, 1.05, 1.2)} top={C.faceTop} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <path d={path([[2.0, 2.8], [2.6, 2.8], [3.2, 3.4], [3.2, 5.0]], 1.2)} stroke={C.accent} strokeWidth={1} fill="none" opacity={0.55} />
      <path d={path([[7.0, 2.0], [7.0, 3.4], [6.4, 4.0]], 1.2)} stroke={C.accent} strokeWidth={1} fill="none" opacity={0.55} />
      {/* via stitching between layers */}
      {[[1.9, 1.9], [7.1, 1.9], [7.1, 5.6], [1.9, 5.6]].map(([x, y]) => (
        <path key={`s${x}${y}`} d={seg(proj(x, y, 0.5), proj(x, y, ZT))} stroke={C.accentDeep} strokeWidth={1} strokeDasharray="2 3" opacity={0.7} />
      ))}

      {/* top board */}
      <IsoBox faces={box(1.5, 1.5, 7.5, 6.0, 1.75, ZT)} top={C.accentPale} right={C.faceDark} front={C.faceR} stroke={C.accentDeep} strokeWidth={1.2} />

      {/* top copper: unit-space plane */}
      <g transform={topM(ZT)}>
        <path d="M1.7 1.7H7.3V5.8H1.7Z" fill="none" stroke={C.accentSoft} strokeWidth={0.05} />
        {TRACES.map((t, i) => (
          <path key={i} d={"M" + t.map((p) => p.join(" ")).join(" L")} fill="none" stroke={C.accentDeep} strokeWidth={0.1} strokeLinejoin="round" strokeLinecap="round" opacity={0.55} />
        ))}
        {HOLES.map(([x, y]) => (
          <circle key={`h${x}${y}`} cx={x} cy={y} r={0.2} fill={C.card} stroke={C.accentDeep} strokeWidth={0.07} />
        ))}
        {VIAS.map(([x, y]) => (
          <g key={`v${x}${y}`}>
            <circle cx={x} cy={y} r={0.15} fill={C.card} stroke={C.accent} strokeWidth={0.07} />
            <circle cx={x} cy={y} r={0.05} fill={C.accentDeep} />
          </g>
        ))}
        <path d={pins.join("")} stroke={C.lineStrong} strokeWidth={0.1} />
        {/* silkscreen */}
        <g className="hidden sm:inline" fill={C.ink2} opacity={0.65} fontFamily="ui-monospace, Menlo, monospace" fontSize={0.36}>
          <text x={3.4} y={2.5}>U1</text>
          <text x={5.95} y={2.0}>Y1</text>
          <text x={2.85} y={4.8}>J1</text>
          <text x={6.75} y={4.3}>D1</text>
          <text x={1.75} y={5.55} fontSize={0.3}>TGIE-A · REV 2</text>
        </g>
        <rect x={2.1} y={3.5} width={0.5} height={0.26} fill={C.card} stroke={C.lineStrong} strokeWidth={0.04} />
        <rect x={2.1} y={4.05} width={0.5} height={0.26} fill={C.card} stroke={C.lineStrong} strokeWidth={0.04} />
        <rect x={5.2} y={4.95} width={0.4} height={0.22} fill={C.ink2} opacity={0.8} />
      </g>

      {/* animated signal flow along the traces */}
      {TRACES.slice(0, 6).map((t, i) => (
        <path key={`a${i}`} d={path(t, ZT)} className="ill-dash" stroke={C.accent} strokeWidth={1.6} strokeDasharray="4 6" fill="none" strokeLinecap="round" />
      ))}

      {/* MCU */}
      <IsoBox faces={box(3.4, 2.8, 5.0, 4.4, ZT, ZT + 0.35)} top={C.graphite} right={C.graphiteDeep} front="#111312" stroke={C.graphiteDeep} />
      <g transform={topM(ZT + 0.35)}>
        <circle cx={3.62} cy={3.02} r={0.1} fill={C.accentSoft} />
        <text className="hidden sm:inline" x={3.85} y={3.78} fontSize={0.42} fill={C.accentSoft} fontFamily="ui-monospace, Menlo, monospace">MCU</text>
      </g>
      {/* crystal */}
      <IsoBox faces={box(5.9, 2.25, 6.7, 2.75, ZT, ZT + 0.3)} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      {/* header pins */}
      {[0, 1, 2, 3, 4].map((i) => (
        <IsoBox key={i} faces={box(5.6 + i * 0.4, 5.3, 5.85 + i * 0.4, 5.55, ZT, ZT + 0.45)} top={C.ink2} right={C.ink} front={C.ink2} stroke={C.ink} strokeWidth={0.6} />
      ))}
      {/* LED */}
      <IsoBox faces={box(6.88, 3.2, 7.22, 3.54, ZT, ZT + 0.22)} top={C.accentSoft} right={C.accent} front={C.accentSoft} stroke={C.accent} />
      <g transform={topM(ZT + 0.22)} className="ill-blink">
        <circle cx={7.05} cy={3.37} r={0.62} fill={C.accent} opacity={0.22} />
        <circle cx={7.05} cy={3.37} r={0.2} fill={C.accentSoft} />
      </g>
      {/* USB-C */}
      <IsoBox faces={box(2.7, 5.3, 4.3, 6.25, ZT, ZT + 0.55)} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <path d={sc.poly([proj(3.05, 6.25, ZT + 0.14), proj(3.95, 6.25, ZT + 0.14), proj(3.95, 6.25, ZT + 0.4), proj(3.05, 6.25, ZT + 0.4)])} fill={C.ink2} />

      {/* probe on the signal pad */}
      <g>
        <path d={`M${probeTip[0]} ${probeTip[1]} L${probeTip[0] + 8} ${probeTip[1] - 14}`} stroke={C.accentDeep} strokeWidth={1.6} strokeLinecap="round" />
        <path d={`M${probeTip[0] + 8} ${probeTip[1] - 14} L${probeEnd[0]} ${probeEnd[1]}`} stroke={C.ink2} strokeWidth={9} strokeLinecap="round" />
        <path d={`M${probeTip[0] + 11} ${probeTip[1] - 19} L${probeEnd[0] - 6} ${probeEnd[1] + 9}`} stroke={C.card} strokeWidth={5} strokeLinecap="round" />
        <path d={`M${probeEnd[0]} ${probeEnd[1]} C${probeEnd[0] + 40} ${probeEnd[1] - 30} ${probeEnd[0] + 10} ${probeEnd[1] - 80} ${probeEnd[0] + 80} ${probeEnd[1] - 70}`} stroke={C.ink2} strokeWidth={2} fill="none" strokeLinecap="round" />
        <path d={`M${probeEnd[0]} ${probeEnd[1]} C${probeEnd[0] + 40} ${probeEnd[1] - 30} ${probeEnd[0] + 10} ${probeEnd[1] - 80} ${probeEnd[0] + 80} ${probeEnd[1] - 70}`} className="ill-dash" stroke={C.accentSoft} strokeWidth={1.6} strokeDasharray="4 6" fill="none" />
      </g>

      {/* exploded enclosure shell (ghost CAD lid) */}
      {[[1.5, 6.0], [7.5, 6.0], [7.5, 1.5]].map(([x, y]) => (
        <path key={`g${x}${y}`} d={seg(proj(x, y, ZT + 0.5), proj(x, y, 7.6))} className="ill-dash" stroke={C.accent} strokeWidth={1.2} strokeDasharray="4 6" />
      ))}
      <g className="ill-float">
        <path d={box(1.2, 0.9, 7.9, 6.6, 7.6, 8.9).right} fill={C.card} fillOpacity={0.5} stroke={C.accent} strokeWidth={1.2} strokeLinejoin="round" />
        <path d={box(1.2, 0.9, 7.9, 6.6, 7.6, 8.9).front} fill={C.card} fillOpacity={0.62} stroke={C.accent} strokeWidth={1.2} strokeLinejoin="round" />
        <path d={box(1.2, 0.9, 7.9, 6.6, 7.6, 8.9).top} fill={C.card} fillOpacity={0.78} stroke={C.accent} strokeWidth={1.4} strokeLinejoin="round" />
        <g transform={topM(8.9)}>
          {[2.4, 2.9, 3.4, 3.9, 4.4, 4.9].map((y) => (
            <rect key={y} x={2.6} y={y} width={3.8} height={0.2} rx={0.1} fill={C.accentPale} stroke={C.accentSoft} strokeWidth={0.04} />
          ))}
          {[[1.6, 1.3], [7.5, 1.3], [7.5, 6.2], [1.6, 6.2]].map(([x, y]) => (
            <circle key={`b${x}${y}`} cx={x} cy={y} r={0.16} fill={C.faceR} stroke={C.accentSoft} strokeWidth={0.05} />
          ))}
        </g>
        {/* USB cut-out + vents on the shell */}
        <path d={sc.poly([proj(3.0, 6.6, 7.85), proj(4.3, 6.6, 7.85), proj(4.3, 6.6, 8.4), proj(3.0, 6.6, 8.4)])} fill={C.faceDark} stroke={C.accent} strokeWidth={1} />
        {[2.0, 2.6, 3.2, 3.8, 4.4, 5.0].map((y) => (
          <path key={y} d={seg(proj(7.9, y, 7.9), proj(7.9, y, 8.7))} stroke={C.accentSoft} strokeWidth={1.6} strokeLinecap="round" />
        ))}
      </g>

      {/* firmware code card (back-left wall) */}
      <g>
        <WallCard x={22} y={150} w={176} h={118} slope={-0.5} className="ill-float-2">
          <circle cx={14} cy={14} r={3.5} fill={C.accentSoft} />
          <circle cx={26} cy={14} r={3.5} fill={C.lineStrong} />
          <circle cx={38} cy={14} r={3.5} fill={C.line} />
          <text className="hidden sm:inline" x={150} y={18} fontSize={13} fill={C.muted} textAnchor="end" fontFamily="ui-monospace, Menlo, monospace">main.c</text>
          {[
            [14, 34, 56, C.accentDeep], [76, 34, 38, C.ink2], [14, 48, 28, C.accent], [48, 48, 70, C.muted],
            [26, 62, 46, C.ink2], [78, 62, 40, C.accentDeep], [26, 76, 82, C.muted], [14, 90, 34, C.accent],
          ].map(([x, y, w, f], i) => (
            <rect key={i} x={x as number} y={y as number} width={w as number} height={5} rx={2.5} fill={f as string} opacity={0.85} />
          ))}
          <rect x={10} y={72} width={154} height={13} rx={3} fill={C.accentPale} opacity={0.0} />
          <rect x={14} y={104} width={6} height={8} fill={C.accent} className="ill-blink" />
        </WallCard>
        <path d={`M112 218 C170 262 250 285 318 266`} className="ill-dash" stroke={C.accent} strokeWidth={1.4} strokeDasharray="4 6" fill="none" />
      </g>

      {/* oscilloscope card (back-right wall) */}
      <WallCard x={474} y={34} w={150} h={112} slope={0.5} className="ill-float">
        <rect x={8} y={8} width={134} height={72} rx={4} fill={C.graphiteDeep} />
        <path d="M8 26H142M8 44H142M8 62H142M42 8V80M76 8V80M110 8V80" stroke={C.accentDeep} strokeWidth={0.8} opacity={0.6} />
        <path d={wave} stroke={C.accentSoft} strokeWidth={1.8} fill="none" strokeLinejoin="round" />
        <rect x={72} y={8} width={1.5} height={72} fill={C.accentSoft} opacity={0.7} className="ill-scan" />
        <text className="hidden sm:inline" x={13} y={21} fontSize={13} fill={C.accentSoft} fontFamily="ui-monospace, Menlo, monospace">CH1 3.3V</text>
        {[24, 48, 72].map((x) => (
          <circle key={x} cx={x + 14} cy={96} r={6} fill={C.faceL} stroke={C.lineStrong} />
        ))}
        <rect x={104} y={92} width={30} height={8} rx={4} fill={C.accentPale} stroke={C.line} />
      </WallCard>
    </SceneFrame>
  );
}
