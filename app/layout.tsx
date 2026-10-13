import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/sections/Footer";
import { SITE_URL } from "@/lib/siteUrl";
import { site } from "@/content/site";

// Only the weights the design system allows (body 400/500; mono 400 + the
// single bold for the wordmark), latin subset, swap so text paints immediately.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-hanken",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spacemono",
  display: "swap",
});

const description =
  "TGIE gives research and startup ideas a form: hardware, company, and market, and carries the weight of building it. You keep the vision. And you own everything we make.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TGIE. Theory, embodied. We give ideas a form and carry the weight.",
    template: "%s · TGIE",
  },
  description,
  applicationName: "TGIE",
  openGraph: {
    title: "TGIE. Theory, embodied.",
    description:
      "We give ideas a form and carry the weight of making it real. You carry the vision. We carry the weight.",
    type: "website",
    siteName: "The Great Indian Engineers",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "TGIE. Theory, embodied.",
    description: "We give ideas a form and carry the weight of making it real.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#e9e6de",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: site.fullName,
      alternateName: "TGIE",
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      slogan: "Theory, embodied.",
      description,
      telephone: site.contact.phone,
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: site.fullName,
      url: SITE_URL,
      image: `${SITE_URL}/opengraph-image`,
      telephone: site.contact.phone,
      description,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Thirumudivakkam, Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hanken.variable} ${spaceMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only rounded-[8px] bg-inkbtn text-[14px] font-medium text-white focus:not-sr-only focus:px-4 focus:py-2.5 focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus-visible:outline-2 focus-visible:outline-teal"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <div className="relative">
          <Nav />
          <main id="main" tabIndex={-1} className="bg-paper outline-none">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
