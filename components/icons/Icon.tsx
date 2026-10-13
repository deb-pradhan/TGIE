import type { SVGProps } from "react";
import { glyphs } from "./glyphs";
import { cn } from "@/lib/cn";

/**
 * TGIE icon registry. One 24×24 line-icon family (1.7px stroke, round joins).
 * The NAMES below are a contract used across the site: add new icons, never
 * rename. Glyph art lives in ./glyphs.tsx.
 */
export const ICON_NAMES = [
  // pillars
  "engineering", "products", "enablement", "fabrication",
  // engineering subs
  "pcb", "enclosure", "firmware", "edge-ai", "dashboard", "small-batch",
  // products subs
  "industrial-enclosure", "kinetic", "automotive", "miniature", "retail",
  // enablement subs
  "branding", "incorporation", "funding", "audit", "leads", "operations",
  // fabrication subs
  "accountability", "welding", "partners", "quality",
  // lab / equipment
  "oscilloscope", "solder", "printer", "laser", "press-brake",
  // ownership
  "cad", "bom", "source-code", "publish", "unlock",
  // lifecycle
  "discover", "design", "build", "handover",
  // audiences
  "scholar", "founder", "oem",
  // principles / misc
  "form", "weight", "vision", "shield", "certificate", "globe", "spark", "handshake", "flask", "rocket", "gear",
  // ui
  "arrow-right", "arrow-up-right", "check", "plus", "mail", "pin", "phone", "download", "calendar", "menu", "close", "chevron-down",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export function Icon({
  name,
  size = 20,
  className,
  ...rest
}: { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      {...rest}
    >
      {glyphs[name]}
    </svg>
  );
}

const badgeTones = {
  accentPale: "bg-accent-pale text-accent-deep",
  ink: "bg-inkbtn text-accent-soft",
  graphite: "bg-graphite text-accent-soft",
} as const;

/** Rounded-square icon badge used across feature rows (44px by default). */
export function IconBadge({
  name,
  tone = "accentPale",
  size = 44,
  className,
}: {
  name: IconName;
  tone?: keyof typeof badgeTones;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("grid shrink-0 place-items-center rounded-[10px]", badgeTones[tone], className)}
      style={{ width: size, height: size }}
    >
      <Icon name={name} size={Math.round(size * 0.5)} />
    </span>
  );
}
