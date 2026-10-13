import { cn } from "@/lib/cn";

/**
 * Editorial "engraved / intaglio" medallion built from fine hatch lines:
 * a shaded disc with an outlined question mark. Monochrome only, never
 * colorized (design system §11.1). Decorative.
 */
const R = 134;
const CX = 150;
const CY = 150;
const rows = Array.from({ length: 36 }, (_, i) => {
  const y = CY - R + 6 + i * 7.2;
  const half = Math.sqrt(Math.max(0, R * R - (y - CY) ** 2));
  const t = (y - (CY - R)) / (2 * R);
  return { y, x0: CX - half, x1: CX + half, w: 0.45 + t * 1.25, sag: 5 + 8 * Math.sin(t * Math.PI) };
});
const Q = "M104 116 C104 78 132 60 152 60 C182 60 198 82 198 106 C198 138 152 142 152 182";

export function EngravedFigure({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-card border border-line bg-paper-2",
        className,
      )}
    >
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full">
        <defs>
          <clipPath id="eng-disc">
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
        </defs>
        <circle cx={CX} cy={CY} r={R + 8} fill="none" stroke="#3b3a35" strokeWidth="1.1" />
        <circle cx={CX} cy={CY} r={R + 13} fill="none" stroke="#9c9a90" strokeWidth="0.6" />
        <g clipPath="url(#eng-disc)" fill="none" stroke="#3b3a35">
          {rows.map((r, i) => (
            <path key={i} d={`M${r.x0 - 4} ${r.y} Q${CX} ${r.y + r.sag} ${r.x1 + 4} ${r.y}`} strokeWidth={r.w} opacity={0.9} />
          ))}
        </g>
        {/* the question mark: ink outline, paper fill, hatch inside */}
        <path d={Q} fill="none" stroke="#1c1b18" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round" />
        <path d={Q} fill="none" stroke="#f5f3ee" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={CX + 2} cy="226" r="21" fill="#1c1b18" />
        <circle cx={CX + 2} cy="226" r="18" fill="#f5f3ee" />
        <g stroke="#3b3a35" strokeWidth="0.8" fill="none" strokeLinecap="round">
          <path d={Q} strokeWidth="30" strokeDasharray="0.8 4.2" opacity="0.7" />
          <path d="M138 226 H168 M140 232 H166 M144 238 H162" />
        </g>
      </svg>
    </div>
  );
}
