import type { ReactNode } from "react";
import { Fragment } from "react";
import { practices } from "@/content/practices";
import { Section } from "@/components/primitives/Section";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { IsoScene } from "@/components/illustration/Iso";
import { Reveal } from "@/lib/motion";
import { FrameBlock, GapStrip, Cell } from "@/components/frame/Grid";
import { cn } from "@/lib/cn";

const icons: Record<string, ReactNode> = {
  engineering: <path d="M8 4h8v16H8zM4 8h4M4 12h4M4 16h4M16 8h4M16 12h4M16 16h4M11 10h2v4h-2z" />,
  research: <path d="M9 3h6M10 3v6l-4.5 8.5A2 2 0 007.3 21h9.4a2 2 0 001.8-3.5L14 9V3" />,
  fabrication: <path d="M3 21h18M5 21V11l4 3V11l4 3V11l4 3v7M8 6V4" />,
  enablement: <path d="M4 21h16M6 21V8l6-4 6 4v13M10 21v-5h4v5" />,
  "fundraising-gtm": <path d="M4 15l5-5 4 4 7-8M15 6h6v6" />,
};

export function Practices() {
  return (
    <div className="flex flex-col gap-[2px]">
      <Section id="practices">
        <Reveal>
          <Eyebrow>Practice domains</Eyebrow>
          <TwoToneHeading
            line1="Four practices, one more —"
            line2="each with a point of view."
            className="mt-4"
          />
          <p className="text-lead mt-4 max-w-[58ch] text-muted">
            Not a menu of services. Each domain gives your idea a different body, and lifts a
            different weight — held by one accountable team.
          </p>
        </Reveal>
      </Section>

      {practices.map((p, i) => (
        <Fragment key={p.slug}>
          <GapStrip />
          <FrameBlock id={p.slug} className="scroll-mt-24">
            <div className="relative grid gap-[2px] lg:grid-cols-2">

              {/* text cell — vertically centered, left aligned */}
              <Cell
                className={cn(
                  "flex flex-col justify-center px-[var(--gutter)] py-14",
                  i % 2 === 1 && "lg:order-2",
                )}
              >
                <div className="mb-6 grid h-11 w-11 place-items-center rounded-tile bg-mint text-teal">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    {icons[p.slug]}
                  </svg>
                </div>

                <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-teal">
                  {`Practice ${p.index}`}
                </div>
                <h3 className="mt-2 font-mono text-h3 font-medium tracking-tight">{p.name}</h3>
                <p className="mt-3 max-w-[42ch] text-[15.5px] text-muted">{p.position}</p>

                <div className="mt-8 grid max-w-[30rem] grid-flow-col grid-cols-2 grid-rows-2 gap-x-10 gap-y-7">
                  {p.capabilities.map((c, idx) => (
                    <div key={c.title}>
                      <div className="font-mono text-[15px] text-ink-2">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-2 text-[14.5px] font-medium">{c.title}</div>
                      <div className="mt-0.5 text-[12.5px] text-muted">{c.note}</div>
                    </div>
                  ))}
                </div>
              </Cell>

              {/* illustration cell */}
              <Cell
                className={cn(
                  "iso-grid flex min-h-[300px] items-center justify-center overflow-hidden p-8",
                  i % 2 === 1 && "lg:order-1",
                )}
              >
                <IsoScene variant={p.illustration} bare className="w-full max-w-[360px]" />
              </Cell>
            </div>
          </FrameBlock>
        </Fragment>
      ))}
    </div>
  );
}
