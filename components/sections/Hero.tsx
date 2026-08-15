import { site } from "@/content/site";
import { Eyebrow, Chip } from "@/components/primitives/Pill";
import { Button } from "@/components/primitives/Button";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Card } from "@/components/primitives/Card";
import { Reveal } from "@/lib/motion";
import { FrameBlock, Cell } from "@/components/frame/Grid";
import { PixelBackdrop } from "@/components/illustration/PixelBackdrop";
import { Donut, BarChart } from "@/components/dataviz/Charts";

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="16"
      height="34"
      viewBox="0 0 16 34"
      fill="none"
      className={flip ? "-scale-x-100" : ""}
      aria-hidden
    >
      <path
        d="M13 2C7 6 5 12 5 17s2 11 8 15"
        stroke="var(--color-muted-2)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {[6, 11, 16, 21, 26].map((y, i) => (
        <path
          key={i}
          d={`M${9 - i * 0.2} ${y}c-3 -1 -5 0 -6 2c2 1 4 1 6 -2z`}
          fill="var(--color-muted-2)"
        />
      ))}
    </svg>
  );
}

export function Hero() {
  const h = site.hero;
  return (
    <FrameBlock>
      <div className="grid gap-[2px] lg:grid-cols-[1.02fr_1.08fr]">
        {/* text cell */}
        <Cell className="flex flex-col justify-center px-[var(--gutter)] py-14">
          <Reveal>
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <TwoToneHeading as="h1" line1={h.line1} line2={h.line2} className="mt-5" />
            <p className="text-lead mt-6 max-w-[54ch] text-muted">
              Most ideas die after the breakthrough — in the board that won&apos;t{" "}
              <Chip>hold a signal</Chip>, the company nobody has time to form, the{" "}
              <Chip>raise</Chip> nobody prepped for. We carry all of it. You keep the idea.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Button href="#contact">Start a Project</Button>
              <Button href="#practices" variant="ghost">
                See the practices
              </Button>
            </div>
            <div className="mt-5 flex items-center gap-2 text-[13px] text-ink-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              Free scoping call. Your idea stays yours from day one.
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-5">
              <div className="flex items-center gap-2">
                <Laurel />
                <div className="text-center">
                  <div className="text-[15px] font-medium">50+ builds delivered</div>
                  <div className="text-[12px] text-muted">Wearable, biomechanical, IoT</div>
                </div>
                <Laurel flip />
              </div>
              <div className="flex items-center gap-2">
                <Laurel />
                <div className="text-center">
                  <div className="text-[15px] font-medium">100% IP transfer</div>
                  <div className="text-[12px] text-muted">Zero lock-in, always yours</div>
                </div>
                <Laurel flip />
              </div>
            </div>
          </Reveal>
        </Cell>

        {/* media cell — pixel art fills the cell, dashboard floats inside */}
        <Cell className="relative min-h-[420px] overflow-hidden">
          <PixelBackdrop className="rounded-[6px]" />
          <Reveal delay={0.1} className="relative flex h-full items-center justify-center p-6 sm:p-10">
            <Card className="w-full max-w-[520px] p-4 shadow-[var(--shadow-float)]">
              <div className="mb-3.5 flex items-center justify-between">
                <div>
                  <div className="text-[13.5px] font-medium">Capability overview</div>
                  <div className="text-[11px] text-muted">Multi-domain engagement · live status</div>
                </div>
                <span className="rounded-pill bg-mint px-2.5 py-1 text-[10.5px] font-medium text-teal-deep">
                  Phase 3 · DVT
                </span>
              </div>
              <div className="grid grid-cols-[1.3fr_1fr] gap-3">
                <div className="rounded-tile border border-line bg-card-soft p-3.5">
                  <div className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
                    Engineering throughput
                  </div>
                  <div className="font-mono text-[24px] font-medium">
                    50+ <span className="text-[13px] font-medium text-teal">PCBs</span>
                  </div>
                  <BarChart data={[40, 62, 48, 78, 66, 90, 72, 100]} className="mt-2.5" />
                  <div className="mt-2 flex gap-3.5 text-[10.5px] text-muted">
                    <span className="font-medium text-ink">Hardware</span>
                    <span>Firmware</span>
                    <span>Enclosure</span>
                  </div>
                </div>
                <div className="grid gap-3">
                  <div className="grid place-items-center rounded-tile border border-line bg-card-soft p-3">
                    <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.06em] text-muted">
                      Zero packet loss
                    </div>
                    <Donut value={68} />
                  </div>
                  <div className="rounded-tile border border-line bg-card-soft px-3 py-2.5 text-[11.5px]">
                    {[
                      ["PCB design", "Done"],
                      ["Firmware", "Live"],
                      ["Enclosure", "Print"],
                    ].map(([k, v], i) => (
                      <div
                        key={k}
                        className={`flex items-center justify-between py-[7px] ${i > 0 ? "border-t border-line" : ""}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                          {k}
                        </span>
                        <span className="font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </Cell>
      </div>
    </FrameBlock>
  );
}
