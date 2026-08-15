import { cn } from "@/lib/cn";

/**
 * Editorial "engraved / intaglio" texture, built from fine hatch lines.
 * Monochrome only — never colorized (design system §7.2). Decorative.
 */
export function EngravedFigure({ className }: { className?: string }) {
  const lines = Array.from({ length: 26 });
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
          <radialGradient id="engFade" cx="50%" cy="45%" r="60%">
            <stop offset="0" stopColor="#3b3a35" />
            <stop offset="1" stopColor="#8a8a82" />
          </radialGradient>
          <clipPath id="engClip">
            <ellipse cx="150" cy="140" rx="128" ry="128" />
          </clipPath>
        </defs>
        <g clipPath="url(#engClip)" stroke="url(#engFade)" strokeWidth="1" fill="none" opacity="0.85">
          {lines.map((_, i) => {
            const y = 12 + i * 11;
            const amp = 10 + (i % 5) * 4;
            return (
              <path
                key={i}
                d={`M0 ${y} Q75 ${y - amp} 150 ${y} T300 ${y}`}
              />
            );
          })}
          {/* iris suggestion */}
          <circle cx="150" cy="150" r="34" stroke="#2b2a26" strokeWidth="1.2" />
          <circle cx="150" cy="150" r="16" stroke="#2b2a26" strokeWidth="1.2" />
        </g>
      </svg>
    </div>
  );
}
