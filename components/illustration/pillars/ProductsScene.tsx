import type { CSSProperties } from "react";
import { C, IsoBox, SceneFrame } from "../kit";
import { Cyl, Ground, WallCard, makeScene } from "./shared";

/**
 * Pillar B. One gantry 3D printer laying layers, scaling to a product line:
 * filament spools feeding it, a conveyor of finished units (enclosure, kinetic
 * decor, automotive bracket, scale miniature), a retail shelf with boxed stock
 * and a teal material palette card. Motion: nozzle sliding along the beam,
 * infill + conveyor dashes, floating retail box, bowden feed.
 */
const sc = makeScene(266, 172, 27, 19);
const { proj, box, seg, path, poly, ell } = sc;

const SWATCHES: [string, string, string][] = [
  [C.forest, "PA-CF", "#eaf1ed"],
  [C.tealDeep, "PETG", "#eaf1ed"],
  [C.teal, "ASA", C.forestDeep],
  [C.tealSoft, "TPU", C.forestDeep],
  [C.mint, "PLA", C.tealDeep],
  [C.faceR, "PC", C.ink2],
];

// printer + part
const PZ = 2.0;
const layerLines: string[] = [];
for (let z = 0.6; z < PZ - 0.01; z += 0.25) {
  layerLines.push(seg(proj(3.7, 1.7, z), proj(3.7, 3.7, z)));
  layerLines.push(seg(proj(1.7, 3.7, z), proj(3.7, 3.7, z)));
}
const infill: [number, number][] = [];
for (let i = 0; i <= 6; i++) infill.push([1.85 + i * 0.3, i % 2 === 0 ? 1.85 : 3.55]);
const BEAM = 4.1;
const nozzle = proj(2.7, 2.7, PZ + 0.45);
const [nx, ny] = nozzle;
const beamMid = proj(2.7, 2.7, BEAM);
const spoolTop = proj(1.6, 6.5, 1.64);

function Spool({ x, y, z, tone }: { x: number; y: number; z: number; tone: string }) {
  return (
    <g>
      <Cyl sc={sc} x={x} y={y} z0={z} z1={z + 0.08} r={1.0} top={C.card} side={C.faceDark} />
      <Cyl sc={sc} x={x} y={y} z0={z + 0.08} z1={z + 0.7} r={0.78} top={tone} side={tone} stroke={tone} />
      <ellipse {...ell(x, y, z + 0.7, 0.78)} fill="none" stroke={C.card} strokeWidth={1} opacity={0.5} />
      <ellipse {...ell(x, y, z + 0.7, 0.5)} fill="none" stroke={C.card} strokeWidth={1} opacity={0.35} />
      <Cyl sc={sc} x={x} y={y} z0={z + 0.7} z1={z + 0.78} r={1.0} top={C.card} side={C.faceDark} />
      <ellipse {...ell(x, y, z + 0.78, 0.26)} fill={C.cell} stroke={C.lineStrong} />
    </g>
  );
}

function RetailBox({ x, y, z, w = 0.9, h = 0.75 }: { x: number; y: number; z: number; w?: number; h?: number }) {
  const b = box(x, y, x + w, y + w, z, z + h);
  return (
    <g>
      <IsoBox faces={b} top={C.card} right={C.faceR} front={C.faceL} stroke={C.tealDeep} strokeWidth={0.9} />
      <path d={poly([proj(x + w * 0.38, y, z + h), proj(x + w * 0.62, y, z + h), proj(x + w * 0.62, y + w, z + h), proj(x + w * 0.38, y + w, z + h)])} fill={C.tealSoft} />
      <path d={poly([proj(x + w * 0.38, y + w, z + h), proj(x + w * 0.62, y + w, z + h), proj(x + w * 0.62, y + w, z), proj(x + w * 0.38, y + w, z)])} fill={C.teal} opacity={0.75} />
      <path d={[0.15, 0.22, 0.3].map((t) => seg(proj(x + w, y + w * (0.25 + t), z + h * 0.3), proj(x + w, y + w * (0.25 + t), z + h * 0.7))).join("")} stroke={C.ink2} strokeWidth={1} opacity={0.6} />
    </g>
  );
}

export function ProductsScene() {
  return (
    <SceneFrame viewBox="0 0 640 480" tone="cell">
      <Ground sc={sc} w={12} d={8} />

      {/* ---------- printer ---------- */}
      <IsoBox faces={box(0.6, 0.6, 4.8, 4.8, 0, 0.3)} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <IsoBox faces={box(0.95, 0.95, 4.45, 4.45, 0.3, 0.36)} top={C.mint} right={C.faceR} front={C.faceL} stroke={C.teal} strokeWidth={1.1} />
      <path d={seg(proj(2.7, 0.75, 0.3), proj(2.7, 0.75, BEAM))} stroke={C.ink2} strokeWidth={3} strokeLinecap="round" />
      {/* part being printed */}
      <IsoBox faces={box(1.7, 1.7, 3.7, 3.7, 0.36, PZ)} top={C.card} right={C.faceR} front={C.faceL} stroke={C.teal} strokeWidth={1.4} />
      <path d={layerLines.join("")} stroke={C.lineStrong} strokeWidth={0.9} fill="none" />
      <path d={path(infill, PZ)} className="ill-dash" stroke={C.teal} strokeWidth={1.3} strokeDasharray="4 6" fill="none" strokeLinejoin="round" />
      {/* gantry */}
      <path d={seg(proj(2.7, 4.65, 0.3), proj(2.7, 4.65, BEAM))} stroke={C.ink2} strokeWidth={3} strokeLinecap="round" />
      <path d={seg(proj(2.7, 0.75, BEAM), proj(2.7, 4.65, BEAM))} stroke={C.ink2} strokeWidth={3.4} strokeLinecap="round" />
      <g className="ill-slide" style={{ "--dx": "-26px", "--dy": "13px" } as CSSProperties}>
        <path d={`M${nx} ${beamMid[1]} L${nx} ${ny - 12}`} stroke={C.ink2} strokeWidth={2.4} />
        <path d={`M${nx - 8} ${ny - 14} L${nx + 8} ${ny - 14} L${nx + 5} ${ny - 3} L${nx - 5} ${ny - 3} Z`} fill={C.card} stroke={C.teal} strokeWidth={1.4} strokeLinejoin="round" />
        <path d={`M${nx} ${ny - 3} L${nx} ${ny + 3}`} stroke={C.teal} strokeWidth={2.2} strokeLinecap="round" />
      </g>

      {/* bowden feed from the spool stack to the print head */}
      <path d={`M${spoolTop[0]} ${spoolTop[1]} C${spoolTop[0] - 40} ${spoolTop[1] - 70} ${nx - 80} ${beamMid[1] - 20} ${nx - 8} ${beamMid[1]}`} className="ill-dash" stroke={C.tealDeep} strokeWidth={1.4} strokeDasharray="4 6" fill="none" />

      {/* ---------- filament spools ---------- */}
      <Spool x={1.6} y={6.5} z={0} tone={C.tealDeep} />
      <Spool x={3.9} y={6.9} z={0} tone={C.teal} />
      <Spool x={1.6} y={6.5} z={0.86} tone={C.tealSoft} />

      {/* ---------- retail shelf ---------- */}
      {[6.3, 11.2].map((x) => (
        <IsoBox key={x} faces={box(x, 0.7, x + 0.2, 2.5, 0, 3.7)} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      ))}
      <IsoBox faces={box(6.3, 0.7, 11.4, 2.5, 1.35, 1.5)} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      {[0, 1, 2, 3].map((i) => (
        <RetailBox key={i} x={6.7 + i * 1.18} y={1.0} z={1.5} w={0.95} h={0.8} />
      ))}
      <IsoBox faces={box(6.3, 0.7, 11.4, 2.5, 2.7, 2.85)} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      {[0, 1, 2].map((i) => (
        <RetailBox key={`t${i}`} x={7.0 + i * 1.5} y={1.0} z={2.85} w={0.95} h={0.7} />
      ))}

      {/* ---------- product line conveyor ---------- */}
      <path d={path([[4.8, 3.0], [5.3, 3.0], [5.3, 5.2]], 0.02)} className="ill-dash" stroke={C.teal} strokeWidth={1.5} strokeDasharray="4 6" fill="none" strokeLinejoin="round" />
      <IsoBox faces={box(5.0, 4.3, 11.7, 6.7, 0, 0.2)} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <path d={path([[5.2, 5.5], [11.5, 5.5]], 0.2)} className="ill-dash" stroke={C.tealSoft} strokeWidth={1.4} strokeDasharray="6 4" fill="none" />
      {/* U1 enclosure */}
      <IsoBox faces={box(5.5, 4.75, 6.8, 6.05, 0.2, 1.5)} top={C.card} right={C.faceR} front={C.faceL} stroke={C.teal} strokeWidth={1.3} />
      <path d={poly([proj(5.7, 6.05, 0.7), proj(6.6, 6.05, 0.7), proj(6.6, 6.05, 1.25), proj(5.7, 6.05, 1.25)])} fill={C.mint} stroke={C.tealSoft} />
      <circle cx={proj(6.35, 6.05, 0.95)[0]} cy={proj(6.35, 6.05, 0.95)[1]} r={2.4} fill={C.teal} className="ill-blink" />
      <path d={[0.9, 1.4, 1.9].map((d) => seg(proj(6.8, 4.75 + d * 0.45, 0.5), proj(6.8, 4.75 + d * 0.45, 1.2))).join("")} stroke={C.tealSoft} strokeWidth={1.6} strokeLinecap="round" />
      {/* U2 kinetic decor (cylinder + ring) */}
      <Cyl sc={sc} x={8.0} y={5.4} z0={0.2} z1={1.7} r={0.66} top={C.card} side={C.faceL} stroke={C.teal} sw={1.3} />
      <ellipse {...ell(8.0, 5.4, 1.0, 0.66)} fill="none" stroke={C.teal} strokeWidth={1.2} opacity={0.8} />
      <ellipse {...ell(8.0, 5.4, 1.7, 0.3)} fill={C.mint} stroke={C.tealSoft} />
      {/* U3 automotive bracket */}
      <IsoBox faces={box(8.9, 4.75, 10.0, 6.05, 0.2, 0.7)} top={C.card} right={C.faceR} front={C.faceL} stroke={C.teal} strokeWidth={1.3} />
      <IsoBox faces={box(8.9, 4.75, 9.3, 6.05, 0.7, 1.6)} top={C.card} right={C.faceR} front={C.faceL} stroke={C.teal} strokeWidth={1.3} />
      <ellipse {...ell(9.65, 5.4, 0.7, 0.2)} fill={C.cell} stroke={C.lineStrong} />
      {/* U4 scale miniature (stepped tower) */}
      {[0, 1, 2].map((i) => (
        <IsoBox key={i} faces={box(10.35 + i * 0.12, 4.85 + i * 0.12, 11.35 - i * 0.12, 5.85 - i * 0.12, 0.2 + i * 0.6, 0.8 + i * 0.6)} top={C.card} right={C.faceR} front={C.faceL} stroke={C.teal} strokeWidth={1.1} />
      ))}
      <path d={seg(proj(10.85, 5.35, 2.0), proj(10.85, 5.35, 2.5))} stroke={C.teal} strokeWidth={1.4} />
      <circle cx={proj(10.85, 5.35, 2.5)[0]} cy={proj(10.85, 5.35, 2.5)[1]} r={2.2} fill={C.teal} />

      {/* floating retail parcel */}
      <g className="ill-float-2">
        <RetailBox x={8.6} y={0.9} z={5.2} w={1.3} h={1.0} />
        <path d={seg(proj(9.25, 2.4, 3.2), proj(9.25, 2.4, 5.0))} className="ill-dash" stroke={C.teal} strokeWidth={1.3} strokeDasharray="4 6" />
      </g>

      {/* material palette card (back-left wall) */}
      <WallCard x={22} y={108} w={178} h={112} slope={-0.5} className="ill-float">
        <text x={12} y={17} fontSize={8} fill={C.muted} fontFamily="ui-monospace, Menlo, monospace" letterSpacing={1.2}>
          MATERIAL PALETTE
        </text>
        {SWATCHES.map(([fill, label, ink], i) => {
          const sx = 12 + (i % 3) * 54;
          const sy = 26 + Math.floor(i / 3) * 40;
          return (
            <g key={label}>
              <rect x={sx} y={sy} width={48} height={32} rx={5} fill={fill} stroke={C.line} />
              <text x={sx + 24} y={sy + 20} fontSize={9} textAnchor="middle" fill={ink} fontFamily="ui-monospace, Menlo, monospace">
                {label}
              </text>
            </g>
          );
        })}
      </WallCard>
    </SceneFrame>
  );
}
