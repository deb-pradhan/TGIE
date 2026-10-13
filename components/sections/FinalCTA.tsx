import { site } from "@/content/site";
import { Section } from "@/components/primitives/Section";
import { Button } from "@/components/primitives/Button";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Reveal } from "@/lib/motion";
import { FinalScene } from "@/components/illustration/home2/FinalWeight";

export function FinalCTA({
  heading,
  accent,
  sub,
  primaryLabel = "Start a Project",
  secondaryLabel = "Call us",
  secondaryHref = site.contact.phoneHref,
}: {
  heading?: string;
  accent?: string;
  sub?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
} = {}) {
  const f = site.finalCta;
  return (
    <Section tone="paper2" id="contact" className="overflow-hidden">
      <Reveal>
        <div className="relative text-center">
          <div aria-hidden className="relative mx-auto h-[230px] max-w-[420px] sm:h-[330px]">
            <FinalScene />
          </div>
          <div className="relative mt-6">
            <TwoToneHeading as="h2" align="center" accentLine2 line1={heading ?? f.line1} line2={accent ?? f.line2} />
            <p className="mx-auto mt-4 max-w-[54ch] text-pretty text-[15px] text-muted">{sub ?? f.sub}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Button href="/start">{primaryLabel}</Button>
              <Button href={secondaryHref} variant="ghost">
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
