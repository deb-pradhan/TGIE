import type { ReactNode } from "react";
import { C } from "../kit";
import { Live } from "../Live";
import { makeScene } from "./iso";
import { Steel } from "./objects";

/**
 * Three isometric vignettes for the Audiences cells (one register: isometric).
 * Art stays inside the central ~240 units of a 400x200 box so the figure can
 * crop (slice) on narrow cells without losing anything.
 */

function Art({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="iso-grid relative h-[200px] w-full overflow-hidden bg-accent-pale"
    >
      <Live>
        <svg
          viewBox="0 0 400 200"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          {children}
        </svg>
      </Live>
    </div>
  );
}

/* 01 · research lab: bench, oscilloscope, wearable sensor, beaker */
const L = makeScene(200, 108, 24, 22, "au1");
export function LabBench() {
  const s = L;
  const sensor = s.proj(1.6, 0, 1.75);
  return (
    <Art>
      {s.pad(0, 0, 3.2, 0.1)}
      {/* bench: four legs + top */}
      {[
        [-2.6, -1.1],
        [2.35, -1.1],
        [-2.6, 0.9],
        [2.35, 0.9],
      ].map(([x, y]) => (
        <g key={`${x}${y}`}>
          {s.bx(x, y, x + 0.25, y + 0.25, 0.1, 1.2, "steel")}
        </g>
      ))}
      {s.bx(-2.8, -1.3, 2.8, 1.2, 1.2, 1.45, "white")}
      {/* oscilloscope */}
      {s.bx(-2.4, -0.7, -0.2, 0.6, 1.45, 2.6, "steel")}
      <g transform={s.F(0.6)}>
        <rect
          x={-2.25}
          y={1.75}
          width={1.35}
          height={0.7}
          rx={0.05}
          fill="#1c1f1e"
        />
        <path
          d="M-2.2 2.1h.2l.1 -.25.2 .5.2 -.5.2 .5.2 -.5.2 .5.1 -.25h.2"
          fill="none"
          stroke={C.accentSoft}
          strokeWidth={0.04}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x={-2.25}
          y={1.75}
          width={0.06}
          height={0.7}
          fill={C.accentSoft}
          opacity={0.6}
          className="ill-scan"
        />
        <circle
          cx={-0.6}
          cy={2.3}
          r={0.1}
          fill="#fff"
          stroke={C.lineStrong}
          strokeWidth={0.02}
        />
        <circle
          cx={-0.6}
          cy={1.95}
          r={0.1}
          fill="#fff"
          stroke={C.lineStrong}
          strokeWidth={0.02}
        />
        <circle
          cx={-0.35}
          cy={1.7}
          r={0.05}
          fill={C.accent}
          className="ill-blink"
        />
      </g>
      {/* beaker */}
      {(() => {
        const b = s.proj(0.2, -0.5, 1.45);
        const rx = +(1.414 * s.k * 0.28).toFixed(2);
        const ry = +(0.707 * s.k * 0.28).toFixed(2);
        return (
          <g>
            <path
              d={`M${b[0] - rx} ${b[1] - 18}V${b[1]}A${rx} ${ry} 0 0 0 ${b[0] + rx} ${b[1]}V${b[1] - 18}`}
              fill="#fff"
              fillOpacity={0.7}
              stroke={C.lineStrong}
              strokeWidth={1}
            />
            <path
              d={`M${b[0] - rx} ${b[1] - 8}V${b[1]}A${rx} ${ry} 0 0 0 ${b[0] + rx} ${b[1]}V${b[1] - 8}A${rx} ${ry} 0 0 1 ${b[0] - rx} ${b[1] - 8}Z`}
              fill={C.accentSoft}
              fillOpacity={0.7}
            />
            <ellipse
              cx={b[0]}
              cy={b[1] - 18}
              rx={rx}
              ry={ry}
              fill="#fff"
              stroke={C.lineStrong}
              strokeWidth={1}
            />
          </g>
        );
      })()}
      {/* signal cable: sensor to scope */}
      <path
        d={`M${s.proj(1.3, 0.1, 1.46)[0]} ${s.proj(1.3, 0.1, 1.46)[1]}L${s.proj(0.7, 0.45, 1.46)[0]} ${s.proj(0.7, 0.45, 1.46)[1]}L${s.proj(-0.2, 0.45, 1.46)[0]} ${s.proj(-0.2, 0.45, 1.46)[1]}`}
        fill="none"
        stroke={C.accent}
        strokeWidth={1.5}
        strokeDasharray="6 4"
        className="ill-dash"
      />
      {/* wearable sensor: strap + puck */}
      {s.bx(1.0, -0.45, 2.2, 0.35, 1.45, 1.6, "accentPale")}
      {s.bx(1.3, -0.25, 1.9, 0.2, 1.6, 1.85, "graphite")}
      <g transform={s.T(1.85)}>
        <circle
          cx={1.6}
          cy={-0.02}
          r={0.1}
          fill={C.accentSoft}
          className="ill-blink"
        />
      </g>
      <circle
        cx={sensor[0]}
        cy={sensor[1]}
        r={9}
        fill={C.accentSoft}
        opacity={0.18}
        className="ill-pulse"
      />
    </Art>
  );
}

/* 02 · founders: prototype → product → company, stepping up */
const F = makeScene(200, 124, 22, 19, "au2");
export function FounderSteps() {
  const s = F;
  const steps: [number, number][] = [
    [0, 2.5],
    [0, 0],
    [0, -2.5],
  ];
  const hts = [0.35, 0.95, 1.55];
  const tx = s.proj(0, -2.5, 1.55 + 1.7);
  return (
    <Art>
      {s.pad(0, 0, 3.0, 0.1)}
      {steps.map(([x, y], i) => (
        <g key={i}>{s.bx(x - 1, y - 1, x + 1, y + 1, 0.1, hts[i], "white")}</g>
      ))}
      {/* 1 prototype board */}
      {s.bx(-0.7, 1.9, 0.7, 3.1, hts[0], hts[0] + 0.12, "graphite")}
      <g transform={s.T(hts[0] + 0.12)}>
        <path
          d="M-.5 2.3H-.1V2.7M.5 2.5H.1"
          stroke={C.accentSoft}
          strokeWidth={0.05}
          fill="none"
          strokeLinecap="round"
        />
        <circle
          cx={0.45}
          cy={2.9}
          r={0.06}
          fill={C.accentSoft}
          className="ill-blink"
        />
      </g>
      {s.bx(-0.25, 2.25, 0.25, 2.75, hts[0] + 0.12, hts[0] + 0.25, "ink")}
      {/* 2 product box */}
      {s.bx(-0.75, -0.7, 0.75, 0.7, hts[1], hts[1] + 1.0, "white")}
      <g transform={s.T(hts[1] + 1.0)}>
        <rect
          x={-0.75}
          y={-0.12}
          width={1.5}
          height={0.24}
          fill={C.accentSoft}
          fillOpacity={0.8}
        />
      </g>
      <g transform={s.F(0.7)}>
        <rect
          x={-0.2}
          y={hts[1] + 0.3}
          width={0.4}
          height={0.4}
          rx={0.06}
          fill="#1c1f1e"
        />
        <path
          d={`M-.1 ${hts[1] + 0.58}H.1M0 ${hts[1] + 0.58}V${hts[1] + 0.4}`}
          stroke="#fff"
          strokeWidth={0.05}
          strokeLinecap="square"
        />
      </g>
      {/* 3 company */}
      {s.bx(-0.7, -3.1, 0.7, -1.9, hts[2], hts[2] + 1.45, "white")}
      <g transform={s.F(-1.9)}>
        {[0, 1].map((r) =>
          [0, 1, 2].map((c) => (
            <rect
              key={`${r}${c}`}
              x={-0.5 + c * 0.4}
              y={hts[2] + 0.3 + r * 0.45}
              width={0.25}
              height={0.28}
              rx={0.03}
              fill={(r + c) % 2 ? C.accentSoft : "#fff5ee"}
              stroke={C.lineStrong}
              strokeWidth={0.015}
            />
          )),
        )}
      </g>
      {s.bx(-0.04, -2.54, 0.04, -2.46, hts[2] + 1.45, hts[2] + 2.2, "ink")}
      <path
        d={s.poly([
          s.proj(0.04, -2.5, hts[2] + 2.15),
          s.proj(0.6, -2.5, hts[2] + 2.0),
          s.proj(0.04, -2.5, hts[2] + 1.85),
        ])}
        fill={C.accent}
        stroke={C.accentDeep}
        strokeWidth={0.8}
        className="ill-float"
      />
      {/* launch trajectory */}
      <path
        d={`M${s.proj(0, 2.5, 2.2)[0]} ${s.proj(0, 2.5, 2.2)[1]}Q${s.proj(0, 0, 3.9)[0] - 8} ${s.proj(0, 0, 3.9)[1] - 6} ${tx[0] - 4} ${tx[1] - 6}`}
        fill="none"
        stroke={C.accent}
        strokeWidth={1.5}
        strokeDasharray="6 4"
        className="ill-dash"
      />
      <path
        d={`M${tx[0] - 10} ${tx[1] - 12}L${tx[0] - 2} ${tx[1] - 4}L${tx[0] - 12} ${tx[1] - 3}Z`}
        fill={C.accent}
      />
    </Art>
  );
}

/* 03 · industrial: structural skid, transformer tank, beam stock */
const I = makeScene(214, 100, 28, 22, "au3");
export function SteelSkid() {
  const s = I;
  return (
    <Art>
      {s.pad(-0.3, 0.3, 2.9, 0.1)}
      {/* beam stock */}
      {s.bx(-3.1, 1.0, -0.9, 1.3, 0.1, 0.34, "steel")}
      {s.bx(-3.1, 1.45, -0.9, 1.75, 0.1, 0.34, "steel")}
      {s.bx(-3.1, 1.22, -0.9, 1.52, 0.34, 0.58, "steel")}
      {Steel(s, 1.2, 0.2, false, true)}
    </Art>
  );
}
