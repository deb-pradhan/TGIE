import type { Metadata } from "next";
import { insights } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { Faq } from "@/components/sections/Faq";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";

export const metadata: Metadata = {
  title: "Insights & resources — TGIE",
  description: "Answers, guides, and the capability portfolio.",
};

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-[2px] bg-paper pb-[2px]">
      <PageHero
        crumbs={[{ label: "Insights & resources" }]}
        eyebrow={insights.eyebrow}
        line1={insights.h1}
        line2={insights.h2}
        lead={insights.lead}
      />

      {/* resources */}
      <GapStrip />
      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-3">
          {insights.resources.map((r) => (
            <Cell key={r.title} className="flex flex-col p-6">
              <h3 className="font-mono text-[16px] font-medium tracking-tight text-ink">
                {r.title}
              </h3>
              <p className="mt-2 flex-1 text-[13.5px] text-muted">{r.note}</p>
              <a
                href="/start"
                className="mt-4 text-[13px] font-medium text-ink-2 hover:text-teal"
              >
                {r.cta} →
              </a>
            </Cell>
          ))}
        </div>
      </FrameBlock>

      <GapStrip />
      <Faq />

      <GapStrip />
      <FinalCTA />
    </div>
  );
}
