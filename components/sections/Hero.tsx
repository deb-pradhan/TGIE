import { site } from "@/content/site";
import { Eyebrow, Chip } from "@/components/primitives/Pill";
import { Button } from "@/components/primitives/Button";
import { FrameBlock, Cell } from "@/components/frame/Grid";
import { HeroScene } from "@/components/illustration/home/HeroScene";

/**
 * Server component on purpose: no client JS, no reveal fade on the LCP text,
 * and the figure is pure SVG (no video).
 */
export function Hero() {
  const h = site.hero;
  return (
    <FrameBlock>
      <div className="grid gap-[2px] lg:grid-cols-[0.92fr_1.1fr]">
        {/* text cell */}
        <Cell className="flex flex-col justify-center px-[var(--gutter)] py-14">
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h1 className="mt-5 font-mono text-hero font-medium leading-[1.05] tracking-tight text-ink">
            {h.line1}
          </h1>
          <p className="mt-5 max-w-[24ch] font-mono text-[clamp(1.25rem,2.1vw,1.75rem)] font-medium leading-[1.25] tracking-tight text-muted">
            {h.line2}
          </p>
          <p className="text-lead mt-6 max-w-[52ch] text-muted">
            Most ideas die after the breakthrough. In the board that won&apos;t{" "}
            <Chip>hold a signal</Chip>, the company nobody has time to form, the{" "}
            <Chip>raise</Chip> nobody prepped for. We carry all of it. You keep
            the idea.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button href="/start">Start a Project</Button>
            <Button href="#services" variant="ghost">
              See the services
            </Button>
          </div>
          <div className="mt-5 flex items-center gap-2 text-[13px] text-ink-2">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Free scoping call. Your idea stays yours from day one.
          </div>
        </Cell>

        {/* media cell: the isometric journey */}
        <div className="iso-grid relative flex min-h-[360px] flex-col justify-between gap-4 overflow-hidden rounded-[6px] bg-mint px-4 py-4 sm:px-6 sm:py-5 lg:min-h-[600px]">
          <div className="relative z-10 flex items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-[0.14em] sm:text-[11px]">
            <span className="text-teal-deep">{h.figure.caption}</span>
            <span className="hidden text-ink-2 sm:inline">{h.figure.meta}</span>
          </div>

          <div className="relative aspect-[612/380] w-full">
            <HeroScene />
          </div>

          <dl className="relative z-10 grid grid-cols-3 gap-2">
            {h.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-tile border border-line bg-card px-2.5 py-3 sm:px-4"
              >
                <dt className="font-mono whitespace-nowrap text-[15px] font-medium leading-none tracking-tight text-ink sm:text-[19px]">
                  {s.value}
                  {"unit" in s && s.unit ? (
                    <span className="ml-1 text-[11px] font-normal text-teal-deep">
                      {s.unit}
                    </span>
                  ) : null}
                </dt>
                <dd className="mt-2 text-[11.5px] leading-snug text-muted sm:text-[12px]">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="relative z-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {h.legend.map((l) => (
              <li
                key={l.k}
                className="flex items-center gap-2 rounded-chip border border-line bg-card px-2.5 py-1.5 text-[12px] text-ink-2"
              >
                <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-teal-deep font-mono text-[10px] text-white">
                  {l.k}
                </span>
                {l.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FrameBlock>
  );
}
