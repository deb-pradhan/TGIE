import type { ReactNode } from "react";
import { C, SceneFrame } from "../kit";
import { Arcs, Block, Chip, Cyl, Dim, Ground, Led, mk, MONO, NodeGraph, Pcb, Shadow, Tag, type P3 } from "./_shared/iso";

/** Sub-service illustrations for the "engineering" pillar, keyed by sub slug. */

const dash = { stroke: C.accent, strokeWidth: 1.8, strokeDasharray: "5 5", fill: "none" } as const;

/* ------------------------------------------------------------------ 1. PCB */
function PcbDesign() {
  const s = mk(258, 262);
  const W = 6;
  const D = 3.6;
  const gap = 2.1;
  const names = ["L6 bottom", "L5 signal", "L4 power", "L3 signal", "L2 ground", "L1 top"];
  const tones = [C.faceL, C.card, C.accentPale, C.card, C.accentPale, C.accentPale];
  const vias: [number, number][] = [[2.4, 2.2], [3.6, 1.4], [1.2, 3.0]];
  const traces = (i: number): P3[][] => [
    [[0.7, 0.8 + 0.5 * (i % 3)], [2.4, 0.8 + 0.5 * (i % 3)], [2.4, 2.2], [4.2, 2.2]],
    [[1.2, 3.0], [3.6, 3.0], [3.6, 1.4], [5.3, 1.4]],
    [[4.2, 2.9 - 0.3 * (i % 2)], [5.3, 2.9 - 0.3 * (i % 2)], [5.3, 2.4]],
  ];
  const zTop = 5 * gap;
  return (
    <>
      <Ground s={s} x0={-1.4} y0={-1} x1={7.4} y1={4.7} />
      <Shadow s={s} x0={0} y0={0} x1={W} y1={D} />
      {/* exploded-view guides */}
      <path d={s.route([[0, D, 0], [0, D, zTop]]) + s.route([[W, D, 0], [W, D, zTop]]) + s.route([[W, 0, 0], [W, 0, zTop]])} stroke={C.lineStrong} strokeWidth={1} strokeDasharray="2 4" fill="none" />
      {names.map((n, i) => {
        const z = i * gap;
        const plane = i === 4 || i === 2;
        return (
          <g key={n}>
            <Pcb s={s} x={0} y={0} z={z} w={W} d={D} t={0.14} top={tones[i]} holes={i === 5} outline={i === 5}>
              {plane && (
                <g transform={s.floor(0, 0, z + 0.14)}>
                  <rect x={0.35} y={0.35} width={W - 0.7} height={D - 0.7} fill={i === 4 ? C.accentSoft : C.lineStrong} opacity={0.35} />
                  <path d="M0.35 1.5H5.65M0.35 2.7H5.65M1.6 0.35V3.65M3.2 0.35V3.65M4.8 0.35V3.65" stroke={i === 4 ? C.accent : C.muted} strokeWidth={0.03} opacity={0.5} fill="none" />
                </g>
              )}
              {!plane && i !== 5 && traces(i).map((t, ti) => <path key={ti} d={s.route(t.map(([x, y]) => [x, y, z + 0.14] as P3))} stroke={C.accent} strokeWidth={1.6} fill="none" strokeLinejoin="round" opacity={0.85} />)}
              <g transform={s.floor(0, 0, z + 0.14)}>
                {vias.map(([vx, vy], vi) => (
                  <circle key={vi} cx={vx} cy={vy} r={0.17} fill={C.card} stroke={C.accentDeep} strokeWidth={0.06} />
                ))}
              </g>
            </Pcb>
            <path d={s.seg(s.proj(W, 0, z + 0.07), s.proj(W + 0.7, 0, z + 0.07))} stroke={C.muted} strokeWidth={1} />
            <Tag x={s.proj(W + 0.7, 0, z + 0.07)[0] + 4} y={s.proj(W + 0.7, 0, z + 0.07)[1]} size={12}>{n}</Tag>
          </g>
        );
      })}
      {/* vias hop between layers */}
      {vias.map(([vx, vy], vi) => (
        <path key={vi} d={Array.from({ length: 5 }, (_, i) => s.route([[vx, vy, i * gap + 0.14], [vx, vy, (i + 1) * gap]])).join("")} {...dash} strokeWidth={1.5} className="ill-dash" />
      ))}
      {/* top layer: routing + parts */}
      {traces(5).map((t, ti) => (
        <path key={ti} d={s.route(t.map(([x, y]) => [x, y, zTop + 0.14] as P3))} stroke={C.accent} strokeWidth={1.8} fill="none" strokeLinejoin="round" />
      ))}
      <path d={s.route(traces(5)[0].map(([x, y]) => [x, y, zTop + 0.14] as P3))} {...dash} stroke={C.accentDeep} className="ill-dash" strokeWidth={1.4} />
      <Chip s={s} x={4.1} y={0.7} z={zTop + 0.14} w={1.5} d={1.5} h={0.4} pins={4} />
      {[[0.9, 2.2], [1.6, 2.2], [2.3, 2.2]].map(([rx, ry], i) => (
        <Block key={i} s={s} x0={rx} y0={ry} x1={rx + 0.45} y1={ry + 0.9} z0={zTop + 0.14} z1={zTop + 0.3} top={C.card} right={C.lineStrong} front={C.line} stroke={C.lineStrong} />
      ))}
      <g transform={s.floor(0, 0, zTop + 0.14)}>
        <text x={0.95} y={0.78} fontFamily={MONO} fontSize={0.46} fill={C.muted}>TGIE-A1</text>
      </g>
      <Led s={s} x={5.4} y={3.1} z={zTop + 0.2} />
      {/* gerber output */}
      <path d={`M${s.proj(W, D, 0)[0]} ${s.proj(W, D, 0)[1]}V420H440`} {...dash} className="ill-dash" />
      <Tag x={440} y={420} tone="accent" size={13}>gerber + BOM</Tag>
    </>
  );
}

/* ------------------------------------------------------------ 2. Enclosure */
function Enclosures() {
  const s = mk(282, 166, 26, 17);
  const W = 6;
  const D = 4;
  const H = 1.7;
  const t = 0.28;
  const rim = s.poly([s.proj(0, 0, H), s.proj(W, 0, H), s.proj(W, D, H), s.proj(0, D, H)]) + s.poly([s.proj(t, t, H), s.proj(W - t, t, H), s.proj(W - t, D - t, H), s.proj(t, D - t, H)]);
  const zb = 3.2;
  return (
    <>
      <Ground s={s} x0={-1.5} y0={-1} x1={9.2} y1={5.4} />
      <Shadow s={s} x0={0} y0={0} x1={W} y1={D} />
      {/* shell: outer faces, then the open cavity */}
      <path d={s.box(0, 0, W, D, 0, H).right} fill={C.faceR} />
      <path d={s.box(0, 0, W, D, 0, H).front} fill={C.faceL} />
      <path d={s.poly([s.proj(t, t, 0.3), s.proj(W - t, t, 0.3), s.proj(W - t, D - t, 0.3), s.proj(t, D - t, 0.3)])} fill={C.faceDark} />
      <path d={s.poly([s.proj(t, t, 0.3), s.proj(t, D - t, 0.3), s.proj(t, D - t, H), s.proj(t, t, H)])} fill={C.faceR} />
      <path d={s.poly([s.proj(t, t, 0.3), s.proj(W - t, t, 0.3), s.proj(W - t, t, H), s.proj(t, t, H)])} fill={C.faceL} />
      <path d={rim} fill={C.faceTop} fillRule="evenodd" stroke={C.lineStrong} strokeLinejoin="round" />
      {/* snap-fit tabs on the front wall + USB-C cut-out on the right wall */}
      {[1.4, 4.2].map((x) => (
        <Block key={x} s={s} x0={x} y0={D} x1={x + 0.7} y1={D + 0.18} z0={H - 0.55} z1={H - 0.1} top={C.accentPale} right={C.accentSoft} front={C.accentPale} stroke={C.accent} />
      ))}
      <g transform={s.wallY(W, 0, 0)}>
        <rect x={1.4} y={0.5} width={1.2} height={0.6} rx={0.28} fill={C.ink} />
        <rect x={1.55} y={0.62} width={0.9} height={0.36} rx={0.17} fill={C.ink2} />
      </g>
      {/* the board lowers into the shell */}
      <path d={s.route([[0.5, 0.5, 1.9], [0.5, 0.5, zb]]) + s.route([[W - 0.5, 0.5, 1.9], [W - 0.5, 0.5, zb]]) + s.route([[W - 0.5, D - 0.5, 1.9], [W - 0.5, D - 0.5, zb]])} {...dash} className="ill-dash" strokeWidth={1.4} />
      <g className="ill-slide" style={{ ["--dx" as string]: "0px", ["--dy" as string]: "17px" }}>
        <Pcb s={s} x={0.5} y={0.5} z={zb} w={W - 1} d={D - 1} t={0.16}>
          <Chip s={s} x={1.2} y={1.0} z={zb + 0.16} w={1.5} d={1.5} h={0.4} pins={4} />
          <Block s={s} x0={3.4} y0={0.9} x1={4.2} y1={1.3} z0={zb + 0.16} z1={zb + 0.4} top={C.card} right={C.lineStrong} front={C.line} stroke={C.lineStrong} />
          <path d={s.route([[2.8, 1.8, zb + 0.16], [4.2, 1.8, zb + 0.16], [4.2, 2.3, zb + 0.16]])} stroke={C.accent} strokeWidth={1.6} fill="none" />
          <Led s={s} x={4.2} y={2.6} z={zb + 0.2} />
        </Pcb>
      </g>
      {/* sensor mount */}
      <Shadow s={s} x0={7.1} y0={1.1} x1={8.7} y1={2.7} />
      <Block s={s} x0={7.2} y0={1.2} x1={8.6} y1={2.6} z0={0} z1={0.35} top={C.card} stroke={C.lineStrong} />
      <Block s={s} x0={7.2} y0={1.2} x1={7.5} y1={2.6} z0={0.35} z1={2.0} top={C.card} stroke={C.lineStrong} />
      <Cyl s={s} x={8.0} y={1.9} z0={0.35} z1={1.3} r={0.5} side={C.faceR} stroke={C.accent}>
        <ellipse cx={s.proj(8.0, 1.9, 1.3)[0]} cy={s.proj(8.0, 1.9, 1.3)[1]} rx={9} ry={4.5} fill={C.ink2} />
      </Cyl>
      {/* tolerance dimensions */}
      <Dim a={s.proj(0, D + 0.8, 0)} b={s.proj(W, D + 0.8, 0)} label="62.0" off={0} />
      <Dim a={s.proj(-0.7, D, 0)} b={s.proj(-0.7, D, H)} label="17" off={-22} />
      <Tag x={20} y={346} size={13}>±0.2 mm fit</Tag>
      <Tag x={20} y={64} tone="accent" size={13}>PETG · snap-fit</Tag>
    </>
  );
}

/* ------------------------------------------------------------- 3. Firmware */
function Firmware() {
  const s = mk(166, 262, 24, 16);
  const bars: [number, number, number][] = [[0, 0.05, 0.38], [1, 0.3, 0.62], [2, 0.55, 0.9]];
  return (
    <>
      <Ground s={s} x0={-0.8} y0={-0.8} x1={5.8} y1={5.8} />
      <Shadow s={s} x0={0} y0={0} x1={5} y1={5} />
      <Pcb s={s} x={0} y={0} w={5} d={5} t={0.2}>
        <Chip s={s} x={1.4} y={1.5} z={0.2} w={2} d={2} h={0.5} pins={5} />
        <path d={s.route([[0.6, 4.2, 0.2], [2.4, 4.2, 0.2], [2.4, 3.7, 0.2]])} stroke={C.accent} strokeWidth={1.6} fill="none" />
        <path d={s.route([[4.6, 1.2, 0.2], [4.6, 2.2, 0.2], [3.9, 2.4, 0.2]])} stroke={C.accent} strokeWidth={1.6} fill="none" />
        <path d={s.route([[3.4, 0.5, 0.2], [4.2, 0.5, 0.2], [4.2, 0.9, 0.2], [3.4, 0.9, 0.2], [3.4, 1.3, 0.2], [4.2, 1.3, 0.2]])} stroke={C.accentDeep} strokeWidth={1.4} fill="none" strokeLinejoin="round" />
        <Led s={s} x={0.7} y={0.7} z={0.26} />
      </Pcb>
      <Arcs x={s.proj(4.2, 0.9, 0.3)[0]} y={s.proj(4.2, 0.9, 0.3)[1] - 8} rot={-80} r0={14} />
      <Tag x={s.proj(4.2, 0.9, 0.3)[0] - 56} y={s.proj(4.2, 0.9, 0.3)[1] - 78} size={12} tone="accent">BLE · GATT</Tag>
      {/* code card */}
      <g transform="translate(342 36)">
        <rect width={274} height={150} rx={10} fill={C.card} stroke={C.lineStrong} />
        <path d="M0 30H274" stroke={C.line} />
        {[0, 1, 2].map((i) => <circle key={i} cx={16 + i * 14} cy={15} r={4} fill={i === 0 ? C.accent : C.lineStrong} />)}
        <text x={150} y={19} fontFamily={MONO} fontSize={12} fill={C.muted} textAnchor="middle">main.c</text>
        <text x={16} y={56} fontFamily={MONO} fontSize={13} fill={C.accentDeep}>xTaskCreate(imu_task);</text>
        {[[16, 76, 96, C.ink2], [32, 96, 132, C.lineStrong], [32, 116, 80, C.lineStrong], [16, 136, 54, C.ink2]].map(([x, y, w, f], i) => (
          <rect key={i} x={x as number} y={(y as number) - 5} width={w as number} height={7} rx={3.5} fill={f as string} opacity={i % 2 ? 0.8 : 0.35} />
        ))}
      </g>
      {/* RTOS timeline */}
      <g transform="translate(342 214)">
        <rect width={274} height={176} rx={10} fill={C.card} stroke={C.lineStrong} />
        <text x={16} y={26} fontFamily={MONO} fontSize={13} fill={C.ink2}>FreeRTOS tasks</text>
        {["imu", "fuse", "ble"].map((n, i) => (
          <g key={n}>
            <text x={16} y={66 + i * 38} fontFamily={MONO} fontSize={12} fill={C.muted}>{n}</text>
            <path d={`M56 ${72 + i * 38}H258`} stroke={C.line} />
            {bars.filter(([r]) => r === i).map(([, a, b], bi) => <rect key={bi} x={56 + a * 200} y={56 + i * 38} width={(b - a) * 200} height={16} rx={4} fill={C.accent} opacity={0.35 + i * 0.25} />)}
            <rect x={56 + (0.7 - i * 0.2) * 200} y={56 + i * 38} width={34} height={16} rx={4} fill={C.accent} opacity={0.25 + i * 0.2} />
          </g>
        ))}
        <path d="M150 40V168" stroke={C.accentDeep} strokeWidth={1.6} className="ill-scan" />
        <Tag x={150} y={22} size={11} tone="ink" w={108}>0 packets lost</Tag>
      </g>
      <path d={`M${s.proj(5, 0, 0.1)[0]} ${s.proj(5, 0, 0.1)[1]}H342`} {...dash} className="ill-dash" />
    </>
  );
}

/* --------------------------------------------------------------- 4. Edge AI */
function EdgeAi() {
  const s = mk(240, 270, 24, 16);
  const cx = 78;
  const cy = 98;
  return (
    <>
      <Ground s={s} x0={-1.5} y0={-1.5} x1={5.5} y1={4.5} />
      <Shadow s={s} x0={0} y0={0} x1={4} y1={3} />
      <Pcb s={s} x={0} y={0} w={4} d={3} t={0.18} outline={false}>
        <Chip s={s} x={1.1} y={0.7} z={0.18} w={1.6} d={1.6} h={0.5} pins={4} />
        <path d={s.route([[0.5, 2.5, 0.18], [1.6, 2.5, 0.18], [1.6, 2.3, 0.18]])} stroke={C.accent} strokeWidth={1.5} fill="none" />
        <Led s={s} x={3.4} y={2.4} z={0.24} />
      </Pcb>
      {/* hologram graph above the chip */}
      <path d={`M${s.proj(1.9, 1.5, 0.7)[0]} ${s.proj(1.9, 1.5, 0.7)[1]}V170`} {...dash} className="ill-dash" />
      <g className="ill-float">
        <rect x={150} y={44} width={230} height={134} rx={10} fill={C.card} stroke={C.lineStrong} />
        <NodeGraph x={176} y={62} w={178} h={98} layers={[3, 4, 4, 2]} hot={[1, 2, 1, 0]} r={6} />
        <path d="M265 52V170" stroke={C.accent} strokeWidth={1.4} opacity={0.5} className="ill-scan" />
      </g>
      {/* inference output */}
      <g transform="translate(404 150)">
        <rect width={206} height={130} rx={10} fill={C.card} stroke={C.lineStrong} />
        <text x={14} y={24} fontFamily={MONO} fontSize={12} fill={C.muted}>inference · 4 ms</text>
        {[["walk", 0.9], ["run", 0.18], ["idle", 0.07]].map(([n, v], i) => (
          <g key={n as string}>
            <text x={14} y={56 + i * 26} fontFamily={MONO} fontSize={13} fill={C.ink2}>{n as string}</text>
            <rect x={62} y={44 + i * 26} width={130} height={11} rx={5.5} fill={C.line} />
            <rect x={62} y={44 + i * 26} width={130 * (v as number)} height={11} rx={5.5} fill={i === 0 ? C.accent : C.lineStrong} className={i === 0 ? "ill-pulse" : undefined} />
          </g>
        ))}
      </g>
      <path d="M380 111H507V150" {...dash} className="ill-dash" />
      {/* no cloud */}
      <g transform="translate(40 330)">
        <path d="M16 46a14 14 0 0 1 2-27a18 18 0 0 1 34-3a15 15 0 0 1 4 30z" fill={C.card} stroke={C.muted} strokeWidth={2} strokeLinejoin="round" />
        <path d="M2 56L68 4" stroke={C.ink} strokeWidth={3.2} strokeLinecap="round" />
      </g>
      <Tag x={120} y={364} size={13}>no cloud round-trip</Tag>
      <Tag x={cx + 270} y={cy + 232} size={12} tone="accent" w={118}>TFLite · int8</Tag>
    </>
  );
}

/* -------------------------------------------------------------- 5. Dashboards */
function Dashboards() {
  const s = mk(258, 178, 30, 28);
  const line = [[0.35, 0.8], [0.8, 1.25], [1.25, 0.95], [1.7, 1.75], [2.15, 1.45], [2.6, 2.05], [3.05, 1.75]];
  const lp = "M" + line.map(([u, v]) => `${u} ${v}`).join("L");
  return (
    <>
      <Ground s={s} x0={-1} y0={0.6} x1={8.8} y1={5.2} />
      <Shadow s={s} x0={0.2} y0={1.8} x1={5.4} y1={3.4} />
      {/* monitor stand + monitor */}
      <Block s={s} x0={1.5} y0={1.7} x1={3.9} y1={3.1} z0={0} z1={0.15} top={C.card} stroke={C.lineStrong} />
      <Block s={s} x0={2.4} y0={2.3} x1={3.0} y1={2.55} z0={0.15} z1={1.5} top={C.card} stroke={C.lineStrong} />
      <Block s={s} x0={0.2} y0={2.4} x1={5.2} y1={2.65} z0={1.4} z1={4.4} top={C.card} right={C.ink} front={C.ink2} stroke={C.ink} />
      <g transform={s.wallX(0.35, 2.65, 1.55)}>
        <rect width={4.7} height={2.7} rx={0.08} fill={C.card} />
        {[0.65, 1.15, 1.65, 2.15].map((v) => <path key={v} d={`M0.3 ${v}H3.3`} stroke={C.line} strokeWidth={0.03} />)}
        <path d={`${lp}L3.05 0.65L0.35 0.65Z`} fill={C.accent} opacity={0.14} />
        <path d={lp} fill="none" stroke={C.accent} strokeWidth={0.07} strokeLinejoin="round" strokeLinecap="round" />
        <path d={lp} fill="none" stroke={C.accentDeep} strokeWidth={0.04} strokeDasharray="0.2 0.2" className="ill-dash" />
        <circle cx={3.05} cy={1.75} r={0.1} fill={C.accentDeep} className="ill-blink" />
        {[0.2, 0.35].map((u, i) => <circle key={i} cx={u} cy={2.5} r={0.05} fill={i ? C.lineStrong : C.accent} />)}
        <rect x={3.55} y={1.5} width={0.95} height={0.9} rx={0.1} fill={C.accentPale} stroke={C.accentSoft} strokeWidth={0.03} />
        <path d="M3.75 1.85L4.0 1.95L4.2 1.7L4.35 1.8" fill="none" stroke={C.accentDeep} strokeWidth={0.06} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3.75 2.2H4.3" stroke={C.accentDeep} strokeWidth={0.06} strokeLinecap="round" />
        <rect x={3.55} y={0.35} width={0.95} height={0.95} rx={0.1} fill={C.card} stroke={C.line} strokeWidth={0.03} />
        {[0.5, 0.8, 0.6, 0.95].map((h, i) => (
          <rect key={i} className="ill-grow" style={{ animationDelay: `${i * 0.5}s` }} x={3.7 + i * 0.2} y={0.45} width={0.12} height={h * 0.7} rx={0.03} fill={i === 3 ? C.accent : C.lineStrong} />
        ))}
      </g>
      {/* phone */}
      <Shadow s={s} x0={6.1} y0={2.3} x1={7.7} y1={3.1} />
      <Block s={s} x0={6.2} y0={2.5} x1={7.6} y1={2.65} z0={0} z1={2.8} top={C.card} right={C.ink} front={C.ink2} stroke={C.ink} />
      <g transform={s.wallX(6.28, 2.65, 0.14)}>
        <rect width={1.24} height={2.52} rx={0.1} fill={C.card} />
        <circle cx={0.62} cy={1.8} r={0.34} fill="none" stroke={C.line} strokeWidth={0.1} />
        <circle cx={0.62} cy={1.8} r={0.34} fill="none" stroke={C.accent} strokeWidth={0.1} strokeDasharray="1.2 1" strokeLinecap="round" className="ill-pulse" />
        <path d="M0.15 1.0L0.4 0.7L0.65 0.9L0.9 0.45L1.1 0.6" fill="none" stroke={C.accent} strokeWidth={0.07} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M0.2 2.35H1.04" stroke={C.lineStrong} strokeWidth={0.07} strokeLinecap="round" />
      </g>
      {/* sensor puck streaming to both screens */}
      <Shadow s={s} x0={2.9} y0={3.5} x1={4.7} y1={4.7} />
      <Block s={s} x0={3.0} y0={3.6} x1={4.6} y1={4.6} z0={0} z1={0.35} top={C.card} stroke={C.accentSoft} />
      <Led s={s} x={3.4} y={4.1} z={0.4} />
      <Arcs x={s.proj(4.1, 4.1, 0.4)[0] + 14} y={s.proj(4.1, 4.1, 0.4)[1] - 6} rot={-20} n={2} r0={12} gap={9} />
      <path d={s.route([[3.8, 3.6, 0.1], [3.8, 3.15, 0.1]]) + s.route([[4.6, 4.1, 0.1], [6.9, 4.1, 0.1], [6.9, 2.9, 0.1]])} {...dash} className="ill-dash" />
      <Tag x={40} y={428} size={13} tone="accent">live · 128 Hz</Tag>
      <Tag x={192} y={428} size={13}>python · web</Tag>
    </>
  );
}

/* --------------------------------------------------------- 6. Small batch */
function SmallBatch() {
  const s = mk(226, 190, 30, 26);
  const gx = 5.45;
  return (
    <>
      <Ground s={s} x0={-0.9} y0={-1} x1={9.9} y1={3.9} />
      <Shadow s={s} x0={0} y0={0} x1={7.4} y1={2.9} />
      <Block s={s} x0={0} y0={0} x1={7.4} y1={2.9} z0={0} z1={0.3} top={C.card} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      {Array.from({ length: 7 }, (_, i) => {
        const x = 0.25 + i * 1.04;
        return i < 5 ? (
          <Pcb key={i} s={s} x={x} y={0.4} z={0.3} w={0.78} d={2.1} t={0.1} holes={false} outline={false}>
            <Chip s={s} x={x + 0.14} y={0.8} z={0.4} w={0.5} d={0.5} h={0.18} pins={2} accent={false} />
            <Block s={s} x0={x + 0.24} y0={1.6} x1={x + 0.54} y1={1.9} z0={0.4} z1={0.5} top={C.card} stroke={C.lineStrong} />
            <Led s={s} x={x + 0.39} y={0.6} z={0.46} delay={i * 0.3} />
          </Pcb>
        ) : (
          <g key={i} transform={s.floor(0, 0, 0.3)}>
            <rect x={x} y={0.4} width={0.78} height={2.1} rx={0.08} fill={C.accentPale} stroke={C.accent} strokeWidth={0.04} strokeDasharray="0.14 0.12" opacity={0.8} />
          </g>
        );
      })}
      {/* pick-and-place gantry: slides along the tray, a board hangs from the nozzle */}
      <g className="ill-slide" style={{ ["--dx" as string]: "31px", ["--dy" as string]: "15px" }}>
        <path d={s.route([[gx, -0.5, 0.3], [gx, -0.5, 3.6], [gx, 1.45, 3.6]])} stroke={C.ink2} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d={s.route([[gx + 0.44, 1.45, 3.6], [gx + 0.44, 1.45, 2.1]])} stroke={C.ink2} strokeWidth={1.8} />
        <Block s={s} x0={gx + 0.1} y0={1.1} x1={gx + 0.8} y1={1.8} z0={3.4} z1={3.9} top={C.card} right={C.faceDark} front={C.faceL} stroke={C.accentDeep} />
        <Pcb s={s} x={gx} y={0.75} z={1.9} w={0.88} d={1.4} t={0.1} holes={false} outline={false}>
          <Chip s={s} x={gx + 0.17} y={1.1} z={2.0} w={0.5} d={0.5} h={0.16} pins={2} accent={false} />
        </Pcb>
      </g>
      {/* functional test jig */}
      <Shadow s={s} x0={8.0} y0={0.5} x1={9.5} y1={2.3} />
      <Block s={s} x0={8.1} y0={0.6} x1={9.4} y1={2.2} z0={0} z1={0.5} top={C.card} stroke={C.lineStrong} />
      <path d={s.route([[8.5, 0.9, 0.5], [8.5, 0.9, 1.9], [9.1, 0.9, 1.9], [9.1, 0.9, 1.0]]) + s.route([[8.8, 0.9, 1.9], [8.8, 0.9, 1.0]])} stroke={C.muted} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      <path d={s.route([[7.5, 1.4, 0.3], [8.1, 1.4, 0.3]])} {...dash} className="ill-dash" />
      <Tag x={s.proj(9.4, 1.4, 0.5)[0] - 10} y={s.proj(9.4, 1.4, 0.5)[1] + 42} size={12} tone="ink">PASS</Tag>
      {/* count badge */}
      <g transform="translate(36 40)">
        <rect width={176} height={88} rx={12} fill={C.card} stroke={C.lineStrong} />
        <text x={18} y={28} fontFamily={MONO} fontSize={12} fill={C.muted}>batch 03 · units</text>
        <text x={18} y={58} fontFamily={MONO} fontSize={24} fill={C.ink}>12<tspan fill={C.muted}> / 20</tspan></text>
        <rect x={18} y={68} width={140} height={8} rx={4} fill={C.line} />
        <rect x={18} y={68} width={84} height={8} rx={4} fill={C.accent} />
      </g>
    </>
  );
}

export const engineeringArt: Record<string, () => ReactNode> = {
  "custom-pcb-design": () => <SceneFrame><PcbDesign /></SceneFrame>,
  "3d-enclosures": () => <SceneFrame><Enclosures /></SceneFrame>,
  "embedded-firmware": () => <SceneFrame><Firmware /></SceneFrame>,
  "edge-ai-tinyml": () => <SceneFrame><EdgeAi /></SceneFrame>,
  "data-dashboards": () => <SceneFrame><Dashboards /></SceneFrame>,
  "small-batch-production": () => <SceneFrame><SmallBatch /></SceneFrame>,
};
