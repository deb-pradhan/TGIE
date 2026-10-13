"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Reveal on scroll (designsystem §13): fade + rise, once.
 *
 * Content is server-rendered fully visible (no JS, no LCP penalty). After
 * hydration, only blocks that start below the fold are hidden, then eased in
 * by one shared IntersectionObserver. Reduced motion: never touched.
 * Styles: `.reveal-pending` / `.reveal-in` in app/globals.css.
 */

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        // reveal when entering, or when it is already behind us (anchor jump)
        if (e.isIntersecting || e.boundingClientRect.bottom <= 0) {
          e.target.classList.replace("reveal-pending", "reveal-in");
          observer?.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -80px 0px" },
  );
  return observer;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // already on screen at load: leave it alone (no flash, no layout shift)
    if (el.getBoundingClientRect().top < window.innerHeight - 80) return;
    el.classList.add("reveal-pending");
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  const style = { "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as CSSProperties;
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
