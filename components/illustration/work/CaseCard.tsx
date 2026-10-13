import { Cell } from "@/components/frame/Grid";
import { cn } from "@/lib/cn";
import type { Pillar } from "@/content/pages";
import { Vignette, type VignetteId } from "./Vignettes";

const ALL: Pillar[] = ["A", "B", "C", "D"];

/** Mono strip: "Pillars A + B" with four dots, filled for the pillars involved. */
export function PillarStrip({ pillars, className }: { pillars: Pillar[]; className?: string }) {
  const label = `${pillars.length > 1 ? "Pillars" : "Pillar"} ${pillars.join(" + ")}`;
  return (
    <div className={cn("flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-2", className)}>
      <span>{label}</span>
      <span className="flex items-center gap-1.5" role="img" aria-label={`${label} of four pillars`}>
        {ALL.map((p) => (
          <span
            key={p}
            aria-hidden
            className={cn(
              "grid h-[14px] w-[14px] place-items-center rounded-full border text-[8px] leading-none",
              pillars.includes(p) ? "border-teal bg-teal text-white" : "border-line-strong bg-transparent text-muted",
            )}
          >
            {p}
          </span>
        ))}
      </span>
    </div>
  );
}

export function CaseCard({
  id,
  tag,
  title,
  note,
  pillars,
}: {
  id: VignetteId;
  tag: string;
  title: string;
  note: string;
  pillars: Pillar[];
}) {
  return (
    <Cell className="group flex flex-col overflow-hidden transition-colors duration-200 hover:bg-card">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Vignette id={id} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-chip border border-line bg-card px-2.5 py-[3px] font-mono text-[11px] uppercase tracking-[0.12em] text-teal-deep">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
          {tag}
        </span>
        <h3 className="mt-4 font-mono text-[16px] font-medium leading-snug tracking-tight text-ink">{title}</h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{note}</p>
        <PillarStrip pillars={pillars} className="mt-auto border-t border-line pt-4" />
      </div>
    </Cell>
  );
}
