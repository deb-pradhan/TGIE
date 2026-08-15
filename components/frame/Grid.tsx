import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The reference grid: lighter cells laid on a darker canvas with ~2px seams.
 * No area of canvas is left open — narrow EMPTY edge-column cells flank every
 * content row, and spacer strips are cells too. The seams read as hairlines;
 * diamonds emerge where rounded corners meet. Nothing is drawn.
 */

export const GAP = 2; // px — the hairline seam

/* ---------------- Cell ---------------- */
/** A light, borderless cell on the canvas. Subtle 6px corners. */
export function Cell({
  children,
  className,
  id,
}: {
  children?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={cn("relative rounded-[6px] bg-cell", className)}>
      {children}
    </div>
  );
}

/* ---------------- FrameBlock ---------------- */
/**
 * A content row of the collage. The centered content column is flanked by
 * edge cells that stretch all the way to the SCREEN edges — no canvas is
 * ever exposed except in the seams. `full` = children span the whole width.
 */
export function FrameBlock({
  children,
  id,
  className,
  full = false,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  full?: boolean;
}) {
  if (full) {
    return (
      <div id={id} className={cn("relative", className)}>
        {children}
      </div>
    );
  }
  return (
    <div id={id} className={cn("relative", className)}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `minmax(14px,1fr) min(var(--maxw), calc(100% - 28px - ${GAP * 2}px)) minmax(14px,1fr)`,
          gap: GAP,
        }}
      >
        <div aria-hidden className="rounded-[6px] bg-cell" />
        <div className="min-w-0">{children}</div>
        <div aria-hidden className="rounded-[6px] bg-cell" />
      </div>
    </div>
  );
}

/* ---------------- GapStrip ---------------- */
/** Thin empty spacer strip between content rows — one plain cell. */
export function GapStrip({ h = 16 }: { h?: number }) {
  return (
    <FrameBlock>
      <div className="rounded-[4px] bg-cell" style={{ height: h }} />
    </FrameBlock>
  );
}

/* ---------------- DottedStrip ---------------- */
/** Spacer strip cell carrying the dotted spec-sheet texture inside it. */
export function DottedStrip() {
  return (
    <FrameBlock>
      <div className="dots h-8 rounded-[4px] bg-cell opacity-90" />
    </FrameBlock>
  );
}
