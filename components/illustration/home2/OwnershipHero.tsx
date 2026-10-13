import { C, IsoBox } from "../kit";
import { Fig, Txt } from "./Fig";
import { iso } from "./geo";

/**
 * Ownership — isometric register.
 * An open crate being handed over: STEP / GERBER / BOM / .c file tiles stack
 * in, an unlocked padlock stands beside it, and a "100% yours" stamp sits on
 * the crate front.
 */
const g = iso(262, 126, 26, 18);
const { box, proj, poly } = g;

const RIM = 1.8;
const X0 = 0.2, X1 = 3.8, Y0 = 0.8, Y1 = 4.4;

function Tile({
  x0, y0, x1, y1, z, label, accent = false, sub,
}: { x0: number; y0: number; x1: number; y1: number; z: number; label: string; accent?: boolean; sub?: string }) {
  const cx = (x0 + x1) / 2;
  return (
    <g>
      <IsoBox faces={box(x0, y0, x1, y1, z - 0.16, z)} top="#fff" right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <g className="ill-ns" transform={g.top(z)}>
        <rect x={x0 + 0.18} y={y0 + 0.18} width="0.5" height="0.12" fill={accent ? C.teal : C.tealSoft} />
        <path d={`M${x1 - 0.5} ${y0} L${x1} ${y0} L${x1} ${y0 + 0.5} Z`} fill={C.faceR} stroke={C.lineStrong} strokeWidth="1" />
        <Txt x={cx} y={(y0 + y1) / 2 + 0.1} size={0.4} fill={C.tealDeep} anchor="middle" weight={500}>
          {label}
        </Txt>
        {sub && (
          <Txt x={cx} y={(y0 + y1) / 2 + 0.5} size={0.2} fill={C.muted} anchor="middle">
            {sub}
          </Txt>
        )}
        <path d={`M${x0 + 0.2} ${y1 - 0.3} H${x1 - 0.2} M${x0 + 0.2} ${y1 - 0.18} H${x1 - 0.7}`} stroke={C.line} strokeWidth="1.2" fill="none" />
      </g>
    </g>
  );
}

export function OwnershipHero() {
  const d1 = [proj(2.4, 1.6, 3.0), proj(2.4, 1.8, 2.2)];
  const d2 = [proj(1.4, 2.6, 4.7), proj(1.4, 2.7, 3.9)];
  const shine = proj(5.9, 1.0, 1.9);
  return (
    <Fig viewBox="64 36 440 270" bg="bg-card-soft">
      {/* ground */}
      <IsoBox faces={box(-1.7, -0.9, 6.5, 5.6, -0.35, 0)} top={C.soft} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <g className="ill-ns" transform={g.top(0)}>
        {Array.from({ length: 8 }, (_, i) => (
          <path key={`a${i}`} d={`M${-0.7 + i * 1.0} -0.9 V5.6`} stroke={C.line} strokeWidth=".8" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <path key={`b${i}`} d={`M-1.7 ${-0.3 + i * 1.1} H6.5`} stroke={C.line} strokeWidth=".8" />
        ))}
      </g>

      {/* crate: interior */}
      <path d={poly([proj(X0, Y0, RIM), proj(X1, Y0, RIM), proj(X1, Y1, RIM), proj(X0, Y1, RIM)])} fill="#bfbaa5" />
      <path d={poly([proj(X0, Y0, RIM), proj(X0, Y1, RIM), proj(X0, Y1, 0), proj(X0, Y0, 0)])} fill="#c9c4b0" />
      <path d={poly([proj(X0, Y0, RIM), proj(X1, Y0, RIM), proj(X1, Y0, 0), proj(X0, Y0, 0)])} fill={C.lineStrong} />
      {/* files already inside */}
      <Tile x0={1.2} y0={0.95} x1={3.5} y1={2.95} z={1.1} label="BOM" sub="parts + MPN" />
      <Tile x0={0.5} y0={1.7} x1={2.9} y1={3.8} z={1.62} label="STEP" accent sub="mechanical" />
      {/* crate: outer walls */}
      <path d={poly([proj(X1, Y0, 0), proj(X1, Y1, 0), proj(X1, Y1, RIM), proj(X1, Y0, RIM)])} fill={C.lineStrong} />
      <path d={poly([proj(X0, Y1, 0), proj(X1, Y1, 0), proj(X1, Y1, RIM), proj(X0, Y1, RIM)])} fill={C.paper} />
      <path d={`${g.seg(proj(X0, Y1, RIM), proj(X1, Y1, RIM))} ${g.seg(proj(X1, Y1, RIM), proj(X1, Y0, RIM))}`} stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
      <g className="ill-ns" transform={g.front(Y1, RIM)}>
        <rect x="1.05" y="0" width="0.4" height={RIM} fill={C.teal} opacity="0.85" />
        <g className="ill-pulse" style={{ transformOrigin: "center" }}>
          <g transform="rotate(-4 2.65 0.95)">
            <rect x="1.95" y="0.35" width="1.4" height="1.15" rx="0.1" fill="#fff" fillOpacity=".7" stroke={C.tealDeep} strokeWidth="2" />
            <rect x="2.02" y="0.42" width="1.26" height="1.01" rx="0.07" fill="none" stroke={C.tealDeep} strokeWidth="1" />
            <Txt x={2.65} y={0.92} size={0.42} fill={C.tealDeep} anchor="middle" weight={500}>
              100%
            </Txt>
            <Txt x={2.65} y={1.28} size={0.27} fill={C.tealDeep} anchor="middle" ls={0.06}>
              YOURS
            </Txt>
          </g>
        </g>
        <rect x="0.2" y="0.5" width="0.7" height="0.55" rx="0.04" fill="#fff" stroke={C.lineStrong} strokeWidth="1" />
        <path d="M0.32 0.68 H0.78 M0.32 0.8 H0.78 M0.32 0.92 H0.6" stroke={C.muted} strokeWidth="1" />
      </g>

      {/* drop guides */}
      <path d={`M${d1[0][0]} ${d1[0][1]} L${d1[1][0]} ${d1[1][1]}`} stroke={C.teal} strokeWidth="1.6" strokeDasharray="4 4" className="ill-dash" />
      <path d={`M${d2[0][0]} ${d2[0][1]} L${d2[1][0]} ${d2[1][1]}`} stroke={C.teal} strokeWidth="1.6" strokeDasharray="4 4" className="ill-dash" />

      {/* files flying in */}
      <g className="ill-float">
        <Tile x0={1.2} y0={0.6} x1={3.4} y1={2.6} z={3.1} label=".c" accent sub="firmware" />
      </g>
      <g className="ill-float-2">
        <Tile x0={0.3} y0={1.7} x1={2.5} y1={3.7} z={4.9} label="GERBER" sub="fab package" />
      </g>

      {/* unlocked padlock */}
      <IsoBox faces={box(4.8, 1.2, 5.9, 2.0, 0, 1.0)} top={C.tealSoft} right={C.tealDeep} front={C.teal} stroke={C.tealDeep} />
      <g className="ill-ns" transform={g.front(1.6, 2.7)}>
        <path d="M5.1 1.7 V0.95 A0.3 0.3 0 0 1 5.7 0.95 V1.2" fill="none" stroke={C.ink2} strokeWidth="5" strokeLinecap="round" />
        <path d="M5.1 1.7 V0.95 A0.3 0.3 0 0 1 5.7 0.95 V1.2" fill="none" stroke={C.lineStrong} strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g className="ill-ns" transform={g.front(2.0, 1.0)}>
        <circle cx="5.35" cy="0.42" r="0.11" fill="#fff" />
        <path d="M5.35 0.45 V0.72" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className="ill-pulse">
        <path d={`M${shine[0]} ${shine[1] - 7} V${shine[1] + 7} M${shine[0] - 7} ${shine[1]} H${shine[0] + 7}`} stroke={C.teal} strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </Fig>
  );
}
