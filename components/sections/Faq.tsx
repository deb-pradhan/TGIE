import { faqs } from "@/content/faq";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { FrameBlock, Cell } from "@/components/frame/Grid";
import { cn } from "@/lib/cn";
import { FaqScene } from "@/components/illustration/home2/FaqScene";

export function Faq({
  eyebrow = "FAQ",
  heading = { line1: "Everything you need", line2: "to know." },
}: {
  eyebrow?: string;
  heading?: { line1: string; line2?: string };
} = {}) {
  return (
    <FrameBlock id="faq">
      <div className="relative grid gap-[2px] lg:grid-cols-2">
        {/* heading cell */}
        <Cell className="px-[var(--gutter)] py-14">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>{eyebrow}</Eyebrow>
            <TwoToneHeading as="h2" line1={heading.line1} line2={heading.line2} className="mt-4" />
            <p className="text-lead mt-3 max-w-[44ch] text-muted">
              Common questions about working with TGIE across research and commercial engagements.
            </p>
            <div className="mt-8 hidden aspect-[420/330] w-full max-w-[460px] lg:block">
              <FaqScene />
            </div>
          </div>
        </Cell>

        {/* each question is its own cell, stacked with 2px seams */}
        <div className="flex flex-col gap-[2px]">
          {faqs.map((f, i) => (
            <Cell key={f.q} className={cn("min-w-0", i === faqs.length - 1 && "flex-1")}>
              <details className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center gap-3.5 px-5 py-5 text-[15.5px] font-medium sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span
                    aria-hidden
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-accent-pale font-mono text-[11px] text-accent-deep"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-card text-ink-2 transition-transform duration-200 group-open:rotate-180 group-open:text-accent-deep">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                {/* Grid-row trick: animates height/opacity without measuring. */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows,opacity] duration-200 ease-out opacity-0 group-open:grid-rows-[1fr] group-open:opacity-100">
                  <div className="min-h-0 overflow-hidden">
                    <p className="pb-5 pl-[60px] pr-5 text-[14px] text-muted sm:pr-6 sm:pl-[62px]">{f.a}</p>
                  </div>
                </div>
              </details>
            </Cell>
          ))}
        </div>
      </div>
    </FrameBlock>
  );
}
