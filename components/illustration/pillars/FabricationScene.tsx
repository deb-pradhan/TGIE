import type { CSSProperties } from "react";
import { C, IsoBox, SceneFrame } from "../kit";
import { Cyl, Dots, Ground, WallCard, makeScene, spray } from "./shared";

/**
 * Pillar D. Heavy structural fabrication: a transformer tank on a steel skid
 * under an overhead crane hook, a press brake, a laser table cutting nested
 * parts, a T-joint with a live weld seam throwing dither sparks, an ISO 9001
 * stamp and a mill-cert sheet. Motion: torch + laser head sliding, sparks
 * blinking, crane hook float, cut-path dash.
 */
const sc = makeScene(268, 178, 26, 17);
const { proj, box, seg, path, poly, topM } = sc;

const slide = (dx: number, dy: number) => ({ "--dx": `${dx}px`, "--dy": `${dy}px` }) as CSSProperties;
const TANK = { x0: 2.0, y0: 1.4, x1: 7.5, y1: 4.5, z0: 0.4, z1: 3.6 };

// tank stiffener ribs
const ribsFront: string[] = [];
for (let x = 2.5; x < TANK.x1 - 0.1; x += 0.5) ribsFront.push(seg(proj(x, TANK.y1, 0.75), proj(x, TANK.y1, 3.25)));
const ribsRight: string[] = [];
for (let y = 1.9; y < TANK.y1 - 0.1; y += 0.5) ribsRight.push(seg(proj(TANK.x1, y, 0.75), proj(TANK.x1, y, 3.25)));

// weld seam
const SEAM_Y = 6.45;
const tip = proj(6.5, SEAM_Y, 0.3);
const ltip = proj(9.9, 2.2, 1.0);

// laser-cut nest (unit space on the sheet)
const nest = (
  <g fill="none" stroke={C.accentDeep} strokeWidth={0.06}>
    <circle cx={9.3} cy={1.8} r={0.4} />
    <rect x={9.8} y={1.5} width={0.9} height={0.6} rx={0.06} />
    <path d="M8.8 2.6h0.9v0.35h-0.5v0.5h-0.4z" />
    <circle cx={10.4} cy={3.0} r={0.35} />
  </g>
);

export function FabricationScene() {
  return (
    <SceneFrame viewBox="0 0 640 480" tone="cell">
      <Ground sc={sc} w={12} d={8} />

      {/* crane: far post, then tank, then the rest */}
      <path d={seg(proj(4.75, 0.6, 0), proj(4.75, 0.6, 7.2))} stroke={C.ink2} strokeWidth={5} strokeLinecap="round" />

      {/* ---------- steel skid + transformer tank ---------- */}
      <IsoBox faces={box(1.6, 1.2, 8.0, 1.7, 0, 0.4)} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <IsoBox faces={box(1.6, 4.2, 8.0, 4.7, 0, 0.4)} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      {[1.9, 3.5, 5.1, 6.7, 7.7].map((x) => (
        <IsoBox key={x} faces={box(x, 1.7, x + 0.3, 4.2, 0, 0.3)} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} strokeWidth={0.8} />
      ))}
      <IsoBox faces={box(TANK.x0, TANK.y0, TANK.x1, TANK.y1, TANK.z0, TANK.z1)} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <path d={poly([proj(TANK.x0, TANK.y1, 0.55), proj(TANK.x1, TANK.y1, 0.55), proj(TANK.x1, TANK.y1, 0.8), proj(TANK.x0, TANK.y1, 0.8)])} fill={C.accentSoft} opacity={0.7} />
      <path d={poly([proj(TANK.x1, TANK.y0, 0.55), proj(TANK.x1, TANK.y1, 0.55), proj(TANK.x1, TANK.y1, 0.8), proj(TANK.x1, TANK.y0, 0.8)])} fill={C.accent} opacity={0.55} />
      <path d={ribsFront.join("")} stroke={C.faceDark} strokeWidth={3} strokeLinecap="round" />
      <path d={ribsFront.join("")} stroke={C.card} strokeWidth={1} strokeLinecap="round" transform="translate(1.5 0)" opacity={0.8} />
      <path d={ribsRight.join("")} stroke={C.faceR} strokeWidth={3} strokeLinecap="round" />
      <path d={ribsRight.join("")} stroke={C.card} strokeWidth={1} strokeLinecap="round" transform="translate(1.5 0)" opacity={0.6} />
      <IsoBox faces={box(1.9, 1.3, 7.6, 4.6, 3.6, 3.8)} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.accent} strokeWidth={1.3} />
      <path d={poly([proj(3.0, TANK.y1, 1.2), proj(4.3, TANK.y1, 1.2), proj(4.3, TANK.y1, 2.1), proj(3.0, TANK.y1, 2.1)])} fill={C.card} stroke={C.line} />
      <path d={`${seg(proj(3.2, TANK.y1, 1.75), proj(4.1, TANK.y1, 1.75))}${seg(proj(3.2, TANK.y1, 1.5), proj(3.8, TANK.y1, 1.5))}`} stroke={C.accentDeep} strokeWidth={1.4} />
      {/* bushings */}
      {[3.2, 4.75, 6.3].map((x) => (
        <g key={x}>
          <Cyl sc={sc} x={x} y={2.95} z0={3.8} z1={4.15} r={0.4} top={C.card} side={C.faceR} />
          <Cyl sc={sc} x={x} y={2.95} z0={4.15} z1={5.2} r={0.22} top={C.card} side={C.faceL} />
          {[4.45, 4.75, 5.05].map((z) => (
            <ellipse key={z} cx={proj(x, 2.95, z)[0]} cy={proj(x, 2.95, z)[1]} rx={13} ry={6.5} fill={C.card} stroke={C.line} />
          ))}
          <Cyl sc={sc} x={x} y={2.95} z0={5.2} z1={5.4} r={0.28} top={C.accentSoft} side={C.accent} stroke={C.accent} />
        </g>
      ))}

      {/* ---------- crane bridge, trolley, cable + hook ---------- */}
      <path d={seg(proj(4.75, 0.6, 7.2), proj(4.75, 5.0, 7.2))} stroke={C.ink2} strokeWidth={6} strokeLinecap="round" />
      <path d={seg(proj(4.75, 0.6, 7.2), proj(4.75, 5.0, 7.2))} stroke={C.accentSoft} strokeWidth={1.4} strokeDasharray="10 10" />
      <path d={seg(proj(4.75, 5.0, 0), proj(4.75, 5.0, 7.2))} stroke={C.ink2} strokeWidth={5} strokeLinecap="round" />
      <g className="ill-float">
        <path d={seg(proj(4.75, 2.95, 7.2), proj(4.75, 2.95, 6.1))} stroke={C.ink2} strokeWidth={1.8} />
        <IsoBox faces={box(4.45, 2.65, 5.05, 3.25, 6.9, 7.5)} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.ink2} strokeWidth={1} />
        <rect x={proj(4.75, 2.95, 6.1)[0] - 5} y={proj(4.75, 2.95, 6.1)[1] - 2} width={10} height={9} rx={2} fill={C.ink2} />
        <path d={`M${proj(4.75, 2.95, 6.1)[0]} ${proj(4.75, 2.95, 6.1)[1] + 7} v7 a7 7 0 1 1 -7 7`} stroke={C.ink2} strokeWidth={3} fill="none" strokeLinecap="round" />
        {[[2.3, 1.5], [7.2, 1.5], [2.3, 4.3], [7.2, 4.3]].map(([x, y]) => (
          <path key={`${x}${y}`} d={seg(proj(4.75, 2.95, 5.55), proj(x, y, 3.85))} stroke={C.accentDeep} strokeWidth={1} />
        ))}
      </g>

      {/* ---------- press brake (front-left) ---------- */}
      <IsoBox faces={box(0.5, 5.3, 1.0, 6.9, 0, 3.8)} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <IsoBox faces={box(1.0, 5.5, 3.2, 6.7, 0, 1.3)} top={C.faceR} right={C.faceDark} front={C.faceL} stroke={C.lineStrong} />
      <path d={path([[1.1, 6.1], [3.1, 6.1]], 1.3)} stroke={C.ink2} strokeWidth={2} />
      <IsoBox faces={box(1.0, 5.7, 3.2, 6.5, 1.3, 1.42)} top={C.card} right={C.faceR} front={C.faceL} stroke={C.accent} strokeWidth={1.2} />
      <g className="ill-slide" style={slide(0, 6)}>
        <IsoBox faces={box(1.0, 5.6, 3.2, 6.6, 2.7, 3.5)} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
        <IsoBox faces={box(1.0, 6.0, 3.2, 6.2, 2.25, 2.7)} top={C.accentDeep} right={C.graphiteDeep} front={C.accentDeep} stroke={C.accentDeep} />
      </g>
      <IsoBox faces={box(3.2, 5.3, 3.7, 6.9, 0, 3.8)} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <path d={poly([proj(3.2, 6.9, 2.2), proj(3.7, 6.9, 2.2), proj(3.7, 6.9, 3.2), proj(3.2, 6.9, 3.2)])} fill={C.graphiteDeep} />
      <path d={`M${proj(3.28, 6.9, 2.55)[0]} ${proj(3.28, 6.9, 2.55)[1]} l5 -4 l5 3 l5 -4`} stroke={C.accentSoft} strokeWidth={1.2} fill="none" />

      {/* ---------- laser table (back-right) ---------- */}
      <IsoBox faces={box(8.4, 0.9, 11.4, 3.7, 0, 0.9)} top={C.faceR} right={C.faceDark} front={C.faceL} stroke={C.lineStrong} />
      <IsoBox faces={box(8.6, 1.1, 11.2, 3.5, 0.9, 1.0)} top={C.card} right={C.faceR} front={C.faceL} stroke={C.line} />
      <g transform={topM(1.0)}>{nest}</g>
      <path d={path([[9.8, 1.5], [10.7, 1.5], [10.7, 2.1], [9.8, 2.1], [9.8, 1.5]], 1.02)} className="ill-dash" stroke={C.accent} strokeWidth={1.6} strokeDasharray="4 6" fill="none" />
      <path d={seg(proj(9.9, 0.8, 0.9), proj(9.9, 0.8, 2.7))} stroke={C.ink2} strokeWidth={3} strokeLinecap="round" />
      <path d={seg(proj(9.9, 3.8, 0.9), proj(9.9, 3.8, 2.7))} stroke={C.ink2} strokeWidth={3} strokeLinecap="round" />
      <path d={seg(proj(9.9, 0.8, 2.7), proj(9.9, 3.8, 2.7))} stroke={C.ink2} strokeWidth={4} strokeLinecap="round" />
      <g className="ill-slide" style={slide(-30, 15)}>
        <IsoBox faces={box(9.7, 2.0, 10.1, 2.4, 2.0, 2.9)} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.ink2} strokeWidth={1} />
        <path d={seg(proj(9.9, 2.2, 2.0), ltip)} stroke={C.accentSoft} strokeWidth={2} />
        <circle cx={ltip[0]} cy={ltip[1]} r={6} fill={C.accent} opacity={0.3} className="ill-pulse" />
        <Dots at={[ltip[0], ltip[1]]} pts={spray(7, -1.4, 2.4, 14, 3)} fill={C.accentSoft} className="ill-blink" />
      </g>

      {/* ---------- T-joint with live weld seam ---------- */}
      <IsoBox faces={box(5.4, 5.3, 9.4, 7.5, 0, 0.25)} top={C.faceR} right={C.faceDark} front={C.faceL} stroke={C.lineStrong} />
      <IsoBox faces={box(5.6, 6.2, 9.2, 6.45, 0.25, 1.8)} top={C.card} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <path d={seg(proj(5.7, SEAM_Y + 0.02, 0.3), proj(8.9, SEAM_Y + 0.02, 0.3))} stroke={C.accentDeep} strokeWidth={3.2} strokeLinecap="round" />
      <path d={seg(proj(5.7, SEAM_Y + 0.02, 0.3), proj(6.5, SEAM_Y + 0.02, 0.3))} stroke={C.accentSoft} strokeWidth={1.4} strokeLinecap="round" />
      <path d={seg(proj(5.7, SEAM_Y + 0.02, 0.3), proj(8.9, SEAM_Y + 0.02, 0.3))} stroke={C.accentSoft} strokeWidth={1.2} strokeDasharray="2 4" opacity={0.9} />
      <g className="ill-slide" style={slide(54, 27)}>
        <path d={`M${tip[0]} ${tip[1]} L${tip[0] - 26} ${tip[1] - 38}`} stroke={C.ink2} strokeWidth={7} strokeLinecap="round" />
        <path d={`M${tip[0] - 4} ${tip[1] - 6} L${tip[0] - 19} ${tip[1] - 28}`} stroke={C.card} strokeWidth={2.6} strokeLinecap="round" opacity={0.7} />
        <circle cx={tip[0]} cy={tip[1]} r={11} fill={C.accent} opacity={0.35} className="ill-pulse" />
        <circle cx={tip[0]} cy={tip[1]} r={4} fill={C.card} />
        <Dots at={[tip[0] + 2, tip[1] - 2]} pts={spray(16, -0.9, 2.6, 30, 1)} fill={C.accentDeep} className="ill-blink" />
        <Dots at={[tip[0] + 2, tip[1] - 2]} pts={spray(12, -2.3, 2.4, 24, 5)} fill={C.accentSoft} className="ill-pulse" />
        <Dots at={[tip[0] + 2, tip[1] - 2]} pts={spray(8, -1.5, 2.0, 40, 9)} fill={C.accent} />
      </g>

      {/* ---------- ISO 9001 stamp ---------- */}
      <g className="ill-float-2">
      <g transform="translate(548 92) rotate(-10)">
        <circle r={52} fill={C.ink} opacity={0.06} cx={3} cy={5} />
        <circle r={52} fill={C.card} stroke={C.accentDeep} strokeWidth={2.4} />
        <circle r={45} fill="none" stroke={C.accentDeep} strokeWidth={1} strokeDasharray="2 3" />
        <text y={-4} textAnchor="middle" fontSize={19} fill={C.accentDeep} fontFamily="ui-monospace, Menlo, monospace" fontWeight={700}>
          ISO 9001
        </text>
        <path d="M-30 5H30" stroke={C.accentSoft} strokeWidth={1.4} />
        <text className="hidden sm:inline" y={22} textAnchor="middle" fontSize={13} fill={C.ink2} fontFamily="ui-monospace, Menlo, monospace">
          CERTIFIED
        </text>
      </g>
      </g>

      {/* ---------- mill-cert sheet (back-left wall) ---------- */}
      <WallCard x={16} y={118} w={172} h={128} slope={-0.5} className="ill-float">
        <text className="hidden sm:inline" x={12} y={19} fontSize={13} fill={C.accentDeep} fontFamily="ui-monospace, Menlo, monospace" letterSpacing={0.6}>
          MILL TEST CERT
        </text>
        <rect x={12} y={25} width={148} height={1.6} fill={C.line} />
        {[0, 1, 2, 3, 4].map((r) => (
          <g key={r}>
            <rect x={12} y={36 + r * 17} width={[46, 38, 52, 34, 44][r]} height={5} rx={2.5} fill={C.lineStrong} />
            <rect x={82} y={36 + r * 17} width={[40, 30, 34, 44, 28][r]} height={5} rx={2.5} fill={C.line} />
            <path d={`M140 ${38 + r * 17}l3 3 7 -7`} stroke={C.accent} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
        <text className="hidden sm:inline" x={12} y={122} fontSize={13} fill={C.muted} fontFamily="ui-monospace, Menlo, monospace">
          WPS · HEAT NO.
        </text>
      </WallCard>
    </SceneFrame>
  );
}
