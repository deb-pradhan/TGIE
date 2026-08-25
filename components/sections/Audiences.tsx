import { audiences } from "@/content/pages";
import { Section } from "@/components/primitives/Section";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { FrameBlock, Cell } from "@/components/frame/Grid";
import { Reveal } from "@/lib/motion";

export function Audiences() {
  return (
    <>
      <Section id="audiences" containerClassName="!pb-8">
        <Reveal>
          <Eyebrow>{audiences.eyebrow}</Eyebrow>
          <TwoToneHeading line1={audiences.line1} line2={audiences.line2} className="mt-4" />
          <p className="text-lead mt-4 max-w-[58ch] text-muted">{audiences.lead}</p>
        </Reveal>
      </Section>
      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-3">
          {audiences.items.map((it, i) => (
            <Cell key={it.title} className="p-6">
              <Reveal delay={i * 0.08}>
                <div className="font-mono text-[13px] text-teal">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-mono text-[16px] font-medium tracking-tight text-ink">
                  {it.title}
                </h3>
                <p className="mt-2 text-[13.5px] text-muted">{it.note}</p>
              </Reveal>
            </Cell>
          ))}
        </div>
      </FrameBlock>
    </>
  );
}
