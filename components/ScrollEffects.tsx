"use client";

import { useEffect } from "react";

/**
 * The page's only scroll-driven client code. `Live` and `Reveal` render plain
 * server markup (`data-live`, `data-reveal`); this one component watches them
 * with shared IntersectionObservers, so the ~100 figures/blocks on a page cost
 * no hydration of their own.
 *
 *  - `[data-live]`   gets data-live="true" while within 80px of the viewport
 *                    (illustration animations run only then, designsystem §13).
 *  - `[data-reveal]` blocks that start below the fold are hidden after hydration
 *                    and eased in once (`.reveal-pending` / `.reveal-in`, globals.css).
 *                    Server HTML is fully visible, so no-JS and LCP are unaffected.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const liveIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) (e.target as HTMLElement).dataset.live = String(e.isIntersecting);
      },
      { rootMargin: "80px" },
    );

    const revealIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // reveal when entering, or when already behind us (anchor jump)
          if (e.isIntersecting || e.boundingClientRect.bottom <= 0) {
            e.target.classList.replace("reveal-pending", "reveal-in");
            revealIO.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    const seen = new WeakSet<Element>();
    const watch = (el: Element) => {
      if (seen.has(el)) return;
      seen.add(el);
      if (el.hasAttribute("data-live")) liveIO.observe(el);
      if (el.hasAttribute("data-reveal") && !reduceMotion) {
        // already on screen: leave it alone (no flash, no layout shift)
        if (el.getBoundingClientRect().top < window.innerHeight - 80) return;
        el.classList.add("reveal-pending");
        revealIO.observe(el);
      }
    };
    const unwatch = (el: Element) => {
      liveIO.unobserve(el);
      revealIO.unobserve(el);
    };
    const SEL = "[data-live],[data-reveal]";
    const each = (node: Node, fn: (el: Element) => void) => {
      if (node.nodeType !== 1) return;
      const el = node as Element;
      if (el.matches(SEL)) fn(el);
      el.querySelectorAll(SEL).forEach(fn);
    };

    document.querySelectorAll(SEL).forEach(watch);

    // client-side navigations swap page content: pick up new nodes, drop old ones
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.removedNodes.forEach((n) => each(n, unwatch));
        r.addedNodes.forEach((n) => each(n, watch));
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      liveIO.disconnect();
      revealIO.disconnect();
    };
  }, []);

  return null;
}
