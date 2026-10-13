import type { ReactNode } from "react";
import { site } from "@/content/site";
import { GAP } from "@/components/frame/Grid";
import { DitherField } from "@/components/illustration/DitherField";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";

/**
 * Every footer cell carries the dither. Text cells get a dark scrim over the
 * dither so copy stays clearly legible; empty/wordmark cells show it at full
 * strength.
 */
function DitherCell({
  children,
  className,
  contentClassName,
  scrim = false,
}: {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  scrim?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[6px] bg-forest", className)}>
      <DitherField />
      {scrim && <div aria-hidden className="absolute inset-0 bg-[#081f18]/70" />}
      {children && <div className={cn("relative z-10", contentClassName)}>{children}</div>}
    </div>
  );
}

/** Same geometry as FrameBlock: edge cells stretch to the screen edges. */
function Row({ children }: { children: ReactNode }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `minmax(14px,1fr) min(var(--maxw), calc(100% - 28px - ${GAP * 2}px)) minmax(14px,1fr)`,
        gap: GAP,
      }}
    >
      <DitherCell />
      <div className="min-w-0">{children}</div>
      <DitherCell />
    </div>
  );
}

export function Footer() {
  const f = site.footer;
  return (
    <footer aria-label="Site footer" className="flex flex-col bg-[#081f18] pb-[2px] text-ondark-mut" style={{ gap: GAP }}>
      {/* link columns row — each column its own dithered cell */}
      <Row>
        <div className="grid gap-[2px] md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <DitherCell scrim contentClassName="p-6">
            <Logo variant="dark" />
            <p className="mt-3.5 max-w-[34ch] text-[13.5px] text-ondark-mut">{f.blurb}</p>
            <ul className="mt-5 space-y-2.5 text-[13.5px] text-ondark">
              <li>
                <a href={site.contact.phoneHref} className="inline-flex items-center gap-2.5 hover:text-white">
                  <Icon name="phone" size={16} className="text-teal-soft" />
                  {site.contact.phone}
                </a>
              </li>
              {process.env.NEXT_PUBLIC_CONTACT_EMAIL && (
                <li>
                  <a
                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2.5 hover:text-white"
                  >
                    <Icon name="mail" size={16} className="text-teal-soft" />
                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                  </a>
                </li>
              )}
              <li className="inline-flex items-center gap-2.5">
                <Icon name="pin" size={16} className="text-teal-soft" />
                {site.contact.location}
              </li>
            </ul>
          </DitherCell>
          {f.columns.map((col) => (
            <DitherCell key={col.title} scrim contentClassName="p-6">
              <h5 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ondark">
                {col.title}
              </h5>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="block py-1.5 text-[14px] text-ondark-mut hover:text-white focus-visible:outline-2 focus-visible:outline-teal"
                >
                  {l.label}
                </Link>
              ))}
            </DitherCell>
          ))}
        </div>
      </Row>

      {/* wordmark cell — dither at full strength, no scrim */}
      <Row>
        <DitherCell contentClassName="px-6 py-2">
          <div
            className="select-none text-center font-mono font-medium leading-[0.95] tracking-tighter text-transparent"
            style={{
              fontSize: "clamp(60px, 15vw, 180px)",
              WebkitTextStroke: "1px rgba(255,255,255,0.22)",
            }}
          >
            TGIE
          </div>
        </DitherCell>
      </Row>

      {/* legal strip cell */}
      <Row>
        <DitherCell
          scrim
          contentClassName="flex flex-wrap items-center justify-between gap-2.5 px-6 py-4 text-[12.5px]"
        >
          <span>© 2026 The Great Indian Engineers. {site.base}.</span>
          <span>{f.legal.join(" · ")}</span>
        </DitherCell>
      </Row>
    </footer>
  );
}
