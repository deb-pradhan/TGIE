import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "TGIE. Theory, embodied.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Paper & Cell Collage, scaled up: canvas seams, light cells, forest + one teal.
const CANVAS = "#e9e6de";
const CELL = "#f5f3ee";
const FOREST = "#0f3a2e";
const TEAL = "#2fae97";
const INK = "#1c1b18";

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
            <rect x="0" y="22.5" width="19" height="19" rx="4.5" fill={FOREST} fillOpacity="0.16" />
            <rect x="45" y="22.5" width="19" height="19" rx="4.5" fill={FOREST} fillOpacity="0.16" />
            <rect x="0" y="45" width="19" height="19" rx="4.5" fill={FOREST} fillOpacity="0.16" />
            <rect x="45" y="45" width="19" height="19" rx="4.5" fill={FOREST} fillOpacity="0.16" />
            {cells.map(([x, y]) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="19" height="19" rx="4.5" fill={FOREST} />
            ))}
            <rect x="22.5" y="45" width="19" height="19" rx="4.5" fill={TEAL} />
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
            <div style={{ display: "flex", fontFamily: "Space Mono", fontSize: 22, letterSpacing: 4, color: TEAL }}>
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
                color: FOREST,
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
              background: FOREST,
              borderRadius: 14,
              padding: "0 56px",
              color: "#eaf1ed",
              fontFamily: "Space Mono",
              fontSize: 20,
            }}
          >
            <span style={{ display: "flex" }}>You carry the vision. We carry the weight.</span>
            <span style={{ display: "flex", color: "#6fd0bb" }}>TGIE</span>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Space Mono", data: mono, weight: 700, style: "normal" }] },
  );
}
