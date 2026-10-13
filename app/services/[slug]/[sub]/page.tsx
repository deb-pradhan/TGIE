import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { practices } from "@/content/practices";
import { practiceDetail, nbHyphen } from "@/content/practiceDetail";
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
  const prev = idx > 0 ? d.subs[idx - 1] : undefined;
  const next = idx < d.subs.length - 1 ? d.subs[idx + 1] : undefined;
  const hardware = slug === "engineering" || slug === "products";
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
        line1={nbHyphen(s.title)}
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
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-accent-pale text-accent-deep">
              <Icon name={p.slug as "engineering" | "products" | "enablement" | "fabrication"} size={22} />
            </span>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent-deep">Pillar {p.index}</div>
              <div className="mt-1 font-mono text-[15px] font-medium tracking-tight text-ink">{p.name}</div>
              <p className="mt-1.5 text-[13.5px] text-muted">{p.position}</p>
            </div>
          </Cell>
          <Cell className="flex items-start gap-4 p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-accent-pale text-accent-deep">
              <Icon name={iconOf(sub)} size={22} />
            </span>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent-deep">Scope</div>
              <div className="mt-1 font-mono text-[15px] font-medium tracking-tight text-ink">One accountable team</div>
              <p className="mt-1.5 text-[13.5px] text-muted">
                {s.scopeNote ?? "Designed, built and documented under a single accountable roof."}
              </p>
            </div>
          </Cell>
          <Cell className="flex items-start gap-4 p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-accent-pale text-accent-deep">
              <Icon name="unlock" size={22} />
            </span>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent-deep">Ownership</div>
              <div className="mt-1 font-mono text-[15px] font-medium tracking-tight text-ink">Zero lock-in</div>
              <p className="mt-1.5 text-[13.5px] text-muted">
                {s.ownershipNote ??
                  "On milestone completion the files, source, BOM and publication rights are handed back to you."}
              </p>
            </div>
          </Cell>
        </div>
      </FrameBlock>

      {/* what we deliver: heading, deliverables and an inline CTA in one grid */}
      <GapStrip />
      <FrameBlock>
        <ul className="grid gap-[2px] sm:grid-cols-2">
          <li className="sm:col-span-2">
            <Cell className="px-[var(--gutter)] pt-12 pb-10">
              <Eyebrow>What we deliver</Eyebrow>
              <TwoToneHeading line1={d.deliver.line1} line2={d.deliver.line2} className="mt-4" />
            </Cell>
          </li>
          {s.points.map((pt, i) => (
            <li key={pt}>
              <Cell className="h-full p-6">
                <div className="font-mono text-[11px] tracking-[0.12em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="mt-1 text-[15px] text-ink-2">{pt}</p>
              </Cell>
            </li>
          ))}
          <li className="sm:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[6px] bg-accent-pale p-6">
              <p className="max-w-[48ch] text-[14.5px] text-ink-2">
                Want this scoped against your project? Tell us what you have and we will map the path.
              </p>
              <Button href="/start">Scope this with us</Button>
            </div>
          </li>
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
                <Cell className={cn("flex h-full flex-col p-6", on && "bg-accent-pale")}>
                  <span className={cn("h-1 w-7 rounded", on ? "bg-accent" : "bg-line-strong")} />
                  <div className={cn("mt-3 font-mono text-[12px]", on ? "text-accent-deep" : "text-muted")}>
                    {ph.n}
                  </div>
                  <h3 className="mt-1.5 font-mono text-[15px] font-medium tracking-tight text-ink">{ph.title}</h3>
                  {hardware ? (
                    <p className={cn("mt-2 flex-1 text-[13px]", on ? "text-ink-2" : "text-muted")}>{ph.scope}</p>
                  ) : (
                    <div className="flex-1" />
                  )}
                  <div
                    className={cn(
                      "mt-4 inline-flex w-fit items-center gap-1.5 rounded-pill px-2.5 py-1 text-[11px] font-medium",
                      on ? "bg-card text-accent-deep" : "text-muted",
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
        <nav
          aria-label={`More in ${p.short}`}
          className={cn(
            "grid gap-[2px]",
            prev && next ? "md:grid-cols-[1fr_0.8fr_1fr]" : prev ? "md:grid-cols-[1fr_0.8fr]" : "md:grid-cols-[0.8fr_1fr]",
          )}
        >
          {prev && (
            <NavCell href={`/services/${slug}/${prev.slug}`} dir="Previous" pos={`${idx} / ${d.subs.length}`} title={prev.title} note={prev.summary} icon={iconOf(prev.slug)} />
          )}
          <Cell className="group flex flex-col justify-between bg-accent-pale p-6 transition-colors duration-200 motion-safe:hover:bg-card">
            <Link href={`/services/${slug}`} className="flex h-full flex-col">
              <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-deep">
                {idx + 1} / {d.subs.length} in {p.short}
              </div>
              <p className="mt-2 flex-1 text-[13.5px] text-ink-2">
                {d.subs.length} services under Pillar {p.index}, one accountable team.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 motion-safe:group-hover:text-accent-deep">
                Back to {p.short} <Icon name="arrow-up-right" size={14} />
              </span>
            </Link>
          </Cell>
          {next && (
            <NavCell href={`/services/${slug}/${next.slug}`} dir="Next" pos={`${idx + 2} / ${d.subs.length}`} title={next.title} note={next.summary} icon={iconOf(next.slug)} />
          )}
        </nav>
      </FrameBlock>

      <GapStrip />
      <FinalCTA heading={d.cta.heading} accent={d.cta.accent} sub={d.cta.sub} />
    </div>
  );
}

function NavCell({ href, dir, pos, title, note, icon }: { href: string; dir: string; pos: string; title: string; note: string; icon: Parameters<typeof Icon>[0]["name"] }) {
  return (
    <Cell className="group flex flex-col p-6 transition-colors duration-200 motion-safe:hover:bg-card">
      <Link href={href} className="flex h-full flex-col">
        <div className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.12em] text-accent-deep">
          <Icon name={icon} size={16} /> {dir} · {pos}
        </div>
        <h3 className="mt-2 font-mono text-[16px] font-medium tracking-tight text-ink transition-colors duration-200 motion-safe:group-hover:text-accent-deep">
          {nbHyphen(title)}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[13.5px] text-muted">{note}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 motion-safe:group-hover:text-accent-deep">
          Explore<span className="sr-only"> {title}</span> <Icon name="arrow-right" size={14} />
        </span>
      </Link>
    </Cell>
  );
}
