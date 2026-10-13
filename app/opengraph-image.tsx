import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "TGIE. Theory, embodied.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Paper & Cell Collage, scaled up: canvas seams, light cells, graphite + one accent.
const CANVAS = "#e7e8e5";
const CELL = "#fafaf8";
const GRAPHITE = "#1c1f1e";
const ACCENT = "#e2561f";
const INK = "#0d0f0e";

const cells: [number, number, boolean?][] = [
  [0, 0], [22.5, 0], [45, 0], [22.5, 22.5],
];

export default async function Image() {
  const mono = await readFile(join(process.cwd(), "app/_assets/SpaceMono-Bold.ttf"));

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: CANVAS, padding: 8, gap: 8 }}>
        {/* mark cell */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 430,
            background: CELL,
            borderRadius: 14,
          }}
        >
          <svg width="290" height="290" viewBox="0 0 64 64">
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

        {/* message cells */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 8 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
              background: CELL,
              borderRadius: 14,
              padding: "0 56px",
            }}
          >
            <div style={{ display: "flex", fontFamily: "Space Mono", fontSize: 22, letterSpacing: 4, color: ACCENT }}>
              THE GREAT INDIAN ENGINEERS
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontFamily: "Space Mono",
                fontSize: 92,
                lineHeight: 1.02,
                letterSpacing: -4,
                color: INK,
              }}
            >
              Theory,
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Space Mono",
                fontSize: 92,
                lineHeight: 1.02,
                letterSpacing: -4,
                color: GRAPHITE,
              }}
            >
              embodied.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 130,
              background: GRAPHITE,
              borderRadius: 14,
              padding: "0 56px",
              color: "#f1f2f0",
              fontFamily: "Space Mono",
              fontSize: 20,
            }}
          >
            <span style={{ display: "flex" }}>You carry the vision. We carry the weight.</span>
            <span style={{ display: "flex", color: "#ffa36c" }}>TGIE</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Space Mono", data: mono, weight: 700, style: "normal" }] },
  );
}
