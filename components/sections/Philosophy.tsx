import Image from "next/image";
import { site } from "@/content/site";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Reveal } from "@/lib/motion";
import {
  TenetForm,
  TenetWeight,
  TenetOwn,
} from "@/components/illustration/home/TenetVignettes";

const VIGNETTES = [TenetForm, TenetWeight, TenetOwn];

export function Philosophy() {
  const p = site.philosophy;
  return (
    <>
      <FrameBlock id="philosophy">
        <div className="grid gap-[2px] lg:grid-cols-2">
          {/* text cell */}
          <Cell className="flex flex-col justify-center px-[var(--gutter)] py-14">
            <Reveal>
              <Eyebrow>{p.eyebrow}</Eyebrow>
              <TwoToneHeading
                as="h2"
                line1="You carry the vision."
                line2="We carry the weight."
                accentLine2
                className="mt-6 max-w-[22ch]"
              />
              <p className="mt-6 max-w-[56ch] text-[16px] text-muted">
                {p.sub}
              </p>
            </Reveal>
          </Cell>

          {/* image cell */}
          <Cell className="relative min-h-[320px] overflow-hidden lg:min-h-0">
            <Image
              src="/illustration/engraved-atlas.png"
              alt=""
              fill
              sizes="(min-width: 1200px) 600px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover grayscale mix-blend-multiply"
              aria-hidden
            />
          </Cell>
        </div>
      </FrameBlock>

      <GapStrip />

      <FrameBlock>
        <div className="grid gap-[2px] md:grid-cols-3">
          {p.tenets.map((t, i) => {
            const Vignette = VIGNETTES[i];
            return (
              <Cell key={t.title} className="px-6 py-6">
                <Reveal delay={i * 0.08}>
                  <Vignette />
                  <div className="mt-5 font-mono text-[13px] text-accent-deep">
                    {t.n}
                  </div>
                  <h3 className="mt-2 text-[16px] font-medium text-ink">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-muted">{t.body}</p>
                </Reveal>
              </Cell>
            );
          })}
        </div>
      </FrameBlock>
    </>
  );
}
