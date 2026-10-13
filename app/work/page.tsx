import { pageMeta } from "@/lib/pageMeta";
import { work } from "@/content/pages";
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

export const metadata = pageMeta({
  title: "Work and case studies",
  description:
    "From a PhD's wearable sensor to a certified industrial fabrication run. The shapes a project takes across all four pillars.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <div className="flex flex-col gap-[2px] bg-paper pb-[2px]">
      <PageHero
        crumbs={[{ label: "Company", href: "/company" }, { label: "Work & case studies" }]}
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

      {/* references note: only what is already true on the site */}
      <GapStrip h={2} />
      <FrameBlock>
        <Cell className="flex items-start gap-3 bg-accent-pale px-6 py-7">
          <span className="mt-0.5 text-accent-deep">
            <Icon name="certificate" size={22} />
          </span>
          <p className="text-[13.5px] text-ink-2">{work.references}</p>
        </Cell>
      </FrameBlock>

      <GapStrip />
      <FinalCTA heading="Bring the drawing." accent="We'll carry the weight." />
    </div>
  );
}
