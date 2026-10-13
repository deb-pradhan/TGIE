import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { practices } from "@/content/practices";
import { practiceDetail } from "@/content/practiceDetail";
import { lifecycle } from "@/content/lifecycle";
import { subFit } from "@/content/subLifecycle";
import { PageHero } from "@/components/sections/PageHero";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Button } from "@/components/primitives/Button";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Icon } from "@/components/icons/Icon";
import { SubArt } from "@/components/illustration/subs";
import { cn } from "@/lib/cn";

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
  return {
    title: s.title,
    description: s.summary,
    openGraph: { title: `${s.title} · TGIE`, description: s.summary },
  };
}

export default async function SubPage({ params }: Params) {
  const { slug, sub } = await params;
  const p = practices.find((x) => x.slug === slug);
  const d = practiceDetail[slug];
  const idx = d?.subs.findIndex((x) => x.slug === sub) ?? -1;
  if (!p || !d || idx < 0) notFound();
  const s = d.subs[idx];
  const fit = subFit[sub];
  const prev = d.subs[(idx - 1 + d.subs.length) % d.subs.length];
  const next = d.subs[(idx + 1) % d.subs.length];
  const iconOf = (k: string) => subFit[k]?.icon ?? "check";

  return (
    <div className="flex flex-col gap-[2px] bg-paper pb-[2px]">
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/#services" },
          { label: p.short, href: `/services/${slug}` },
          { label: s.title },
        ]}
        eyebrow={`Pillar ${p.index} · ${p.short}`}
        line1={s.title}
        lead={s.summary}
        art={<SubArt slug={sub} />}
        cta={
          <>
            <Button href="/start">Start a Project</Button>
            <Button href={`/services/${slug}`} variant="ghost">
              Back to {p.short}
            </Button>
          </>
        }
      />

      {/* summary band */}
      <GapStrip />
      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-3">
          <Cell className="flex items-start gap-4 p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-mint text-teal-deep">
              <Icon name={p.slug as "engineering" | "products" | "enablement" | "fabrication"} size={22} />
            </span>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-teal">Pillar {p.index}</div>
              <div className="mt-1 font-mono text-[15px] font-medium tracking-tight text-ink">{p.name}</div>
              <p className="mt-1.5 text-[13.5px] text-muted">{p.tagline}</p>
            </div>
          </Cell>
          <Cell className="flex items-start gap-4 p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-mint text-teal-deep">
              <Icon name={iconOf(sub)} size={22} />
            </span>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-teal">Scope</div>
              <div className="mt-1 font-mono text-[15px] font-medium tracking-tight text-ink">
                {s.points.length} deliverables, one team
              </div>
              <p className="mt-1.5 text-[13.5px] text-muted">Designed, built and documented under a single accountable roof.</p>
            </div>
          </Cell>
          <Cell className="flex items-start gap-4 p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-mint text-teal-deep">
              <Icon name="unlock" size={22} />
            </span>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-teal">Ownership</div>
              <div className="mt-1 font-mono text-[15px] font-medium tracking-tight text-ink">Zero lock-in</div>
              <p className="mt-1.5 text-[13.5px] text-muted">
                On milestone completion the files, source, BOM and publication rights are handed back to you.
              </p>
            </div>
          </Cell>
        </div>
      </FrameBlock>

      {/* what's included */}
      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] pt-12 pb-10">
          <Eyebrow>What&apos;s included</Eyebrow>
          <TwoToneHeading line1="Every deliverable," line2="spelled out." className="mt-4" />
        </Cell>
      </FrameBlock>
      <GapStrip h={2} />
      <FrameBlock>
        <ul className="grid gap-[2px] sm:grid-cols-2">
          {s.points.map((pt, i) => (
            <li key={pt}>
              <Cell className="flex h-full items-start gap-4 p-6">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-mint text-teal-deep">
                  <Icon name="check" size={18} />
                </span>
                <div>
                  <div className="font-mono text-[11px] tracking-[0.12em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="mt-1 text-[15px] text-ink-2">{pt}</p>
                </div>
              </Cell>
            </li>
          ))}
        </ul>
      </FrameBlock>

      {/* lifecycle fit */}
      <GapStrip />
      <FrameBlock>
        <Cell className="px-[var(--gutter)] pt-12 pb-10">
          <Eyebrow>How this fits the lifecycle</Eyebrow>
          <TwoToneHeading line1="Where it lands" line2="on the path to launch." className="mt-4" />
          {fit && <p className="text-lead mt-5 max-w-[62ch] text-muted">{fit.note}</p>}
        </Cell>
      </FrameBlock>
      <GapStrip h={2} />
      <FrameBlock>
        <ol className="grid gap-[2px] md:grid-cols-4">
          {lifecycle.map((ph, i) => {
            const on = fit?.phases.includes(i + 1);
            return (
              <li key={ph.n}>
                <Cell className={cn("flex h-full flex-col p-6", on && "bg-mint")}>
                  <span className={cn("h-1 w-7 rounded", on ? "bg-teal" : "bg-line-strong")} />
                  <div className={cn("mt-3 font-mono text-[12px]", on ? "text-teal-deep" : "text-muted")}>
                    {ph.n}
                  </div>
                  <h3 className="mt-1.5 font-mono text-[15px] font-medium tracking-tight text-ink">{ph.title}</h3>
                  <p className={cn("mt-2 flex-1 text-[13px]", on ? "text-ink-2" : "text-muted")}>{ph.scope}</p>
                  <div
                    className={cn(
                      "mt-4 inline-flex w-fit items-center gap-1.5 rounded-pill px-2.5 py-1 text-[11px] font-medium",
                      on ? "bg-card text-teal-deep" : "text-muted-2",
                    )}
                  >
                    {on ? (
                      <>
                        <Icon name="check" size={12} /> This service is active
                      </>
                    ) : (
                      "Not a focus here"
                    )}
                  </div>
                </Cell>
              </li>
            );
          })}
        </ol>
      </FrameBlock>

      {/* prev / pillar / next */}
      <GapStrip />
      <FrameBlock>
        <nav aria-label={`More in ${p.short}`} className="grid gap-[2px] md:grid-cols-[1fr_0.8fr_1fr]">
          <NavCell href={`/services/${slug}/${prev.slug}`} dir="Previous" title={prev.title} note={prev.summary} icon={iconOf(prev.slug)} />
          <Cell className="group flex flex-col justify-between bg-mint p-6 transition-colors duration-200 motion-safe:hover:bg-card">
            <Link href={`/services/${slug}`} className="flex h-full flex-col">
              <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-teal-deep">All of {p.short}</div>
              <p className="mt-2 flex-1 text-[13.5px] text-ink-2">{d.subs.length} services under Pillar {p.index}, one accountable team.</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 motion-safe:group-hover:text-teal">
                Back to {p.short} <Icon name="arrow-up-right" size={14} />
              </span>
            </Link>
          </Cell>
          <NavCell href={`/services/${slug}/${next.slug}`} dir="Next" title={next.title} note={next.summary} icon={iconOf(next.slug)} />
        </nav>
      </FrameBlock>

      <GapStrip />
      <FinalCTA />
    </div>
  );
}

function NavCell({ href, dir, title, note, icon }: { href: string; dir: string; title: string; note: string; icon: Parameters<typeof Icon>[0]["name"] }) {
  return (
    <Cell className="group flex flex-col p-6 transition-colors duration-200 motion-safe:hover:bg-card">
      <Link href={href} className="flex h-full flex-col">
        <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-teal">
          <Icon name={icon} size={16} /> {dir}
        </div>
        <h3 className="mt-2 font-mono text-[16px] font-medium tracking-tight text-ink transition-colors duration-200 motion-safe:group-hover:text-teal">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[13.5px] text-muted">{note}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 motion-safe:group-hover:text-teal">
          Explore <Icon name="arrow-right" size={14} />
        </span>
      </Link>
    </Cell>
  );
}
