import Link from "next/link";
import { FrameBlock, Cell } from "@/components/frame/Grid";
import { cn } from "@/lib/cn";

export type GridItem = {
  href: string;
  label?: string; // small mono index/eyebrow
  title: string;
  note: string;
};

/** A bento row of linked cells (sub-pages, related links). */
export function CardGrid({
  items,
  cols = 3,
}: {
  items: GridItem[];
  cols?: 2 | 3;
}) {
  return (
    <FrameBlock>
      <div
        className={cn(
          "grid gap-[2px]",
          cols === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
        )}
      >
        {items.map((it) => (
          <Cell key={it.href} className="group flex flex-col p-6 transition-colors hover:bg-card">
            <Link href={it.href} className="flex h-full flex-col">
              {it.label && (
                <div className="font-mono text-[12px] uppercase tracking-[0.12em] text-teal">
                  {it.label}
                </div>
              )}
              <h3 className="mt-2 font-mono text-[16px] font-medium tracking-tight text-ink group-hover:text-teal">
                {it.title}
              </h3>
              <p className="mt-2 flex-1 text-[13.5px] text-muted">{it.note}</p>
              <span className="mt-4 text-[13px] font-medium text-ink-2 group-hover:text-teal">
                Explore
              </span>
            </Link>
          </Cell>
        ))}
      </div>
    </FrameBlock>
  );
}
