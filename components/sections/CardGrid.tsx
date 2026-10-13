import type { ReactNode } from "react";
import Link from "next/link";
import { FrameBlock, Cell } from "@/components/frame/Grid";
import { Icon, type IconName } from "@/components/icons/Icon";
import { PuckG } from "@/components/illustration/pillars/IsoPuck";
import { C } from "@/components/illustration/kit";
import { cn } from "@/lib/cn";

export type GridItem = {
  href: string;
  label?: string; // small mono index/eyebrow
  title: string;
  note: string;
  /** when set, the tile gets an illustrated iso puck header */
  icon?: IconName;
};

export type GridCta = { href: string; title: string; note: string; cta: string };

const SPAN: Record<number, string> = { 1: "md:col-span-1", 2: "md:col-span-2" };

/** An illustrated iso-puck header: the tile's icon on a white puck, linked to a smaller satellite puck. */
function TileArt({ icon }: { icon: IconName }) {
  return (
    <svg viewBox="0 0 320 132" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <path d="M176 66 L246 52" stroke={C.teal} strokeWidth={1.5} strokeDasharray="5 5" fill="none" />
      <PuckG cx={252} cy={44} s={0.5} tone="mint" />
      <PuckG cx={150} cy={54} s={1} icon={icon} className="transition-transform duration-300 motion-safe:group-hover:-translate-y-1.5" />
    </svg>
  );
}

/** A bento row of linked cells (sub-pages, related links). Fills the last row so no canvas shows. */
export function CardGrid({
  items,
  cols = 3,
  cta,
}: {
  items: GridItem[];
  cols?: 2 | 3;
  cta?: GridCta;
}): ReactNode {
  const empties = (cols - (items.length % cols)) % cols;
  return (
    <FrameBlock>
      <div className={cn("grid gap-[2px]", cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2")}>
        {items.map((it) => (
          <Cell key={it.href} className="group flex flex-col overflow-hidden transition-colors duration-200 motion-safe:hover:bg-card">
            <Link href={it.href} className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-teal">
              {it.icon && (
                <div className="iso-grid relative h-[132px] w-full">
                  <TileArt icon={it.icon} />
                  {it.label && (
                    <span className="absolute left-6 top-5 font-mono text-[12px] uppercase tracking-[0.12em] text-teal">
                      {it.label}
                    </span>
                  )}
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                {it.label && !it.icon && (
                  <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-teal">{it.label}</div>
                )}
                <h3 className="font-mono text-[16px] font-medium tracking-tight text-ink transition-colors duration-200 motion-safe:group-hover:text-teal">
                  {it.title}
                </h3>
                <p className="mt-2 flex-1 text-[13.5px] text-muted">{it.note}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-2 transition-colors duration-200 motion-safe:group-hover:text-teal">
                  Explore
                  <Icon name="arrow-right" size={14} />
                </span>
              </div>
            </Link>
          </Cell>
        ))}
        {empties > 0 && cta && (
          <div className={cn("group relative flex flex-col overflow-hidden rounded-[6px] bg-mint transition-colors duration-200", SPAN[empties])}>
            <Link href={cta.href} className="flex h-full flex-col justify-center p-6 focus-visible:outline-2 focus-visible:outline-teal">
              <h3 className="font-mono text-[16px] font-medium tracking-tight text-ink">{cta.title}</h3>
              <p className="mt-2 max-w-[44ch] text-[13.5px] text-ink-2">{cta.note}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-teal-deep">
                {cta.cta}
                <Icon name="arrow-right" size={14} />
              </span>
            </Link>
          </div>
        )}
        {empties > 0 && !cta && (
          <div aria-hidden className={cn("dots hidden rounded-[6px] bg-cell md:block", SPAN[empties])} />
        )}
      </div>
    </FrameBlock>
  );
}
