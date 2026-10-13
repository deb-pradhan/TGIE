import { FrameBlock, Cell } from "@/components/frame/Grid";
import { IsoPuck } from "./IsoPuck";
import type { IconName } from "@/components/icons/Icon";

export type FormWeightItem = { eyebrow: string; icon: IconName; text: string };

/** "The form we give / the weight we lift" band: two cells, each with an iso puck icon. */
export function FormWeight({ form, weight }: { form: FormWeightItem; weight: FormWeightItem }) {
  return (
    <FrameBlock>
      <div className="grid gap-[2px] lg:grid-cols-2">
        {[form, weight].map((it, i) => (
          <Cell key={it.eyebrow} className="iso-grid flex items-center gap-5 px-[var(--gutter)] py-8 sm:gap-7">
            <div className="w-[92px] shrink-0 sm:w-[120px]">
              <IsoPuck icon={it.icon} tone={i === 0 ? "white" : "accentPale"} />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent-deep">{it.eyebrow}</div>
              <p className="mt-2 font-mono text-[18px] font-medium leading-snug tracking-tight text-ink sm:text-[20px]">
                {it.text}
              </p>
            </div>
          </Cell>
        ))}
      </div>
    </FrameBlock>
  );
}
