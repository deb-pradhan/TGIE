import { site } from "@/content/site";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Reveal } from "@/lib/motion";
import { EngravedFigure } from "@/components/illustration/EngravedFigure";

export function FinalCTA() {
  const f = site.finalCta;
  return (
    <Section tone="paper2" id="contact" className="overflow-hidden">
      <Reveal>
        <div className="relative grid items-center gap-10 py-6 text-center lg:grid-cols-[1fr_auto_1fr] lg:text-left">
          <div className="pointer-events-none absolute inset-0 -z-0 opacity-[0.06] lg:hidden">
            <EngravedFigure />
          </div>
          <div className="hidden lg:block">
            <EngravedFigure className="max-w-[220px] opacity-70" />
          </div>
          <div className="relative">
            <TwoToneHeading as="h2" align="center" line1={f.line1} line2={f.line2} />
            <p className="mx-auto mt-4 max-w-[54ch] text-[15px] text-muted">{f.sub}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Button href="/start">Start a Project →</Button>
              <Button href="/start" variant="ghost">
                Book a consultation
              </Button>
            </div>
          </div>
          <div className="hidden justify-end lg:flex">
            <EngravedFigure className="max-w-[220px] opacity-70" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
