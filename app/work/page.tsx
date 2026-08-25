import type { Metadata } from "next";
import { work } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Button } from "@/components/primitives/Button";

export const metadata: Metadata = {
  title: "Work & case studies. TGIE",
  description:
    "From a PhD's wearable sensor to a certified industrial fabrication run. The shapes a project takes across all four pillars.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col gap-[2px] bg-paper pb-[2px]">
      <PageHero
        crumbs={[{ label: "Company" }, { label: "Work & case studies" }]}
        eyebrow={work.eyebrow}
        line1={work.h1}
        line2={work.h2}
        lead={work.lead}
        cta={<Button href="/start">Start a Project</Button>}
      />

      <GapStrip />
      <CaseStudy />

      {/* illustrative project examples across the pillars */}
      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] pt-12 pb-8">
          <Eyebrow>What we build</Eyebrow>
          <TwoToneHeading line1="The shapes a project takes," line2="across the pillars." className="mt-4" />
        </Cell>
      </FrameBlock>
      <GapStrip h={2} />
      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-3">
          {work.examples.map((it) => (
            <Cell key={it.title} className="flex flex-col p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-teal">
                {it.tag}
              </div>
              <h3 className="mt-2 font-mono text-[15px] font-medium tracking-tight text-ink">
                {it.title}
              </h3>
              <p className="mt-2 text-[13px] text-muted">{it.note}</p>
            </Cell>
          ))}
        </div>
      </FrameBlock>

      {/* concept-to-structure band */}
      <GapStrip />
      <FrameBlock full>
        <div className="rounded-[6px] bg-forest px-[var(--gutter)] py-12 text-ondark">
          <div className="mx-auto max-w-[var(--maxw)]">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-teal-soft">
              Pillars A → D
            </div>
            <p className="mt-3 max-w-[26ch] font-mono text-[22px] font-medium leading-snug tracking-tight text-ondark">
              {work.concept.title}
            </p>
            <p className="mt-3 max-w-[62ch] text-[14.5px] text-ondark-mut">{work.concept.note}</p>
          </div>
        </div>
      </FrameBlock>

      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] py-8">
          <p className="mx-auto max-w-[60ch] text-center text-[14px] text-muted">
            {work.references}
          </p>
        </Cell>
      </FrameBlock>

      <GapStrip />
      <FinalCTA />
    </div>
  );
}
