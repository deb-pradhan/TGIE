import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Cell T on the paper canvas: graphite cells, one accent stem (matches app/icon.svg).
const PAPER = "#e7e8e5";
const GRAPHITE = "#1c1f1e";
const ACCENT = "#e2561f";

const cells: [number, number][] = [
  [0, 0], [22.5, 0], [45, 0], [22.5, 22.5],
];

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: PAPER }}>
        <svg width="120" height="120" viewBox="0 0 64 64">
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
    ),
    size,
  );
}
