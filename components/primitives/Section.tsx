import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { FrameBlock, Cell } from "@/components/frame/Grid";

type Tone = "paper" | "paper2" | "forest" | "forestDeep";

export function Section({
  children,
  id,
  tone = "paper",
  flush = false,
  className,
  containerClassName,
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  flush?: boolean;
  className?: string;
  containerClassName?: string;
}) {
  // Dark tones span the full frame width as one dark cell
  if (tone === "forest" || tone === "forestDeep") {
    return (
      <FrameBlock id={id} full className={className}>
        <div
          className={cn(
            "rounded-[6px] text-ondark",
            tone === "forest" ? "bg-forest" : "bg-forest-deep",
          )}
        >
          <div className={cn("px-[var(--gutter)]", !flush && "section-y", containerClassName)}>
            {children}
          </div>
        </div>
      </FrameBlock>
    );
  }

  // Light sections: content cell flanked by empty edge cells
  return (
    <FrameBlock id={id} className={className}>
      <Cell>
        <div className={cn("px-[var(--gutter)]", !flush && "section-y", containerClassName)}>
          {children}
        </div>
      </Cell>
    </FrameBlock>
  );
}
