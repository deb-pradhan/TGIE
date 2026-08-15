import { faqs } from "@/content/faq";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { FrameBlock, Cell } from "@/components/frame/Grid";

export function Faq() {
  return (
    <FrameBlock id="faq">
      <div className="relative grid gap-[2px] lg:grid-cols-2">
        {/* heading cell */}
        <Cell className="flex flex-col justify-center px-[var(--gutter)] py-14">
          <Eyebrow>Insights &amp; resources</Eyebrow>
          <TwoToneHeading as="h2" line1="Everything you need" line2="to know." className="mt-4" />
          <p className="text-lead mt-3 text-muted">
            Common questions about working with TGIE across research and commercial engagements.
          </p>
        </Cell>

        {/* each question is its own cell, stacked with 2px seams */}
        <div className="flex flex-col gap-[2px]">
          {faqs.map((f, i) => (
            <Cell key={f.q} className="min-w-0">
              <details className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15.5px] font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] bg-card text-ink-2 transition-transform duration-200 group-open:rotate-180 group-open:text-teal">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </summary>
                <p className="px-6 pb-5 text-[14px] text-muted">{f.a}</p>
              </details>
            </Cell>
          ))}
        </div>
      </div>
    </FrameBlock>
  );
}
