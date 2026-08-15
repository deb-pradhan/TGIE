import type { Metadata } from "next";
import { company } from "@/content/pages";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { TrustBand } from "@/components/sections/TrustBand";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Button } from "@/components/primitives/Button";
import { StatTile } from "@/components/dataviz/Charts";

export const metadata: Metadata = {
  title: "Company — TGIE",
  description:
    "The Greate Indian Engineers — institutional rigor, medical-grade discipline, based in Thirumudivakkam, Chennai.",
};

export default function CompanyPage() {
  return (
    <div className="flex flex-col gap-[2px] bg-paper pb-[2px]">
      <PageHero
        crumbs={[{ label: "Company" }]}
        eyebrow={company.eyebrow}
        line1={company.h1}
        line2={company.h2}
        lead={company.lead}
        cta={<Button href="/start">Start a Project</Button>}
      />

      <TrustBand />

      {/* pedigree */}
      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] pt-12 pb-8">
          <Eyebrow>Who leads the work</Eyebrow>
          <TwoToneHeading line1="One accountable engineer," line2="a whole team's discipline." className="mt-4" />
          <div className="mt-6 flex flex-wrap items-center gap-x-9 gap-y-4">
            <StatTile value="4+" unit="yrs" label="Embedded full-stack" />
            <span className="hidden h-8 w-px bg-line sm:block" />
            <StatTile value="50+" unit="PCBs" label="Custom layouts delivered" />
            <span className="hidden h-8 w-px bg-line sm:block" />
            <StatTile value="100%" label="IP transfer, always" />
          </div>
        </Cell>
      </FrameBlock>
      <GapStrip h={2} />
      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-3">
          {company.pedigree.map((it) => (
            <Cell key={it.title} className="p-6">
              <h3 className="font-mono text-[16px] font-medium tracking-tight text-ink">
                {it.title}
              </h3>
              <p className="mt-2 text-[13.5px] text-muted">{it.note}</p>
            </Cell>
          ))}
        </div>
      </FrameBlock>

      {/* lab & infrastructure */}
      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] py-12">
          <Eyebrow>{company.lab.title}</Eyebrow>
          <p className="text-lead mt-4 max-w-[62ch] text-muted">{company.lab.intro}</p>
          <div className="mt-8 grid gap-[2px] sm:grid-cols-3">
            {company.lab.items.map((it) => (
              <div key={it.title} className="rounded-[6px] bg-card-soft p-5">
                <h4 className="text-[14.5px] font-medium text-ink">{it.title}</h4>
                <p className="mt-1.5 text-[12.5px] text-muted">{it.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-[13px] text-ink-2">Based in {site.base}.</p>
        </Cell>
      </FrameBlock>

      <GapStrip />
      <FinalCTA />
    </div>
  );
}
