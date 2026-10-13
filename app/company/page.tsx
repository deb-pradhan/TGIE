import { pageMeta } from "@/lib/pageMeta";
import { company, segments } from "@/content/pages";
import { site } from "@/content/site";
import { PageHero } from "@/components/sections/PageHero";
import { TrustBand } from "@/components/sections/TrustBand";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Button } from "@/components/primitives/Button";
import { StatTile } from "@/components/dataviz/Charts";
import { Icon, type IconName } from "@/components/icons/Icon";
import { CampusHero } from "@/components/illustration/company/CampusHero";
import { FoundationFigure, MedicalFigure, FabricationFigure } from "@/components/illustration/company/PedigreeFigures";
import { StatGlyph, type StatGlyphName } from "@/components/illustration/company/StatGlyphs";
import { SegmentMatrix } from "@/components/illustration/company/SegmentMatrix";
import { LabScene } from "@/components/illustration/company/LabScene";

export const metadata = pageMeta({
  title: "Company",
  description:
    "The Great Indian Engineers: four pillars under one accountable roof, grounded in institutional rigor and medical-grade discipline, with an ISO 9001:2015 fabrication arm in Thirumudivakkam, Chennai.",
  path: "/company",
});

const figures = {
  foundation: FoundationFigure,
  medical: MedicalFigure,
  fabrication: FabricationFigure,
} as const;

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
        art={<CampusHero />}
      />

      <TrustBand />

      {/* who leads the work: stats + pedigree */}
      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] pt-12 pb-10">
          <Eyebrow>Who leads the work</Eyebrow>
          <TwoToneHeading line1="One accountable engineer," line2="a whole team's discipline." className="mt-4" />
        </Cell>
      </FrameBlock>
      <GapStrip h={2} />
      <FrameBlock>
        <div className="grid grid-cols-2 gap-[2px] lg:grid-cols-4">
          {company.stats.map((s) => (
            <Cell key={s.label} className="flex flex-col justify-between gap-5 p-5 sm:p-6">
              <StatGlyph name={s.glyph as StatGlyphName} />
              <StatTile value={s.value} unit={s.unit || undefined} label={s.label} />
            </Cell>
          ))}
        </div>
      </FrameBlock>
      <GapStrip h={2} />
      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-3">
          {company.pedigree.map((it) => {
            const Fig = figures[it.fig as keyof typeof figures];
            return (
              <Cell key={it.title} className="flex flex-col overflow-hidden">
                <div className="relative aspect-[3/2] w-full">
                  <Fig />
                </div>
                {/* credential rail: numbered node on a timeline */}
                <div className="flex items-center gap-3 px-6 pt-5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent font-mono text-[11px] font-bold text-ink">
                    {it.step}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-line-strong" />
                  <span className="rounded-full bg-accent-pale px-2.5 py-[3px] font-mono text-[11px] font-medium text-accent-deep">
                    {it.badge}
                  </span>
                </div>
                <div className="p-6 pt-4">
                  <h3 className="font-mono text-[16px] font-medium tracking-tight text-ink">{it.title}</h3>
                  <p className="mt-2 text-[13.5px] text-muted">{it.note}</p>
                </div>
              </Cell>
            );
          })}
        </div>
      </FrameBlock>

      {/* market segments */}
      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] pt-12 pb-8">
          <Eyebrow>{segments.eyebrow}</Eyebrow>
          <TwoToneHeading line1={segments.line1} line2={segments.line2} className="mt-4" />
        </Cell>
      </FrameBlock>
      <GapStrip h={2} />
      <FrameBlock>
        <SegmentMatrix columns={segments.columns as { id: string; name: string; icon: IconName }[]} rows={segments.items} />
      </FrameBlock>
      <GapStrip h={2} />
      <FrameBlock>
        <div className="rounded-[6px] bg-graphite-deep px-[var(--gutter)] py-8 text-center text-ondark">
          <p className="mx-auto max-w-[64ch] font-mono text-[15px] tracking-tight">{segments.note}</p>
        </div>
      </FrameBlock>

      {/* lab & infrastructure */}
      <GapStrip />
      <FrameBlock>
        <div className="grid gap-[2px] lg:grid-cols-[0.8fr_1.2fr]">
          <Cell className="flex flex-col justify-center px-[var(--gutter)] py-12">
            <Eyebrow>{company.lab.title}</Eyebrow>
            <TwoToneHeading as="h2" line1={company.lab.line1} line2={company.lab.line2} className="mt-4" />
            <p className="text-lead mt-4 max-w-[62ch] text-muted">{company.lab.intro}</p>
            <p className="mt-8 inline-flex items-center gap-2 font-mono text-[13px] text-ink-2">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-pale text-accent">
                <Icon name="pin" size={14} />
              </span>
              Based in {site.base}.
            </p>
          </Cell>
          <Cell className="relative min-h-[300px] overflow-hidden sm:min-h-[420px]">
            <LabScene />
          </Cell>
        </div>
      </FrameBlock>
      <GapStrip h={2} />
      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-3">
          {company.lab.items.map((it) => (
            <Cell key={it.title} className="p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-accent font-mono text-[11px] font-bold text-ink">
                  {it.n}
                </span>
                <div className="flex gap-1.5">
                  {(it.icons as IconName[]).map((n) => (
                    <span key={n} className="grid h-10 w-10 place-items-center rounded-[10px] bg-accent-pale text-accent">
                      <Icon name={n} size={22} />
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="mt-5 text-[15px] font-medium text-ink">{it.title}</h3>
              <p className="mt-1.5 text-[13px] text-muted">{it.note}</p>
            </Cell>
          ))}
        </div>
      </FrameBlock>

      <GapStrip />
      <FinalCTA />
    </div>
  );
}
