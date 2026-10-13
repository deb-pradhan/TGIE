import { C } from "../kit";
import { Fig } from "./Fig";

/**
 * Case study — engraved line-art register (monochrome, never colourised).
 * A shank-mounted gait sensor on a strap, with leader callouts and a small
 * gyro trace plate: the hardware behind the thesis dataset.
 */
const INK = C.ink;
const INK2 = C.ink2;
const mono = "var(--font-mono), monospace";

const lerp = (pts: [number, number][], y: number) => {
  for (let i = 0; i < pts.length - 1; i++) {
    const [y0, x0] = pts[i];
    const [y1, x1] = pts[i + 1];
    if (y >= y0 && y <= y1) return x0 + ((x1 - x0) * (y - y0)) / (y1 - y0);
  }
  return pts[pts.length - 1][1];
};
// [y, x] samples of the two contours of the shank
const FRONT: [number, number][] = [[20, 268], [60, 273], [120, 264], [200, 258], [260, 255], [300, 252]];
const BACK: [number, number][] = [[20, 190], [60, 182], [110, 174], [160, 172], [210, 186], [250, 204], [300, 214]];
const fx = (y: number) => lerp(FRONT, y);
const bx = (y: number) => lerp(BACK, y);

const ys = Array.from({ length: 29 }, (_, i) => 20 + i * 10);
const outline =
  "M" + ys.map((y) => `${fx(y).toFixed(1)} ${y}`).join(" L") +
  " C 256 318 272 324 302 330 C 336 336 362 346 362 364 L 360 372 L 168 372 L 166 350 C 168 336 196 322 " +
  ys.slice().reverse().map((y) => `${bx(y).toFixed(1)} ${y}`).join(" L");
const legPath = outline + " Z";

const hatch = Array.from({ length: 14 }, (_, i) => {
  const t = i / 13;
  const d = "M" + ys.map((y) => `${(bx(y) + t * (fx(y) - bx(y))).toFixed(1)} ${y}`).join(" L");
  return { d, t };
});
const diag = Array.from({ length: 30 }, (_, i) => i);

const SY0 = 146, SY1 = 190;
const mid = (y: number) => (bx(y) + fx(y)) / 2;
const strap =
  `M${bx(SY0)} ${SY0} Q${mid(SY0)} ${SY0 + 16} ${fx(SY0)} ${SY0} L${fx(SY1)} ${SY1} Q${mid(SY1)} ${SY1 + 16} ${bx(SY1)} ${SY1} Z`;

// gyro trace
const trace = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 90; i++) {
    const t = i / 90;
    const y = 96 - 34 * Math.sin(t * Math.PI * 6) * Math.exp(-0.6 * Math.sin(t * Math.PI * 3) ** 2) + 8 * Math.sin(t * Math.PI * 12);
    pts.push(`${(334 + t * 150).toFixed(1)} ${y.toFixed(1)}`);
  }
  return "M" + pts.join(" L");
})();

export function CaseGait() {
  return (
    <Fig viewBox="0 0 520 460" bg="bg-paper-2">
      <defs>
        <clipPath id="gait-leg">
          <path d={legPath} />
        </clipPath>
        <clipPath id="gait-shade">
          <path d={`M${bx(20) - 4} 10 H${bx(20) + 34} L ${bx(300) + 40} 380 H${bx(300) - 50} Z`} />
        </clipPath>
        <pattern id="gait-strap" width="3.4" height="6" patternUnits="userSpaceOnUse">
          <path d="M1.2 0 V6" stroke={INK2} strokeWidth="0.9" />
        </pattern>
        <pattern id="gait-chip" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 V4" stroke={INK} strokeWidth="1" />
        </pattern>
      </defs>

      {/* plate frame */}
      <rect x="16" y="16" width="488" height="428" rx="3" fill="none" stroke={INK2} strokeWidth="1.2" />
      <rect x="22" y="22" width="476" height="416" rx="2" fill="none" stroke={C.muted} strokeWidth="0.7" />

      {/* ground hatch */}
      <g stroke={C.muted} strokeWidth="0.8">
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M${150 - i * 6} ${388 + i * 5} H${380 + i * 8}`} opacity={1 - i * 0.13} />
        ))}
      </g>

      {/* leg: engraved contour hatching */}
      <g clipPath="url(#gait-leg)">
        <rect x="150" y="10" width="240" height="380" fill={C.cell} />
        {hatch.map(({ d, t }, i) =>
          t > 0.72 && i % 2 ? null : (
            <path key={i} d={d} fill="none" stroke={INK2} strokeWidth={0.5 + (1 - t) * 1.0} opacity={0.85 - t * 0.3} />
          ),
        )}
        <g fill="none" stroke={INK2} strokeWidth="0.7" opacity="0.55">
          {Array.from({ length: 20 }, (_, i) => 34 + i * 14).filter((y) => y < SY0 - 4 || y > SY1 + 14).map((y) => (
            <path key={y} d={`M${bx(y)} ${y} Q${mid(y)} ${y + 10} ${fx(y)} ${y}`} />
          ))}
        </g>
        <g clipPath="url(#gait-shade)">
          {diag.map((i) => (
            <path key={i} d={`M120 ${10 + i * 9} L ${320} ${10 + i * 9 - 200}`} stroke={INK} strokeWidth="0.6" opacity="0.55" />
          ))}
        </g>
        {/* shoe */}
        <g stroke={INK2} strokeWidth="0.9">
          {Array.from({ length: 22 }, (_, i) => (
            <path key={i} d={`M${170 + i * 9} 372 l-5 12`} />
          ))}
        </g>
      </g>
      <path d={outline} fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M166 372 H362 M164 386 H360 L362 372 M166 372 L164 386" fill="none" stroke={INK} strokeWidth="1.6" />
      {/* sectional break at the top */}
      <path d={`M${bx(20) - 6} 20 l10 -6 l12 8 l12 -8 l12 8 l12 -8 l12 8 l12 -8 l12 8 l8 -4`} fill="none" stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />

      {/* strap */}
      <path d={strap} fill={C.cell} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <path d={strap} fill="url(#gait-strap)" opacity="0.85" />
      <rect x={fx(168) - 20} y="150" width="26" height="34" rx="3" fill={C.cell} stroke={INK} strokeWidth="1.4" />
      <path d={`M${fx(168) - 14} 158 H${fx(168) - 2} M${fx(168) - 14} 166 H${fx(168) - 2} M${fx(168) - 14} 174 H${fx(168) - 2}`} stroke={INK2} strokeWidth="1" />

      {/* sensor module */}
      <g transform="translate(227 178) scale(1.3) translate(-227 -178)">
        <rect x="205" y="152" width="44" height="52" rx="5" fill={C.cell} stroke={INK} strokeWidth="1.8" />
        <rect x="209" y="156" width="44" height="52" rx="5" fill="none" stroke={INK2} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7" />
        <rect x="213" y="162" width="28" height="22" rx="2" fill="url(#gait-chip)" stroke={INK} strokeWidth="1.2" />
        <path d="M216 158 v4 M222 158 v4 M228 158 v4 M234 158 v4 M240 158 v4 M216 184 v4 M222 184 v4 M228 184 v4 M234 184 v4 M240 184 v4" stroke={INK} strokeWidth="1" />
        <path d="M213 194 h12 M229 194 h6 M213 198 h22" stroke={INK2} strokeWidth="1" />
        <circle cx="241" cy="196" r="2.4" fill={INK} />
      </g>
      {/* axes triad */}
      <g stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M258 146 L304 146 M298 142 l6 4 l-6 4" />
        <path d="M258 146 L258 100 M254 106 l4 -6 l4 6" />
        <path d="M258 146 L286 124 M278 124 l8 0 l-3 8" />
      </g>
      <g fontSize="12" fill={INK} fontFamily={mono}>
        <text x="308" y="150">x</text>
        <text x="254" y="94">y</text>
        <text x="290" y="122">z</text>
      </g>

      {/* callouts */}
      <g fill="none" stroke={INK2} strokeWidth="1">
        <path d="M256 200 L318 236 H356" />
        <path d={`M${fx(180) - 3} 182 L 318 276 H356`} />
        <path d="M184 366 H168" />
      </g>
      <g fill={INK}>
        <circle cx="256" cy="200" r="2.6" />
        <circle cx={fx(180) - 3} cy="182" r="2.6" />
        <circle cx="184" cy="366" r="2.6" />
      </g>
      <g fontFamily={mono} fontSize="15" fill={INK2}>
        <text x="362" y="238">01 IMU module</text>
        <text x="362" y="282">02 Strap</text>
        <text x="34" y="372">03 Heel switch</text>
      </g>

      {/* gyro plate */}
      <rect x="322" y="52" width="176" height="106" fill={C.cell} stroke={INK2} strokeWidth="1.1" />
      <g stroke={C.muted} strokeWidth="0.7">
        {[72, 96, 120, 144].map((y) => (
          <path key={y} d={`M326 ${y} H494`} />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${334 + i * 30} 56 V150`} />
        ))}
      </g>
      <path d={trace} fill="none" stroke={INK} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <g fill={INK}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${352 + i * 50} 146 l-4 -7 h8 z`} />
        ))}
      </g>
      <g className="ill-scan">
        <path d="M410 56 V150" stroke={INK} strokeWidth="1" strokeDasharray="3 3" />
      </g>
      <text x="326" y="46" fontSize="13" fill={INK2} fontFamily={mono} letterSpacing="1">GYRO · SHANK</text>
      <text x="494" y="173" textAnchor="end" fontSize="13" fill={C.muted} fontFamily={mono}>heel strike</text>

    </Fig>
  );
}
