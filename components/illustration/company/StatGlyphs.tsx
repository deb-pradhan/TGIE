import { C } from "../kit";

/** Tiny hand-built sparkline pictograms for the four stat tiles (decorative). */
export type StatGlyphName = "pillars" | "pcbs" | "iso" | "tonnes";

export function StatGlyph({ name }: { name: StatGlyphName }) {
  return (
    <svg viewBox="0 0 132 48" className="h-12 w-full max-w-[150px]" aria-hidden fill="none">
      {name === "pillars" && (
        <g>
          <path d="M4 44H128" stroke={C.lineStrong} strokeWidth="1.5" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={10 + i * 30} y={44 - (14 + i * 9)} width="22" height={14 + i * 9} rx="3" fill={i === 3 ? C.teal : C.tealSoft} opacity={i === 3 ? 1 : 0.35 + i * 0.18} />
              <path d={`M${15 + i * 30} ${44 - (14 + i * 9) + 8}h12`} stroke={C.card} strokeWidth="2" strokeLinecap="round" opacity=".9" />
            </g>
          ))}
        </g>
      )}
      {name === "pcbs" && (
        <g>
          <path d="M4 44H128" stroke={C.lineStrong} strokeWidth="1.5" />
          <path d="M4 40 C24 38 36 32 52 28 S86 16 124 6 V44 H4 Z" fill={C.mint} />
          <path d="M4 40 C24 38 36 32 52 28 S86 16 124 6" stroke={C.teal} strokeWidth="2.2" strokeLinecap="round" />
          {[[22, 37.5], [52, 28], [84, 17.5]].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="2.8" fill={C.card} stroke={C.teal} strokeWidth="1.6" />
          ))}
          <circle cx="124" cy="6" r="4.5" fill={C.teal} />
          <circle cx="124" cy="6" r="8" stroke={C.teal} strokeOpacity=".35" strokeWidth="1.2" />
        </g>
      )}
      {name === "iso" && (
        <g>
          <path d="M4 10H128M4 38H128" stroke={C.lineStrong} strokeWidth="1.2" strokeDasharray="4 4" />
          <path d="M4 24H128" stroke={C.tealSoft} strokeWidth="1.2" />
          <path d="M4 25 L20 21 L36 27 L52 22 L68 26 L84 22 L100 25 L116 23" stroke={C.teal} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {[[20, 21], [52, 22], [84, 22], [116, 23]].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="2.6" fill={C.card} stroke={C.teal} strokeWidth="1.5" />
          ))}
          <circle cx="124" cy="24" r="6" fill={C.teal} />
          <path d="M121 24l2.2 2.4 4-4.6" stroke={C.card} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {name === "tonnes" && (
        <g>
          <path d="M4 44H128" stroke={C.lineStrong} strokeWidth="1.5" />
          {[26, 30, 27, 32, 29, 33, 30, 34, 31, 33, 32, 36].map((h, i) => (
            <rect key={i} x={5 + i * 10.4} y={44 - h} width="7" height={h} rx="2" fill={i === 11 ? C.teal : C.tealSoft} opacity={i === 11 ? 1 : 0.45} />
          ))}
          <path d="M4 15H128" stroke={C.teal} strokeWidth="1.2" strokeDasharray="4 4" />
        </g>
      )}
    </svg>
  );
}
