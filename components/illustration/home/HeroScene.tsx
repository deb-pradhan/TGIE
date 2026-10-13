import type { ReactNode } from "react";
import { C } from "../kit";
import { Live } from "../Live";
import { makeScene } from "./iso";
import { Sketch, Pcb, Enclosure, Products, Company, Steel } from "./objects";

/**
 * Home hero — "Theory, embodied."
 * One isometric ground, one dashed accent path, four pillars:
 * sketch → PCB → enclosure (A) → product run (B) → company (C) → steel (D),
 * with a TGIE hub in the middle of the "V" and floating spec chips.
 * Pure SVG, server-rendered, CSS-only ambient motion (.ill-*).
 */

const S = makeScene(320, 125, 27, 24, "hs");
const MONO = "var(--font-mono), ui-monospace, monospace";

const A = (x: number, y: number, z = 0.02) => S.proj(x, y, z);
const pts = (a: [number, number][]) =>
  "M" +
  a
    .map(([x, y]) =>
      A(x, y)
        .map((v) => v.toFixed(1))
        .join(" "),
    )
    .join("L");

/** floating spec chip with a leader down to its object */
function Chip({
  cx,
  cy,
  zChip,
  zObj,
  label,
  letter,
  float,
  dx = 0,
  secondary = false,
}: {
  dx?: number;
  secondary?: boolean;
  cx: number;
  cy: number;
  zChip: number;
  zObj: number;
  label: string;
  letter?: string;
  float: string;
}) {
  const [ax, yAnchor] = S.proj(cx, cy, zChip);
  const x = ax + dx;
  const [, yObj] = S.proj(cx, cy, zObj);
  const w = label.length * 7.4 + (letter ? 40 : 24);
  const top = yAnchor - 26;
  return (
    <g className={secondary ? "hidden min-[1100px]:inline" : undefined}>
      <path
        d={`M${x.toFixed(1)} ${(top + 26).toFixed(1)}L${ax.toFixed(1)} ${yObj.toFixed(1)}`}
        stroke={C.ink2}
        strokeOpacity={0.4}
        strokeWidth={1}
        strokeDasharray="2 3"
      />
      <circle cx={ax} cy={yObj} r={2.2} fill={C.accent} />
      <g className={float}>
        <g transform={`translate(${(x - w / 2).toFixed(1)} ${top.toFixed(1)})`}>
          <rect
            y={2.5}
            width={w}
            height={24}
            rx={12}
            fill="rgba(17,19,18,.12)"
          />
          <rect width={w} height={24} rx={12} fill="#fff" stroke={C.line} />
          {letter && (
            <>
              <circle cx={13} cy={12} r={8.5} fill={C.accentDeep} />
              <text
                x={13}
                y={16}
                textAnchor="middle"
                fontSize={11.5}
                fill="#fff"
                fontFamily={MONO}
              >
                {letter}
              </text>
            </>
          )}
          <text
            x={letter ? 27 : 12}
            y={16}
            fontSize={12}
            fill={C.ink2}
            fontFamily={MONO}
          >
            {label}
          </text>
        </g>
      </g>
    </g>
  );
}

function Hub(): ReactNode {
  const hx = 4.5,
    hy = 4.5;
  const c = S.proj(hx, hy, 0.02);
  const ring = (r: number) => ({ rx: +(1.414 * S.k * r).toFixed(2), ry: +(0.707 * S.k * r).toFixed(2) });
  return (
    <g>
      {[1.7, 2.5].map((r, i) => (
        <ellipse
          key={r}
          cx={c[0]}
          cy={c[1]}
          {...ring(r)}
          fill="none"
          stroke={C.accentSoft}
          strokeOpacity={i ? 0.45 : 0.7}
          strokeWidth={1.2}
          strokeDasharray="3 4"
          className={i ? undefined : "ill-pulse"}
        />
      ))}
      {S.bx(hx - 0.8, hy - 0.8, hx + 0.8, hy + 0.8, 0, 0.3, "accentPale")}
      {S.bx(hx - 0.5, hy - 0.5, hx + 0.5, hy + 0.5, 0.3, 3.1, "graphite")}
      <g transform={S.F(hy + 0.5)}>
        <path
          d={`M${hx - 0.26} 2.35H${hx + 0.26}M${hx} 2.35V1.5`}
          stroke="#fff"
          strokeWidth={0.12}
          strokeLinecap="square"
        />
        <path
          d={`M${hx - 0.4} .55H${hx + 0.4}`}
          stroke={C.accentSoft}
          strokeWidth={0.04}
          strokeLinecap="round"
          strokeDasharray=".1 .08"
        />
      </g>
      <g transform={S.R(hx + 0.5)}>
        <path
          d={`M${hy - 0.35} .6V2.9M${hy - 0.12} .6V2.9M${hy + 0.12} .6V2.9M${hy + 0.35} .6V2.9`}
          stroke={C.accentSoft}
          strokeOpacity={0.35}
          strokeWidth={0.03}
        />
      </g>
      {S.bx(hx - 0.55, hy - 0.55, hx + 0.55, hy + 0.55, 3.1, 3.2, "accent")}
    </g>
  );
}

const STAGES: [number, number][] = [
  [1.2, 9],
  [4, 9],
  [6.8, 9],
  [9, 6.8],
  [9, 4],
  [9, 1.2],
];

const CHIPS = [
  {
    cx: 1.2,
    cy: 9,
    zChip: 3.3,
    zObj: 2.1,
    label: "Hand sketch",
    letter: "A",
    float: "ill-float",
  },
  {
    cx: 4,
    cy: 9,
    zChip: 1.25,
    zObj: 0.45,
    label: "Gerber v3",
    letter: "A",
    float: "ill-float-2",
    dx: 8,
    secondary: true,
  },
  {
    cx: 6.8,
    cy: 9,
    zChip: 4.4,
    zObj: 2.6,
    label: "DFM reviewed",
    letter: "A",
    float: "ill-float",
    dx: -34,
    secondary: true,
  },
  {
    cx: 9,
    cy: 6.8,
    zChip: 1.9,
    zObj: 0.7,
    label: "Run of 500",
    letter: "B",
    float: "ill-float-2",
  },
  {
    cx: 9,
    cy: 4,
    zChip: 3.7,
    zObj: 3.1,
    label: "Incorporated",
    letter: "C",
    float: "ill-float",
  },
  {
    cx: 9,
    cy: 1.2,
    zChip: 3.5,
    zObj: 2.25,
    label: "ISO 9001",
    letter: "D",
    float: "ill-float-2",
  },
  {
    cx: 4.5,
    cy: 4.5,
    zChip: 4.4,
    zObj: 3.2,
    label: "1 PO",
    float: "ill-float",
  },
];

export function HeroScene() {
  return (
    <Live>
      <svg
        viewBox="14 44 612 380"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Isometric journey from a hand sketch through a circuit board, enclosure, product run and company to a steel structure, joined by one dashed path."
      >
        <S.LayerDefs />
        <S.Slab a={-0.6} b={10.3} />

        {/* pads first, then the road over them, then the objects */}
        {STAGES.map(([x, y]) => (
          <g key={`${x}${y}`}>{S.pad(x, y)}</g>
        ))}
        {/* the road: one continuous path through every stage */}
        <g transform={S.T(0.02)}>
          <path
            d="M.2 8.7H8.7V.2H9.3V9.3H.2Z"
            fill={C.accentSoft}
            fillOpacity={0.22}
          />
        </g>
        <path
          d={pts([
            [0.2, 9],
            [9, 9],
            [9, 0.55],
          ])}
          fill="none"
          stroke={C.accent}
          strokeWidth={1.7}
          strokeLinejoin="round"
          strokeDasharray="6 4"
          className="ill-dash"
        />
        <g transform={S.T(0.02)}>
          <path d="M8.78 .95H9.22L9 .3Z" fill={C.accent} />
          <circle
            cx={9}
            cy={9}
            r={0.32}
            fill="#fff"
            stroke={C.accent}
            strokeWidth={0.05}
          />
          <circle cx={9} cy={9} r={0.1} fill={C.accent} />
        </g>

        {/* hub spokes: every pillar hangs off one team */}
        <path
          d={
            pts([
              [4.5, 5.3],
              [4.2, 7.85],
            ]) +
            pts([
              [5.3, 4.6],
              [7.85, 6.7],
            ]) +
            pts([
              [5.3, 4.5],
              [7.85, 4.1],
            ]) +
            pts([
              [5.3, 4.3],
              [7.85, 2],
            ])
          }
          fill="none"
          stroke={C.accent}
          strokeOpacity={0.5}
          strokeWidth={1.2}
          strokeDasharray="2 4"
        />

        {Hub()}
        {Sketch(S, 1.2, 9, false)}
        {Steel(S, 9, 1.2, false)}
        {Pcb(S, 4, 9, false)}
        {Company(S, 9, 4, false)}
        {Enclosure(S, 6.8, 9, false)}
        {Products(S, 9, 6.8, false)}

        <g className="hidden sm:inline">
          {CHIPS.map((c) => (
            <Chip key={c.label} {...c} />
          ))}
        </g>
      </svg>
    </Live>
  );
}
