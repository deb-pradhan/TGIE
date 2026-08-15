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
}: {
  eyebrow: string;
  line1: string;
  line2?: string;
  lead?: string;
  crumbs?: Crumb[];
  cta?: ReactNode;
}) {
  return (
    <FrameBlock>
      <Cell className="px-[var(--gutter)] py-16 sm:py-20">
        {crumbs && (
          <div className="mb-6">
            <Breadcrumb items={crumbs} />
          </div>
        )}
        <Eyebrow>{eyebrow}</Eyebrow>
        <TwoToneHeading as="h1" line1={line1} line2={line2} className="mt-5" />
        {lead && <p className="text-lead mt-6 max-w-[62ch] text-muted">{lead}</p>}
        {cta && <div className="mt-8 flex flex-wrap gap-3.5">{cta}</div>}
      </Cell>
    </FrameBlock>
  );
}
