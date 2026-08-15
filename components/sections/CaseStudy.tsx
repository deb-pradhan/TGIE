import { site } from "@/content/site";
import { Eyebrow } from "@/components/primitives/Pill";
import { Reveal } from "@/lib/motion";
import { EngravedFigure } from "@/components/illustration/EngravedFigure";
import { FrameBlock, Cell } from "@/components/frame/Grid";

export function CaseStudy() {
  const c = site.caseStudy;
  return (
    <FrameBlock id="case">
      <div className="relative grid gap-[2px] lg:grid-cols-2">
        <Cell className="flex flex-col justify-center px-[var(--gutter)] py-16">
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <blockquote className="mt-4 font-mono text-[clamp(20px,2.6vw,29px)] font-medium leading-snug tracking-tight text-ink">
              &ldquo;{c.quote}&rdquo;
            </blockquote>
            <div className="mt-6 text-[14px]">
              <div className="font-medium">{c.who}</div>
              <div className="text-muted">{c.role}</div>
            </div>
          </Reveal>
        </Cell>
        <Cell className="flex items-center justify-center px-[var(--gutter)] py-16">
          <Reveal delay={0.1} className="w-full">
            <EngravedFigure className="mx-auto max-w-[320px]" />
          </Reveal>
        </Cell>
      </div>
    </FrameBlock>
  );
}
