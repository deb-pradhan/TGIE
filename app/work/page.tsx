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
  title: "Work & case studies — TGIE",
  description: "Field-tested research hardware, and the proof we can talk about.",
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
        cta={<Button href="/start">Start a Project →</Button>}
      />

      <GapStrip />
      <CaseStudy />

      {/* research hardware index */}
      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] pt-12 pb-8">
          <Eyebrow>What we build</Eyebrow>
          <TwoToneHeading line1={work.index.title} className="mt-4" />
        </Cell>
      </FrameBlock>
      <GapStrip h={2} />
      <FrameBlock>
        <div className="grid gap-[2px] sm:grid-cols-2 lg:grid-cols-4">
          {work.index.items.map((it) => (
            <Cell key={it.title} className="p-6">
              <h3 className="font-mono text-[15px] font-medium tracking-tight text-ink">
                {it.title}
              </h3>
              <p className="mt-2 text-[13px] text-muted">{it.note}</p>
            </Cell>
          ))}
        </div>
      </FrameBlock>

      <GapStrip />
      <FrameBlock full>
        <div className="rounded-[6px] bg-forest px-[var(--gutter)] py-11 text-center text-ondark">
          <p className="mx-auto max-w-[60ch] text-[15px] text-ondark-mut">{work.references}</p>
        </div>
      </FrameBlock>

      <GapStrip />
      <FinalCTA />
    </div>
  );
}
