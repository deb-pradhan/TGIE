import { site } from "@/content/site";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Pill";
import { Reveal } from "@/lib/motion";

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-teal">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Ownership() {
  const o = site.ownership;
  return (
    <Section id="ownership" tone="paper2">
      <Reveal>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <Eyebrow>{o.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-mono text-h2 font-medium tracking-tight text-ink">
              {o.line1}
              <br />
              <span className="text-muted">{o.line2}</span>
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15.5px] text-muted">{o.sub}</p>
          </div>
          <div className="grid gap-3">
            {o.items.map((it) => (
              <div
                key={it.title}
                className="flex items-start gap-3 rounded-tile border border-line bg-card p-4"
              >
                <Check />
                <div>
                  <div className="text-[14px] font-medium text-ink">{it.title}</div>
                  <div className="text-[12.5px] text-muted">{it.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
