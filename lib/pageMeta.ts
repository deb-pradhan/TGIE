import type { Metadata } from "next";

const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "TGIE. Theory, embodied.",
};

/**
 * Per-page metadata. Pass the bare page title (the root layout's title template
 * appends " · TGIE"), a description, and the page path (e.g. "/work").
 * A page that sets `openGraph` replaces the root one wholesale, so the image,
 * canonical and URL are repeated here instead of being silently dropped.
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const shareTitle = `${title} · TGIE`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      type: "website",
      siteName: "The Great Indian Engineers",
      locale: "en_IN",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
