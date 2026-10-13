import { cn } from "@/lib/cn";

/**
 * TGIE "Cell T" mark: a T cut from the collage cells (the brand's own
 * construction), stem cell in accent; ghost cells show the grid it was cut from.
 * 64-unit grid, 19-unit cells on a 3.5 seam, so it stays crisp at 16px.
 *
 * Alternate concept kept for reference/swap: <LogoMarkEmbodied> (a PCB-trace T
 * drilling into an isometric block). Not used by default.
 */
type Variant = "light" | "dark";

const INK: Record<Variant, { main: string; accent: string }> = {
  light: { main: "#1c1f1e", accent: "#e2561f" },
  dark: { main: "#f1f2f0", accent: "#ffa36c" },
};

export function LogoMark({
  size = 28,
  variant = "light",
  dark,
  className,
}: {
  size?: number;
  variant?: Variant;
  /** back-compat alias for variant="dark" */
  dark?: boolean;
  className?: string;
}) {
  const { main, accent } = INK[dark ? "dark" : variant];
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 64 64" className={cn("shrink-0", className)}>
      <g fill={main} opacity=".16">
        <rect x="0" y="22.5" width="19" height="19" rx="4.5" />
        <rect x="45" y="22.5" width="19" height="19" rx="4.5" />
        <rect x="0" y="45" width="19" height="19" rx="4.5" />
        <rect x="45" y="45" width="19" height="19" rx="4.5" />
      </g>
      <g fill={main}>
        <rect x="0" y="0" width="19" height="19" rx="4.5" />
        <rect x="22.5" y="0" width="19" height="19" rx="4.5" />
        <rect x="45" y="0" width="19" height="19" rx="4.5" />
        <rect x="22.5" y="22.5" width="19" height="19" rx="4.5" />
      </g>
      <rect x="22.5" y="45" width="19" height="19" rx="4.5" fill={accent} />
    </svg>
  );
}

/**
 * Mark + "TGIE" wordmark (Space Mono bold: the one sanctioned bold).
 * `variant="light"` = on paper/cell, `"dark"` = on graphite.
 * `lockup` adds "The Great Indian Engineers" beneath at a larger mark size.
 */
export function Logo({
  variant = "light",
  dark,
  size = 28,
  lockup = false,
  className,
}: {
  variant?: Variant;
  dark?: boolean;
  size?: number;
  lockup?: boolean;
  className?: string;
}) {
  const v: Variant = dark ? "dark" : variant;
  const onDark = v === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={lockup ? Math.round(size * 1.45) : size} variant={v} />
      <span className="flex flex-col leading-none">
        <span
          className={cn("font-mono font-bold tracking-tight", onDark ? "text-white" : "text-ink")}
          style={{ fontSize: Math.round(size * (lockup ? 0.7 : 0.62)) }}
        >
          TGIE
        </span>
        {lockup && (
          <span
            className={cn(
              "mt-1.5 font-mono text-[11px] font-normal uppercase tracking-[0.16em]",
              onDark ? "text-ondark-mut" : "text-muted",
            )}
          >
            The Great Indian Engineers
          </span>
        )}
      </span>
    </span>
  );
}

/** Alternate mark: a PCB-trace T whose stem drills through a via into an isometric block. */
export function LogoMarkEmbodied({
  size = 28,
  variant = "light",
  className,
}: {
  size?: number;
  variant?: Variant;
  className?: string;
}) {
  const tile = variant === "dark" ? "#111312" : "#1c1f1e";
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 32 32" className={cn("shrink-0", className)}>
      <rect width="32" height="32" rx="8" fill={tile} />
      <path d="M7.2 8.4h17.6M16 8.4v6.2" stroke="#fafaf8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M16 13.6 22.3 16.8 16 20 9.7 16.8z" fill="#ffa36c" />
      <path d="M9.7 16.8 16 20v7L9.7 23.8z" fill="#e2561f" />
      <path d="M22.3 16.8 16 20v7l6.3-3.2z" fill="#c24512" />
      <circle cx="16" cy="16.8" r="1.35" fill={tile} />
    </svg>
  );
}
