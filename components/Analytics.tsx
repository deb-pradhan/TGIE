"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GA_ID, track } from "@/lib/analytics";

/**
 * Google Analytics 4 (gtag.js), loaded after hydration so it never touches LCP.
 *
 *  - Production only: `next dev` and local builds do not pollute the property.
 *  - Consent Mode v2: ad storage/signals are denied everywhere (the site runs no ads); analytics
 *    storage is denied by default in the EEA, UK and Switzerland (no banner yet, so those visitors
 *    are measured cookielessly), granted elsewhere.
 *  - page_view on every route change comes from GA4 Enhanced Measurement (history events), so the
 *    App Router needs no manual pageview code.
 *  - A single delegated listener reports phone, email and "start a project" clicks, so those
 *    links need no per-component handlers.
 */
const EEA = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI",
  "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH",
];

const bootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'granted'
});
gtag('consent', 'default', {
  analytics_storage: 'denied', region: ${JSON.stringify(EEA)}
});
gtag('js', new Date());
gtag('config', '${GA_ID}', { allow_google_signals: false, allow_ad_personalization_signals: false });
`;

function where(a: Element) {
  return a.closest("footer") ? "footer" : a.closest("header") ? "nav" : "page";
}

export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("click_phone", { link_location: where(a) });
      else if (href.startsWith("mailto:")) track("click_email", { link_location: where(a) });
      else if (href === "/start") {
        track("cta_click", { cta_text: a.textContent?.trim().slice(0, 60), link_location: where(a) });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {bootstrap}
      </Script>
    </>
  );
}
