"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Wraps an illustration so its CSS animations (.ill-*) only run while it is
 * on screen (design system §13 off-screen pause). Zero JS cost per frame:
 * it just toggles data-live. Reduced-motion is handled in globals.css.
 */
export function Live({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-live={live} className={cn("relative h-full w-full", className)}>
      {children}
    </div>
  );
}
