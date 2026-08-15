import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { practices } from "@/content/practices";
import { practiceDetail } from "@/content/practiceDetail";
import { PageHero } from "@/components/sections/PageHero";
import { CardGrid } from "@/components/sections/CardGrid";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Button } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { FinalCTA } from "@/components/sections/FinalCTA";

type Params = { params: Promise<{ slug: string; sub: string }> };

export function generateStaticParams() {
  return Object.entries(practiceDetail).flatMap(([slug, d]) =>
    d.subs.map((s) => ({ slug, sub: s.slug })),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, sub } = await params;
  const s = practiceDetail[slug]?.subs.find((x) => x.slug === sub);
  if (!s) return {};
  return { title: `${s.title} — TGIE`, description: s.summary };
}

export default async function SubPage({ params }: Params) {
  const { slug, sub } = await params;
  const p = practices.find((x) => x.slug === slug);
  const d = practiceDetail[slug];
  const s = d?.subs.find((x) => x.slug === sub);
  if (!p || !d || !s) notFound();

  const siblings = d.subs.filter((x) => x.slug !== sub);

  return (
    <div className="flex flex-col gap-[2px] bg-paper pb-[2px]">
      <PageHero
        crumbs={[
          { label: "Practices", href: "/#practices" },
          { label: p.short, href: `/practices/${slug}` },
          { label: s.title },
        ]}
        eyebrow={p.short}
        line1={s.title}
        lead={s.summary}
        cta={
          <>
            <Button href="/start">Start a Project</Button>
            <Button href={`/practices/${slug}`} variant="ghost">
              Back to {p.short}
            </Button>
          </>
        }
      />

      {/* what's included */}
      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] py-14">
          <Eyebrow>What&apos;s included</Eyebrow>
          <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
            {s.points.map((pt, i) => (
              <div key={pt} className="flex gap-4">
                <span className="font-mono text-[15px] text-ink-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] text-ink-2">{pt}</span>
              </div>
            ))}
          </div>
        </Cell>
      </FrameBlock>

      {/* ownership reminder */}
      <GapStrip />
      <FrameBlock full>
        <div className="rounded-[6px] bg-forest px-[var(--gutter)] py-12 text-ondark">
          <div className="mx-auto max-w-[var(--maxw)]">
            <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-teal-soft">
              100% zero lock-in
            </div>
            <p className="mt-3 max-w-[40ch] font-mono text-[22px] font-medium leading-snug tracking-tight text-ondark">
              We build the body. <span className="text-ondark-mut">You own it.</span>
            </p>
            <p className="mt-3 max-w-[52ch] text-[14.5px] text-ondark-mut">
              On milestone completion, the files, firmware source, BOM, and full publication
              rights are handed back to you.
            </p>
          </div>
        </div>
      </FrameBlock>

      {/* siblings */}
      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] pt-12 pb-8">
          <Eyebrow>More in {p.short}</Eyebrow>
          <TwoToneHeading line1="The rest of" line2="this practice." className="mt-4" />
        </Cell>
      </FrameBlock>
      <GapStrip h={2} />
      <CardGrid
        cols={3}
        items={siblings.map((x) => ({
          href: `/practices/${slug}/${x.slug}`,
          title: x.title,
          note: x.summary,
        }))}
      />

      <GapStrip />
      <FinalCTA />
    </div>
  );
}
