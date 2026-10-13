import { site } from "@/content/site";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Pill";
import { Icon, type IconName } from "@/components/icons/Icon";
import { Reveal } from "@/lib/motion";
import { OwnershipHero } from "@/components/illustration/home2/OwnershipHero";

const iconFor: Record<string, IconName> = {
  "Complete CAD & Gerber": "cad",
  "Firmware source access": "source-code",
  "Detailed Bill of Materials": "bom",
  "Unrestricted publication": "publish",
};

export function Ownership() {
  const o = site.ownership;
  return (
    <Section id="ownership" tone="paper2">
      <Reveal>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div>
            <Eyebrow>{o.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-mono text-h2 font-medium tracking-tight text-ink">
              {o.line1}
              <br />
              <span className="text-muted">{o.line2}</span>
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15.5px] text-muted">{o.sub}</p>
          </div>
          <div
            role="img"
            aria-label="An open crate receiving STEP, Gerber, BOM and source-code files, with an unlocked padlock and a 100% yours stamp"
            className="relative aspect-[440/270] w-full overflow-hidden rounded-card border border-line bg-card-soft"
          >
            <OwnershipHero />
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {o.items.map((it) => (
            <div key={it.title} className="flex flex-col gap-3 rounded-tile border border-line bg-card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-mint text-teal-deep">
                <Icon name={iconFor[it.title] ?? "check"} size={20} />
              </span>
              <div>
                <div className="text-[14px] font-medium text-ink">{it.title}</div>
                <div className="mt-1 text-[12.5px] text-muted">{it.note}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
