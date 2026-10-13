import type { ReactNode } from "react";
import Link from "next/link";
import { FrameBlock, Cell } from "@/components/frame/Grid";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center font-mono text-[12px]">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className={cn("flex items-center", last && "min-w-0")}>
            {i > 0 && (
              <span aria-hidden className="px-1.5 text-muted-2">
                /
              </span>
            )}
            {it.href ? (
              <Link
                href={it.href}
                aria-current={last ? "page" : undefined}
                className={cn("-my-3 flex min-h-11 items-center text-muted hover:text-accent-deep", last && "truncate")}
              >
                {it.label}
              </Link>
            ) : (
              <span aria-current={last ? "page" : undefined} className="truncate text-ink-2">
                {it.label}
              </span>
            )}
          </span>
        );
      })}
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
      <div className="grid grid-cols-[minmax(0,1fr)] gap-[2px] lg:grid-cols-[1.1fr_0.9fr]">
        <Cell className="flex flex-col justify-center px-[var(--gutter)] py-14 sm:py-16">{copy}</Cell>
        <Cell className="relative min-h-[clamp(280px,75vw,480px)] overflow-hidden lg:min-h-[420px]">{art}</Cell>
      </div>
    </FrameBlock>
  );
}
