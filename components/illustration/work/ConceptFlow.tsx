import { Cell } from "@/components/frame/Grid";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Live } from "../Live";
import { practices } from "@/content/practices";
import { work } from "@/content/pages";
import { PillarStrip } from "./CaseCard";
import { PillarGlyph, StageArt, type StageId } from "./ConceptStages";

const ART: StageId[] = ["prototype", "trials", "production"];

function Connector() {
  return (
    <li aria-hidden className="flex items-center justify-center py-1 md:px-2 md:py-0">
      <svg viewBox="0 0 12 40" className="h-9 w-3 md:hidden">
        <path className="ill-dash" d="M6 0V30" stroke="var(--color-accent)" strokeWidth="1.8" strokeDasharray="5 5" fill="none" />
        <path d="M1 28l5 8 5-8z" fill="var(--color-accent)" />
      </svg>
      <svg viewBox="0 0 48 12" className="hidden h-3 w-12 md:block">
        <path className="ill-dash" d="M0 6H38" stroke="var(--color-accent)" strokeWidth="1.8" strokeDasharray="5 5" fill="none" />
        <path d="M36 1l8 5-8 5z" fill="var(--color-accent)" />
      </svg>
    </li>
  );
}

/** Flagship diagram: A prototype -> field trials -> D production run, held by one relationship. */
export function ConceptFlow() {
  const c = work.concept;
  return (
    <Cell className="px-[var(--gutter)] py-12 sm:py-16">
      <div className="mx-auto max-w-[var(--maxw)]">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <TwoToneHeading as="h2" line1={c.title} className="mt-4 max-w-[22ch]" />
        <p className="mt-4 max-w-[62ch] text-[14.5px] text-ink-2">{c.note}</p>

        <Live className="mt-10">
          <div role="group" aria-label={`${c.stages.map((s) => s.title).join(", then ")}, all inside ${c.bracket.title.toLowerCase()}`}>
            <div className="relative pl-6 md:pb-6 md:pl-0">
              <span
                aria-hidden
                className="absolute bottom-2 left-0 top-2 w-3 rounded-l-xl border-y-2 border-l-2 border-accent/55 md:inset-x-2 md:bottom-0 md:left-2 md:right-2 md:top-auto md:h-3 md:w-auto md:rounded-l-none md:rounded-b-xl md:border-y-0 md:border-b-2 md:border-l-2 md:border-r-2"
              />
              <ol className="grid items-stretch md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                {c.stages.flatMap((s, i) => [
                  i > 0 && <Connector key={`c${i}`} />,
                  <li key={s.n} className="flex flex-col overflow-hidden rounded-[12px] border border-line bg-card">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <StageArt id={ART[i]} />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                        <span>{s.n}</span>
                        <PillarStrip pillars={[s.pillar]} className="gap-3 text-accent-deep" />
                      </div>
                      <h3 className="mt-2 font-mono text-[16px] font-medium tracking-tight text-ink">{s.title}</h3>
                      <p className="mt-1.5 text-[13.5px] text-ink-2">{s.note}</p>
                    </div>
                  </li>,
                ])}
              </ol>
            </div>

            <div className="mt-4 flex flex-col items-center gap-5 text-center">
              <div className="inline-flex items-center gap-2.5 rounded-pill border border-line bg-card px-4 py-2 font-mono text-[12px] tracking-tight text-ink">
                <span className="grid h-5 w-5 place-items-center rounded-[6px] bg-graphite text-[10px] font-bold text-white">T</span>
                <span className="font-medium">{c.bracket.title}.</span>
                <span className="text-ink-2">{c.bracket.note}</span>
              </div>
              <ul className="grid w-full max-w-[720px] grid-cols-2 gap-[2px] sm:grid-cols-4">
                {practices.map((p) => (
                  <li
                    key={p.slug}
                    className="flex items-center justify-center gap-2 rounded-[6px] bg-card-soft px-3 py-3 font-mono text-[12px] tracking-tight text-ink-2"
                  >
                    <PillarGlyph pillar={p.index as "A" | "B" | "C" | "D"} />
                    <span>
                      <span className="font-medium">{p.index}</span> {p.short}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Live>
      </div>
    </Cell>
  );
}
