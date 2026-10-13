import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Wraps an illustration so its CSS animations (.ill-*) only run while it is
 * on screen (design system §13 off-screen pause). Server markup only: the
 * shared ScrollEffects observer flips data-live. Reduced motion is handled in
 * globals.css.
 */
export function Live({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-live="false" className={cn("relative h-full w-full", className)}>
      {children}
    </div>
  );
}
