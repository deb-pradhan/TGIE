import type { Metadata } from "next";
import { work } from "@/content/pages";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/icons/Icon";
import { CaseWall } from "@/components/illustration/work/CaseWall";
import { CaseCard } from "@/components/illustration/work/CaseCard";
import { ConceptFlow } from "@/components/illustration/work/ConceptFlow";
import type { VignetteId } from "@/components/illustration/work/Vignettes";

export const metadata: Metadata = {
  title: "Work and case studies",
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
        art={<CaseWall />}
      />

      {/* the six engagements as illustrated case cards */}
      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] pt-12 pb-8">
          <Eyebrow>What we build</Eyebrow>
          <TwoToneHeading as="h2" line1="The shapes a project takes," line2="across the pillars." className="mt-4" />
        </Cell>
      </FrameBlock>
      <GapStrip h={2} />
      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-2 lg:grid-cols-3">
          {work.examples.map((it) => (
            <CaseCard
              key={it.key}
              id={it.key as VignetteId}
              tag={it.tag}
              title={it.title}
              note={it.note}
              pillars={it.pillars}
            />
          ))}
        </div>
      </FrameBlock>

      {/* concept to structure, the flagship diagram */}
      <GapStrip />
      <FrameBlock>
        <ConceptFlow />
      </FrameBlock>

      <GapStrip />
      <CaseStudy />

      {/* references / proof strip: only facts already on the site */}
      <GapStrip h={2} />
      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-[repeat(3,1fr)_1.5fr]">
          {site.hero.stats.map((s) => (
            <Cell key={s.value} className="px-6 py-7">
              <div className="font-mono text-[22px] font-medium tracking-tight text-ink">
                {s.value}
                {"unit" in s && s.unit ? <span className="ml-1.5 text-[14px] text-muted">{s.unit}</span> : null}
              </div>
              <div className="mt-1 text-[13px] text-ink-2">{s.label}</div>
            </Cell>
          ))}
          <Cell className="flex items-start gap-3 bg-mint px-6 py-7">
            <span className="mt-0.5 text-teal-deep">
              <Icon name="certificate" size={22} />
            </span>
            <p className="text-[13.5px] text-ink-2">{work.references}</p>
          </Cell>
        </div>
      </FrameBlock>

      <GapStrip />
      <FinalCTA />
    </div>
  );
}
