import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "TGIE. Theory, embodied. Engineering, products, enablement and fabrication for researchers and founders.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Paper & Cell Collage, scaled up: canvas seams, light cells, graphite + one accent.
const CANVAS = "#e7e8e5";
const CELL = "#fafaf8";
const GRAPHITE = "#1c1f1e";
const ACCENT = "#e2561f";
const INK = "#0d0f0e";
const MUTED = "#5c615e";

const cells: [number, number, boolean?][] = [
  [0, 0], [22.5, 0], [45, 0], [22.5, 22.5],
];

const pillars = [
  { id: "A", name: "Engineering", line: "Boards, firmware, enclosures" },
  { id: "B", name: "Products", line: "Prototype to retail run" },
  { id: "C", name: "Enablement", line: "Company, capital, market" },
  { id: "D", name: "Fabrication", line: "ISO 9001 heavy fabrication" },
];

const cell = { display: "flex", background: CELL, borderRadius: 14 } as const;

export default async function Image() {
  const mono = await readFile(join(process.cwd(), "app/_assets/SpaceMono-Bold.ttf"));

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: CANVAS, padding: 8, gap: 8 }}>
        {/* mark + headline */}
        <div style={{ display: "flex", flex: 1, gap: 8 }}>
          <div style={{ ...cell, alignItems: "center", justifyContent: "center", width: 324 }}>
            <svg width="210" height="210" viewBox="0 0 64 64">
              <rect x="0" y="22.5" width="19" height="19" rx="4.5" fill={GRAPHITE} fillOpacity="0.16" />
              <rect x="45" y="22.5" width="19" height="19" rx="4.5" fill={GRAPHITE} fillOpacity="0.16" />
              <rect x="0" y="45" width="19" height="19" rx="4.5" fill={GRAPHITE} fillOpacity="0.16" />
              <rect x="45" y="45" width="19" height="19" rx="4.5" fill={GRAPHITE} fillOpacity="0.16" />
              {cells.map(([x, y]) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="19" height="19" rx="4.5" fill={GRAPHITE} />
              ))}
              <rect x="22.5" y="45" width="19" height="19" rx="4.5" fill={ACCENT} />
            </svg>
          </div>
          <div style={{ ...cell, flexDirection: "column", justifyContent: "center", flex: 1, padding: "0 56px" }}>
            <div style={{ display: "flex", fontFamily: "Space Mono", fontSize: 22, letterSpacing: 4, color: ACCENT }}>
              THE GREAT INDIAN ENGINEERS
            </div>
            <div style={{ display: "flex", marginTop: 20, fontFamily: "Space Mono", fontSize: 84, lineHeight: 1.02, letterSpacing: -4, color: INK }}>
              Theory,
            </div>
            <div style={{ display: "flex", fontFamily: "Space Mono", fontSize: 84, lineHeight: 1.02, letterSpacing: -4, color: GRAPHITE }}>
              embodied.
            </div>
          </div>
        </div>

        {/* the four pillars */}
        <div style={{ display: "flex", height: 192, gap: 8 }}>
          {pillars.map((p) => (
            <div key={p.id} style={{ ...cell, flexDirection: "column", justifyContent: "flex-start", flex: 1, padding: "26px 26px 0" }}>
              <div style={{ display: "flex", fontFamily: "Space Mono", fontSize: 22, color: ACCENT }}>{p.id}</div>
              <div style={{ display: "flex", marginTop: 6, fontFamily: "Space Mono", fontSize: 28, letterSpacing: -1, color: INK }}>{p.name}</div>
              <div style={{ display: "flex", marginTop: 8, fontFamily: "Space Mono", fontSize: 18, lineHeight: 1.35, color: MUTED }}>{p.line}</div>
            </div>
          ))}
        </div>

        {/* audience + ownership */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 84,
            background: GRAPHITE,
            borderRadius: 14,
            padding: "0 40px",
            color: "#f1f2f0",
            fontFamily: "Space Mono",
            fontSize: 20,
          }}
        >
          <span style={{ display: "flex" }}>For researchers and founders.</span>
          <span style={{ display: "flex", color: "#ffa36c" }}>You own everything we make.</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Space Mono", data: mono, weight: 700, style: "normal" }] },
  );
}
