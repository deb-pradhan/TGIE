import type { Metadata } from "next";
import { Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/sections/Footer";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spacemono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tgie.example"),
  title: "TGIE — Theory, embodied. We give ideas a body and carry the weight.",
  description:
    "TGIE gives research and startup ideas a body — hardware, company, and market — and carries the weight of building it. You keep the vision. And you own everything we make.",
  openGraph: {
    title: "TGIE — Theory, embodied.",
    description:
      "We give ideas a body and carry the weight of making it real. You carry the vision. We carry the weight.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hanken.variable} ${spaceMono.variable}`}>
      <body>
        <div className="relative">
          <Nav />
          <main className="bg-paper">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
