import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Live } from "../Live";

/**
 * Lightweight illustration frame: fills its parent, animations gated by <Live>.
 * `bg` is any tailwind background class (the cell/card the art sits on).
 */
export function Fig({
  viewBox,
  label,
  children,
  bg = "bg-card-soft",
  cover = false,
  className,
}: {
  viewBox: string;
  label?: string;
  children: ReactNode;
  bg?: string;
  cover?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", bg, className)}>
      <Live>
        <svg
          viewBox={viewBox}
          preserveAspectRatio={cover ? "xMidYMid slice" : "xMidYMid meet"}
          className="absolute inset-0 h-full w-full"
          role={label ? "img" : undefined}
          aria-label={label}
          aria-hidden={label ? undefined : true}
        >
          {children}
        </svg>
      </Live>
    </div>
  );
}

export const NS = { vectorEffect: "non-scaling-stroke" } as const;

/**
 * SVG text for use inside an iso-plane group (units = world units). Browsers
 * mangle glyph spacing at sub-pixel font sizes, so the text is authored at
 * 100x and scaled back down.
 */
export function Txt({
  x,
  y,
  size,
  anchor = "start",
  fill,
  ls = 0,
  weight,
  mono = true,
  children,
}: {
  x: number;
  y: number;
  size: number;
  anchor?: "start" | "middle" | "end";
  fill: string;
  ls?: number;
  weight?: number;
  mono?: boolean;
  children: ReactNode;
}) {
  return (
    <text
      transform={`translate(${x} ${y}) scale(0.01)`}
      fontSize={size * 100}
      letterSpacing={ls * 100}
      textAnchor={anchor}
      fill={fill}
      fontWeight={weight}
      fontFamily={mono ? "var(--font-mono), monospace" : undefined}
    >
      {children}
    </text>
  );
}
