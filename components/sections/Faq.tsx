import { faqs } from "@/content/faq";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { FrameBlock, Cell } from "@/components/frame/Grid";

export function Faq() {
  return (
    <FrameBlock id="faq">
      <div className="relative grid gap-[2px] lg:grid-cols-2">
        <Cell className="flex flex-col justify-center px-[var(--gutter)] py-14">
          <Eyebrow>Insights &amp; resources</Eyebrow>
          <TwoToneHeading as="h2" line1="Everything you need" line2="to know." className="mt-4" />
          <p className="text-lead mt-3 text-muted">
            Common questions about working with TGIE across research and commercial engagements.
          </p>
        </Cell>
        <Cell className="px-[var(--gutter)] py-10">
          {faqs.map((f, i) => (
            <details key={f.q} className="group border-b border-line py-1.5 last:border-b-0" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border border-line text-teal transition-transform duration-200 group-open:rotate-45 group-open:border-forest group-open:bg-forest group-open:text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="pb-[18px] text-[14.5px] text-muted">{f.a}</p>
            </details>
          ))}
        </Cell>
      </div>
    </FrameBlock>
  );
}
