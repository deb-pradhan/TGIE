/**
 * Canonical site origin. Set NEXT_PUBLIC_SITE_URL in the deploy environment.
 * The fallback is a placeholder so metadata never points at a domain we do not
 * control; the brochure mentions www.tgie.in, but that is unconfirmed.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tgie.example").replace(/\/+$/, "");
