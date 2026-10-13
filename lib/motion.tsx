import type { CSSProperties, ReactNode } from "react";

/**
 * Reveal on scroll (designsystem §13): fade + rise, once.
 *
 * Server markup only. Content is rendered fully visible (no JS, no LCP
 * penalty); the shared ScrollEffects client component hides blocks that start
 * below the fold after hydration and eases them in. Reduced motion: never
 * touched. Styles: `.reveal-pending` / `.reveal-in` in app/globals.css.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const style = { "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as CSSProperties;
  return (
    <div data-reveal className={className} style={style}>
      {children}
    </div>
  );
}
