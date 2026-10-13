/**
 * Canonical site origin. Set NEXT_PUBLIC_SITE_URL in the deploy environment.
 * The fallback is a placeholder so metadata never points at a domain we do not
 * control; the brochure mentions www.tgie.in, but that is unconfirmed.
 */
export const SITE_URL_IS_PLACEHOLDER = !process.env.NEXT_PUBLIC_SITE_URL;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tgie.example").replace(/\/+$/, "");

if (SITE_URL_IS_PLACEHOLDER && process.env.NODE_ENV === "production") {
  console.error(
    "[siteUrl] NEXT_PUBLIC_SITE_URL is not set: canonical, Open Graph and sitemap URLs point at the placeholder " +
      `${SITE_URL} and the site is marked noindex. Set it in the deploy environment before launch.`,
  );
}
