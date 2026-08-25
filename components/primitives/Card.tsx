import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-line bg-card shadow-[var(--shadow-card)]",
        hover &&
          "transition-[transform,border-color] duration-200 motion-safe:hover:-translate-y-[3px] motion-safe:hover:border-teal-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}
