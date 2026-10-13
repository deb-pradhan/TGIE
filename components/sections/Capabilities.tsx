import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Section } from "@/components/primitives/Section";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { Reveal } from "@/lib/motion";
import { FrameBlock, GapStrip, Cell } from "@/components/frame/Grid";
import { Icon, type IconName } from "@/components/icons/Icon";
import { CapFirmware } from "@/components/illustration/home2/CapFirmware";
import { CapDataviz } from "@/components/illustration/home2/CapDataviz";
import { CapEdgeAI } from "@/components/illustration/home2/CapEdgeAI";

const art: { icon: IconName; fig: ReactNode }[] = [
  { icon: "firmware", fig: <CapFirmware /> },
  { icon: "dashboard", fig: <CapDataviz /> },
  { icon: "edge-ai", fig: <CapEdgeAI /> },
];

export function Capabilities() {
  const c = site.capabilities;
  return (
    <div className="flex flex-col gap-[2px]">
      <Section tone="paper2" id="capabilities" containerClassName="!pb-10 !pt-14 sm:!pt-20">
        <Reveal>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <TwoToneHeading line1={c.line1} line2={c.line2} className="mt-4" />
        </Reveal>
      </Section>

      <GapStrip />

      <FrameBlock>
        <div className="relative grid gap-[2px] md:grid-cols-3">
          {c.cards.map((card, i) => (
            <Cell key={card.title} className="flex flex-col p-5 sm:p-6">
              <div
                className="relative aspect-[400/260] w-full overflow-hidden rounded-tile border border-line bg-card-soft"
                role="img"
                aria-label={card.title}
              >
                {art[i].fig}
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-accent-pale text-accent-deep">
                  <Icon name={art[i].icon} size={18} />
                </span>
                <h3 className="font-mono text-[16px] font-medium leading-snug tracking-tight">{card.title}</h3>
              </div>
              <p className="mt-3 text-[14px] text-muted">{card.body}</p>
            </Cell>
          ))}
        </div>
      </FrameBlock>
    </div>
  );
}
