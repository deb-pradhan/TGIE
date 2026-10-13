import type { CSSProperties } from "react";
import { C, IsoBox, SceneFrame } from "../kit";
import { Dots, Ground, makeScene, spray } from "./shared";

/**
 * The four fabrication stations (RFQ, cut + bend, weld, coat + deliver) as
 * small iso scenes. Each carries the same horizontal dashed "one PO" line at
 * the same height, so the line reads as continuous across the cell seams.
 */
const sc = makeScene(160, 48, 24, 16);
const { proj, box, seg, path, poly, topM } = sc;
const LINE_Y = 128;
const slide = (dx: number, dy: number) => ({ "--dx": `${dx}px`, "--dy": `${dy}px` }) as CSSProperties;

function Flow({ first, last }: { first?: boolean; last?: boolean }) {
  return (
    <g>
      <path d={`M${first ? 40 : 0} ${LINE_Y}H${last ? 280 : 320}`} stroke={C.accent} strokeWidth={1.6} strokeDasharray="5 5" className="ill-dash" fill="none" />
      {!first && <circle cx={0} cy={LINE_Y} r={3.5} fill={C.accent} />}
      {!last && <path d={`M306 ${LINE_Y - 5}l7 5-7 5`} stroke={C.accent} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      {first && <circle cx={40} cy={LINE_Y} r={4} fill={C.card} stroke={C.accent} strokeWidth={1.6} />}
      {last && <circle cx={280} cy={LINE_Y} r={4.5} fill={C.accent} />}
    </g>
  );
}

function Station1() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <IsoBox key={i} faces={box(0.6, 0.6, 2.8, 2.8, i * 0.28, i * 0.28 + 0.28)} top={i === 2 ? C.accentPale : C.card} right={C.faceDark} front={C.faceR} stroke={i === 2 ? C.accent : C.lineStrong} strokeWidth={i === 2 ? 1.3 : 1} />
      ))}
      <g transform={`matrix(1 0.5 0 1 ${proj(2.9, 3.5, 2.5)[0]} ${proj(2.9, 3.5, 2.5)[1]})`}>
        <rect x={3} y={4} width={50} height={38} rx={4} fill={C.ink} opacity={0.06} />
        <rect width={50} height={38} rx={4} fill={C.card} stroke={C.line} />
        <rect x={7} y={7} width={26} height={4} rx={2} fill={C.accentDeep} />
        <rect x={7} y={16} width={36} height={3} rx={1.5} fill={C.lineStrong} />
        <rect x={7} y={23} width={28} height={3} rx={1.5} fill={C.line} />
        <path d="M8 33l3 3 6-7" stroke={C.accent} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

function Station2() {
  const tip = proj(2.0, 2.0, 0.3);
  return (
    <>
      <IsoBox faces={box(0.5, 0.5, 3.6, 3.6, 0, 0.22)} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <g transform={topM(0.22)}>
        <g fill="none" stroke={C.accentDeep} strokeWidth={0.07}>
          <circle cx={1.3} cy={1.4} r={0.4} />
          <rect x={2.0} y={1.0} width={1.0} height={0.7} rx={0.08} />
          <path d="M1.0 2.4h1.4v0.5h-0.9v0.5h-0.5z" />
        </g>
      </g>
      <path d={path([[2.0, 1.0], [3.0, 1.0], [3.0, 1.7], [2.0, 1.7], [2.0, 1.0]], 0.24)} className="ill-dash" stroke={C.accent} strokeWidth={1.8} strokeDasharray="4 6" fill="none" />
      <path d={seg(proj(1.0, 3.8, 0.2), proj(1.0, 3.8, 2.4))} stroke={C.ink2} strokeWidth={3} strokeLinecap="round" />
      <path d={seg(proj(3.2, 3.8, 0.2), proj(3.2, 3.8, 2.4))} stroke={C.ink2} strokeWidth={3} strokeLinecap="round" />
      <path d={seg(proj(1.0, 3.8, 2.4), proj(3.2, 3.8, 2.4))} stroke={C.ink2} strokeWidth={4} strokeLinecap="round" />
      <g className="ill-slide" style={slide(26, 13)}>
        <IsoBox faces={box(1.6, 3.6, 2.0, 4.0, 1.7, 2.6)} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.ink2} strokeWidth={1} />
        <path d={seg(proj(1.8, 3.8, 1.7), [proj(1.8, 3.8, 1.7)[0], tip[1] + 6])} stroke={C.accentSoft} strokeWidth={2} />
        <Dots at={[proj(1.8, 3.8, 1.7)[0], tip[1] + 6]} pts={spray(7, -1.4, 2.4, 12, 4)} fill={C.accentSoft} className="ill-blink" />
      </g>
    </>
  );
}

function Station3() {
  const tipP = proj(1.4, 3.2, 0.3);
  return (
    <>
      <IsoBox faces={box(0.4, 0.8, 3.8, 4.0, 0, 0.22)} top={C.faceR} right={C.faceDark} front={C.faceL} stroke={C.lineStrong} />
      <IsoBox faces={box(0.6, 3.2, 3.6, 3.45, 0.22, 1.6)} top={C.card} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <path d={seg(proj(0.8, 3.47, 0.28), proj(3.4, 3.47, 0.28))} stroke={C.accentDeep} strokeWidth={3} strokeLinecap="round" />
      <path d={seg(proj(0.8, 3.47, 0.28), proj(3.4, 3.47, 0.28))} stroke={C.accentSoft} strokeWidth={1.2} strokeDasharray="2 4" />
      <g className="ill-slide" style={slide(30, 15)}>
        <path d={`M${tipP[0]} ${tipP[1]} l-22 -32`} stroke={C.ink2} strokeWidth={6} strokeLinecap="round" />
        <circle cx={tipP[0]} cy={tipP[1]} r={9} fill={C.accent} opacity={0.35} className="ill-pulse" />
        <circle cx={tipP[0]} cy={tipP[1]} r={3.4} fill={C.card} />
        <Dots at={[tipP[0] + 2, tipP[1] - 2]} pts={spray(14, -0.9, 2.6, 28, 2)} fill={C.accentDeep} className="ill-blink" />
        <Dots at={[tipP[0] + 2, tipP[1] - 2]} pts={spray(10, -2.3, 2.4, 22, 6)} fill={C.accentSoft} className="ill-pulse" />
      </g>
    </>
  );
}

function Station4() {
  const pin = proj(2.9, 2.2, 3.6);
  return (
    <>
      {/* coated frame */}
      {[[0.5, 0.5], [0.5, 2.4], [2.0, 0.5], [2.0, 2.4]].map(([x, y]) => (
        <IsoBox key={`${x}${y}`} faces={box(x, y, x + 0.22, y + 0.22, 0, 1.7)} top={C.accentSoft} right={C.accent} front={C.accentSoft} stroke={C.accent} strokeWidth={0.8} />
      ))}
      <IsoBox faces={box(0.5, 0.5, 2.22, 0.72, 1.7, 1.92)} top={C.accentSoft} right={C.accent} front={C.accentSoft} stroke={C.accent} strokeWidth={0.8} />
      <IsoBox faces={box(0.5, 2.4, 2.22, 2.62, 1.7, 1.92)} top={C.accentSoft} right={C.accent} front={C.accentSoft} stroke={C.accent} strokeWidth={0.8} />
      {/* crate on pallet */}
      <IsoBox faces={box(2.9, 1.0, 4.2, 3.2, 0, 0.18)} top={C.faceR} right={C.faceDark} front={C.faceL} stroke={C.lineStrong} />
      <IsoBox faces={box(3.0, 1.1, 4.1, 3.1, 0.18, 1.4)} top={C.card} right={C.faceR} front={C.faceL} stroke={C.accentDeep} strokeWidth={1.1} />
      <path d={poly([proj(4.1, 1.6, 0.4), proj(4.1, 2.6, 0.4), proj(4.1, 2.6, 0.6), proj(4.1, 1.6, 0.6)])} fill={C.accent} opacity={0.8} />
      <g className="ill-float">
        <path d={`M${pin[0]} ${pin[1] + 12} c-9 -10 -10 -14 -10 -18 a10 10 0 1 1 20 0 c0 4 -1 8 -10 18z`} fill={C.accent} />
        <circle cx={pin[0]} cy={pin[1] - 7} r={3.6} fill={C.card} />
      </g>
    </>
  );
}

const stations = [Station1, Station2, Station3, Station4];

/** Station scene for pipeline step `i` (0 to 3). Parent cell supplies width. */
export function PipelineStation({ index }: { index: number }) {
  const S = stations[index];
  return (
    <div className="relative aspect-[320/190] w-full">
      <SceneFrame viewBox="0 0 320 190" tone="cell">
        <Flow first={index === 0} last={index === 3} />
        <Ground sc={sc} w={4.4} d={4.4} t={0.3} />
        <S />
      </SceneFrame>
    </div>
  );
}
