import { C, SceneFrame } from "../kit";
import { mk, placed, Box } from "./geo";
import { OBJECTS, type ObjectKey } from "./objects";

/**
 * /work hero art. Isometric "case wall": six mini object tiles on one iso
 * ground, joined by a dashed teal path, one tile per engagement. Decorative.
 */
const ORDER: ObjectKey[] = ["wearable", "environmental", "bezel", "replica", "startup", "transformer"];
// serpentine so the path reads 1 to 6 without crossing
const SLOTS: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [2, 1],
  [1, 1],
  [0, 1],
];
const PITCH = 4.5;
const SIDE = 3.5;
const X = 3 * PITCH - (PITCH - SIDE);
const Y = 2 * PITCH - (PITCH - SIDE);
const K = 25;

export function CaseWall() {
  const ox = (640 - (X + Y) * K) / 2 + Y * K;
  const oy = 132;
  const g = mk(ox, oy, K);
  const tiles = SLOTS.map(([i, j], n) => ({ n, key: ORDER[n], x: i * PITCH, y: j * PITCH })).sort(
    (a, b) => a.x + a.y - (b.x + b.y),
  );

  // dashed hops across the 1-unit gaps, with a port ring on each tile edge
  const hops = SLOTS.slice(0, -1).map(([i, j], n) => {
    const [i2, j2] = SLOTS[n + 1];
    const cx = i * PITCH + SIDE / 2;
    const cy = j * PITCH + SIDE / 2;
    const dx = Math.sign(i2 - i);
    const dy = Math.sign(j2 - j);
    const a = g.proj(cx + dx * (SIDE / 2), cy + dy * (SIDE / 2), 0.2);
    const b = g.proj(cx + dx * (PITCH - SIDE / 2), cy + dy * (PITCH - SIDE / 2), 0.2);
    return { a, b, n };
  });

  return (
    <SceneFrame viewBox="0 0 640 480" ground tone="cell">
      <Box c={g} b={[-1, -1, X + 1, Y + 1, -0.35, 0]} top={C.soft} front={C.faceL} right={C.faceR} stroke={C.line} />
      {tiles.map((t) => (
        <Box key={t.n} c={g} b={[t.x, t.y, t.x + SIDE, t.y + SIDE, 0, 0.22]} top={C.mint} front={C.faceL} right={C.faceR} stroke={C.lineStrong} />
      ))}
      {hops.map(({ a, b, n }) => (
        <g key={n}>
          <path
            className="ill-dash"
            d={`M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`}
            stroke={C.teal}
            strokeWidth={1.8}
            strokeDasharray="5 5"
            strokeLinecap="round"
          />
          <circle cx={a[0]} cy={a[1]} r={3} fill={C.card} stroke={C.teal} strokeWidth={1.5} />
          <circle cx={b[0]} cy={b[1]} r={3} fill={C.card} stroke={C.teal} strokeWidth={1.5} />
        </g>
      ))}
      {tiles.map((t) => {
        const o = OBJECTS[t.key];
        const [sx, sy] = g.proj(t.x + SIDE / 2, t.y + SIDE / 2, 0.22);
        const ctx = placed(o.cx, o.cy, sx, sy, K * 0.74);
        const Draw = o.draw;
        return (
          <g key={t.key} className={t.n === 1 ? "ill-float-2" : t.n === 4 ? "ill-float" : undefined}>
            <Draw c={ctx} />
          </g>
        );
      })}
    </SceneFrame>
  );
}
