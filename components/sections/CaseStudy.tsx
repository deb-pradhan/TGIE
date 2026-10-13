import { site } from "@/content/site";
import { Eyebrow } from "@/components/primitives/Pill";
import { Button } from "@/components/primitives/Button";
import { Icon } from "@/components/icons/Icon";
import { Reveal } from "@/lib/motion";
import { FrameBlock, Cell } from "@/components/frame/Grid";
import { CaseGait } from "@/components/illustration/home2/CaseGait";

export function CaseStudy({ showWorkLink = false }: { showWorkLink?: boolean } = {}) {
  const c = site.caseStudy;
  return (
    <FrameBlock id="case">
      <div className="relative grid gap-[2px] lg:grid-cols-2">
        <Cell className="flex flex-col justify-center px-[var(--gutter)] py-16">
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <div
              aria-hidden
              className="mt-5 h-[0.5em] select-none font-mono text-[clamp(88px,11vw,132px)] font-medium leading-none tracking-tighter text-accent"
            >
              &ldquo;
            </div>
            <blockquote className="mt-3 font-mono text-[clamp(20px,2.6vw,29px)] font-medium leading-snug tracking-tight text-ink">
              {c.quote}
            </blockquote>
            <div className="mt-8 flex items-stretch gap-4 text-[14px]">
              <span aria-hidden className="w-[3px] shrink-0 rounded-full bg-accent" />
              <div>
                <div className="font-medium">{c.who}</div>
                <div className="text-muted">{c.role}</div>
              </div>
            </div>
            {showWorkLink && (
              <Button href="/work" variant="ghost" size="sm" className="mt-8 min-h-11">
                Read the case studies
                <Icon name="arrow-right" size={16} className="text-accent-deep" />
              </Button>
            )}
          </Reveal>
        </Cell>
        <Cell
          className="relative min-h-[360px] overflow-hidden"
        >
          <div role="img" aria-label="Engraved plate: a gait sensor module strapped to the shank, with a gyro trace" className="absolute inset-0">
            <CaseGait />
          </div>
        </Cell>
      </div>
    </FrameBlock>
  );
}
