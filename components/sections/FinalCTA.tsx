import { site } from "@/content/site";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Reveal } from "@/lib/motion";
import { FinalPillars, FinalGlobe } from "@/components/illustration/home2/FinalWeight";

export function FinalCTA() {
  const f = site.finalCta;
  return (
    <Section tone="paper2" id="contact" className="overflow-hidden">
      <Reveal>
        <div className="relative text-center">
          <div aria-hidden className="mx-auto flex max-w-[640px] items-end justify-center gap-2 sm:gap-6">
            <div className="relative h-[170px] w-1/2 sm:h-[290px]">
              <FinalPillars />
            </div>
            <div className="relative h-[170px] w-1/2 sm:h-[290px]">
              <FinalGlobe />
            </div>
          </div>
          <div className="relative mt-6">
            <TwoToneHeading as="h2" align="center" accentLine2 line1={f.line1} line2={f.line2} />
            <p className="mx-auto mt-4 max-w-[54ch] text-[15px] text-muted">{f.sub}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Button href="/start">Start a Project</Button>
              <Button href="/start" variant="ghost">
                Book a consultation
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
