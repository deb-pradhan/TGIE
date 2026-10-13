import Link from "next/link";
import { Fragment } from "react";
import { practices } from "@/content/practices";
import { Section } from "@/components/primitives/Section";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { PillarScene } from "@/components/illustration/pillars";
import { Icon, IconBadge, type IconName } from "@/components/icons/Icon";
import { Reveal } from "@/lib/motion";
import { FrameBlock, GapStrip, Cell } from "@/components/frame/Grid";
import { cn } from "@/lib/cn";

export function Practices() {
  return (
    <div className="flex flex-col gap-[2px]">
      <Section id="services">
        <Reveal>
          <Eyebrow>Four pillars, one roof</Eyebrow>
          <TwoToneHeading
            line1="Engineering, products, business,"
            line2="and heavy fabrication."
            className="mt-4"
          />
          <p className="text-lead mt-4 max-w-[60ch] text-muted">
            Not a menu of services. Each pillar gives your idea a different form, and lifts a
            different weight. All held by one accountable team. Holding all four together is the
            part no regional competitor replicates.
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
                <IconBadge name={p.slug as IconName} className="mb-6" />

                <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-teal">
                  {`Pillar ${p.index}`}
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

                <Link
                  href={`/services/${p.slug}`}
                  className="group mt-9 inline-flex w-fit items-center gap-2 font-mono text-[13px] font-medium tracking-tight text-ink-2 transition-colors duration-200 hover:text-teal focus-visible:outline-2 focus-visible:outline-teal"
                >
                  {`Explore ${p.short.toLowerCase()}`}
                  <Icon name="arrow-right" size={16} className="transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
                </Link>
              </Cell>

              {/* illustration cell: signature isometric scene */}
              <Cell
                className={cn(
                  "relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[420px]",
                  i % 2 === 1 && "lg:order-1",
                )}
              >
                <div className="absolute inset-0">
                  <PillarScene slug={p.slug} />
                </div>
              </Cell>
            </div>
          </FrameBlock>
        </Fragment>
      ))}
    </div>
  );
}
