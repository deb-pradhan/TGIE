import { cn } from "@/lib/cn";

/**
 * Pillar B illustration — additive manufacturing scaling into a product line.
 * A gantry 3D printer lays layers on a build plate; a dashed path leads to a
 * row of finished units (one replica → a retail run). 2:1 isometric, matching
 * the puck geometry in Iso.tsx. `bare` fills a bento cell that already supplies
 * the iso-grid background.
 */

const OX = 150;
const OY = 116;
const K = 18; // half tile width — screen spread per x/y unit
const HZ = 12; // screen height per z unit

type Pt = readonly [number, number];

const proj = (x: number, y: number, z: number): Pt => [
  OX + (x - y) * K,
  OY + (x + y) * (K / 2) - z * HZ,
];

const poly = (pts: Pt[]) =>
  "M" + pts.map(([sx, sy]) => `${sx.toFixed(1)} ${sy.toFixed(1)}`).join(" L") + " Z";

const seg = (a: Pt, b: Pt) =>
  `M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;

/** The three visible faces of an axis-aligned box (top + the two front faces). */
function box(x0: number, y0: number, x1: number, y1: number, z0: number, z1: number) {
  return {
    top: poly([proj(x0, y0, z1), proj(x1, y0, z1), proj(x1, y1, z1), proj(x0, y1, z1)]),
    right: poly([proj(x1, y0, z0), proj(x1, y1, z0), proj(x1, y1, z1), proj(x1, y0, z1)]),
    front: poly([proj(x0, y1, z0), proj(x1, y1, z0), proj(x1, y1, z1), proj(x0, y1, z1)]),
  };
}

// --- build plate --------------------------------------------------------------
const PLATE = box(-0.1, -0.1, 3.3, 3.3, -0.35, 0);

// --- part on the plate (layered) ---------------------------------------------
const PX0 = 0.55;
const PY0 = 0.55;
const PX1 = 2.65;
const PY1 = 2.65;
const PZ = 1.5;
const PART = box(PX0, PY0, PX1, PY1, 0, PZ);
const PCX = (PX0 + PX1) / 2;
const PCY = (PY0 + PY1) / 2;

// horizontal layer striations on the two visible faces
const layers: string[] = [];
for (let z = 0.25; z < PZ - 0.001; z += 0.25) {
  layers.push(seg(proj(PX1, PY0, z), proj(PX1, PY1, z))); // right face (x = x1)
  layers.push(seg(proj(PX0, PY1, z), proj(PX1, PY1, z))); // front face (y = y1)
}

// infill tool-path on the current top layer (dashed zig-zag across the diamond)
const infill: Pt[] = [];
{
  const n = 5;
  for (let i = 0; i <= n; i++) {
    const x = PX0 + ((PX1 - PX0) * i) / n;
    infill.push(proj(x, i % 2 === 0 ? PY0 + 0.15 : PY1 - 0.15, PZ));
  }
}
const infillPath =
  "M" + infill.map(([sx, sy]) => `${sx.toFixed(1)} ${sy.toFixed(1)}`).join(" L");

// --- gantry bridge + nozzle ---------------------------------------------------
const BEAM_Z = 3.15;
const NOZZLE_Z = PZ + 0.55; // hovers just above the fresh top layer
const postA0 = proj(PCX, PY0 - 0.35, 0);
const postA1 = proj(PCX, PY0 - 0.35, BEAM_Z);
const postB0 = proj(PCX, PY1 + 0.35, 0);
const postB1 = proj(PCX, PY1 + 0.35, BEAM_Z);
const carriageTop = proj(PCX, PCY, BEAM_Z);
const nozzleTip = proj(PCX, PCY, NOZZLE_Z);
const [nx, ny] = nozzleTip;

// --- product line (finished units) -------------------------------------------
const UNITS = [0, 1, 2].map((i) => {
  const x0 = 3.9 + i * 1.35;
  const y0 = 2.15;
  const b = box(x0, y0, x0 + 1.0, y0 + 1.15, 0, 1.1);
  return { ...b, first: i === 0, opacity: 1 - i * 0.28, i };
});
const connectorFrom = proj(PX1, PY1, 0.5);
const connectorTo = proj(3.9, 2.15, 1.1);

export function AdditiveScene({
  className,
  bare = false,
}: {
  className?: string;
  bare?: boolean;
}) {
  const svg = (
    <svg
      viewBox="0 0 320 240"
      className="h-full w-full"
      role="img"
      aria-label="Isometric 3D printer building a part, scaling to a product line"
    >
      {/* build plate */}
      <path d={PLATE.right} fill="#cdd8d1" />
      <path d={PLATE.front} fill="#dfe7e2" />
      <path d={PLATE.top} fill="#ffffff" stroke="var(--color-line)" strokeWidth="1" />

      {/* dashed connector: this print → the product run */}
      <path
        d={seg(connectorFrom, connectorTo)}
        stroke="var(--color-teal)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        fill="none"
      />

      {/* the part being printed */}
      <path d={PART.right} fill="#dbe4de" />
      <path d={PART.front} fill="#e7edea" />
      <path d={PART.top} fill="#ffffff" stroke="var(--color-teal)" strokeWidth="1.4" />
      {layers.map((d, i) => (
        <path key={i} d={d} stroke="var(--color-line)" strokeWidth="0.9" fill="none" />
      ))}
      {/* current-layer infill path */}
      <path
        d={infillPath}
        stroke="var(--color-teal)"
        strokeWidth="1.1"
        strokeDasharray="3 3"
        fill="none"
        strokeLinejoin="round"
      />

      {/* gantry bridge */}
      <path d={seg(postA0, postA1)} stroke="var(--color-ink-2, #4a5a52)" strokeWidth="1.6" />
      <path d={seg(postB0, postB1)} stroke="var(--color-ink-2, #4a5a52)" strokeWidth="1.6" />
      <path d={seg(postA1, postB1)} stroke="var(--color-ink-2, #4a5a52)" strokeWidth="1.6" />

      {/* nozzle carriage + extruded strand */}
      <path d={seg(carriageTop, [nx, ny - 10])} stroke="var(--color-ink-2, #4a5a52)" strokeWidth="1.6" />
      <path
        d={`M${nx - 6} ${ny - 10} L${nx + 6} ${ny - 10} L${nx + 3.5} ${ny - 2} L${nx - 3.5} ${ny - 2} Z`}
        fill="#ffffff"
        stroke="var(--color-teal)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d={`M${nx} ${ny - 2} L${nx} ${ny + 3}`}
        stroke="var(--color-teal)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* product line — finished units */}
      {UNITS.map((u) => (
        <g key={u.i} opacity={u.opacity}>
          <path d={u.right} fill="#cdd8d1" />
          <path d={u.front} fill="#dfe7e2" />
          <path
            d={u.top}
            fill="#ffffff"
            stroke={u.first ? "var(--color-teal)" : "var(--color-line)"}
            strokeWidth={u.first ? 1.4 : 1}
          />
        </g>
      ))}
    </svg>
  );

  if (bare) {
    return <div className={cn("relative h-full w-full", className)}>{svg}</div>;
  }

  return (
    <div
      className={cn(
        "iso-grid relative aspect-[4/3] w-full overflow-hidden rounded-card border border-line bg-[#eef2ee]",
        className,
      )}
    >
      <div className="absolute inset-0">{svg}</div>
    </div>
  );
}
