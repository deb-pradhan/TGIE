import { C, IsoBox } from "../kit";
import { Fig, Txt } from "./Fig";
import { iso } from "./geo";

/**
 * Final CTA — isometric register.
 * Left: four pillar columns (A to D, each a stack of tiles) carry a platform
 * with a glowing idea-cube. Right: the globe the idea is carried out to.
 */
const g = iso(150, 112, 26, 18);
const { box, proj } = g;

const PILLARS: { x: number; y: number; L: string }[] = [
  { x: 0.1, y: 0.1, L: "C" },
  { x: 2.9, y: 0.1, L: "D" },
  { x: 0.1, y: 2.9, L: "A" },
  { x: 2.9, y: 2.9, L: "B" },
];
const W = 1.0;
const TOP = 2.9;

export function FinalPillars() {
  const cc = proj(2, 2, 3.3);
  const [sx, sy] = proj(2, 2.7, 3.3);
  const sparkles = [proj(0.9, 1.0, 4.2), proj(3.2, 2.6, 4.4), proj(1.0, 3.2, 3.6)];
  return (
    <Fig viewBox="0 0 300 290" bg="bg-transparent">
      <defs>
        <radialGradient id="fin-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={C.teal} stopOpacity="0.38" />
          <stop offset="1" stopColor={C.teal} stopOpacity="0" />
        </radialGradient>
      </defs>
      <IsoBox faces={box(-0.7, -0.7, 4.7, 4.7, -0.3, 0)} top="#fff" stroke={C.lineStrong} />
      {/* pillars: back to front */}
      {PILLARS.slice()
        .sort((a, b) => a.x + a.y - (b.x + b.y))
        .map((p) => (
          <g key={p.L}>
            {[0, 1, 2, 3].map((i) => {
              const z0 = i * 0.725;
              const inset = i === 1 ? 0.04 : 0;
              return (
                <IsoBox
                  key={i}
                  faces={box(p.x + inset, p.y + inset, p.x + W - inset, p.y + W - inset, z0, z0 + 0.68)}
                  top="#fff"
                  right={C.faceDark}
                  front={C.faceR}
                  stroke={C.lineStrong}
                />
              );
            })}
            <g className="ill-ns" transform={g.front(p.y + W, 2.9)}>
              <Txt x={p.x + W / 2} y={1.75} size={0.62} anchor="middle" fill={C.tealDeep} weight={500}>
                {p.L}
              </Txt>
            </g>
          </g>
        ))}
      {/* platform */}
      <IsoBox faces={box(-0.15, -0.15, 4.15, 4.15, TOP, TOP + 0.4)} top="#fff" right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      {/* glow + idea cube */}
      <circle cx={cc[0]} cy={cc[1]} r="74" fill="url(#fin-glow)" className="ill-pulse" />
      <g className="ill-float">
        <IsoBox faces={box(1.3, 1.3, 2.7, 2.7, TOP + 0.4, TOP + 1.8)} top={C.tealSoft} right={C.tealDeep} front={C.teal} stroke={C.tealDeep} />
        <path
          d={`M${sx} ${sy - 9} l2.6 6.4 l6.4 2.6 l-6.4 2.6 l-2.6 6.4 l-2.6 -6.4 l-6.4 -2.6 l6.4 -2.6 z`}
          fill="#fff"
          opacity="0.9"
        />
      </g>
      {sparkles.map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 5} V${y + 5} M${x - 5} ${y} H${x + 5}`} stroke={C.teal} strokeWidth="1.6" strokeLinecap="round" className="ill-blink" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
    </Fig>
  );
}

const meridians = [0.94, 0.64, 0.28];
const lats = [-30, 0, 30];

export function FinalGlobe() {
  const gg = iso(150, 168, 26, 18);
  const R = 52;
  const cx = 150;
  const cy = 128;
  return (
    <Fig viewBox="0 0 300 290" bg="bg-transparent">
      <IsoBox faces={gg.box(-0.4, -0.4, 4.4, 4.4, -0.3, 0)} top="#fff" stroke={C.lineStrong} />
      <IsoBox faces={gg.box(1.2, 1.2, 2.8, 2.8, 0, 0.45)} top="#fff" right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <g className="ill-float-2">
        <circle cx={cx} cy={cy} r={R} fill="#fff" stroke={C.lineStrong} strokeWidth="1.5" />
        <g fill="none" stroke={C.tealSoft} strokeWidth="1.3">
          {meridians.map((rx) => (
            <ellipse key={rx} cx={cx} cy={cy} rx={rx * R} ry={R} />
          ))}
          <path d={`M${cx} ${cy - R} V${cy + R}`} />
          {lats.map((l) => (
            <ellipse key={l} cx={cx} cy={cy + l * 1.2} rx={Math.sqrt(R * R - (l * 1.2) ** 2)} ry={7 + Math.abs(l) * 0.05} />
          ))}
        </g>
        <circle cx={cx + 18} cy={cy + 14} r="4.5" fill={C.teal} />
        <circle cx={cx + 18} cy={cy + 14} r="4.5" fill="none" stroke={C.teal} strokeWidth="1.5" className="ill-ping" />
        <ellipse cx={cx} cy={cy} rx="82" ry="22" fill="none" stroke={C.teal} strokeWidth="1.6" strokeDasharray="6 6" transform={`rotate(-18 ${cx} ${cy})`} className="ill-dash" />
      </g>
      <path d={`M${cx} ${cy + R + 6} V${gg.proj(2, 2, 0.45)[1]}`} stroke={C.teal} strokeWidth="1.5" strokeDasharray="4 4" className="ill-dash" />
    </Fig>
  );
}
