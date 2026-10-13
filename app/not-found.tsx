import type { Metadata } from "next";
import Link from "next/link";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Button } from "@/components/primitives/Button";
import { IconBadge } from "@/components/icons/Icon";
import { pillarIcons } from "@/components/icons/subIcons";
import { practices } from "@/content/practices";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <FrameBlock>
        <Cell className="px-[var(--gutter)] py-16 text-ink sm:py-24">
          <Eyebrow>Error 404</Eyebrow>
          <TwoToneHeading as="h1" line1="This page isn't here." line2="The work still is." className="mt-5" />
          <p className="text-lead mt-6 max-w-[62ch] text-muted">
            The link may be out of date, or the address mistyped. Head back to the start, or go straight to the
            part of TGIE you were after.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Button href="/">Home</Button>
            <Button href="/start" variant="ghost">
              Start a Project
            </Button>
          </div>
        </Cell>
      </FrameBlock>
      <GapStrip />
      <FrameBlock>
        <nav aria-label="Services" className="grid gap-[2px] sm:grid-cols-2 lg:grid-cols-4">
          {practices.map((p) => (
            <Link
              key={p.slug}
              href={`/services/${p.slug}`}
              className="group flex items-start gap-3.5 rounded-[6px] bg-cell px-5 py-5 text-ink transition-colors duration-150 motion-safe:hover:bg-card"
            >
              <IconBadge name={pillarIcons[p.slug]} size={40} />
              <span>
                <span className="block text-[15px] font-medium transition-colors duration-150 motion-safe:group-hover:text-accent-deep">
                  {p.short}
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-muted">{p.tagline}</span>
              </span>
            </Link>
          ))}
        </nav>
      </FrameBlock>
    </>
  );
}
