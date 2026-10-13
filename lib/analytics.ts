/**
 * GA4 helpers. The tag itself is loaded by components/Analytics.tsx (production only);
 * everywhere else call `track()`, which is a safe no-op when the tag is absent
 * (dev, ad blockers, SSR). Never put personal data (name, email, phone, free text) in params.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-B5RHYVKS0N";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params?: Params) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
