"use client";

import { useState } from "react";
import Link from "next/link";
import { practices } from "@/content/practices";
import { practiceDetail } from "@/content/practiceDetail";
import { site } from "@/content/site";
import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/cn";

export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  return (
    <>
      {/* announcement cell — spans the screen */}
      <div className="bg-paper pt-[2px]">
        <div className="flex h-10 items-center justify-center gap-3 rounded-[8px] bg-inkbtn text-[13px] text-white">
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium">
            {site.announcement.label}
          </span>
          <span className="text-white/85">{site.announcement.text}</span>
          <a href={site.announcement.href} className="hidden font-medium text-white hover:underline sm:inline">
            {site.announcement.cta} →
          </a>
        </div>
      </div>

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
                      "flex h-9 items-center rounded-[8px] px-3 text-[14px] font-medium transition-colors",
                      open === p.slug
                        ? "bg-paper text-forest"
                        : "text-ink-2 hover:bg-paper hover:text-forest",
                    )}
                  >
                    {p.short}
                  </a>
                </div>
              ))}
              <a
                href="/insights"
                className="flex h-9 items-center self-center rounded-[8px] px-3 text-[14px] font-medium text-ink-2 hover:bg-paper hover:text-forest"
                onMouseEnter={() => setOpen(null)}
              >
                Insights
              </a>
              <a
                href="/company"
                className="flex h-9 items-center self-center rounded-[8px] px-3 text-[14px] font-medium text-ink-2 hover:bg-paper hover:text-forest"
                onMouseEnter={() => setOpen(null)}
              >
                Company
              </a>
            </nav>

            <div className="ml-auto hidden items-center gap-3 lg:flex">
              <a
                href="#"
                className="flex h-9 items-center rounded-[8px] px-3 text-[14px] font-medium text-ink-2 hover:bg-paper hover:text-forest"
              >
                Client Login
              </a>
              <Button href="#contact" size="sm">
                Start a Project
              </Button>
            </div>

            {/* mobile toggle */}
            <button
              className="ml-auto rounded-[8px] border border-line bg-paper px-3 py-2 text-[13px] font-medium lg:hidden"
              onClick={() => setMobile((v) => !v)}
              aria-expanded={mobile}
            >
              {mobile ? "Close" : "Menu"}
            </button>
            </div>
          </div>

          {/* mega menu cell */}
          {open && (
            <div className="absolute inset-x-0 top-[calc(100%+2px)] mx-auto hidden max-w-[var(--maxw)] rounded-[6px] bg-cell shadow-[0_30px_50px_-30px_rgba(16,54,43,0.35)] lg:block">
              {practices
                .filter((p) => p.slug === open)
                .map((p) => (
                  <div key={p.slug} className="grid grid-cols-[1.4fr_1fr] gap-[2px] p-[2px]">
                    <div className="rounded-[8px] bg-paper/60 p-6">
                      <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-teal">
                        {p.index} · {p.name}
                      </div>
                      <p className="mt-2 max-w-[44ch] font-mono text-[17px] font-medium leading-snug tracking-tight text-ink">
                        {p.position}
                      </p>
                      <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
                        {practiceDetail[p.slug].subs.map((s) => (
                          <a
                            key={s.slug}
                            href={`/practices/${p.slug}/${s.slug}`}
                            className="group block"
                          >
                            <div className="text-[14px] font-medium text-ink group-hover:text-teal">
                              {s.title}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-between rounded-[8px] bg-forest p-5 text-ondark">
                      <div>
                        <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-teal-soft">
                          The body we give
                        </div>
                        <p className="mt-2 font-mono text-[15px] font-medium leading-snug">{p.body}</p>
                        <div className="mt-4 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-teal-soft">
                          The weight we lift
                        </div>
                        <p className="mt-2 text-[13.5px] text-ondark-mut">{p.weight}</p>
                      </div>
                      <a href={`/practices/${p.slug}`} className="mt-4 text-[13px] font-medium text-white">
                        Explore {p.short} →
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* mobile menu cell */}
          {mobile && (
            <div className="absolute inset-x-2 top-[calc(100%+2px)] rounded-[6px] bg-cell p-4 shadow-[0_30px_50px_-30px_rgba(16,54,43,0.35)] lg:hidden">
              <div className="flex flex-col">
                {practices.map((p) => (
                  <a
                    key={p.slug}
                    href={`/practices/${p.slug}`}
                    className="border-b border-line py-3 text-[15px] font-medium"
                    onClick={() => setMobile(false)}
                  >
                    {p.short}
                    <span className="ml-2 text-[12px] text-muted">{p.tagline}</span>
                  </a>
                ))}
                <a
                  href="/insights"
                  className="border-b border-line py-3 text-[15px] font-medium"
                  onClick={() => setMobile(false)}
                >
                  Insights
                </a>
                <a
                  href="/company"
                  className="border-b border-line py-3 text-[15px] font-medium last:border-b-0"
                  onClick={() => setMobile(false)}
                >
                  Company
                </a>
                <div className="flex gap-3 pt-4">
                  <Button href="#contact" size="sm">
                    Start a Project
                  </Button>
                  <Button href="#" variant="ghost" size="sm">
                    Client Login
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
