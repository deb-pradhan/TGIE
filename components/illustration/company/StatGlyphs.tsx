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
              <rect x={10 + i * 30} y={16} width="22" height={28} rx="3" fill={C.accent} />
              <path d={`M${15 + i * 30} 24h12`} stroke={C.card} strokeWidth="2" strokeLinecap="round" opacity=".9" />
            </g>
          ))}
        </g>
      )}
      {name === "pcbs" && (
        <g>
          <path d="M4 44H128" stroke={C.lineStrong} strokeWidth="1.5" />
          <path d="M4 40 C24 38 36 32 52 28 S86 16 124 6 V44 H4 Z" fill={C.accentPale} />
          <path d="M4 40 C24 38 36 32 52 28 S86 16 124 6" stroke={C.accent} strokeWidth="2.2" strokeLinecap="round" />
          {[[22, 37.5], [52, 28], [84, 17.5]].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="2.8" fill={C.card} stroke={C.accent} strokeWidth="1.6" />
          ))}
        </g>
      )}
      {name === "iso" && (
        <g>
          <path d="M4 10H128M4 38H128" stroke={C.lineStrong} strokeWidth="1.2" strokeDasharray="4 4" />
          <path d="M4 24H128" stroke={C.accentSoft} strokeWidth="1.2" />
          <path d="M4 25 L20 21 L36 27 L52 22 L68 26 L84 22 L100 25 L116 23" stroke={C.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          {[[20, 21], [52, 22], [84, 22], [116, 23]].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="2.6" fill={C.card} stroke={C.accent} strokeWidth="1.5" />
          ))}
          <circle cx="124" cy="24" r="6" fill={C.accent} />
          <path d="M121 24l2.2 2.4 4-4.6" stroke={C.card} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
      {name === "tonnes" && (
        <g>
          <path d="M4 44H128" stroke={C.lineStrong} strokeWidth="1.5" />
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={5 + i * 10.4} y={12} width="7" height={32} rx="2" fill={C.accentSoft} opacity={0.6} />
          ))}
        </g>
      )}
    </svg>
  );
}
