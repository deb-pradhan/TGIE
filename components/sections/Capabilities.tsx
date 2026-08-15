import { site } from "@/content/site";
import { Section } from "@/components/primitives/Section";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { Reveal } from "@/lib/motion";
import { FrameBlock, GapStrip, Cell } from "@/components/frame/Grid";
import { PixelBackdrop } from "@/components/illustration/PixelBackdrop";
import { LineChart, BarChart, Gauge } from "@/components/dataviz/Charts";

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
          {c.cards.map((card) => (
            <Cell key={card.title} className="flex flex-col justify-center p-6">
              <h3 className="font-mono text-[16px] font-medium tracking-tight">{card.title}</h3>
              <p className="mt-2 text-[14px] text-muted">{card.body}</p>
              <div className="relative mt-4 h-[120px] overflow-hidden rounded-tile">
                <PixelBackdrop />
                <div className="absolute inset-3 grid place-items-center rounded-[8px] border border-line bg-card p-2">
                  {card.chart === "line" && <LineChart />}
                  {card.chart === "bar" && <BarChart data={[40, 70, 55, 85, 62, 95]} />}
                  {card.chart === "gauge" && <Gauge value="45.2K" />}
                </div>
              </div>
            </Cell>
          ))}
        </div>
      </FrameBlock>
    </div>
  );
}
