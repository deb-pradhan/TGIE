import type { ReactNode } from "react";
import Link from "next/link";
import { FrameBlock, Cell } from "@/components/frame/Grid";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[12px]">
      {items.map((it, i) => (
        <span key={i}>
          {i > 0 && <span className="px-1.5 text-muted-2">/</span>}
          {it.href ? (
            <Link href={it.href} className="text-muted hover:text-teal">
              {it.label}
            </Link>
          ) : (
            <span className="text-ink-2">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHero({
  eyebrow,
  line1,
  line2,
  lead,
  crumbs,
  cta,
  art,
}: {
  eyebrow: string;
  line1: string;
  line2?: string;
  lead?: string;
  crumbs?: Crumb[];
  cta?: ReactNode;
  /** Optional illustration cell shown beside the copy on lg+ (stacked below on mobile). */
  art?: ReactNode;
}) {
  const copy = (
    <>
      {crumbs && (
        <div className="mb-6">
          <Breadcrumb items={crumbs} />
        </div>
      )}
      <Eyebrow>{eyebrow}</Eyebrow>
      <TwoToneHeading as="h1" line1={line1} line2={line2} className="mt-5" />
      {lead && <p className="text-lead mt-6 max-w-[62ch] text-muted">{lead}</p>}
      {cta && <div className="mt-8 flex flex-wrap gap-3.5">{cta}</div>}
    </>
  );

  if (!art) {
    return (
      <FrameBlock>
        <Cell className="px-[var(--gutter)] py-16 sm:py-20">{copy}</Cell>
      </FrameBlock>
    );
  }

  return (
    <FrameBlock>
      <div className="grid gap-[2px] lg:grid-cols-[1.1fr_0.9fr]">
        <Cell className="flex flex-col justify-center px-[var(--gutter)] py-14 sm:py-16">{copy}</Cell>
        <Cell className="relative min-h-[clamp(280px,75vw,480px)] overflow-hidden lg:min-h-[420px]">{art}</Cell>
      </div>
    </FrameBlock>
  );
}
