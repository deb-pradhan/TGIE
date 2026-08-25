import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "onDark" | "outlineDark";

const base =
  "inline-flex items-center gap-2 rounded-btn font-medium text-[14.5px] transition-[transform,background-color,border-color,box-shadow] duration-150 will-change-transform focus-visible:outline-2 focus-visible:outline-teal active:translate-y-0 active:scale-[0.985] motion-safe:active:duration-[80ms]";

const sizes = {
  md: "px-[22px] py-3",
  sm: "px-4 py-2 text-[13.5px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-inkbtn text-white shadow-[var(--shadow-btn)] hover:-translate-y-px border border-transparent",
  ghost:
    "bg-transparent text-ink border border-line hover:border-ink",
  onDark: "bg-white text-forest-deep hover:bg-paper border border-transparent",
  outlineDark:
    "bg-transparent text-ondark border border-white/30 hover:border-white",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </a>
  );
}
