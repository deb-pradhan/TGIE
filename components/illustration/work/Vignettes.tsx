import type { ReactNode } from "react";
import { C, SceneFrame } from "../kit";
import { placed, Box, GlyphPuck, GLYPH, Sparkle, type Ctx } from "./geo";
import { OBJECTS, type ObjectKey } from "./objects";

/**
 * Case-card vignettes (16:10). One isometric scene per engagement: the object
 * on a plinth slab plus the story around it. Decorative (aria-hidden); the
 * card text carries the meaning.
 */
const NS = { vectorEffect: "non-scaling-stroke" as const };
const K = 24;

function Stage({
  id,
  extras,
  behind,
}: {
  id: ObjectKey;
  extras?: (c: Ctx) => ReactNode;
  behind?: (c: Ctx) => ReactNode;
}) {
  const o = OBJECTS[id];
  const c = placed(o.cx, o.cy, 160, 126, K);
  const Draw = o.draw;
  return (
    <SceneFrame viewBox="0 0 320 200" ground tone="paper2">
      <Box
        c={c}
        b={[o.cx - 2.6, o.cy - 2.4, o.cx + 2.6, o.cy + 2.4, -0.3, 0]}
        top={C.accentPale}
        front={C.faceL}
        right={C.faceR}
      />
      {behind?.(c)}
      <Draw c={c} full />
      {extras?.(c)}
    </SceneFrame>
  );
}

/** a white card standing on the lit plane y = y0, spanning x0..x0+w, z0..z0+h */
function PlaneCard({ c, y, x, z, w, h, children }: { c: Ctx; y: number; x: number; z: number; w: number; h: number; children?: ReactNode }) {
  return (
    <g transform={c.front(y)}>
      <rect x={x} y={z} width={w} height={h} rx={0.12} fill={C.card} stroke={C.lineStrong} strokeWidth={1} {...NS} />
      {children}
    </g>
  );
}

function Gait() {
  return (
    <Stage
      id="wearable"
      behind={(c) => (
        <g className="ill-float-2">
          <PlaneCard c={c} y={-0.4} x={2.7} z={1.9} w={2.2} h={1.3}>
            <path d="M2.9 2.55h0.4l0.25 -0.5 0.35 0.9 0.35 -0.7 0.25 0.35h0.35l0.25 -0.6 0.25 0.7h0.4" fill="none" stroke={C.accent} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...NS} />
            <path d="M2.9 2.15h1.9" stroke={C.line} strokeWidth={1} {...NS} />
            {[0.4, 0.8, 1.2].map((o, i) => (
              <rect key={i} x={2.9 + o * 1.5} y={2.0} width={0.2} height={0.12 + i * 0.05} fill={C.accentSoft} />
            ))}
          </PlaneCard>
        </g>
      )}
      extras={(c) => {
        const [ax, ay] = c.proj(2.1, 1.5, 1);
        const [bx, by] = c.proj(2.7, -0.4, 2.5);
        return (
          <path
            className="ill-dash"
            d={`M${(ax + 6).toFixed(1)} ${(ay - 14).toFixed(1)} Q${(ax + 36).toFixed(1)} ${(ay - 40).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`}
            fill="none"
            stroke={C.accent}
            strokeWidth={1.5}
            strokeDasharray="5 5"
          />
        );
      }}
    />
  );
}

function Environmental() {
  return (
    <Stage
      id="environmental"
      extras={(c) => {
        const [tx, ty] = c.proj(2.5, 0.4, 3);
        return (
          <g>
            <g className="ill-pulse" fill="none" stroke={C.accent} strokeWidth={1.5} strokeLinecap="round">
              <path d={`M${tx - 9} ${ty - 4} a13 13 0 0 1 18 0`} />
              <path d={`M${tx - 15} ${ty - 10} a21 21 0 0 1 30 0`} opacity={0.55} />
            </g>
            {[[-1.4, -0.8, 2.6], [-0.8, 0.9, 3], [-1.9, 1.5, 2.2], [0.9, -0.9, 3.1]].map(([x, y, z], i) => {
              const [rx, ry] = c.proj(x, y, z);
              return (
                <path
                  key={i}
                  className={i % 2 ? "ill-float" : "ill-float-2"}
                  d={`M${rx} ${ry} l-1.5 5`}
                  stroke={C.accent}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        );
      }}
    />
  );
}

function Bezel() {
  const dots: [number, number][] = [];
  for (let x = 0.15; x < 2.1; x += 0.2) for (let z = 0.15; z < 1.85; z += 0.2) if ((Math.round(x * 5) * 7 + Math.round(z * 5) * 3) % 3 !== 0) dots.push([x, z]);
  return (
    <Stage
      id="bezel"
      extras={(c) => (
        <g>
          <g transform={c.front(1.35)}>
            {dots.map(([x, z], i) => (
              <circle key={i} cx={x} cy={z} r={0.035} fill={C.accent} />
            ))}
            <path d="M-0.15 0.35V-0.1H0.35 M3.65 -0.1H4.15V0.35 M4.15 1.55V2H3.65 M0.35 2H-0.15V1.55" fill="none" stroke={C.accent} strokeWidth={1.6} strokeLinecap="round" {...NS} />
          </g>
        </g>
      )}
    />
  );
}

function Replica() {
  return (
    <Stage
      id="replica"
      extras={(c) => {
        const ticks: ReactNode[] = [];
        for (let i = 0; i <= 14; i++) {
          const x = -0.3 + (i * 4) / 14;
          const a = c.proj(x, 2.7, 0);
          const b = c.proj(x, 2.7, i % 7 === 0 ? 0.35 : 0.2);
          ticks.push(<path key={i} d={`M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`} stroke={C.ink2} strokeWidth={1} />);
        }
        const [s1x, s1y] = c.proj(2.6, 0.5, 1.9);
        const [s2x, s2y] = c.proj(0.5, 1.4, 1.4);
        return (
          <g>
            <path d={c.seg(c.proj(-0.3, 2.7, 0), c.proj(3.7, 2.7, 0))} stroke={C.ink2} strokeWidth={1} />
            {ticks}
            <Sparkle className="ill-pulse" x={s1x} y={s1y} s={7} />
            <Sparkle className="ill-float" x={s2x} y={s2y} s={4.5} />
          </g>
        );
      }}
    />
  );
}

function Startup() {
  return (
    <Stage
      id="startup"
      extras={(c) => {
        const spots: [number, string, string][] = [
          [-0.7, GLYPH.doc, "ill-float"],
          [1.05, GLYPH.listing, "ill-float-2"],
          [2.8, GLYPH.handshake, "ill-float"],
        ];
        const centers = spots.map(([x]) => c.proj(x + 0.65, 2.6, 0.22));
        const door = c.proj(0.9, 1.8, 0);
        return (
          <g>
            <path
              className="ill-dash"
              d={`M${centers.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L")} M${centers[1][0].toFixed(1)} ${centers[1][1].toFixed(1)} L${door[0].toFixed(1)} ${door[1].toFixed(1)}`}
              fill="none"
              stroke={C.accent}
              strokeWidth={1.5}
              strokeDasharray="5 5"
            />
            {spots.map(([x, g, cls], i) => (
              <GlyphPuck key={i} c={c} x={x} y={1.95} s={1.3} glyph={g} className={cls} />
            ))}
          </g>
        );
      }}
    />
  );
}

function Transformer() {
  return (
    <Stage
      id="transformer"
      extras={(c) => {
        const a = c.proj(3.6, 0.9, 0.22);
        const b = c.proj(3.1, 1.2, 0.22);
        return (
          <g>
            <path className="ill-dash" d={`M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`} stroke={C.accent} strokeWidth={1.5} strokeDasharray="5 5" />
            <GlyphPuck c={c} x={3.4} y={0.2} s={1.6} glyph={GLYPH.doc} className="ill-float-2" />
          </g>
        );
      }}
    />
  );
}

const MAP = { wearable: Gait, environmental: Environmental, bezel: Bezel, replica: Replica, startup: Startup, transformer: Transformer };
export type VignetteId = keyof typeof MAP;

export function Vignette({ id }: { id: VignetteId }) {
  const V = MAP[id];
  return <V />;
}
