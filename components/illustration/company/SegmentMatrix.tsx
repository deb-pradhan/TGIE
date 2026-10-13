import { Icon, type IconName } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";

type Col = { id: string; name: string; icon: IconName };
type Row = { segment: string; pillars: string; note: string };

const rowGrid = "grid gap-x-4 gap-y-3 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.5fr)_auto] md:items-center";
const tiles = "grid grid-cols-4 gap-1.5 sm:gap-2";

/**
 * Segments x pillars matrix. Rows are cells on the collage canvas; the pillar
 * columns are filled teal tiles. Row hover / keyboard focus lifts the row,
 * fills the tiles and tints the row via CSS only (no client JS).
 */
export function SegmentMatrix({ columns, rows }: { columns: readonly Col[]; rows: readonly Row[] }) {
  return (
    <div role="table" aria-label="Market segments by pillar" className="flex flex-col gap-[2px]">
      {/* column header (md+) / legend (mobile) */}
      <div role="row" className="rounded-[6px] bg-cell px-5 py-3 sm:px-6">
        <div className={cn("hidden", rowGrid, "md:grid")}>
          <div role="columnheader" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted md:col-span-2">
            Segment
          </div>
          <div className={tiles}>
            {columns.map((c) => (
              <div key={c.id} role="columnheader" title={`Pillar ${c.id} · ${c.name}`} className="flex w-12 flex-col items-center gap-1">
                <span className="grid h-8 w-8 place-items-center rounded-[8px] bg-mint text-teal">
                  <Icon name={c.icon} size={18} />
                </span>
                <span className="font-mono text-[11px] font-medium text-ink-2">{c.id}</span>
              </div>
            ))}
          </div>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 md:hidden" aria-label="Pillars">
          {columns.map((c) => (
            <li key={c.id} className="flex items-center gap-1.5 font-mono text-[11.5px] text-ink-2">
              <span className="grid h-6 w-6 place-items-center rounded-[6px] bg-mint text-teal">
                <Icon name={c.icon} size={14} />
              </span>
              {c.id} {c.name}
            </li>
          ))}
        </ul>
      </div>

      {rows.map((r) => {
        const on = r.pillars.split("+").map((p) => p.trim());
        return (
          <div
            key={r.segment}
            role="row"
            tabIndex={0}
            aria-label={`${r.segment}: pillar ${r.pillars}`}
            className={cn(
              rowGrid,
              "group rounded-[6px] bg-cell px-5 py-4 outline-none transition-colors duration-150 sm:px-6 hover:bg-mint focus-visible:bg-mint focus-visible:ring-2 focus-visible:ring-teal",
            )}
          >
            <div role="cell" className="min-w-0 font-mono text-[14px] font-medium tracking-tight text-ink">
              {r.segment}
            </div>
            <p role="cell" className="-mt-1 text-[12.5px] text-muted md:mt-0 md:text-[13px]">
              {r.note}
            </p>
            <div role="cell" className={cn(tiles, "w-fit md:w-auto")}>
              {columns.map((c) => {
                const hit = on.includes(c.id);
                return (
                  <span
                    key={c.id}
                    title={hit ? `Pillar ${c.id} · ${c.name}` : undefined}
                    className={cn(
                      "grid h-9 w-11 place-items-center rounded-[6px] font-mono text-[12px] font-bold transition-transform duration-150 md:w-12",
                      hit ? "bg-teal text-white group-hover:scale-[1.06] group-focus-visible:scale-[1.06]" : "bg-paper-2 text-muted-2 group-hover:bg-card",
                    )}
                  >
                    {hit ? (
                      <>
                        <span className="md:hidden">{c.id}</span>
                        <Icon name="check" size={16} className="hidden md:block" />
                      </>
                    ) : (
                      <span className="h-1 w-1 rounded-full bg-line-strong" />
                    )}
                    <span className="sr-only">{hit ? `Pillar ${c.id}: yes` : `Pillar ${c.id}: no`}</span>
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
