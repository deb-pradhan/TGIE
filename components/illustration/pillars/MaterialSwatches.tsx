import { FrameBlock, Cell } from "@/components/frame/Grid";
import { Icon } from "@/components/icons/Icon";
import { C } from "../kit";

type Row = { category: string; filaments: string; use: string };

/** Teal-family tones only, dark to light. One ramp per material category. */
const RAMPS: string[][] = [
  [C.forestDeep, C.forest, C.tealDeep, C.teal],
  [C.tealDeep, C.teal, C.tealSoft],
  [C.tealSoft, C.mint, C.faceR],
  [C.mint, C.tealSoft, C.faceR, C.card],
];

/** Split "PA-CF, PET-CF" and keep parenthesised groups intact; "TPU (95A / 85A)" becomes two chips. */
function names(s: string) {
  return s
    .split(/,\s*(?![^(]*\))/)
    .map((n) => n.trim())
    .flatMap((n) => {
      const m = n.match(/^(.+?)\s*\((.+\/.+)\)$/);
      return m ? m[2].split("/").map((v) => `${m[1]} ${v.trim()}`) : [n];
    });
}

/** Print-layer texture over a swatch: reads as a sliced, extruded chip. */
const layers =
  "repeating-linear-gradient(180deg, rgba(255,255,255,.18) 0 1px, transparent 1px 5px)";

export function MaterialSwatches({ rows }: { rows: Row[] }) {
  return (
    <FrameBlock>
      <div className="grid gap-[2px] md:grid-cols-2">
        {rows.map((r, ri) => {
          const ramp = RAMPS[ri % RAMPS.length];
          const list = names(r.filaments);
          return (
            <Cell key={r.category} className="flex flex-col gap-5 px-[var(--gutter)] py-8">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-mint text-teal-deep">
                  <Icon name="printer" size={18} />
                </span>
                <h3 className="font-mono text-[15px] font-medium tracking-tight text-ink">{r.category}</h3>
              </div>
              <div className="flex gap-2">
                {list.map((n, i) => (
                  <div key={n} className="min-w-0 flex-1">
                    <div
                      className="h-16 rounded-[10px] border border-line shadow-[inset_0_-10px_14px_-10px_rgba(0,0,0,.18)]"
                      style={{ backgroundColor: ramp[i % ramp.length], backgroundImage: layers }}
                    />
                    <div className="mt-2 font-mono text-[11.5px] leading-tight text-ink-2">{n}</div>
                  </div>
                ))}
              </div>
              <p className="max-w-[48ch] text-[13px] text-muted">{r.use}</p>
            </Cell>
          );
        })}
      </div>
    </FrameBlock>
  );
}
