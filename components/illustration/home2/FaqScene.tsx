import { C, IsoBox } from "../kit";
import { Fig, Txt } from "./Fig";
import { iso } from "./geo";

/**
 * FAQ — isometric register.
 * A fanned stack of answer cards on a desk; a big "?" bubble floats over it and
 * an "answered" bubble comes back along a dashed path. Topic chips (the real FAQ
 * subjects) hang off the stack, a magnifier lies on the desk and a typing tile
 * blinks beside it.
 */
const g = iso(212, 142, 28, 19);
const { box, proj } = g;

const CARDS = [
  { x0: 1.5, y0: 1.2, z0: 0, z1: 0.5 },
  { x0: 1.1, y0: 0.8, z0: 0.55, z1: 1.05 },
  { x0: 0.7, y0: 0.4, z0: 1.1, z1: 1.6 },
];
const CW = 2.4; // card width (x)
const CD = 1.9; // card depth (y)
const TOP = CARDS[2].z1;

const CHIPS: { x: number; y: number; t: string; to: [number, number] }[] = [
  { x: 10, y: 40, t: "IP ownership", to: [196, 92] },
  { x: 160, y: 8, t: "Four pillars", to: [216, 58] },
  { x: 6, y: 262, t: "Incorporation", to: [118, 214] },
  { x: 300, y: 272, t: "Fabrication", to: [318, 238] },
];

function Chip({ x, y, t }: { x: number; y: number; t: string }) {
  const w = Math.round(t.length * 6.6 + 30);
  return (
    <g>
      <rect x={x} y={y} width={w} height={24} rx={12} fill="#fff" stroke={C.lineStrong} />
      <circle cx={x + 12} cy={y + 12} r={3.2} fill={C.accent} />
      <Txt x={x + 22} y={y + 15.6} size={11} fill={C.ink2} weight={500}>
        {t}
      </Txt>
    </g>
  );
}

export function FaqScene() {
  const topCard = CARDS[2];
  const qTail = proj(2.4, 1.9, TOP + 0.05);
  const bars = [0.52, 0.8, 0.66];

  return (
    <Fig viewBox="0 0 420 330" bg="bg-transparent">
      {/* desk */}
      <IsoBox faces={box(-0.4, -0.2, 5.4, 4.6, -0.32, 0)} top="#fff" right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />

      {/* chip leader lines (under everything else) */}
      {CHIPS.map((c) => {
        const w = Math.round(c.t.length * 6.6 + 30);
        const cx = c.x + w / 2;
        const cy = c.y < 100 ? c.y + 24 : c.y;
        return (
          <path
            key={c.t}
            d={`M${cx} ${cy} L${c.to[0]} ${c.to[1]}`}
            stroke={C.lineStrong}
            strokeWidth="1.2"
            strokeDasharray="2 4"
            fill="none"
          />
        );
      })}

      {/* magnifier on the desk (left-front) */}
      <g transform={g.top(0.02)} className="ill-ns">
        <circle cx={0.55} cy={2.55} r={0.55} fill="#fff" fillOpacity="0.7" stroke={C.ink2} strokeWidth="2.4" />
        <path d="M0.95 2.95 L1.55 3.55" stroke={C.ink2} strokeWidth="4.2" strokeLinecap="round" />
        <path d="M0.35 2.35 A0.4 0.4 0 0 1 0.7 2.1" stroke={C.accent} strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>

      {/* typing tile (right-front) */}
      <IsoBox faces={box(3.9, 2.9, 4.9, 4.2, 0, 0.34)} top="#fff" right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
      <g transform={g.top(0.34)}>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={4.4} cy={3.25 + i * 0.32} r={0.1} fill={C.accent} className="ill-blink" style={{ animationDelay: `${i * 0.3}s` }} />
        ))}
      </g>

      {/* fanned answer cards, back to front */}
      {CARDS.map((c, i) => (
        <g key={i}>
          <IsoBox
            faces={box(c.x0, c.y0, c.x0 + CW, c.y0 + CD, c.z0, c.z1)}
            top="#fff"
            right={C.faceDark}
            front={i === 2 ? C.faceL : C.faceR}
            stroke={i === 2 ? C.accent : C.lineStrong}
            strokeWidth={i === 2 ? 1.4 : 1}
          />
          {/* orange spine tab on the lower cards */}
          {i < 2 && (
            <g transform={g.top(c.z1)}>
              <rect x={c.x0 + CW - 0.5} y={c.y0 + 0.18} width={0.38} height={0.5} rx={0.06} fill={C.accentSoft} />
            </g>
          )}
        </g>
      ))}

      {/* content printed on the top card */}
      <g transform={g.top(TOP)} className="ill-ns">
        <rect x={topCard.x0 + 0.22} y={topCard.y0 + 0.2} width={0.55} height={0.26} rx={0.05} fill={C.accent} />
        {bars.map((w, i) => (
          <rect key={i} x={topCard.x0 + 0.22} y={topCard.y0 + 0.62 + i * 0.3} width={(CW - 0.44) * w} height={0.14} rx={0.05} fill={i === 0 ? C.ink2 : C.lineStrong} />
        ))}
        <circle cx={topCard.x0 + CW - 0.42} cy={topCard.y0 + CD - 0.38} r={0.2} fill="none" stroke={C.accentDeep} strokeWidth="1.6" />
        <path d={`M${topCard.x0 + CW - 0.5} ${topCard.y0 + CD - 0.38} l0.07 0.08 l0.15 -0.17`} stroke={C.accentDeep} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* dashed return path: question -> answer */}
      <path d="M277 94 C 300 84, 318 96, 324 116" stroke={C.accent} strokeWidth="1.8" strokeDasharray="5 5" fill="none" className="ill-dash" />

      {/* soft shadow under the floating question */}
      <ellipse cx={qTail[0] + 6} cy={qTail[1] + 4} rx={28} ry={8} fill={C.ink} opacity="0.1" />

      {/* "?" bubble */}
      <g className="ill-float">
        <path d="M193 58 h70 a14 14 0 0 1 14 14 v42 a14 14 0 0 1 -14 14 h-34 l-16 16 v-16 h-20 a14 14 0 0 1 -14 -14 v-42 a14 14 0 0 1 14 -14z" fill={C.accent} stroke={C.accentDeep} strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M195 62 h66" stroke="#fff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
        <Txt x={228} y={110} size={50} anchor="middle" fill="#fff" weight={700}>
          ?
        </Txt>
      </g>

      {/* "answered" bubble */}
      <g transform="translate(22 4)">
        <g className="ill-float-2">
        <path d="M284 112 h72 a12 12 0 0 1 12 12 v34 a12 12 0 0 1 -12 12 h-52 l-14 13 v-13 h-6 a12 12 0 0 1 -12 -12 v-34 a12 12 0 0 1 12 -12z" fill="#fff" stroke={C.lineStrong} strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx={306} cy={138} r={12} fill={C.accentPale} stroke={C.accent} strokeWidth="1.4" />
        <path d="M300.5 138.5 l4 4 l7.5 -8.5" stroke={C.accentDeep} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x={326} y={128} width={30} height={5} rx={2.5} fill={C.ink2} />
        <rect x={326} y={139} width={22} height={5} rx={2.5} fill={C.lineStrong} />
        <rect x={326} y={150} width={27} height={5} rx={2.5} fill={C.lineStrong} />
        </g>
      </g>

      {/* topic chips */}
      {CHIPS.map((c) => (
        <Chip key={c.t} x={c.x} y={c.y} t={c.t} />
      ))}
    </Fig>
  );
}
