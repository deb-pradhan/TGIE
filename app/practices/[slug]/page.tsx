import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { practices } from "@/content/practices";
import { practiceDetail } from "@/content/practiceDetail";
import { fabrication } from "@/content/fabrication";
import { materials } from "@/content/pages";
import { PageHero } from "@/components/sections/PageHero";
import { CardGrid } from "@/components/sections/CardGrid";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Button } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { StockImage } from "@/components/illustration/StockImage";
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
  return { title: `${p.name}. TGIE`, description: p.position };
}

export default async function PracticePage({ params }: Params) {
  const { slug } = await params;
  const p = practices.find((x) => x.slug === slug);
  const d = practiceDetail[slug];
  if (!p || !d) notFound();

  return (
    <div className="flex flex-col gap-[2px] bg-paper pb-[2px]">
      <PageHero
        crumbs={[{ label: "Practices", href: "/#practices" }, { label: p.short }]}
        eyebrow={`Pillar ${p.index}`}
        line1={p.name}
        lead={d.lead}
        cta={
          <>
            <Button href="/start">Start a Project</Button>
            <Button href="#capabilities" variant="ghost">
              What we deliver
            </Button>
          </>
        }
      />

      {/* body / weight band */}
      <GapStrip />
      <FrameBlock>
        <div className="grid gap-[2px] lg:grid-cols-2">
          <Cell className="p-8">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-teal">
              The body we give
            </div>
            <p className="mt-2 font-mono text-[18px] font-medium leading-snug tracking-tight text-ink">
              {p.body}
            </p>
          </Cell>
          <Cell className="p-8">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-teal">
              The weight we lift
            </div>
            <p className="mt-2 font-mono text-[18px] font-medium leading-snug tracking-tight text-ink">
              {p.weight}
            </p>
          </Cell>
        </div>
      </FrameBlock>

      {/* fabrication-specific sections */}
      {slug === "fabrication" && (
        <>
          {/* Section A: process flow */}
          <GapStrip />
          <FrameBlock>
            <Cell className="px-[var(--gutter)] pt-12 pb-8">
              <Reveal>
                <Eyebrow>{fabrication.process.eyebrow}</Eyebrow>
                <TwoToneHeading
                  line1={fabrication.process.line1}
                  line2={fabrication.process.line2}
                  className="mt-4"
                />
              </Reveal>
            </Cell>
          </FrameBlock>
          <GapStrip h={2} />
          <FrameBlock>
            <Cell className="p-6">
              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-card border border-line bg-card shadow-[var(--shadow-card)]">
                  <div className="flex items-center justify-between border-b border-line bg-card-soft px-6 py-4">
                    <b className="text-[14px] font-medium">Fabrication flow · RFQ → delivery</b>
                    <span className="rounded-pill bg-mint px-2.5 py-1 text-[10.5px] font-medium text-teal-deep">
                      one PO · single accountable team
                    </span>
                  </div>
                  <div className="grid md:grid-cols-4">
                    {fabrication.process.steps.map((s, i) => (
                      <div
                        key={s.n}
                        className={`relative p-6 ${i < fabrication.process.steps.length - 1 ? "border-b border-line md:border-b-0 md:border-r" : ""}`}
                      >
                        <span className="absolute left-6 top-3.5 h-1 w-7 rounded bg-teal/50" />
                        <div className="font-mono text-[13px] text-teal">{s.n}</div>
                        <h3 className="mt-2 font-mono text-[15px] font-medium tracking-tight">{s.title}</h3>
                        <p className="mt-2.5 text-[13px] text-muted">{s.scope}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </Cell>
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
                  <p className="mt-4 max-w-[52ch] text-[15.5px] text-muted">
                    {fabrication.gap.body}
                  </p>
                </Reveal>
              </Cell>
              <Cell className="relative min-h-[300px] overflow-hidden">
                <StockImage src="/pillars/fabrication.jpg" alt="" />
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
                      <div className="font-mono text-[28px] font-medium tracking-tight text-ink">
                        {s.value}
                      </div>
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
              <Cell className="px-[var(--gutter)] py-12">
                <Eyebrow>{fabrication.categories.eyebrow}</Eyebrow>
                <ul className="mt-6 grid gap-2.5">
                  {fabrication.categories.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[14.5px] text-ink-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Cell>
              <Cell className="px-[var(--gutter)] py-12">
                <Eyebrow>{fabrication.sectors.eyebrow}</Eyebrow>
                <ul className="mt-6 grid gap-2.5">
                  {fabrication.sectors.items.map((it) => (
                    <li key={it} className="flex gap-2.5 text-[14.5px] text-ink-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Cell>
            </div>
          </FrameBlock>
        </>
      )}

      {/* products-specific: material & capability matrix */}
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
          <FrameBlock>
            <div className="flex flex-col gap-[2px]">
              {materials.rows.map((r) => (
                <Cell key={r.category} className="grid gap-2 px-6 py-5 md:grid-cols-[1fr_1.2fr_1.6fr] md:items-baseline">
                  <div className="font-mono text-[14px] font-medium tracking-tight text-ink">
                    {r.category}
                  </div>
                  <div className="text-[13px] text-teal-deep">{r.filaments}</div>
                  <div className="text-[13px] text-muted">{r.use}</div>
                </Cell>
              ))}
            </div>
          </FrameBlock>
        </>
      )}

      {/* sub-pages */}
      <GapStrip />
      <FrameBlock id="capabilities">
        <Cell className="px-[var(--gutter)] pt-12 pb-8">
          <Eyebrow>What we deliver</Eyebrow>
          <TwoToneHeading
            line1="Everything in this practice,"
            line2="under one accountable team."
            className="mt-4"
          />
        </Cell>
      </FrameBlock>
      <GapStrip h={2} />
      <CardGrid
        cols={3}
        items={d.subs.map((s, i) => ({
          href: `/practices/${slug}/${s.slug}`,
          label: String(i + 1).padStart(2, "0"),
          title: s.title,
          note: s.summary,
        }))}
      />

      {/* fabrication ownership band */}
      {slug === "fabrication" && (
        <>
          <GapStrip />
          <FrameBlock full>
            <div className="rounded-[6px] bg-forest px-[var(--gutter)] py-12 text-ondark">
              <div className="mx-auto max-w-[var(--maxw)]">
                <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-teal-soft">
                  {fabrication.ownership.eyebrow}
                </div>
                <p className="mt-3 max-w-[40ch] font-mono text-[22px] font-medium leading-snug tracking-tight text-ondark">
                  {fabrication.ownership.heading}{" "}
                  <span className="text-ondark-mut">{fabrication.ownership.headingMuted}</span>
                </p>
                <p className="mt-3 max-w-[52ch] text-[14.5px] text-ondark-mut">
                  {fabrication.ownership.body}
                </p>
              </div>
            </div>
          </FrameBlock>
        </>
      )}

      <GapStrip />
      <FinalCTA />
    </div>
  );
}
