import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border px-[14px] py-[6px] text-[12px] font-medium",
        onDark
          ? "border-white/15 bg-white/5 text-ondark"
          : "border-line bg-card text-ink-2",
        className,
      )}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal" />
      {children}
    </span>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex items-center gap-1 rounded-chip border border-line bg-card px-2 py-[1px] text-[0.92em] font-medium text-ink-2">
      {children}
    </span>
  );
}
