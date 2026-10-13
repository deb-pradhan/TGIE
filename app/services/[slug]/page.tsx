import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { practices, subIcons, pillarPage } from "@/content/practices";
import { practiceDetail } from "@/content/practiceDetail";
import { fabrication } from "@/content/fabrication";
import { materials } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { CardGrid } from "@/components/sections/CardGrid";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Button } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Icon, IconBadge, type IconName } from "@/components/icons/Icon";
import { PillarScene } from "@/components/illustration/pillars";
import { FormWeight } from "@/components/illustration/pillars/FormWeight";
import { PipelineStation } from "@/components/illustration/pillars/FabPipeline";
import { PaperworkStack } from "@/components/illustration/pillars/PaperworkStack";
import { MaterialSwatches } from "@/components/illustration/pillars/MaterialSwatches";
import { Reveal } from "@/lib/motion";
import { FinalCTA } from "@/components/sections/FinalCTA";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practices.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = practices.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: p.position };
}

export default async function PracticePage({ params }: Params) {
  const { slug } = await params;
  const p = practices.find((x) => x.slug === slug);
  const d = practiceDetail[slug];
  if (!p || !d) notFound();

  const tiles = d.subs.map((s, i) => ({
    href: `/services/${slug}/${s.slug}`,
    label: String(i + 1).padStart(2, "0"),
    title: s.title,
    note: s.summary,
    icon: subIcons[s.slug],
  }));

  return (
    <div className="flex flex-col gap-[2px] bg-paper pb-[2px]">
      <PageHero
        crumbs={[{ label: "Services", href: "/#services" }, { label: p.short }]}
        eyebrow={`Pillar ${p.index}`}
        line1={p.name}
        lead={d.lead}
        art={
          <div className="absolute inset-0">
            <PillarScene slug={slug} />
          </div>
        }
        cta={
          <>
            <Button href="/start">Start a Project</Button>
            <Button href="#capabilities" variant="ghost">
              What we deliver
            </Button>
          </>
        }
      />

      {/* form we give / weight we lift */}
      <GapStrip />
      <FormWeight
        form={{ ...pillarPage.form, text: p.body }}
        weight={{ ...pillarPage.weight, text: p.weight }}
      />

      {/* fabrication-specific sections */}
      {slug === "fabrication" && (
        <>
          {/* Section A: illustrated process pipeline */}
          <GapStrip />
          <FrameBlock>
            <Cell className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 px-[var(--gutter)] pt-12 pb-8">
              <Reveal>
                <Eyebrow>{fabrication.process.eyebrow}</Eyebrow>
                <TwoToneHeading
                  line1={fabrication.process.line1}
                  line2={fabrication.process.line2}
                  className="mt-4"
                />
              </Reveal>
              <span className="rounded-pill bg-mint px-3 py-1.5 text-[12px] font-medium text-teal-deep">
                {fabrication.process.badge}
              </span>
            </Cell>
          </FrameBlock>
          <GapStrip h={2} />
          <FrameBlock>
            <div className="grid gap-[2px] sm:grid-cols-2 lg:grid-cols-4">
              {fabrication.process.steps.map((s, i) => (
                <Cell key={s.n} className="flex flex-col overflow-hidden">
                  <PipelineStation index={i} />
                  <div className="flex-1 px-6 pb-7 pt-3">
                    <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-teal">{s.n}</div>
                    <h3 className="mt-2 font-mono text-[15px] font-medium tracking-tight">{s.title}</h3>
                    <p className="mt-2.5 text-[13px] text-muted">{s.scope}</p>
                  </div>
                </Cell>
              ))}
            </div>
          </FrameBlock>

          {/* Section B: problem/solution bento */}
          <GapStrip />
          <FrameBlock>
            <div className="grid gap-[2px] lg:grid-cols-2">
              <Cell className="flex flex-col justify-center px-[var(--gutter)] py-14">
                <Reveal>
                  <Eyebrow>{fabrication.gap.eyebrow}</Eyebrow>
                  <h3 className="mt-4 font-mono text-h3 font-medium tracking-tight text-ink">
                    {fabrication.gap.heading}
                  </h3>
                  <p className="mt-4 max-w-[52ch] text-[15.5px] text-muted">{fabrication.gap.body}</p>
                </Reveal>
              </Cell>
              <Cell className="relative min-h-[300px] overflow-hidden">
                <Image
                  src="/pillars/fabrication.jpg"
                  alt="A welder at work, sparks flying from the seam"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top"
                />
                <span className="absolute bottom-3 left-3 rounded-chip bg-card/95 px-3 py-1.5 text-[12px] font-medium text-ink-2 shadow-[var(--shadow-card)]">
                  {fabrication.gap.photoCaption}
                </span>
              </Cell>
            </div>
          </FrameBlock>

          {/* Section C: stats row */}
          <GapStrip />
          <FrameBlock>
            <Cell className="px-[var(--gutter)] py-10">
              <Reveal>
                <Eyebrow>{fabrication.stats.eyebrow}</Eyebrow>
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4">
                  {fabrication.stats.items.map((s, i) => (
                    <div
                      key={s.label}
                      className={`flex flex-col justify-center py-4 ${
                        i < fabrication.stats.items.length - 1
                          ? "border-b border-line sm:border-b-0 lg:border-r"
                          : ""
                      } ${i % 2 === 0 && i < fabrication.stats.items.length - 1 ? "sm:border-r" : ""} ${
                        i > 0 ? "sm:pl-6" : ""
                      }`}
                    >
                      <IconBadge name={s.icon as IconName} size={36} className="mb-4" />
                      <div className="font-mono text-[28px] font-medium tracking-tight text-ink">{s.value}</div>
                      <div className="mt-1 text-[13px] font-medium text-ink-2">{s.label}</div>
                      <div className="mt-0.5 text-[12px] text-muted">{s.note}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </Cell>
          </FrameBlock>

          {/* Section D: product categories + industry sectors */}
          <GapStrip />
          <FrameBlock>
            <div className="grid gap-[2px] lg:grid-cols-2">
              {[fabrication.categories, fabrication.sectors].map((col) => (
                <Cell key={col.eyebrow} className="px-[var(--gutter)] py-12">
                  <Eyebrow>{col.eyebrow}</Eyebrow>
                  <ul className="mt-6 grid gap-3">
                    {col.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[14.5px] text-ink-2">
                        <Icon name="check" size={16} className="mt-1 shrink-0 text-teal" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </Cell>
              ))}
            </div>
          </FrameBlock>
        </>
      )}

      {/* products-specific: material palette */}
      {slug === "products" && (
        <>
          <GapStrip />
          <FrameBlock>
            <Cell className="px-[var(--gutter)] pt-12 pb-8">
              <Reveal>
                <Eyebrow>{materials.eyebrow}</Eyebrow>
                <TwoToneHeading line1={materials.line1} line2={materials.line2} className="mt-4" />
              </Reveal>
            </Cell>
          </FrameBlock>
          <GapStrip h={2} />
          <MaterialSwatches rows={materials.rows} />
        </>
      )}

      {/* sub-service tiles */}
      <GapStrip />
      <FrameBlock id="capabilities">
        <Cell className="px-[var(--gutter)] pt-12 pb-8">
          <Eyebrow>{pillarPage.capabilities.eyebrow}</Eyebrow>
          <TwoToneHeading
            line1={pillarPage.capabilities.line1}
            line2={pillarPage.capabilities.line2}
            className="mt-4"
          />
        </Cell>
      </FrameBlock>
      <GapStrip h={2} />
      <CardGrid
        cols={tiles.length === 4 ? 2 : 3}
        items={tiles}
        cta={tiles.length % 3 === 0 ? undefined : pillarPage.tilesCta}
      />

      {/* fabrication: delivered with the paperwork */}
      {slug === "fabrication" && (
        <>
          <GapStrip />
          <FrameBlock>
            <div className="grid gap-[2px] lg:grid-cols-2">
              <Cell className="flex flex-col justify-center px-[var(--gutter)] py-14">
                <Eyebrow>{fabrication.ownership.eyebrow}</Eyebrow>
                <p className="mt-4 max-w-[40ch] font-mono text-[22px] font-medium leading-snug tracking-tight text-ink">
                  {fabrication.ownership.heading}{" "}
                  <span className="text-muted">{fabrication.ownership.headingMuted}</span>
                </p>
                <p className="mt-3 max-w-[52ch] text-[14.5px] text-muted">{fabrication.ownership.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {fabrication.ownership.docs.map((doc) => (
                    <li
                      key={doc}
                      className="inline-flex items-center gap-1.5 rounded-chip border border-line bg-card px-3 py-1.5 text-[12.5px] font-medium text-ink-2"
                    >
                      <Icon name="check" size={14} className="text-teal" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </Cell>
              <Cell className="relative min-h-[260px] overflow-hidden">
                <div className="absolute inset-0">
                  <PaperworkStack />
                </div>
              </Cell>
            </div>
          </FrameBlock>
        </>
      )}

      <GapStrip />
      <FinalCTA />
    </div>
  );
}
