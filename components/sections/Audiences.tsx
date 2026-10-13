import { audiences } from "@/content/pages";
import { Section } from "@/components/primitives/Section";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { FrameBlock, Cell } from "@/components/frame/Grid";
import { Reveal } from "@/lib/motion";
import {
  LabBench,
  FounderSteps,
  SteelSkid,
} from "@/components/illustration/home/AudienceVignettes";

const ART = [LabBench, FounderSteps, SteelSkid];

export function Audiences() {
  return (
    <>
      <Section id="audiences" containerClassName="!pb-8">
        <Reveal>
          <Eyebrow>{audiences.eyebrow}</Eyebrow>
          <TwoToneHeading
            line1={audiences.line1}
            line2={audiences.line2}
            className="mt-4"
          />
          <p className="text-lead mt-4 max-w-[58ch] text-muted">
            {audiences.lead}
          </p>
        </Reveal>
      </Section>
      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-3">
          {audiences.items.map((it, i) => {
            const Art = ART[i];
            return (
              <Cell key={it.title} className="flex flex-col overflow-hidden">
                <Art />
                <Reveal delay={i * 0.08} className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[13px] text-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-chip border border-line bg-card whitespace-nowrap px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-teal-deep">
                      {it.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 font-mono text-[clamp(1.0625rem,1.5vw,1.1875rem)] font-medium leading-snug tracking-tight text-ink">
                    {it.title}
                  </h3>
                  <p className="mt-3 text-[14px] text-muted">{it.note}</p>
                </Reveal>
              </Cell>
            );
          })}
        </div>
      </FrameBlock>
    </>
  );
}
