import { site } from "@/content/site";
import { Section } from "@/components/primitives/Section";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { Reveal } from "@/lib/motion";
import { FrameBlock, GapStrip, Cell } from "@/components/frame/Grid";
import { StockImage } from "@/components/illustration/StockImage";

// Interim stock photos per capability card.
const cardImages = ["/pillars/firmware.jpg", "/pillars/dataviz.jpg", "/pillars/edgeai.jpg"];

export function Capabilities() {
  const c = site.capabilities;
  return (
    <div className="flex flex-col gap-[2px]">
      <Section tone="paper2" id="capabilities" containerClassName="!pb-10">
        <Reveal>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <TwoToneHeading line1={c.line1} line2={c.line2} className="mt-4" />
        </Reveal>
      </Section>

      <GapStrip />

      <FrameBlock>
        <div className="relative grid gap-[2px] md:grid-cols-3">
          {c.cards.map((card, i) => (
            <Cell key={card.title} className="flex flex-col justify-center p-6">
              <h3 className="font-mono text-[16px] font-medium tracking-tight">{card.title}</h3>
              <p className="mt-2 text-[14px] text-muted">{card.body}</p>
              <div className="relative mt-4 h-[120px] overflow-hidden rounded-tile">
                <StockImage
                  src={cardImages[i]}
                  alt={card.title}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>
            </Cell>
          ))}
        </div>
      </FrameBlock>
    </div>
  );
}
