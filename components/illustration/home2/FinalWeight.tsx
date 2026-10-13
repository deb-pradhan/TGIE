import { C, IsoBox } from "../kit";
import { Fig, Txt } from "./Fig";
import { iso } from "./geo";

/**
 * Final CTA — isometric register, ONE scene.
 * Four pillar columns (A to D, each a stack of tiles) carry a platform; on it
 * sits the world (wireframe globe) with an orbit ring and a small idea-cube
 * riding the ring: the weight we carry, the reach it gives you.
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
const R = 44; // globe radius
const MERIDIANS = [0.94, 0.64, 0.28];
const LATS = [-30, 0, 30];

export function FinalScene() {
  const [cx, cy0] = proj(2, 2, TOP + 0.4); // centre of the platform's top surface
  const cy = cy0 - R + 2; // globe centre, resting on the platform
  const sparkles = [proj(0.5, 1.0, 4.4), proj(3.7, 2.6, 4.6), proj(0.8, 3.4, 3.8)];

  return (
    <Fig viewBox="0 0 300 290" bg="bg-transparent">
      <defs>
        <radialGradient id="fin-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={C.accent} stopOpacity="0.22" />
          <stop offset="1" stopColor={C.accent} stopOpacity="0" />
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
              <Txt x={p.x + W / 2} y={1.75} size={0.62} anchor="middle" fill={C.accentDeep} weight={500}>
                {p.L}
              </Txt>
            </g>
          </g>
        ))}
      {/* platform */}
      <IsoBox faces={box(-0.15, -0.15, 4.15, 4.15, TOP, TOP + 0.4)} top="#fff" right={C.faceR} front={C.faceL} stroke={C.lineStrong} />

      {/* glow + globe + orbiting idea-cube */}
      <circle cx={cx} cy={cy} r="62" fill="url(#fin-glow)" className="ill-pulse" />
      <ellipse cx={cx} cy={cy0 + 1} rx="30" ry="8" fill={C.ink} opacity="0.12" />
      <g className="ill-float">
        <circle cx={cx} cy={cy} r={R} fill="#fff" stroke={C.lineStrong} strokeWidth="1.5" />
        <g fill="none" stroke={C.accentSoft} strokeWidth="1.3">
          {MERIDIANS.map((rx) => (
            <ellipse key={rx} cx={cx} cy={cy} rx={rx * R} ry={R} />
          ))}
          <path d={`M${cx} ${cy - R} V${cy + R}`} />
          {LATS.map((l) => (
            <ellipse key={l} cx={cx} cy={cy + l * 1.1} rx={Math.sqrt(R * R - (l * 1.1) ** 2)} ry={6 + Math.abs(l) * 0.05} />
          ))}
        </g>
        <circle cx={cx + 14} cy={cy + 12} r="4.2" fill={C.accent} />
        <circle cx={cx + 14} cy={cy + 12} r="4.2" fill="none" stroke={C.accent} strokeWidth="1.5" className="ill-ping" />
        <ellipse
          cx={cx}
          cy={cy}
          rx="80"
          ry="21"
          fill="none"
          stroke={C.accent}
          strokeWidth="1.6"
          strokeDasharray="6 6"
          transform={`rotate(-18 ${cx} ${cy})`}
          className="ill-dash"
        />
        {/* idea-cube riding the orbit */}
        <g transform={`translate(${cx + 76} ${cy - 17})`}>
          <g className="ill-float-2">
            <path d="M0 -9 L11 -3.5 L0 2 L-11 -3.5 Z" fill={C.accentSoft} stroke={C.accentDeep} strokeWidth="1" strokeLinejoin="round" />
            <path d="M-11 -3.5 L0 2 L0 14 L-11 8 Z" fill={C.accent} stroke={C.accentDeep} strokeWidth="1" strokeLinejoin="round" />
            <path d="M11 -3.5 L0 2 L0 14 L11 8 Z" fill={C.accentDeep} stroke={C.accentDeep} strokeWidth="1" strokeLinejoin="round" />
          </g>
        </g>
      </g>
      {sparkles.map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 5} V${y + 5} M${x - 5} ${y} H${x + 5}`} stroke={C.accent} strokeWidth="1.6" strokeLinecap="round" className="ill-blink" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
    </Fig>
  );
}
