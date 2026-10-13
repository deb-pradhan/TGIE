"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { practices } from "@/content/practices";
import { practiceDetail } from "@/content/practiceDetail";
import { Button } from "@/components/primitives/Button";
import { Logo } from "@/components/brand/Logo";
import { Icon, IconBadge } from "@/components/icons/Icon";
import { pillarIcons, subIcons } from "@/components/icons/subIcons";
import { cn } from "@/lib/cn";

/** "page" on the exact route, "true" on a section that contains it (e.g. a pillar on its sub-page). */
function current(pathname: string, href: string) {
  if (pathname === href) return "page" as const;
  return pathname.startsWith(`${href}/`) ? ("true" as const) : undefined;
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const triggers = useRef<Record<string, HTMLAnchorElement | null>>({});
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const focusPanel = useRef(false);

  // Any navigation closes whichever menu is open (adjust state during render, not in an effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(null);
    setMobile(false);
  }

  // Esc closes whichever menu is open and hands focus back to the control that opened it
  useEffect(() => {
    if (!open && !mobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      (open ? triggers.current[open] : toggle.current)?.focus();
      setOpen(null);
      setMobile(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, mobile]);

  // ArrowDown on a trigger opens its panel and moves focus to the first sub-link
  useEffect(() => {
    if (open && focusPanel.current) panel.current?.querySelector<HTMLElement>("a[href]")?.focus();
    focusPanel.current = false;
  }, [open]);

  // Mobile menu open: lock page scroll, focus the first link, and drop out if the viewport grows past the breakpoint
  useEffect(() => {
    if (!mobile) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const onChange = () => wide.matches && setMobile(false);
    wide.addEventListener("change", onChange);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLElement>("a[href]")?.focus();
    return () => {
      wide.removeEventListener("change", onChange);
      document.body.style.overflow = prev;
    };
  }, [mobile]);

  const linkBase =
    "flex h-9 items-center self-center rounded-[8px] px-3 text-[14px] font-medium transition-colors duration-150 motion-safe:hover:bg-paper motion-safe:hover:text-graphite";
  const activeCue = "text-graphite shadow-[inset_0_-2px_0_var(--color-accent)]";

  return (
    <>
      {/* nav cell — sticky */}
      <header
        className="sticky top-0 z-50 bg-paper py-[2px]"
        onMouseLeave={(e) => {
          // don't pull the panel out from under keyboard focus
          const el = document.activeElement;
          if (!(el && e.currentTarget.contains(el) && el.matches(":focus-visible"))) setOpen(null);
        }}
        onBlur={(e) => {
          // focus moving to another element outside the bar and panel (null = clicked non-focusable / left the window)
          if (e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) setOpen(null);
        }}
      >
        {/* tap-away scrim for the mobile menu (sits under the bar, over the page) */}
        {mobile && (
          <div
            aria-hidden
            className="fixed inset-0 -z-10 bg-ink/40 lg:hidden"
            onClick={() => setMobile(false)}
          />
        )}
        <div className="relative w-full">
          <div className="rounded-[8px] bg-cell">
            <div className="mx-auto flex h-14 w-[min(var(--maxw),calc(100%-32px))] items-center gap-2 px-[var(--gutter)]">
            <Link href="/" aria-label="TGIE home" className="pr-4">
              <Logo />
            </Link>

            {/* desktop links */}
            <nav aria-label="Primary" className="hidden h-full flex-1 items-stretch lg:flex">
              {practices.map((p) => {
                const href = `/services/${p.slug}`;
                const here = current(pathname, href);
                return (
                  <div key={p.slug} className="flex items-center" onMouseEnter={() => setOpen(p.slug)}>
                    <Link
                      href={href}
                      ref={(el) => {
                        triggers.current[p.slug] = el;
                      }}
                      aria-current={here}
                      aria-expanded={open === p.slug}
                      aria-controls={open === p.slug ? "mega-panel" : undefined}
                      onKeyDown={(e) => {
                        if (e.key !== "ArrowDown") return;
                        e.preventDefault();
                        focusPanel.current = true;
                        if (open === p.slug) panel.current?.querySelector<HTMLElement>("a[href]")?.focus();
                        else setOpen(p.slug);
                      }}
                      className={cn(
                        linkBase,
                        open === p.slug ? "bg-paper text-graphite" : "text-ink-2",
                        here && activeCue,
                      )}
                    >
                      {p.short}
                    </Link>
                  </div>
                );
              })}
              <Link
                href="/insights"
                aria-current={current(pathname, "/insights")}
                className={cn(linkBase, "text-ink-2", current(pathname, "/insights") && activeCue)}
                onMouseEnter={() => setOpen(null)}
              >
                Insights
              </Link>
              <Link
                href="/company"
                aria-current={current(pathname, "/company")}
                className={cn(linkBase, "text-ink-2", current(pathname, "/company") && activeCue)}
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
              ref={toggle}
              className="ml-auto inline-flex h-11 items-center gap-2 rounded-[8px] bg-paper px-3.5 text-[13px] font-medium text-ink-2 transition-colors motion-safe:hover:bg-card lg:hidden"
              onClick={() => setMobile((v) => !v)}
              aria-expanded={mobile}
              aria-controls={mobile ? "mobile-menu" : undefined}
            >
              <Icon name={mobile ? "close" : "menu"} size={18} />
              {mobile ? "Close" : "Menu"}
            </button>
            </div>
          </div>

          {/* mega menu — cell collage (motion-safe fade) */}
          {open && (
            <div
              id="mega-panel"
              ref={panel}
              className="absolute inset-x-0 top-[calc(100%+2px)] mx-auto hidden max-w-[var(--maxw)] rounded-[8px] bg-paper p-[2px] shadow-[0_30px_50px_-30px_rgba(18,20,19,0.35)] motion-safe:animate-[fade-in_140ms_ease-out_both] lg:block"
            >
              {practices
                .filter((p) => p.slug === open)
                .map((p) => {
                  const subs = practiceDetail[p.slug].subs;
                  return (
                    <div key={p.slug} className="flex flex-col gap-[2px]">
                      {/* header cell */}
                      <div className="flex items-end justify-between gap-6 rounded-[6px] bg-cell px-6 py-5">
                        <div className="flex items-start gap-4">
                          <IconBadge name={pillarIcons[p.slug]} tone="graphite" />
                          <div>
                          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent-deep">
                            Pillar {p.index} · {p.name}
                          </div>
                          <p className="mt-2 max-w-[46ch] font-mono text-[16px] font-medium leading-snug tracking-tight text-ink">
                            {p.position}
                          </p>
                          </div>
                        </div>
                        <Link
                          href={`/services/${p.slug}`}
                          className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-ink-2 transition-colors duration-150 motion-safe:hover:text-accent-deep"
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
                            <span className="text-[13.5px] font-medium leading-snug text-ink transition-colors duration-150 motion-safe:group-hover:text-accent-deep">
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
              ref={menu}
              className="absolute inset-x-2 top-[calc(100%+2px)] max-h-[calc(100dvh-90px)] overflow-y-auto rounded-[6px] bg-paper p-[2px] shadow-[0_30px_50px_-30px_rgba(18,20,19,0.35)] motion-safe:animate-[fade-in_160ms_ease-out_both] lg:hidden"
            >
              <nav aria-label="Mobile" className="flex flex-col gap-[2px]">
                {practices.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/services/${p.slug}`}
                    aria-current={current(pathname, `/services/${p.slug}`)}
                    className="flex items-center gap-3.5 rounded-[6px] bg-cell px-4 py-3 transition-colors motion-safe:hover:bg-card aria-[current]:bg-card"
                    onClick={() => setMobile(false)}
                  >
                    <IconBadge name={pillarIcons[p.slug]} size={40} />
                    <span>
                      <span className="block text-[15px] font-medium text-ink">{p.short}</span>
                      <span className="block text-[12.5px] leading-snug text-muted">{p.tagline}</span>
                    </span>
                  </Link>
                ))}
                <Link
                  href="/insights"
                  aria-current={current(pathname, "/insights")}
                  className="rounded-[6px] bg-cell px-4 py-3.5 text-[15px] font-medium text-ink transition-colors motion-safe:hover:bg-card aria-[current]:bg-card"
                  onClick={() => setMobile(false)}
                >
                  Insights
                </Link>
                <Link
                  href="/company"
                  aria-current={current(pathname, "/company")}
                  className="rounded-[6px] bg-cell px-4 py-3.5 text-[15px] font-medium text-ink transition-colors motion-safe:hover:bg-card aria-[current]:bg-card"
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
      </header>
    </>
  );
}
