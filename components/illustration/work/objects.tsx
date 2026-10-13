import { C } from "../kit";
import { Box, Cyl, type Ctx } from "./geo";

/**
 * The six engagement objects, drawn in local iso units. Each takes a context
 * (see geo.mk / geo.placed) and a `full` flag: lite versions are used on the
 * hero case wall, full versions inside the case-card vignettes.
 */
type P = { c: Ctx; full?: boolean };

const NS = { vectorEffect: "non-scaling-stroke" as const };
const DARK = "#d8dbdb";

/** 1. Wearable gait-analysis sensor: strap + module with BLE. Local center (2.1, 1.5). */
export function Wearable({ c, full }: P) {
  const top = c.poly([c.proj(1.5, 0.8, 1), c.proj(2.7, 0.8, 1), c.proj(2.7, 2.2, 1), c.proj(1.5, 2.2, 1)]);
  const [ax, ay] = c.proj(2.1, 1.5, 1);
  const [lx, ly] = c.proj(2.45, 0.95, 1);
  return (
    <g>
      <Box c={c} b={[0, 0.9, 4.2, 2.1, 0, 0.28]} top={C.faceL} right={C.faceDark} front={DARK} />
      {/* strap stitching */}
      <path d={c.seg(c.proj(0.4, 2.1, 0.14), c.proj(1.2, 2.1, 0.14))} stroke={C.lineStrong} strokeWidth={1} strokeDasharray="3 3" />
      <path d={c.seg(c.proj(3.0, 2.1, 0.14), c.proj(3.8, 2.1, 0.14))} stroke={C.lineStrong} strokeWidth={1} strokeDasharray="3 3" />
      <Box c={c} b={[1.3, 0.6, 2.9, 2.4, 0.28, 1]} />
      {/* device screen inset */}
      <path d={top} fill={C.graphite} transform={`translate(${ax} ${ay}) scale(0.78) translate(${-ax} ${-ay})`} />
      <path
        d={`M${ax - 14} ${ay + 1} l5 0 l3 -5 l4 9 l3 -7 l3 3 l7 0`}
        stroke={C.accentSoft}
        strokeWidth={1.3}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="ill-blink" cx={lx} cy={ly} r={1.8} fill={C.accent} />
      <g className="ill-pulse" fill="none" stroke={C.accent} strokeWidth={1.5} strokeLinecap="round">
        <path d={`M${ax - 7} ${ay - 18} a10 10 0 0 1 14 0`} />
        {full && <path d={`M${ax - 12} ${ay - 24} a17 17 0 0 1 24 0`} opacity={0.6} />}
      </g>
      <circle cx={ax} cy={ay - 13} r={1.8} fill={C.accent} />
    </g>
  );
}

/** 2. Field-deployable environmental sensor: ruggedized box. Local center (1.5, 1.2). */
export function EnvSensor({ c, full }: P) {
  const [tx, ty] = c.proj(2.5, 0.4, 1.7);
  return (
    <g>
      <Box c={c} b={[0, 0, 3, 2.4, 0, 1.7]} />
      {/* lid seam */}
      <path d={c.seg(c.proj(0, 2.4, 1.3), c.proj(3, 2.4, 1.3))} stroke={C.lineStrong} strokeWidth={1} />
      <path d={c.seg(c.proj(3, 2.4, 1.3), c.proj(3, 0, 1.3))} stroke={C.lineStrong} strokeWidth={1} />
      {/* weatherproof connectors on the lit face */}
      <g transform={c.front(2.4)}>
        <circle cx={0.8} cy={0.62} r={0.26} fill={C.ink2} stroke={C.accentDeep} strokeWidth={2} {...NS} />
        <circle cx={2.1} cy={0.62} r={0.26} fill={C.ink2} stroke={C.accentDeep} strokeWidth={2} {...NS} />
        <circle cx={1.45} cy={0.62} r={0.1} fill={C.accent} />
      </g>
      {full && (
        <g transform={c.right(3)} stroke={C.lineStrong} strokeWidth={1.2} {...NS}>
          <path d="M0.5 0.55h1.4M0.5 0.8h1.4M0.5 1.05h1.4" {...NS} />
        </g>
      )}
      {/* screws */}
      {[[0.35, 0.35], [2.65, 0.35], [0.35, 2.05], [2.65, 2.05]].map(([x, y], i) => {
        const [sx, sy] = c.proj(x, y, 1.7);
        return <circle key={i} cx={sx} cy={sy} r={1.5} fill={C.lineStrong} />;
      })}
      {/* antenna */}
      <path d={c.seg(c.proj(2.5, 0.4, 1.7), c.proj(2.5, 0.4, 3))} stroke={C.ink2} strokeWidth={2.4} strokeLinecap="round" />
      <circle className="ill-blink" cx={tx} cy={ty - 1.3 * c.hz} r={2.2} fill={C.accent} />
    </g>
  );
}

/** 3. Dashboard bezel (3D-scanned, ASA): panel with gauge holes. Local center (2, 1.2). */
export function Bezel({ c, full }: P) {
  return (
    <g>
      <Box c={c} b={[0, 1, 4, 1.35, 0, 1.9]} top={C.faceL} right={C.faceDark} front={C.faceR} />
      <g transform={c.front(1.35)}>
        <circle cx={0.95} cy={0.95} r={0.5} fill={C.ink2} />
        <circle cx={0.95} cy={0.95} r={0.34} fill={C.graphite} stroke={C.accentSoft} strokeWidth={1} {...NS} />
        <circle cx={3.05} cy={0.95} r={0.5} fill={C.ink2} />
        <circle cx={3.05} cy={0.95} r={0.34} fill={C.graphite} stroke={C.accentSoft} strokeWidth={1} {...NS} />
        <path d="M0.95 0.95 L1.12 1.1" stroke={C.accentSoft} strokeWidth={1.4} strokeLinecap="round" {...NS} />
        <path d="M3.05 0.95 L2.88 1.1" stroke={C.accentSoft} strokeWidth={1.4} strokeLinecap="round" {...NS} />
        <rect x={1.75} y={0.62} width={0.5} height={0.65} rx={0.1} fill={C.ink2} />
        <rect x={0.7} y={1.55} width={2.6} height={0.14} rx={0.07} fill={C.faceDark} />
        {full &&
          [1.5, 1.75, 2, 2.25, 2.5].map((x) => <rect key={x} x={x} y={0.2} width={0.1} height={0.22} rx={0.04} fill={C.ink2} />)}
      </g>
      {/* scan line sweeping over it */}
      <g className="ill-scan">
        <path d={c.seg(c.proj(2, 1.35, 0), c.proj(2, 1.35, 1.9))} stroke={C.accent} strokeWidth={1.6} strokeDasharray="2 3" />
      </g>
    </g>
  );
}

/** 4. Museum-grade scale replica on a plinth. Local center (1.7, 0.9). */
export function Replica({ c, full }: P) {
  return (
    <g>
      <Box c={c} b={[-0.3, -0.3, 3.7, 2.1, 0, 0.3]} front={C.faceR} right={C.faceDark} />
      <g transform={c.front(2.1)}>
        <rect x={1.3} y={0.08} width={1.1} height={0.1} rx={0.03} fill={C.accent} />
      </g>
      {/* body */}
      <Box c={c} b={[0.1, 0.2, 3.3, 1.6, 0.55, 1.1]} />
      <Box c={c} b={[1, 0.35, 2.5, 1.45, 1.1, 1.65]} top={C.faceL} />
      <g transform={c.front(1.45)}>
        <path d="M1.15 1.18h0.55v0.35h-0.7z M1.85 1.18h0.5l0.3 0.35h-0.8z" fill={C.graphite} />
      </g>
      {/* wheels */}
      <g transform={c.front(1.6)}>
        <circle cx={0.8} cy={0.62} r={0.36} fill={C.ink2} />
        <circle cx={0.8} cy={0.62} r={0.16} fill={C.faceDark} />
        <circle cx={2.6} cy={0.62} r={0.36} fill={C.ink2} />
        <circle cx={2.6} cy={0.62} r={0.16} fill={C.faceDark} />
      </g>
      <path d={c.seg(c.proj(0.4, 0.2, 1.1), c.proj(3, 0.2, 1.1))} stroke={C.accentSoft} strokeWidth={1.2} />
      {full && <path d={c.seg(c.proj(0.5, 1.6, 0.95), c.proj(3, 1.6, 0.95))} stroke={C.accent} strokeWidth={1} strokeDasharray="1 3" />}
    </g>
  );
}

/** 5. Funded startup: a small building with lit windows. Local center (1.8, 1). */
export function Startup({ c, full }: P) {
  const win = (x: number, z: number, lit: boolean) => (
    <rect key={`${x}-${z}`} x={x} y={z} width={0.3} height={0.34} rx={0.04} fill={lit ? C.accentSoft : C.accentPale} />
  );
  const [fx, fy] = c.proj(0.9, 0.9, 2.8);
  return (
    <g>
      <Box c={c} b={[1.8, 0.3, 3.4, 1.8, 0, 1.5]} front={C.faceL} />
      <Box c={c} b={[0, 0, 1.8, 1.8, 0, 2.8]} />
      <g transform={c.front(1.8)}>
        {[0.35, 0.9, 1.4].flatMap((x, i) => [0.5, 1.15, 1.8].map((z, j) => win(x, z, (i + j) % 3 === 0)))}
        <rect x={0.7} y={0.05} width={0.4} height={0.3} fill={C.ink2} />
      </g>
      <g transform={c.front(1.8)}>
        {[2.1, 2.7].map((x, i) => [0.45, 1.0].map((z, j) => win(x, z, (i + j) % 2 === 0)))}
      </g>
      {/* roof flag */}
      <path d={`M${fx} ${fy} l0 -16`} stroke={C.ink2} strokeWidth={1.6} strokeLinecap="round" />
      <path className="ill-float" d={`M${fx} ${fy - 16} l11 3.5 l-11 3.5 z`} fill={C.accent} />
      {full && <path d={c.seg(c.proj(0, 1.8, 0.02), c.proj(3.4, 1.8, 0.02))} stroke={C.lineStrong} strokeWidth={1} />}
    </g>
  );
}

/** 6. Pressure-tested transformer tank on a skid base. Local center (1.5, 1). */
export function Transformer({ c, full }: P) {
  const fins: number[] = [];
  for (let x = 0.25; x <= 2.8; x += 0.25) fins.push(x);
  const gx = 2.4;
  return (
    <g>
      <Box c={c} b={[-0.3, -0.3, 3.3, 2.3, 0, 0.25]} top={C.faceL} right={C.faceDark} front={DARK} />
      <Box c={c} b={[0, 0, 3, 2, 0.25, 2.1]} />
      <g transform={c.front(2)} stroke={C.lineStrong} strokeWidth={1} {...NS}>
        {fins.map((x) => (
          <path key={x} d={`M${x} 0.55V1.95`} {...NS} />
        ))}
      </g>
      <g transform={c.right(3)} stroke={C.lineStrong} strokeWidth={1} {...NS}>
        {[0.3, 0.55, 0.8, 1.05, 1.3, 1.55, 1.8].map((y) => (
          <path key={y} d={`M${y} 0.55V1.95`} {...NS} />
        ))}
      </g>
      <Box c={c} b={[-0.1, -0.1, 3.1, 2.1, 2.1, 2.25]} top={C.faceTop} />
      {[0.6, 1.5, 2.4].map((x) => (
        <Cyl key={x} c={c} x={x} y={0.7} r={0.17} z0={2.25} z1={2.9} side={C.faceDark} top={C.accentSoft} stroke={C.accentDeep} />
      ))}
      <g transform={c.front(2)}>
        <circle cx={gx} cy={1.55} r={0.24} fill={C.card} stroke={C.ink2} strokeWidth={1.2} {...NS} />
        <path d={`M${gx} 1.55 L${gx + 0.12} 1.66`} stroke={C.accent} strokeWidth={1.4} strokeLinecap="round" {...NS} />
      </g>
      {full && (
        <g fill={C.accentSoft}>
          {[[0.2, -0.3], [0.9, -0.3], [1.6, -0.3], [2.3, -0.3]].map(([x, y], i) => {
            const [sx, sy] = c.proj(x, y + 2.6, 0.15);
            return <circle key={i} className="ill-pulse" cx={sx} cy={sy} r={1.4} />;
          })}
        </g>
      )}
    </g>
  );
}

/** Bare PCB used by the concept stage. Local center (1.7, 1.2). */
export function Pcb({ c }: P) {
  const z = 0.2;
  const tr = (pts: [number, number][]) =>
    "M" + pts.map(([x, y]) => c.proj(x, y, z).map((n) => n.toFixed(1)).join(" ")).join(" L");
  return (
    <g>
      <Box c={c} b={[0, 0, 3.4, 2.4, 0, z]} top={C.accentPale} stroke={C.lineStrong} />
      <path d={tr([[0.3, 0.4], [1.2, 0.4], [1.5, 0.8], [2.2, 0.8]])} stroke={C.accent} strokeWidth={1.3} fill="none" strokeLinejoin="round" />
      <path className="ill-dash" d={tr([[0.3, 1.9], [1.1, 1.9], [1.5, 1.5], [3.0, 1.5]])} stroke={C.accent} strokeWidth={1.3} fill="none" strokeDasharray="5 5" strokeLinejoin="round" />
      <path d={tr([[2.2, 0.4], [3.0, 0.4], [3.0, 1.2]])} stroke={C.accentSoft} strokeWidth={1.3} fill="none" strokeLinejoin="round" />
      <Box c={c} b={[1.2, 0.9, 2, 1.5, z, z + 0.3]} top={C.ink2} right={C.ink} front={C.ink} stroke={C.ink} />
      <Box c={c} b={[0.3, 0.9, 0.7, 1.3, z, z + 0.18]} top={C.faceDark} />
      <Box c={c} b={[2.5, 1.7, 3.1, 2.1, z, z + 0.22]} top={C.faceDark} />
      {[[0.4, 0.4], [3.0, 1.2], [1.1, 1.9], [2.2, 0.8]].map(([x, y], i) => {
        const [sx, sy] = c.proj(x, y, z);
        return <circle key={i} cx={sx} cy={sy} r={1.6} fill={C.card} stroke={C.accent} strokeWidth={1} />;
      })}
    </g>
  );
}

export const OBJECTS = {
  wearable: { draw: Wearable, cx: 2.1, cy: 1.5 },
  environmental: { draw: EnvSensor, cx: 1.5, cy: 1.2 },
  bezel: { draw: Bezel, cx: 2, cy: 1.2 },
  replica: { draw: Replica, cx: 1.7, cy: 0.9 },
  startup: { draw: Startup, cx: 1.8, cy: 1 },
  transformer: { draw: Transformer, cx: 1.5, cy: 1 },
} as const;

export type ObjectKey = keyof typeof OBJECTS;
