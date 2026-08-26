import { site } from "@/content/site";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Pill";
import { Reveal } from "@/lib/motion";

const ICON_BASE = "shrink-0 text-teal";

function CadCube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={ICON_BASE} aria-hidden="true">
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5" />
      <path d="M12 12v9" />
    </svg>
  );
}

function Chip() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={ICON_BASE} aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
      <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" />
    </svg>
  );
}

function PartsList() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={ICON_BASE} aria-hidden="true">
      <rect x="3.5" y="5.5" width="2.2" height="2.2" rx="0.4" />
      <rect x="3.5" y="10.9" width="2.2" height="2.2" rx="0.4" />
      <rect x="3.5" y="16.3" width="2.2" height="2.2" rx="0.4" />
      <path d="M8 6.6h12M8 12h12M8 17.4h12" />
    </svg>
  );
}

function Document() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={ICON_BASE} aria-hidden="true">
      <path d="M6 3h8.5L19 7.5V21H6Z" />
      <path d="M14.5 3v4.5H19" />
      <path d="M9 12h6M9 15.5h6M9 18.5h4" />
    </svg>
  );
}

const iconFor: Record<string, () => React.JSX.Element> = {
  "Complete CAD & Gerber": CadCube,
  "Firmware source access": Chip,
  "Detailed Bill of Materials": PartsList,
  "Unrestricted publication": Document,
};

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
            {o.items.map((it) => {
              const Icon = iconFor[it.title];
              return (
                <div
                  key={it.title}
                  className="flex items-start gap-3 rounded-tile border border-line bg-card p-4"
                >
                  {Icon ? <Icon /> : null}
                  <div>
                    <div className="text-[14px] font-medium text-ink">{it.title}</div>
                    <div className="text-[12.5px] text-muted">{it.note}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}