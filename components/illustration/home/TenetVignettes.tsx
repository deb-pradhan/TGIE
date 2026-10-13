import type { ReactNode } from "react";
import { C } from "../kit";
import { Live } from "../Live";
import { makeScene } from "./iso";

/**
 * Three small isometric vignettes for the Philosophy principles.
 * One register (isometric), decorative, ~120px tall. Pure SVG.
 */

const ghost = {
  stroke: C.teal,
  strokeWidth: 1.2,
  strokeDasharray: "4 3",
  strokeLinejoin: "round",
} as const;

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div
      aria-hidden
      className="iso-grid relative h-[124px] w-full overflow-hidden rounded-tile bg-paper-2"
      data-label={label}
    >
      <Live>
        <svg
          viewBox="0 0 300 124"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          {children}
        </svg>
      </Live>
    </div>
  );
}

/* I · an idea needs a form: sketch (dashed) → half built → solid */
const S1 = makeScene(150, 75, 22, 16, "tn1");
export function TenetForm() {
  const s = S1;
  const half = [-2.4, 0, 2.4];
  const ghostBox = (
    cx: number,
    cy: number,
    z0: number,
    z1: number,
    cls?: string,
  ) => {
    const f = s.box(cx - 0.7, cy - 0.7, cx + 0.7, cy + 0.7, z0, z1);
    return (
      <g className={cls}>
        <path d={f.right} fill={C.tealSoft} fillOpacity={0.14} {...ghost} />
        <path d={f.front} fill={C.tealSoft} fillOpacity={0.08} {...ghost} />
        <path d={f.top} fill="#fff" fillOpacity={0.6} {...ghost} />
      </g>
    );
  };
  return (
    <Frame label="An idea becomes a form">
      {half.map((a) => s.pad(a, -a, 1.05, 0.2))}
      {/* hand-offs between stages */}
      <path
        d="M91 75H114M186 75H209"
        stroke={C.teal}
        strokeWidth={1.4}
        strokeDasharray="4 4"
        fill="none"
        className="ill-dash"
      />
      {/* 1 sketch */}
      {ghostBox(-2.4, 2.4, 0.2, 1.6, "ill-float")}
      {/* 2 half built */}
      {s.bx(-0.7, -0.7, 0.7, 0.7, 0.2, 0.9, "white", { lay: true })}
      {(() => {
        const f = s.box(-0.7, -0.7, 0.7, 0.7, 0.9, 1.6);
        return (
          <g>
            <path d={f.right} fill={C.tealSoft} fillOpacity={0.12} {...ghost} />
            <path d={f.front} fill={C.tealSoft} fillOpacity={0.08} {...ghost} />
            <path d={f.top} fill="#fff" fillOpacity={0.5} {...ghost} />
          </g>
        );
      })()}
      {/* 3 solid */}
      {s.bx(2.4 - 0.7, -2.4 - 0.7, 2.4 + 0.7, -2.4 + 0.7, 0.2, 1.6, "white")}
      <g transform={s.T(1.6)}>
        <rect
          x={1.95}
          y={-2.85}
          width={0.9}
          height={0.9}
          rx={0.12}
          fill="#0f3a2e"
        />
        <path
          d="M2.15 -2.6H2.65M2.4 -2.6V-2.2"
          stroke="#fff"
          strokeWidth={0.1}
          strokeLinecap="square"
        />
      </g>
      <s.LayerDefs />
    </Frame>
  );
}

/* II · the weight shouldn't fall on the creator: a platform carries the slab */
const S2 = makeScene(170, 72, 22, 17, "tn2");
export function TenetWeight() {
  const s = S2;
  const fx = -2.9,
    fy = 1.7;
  return (
    <Frame label="The platform carries the weight">
      <s.LayerDefs />
      {s.pad(0.1, -0.2, 2.1, 0.2)}
      {/* posts */}
      {[
        [-1.7, -1.0],
        [1.4, -1.0],
        [-1.7, 0.8],
        [1.4, 0.8],
      ].map(([x, y]) => (
        <g key={`${x}${y}`}>
          {s.bx(x, y, x + 0.4, y + 0.4, 0.2, 1.3, "steel")}
        </g>
      ))}
      {/* the slab */}
      {s.bx(-2.0, -1.3, 2.0, 1.1, 1.3, 2.3, "steel")}
      <g transform={s.T(2.3)}>
        <path
          d="M-1.5 -.6H1.5M-1.5 -.1H1.5M-1.5 .4H1.5"
          stroke="#8fa39a"
          strokeWidth={0.04}
        />
      </g>
      {/* the creator: voxel figure, hands free, holding the idea */}
      {s.bx(fx - 0.2, fy - 0.12, fx + 0.2, fy + 0.12, 0.2, 1.0, "ink")}
      {s.bx(fx - 0.28, fy - 0.2, fx + 0.28, fy + 0.2, 1.0, 1.8, "teal")}
      {s.bx(fx + 0.28, fy - 0.07, fx + 0.42, fy + 0.07, 1.2, 2.3, "teal")}
      {s.bx(fx - 0.2, fy - 0.2, fx + 0.2, fy + 0.2, 1.85, 2.25, "white")}
      {/* the idea, light as air */}
      <g className="ill-float">
        {s.bx(fx + 0.12, fy - 0.2, fx + 0.6, fy + 0.28, 2.55, 3.03, "white")}
      </g>
      <g className="ill-float">
        <circle
          cx={s.proj(fx + 0.36, fy + 0.04, 3.1)[0]}
          cy={s.proj(fx + 0.36, fy + 0.04, 3.1)[1]}
          r={3}
          fill={C.tealSoft}
          opacity={0.5}
          className="ill-pulse"
        />
      </g>
    </Frame>
  );
}

/* III · a form you own: an opened package and the key */
const S3 = makeScene(150, 62, 24, 16, "tn3");
export function TenetOwn() {
  const s = S3;
  return (
    <Frame label="A package you hold the key to">
      {s.pad(0, 0, 2.3, 0.2)}
      {s.bx(-1.2, -1, 1.2, 1, 0.2, 1.5, "white")}
      {/* open flap */}
      {s.bx(-1.2, -1.5, 1.2, -1, 1.5, 1.58, "mint")}
      <g transform={s.T(1.5)}>
        <path
          d="M-1.2 .1H1.2"
          stroke={C.teal}
          strokeWidth={0.04}
          strokeDasharray=".1 .08"
        />
        <rect
          x={-0.3}
          y={-0.9}
          width={0.6}
          height={1.8}
          fill={C.tealSoft}
          fillOpacity={0.35}
        />
      </g>
      {/* open padlock on the front face */}
      <g transform={s.F(1)}>
        <rect
          x={-0.34}
          y={0.35}
          width={0.68}
          height={0.5}
          rx={0.08}
          fill="#0f3a2e"
        />
        <circle cx={0} cy={0.6} r={0.07} fill={C.tealSoft} />
        <path
          d="M-.2 .85V1.07a.2 .2 0 0 1 .4 0V.98"
          fill="none"
          stroke={C.teal}
          strokeWidth={0.07}
          strokeLinecap="round"
        />
      </g>
      {/* the key, lying on the ground */}
      <g transform={s.T(0.2)}>
        <g
          transform="translate(1.5 1.5) rotate(-18)"
          fill="none"
          stroke={C.tealDeep}
          strokeWidth={0.1}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx={0} cy={0} r={0.3} fill={C.tealSoft} />
          <circle cx={0} cy={0} r={0.1} fill="#fff" stroke="none" />
          <path d="M.3 0H1.5M1.2 0V.3M1.5 0V.3" />
        </g>
      </g>
    </Frame>
  );
}
