import { C, IsoBox, makeIso } from "../kit";
import { Mark, Stage, at, pl, qF } from "./bits";

const W = 640;
const H = 430;
const P = makeIso(290, 96, 27, 16);
const { proj } = P;
const B = 2.2; // bench height

type Faces = ReturnType<typeof P.box>;
const Box = ({
  b,
  top = C.faceTop,
  right = C.faceR,
  front = C.faceL,
  stroke = C.line,
}: {
  b: Faces;
  top?: string;
  right?: string;
  front?: string;
  stroke?: string;
}) => <IsoBox faces={b} top={top} right={right} front={front} stroke={stroke} />;

const dark = { top: C.graphite, right: C.graphiteDeep, front: C.graphiteDeep, stroke: C.graphiteDeep };
const steel = { top: C.lineStrong, right: C.muted, front: "#b3b6b6", stroke: C.muted };
const accent = { top: C.accentSoft, right: C.accent, front: C.accent, stroke: C.accentDeep };
const dot = (x: number, y: number, z: number, r: number, fill: string, cls?: string) => {
  const [cx, cy] = proj(x, y, z);
  return <circle className={cls} cx={cx} cy={cy} r={r} fill={fill} />;
};

/** Isometric lab: bench with test gear + soldering, and the floor machines. */
export function LabScene() {
  const sine = Array.from({ length: 11 }, (_, i) => [1.2 + i * 0.14, 2.7, 3.15 + 0.34 * Math.sin(i * 0.95)] as [number, number, number]);
  const layers = Array.from({ length: 9 }, (_, i) => i);
  const cut = Array.from({ length: 13 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return [5.45 + 0.6 * Math.cos(a), 6.0 + 0.6 * Math.sin(a), 1.35] as [number, number, number];
  });
  return (
    <Stage
      w={W}
      h={H}
      tone="accentPale"
      label="Isometric lab: a bench with an oscilloscope, power supply, logic analyzer and SMD soldering station, and on the floor a 3D printer, a laser cutting table and a press brake."
      overlay={
        <>
          <Mark n={1} style={at(W, H, ...proj(2.0, 1.5, 4.7))} />
          <Mark n={2} style={at(W, H, ...proj(8.5, 1.6, 3.7))} />
          <Mark n={3} style={at(W, H, ...proj(3.85, 7.7, 3.9))} />
          <Mark n={3} style={at(W, H, ...proj(5.5, 6.0, 3.2))} />
          <Mark n={3} style={at(W, H, ...proj(9.0, 5.9, 4.1))} />
        </>
      }
    >
      {/* floor + back walls */}
      <Box b={P.box(0, 0, 11, 8.5, -0.5, 0)} top={C.soft} stroke={C.lineStrong} />
      <g stroke={C.line} strokeWidth="1" fill="none">
        {[2, 4, 6, 8, 10].map((i) => (
          <path key={i} d={P.seg(proj(i, 0, 0), proj(i, 8.5, 0))} />
        ))}
        {[2, 4, 6, 8].map((i) => (
          <path key={i} d={P.seg(proj(0, i, 0), proj(11, i, 0))} />
        ))}
      </g>
      <Box b={P.box(0, -0.3, 11, 0, 0, 5.0)} top={C.faceTop} right={C.faceDark} front={C.faceL} stroke={C.lineStrong} />
      <Box b={P.box(-0.3, 0, 0, 8.5, 0, 5.0)} top={C.faceTop} right={C.faceR} front={C.faceDark} stroke={C.lineStrong} />
      {/* pegboard rail + shelf kit on the back wall */}
      <path d={qF(P, 0.6, 10.4, 4.1, 4.7, 0)} fill={C.faceTop} stroke={C.line} />
      <g fill={C.lineStrong}>
        {Array.from({ length: 19 }, (_, i) => dot(0.9 + i * 0.5, 0, 4.4, 1.2, C.lineStrong, undefined)).map((d, i) => (
          <g key={i}>{d}</g>
        ))}
      </g>
      <Box b={P.box(2.4, 0, 4.2, 0.6, 3.4, 3.5)} />
      <Box b={P.box(2.7, 0.15, 3.4, 0.55, 3.5, 3.9)} {...accent} />
      <Box b={P.box(6.6, 0, 8.4, 0.6, 3.4, 3.5)} />
      <Box b={P.box(6.9, 0.15, 7.6, 0.55, 3.5, 3.8)} {...accent} />
      <Box b={P.box(7.8, 0.15, 8.2, 0.55, 3.5, 3.7)} />

      {/* bench */}
      <Box b={P.box(0.4, 0.4, 10.6, 3.0, 0, B)} />
      <g stroke={C.lineStrong} strokeWidth="1">
        {[0.4, 3.8, 7.2, 10.6].map((x) => (
          <path key={x} d={P.seg(proj(x, 3.0, 0.1), proj(x, 3.0, B - 0.1))} />
        ))}
        <path d={P.seg(proj(0.4, 3.0, 1.2), proj(10.6, 3.0, 1.2))} />
        {[2.1, 5.5, 8.9].map((x) => (
          <path key={x} d={P.seg(proj(x - 0.3, 3.0, 0.6), proj(x + 0.3, 3.0, 0.6))} stroke={C.muted} strokeWidth="2" strokeLinecap="round" />
        ))}
      </g>

      {/* 1 · oscilloscope */}
      <Box b={P.box(0.8, 0.8, 3.1, 2.7, B, 4.2)} />
      <path d={qF(P, 1.05, 2.55, B + 0.45, 3.85, 2.7)} fill={C.graphite} />
      <g stroke={C.accentSoft} strokeWidth=".6" opacity=".35">
        {[2.9, 3.3, 3.7].map((z) => (
          <path key={z} d={pl(P, [[1.05, 2.7, z], [2.55, 2.7, z]])} />
        ))}
      </g>
      <path className="ill-dash" d={pl(P, sine)} fill="none" stroke={C.accentSoft} strokeWidth="2" strokeLinejoin="round" strokeDasharray="40 4" />
      <g fill={C.card} stroke={C.lineStrong}>
        {dot(2.85, 2.7, 3.6, 3.2, C.card)}
        {dot(2.85, 2.7, 2.9, 3.2, C.card)}
        {dot(1.2, 2.7, 2.65, 2, C.accent, "ill-blink")}
      </g>
      {/* power supply */}
      <Box b={P.box(3.4, 0.9, 4.6, 2.7, B, 3.4)} />
      <path d={qF(P, 3.55, 4.45, 2.8, 3.25, 2.7)} fill={C.graphite} />
      <path d={qF(P, 3.65, 4.3, 2.9, 3.15, 2.7)} fill={C.accentSoft} opacity=".8" />
      {dot(3.7, 2.7, 2.55, 2.6, C.card)}
      {dot(4.3, 2.7, 2.55, 2.6, C.card)}
      {/* logic analyzer + probes + device under test */}
      <Box b={P.box(4.9, 1.3, 6.4, 2.6, B, 2.8)} />
      <g>
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i}>{dot(5.05 + i * 0.22, 2.6, 2.55, 1.5, C.accent, i % 3 === 1 ? "ill-blink" : undefined)}</g>
        ))}
      </g>
      <Box b={P.box(6.9, 1.0, 8.0, 2.4, B, B + 0.14)} top={C.accentPale} stroke={C.accent} />
      <Box b={P.box(7.15, 1.3, 7.65, 1.8, B + 0.14, B + 0.4)} {...dark} />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={pl(P, [[6.4, 1.5, 2.6], [6.65, 1.15, 3.1], [7.15, 1.5, 2.5]])} stroke={C.accent} strokeWidth="1.6" />
        <path className="ill-dash" d={pl(P, [[6.4, 2.0, 2.6], [6.7, 2.5, 3.2], [7.4, 2.1, 2.5]])} stroke={C.accent} strokeWidth="1.6" strokeDasharray="5 4" />
      </g>

      {/* 2 · SMD soldering station, iron stand + hot-air tower */}
      <Box b={P.box(8.3, 1.0, 9.5, 2.5, B, 3.0)} />
      <path d={qF(P, 8.4, 9.4, B + 0.28, B + 0.62, 2.5)} fill={C.graphite} />
      <path d={qF(P, 8.5, 9.0, B + 0.36, B + 0.54, 2.5)} fill={C.accentSoft} opacity=".85" />
      {dot(9.2, 2.5, B + 0.45, 2.4, C.card)}
      <Box b={P.box(9.8, 1.2, 10.3, 1.8, B, 2.9)} />
      <path d={pl(P, [[10.05, 1.5, 2.9], [10.1, 2.3, 3.6]])} stroke={C.ink2} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      {dot(10.1, 2.3, 3.65, 2.8, C.accent, "ill-pulse")}
      <Box b={P.box(8.4, 0.5, 8.9, 1.0, B, 4.0)} right={C.faceDark} />
      <g className="ill-pulse" fill="none" stroke={C.accent} strokeWidth="1.3" strokeLinecap="round">
        <path d={pl(P, [[8.5, 0.75, 4.2], [8.5, 0.75, 4.7]])} />
        <path d={pl(P, [[8.75, 0.75, 4.2], [8.75, 0.75, 4.8]])} />
      </g>

      {/* 3 · 3D printer: frame, bed, layered part, gantry, spool */}
      <Box b={P.box(1.0, 4.9, 3.9, 7.7, 0, 0.6)} />
      <Box b={P.box(1.6, 5.5, 3.3, 7.1, 0.6, 0.72)} top={C.faceDark} right={C.faceDark} front={C.faceDark} />
      <Box b={P.box(1.05, 4.95, 1.3, 5.2, 0.6, 3.7)} {...steel} />
      <Box b={P.box(3.6, 4.95, 3.85, 5.2, 0.6, 3.7)} {...steel} />
      <Box b={P.box(1.05, 4.95, 3.85, 5.2, 3.45, 3.7)} {...steel} />
      <Box b={P.box(1.05, 4.95, 1.3, 7.65, 3.45, 3.7)} {...steel} />
      <g>
        {layers.map((i) => (
          <Box key={i} b={P.box(2.0 + i * 0.012, 5.9, 2.9 - i * 0.012, 6.7, 0.72 + i * 0.13, 0.85 + i * 0.13)} top={i === 8 ? C.accent : C.faceTop} right={C.accentSoft} front={C.accentPale} stroke={C.accent} />
        ))}
      </g>
      <Box b={P.box(1.3, 5.9, 3.6, 6.15, 2.7, 2.95)} {...steel} />
      <Box b={P.box(2.15, 5.8, 2.75, 6.3, 1.9, 2.7)} {...accent} />
      <path className="ill-dash" d={pl(P, [[2.45, 6.05, 1.9], [2.45, 6.2, 1.1]])} stroke={C.accent} strokeWidth="1.8" strokeDasharray="3 3" fill="none" />
      <g className="ill-float-2">
        <ellipse cx={proj(1.8, 5.6, 4.2)[0]} cy={proj(1.8, 5.6, 4.2)[1]} rx="17" ry="8.5" fill={C.accentPale} stroke={C.accent} strokeWidth="1.4" />
        <ellipse cx={proj(1.8, 5.6, 4.2)[0]} cy={proj(1.8, 5.6, 4.2)[1]} rx="5.5" ry="2.8" fill={C.card} stroke={C.accent} strokeWidth="1" />
      </g>
      <Box b={P.box(1.05, 7.45, 1.3, 7.7, 0.6, 3.7)} {...steel} />
      <Box b={P.box(3.6, 7.45, 3.85, 7.7, 0.6, 3.7)} {...steel} />
      <Box b={P.box(1.05, 7.45, 3.85, 7.7, 3.45, 3.7)} {...steel} />
      <Box b={P.box(3.6, 4.95, 3.85, 7.65, 3.45, 3.7)} {...steel} />

      {/* 3 · laser cutting table */}
      <Box b={P.box(4.5, 4.9, 6.7, 7.4, 0, 1.2)} />
      <Box b={P.box(4.65, 5.05, 6.55, 7.25, 1.2, 1.3)} top={C.faceTop} right={C.faceDark} front={C.faceDark} />
      <path className="ill-dash" d={pl(P, cut)} fill="none" stroke={C.accent} strokeWidth="2" strokeDasharray="5 3" strokeLinejoin="round" />
      <Box b={P.box(5.3, 4.7, 5.7, 5.0, 1.2, 2.5)} {...steel} />
      <Box b={P.box(5.3, 7.3, 5.7, 7.6, 1.2, 2.5)} {...steel} />
      <Box b={P.box(5.35, 4.7, 5.65, 7.6, 2.5, 2.8)} {...steel} />
      <Box b={P.box(5.2, 5.85, 5.8, 6.35, 1.8, 2.5)} {...dark} />
      <path className="ill-blink" d={pl(P, [[5.5, 6.1, 1.8], [5.5, 6.1, 1.4]])} stroke={C.accentSoft} strokeWidth="2.4" strokeLinecap="round" />
      {[[5.9, 6.0], [5.5, 6.5], [5.7, 6.2]].map(([x, y], i) => (
        <rect key={i} className={i % 2 ? "ill-pulse" : "ill-blink"} x={proj(x, y, 1.4)[0] + 3} y={proj(x, y, 1.4)[1] - 4} width="2.8" height="2.8" fill={C.accentSoft} />
      ))}

      {/* 3 · 320-ton press brake */}
      <Box b={P.box(7.3, 4.7, 7.8, 7.5, 0, 1.0)} {...steel} />
      <Box b={P.box(7.3, 6.9, 7.8, 7.5, 1.0, 3.6)} {...steel} />
      <Box b={P.box(7.3, 4.7, 7.8, 7.5, 3.0, 3.6)} {...steel} />
      <Box b={P.box(7.8, 5.0, 10.1, 6.6, 0.9, 1.4)} />
      <Box b={P.box(7.9, 5.55, 10.0, 6.05, 1.4, 1.7)} top={C.faceDark} right={C.faceDark} front={C.faceDark} />
      <path d={P.poly([proj(8.0, 4.7, 1.7), proj(9.9, 4.7, 1.7), proj(9.9, 5.8, 1.7), proj(8.0, 5.8, 1.7)])} fill={C.card} stroke={C.accent} strokeWidth="1.2" />
      <path d={P.poly([proj(8.0, 5.8, 1.7), proj(9.9, 5.8, 1.7), proj(9.9, 6.3, 2.2), proj(8.0, 6.3, 2.2)])} fill={C.accentPale} stroke={C.accent} strokeWidth="1.2" />
      <Box b={P.box(7.8, 5.1, 10.1, 6.5, 2.5, 3.3)} />
      <Box b={P.box(7.9, 5.55, 10.0, 5.95, 1.95, 2.5)} {...dark} />
      <Box b={P.box(10.1, 4.7, 10.6, 7.5, 0, 1.0)} {...steel} />
      <Box b={P.box(10.1, 6.9, 10.6, 7.5, 1.0, 3.6)} {...steel} />
      <Box b={P.box(10.1, 4.7, 10.6, 7.5, 3.0, 3.6)} {...steel} />
      <path d={qF(P, 10.2, 10.5, 1.7, 2.7, 7.5)} fill={C.graphite} />
      {dot(10.35, 7.5, 2.5, 1.6, C.accentSoft, "ill-blink")}
      {dot(10.35, 7.5, 2.1, 1.6, C.accent)}

      {/* floor safety stripe */}
      <path d={pl(P, [[0.4, 3.9, 0], [10.6, 3.9, 0]])} stroke={C.accent} strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="8 6" fill="none" />
    </Stage>
  );
}
