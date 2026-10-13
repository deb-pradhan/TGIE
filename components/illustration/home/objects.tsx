import type { ReactNode } from "react";
import { C } from "../kit";
import type { Scene } from "./iso";

/**
 * Reusable isometric "stage" objects for the home illustrations.
 * Each takes a scene (projection) and a ground centre (cx, cy) in world units.
 * Footprint is ~2.3 x 2.3 units on a pad, so they chain along a path.
 */

/* ---------------------------------------------------------------- A · sketch */
export function Sketch(
  S: Scene,
  cx: number,
  cy: number,
  pad = true,
): ReactNode {
  const z = 0.16;
  const f = S.box(cx - 0.35, cy - 0.35, cx + 0.35, cy + 0.35, 1.3, 2.0);
  const sw = 0.026;
  return (
    <g>
      {pad && S.pad(cx, cy)}
      <g transform={S.T(z)}>
        <g transform={`translate(${cx} ${cy}) rotate(-9) scale(1.18)`}>
          <rect
            x={-0.72}
            y={-0.52}
            width={1.56}
            height={1.16}
            rx={0.03}
            fill="rgba(18,20,19,.08)"
          />
          <rect
            x={-0.78}
            y={-0.58}
            width={1.56}
            height={1.16}
            rx={0.03}
            fill={C.soft}
            stroke={C.lineStrong}
            strokeWidth={0.02}
          />
          <g
            fill="none"
            stroke={C.ink2}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M-.62 -.42H-.2M-.62 -.34H-.38"
              strokeWidth={0.02}
              stroke={C.muted}
            />
            <path d="M-.62 -.05H-.42l.04-.1.08.2.08-.2.08.2.04-.1H.02" />
            <path d="M.05 -.2V.2L.45 0Z" />
            <path d="M.02 -.1H.05M.02 .1H.05M.45 0H.66" />
            <path d="M-.55 .2V.4M-.45 .2V.4M-.7 .3H-.55M-.45 .3H-.28" />
            <path d="M.5 .32V.4M.43 .4H.57M.46 .44H.54" />
            <path d="M-.7 .52H.7" strokeWidth={0.015} stroke={C.muted} />
          </g>
          <ellipse
            cx={0.25}
            cy={0}
            rx={0.34}
            ry={0.28}
            fill="none"
            stroke={C.accent}
            strokeWidth={0.03}
            strokeDasharray=".06 .05"
          />
          <path
            d="M.62 -.38q-.12 .08-.15 .24"
            fill="none"
            stroke={C.accent}
            strokeWidth={0.03}
            strokeLinecap="round"
          />
          <circle cx={0.02} cy={-0.05} r={0.035} fill={C.ink2} />
        </g>
      </g>
      {/* pencil */}
      {S.bx(cx - 0.65, cy + 0.8, cx + 0.75, cy + 0.92, z, z + 0.1, "accent")}
      {S.bx(cx - 0.82, cy + 0.8, cx - 0.65, cy + 0.92, z, z + 0.1, "ink")}
      {/* the idea lifting off the page: dashed ghost block */}
      <path
        d={S.seg(S.proj(cx, cy, z + 0.2), S.proj(cx, cy, 1.3))}
        stroke={C.accent}
        strokeWidth={1.2}
        strokeDasharray="2 3"
      />
      <g className="ill-float">
        <path
          d={f.right}
          fill={C.accentSoft}
          fillOpacity={0.16}
          stroke={C.accent}
          strokeWidth={1.2}
          strokeDasharray="4 3"
          strokeLinejoin="round"
        />
        <path
          d={f.front}
          fill={C.accentSoft}
          fillOpacity={0.1}
          stroke={C.accent}
          strokeWidth={1.2}
          strokeDasharray="4 3"
          strokeLinejoin="round"
        />
        <path
          d={f.top}
          fill="#fff"
          fillOpacity={0.7}
          stroke={C.accent}
          strokeWidth={1.2}
          strokeDasharray="4 3"
          strokeLinejoin="round"
        />
      </g>
    </g>
  );
}

/* -------------------------------------------------------------------- A · PCB */
export function Pcb(S: Scene, cx: number, cy: number, pad = true): ReactNode {
  const zb = 0.27;
  // MCU pin ticks
  let pins = "";
  for (let i = 0; i < 6; i++) {
    const o = -0.25 + i * 0.1;
    pins += `M${cx - 0.4} ${cy + o}H${cx - 0.32}M${cx + 0.32} ${cy + o}H${cx + 0.4}M${cx + o} ${cy - 0.4}V${cy - 0.32}M${cx + o} ${cy + 0.32}V${cy + 0.4}`;
  }
  const hot = [
    S.proj(cx - 0.32, cy, zb),
    S.proj(cx - 0.6, cy, zb),
    S.proj(cx - 0.6, cy - 0.35, zb),
    S.proj(cx - 0.8, cy - 0.35, zb),
  ];
  const hotD =
    "M" + hot.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("L");
  const led = S.proj(cx + 0.55, cy + 0.5, 0.3);
  return (
    <g>
      {pad && S.pad(cx, cy)}
      {S.bx(cx - 0.95, cy - 0.75, cx + 0.95, cy + 0.75, 0.16, zb, "graphite")}
      <g transform={S.T(zb)}>
        <g
          fill="none"
          stroke={C.accentSoft}
          strokeOpacity={0.6}
          strokeWidth={0.035}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d={`M${cx - 0.32} ${cy - 0.15}H${cx - 0.62}L${cx - 0.75} ${cy - 0.3}V${cy - 0.58}M${cx - 0.32} ${cy + 0.15}H${cx - 0.62}L${cx - 0.75} ${cy + 0.3}V${cy + 0.58}M${cx + 0.32} ${cy - 0.15}H${cx + 0.6}L${cx + 0.72} ${cy - 0.3}V${cy - 0.58}M${cx + 0.32} ${cy + 0.05}H${cx + 0.8}M${cx + 0.32} ${cy + 0.2}H${cx + 0.55}L${cx + 0.7} ${cy + 0.35}V${cy + 0.58}M${cx - 0.15} ${cy + 0.32}V${cy + 0.52}H${cx - 0.3}M${cx + 0.1} ${cy + 0.32}V${cy + 0.58}M${cx - 0.15} ${cy - 0.32}V${cy - 0.58}M${cx + 0.1} ${cy - 0.32}V${cy - 0.5}H${cx + 0.4}`}
          />
          <path
            d={`M${cx - 0.2} ${cy - 0.68}h.1v-.07h.07v.07h.07v-.07h.07v.07h.1`}
            strokeOpacity={0.85}
          />
        </g>
        <g fill="#f2f3f1">
          {[
            [-0.75, -0.58],
            [-0.75, 0.58],
            [0.72, -0.58],
            [0.7, 0.58],
            [-0.15, -0.58],
            [0.1, 0.58],
            [0.4, -0.5],
            [-0.3, 0.52],
            [0.8, 0.05],
          ].map(([a, b]) => (
            <circle key={`${a}${b}`} cx={cx + a} cy={cy + b} r={0.05} />
          ))}
        </g>
        <g fill="#111312" stroke="#f2f3f1" strokeWidth={0.02}>
          {[
            [-0.85, -0.62],
            [0.85, -0.62],
            [-0.85, 0.62],
            [0.85, 0.62],
          ].map(([a, b]) => (
            <circle key={`h${a}${b}`} cx={cx + a} cy={cy + b} r={0.06} />
          ))}
        </g>
        <path d={pins} stroke="#aeb3b1" strokeWidth={0.022} />
        <path
          d={`M${cx - 0.5} ${cy + 0.66}H${cx - 0.2}M${cx - 0.15} ${cy + 0.66}H${cx + 0.05}`}
          stroke="#f2f3f1"
          strokeOpacity={0.55}
          strokeWidth={0.022}
        />
      </g>
      {S.bx(cx + 0.42, cy - 0.52, cx + 0.72, cy - 0.28, zb, zb + 0.08, "ink")}
      {S.bx(cx - 0.32, cy - 0.32, cx + 0.32, cy + 0.32, zb, zb + 0.15, "ink")}
      <g transform={S.T(zb + 0.15)}>
        <rect
          x={cx - 0.2}
          y={cy - 0.2}
          width={0.4}
          height={0.4}
          rx={0.03}
          fill="#282d2e"
          stroke="#676868"
          strokeWidth={0.02}
        />
        <circle cx={cx - 0.24} cy={cy - 0.24} r={0.03} fill={C.accentSoft} />
      </g>
      {S.bx(cx - 0.78, cy + 0.32, cx - 0.5, cy + 0.46, zb, zb + 0.07, "steel")}
      {S.bx(cx + 0.5, cy + 0.08, cx + 0.62, cy + 0.2, zb, zb + 0.06, "steel")}
      {S.bx(cx - 0.95, cy - 0.2, cx - 0.62, cy + 0.2, zb, zb + 0.15, "steel")}
      {/* signal running along a trace */}
      <path
        d={hotD}
        stroke="#ffc7a1"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeDasharray="6 4"
        fill="none"
        className="ill-dash"
      />
      {/* blinking status LED */}
      <circle
        cx={led[0]}
        cy={led[1]}
        r={5}
        fill={C.accentSoft}
        opacity={0.3}
        className="ill-blink"
      />
      <circle
        cx={led[0]}
        cy={led[1]}
        r={1.9}
        fill="#fff1e8"
        className="ill-blink"
      />
    </g>
  );
}

/* --------------------------------------------------------------- A · enclosure */
export function Enclosure(
  S: Scene,
  cx: number,
  cy: number,
  pad = true,
): ReactNode {
  const x0 = cx - 0.95,
    x1 = cx + 0.95,
    y0 = cy - 0.75,
    y1 = cy + 0.75;
  const t = 0.12;
  const zr = 1.0; // rim height
  const zf = 0.62; // cavity floor
  const open = S.poly([
    S.proj(x0 + t, y0 + t, zr),
    S.proj(x1 - t, y0 + t, zr),
    S.proj(x1 - t, y1 - t, zr),
    S.proj(x0 + t, y1 - t, zr),
  ]);
  const wallL = S.poly([
    S.proj(x0 + t, y0 + t, zr),
    S.proj(x0 + t, y1 - t, zr),
    S.proj(x0 + t, y1 - t, zf),
    S.proj(x0 + t, y0 + t, zf),
  ]);
  const wallR = S.poly([
    S.proj(x0 + t, y0 + t, zr),
    S.proj(x1 - t, y0 + t, zr),
    S.proj(x1 - t, y0 + t, zf),
    S.proj(x0 + t, y0 + t, zf),
  ]);
  const floor = S.poly([
    S.proj(x0 + t, y0 + t, zf),
    S.proj(x1 - t, y0 + t, zf),
    S.proj(x1 - t, y1 - t, zf),
    S.proj(x0 + t, y1 - t, zf),
  ]);
  const lidZ = 2.35;
  const cid = `${S.id}-cav`;
  const guides = [
    [x0, y1],
    [x1, y0],
    [x1, y1],
  ]
    .map(([a, b]) => {
      const p = S.proj(a, b, zr);
      const q = S.proj(a, b, lidZ);
      return `M${p[0].toFixed(1)} ${p[1].toFixed(1)}V${q[1].toFixed(1)}`;
    })
    .join("");
  return (
    <g>
      {pad && S.pad(cx, cy)}
      {S.bx(x0, y0, x1, y1, 0.16, zr, "white")}
      <defs>
        <clipPath id={cid}>
          <path d={open} />
        </clipPath>
      </defs>
      <path d={open} fill="#c8cbcb" />
      <g clipPath={`url(#${cid})`}>
        <path d={floor} fill="#d6d9d9" />
        <path d={wallL} fill="#bbbebe" />
        <path d={wallR} fill="#abaeae" />
        {S.bx(cx - 0.5, cy - 0.4, cx + 0.5, cy + 0.4, zf, zf + 0.07, "graphite")}
        {S.bx(
          cx - 0.2,
          cy - 0.14,
          cx + 0.2,
          cy + 0.14,
          zf + 0.07,
          zf + 0.17,
          "ink",
        )}
      </g>
      <path d={open} fill="none" stroke={C.lineStrong} strokeWidth={0.8} />
      <g
        transform={S.T(zr)}
        fill="#d0d3d3"
        stroke={C.lineStrong}
        strokeWidth={0.02}
      >
        {[
          [-0.89, -0.69],
          [0.89, -0.69],
          [-0.89, 0.69],
          [0.89, 0.69],
        ].map(([a, b]) => (
          <circle key={`${a}${b}`} cx={cx + a} cy={cy + b} r={0.045} />
        ))}
      </g>
      {/* front face: display, LED, vents */}
      <g transform={S.F(y1)}>
        <rect
          x={cx - 0.72}
          y={0.38}
          width={0.78}
          height={0.42}
          rx={0.05}
          fill="#1c1f1e"
        />
        <path
          d={`M${cx - 0.62} .55l.1 0 .06 .13.1 -.24.08 .2.06 -.08h.2`}
          fill="none"
          stroke={C.accentSoft}
          strokeWidth={0.025}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={cx + 0.45}
          cy={0.74}
          r={0.045}
          fill={C.accent}
          className="ill-blink"
        />
        <path
          d={`M${cx + 0.25} .32h.4M${cx + 0.25} .42h.4M${cx + 0.25} .52h.4`}
          stroke={C.ink2}
          strokeOpacity={0.35}
          strokeWidth={0.025}
          strokeLinecap="round"
        />
      </g>
      {/* right face: USB-C slot */}
      <g transform={S.R(x1)}>
        <rect
          x={cy - 0.15}
          y={0.46}
          width={0.3}
          height={0.13}
          rx={0.065}
          fill="#0d0f0e"
        />
        <path
          d={`M${cy + 0.28} .52h.3`}
          stroke={C.lineStrong}
          strokeWidth={0.03}
          strokeLinecap="round"
        />
      </g>
      {/* lid lifting off */}
      <path
        d={guides}
        stroke={C.accent}
        strokeWidth={1.1}
        strokeDasharray="2 3"
        fill="none"
      />
      <g className="ill-float-2">
        {S.bx(x0, y0, x1, y1, lidZ, lidZ + 0.12, "white")}
        <g transform={S.T(lidZ + 0.12)}>
          <rect
            x={cx - 0.22}
            y={cy - 0.22}
            width={0.44}
            height={0.44}
            rx={0.07}
            fill="#1c1f1e"
          />
          <path
            d={`M${cx - 0.11} ${cy - 0.1}H${cx + 0.11}M${cx} ${cy - 0.1}V${cy + 0.13}`}
            stroke="#fff"
            strokeWidth={0.05}
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------ B · product run */
export function Products(
  S: Scene,
  cx: number,
  cy: number,
  pad = true,
): ReactNode {
  const zt = 0.64;
  const cells = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ];
  return (
    <g>
      {pad && S.pad(cx, cy)}
      {cells.map(([i, j]) => {
        const x0 = cx - 0.95 + i * 1.05;
        const y0 = cy - 0.95 + j * 1.05;
        const hot = i === 1 && j === 1;
        return (
          <g key={`${i}${j}`}>
            {S.bx(x0, y0, x0 + 0.85, y0 + 0.85, 0.16, zt, "white", {
              lay: true,
            })}
            <g transform={S.T(zt)}>
              <rect
                x={x0 + 0.2}
                y={y0 + 0.24}
                width={0.45}
                height={0.37}
                rx={0.06}
                fill="#1c1f1e"
              />
              <path
                d={`M${x0 + 0.27} ${y0 + 0.44}h.08l.05 -.1.07 .2.06 -.14h.1`}
                fill="none"
                stroke={C.accentSoft}
                strokeWidth={0.025}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx={x0 + 0.13}
                cy={y0 + 0.13}
                r={0.04}
                fill={C.accent}
                className={hot ? "ill-blink" : undefined}
              />
            </g>
          </g>
        );
      })}
    </g>
  );
}

/* -------------------------------------------------------------- C · company */
export function Company(
  S: Scene,
  cx: number,
  cy: number,
  pad = true,
): ReactNode {
  const wins = (k: "F" | "R", base: number) => {
    const out: ReactNode[] = [];
    for (let r = 0; r < 2; r++)
      for (let c = 0; c < 3; c++) {
        const lit = (r + c) % 3 === 0;
        out.push(
          <rect
            key={`${k}${r}${c}`}
            x={base + c * 0.4}
            y={0.76 + r * 0.44}
            width={0.26}
            height={0.28}
            rx={0.03}
            fill={lit ? C.accentSoft : "#fff5ee"}
            fillOpacity={lit ? 0.85 : 1}
            stroke={C.lineStrong}
            strokeWidth={0.015}
          />,
        );
      }
    return out;
  };
  const pennant = S.poly([
    S.proj(cx + 0.05, cy, 3.05),
    S.proj(cx + 0.62, cy, 2.9),
    S.proj(cx + 0.05, cy, 2.75),
  ]);
  const coin = [0, 1, 2, 3, 4].map((i) => {
    const p = S.proj(cx + 0.85, cy + 0.85, 0.16 + i * 0.07);
    return (
      <ellipse
        key={i}
        cx={+p[0].toFixed(1)}
        cy={+p[1].toFixed(1)}
        rx={+(1.414 * S.k * 0.27).toFixed(2)}
        ry={+(0.707 * S.k * 0.27).toFixed(2)}
        fill={C.accentSoft}
        stroke={C.accentDeep}
        strokeWidth={0.9}
      />
    );
  });
  return (
    <g>
      {pad && S.pad(cx, cy)}
      {S.bx(cx - 0.75, cy - 0.65, cx + 0.65, cy + 0.65, 0.16, 1.7, "white")}
      <g transform={S.F(cy + 0.65)}>
        {wins("F", cx - 0.66)}
        <rect
          x={cx - 0.1}
          y={0.16}
          width={0.3}
          height={0.5}
          rx={0.03}
          fill="#1c1f1e"
        />
      </g>
      <g transform={S.R(cx + 0.65)}>{wins("R", cy - 0.55)}</g>
      {S.bx(cx - 0.5, cy - 0.45, cx + 0.4, cy + 0.45, 1.7, 2.3, "accentPale")}
      <g transform={S.F(cy + 0.45)}>
        <rect
          x={cx - 0.26}
          y={1.84}
          width={0.5}
          height={0.3}
          rx={0.04}
          fill="#1c1f1e"
        />
        <path
          d={`M${cx - 0.1} 2.07H${cx + 0.08}M${cx - 0.01} 2.07V1.92`}
          stroke="#fff"
          strokeWidth={0.05}
          strokeLinecap="round"
        />
      </g>
      <g transform={S.R(cx + 0.4)}>
        <rect
          x={cy - 0.3}
          y={1.86}
          width={0.22}
          height={0.26}
          rx={0.03}
          fill="#fff5ee"
          stroke={C.lineStrong}
          strokeWidth={0.015}
        />
        <rect
          x={cy + 0.08}
          y={1.86}
          width={0.22}
          height={0.26}
          rx={0.03}
          fill={C.accentSoft}
          fillOpacity={0.85}
          stroke={C.lineStrong}
          strokeWidth={0.015}
        />
      </g>
      {S.bx(cx - 0.04, cy - 0.04, cx + 0.04, cy + 0.04, 2.3, 3.1, "ink")}
      <path
        d={pennant}
        fill={C.accent}
        stroke={C.accentDeep}
        strokeWidth={0.8}
        strokeLinejoin="round"
        className="ill-float"
      />
      {coin}
    </g>
  );
}

/* ----------------------------------------------------------- D · heavy steel */
export function Steel(
  S: Scene,
  cx: number,
  cy: number,
  pad = true,
  sparks = true,
): ReactNode {
  let ribs = "";
  for (let i = 0; i < 11; i++) ribs += `M${cy - 0.55 + i * 0.11} .45V1.45`;
  let fins = "";
  for (let i = 0; i < 7; i++) fins += `M${cy - 0.42 + i * 0.14} .55V1.25`;
  const w = S.proj(cx - 1.05, cy + 0.85, 0.36);
  return (
    <g>
      {pad && S.pad(cx, cy)}
      {S.bx(cx - 1.05, cy - 0.85, cx + 1.05, cy - 0.6, 0.16, 0.34, "steel")}
      {S.bx(cx - 0.55, cy - 0.85, cx - 0.35, cy + 0.85, 0.16, 0.3, "steel")}
      {S.bx(cx + 0.35, cy - 0.85, cx + 0.55, cy + 0.85, 0.16, 0.3, "steel")}
      {S.bx(cx - 1.05, cy + 0.6, cx + 1.05, cy + 0.85, 0.16, 0.34, "steel")}
      {S.bx(cx - 0.8, cy - 0.65, cx + 0.6, cy + 0.65, 0.34, 1.55, "steel")}
      <g transform={S.R(cx + 0.6)}>
        <path
          d={ribs}
          stroke="#8a908f"
          strokeWidth={0.025}
          strokeLinecap="round"
        />
      </g>
      <g transform={S.F(cy + 0.65)}>
        <path
          d={`M${cx - 0.8} .62H${cx + 0.6}M${cx - 0.8} 1.28H${cx + 0.6}`}
          stroke="#8a908f"
          strokeWidth={0.03}
        />
        <circle
          cx={cx - 0.1}
          cy={0.95}
          r={0.27}
          fill="#fff"
          stroke={C.accent}
          strokeWidth={0.04}
        />
        <path
          d={`M${cx - 0.22} .95l.09 -.12.17 .22`}
          fill="none"
          stroke={C.accentDeep}
          strokeWidth={0.05}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {S.bx(cx + 0.6, cy - 0.5, cx + 0.85, cy + 0.5, 0.5, 1.3, "steel")}
      <g transform={S.R(cx + 0.85)}>
        <path
          d={fins}
          stroke="#8a908f"
          strokeWidth={0.025}
          strokeLinecap="round"
        />
      </g>
      {S.bx(cx - 0.85, cy - 0.7, cx + 0.65, cy + 0.7, 1.55, 1.65, "steel")}
      {[-0.4, 0, 0.4].map((d) => (
        <g key={d}>
          {S.bx(
            cx - 0.4 - 0.07,
            cy + d - 0.07,
            cx - 0.4 + 0.07,
            cy + d + 0.07,
            1.65,
            2.1,
            "graphite",
          )}
          {S.bx(
            cx - 0.4 - 0.1,
            cy + d - 0.1,
            cx - 0.4 + 0.1,
            cy + d + 0.1,
            2.1,
            2.2,
            "accent",
          )}
        </g>
      ))}
      {sparks && (
        <g>
          <circle
            cx={w[0]}
            cy={w[1]}
            r={8}
            fill={C.accentSoft}
            opacity={0.35}
            className="ill-pulse"
          />
          <circle
            cx={w[0]}
            cy={w[1]}
            r={2.4}
            fill="#fff"
            stroke={C.accentSoft}
            strokeWidth={1}
          />
          <path
            d={`M${w[0] - 9} ${w[1] - 7}l4 3M${w[0] + 9} ${w[1] - 8}l-4 3M${w[0]} ${w[1] - 12}v4M${w[0] + 11} ${w[1]}h-4`}
            stroke={C.accentDeep}
            strokeWidth={1.2}
            strokeLinecap="round"
            className="ill-blink"
          />
        </g>
      )}
    </g>
  );
}
