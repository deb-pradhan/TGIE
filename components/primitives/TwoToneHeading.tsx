import { cn } from "@/lib/cn";

type As = "h1" | "h2" | "h3";

const sizeFor: Record<As, string> = {
  h1: "text-hero",
  h2: "text-h2",
  h3: "text-h3",
};

/**
 * The signature two-tone heading: line 1 in ink, line 2 in muted.
 * Enforces weight 500 (design system §3.4).
 */
export function TwoToneHeading({
  line1,
  line2,
  as = "h2",
  onDark = false,
  className,
  align = "left",
}: {
  line1: string;
  line2?: string;
  as?: As;
  onDark?: boolean;
  className?: string;
  align?: "left" | "center";
}) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        sizeFor[as],
        "font-mono font-medium leading-[1.18] tracking-tight",
        onDark ? "text-ondark" : "text-ink",
        align === "center" && "text-center",
        className,
      )}
    >
      {line1}
      {line2 && (
        <>
          <br />
          <span className={onDark ? "text-ondark-mut" : "text-muted"}>{line2}</span>
        </>
      )}
    </Tag>
  );
}
