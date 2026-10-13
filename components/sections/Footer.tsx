import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { GAP } from "@/components/frame/Grid";
import { Logo } from "@/components/brand/Logo";
import { Icon, type IconName } from "@/components/icons/Icon";
import { pillarIcons, subIcons } from "@/components/icons/subIcons";
import { cn } from "@/lib/cn";

/** Footer cells: graphite cells on a near-black canvas, same 2px seams as the page. */
function DarkCell({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[6px] bg-graphite", className)}>{children}</div>
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
      <DarkCell />
      <div className="min-w-0">{children}</div>
      <DarkCell />
    </div>
  );
}

const companyIcons: Record<string, IconName> = {
  "/work": "publish",
  "/company": "partners",
  "/insights": "discover",
  "/start": "rocket",
};

function iconFor(href: string): IconName {
  const parts = href.split("/").filter(Boolean); // services/<pillar>/<sub>
  if (parts[0] === "services") {
    return (parts[2] && subIcons[parts[2]]) || pillarIcons[parts[1]] || "spark";
  }
  return companyIcons[href] ?? "arrow-right";
}

export function Footer() {
  const f = site.footer;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <footer aria-label="Site footer" className="flex flex-col bg-[#0b0d0c] pb-[2px] text-ondark-mut" style={{ gap: GAP }}>
      <h2 className="sr-only">Explore TGIE</h2>
      {/* brand + link columns */}
      <Row>
        <div className="grid grid-cols-2 gap-[2px] md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <DarkCell className="col-span-2 p-6 sm:p-7 md:col-span-1">
            <Logo variant="dark" />
            <p className="mt-4 max-w-[34ch] text-[13.5px] leading-relaxed text-ondark-mut">{f.blurb}</p>
            <Link
              href="/start"
              className="group mt-6 hidden items-center gap-2.5 rounded-btn bg-accent px-5 py-2.5 text-[14px] font-medium text-ink transition-transform duration-150 hover:-translate-y-px md:inline-flex"
            >
              Start a Project
              <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <ul className="mt-6 text-[13.5px] text-ondark">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-2.5 min-h-11 hover:text-white">
                    <Icon name="mail" size={16} className="text-accent-soft" />
                    {email}
                  </a>
                </li>
              )}
              <li>
                <a href={site.contact.phoneHref} className="inline-flex items-center gap-2.5 min-h-11 hover:text-white">
                  <Icon name="phone" size={16} className="text-accent-soft" />
                  {site.contact.phone}
                </a>
              </li>
              <li className="inline-flex items-start gap-2.5 py-2.5">
                <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-accent-soft" />
                {site.contact.location}
              </li>
            </ul>
          </DarkCell>
          {f.columns.map((col, i) => (
            <DarkCell key={col.title} className={cn("p-6 sm:p-7", i === 0 && "col-span-2 md:col-span-1")}>
              <h3 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-ondark">
                {col.title}
              </h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group flex items-center gap-3 rounded-lg py-2 text-[14px] text-ondark-mut transition-colors hover:text-white"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-white/[0.06] text-accent-soft transition-colors group-hover:bg-accent group-hover:text-ink">
                        <Icon name={iconFor(l.href)} size={15} />
                      </span>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </DarkCell>
          ))}
        </div>
      </Row>

      {/* wordmark */}
      <Row>
        <DarkCell className="pb-3 pt-4">
          <div className="flex justify-end px-5">
            <a
              href="#main"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 min-h-11 text-[12.5px] text-ondark transition-colors hover:border-white/40 hover:text-white"
            >
              Back to top
              <Icon name="arrow-up-right" size={14} className="-rotate-45" />
            </a>
          </div>
          <div
            aria-hidden
            className="pointer-events-none mt-6 select-none text-center font-mono font-bold leading-[0.8] tracking-tighter text-[#272b2a]"
            style={{ fontSize: "clamp(72px, 19vw, 260px)" }}
          >
            TGIE<span className="text-accent">_</span>
          </div>
        </DarkCell>
      </Row>

      {/* legal strip */}
      <Row>
        <DarkCell className="flex flex-wrap items-center justify-between gap-2.5 px-6 py-4 text-[12.5px]">
          <span>© 2026 The Great Indian Engineers. {site.base}.</span>
          <span>{f.legal.join(" · ")}</span>
        </DarkCell>
      </Row>
    </footer>
  );
}
