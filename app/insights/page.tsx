import { pageMeta } from "@/lib/pageMeta";
import Link from "next/link";
import { insights } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { Faq } from "@/components/sections/Faq";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Button } from "@/components/primitives/Button";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Icon } from "@/components/icons/Icon";
import { InsightsHero } from "@/components/illustration/company/InsightsHero";
import { CoverCard, type CoverKind } from "@/components/illustration/company/Covers";

export const metadata = pageMeta({
  title: "Insights & resources",
  description:
    "Answers, guides, and the TGIE capability portfolio: a downloadable PDF, selected case studies, and the four-phase engagement model.",
  path: "/insights",
});

const coverLabels: Record<CoverKind, string> = {
  portfolio: "Cover of the capability portfolio PDF: four pillar tiles A to D.",
  notes: "Cover of the selected case studies: a notebook page with a trace and a growth chart.",
  model: "Cover of the engagement model: four numbered phases on a timeline.",
};

const linkCls =
  "mt-5 inline-flex w-fit items-center gap-2 rounded-btn border border-line bg-card px-4 py-2 text-[13.5px] font-medium text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-accent";

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-[2px] bg-paper pb-[2px]">
      <PageHero
        crumbs={[{ label: "Insights & resources" }]}
        eyebrow={insights.eyebrow}
        line1={insights.h1}
        line2={insights.h2}
        lead={insights.lead}
        cta={<Button href="/start">Start a Project</Button>}
        art={<InsightsHero />}
      />

      {/* resources */}
      <GapStrip />
      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-3">
          {insights.resources.map((r) => {
            const kind = r.kind as CoverKind;
            const isPdf = r.href.endsWith(".pdf");
            return (
              <Cell key={r.title} className="flex flex-col overflow-hidden">
                <div className="relative aspect-[3/2] w-full">
                  <CoverCard kind={kind} label={coverLabels[kind]} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-3 w-fit rounded-full bg-accent-pale px-2.5 py-[3px] font-mono text-[11px] font-medium text-accent-deep">
                    {r.meta}
                  </span>
                  <h2 className="font-mono text-[16px] font-medium tracking-tight text-ink">{r.title}</h2>
                  <p className="mt-2 flex-1 text-[13.5px] text-muted">{r.note}</p>
                  {isPdf ? (
                    <a href={r.href} download className={linkCls}>
                      {r.cta}
                      <Icon name="download" size={16} />
                    </a>
                  ) : (
                    <Link href={r.href} className={linkCls}>
                      {r.cta}
                      <Icon name="arrow-right" size={16} />
                    </Link>
                  )}
                </div>
              </Cell>
            );
          })}
        </div>
      </FrameBlock>

      <GapStrip />
      <Faq eyebrow="Common questions" heading={{ line1: "Questions people ask", line2: "before they start." }} />

      <GapStrip />
      <FinalCTA />
    </div>
  );
}
