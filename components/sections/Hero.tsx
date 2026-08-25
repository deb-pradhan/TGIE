import { site } from "@/content/site";
import { Eyebrow, Chip } from "@/components/primitives/Pill";
import { Button } from "@/components/primitives/Button";
import { Reveal } from "@/lib/motion";
import { FrameBlock, Cell } from "@/components/frame/Grid";

export function Hero() {
  const h = site.hero;
  return (
    <FrameBlock>
      <div className="grid gap-[2px] lg:grid-cols-[1.02fr_1.08fr]">
        {/* text cell */}
        <Cell className="flex flex-col justify-center px-[var(--gutter)] py-14">
          <Reveal>
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-mono text-hero font-medium leading-[1.05] tracking-tight text-ink">
              {h.line1}
            </h1>
            <p className="mt-5 max-w-[24ch] font-mono text-[clamp(1.25rem,2.1vw,1.75rem)] font-medium leading-[1.25] tracking-tight text-muted">
              {h.line2}
            </p>
            <p className="text-lead mt-6 max-w-[52ch] text-muted">
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

          </Reveal>
        </Cell>

        {/* media cell — industrial robotics video fills the cell, dashboard floats inside */}
        <Cell className="relative min-h-[420px] overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/hero/fabrication-robotics.mp4"
            poster="/hero/fabrication-robotics.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-forest-deep/55 via-forest-deep/20 to-transparent" />
        </Cell>
      </div>
    </FrameBlock>
  );
}
