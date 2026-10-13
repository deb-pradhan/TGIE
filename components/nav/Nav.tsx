"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { practices } from "@/content/practices";
import { practiceDetail } from "@/content/practiceDetail";
import { Button } from "@/components/primitives/Button";
import { Logo } from "@/components/brand/Logo";
import { Icon, IconBadge } from "@/components/icons/Icon";
import { pillarIcons, subIcons } from "@/components/icons/subIcons";
import { cn } from "@/lib/cn";

export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  // Esc closes whichever menu is open
  useEffect(() => {
    if (!open && !mobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mobile]);

  return (
    <>
      {/* nav cell — sticky */}
      <div
        className="sticky top-0 z-50 bg-paper py-[2px]"
        onMouseLeave={() => setOpen(null)}
      >
        <div className="relative w-full">
          <div className="rounded-[8px] bg-cell">
            <div className="mx-auto flex h-14 max-w-[var(--maxw)] items-center gap-2 px-4">
            <Link href="/" aria-label="TGIE home" className="pr-4 focus-visible:outline-2 focus-visible:outline-teal">
              <Logo />
            </Link>

            {/* desktop links */}
            <nav aria-label="Primary" className="hidden h-full flex-1 items-stretch lg:flex">
              {practices.map((p) => (
                <div key={p.slug} className="flex items-center" onMouseEnter={() => setOpen(p.slug)}>
                  <Link
                    href={`/services/${p.slug}`}
                    onFocus={() => setOpen(p.slug)}
                    className={cn(
                      "flex h-9 items-center rounded-[8px] px-3 text-[14px] font-medium transition-colors duration-150 motion-safe:hover:bg-paper motion-safe:hover:text-forest",
                      open === p.slug
                        ? "bg-paper text-forest"
                        : "text-ink-2",
                    )}
                  >
                    {p.short}
                  </Link>
                </div>
              ))}
              <Link
                href="/insights"
                className="flex h-9 items-center self-center rounded-[8px] px-3 text-[14px] font-medium text-ink-2 transition-colors duration-150 motion-safe:hover:bg-paper motion-safe:hover:text-forest"
                onMouseEnter={() => setOpen(null)}
              >
                Insights
              </Link>
              <Link
                href="/company"
                className="flex h-9 items-center self-center rounded-[8px] px-3 text-[14px] font-medium text-ink-2 transition-colors duration-150 motion-safe:hover:bg-paper motion-safe:hover:text-forest"
                onMouseEnter={() => setOpen(null)}
              >
                Company
              </Link>
            </nav>

            <div className="ml-auto hidden items-center gap-3 lg:flex">
              <Button href="/start" size="sm">
                Start a Project
              </Button>
            </div>

            {/* mobile toggle */}
            <button
              className="ml-auto inline-flex h-11 items-center gap-2 rounded-[8px] bg-paper px-3.5 text-[13px] font-medium text-ink-2 transition-colors focus-visible:outline-2 focus-visible:outline-teal motion-safe:hover:bg-card lg:hidden"
              onClick={() => setMobile((v) => !v)}
              aria-expanded={mobile}
              aria-controls="mobile-menu"
            >
              <Icon name={mobile ? "close" : "menu"} size={18} />
              {mobile ? "Close" : "Menu"}
            </button>
            </div>
          </div>

          {/* mega menu — cell collage (motion-safe fade) */}
          {open && (
            <div className="absolute inset-x-0 top-[calc(100%+2px)] mx-auto hidden max-w-[var(--maxw)] rounded-[8px] bg-paper p-[2px] shadow-[0_30px_50px_-30px_rgba(16,54,43,0.35)] motion-safe:animate-[fade-in_140ms_ease-out_both] lg:block">
              {practices
                .filter((p) => p.slug === open)
                .map((p) => {
                  const subs = practiceDetail[p.slug].subs;
                  return (
                    <div key={p.slug} className="flex flex-col gap-[2px]">
                      {/* header cell */}
                      <div className="flex items-end justify-between gap-6 rounded-[6px] bg-cell px-6 py-5">
                        <div className="flex items-start gap-4">
                          <IconBadge name={pillarIcons[p.slug]} tone="forest" />
                          <div>
                          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-teal">
                            Pillar {p.index} · {p.name}
                          </div>
                          <p className="mt-2 max-w-[46ch] font-mono text-[16px] font-medium leading-snug tracking-tight text-ink">
                            {p.position}
                          </p>
                          </div>
                        </div>
                        <Link
                          href={`/services/${p.slug}`}
                          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-ink-2 transition-colors duration-150 motion-safe:hover:text-teal"
                        >
                          Explore {p.short}
                          <Icon name="arrow-right" size={15} />
                        </Link>
                      </div>

                      {/* sub-page cells */}
                      <div className="grid grid-cols-3 gap-[2px]">
                        {subs.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${p.slug}/${s.slug}`}
                            onClick={() => setOpen(null)}
                            className="group flex items-center gap-3 rounded-[6px] bg-cell px-4 py-3 transition-colors duration-150 motion-safe:hover:bg-card"
                          >
                            <IconBadge name={subIcons[s.slug] ?? "spark"} size={32} />
                            <span className="text-[13.5px] font-medium leading-snug text-ink transition-colors duration-150 motion-safe:group-hover:text-teal">
                              {s.title}
                            </span>
                          </Link>
                        ))}
                        {subs.length % 3 !== 0 &&
                          Array.from({ length: 3 - (subs.length % 3) }).map((_, i) => (
                            <div key={i} aria-hidden className="rounded-[6px] bg-cell" />
                          ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* mobile menu cell (motion-safe fade) */}
          {mobile && (
            <div
              id="mobile-menu"
              className="absolute inset-x-2 top-[calc(100%+2px)] max-h-[calc(100dvh-90px)] overflow-y-auto rounded-[6px] bg-paper p-[2px] shadow-[0_30px_50px_-30px_rgba(16,54,43,0.35)] motion-safe:animate-[fade-in_160ms_ease-out_both] lg:hidden"
            >
              <nav aria-label="Mobile" className="flex flex-col gap-[2px]">
                {practices.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/services/${p.slug}`}
                    className="flex items-center gap-3.5 rounded-[6px] bg-cell px-4 py-3 transition-colors motion-safe:hover:bg-card"
                    onClick={() => setMobile(false)}
                  >
                    <IconBadge name={pillarIcons[p.slug]} size={40} />
                    <span>
                      <span className="block text-[15px] font-medium text-ink">{p.short}</span>
                      <span className="block text-[12.5px] leading-snug text-ink-2/70">{p.tagline}</span>
                    </span>
                  </Link>
                ))}
                <Link
                  href="/insights"
                  className="rounded-[6px] bg-cell px-4 py-3.5 text-[15px] font-medium text-ink transition-colors motion-safe:hover:bg-card"
                  onClick={() => setMobile(false)}
                >
                  Insights
                </Link>
                <Link
                  href="/company"
                  className="rounded-[6px] bg-cell px-4 py-3.5 text-[15px] font-medium text-ink transition-colors motion-safe:hover:bg-card"
                  onClick={() => setMobile(false)}
                >
                  Company
                </Link>
                <Link
                  href="/start"
                  className="flex items-center justify-center gap-2 rounded-[6px] bg-inkbtn px-4 py-3.5 text-center text-[14.5px] font-medium text-white"
                  onClick={() => setMobile(false)}
                >
                  Start a Project
                  <Icon name="arrow-right" size={16} />
                </Link>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
