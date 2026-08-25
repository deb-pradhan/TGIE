"use client";

import { useState } from "react";
import Link from "next/link";
import { practices } from "@/content/practices";
import { practiceDetail } from "@/content/practiceDetail";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/cn";

export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

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
            <Link href="/" className="flex items-center gap-2.5 pr-4 font-mono text-[17px] font-bold tracking-tight">
              <span className="grid h-7 w-7 place-items-center rounded-[7px] bg-forest font-mono text-[14px] text-white">
                T
              </span>
              TGIE
            </Link>

            {/* desktop links */}
            <nav className="hidden h-full flex-1 items-stretch lg:flex">
              {practices.map((p) => (
                <div key={p.slug} className="flex items-center" onMouseEnter={() => setOpen(p.slug)}>
                  <a
                    href={`/practices/${p.slug}`}
                    className={cn(
                      "flex h-9 items-center rounded-[8px] px-3 text-[14px] font-medium transition-colors duration-150 motion-safe:hover:bg-paper motion-safe:hover:text-forest",
                      open === p.slug
                        ? "bg-paper text-forest"
                        : "text-ink-2",
                    )}
                  >
                    {p.short}
                  </a>
                </div>
              ))}
              <a
                href="/insights"
                className="flex h-9 items-center self-center rounded-[8px] px-3 text-[14px] font-medium text-ink-2 transition-colors duration-150 motion-safe:hover:bg-paper motion-safe:hover:text-forest"
                onMouseEnter={() => setOpen(null)}
              >
                Insights
              </a>
              <a
                href="/company"
                className="flex h-9 items-center self-center rounded-[8px] px-3 text-[14px] font-medium text-ink-2 transition-colors duration-150 motion-safe:hover:bg-paper motion-safe:hover:text-forest"
                onMouseEnter={() => setOpen(null)}
              >
                Company
              </a>
            </nav>

            <div className="ml-auto hidden items-center gap-3 lg:flex">
              <Button href="#contact" size="sm">
                Start a Project
              </Button>
            </div>

            {/* mobile toggle */}
            <button
              className="ml-auto rounded-[8px] border border-line bg-paper px-3 py-2 text-[13px] font-medium transition-colors motion-safe:hover:bg-card lg:hidden"
              onClick={() => setMobile((v) => !v)}
              aria-expanded={mobile}
            >
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
                        <div>
                          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-teal">
                            Pillar {p.index} · {p.name}
                          </div>
                          <p className="mt-2 max-w-[46ch] font-mono text-[16px] font-medium leading-snug tracking-tight text-ink">
                            {p.position}
                          </p>
                        </div>
                        <a
                          href={`/practices/${p.slug}`}
                          className="shrink-0 whitespace-nowrap text-[13px] font-medium text-ink-2 transition-colors duration-150 motion-safe:hover:text-teal"
                        >
                          Explore {p.short}
                        </a>
                      </div>

                      {/* sub-page cells */}
                      <div className="grid grid-cols-3 gap-[2px]">
                        {subs.map((s) => (
                          <a
                            key={s.slug}
                            href={`/practices/${p.slug}/${s.slug}`}
                            className="group flex items-center justify-between gap-2 rounded-[6px] bg-cell px-4 py-3.5 transition-colors duration-150 motion-safe:hover:bg-card"
                          >
                            <span className="text-[13.5px] font-medium text-ink transition-colors duration-150 motion-safe:group-hover:text-teal">
                              {s.title}
                            </span>
                          </a>
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
            <div className="absolute inset-x-2 top-[calc(100%+2px)] max-h-[calc(100dvh-90px)] overflow-y-auto rounded-[6px] bg-paper p-[2px] shadow-[0_30px_50px_-30px_rgba(16,54,43,0.35)] motion-safe:animate-[fade-in_160ms_ease-out_both] lg:hidden">
              <div className="flex flex-col gap-[2px]">
                {practices.map((p) => (
                  <a
                    key={p.slug}
                    href={`/practices/${p.slug}`}
                    className="rounded-[6px] bg-cell px-4 py-3.5 transition-colors motion-safe:hover:bg-card"
                    onClick={() => setMobile(false)}
                  >
                    <div className="text-[15px] font-medium text-ink">{p.short}</div>
                    <div className="text-[12px] text-muted">{p.tagline}</div>
                  </a>
                ))}
                <a
                  href="/insights"
                  className="rounded-[6px] bg-cell px-4 py-3.5 text-[15px] font-medium text-ink transition-colors motion-safe:hover:bg-card"
                  onClick={() => setMobile(false)}
                >
                  Insights
                </a>
                <a
                  href="/company"
                  className="rounded-[6px] bg-cell px-4 py-3.5 text-[15px] font-medium text-ink transition-colors motion-safe:hover:bg-card"
                  onClick={() => setMobile(false)}
                >
                  Company
                </a>
                <div className="flex gap-[2px]">
                  <a
                    href="/start"
                    className="flex-1 rounded-[6px] bg-inkbtn px-4 py-3.5 text-center text-[14px] font-medium text-white"
                    onClick={() => setMobile(false)}
                  >
                    Start a Project →
                  </a>
                  <a
                    href="#"
                    className="rounded-[6px] bg-cell px-4 py-3.5 text-[14px] font-medium text-ink-2 motion-safe:hover:bg-card"
                    onClick={() => setMobile(false)}
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
