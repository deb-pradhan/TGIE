import type { ReactNode } from "react";
import { site } from "@/content/site";
import { GAP } from "@/components/frame/Grid";
import { DitherField } from "@/components/illustration/DitherField";
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

function Social({ label, d }: { label: string; d: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="grid h-[34px] w-[34px] place-items-center rounded-[8px] border border-white/15 bg-forest-deep/40 text-ondark hover:text-white"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d={d} />
      </svg>
    </a>
  );
}

export function Footer() {
  const f = site.footer;
  return (
    <footer className="flex flex-col bg-[#081f18] pb-[2px] text-ondark-mut" style={{ gap: GAP }}>
      {/* link columns row — each column its own dithered cell */}
      <Row>
        <div className="grid gap-[2px] md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <DitherCell scrim contentClassName="p-6">
            <div className="flex items-center gap-2.5 font-mono text-[17px] font-bold tracking-tight text-white">
              <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-forest-deep font-mono text-[14px]">
                T
              </span>
              TGIE
            </div>
            <p className="mt-3.5 max-w-[34ch] text-[13.5px] text-ondark-mut">{f.blurb}</p>
            <div className="mt-4 flex gap-3">
              <Social label="X" d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l5 6 5-6z" />
              <Social
                label="LinkedIn"
                d="M4 4h4v16H4zM6 2a2 2 0 110 4 2 2 0 010-4zM10 8h4v2c1-2 3-2 4-2 3 0 4 2 4 5v7h-4v-6c0-2-1-2-2-2s-2 1-2 2v6h-4z"
              />
            </div>
          </DitherCell>
          {f.columns.map((col) => (
            <DitherCell key={col.title} scrim contentClassName="p-6">
              <h5 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-ondark">
                {col.title}
              </h5>
              {col.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="block py-1.5 text-[14px] text-ondark-mut hover:text-white"
                >
                  {l.label}
                </a>
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
