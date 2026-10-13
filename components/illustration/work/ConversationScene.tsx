import type { ReactNode } from "react";
import { C, SceneFrame } from "../kit";
import { mk, placed, Box } from "./geo";
import { EnvSensor } from "./objects";

/**
 * /start hero art (isometric). A desk with a laptop, two chat-bubble tiles
 * floating over it, and a finished prototype box leaving the desk along a
 * dashed teal path. Decorative.
 */
const NS = { vectorEffect: "non-scaling-stroke" as const };

/** rounded speech tile on the lit plane: x..x+w, z..z+h, tail at the bottom left */
function Bubble({ x, z, w, h, fill, stroke, children }: { x: number; z: number; w: number; h: number; fill: string; stroke?: string; children: ReactNode }) {
  const r = 0.28;
  const d = `M${x + r} ${z + h} h${w - 2 * r} a${r} ${r} 0 0 0 ${r} ${-r} v${-(h - 2 * r)} a${r} ${r} 0 0 0 ${-r} ${-r} h${-(w - 0.9 - r)} l${-0.35} ${-0.5} l${-0.1} ${0.5} h${-0.3} a${r} ${r} 0 0 0 ${-r} ${r} v${h - 2 * r} a${r} ${r} 0 0 0 ${r} ${r} z`;
  return (
    <>
      <path d={d} fill={fill} stroke={stroke} strokeWidth={1} strokeLinejoin="round" {...NS} />
      {children}
    </>
  );
}

export function ConversationScene() {
  const g = mk(320, 185, 34);
  const spot = g.proj(3.9, 1.7, 1.85);
  const box = placed(1.5, 1.2, spot[0], spot[1] + 5, 12);
  const exitA = g.proj(4.5, 2.6, 1.85);
  const exitB = g.proj(6.4, 5.4, -1.6);

  return (
    <SceneFrame viewBox="0 0 640 480" ground tone="cell">
      <Box c={g} b={[-1.5, -1.2, 7, 6.5, -1.9, -1.6]} top={C.mint} front={C.faceL} right={C.faceR} stroke={C.lineStrong} />
      {/* desk legs (back first) */}
      {[[0.15, 0.15], [4.55, 0.15], [0.15, 2.65], [4.55, 2.65]].map(([x, y], i) => (
        <Box key={i} c={g} b={[x, y, x + 0.3, y + 0.3, -1.6, 1.6]} top={C.faceL} right={C.faceDark} front={C.faceR} />
      ))}
      <Box c={g} b={[0, 0, 5, 3, 1.6, 1.85]} top={C.card} front={C.faceL} right={C.faceR} stroke={C.lineStrong} />

      {/* laptop: base + upright screen with typing lines */}
      <Box c={g} b={[0.7, 0.9, 2.5, 2.3, 1.85, 1.97]} top={C.faceL} />
      <Box c={g} b={[0.7, 0.8, 2.5, 0.92, 1.97, 3.5]} top={C.card} front={C.ink2} right={C.ink2} />
      <g transform={g.front(0.92)}>
        <rect x={0.82} y={2.15} width={1.56} height={1.2} rx={0.05} fill={C.forest} />
        <path d="M1 3.12h0.9 M1 2.84h1.25 M1 2.56h0.7" stroke={C.tealSoft} strokeWidth={1.4} strokeLinecap="round" fill="none" {...NS} />
        <rect className="ill-blink" x={1.2} y={2.3} width={0.1} height={0.18} fill={C.teal} />
      </g>
      {/* a notepad on the desk */}
      <Box c={g} b={[3.2, 0.5, 4.1, 1.3, 1.85, 1.92]} top={C.mint} stroke={C.tealSoft} />

      {/* chat bubbles floating over the desk */}
      <g className="ill-float">
        <g transform={g.front(-0.3)}>
          <Bubble x={0.2} z={4.3} w={3} h={1.5} fill={C.card} stroke={C.lineStrong}>
            {[0.95, 1.7, 2.45].map((x, i) => (
              <circle key={x} className="ill-pulse" cx={x} cy={5.05} r={0.13} fill={C.teal} style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </Bubble>
        </g>
      </g>
      <g className="ill-float-2">
        <g transform={g.front(-0.3)}>
          <Bubble x={2.7} z={5.9} w={3.2} h={1.6} fill={C.teal}>
            <path d="M3.3 6.95h2.3 M3.3 6.6h1.7 M3.3 7.3h2" stroke={C.card} strokeWidth={1.8} strokeLinecap="round" {...NS} />
          </Bubble>
        </g>
      </g>

      {/* the prototype leaving on a dashed path */}
      <path
        className="ill-dash"
        d={`M${exitA[0].toFixed(1)} ${exitA[1].toFixed(1)} C${(exitA[0] + 60).toFixed(1)} ${(exitA[1] + 10).toFixed(1)} ${(exitB[0] - 60).toFixed(1)} ${(exitB[1] - 70).toFixed(1)} ${exitB[0].toFixed(1)} ${exitB[1].toFixed(1)}`}
        fill="none"
        stroke={C.teal}
        strokeWidth={2}
        strokeDasharray="5 5"
        strokeLinecap="round"
      />
      <path d={`M${exitB[0]} ${exitB[1]} l-3 -13 l13 6 z`} fill={C.teal} transform={`rotate(24 ${exitB[0]} ${exitB[1]})`} />
      <g className="ill-float-2">
        <EnvSensor c={box} />
      </g>
    </SceneFrame>
  );
}
