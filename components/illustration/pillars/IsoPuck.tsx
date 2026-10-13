import { Icon, type IconName } from "@/components/icons/Icon";
import { C } from "../kit";
import { cn } from "@/lib/cn";

/**
 * White iso puck with a teal line icon lying on its top face (the house
 * "isometric" register, designsystem §11.1). `PuckG` is a <g> to compose into
 * larger scenes; `IsoPuck` is a standalone, responsive wrapper.
 */
export function PuckG({
  cx, cy, s = 1, icon, tone = "white", className,
}: {
  cx: number; cy: number; s?: number; icon?: IconName; tone?: "white" | "mint"; className?: string;
}) {
  const w = 52 * s, h = 26 * s, d = 11 * s;
  const top = tone === "mint" ? C.mint : C.card;
  return (
    <g className={className}>
      <ellipse cx={cx + 6 * s} cy={cy + h + d + 4 * s} rx={w * 0.8} ry={h * 0.45} fill={C.ink} opacity={0.05} />
      <path d={`M${cx - w} ${cy}L${cx} ${cy + h}V${cy + h + d}L${cx - w} ${cy + d}Z`} fill={C.faceL} />
      <path d={`M${cx + w} ${cy}L${cx} ${cy + h}V${cy + h + d}L${cx + w} ${cy + d}Z`} fill={C.faceR} />
      <path d={`M${cx} ${cy - h}L${cx + w} ${cy}L${cx} ${cy + h}L${cx - w} ${cy}Z`} fill={top} stroke={C.lineStrong} strokeWidth={1} strokeLinejoin="round" />
      {icon && (
        <g transform={`translate(${cx} ${cy}) matrix(1 .5 -1 .5 0 0) scale(${1.3 * s}) translate(-12 -12)`} style={{ color: "var(--color-teal-deep)" }}>
          <Icon name={icon} size={24} x={0} y={0} />
        </g>
      )}
    </g>
  );
}

export function IsoPuck({ icon, className, tone }: { icon: IconName; className?: string; tone?: "white" | "mint" }) {
  return (
    <svg viewBox="0 0 120 96" className={cn("h-auto w-full", className)} aria-hidden>
      <PuckG cx={60} cy={38} icon={icon} tone={tone} />
    </svg>
  );
}
