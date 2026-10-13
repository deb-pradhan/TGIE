import { C, IsoBox } from "../kit";
import { Live } from "../Live";
import { iso } from "./geo";
import { Txt } from "./Fig";

/**
 * Lifecycle roadmap — isometric register.
 * Four station vignettes (discover / design / build / handover) on stepped
 * pedestals, joined by a dashed teal path. Desktop: one wide scene.
 * Mobile: each station is drawn alone and the page draws a vertical rail.
 */
const g = iso(150, 70, 28, 20);
const { box, proj, poly } = g;

function Base({ ped }: { ped: number }) {
  return (
    <>
      <IsoBox faces={box(0, 0, 4, 4, -ped, 0)} stroke={C.lineStrong} right={C.faceDark} front={C.faceR} />
      <path d={g.seg(proj(0, 4, 0), proj(4, 4, 0))} stroke={C.line} strokeWidth="1" />
    </>
  );
}

/* 1 — discover: sketch on a clipboard + pencil */
function Discover() {
  const star = proj(2.6, 0.9, 2.4);
  return (
    <g>
      <IsoBox faces={box(0.7, 0.5, 2.9, 3.4, 0, 0.14)} top={C.paper} right={C.lineStrong} front={C.faceR} stroke={C.lineStrong} />
      <g className="ill-ns" transform={g.top(0.14)}>
        <rect x="0.95" y="0.8" width="1.7" height="2.3" rx="0.05" fill="#fff" stroke={C.line} strokeWidth="1" />
        <rect x="1.15" y="1.0" width="0.9" height="0.1" fill={C.lineStrong} />
        <rect x="1.15" y="1.2" width="0.55" height="0.08" fill={C.line} />
        <rect x="1.15" y="1.45" width="1.3" height="0.75" rx="0.07" fill="none" stroke={C.tealDeep} strokeWidth="1.2" strokeDasharray="3 2" />
        <circle cx="1.5" cy="1.82" r="0.2" fill="none" stroke={C.teal} strokeWidth="1.4" />
        <path d="M1.9 1.95 H2.3 M1.9 1.75 H2.15" stroke={C.teal} strokeWidth="1.2" strokeLinecap="round" />
        {[2.45, 2.7, 2.95].map((y, i) => (
          <g key={y}>
            <rect x="1.15" y={y - 0.07} width="0.14" height="0.14" fill="none" stroke={C.muted} strokeWidth="1" />
            {i < 2 && <path d={`M1.17 ${y} l0.04 0.05 l0.08 -0.12`} fill="none" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
            <rect x="1.45" y={y - 0.03} width={1.0 - i * 0.2} height="0.06" fill={C.line} />
          </g>
        ))}
      </g>
      <IsoBox faces={box(1.3, 0.3, 2.3, 0.75, 0.14, 0.34)} top={C.ink2} right={C.ink} front="#2a2924" stroke={C.ink} />
      {/* pencil */}
      <IsoBox faces={box(3.15, 0.8, 3.4, 2.9, 0, 0.24)} top={C.tealSoft} right={C.tealDeep} front={C.teal} stroke={C.tealDeep} />
      <path d={poly([proj(3.15, 2.9, 0.24), proj(3.4, 2.9, 0.24), proj(3.275, 3.4, 0.12)])} fill={C.paper} stroke={C.lineStrong} strokeWidth="1" strokeLinejoin="round" />
      <g className="ill-float">
        <path
          d={`M${star[0]} ${star[1] - 11} L${star[0] + 3} ${star[1] - 3} L${star[0] + 11} ${star[1]} L${star[0] + 3} ${star[1] + 3} L${star[0]} ${star[1] + 11} L${star[0] - 3} ${star[1] + 3} L${star[0] - 11} ${star[1]} L${star[0] - 3} ${star[1] - 3} Z`}
          fill={C.teal}
        />
      </g>
    </g>
  );
}

/* 2 — design: PCB layout + floating CAD wireframe */
function Design() {
  const o = [1.9, 0.2, 1.1] as const;
  const s = 1.4;
  const wp = (dx: number, dy: number, dz: number) => proj(o[0] + dx * s, o[1] + dy * s, o[2] + dz * s);
  const edge = (a: readonly [number, number, number], b: readonly [number, number, number]) => g.seg(wp(...a), wp(...b));
  return (
    <g>
      <IsoBox faces={box(0.4, 0.9, 3.1, 3.4, 0, 0.12)} top={C.mint} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <g className="ill-ns" transform={g.top(0.12)}>
        <g fill="none" stroke={C.teal} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0.8 1.3 H1.5 V2.0 H2.0" />
          <path d="M0.8 1.6 H1.2 V2.4 H2.0" />
          <path d="M0.8 3.0 H1.7 V2.6 H2.0" />
          <path d="M2.8 1.4 H2.5 V2.0 H2.2" />
          <path d="M2.8 3.0 H2.4 V2.5 H2.2" strokeDasharray="4 3" className="ill-dash" />
        </g>
        {[[0.8, 1.3], [0.8, 1.6], [0.8, 3.0], [2.8, 1.4], [2.8, 3.0]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="0.09" fill="#fff" stroke={C.tealDeep} strokeWidth="1" />
        ))}
        <rect x="2.15" y="1.05" width="0.55" height="0.2" rx="0.03" fill="none" stroke={C.tealDeep} strokeWidth="1" />
        <circle cx="1.1" cy="2.05" r="0.08" fill={C.tealDeep} />
        {/* dimension line */}
        <path d="M0.4 3.72 H3.1 M0.4 3.58 V3.86 M3.1 3.58 V3.86" stroke={C.tealDeep} strokeWidth="1" fill="none" />
        <rect x="1.35" y="3.55" width="0.8" height="0.34" fill={C.card} />
        <Txt x={1.75} y={3.8} size={0.27} fill={C.tealDeep} anchor="middle">42 mm</Txt>
      </g>
      <IsoBox faces={box(1.2, 1.5, 2.0, 2.3, 0.12, 0.42)} top={C.ink2} right={C.ink} front="#2a2924" stroke={C.ink} />
      {/* CAD wireframe, hovering */}
      <g className="ill-float" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={edge([0, 0, 0], [0, 0, 1]) + edge([1, 0, 0], [1, 0, 1]) + edge([0, 1, 0], [0, 1, 1]) + edge([0, 0, 0], [1, 0, 0]) + edge([0, 0, 0], [0, 1, 0])} stroke={C.teal} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
        <path d={poly([wp(0, 0, 1), wp(1, 0, 1), wp(1, 1, 1), wp(0, 1, 1)])} stroke={C.tealDeep} strokeWidth="1.6" fill={C.card} fillOpacity=".6" />
        <path d={poly([wp(1, 0, 0), wp(1, 1, 0), wp(1, 1, 1), wp(1, 0, 1)])} stroke={C.tealDeep} strokeWidth="1.6" />
        <path d={poly([wp(0, 1, 0), wp(1, 1, 0), wp(1, 1, 1), wp(0, 1, 1)])} stroke={C.tealDeep} strokeWidth="1.6" />
        <circle cx={wp(0, 1, 1)[0]} cy={wp(0, 1, 1)[1]} r="2.6" fill={C.teal} />
        <circle cx={wp(1, 0, 0)[0]} cy={wp(1, 0, 0)[1]} r="2.6" fill={C.teal} />
      </g>
    </g>
  );
}

/* 3 — build: prototype on the bench, scope + iron */
function Build() {
  const probe = [proj(2.0, 1.6, 0.2), proj(2.5, 1.6, 0.2), proj(2.5, 1.2, 0.8)];
  return (
    <g>
      {/* printed enclosure shell */}
      <IsoBox faces={box(0.5, 2.5, 1.9, 3.7, 0, 0.5)} top={C.faceL} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <g className="ill-ns" transform={g.top(0.5)}>
        <rect x="0.7" y="2.7" width="1.0" height="0.8" rx="0.06" fill={C.paper2} stroke={C.lineStrong} strokeWidth="1" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M0.7 ${2.85 + i * 0.2} H1.7`} stroke={C.line} strokeWidth="1" />
        ))}
      </g>
      {/* dev board with chip */}
      <IsoBox faces={box(0.4, 0.5, 2.1, 2.2, 0, 0.12)} top={C.mint} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <g className="ill-ns" transform={g.top(0.12)}>
        <path d="M0.6 0.9 H1.0 V1.3 M0.6 1.9 H1.2 M1.9 0.8 H1.7 V1.4" fill="none" stroke={C.teal} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="0.7" cy="0.7" r="0.1" fill={C.teal} className="ill-blink" />
      </g>
      <IsoBox faces={box(1.0, 1.0, 1.7, 1.7, 0.12, 0.34)} top={C.ink2} right={C.ink} front="#2a2924" stroke={C.ink} />
      {/* scope */}
      <IsoBox faces={box(2.6, 0.4, 3.8, 1.6, 0, 1.5)} top={C.faceTop} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <g className="ill-ns" transform={g.front(1.6, 1.5)}>
        <rect x="2.75" y="0.18" width="0.9" height="0.8" rx="0.06" fill={C.forest} />
        <path d="M2.8 0.58 q0.1 -0.28 0.2 0 t0.2 0 t0.2 0 t0.2 0 t0.2 0" fill="none" stroke={C.tealSoft} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="3.0" cy="1.2" r="0.07" fill={C.muted} />
        <circle cx="3.25" cy="1.2" r="0.07" fill={C.muted} />
      </g>
      {/* probe lead */}
      <path d={`M${probe[0][0]} ${probe[0][1]} L${probe[1][0]} ${probe[1][1]} L${probe[2][0]} ${probe[2][1]}`} fill="none" stroke={C.teal} strokeWidth="1.5" strokeDasharray="4 4" className="ill-dash" />
      {/* soldering iron */}
      <IsoBox faces={box(3.0, 2.1, 3.25, 3.7, 0, 0.26)} top={C.lineStrong} right={C.ink2} front={C.ink} stroke={C.ink2} />
      <IsoBox faces={box(3.0, 1.8, 3.25, 2.1, 0, 0.26)} top={C.tealSoft} right={C.tealDeep} front={C.teal} stroke={C.tealDeep} />
      {[[-5, -8], [3, -13], [8, -6], [-9, -15]].map(([dx, dy], i) => {
        const [x, y] = proj(3.12, 1.8, 0.3);
        return <circle key={i} cx={x + dx} cy={y + dy} r="1.3" fill={C.teal} className="ill-blink" style={{ animationDelay: `${i * 0.4}s` }} />;
      })}
    </g>
  );
}

/* 4 — handover: sealed package, key, flag */
function Handover() {
  const a = proj(2.2, 1.2, 3.1);
  const b = proj(2.2, 1.2, 2.5);
  const c = proj(2.95, 1.2, 2.8);
  return (
    <g>
      <IsoBox faces={box(0.7, 0.7, 2.7, 2.7, 0, 1.5)} top={C.faceTop} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <g className="ill-ns" transform={g.top(1.5)}>
        <rect x="1.5" y="0.7" width="0.4" height="2.0" fill={C.teal} opacity="0.85" />
      </g>
      <g className="ill-ns" transform={g.front(2.7, 1.5)}>
        <rect x="1.5" y="0" width="0.4" height="1.5" fill={C.teal} opacity="0.85" />
        <rect x="0.9" y="0.7" width="0.45" height="0.5" rx="0.04" fill="#fff" stroke={C.lineStrong} strokeWidth="1" />
        <path d="M1.0 0.85 H1.25 M1.0 0.98 H1.25 M1.0 1.1 H1.15" stroke={C.muted} strokeWidth="1" />
      </g>
      {/* key on the slab */}
      <g className="ill-ns" transform={g.top(0)}>
        <circle cx="1.1" cy="3.4" r="0.27" fill="none" stroke={C.tealDeep} strokeWidth="3" />
        <path d="M1.37 3.4 H2.5 M2.15 3.4 V3.68 M2.4 3.4 V3.62" stroke={C.tealDeep} strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="1.1" cy="3.4" r="0.08" fill={C.card} />
      </g>
      {/* flag */}
      <g className="ill-float-2">
        <path d={g.seg(a, proj(2.2, 1.2, 1.5))} stroke={C.ink2} strokeWidth="2" strokeLinecap="round" />
        <path d={poly([a, c, b])} fill={C.teal} stroke={C.tealDeep} strokeWidth="1" strokeLinejoin="round" />
      </g>
      {/* done badge */}
      <g className="ill-float">
        <circle cx={proj(3.4, 2.4, 1.9)[0]} cy={proj(3.4, 2.4, 1.9)[1]} r="10" fill="#fff" stroke={C.teal} strokeWidth="1.6" />
        <path
          d={`M${proj(3.4, 2.4, 1.9)[0] - 4.5} ${proj(3.4, 2.4, 1.9)[1]} l3.2 3.4 l6 -7`}
          fill="none"
          stroke={C.teal}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

const arts = [Discover, Design, Build, Handover];
const PED0 = 0.6;
const STEP = 0.8; // pedestal growth per station, in z units (= STEP*16 px)
const RISE = STEP * 20;

/** Desktop: one wide scene, 4 columns of 300 units, path rising left to right. */
export function RoadmapDesktop() {
  const stations = [0, 1, 2, 3];
  const py = (i: number) => proj(2.6, 2.6)[1] - RISE * i;
  let d = `M-10 ${py(0) + 26} C 60 ${py(0) + 26} 80 ${py(0)} 150 ${py(0)}`;
  for (let i = 0; i < 3; i++) {
    d += ` C ${300 * i + 300} ${py(i)} ${300 * (i + 1)} ${py(i + 1)} ${300 * (i + 1) + 150} ${py(i + 1)}`;
  }
  d += ` C 1170 ${py(3)} 1190 ${py(3) - 14} 1215 ${py(3) - 20}`;
  return (
    <div className="relative hidden h-[clamp(170px,17.3vw,260px)] w-full md:block" aria-hidden>
      <Live>
        <svg viewBox="0 -8 1200 208" preserveAspectRatio="xMidYMax meet" className="absolute inset-0 h-full w-full" overflow="hidden">
          {stations.map((i) => (
            <g key={i} transform={`translate(${300 * i} ${-RISE * i})`}>
              <Base ped={PED0 + STEP * i} />
            </g>
          ))}
          <path d={d} fill="none" stroke={C.lineStrong} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} fill="none" stroke="#fff" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
          <path d={d} fill="none" stroke={C.teal} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="8 8" className="ill-dash" />
          {stations.map((i) => {
            const Art = arts[i];
            return (
              <g key={i} transform={`translate(${300 * i} ${-RISE * i})`}>
                <Art />
              </g>
            );
          })}
        </svg>
      </Live>
    </div>
  );
}

/** Mobile: a single station vignette (the page draws the vertical rail). */
export function StationMobile({ i }: { i: number }) {
  const Art = arts[i];
  return (
    <div className="relative h-[165px] w-full md:hidden" aria-hidden>
      <Live>
        <svg viewBox="12 36 276 164" className="absolute inset-0 h-full w-full">
          <Base ped={0.45} />
          <Art />
        </svg>
      </Live>
    </div>
  );
}
