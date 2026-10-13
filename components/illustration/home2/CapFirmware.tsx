import { C, IsoBox } from "../kit";
import { Fig, NS, Txt } from "./Fig";
import { iso } from "./geo";

/**
 * Firmware & silicon — isometric register.
 * MCU package with pin rows on a dev board, an analogue + clock waveform
 * running off its pins, and a floating RTOS task-timeline strip.
 */
const g = iso(178, 80, 24, 16);
const { box, proj } = g;

const sine = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    pts.push(`${(5.1 + t * 1.7).toFixed(2)} ${(2.0 + 0.3 * Math.sin(t * Math.PI * 5) * (1 - 0.35 * t)).toFixed(2)}`);
  }
  return "M" + pts.join(" L");
})();
const square = (() => {
  let d = "M5.1 3.1";
  for (let x = 5.1, hi = false; x < 6.8; x += 0.28, hi = !hi) d += ` H${(x + 0.28).toFixed(2)} V${hi ? 3.1 : 2.8}`;
  return d;
})();

const rowY = (i: number) => 1.55 + i * 0.28;
const rowX = (i: number) => 2.55 + i * 0.28;
const pins = Array.from({ length: 7 }, (_, i) => i);

const laneY = [0.82, 1.27, 1.72];
const blocks: [number, number, number][] = [
  [0, 1.6, 0.6], [0, 2.9, 0.6], [0, 4.2, 0.6], [0, 5.5, 0.5],
  [1, 2.2, 0.95], [1, 3.9, 0.95], [1, 5.3, 0.7],
  [2, 1.9, 0.45], [2, 3.2, 0.45], [2, 4.7, 0.45],
];
const laneFill = [C.teal, C.tealSoft, C.lineStrong];

export function CapFirmware() {
  const cur0 = 2.1;
  const ca = proj(cur0, 0, 2.6 - 0.66);
  const cb = proj(cur0, 0, 2.6 - 1.98);
  return (
    <Fig viewBox="14 14 372 234" bg="bg-card-soft">
      {/* ground shadow + dev board */}
      <ellipse cx="196" cy="222" rx="118" ry="14" fill={C.ink} opacity="0.05" />
      <IsoBox faces={box(0, 0, 7, 5, -0.3, 0)} stroke={C.lineStrong} />
      <g className="ill-ns" transform={g.top(0)}>
        {Array.from({ length: 6 }, (_, i) => (
          <path key={`gx${i}`} d={`M${i + 1} 0 V5`} stroke={C.line} strokeWidth=".7" {...NS} />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <path key={`gy${i}`} d={`M0 ${i + 1} H7`} stroke={C.line} strokeWidth=".7" {...NS} />
        ))}
        {[[0.42, 0.42], [6.58, 0.42], [0.42, 4.58], [6.58, 4.58]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="0.17" fill={C.paper2} stroke={C.lineStrong} strokeWidth="1" {...NS} />
        ))}
        {/* traces */}
        <g fill="none" stroke={C.tealSoft} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...NS}>
          <path d="M1.95 1.83 H1.4 V1.1 H0.9" />
          <path d="M1.95 2.39 H1.2" />
          <path d="M1.95 2.95 H1.4 V3.7 H0.95" />
          <path d="M2.83 3.85 V4.45 H4.4" />
          <path d="M3.67 3.85 V4.3 H5.6 V3.6" />
          <path d="M4.85 1.83 H5.5 V1.0 H6.5" />
          <path d="M4.85 2.11 H5.1" />
          <path d="M4.85 2.95 H5.1" />
          <path d="M3.1 0.95 V0.4 H4.8" />
        </g>
        {/* LED + pads */}
        <circle cx="0.95" cy="3.7" r="0.2" fill={C.teal} className="ill-blink" />
        <circle cx="0.95" cy="1.1" r="0.13" fill={C.paper} stroke={C.lineStrong} strokeWidth="1" {...NS} />
        <rect x="6.3" y="3.55" width="0.5" height="0.5" rx="0.06" fill={C.faceR} />
        <rect x="6.3" y="4.25" width="0.5" height="0.5" rx="0.06" fill={C.faceR} />
        {/* pin rows (lie flat, chip sits on top) */}
        <g fill={C.lineStrong}>
          {pins.map((i) => (
            <g key={i}>
              <rect x="4.5" y={rowY(i) - 0.07} width="0.38" height="0.14" />
              <rect x="1.92" y={rowY(i) - 0.07} width="0.38" height="0.14" />
              <rect x={rowX(i) - 0.07} y="3.5" width="0.14" height="0.38" />
              <rect x={rowX(i) - 0.07} y="0.92" width="0.14" height="0.38" />
            </g>
          ))}
        </g>
        {/* signals */}
        <path d={sine} fill="none" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeDasharray="6 4" className="ill-dash" {...NS} />
        <path d={square} fill="none" stroke={C.tealDeep} strokeWidth="1.8" strokeLinejoin="miter" opacity="0.8" {...NS} />
      </g>

      {/* crystal + caps */}
      <IsoBox faces={box(0.75, 2.0, 1.5, 2.75, 0, 0.22)} top={C.paper} right={C.lineStrong} front={C.faceDark} />
      <IsoBox faces={box(5.3, 3.9, 5.7, 4.3, 0, 0.14)} top={C.paper} right={C.lineStrong} front={C.faceDark} />

      {/* MCU package */}
      <IsoBox faces={box(2.3, 1.3, 4.5, 3.5, 0, 0.5)} top={C.ink2} right={C.ink} front="#2a2924" stroke={C.ink} />
      <g className="ill-ns" transform={g.top(0.5)}>
        <rect x="2.5" y="1.5" width="1.8" height="1.8" rx="0.08" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="1" {...NS} />
        <circle cx="2.7" cy="1.7" r="0.1" fill={C.teal} />
        <Txt x={3.4} y={2.5} size={0.5} fill="#fff" anchor="middle" ls={0.04}>
          MCU
        </Txt>
        <Txt x={3.4} y={3.05} size={0.24} fill="#fff" anchor="middle">
          ARM · 32-BIT
        </Txt>
      </g>

      {/* floating RTOS timeline panel standing on the back edge */}
      <g className="ill-float-2">
        <g className="ill-ns" transform={g.front(0, 2.7)}>
          <rect x="0.6" y="0" width="5.8" height="2.25" rx="0.14" fill="#fff" stroke={C.lineStrong} strokeWidth="1" {...NS} />
          <Txt x={0.9} y={0.42} size={0.27} fill={C.muted} ls={0.05}>
            RTOS TASKS
          </Txt>
          <circle cx="6.05" cy="0.34" r="0.09" fill={C.teal} className="ill-pulse" />
          {["ADC", "BLE", "UI"].map((t, i) => (
            <g key={t}>
              <Txt x={0.9} y={laneY[i] + 0.22} size={0.22} fill={C.ink2}>
                {t}
              </Txt>
              <rect x="1.5" y={laneY[i]} width="4.7" height="0.28" rx="0.05" fill={C.soft} stroke={C.line} strokeWidth="1" {...NS} />
            </g>
          ))}
          {blocks.map(([l, x, w], i) => (
            <rect key={i} x={x} y={laneY[l] + 0.03} width={w} height="0.22" rx="0.04" fill={laneFill[l]} />
          ))}
        </g>
        <g className="ill-slide" style={{ "--dx": "66px", "--dy": "33px" } as React.CSSProperties}>
          <path d={`M${ca[0]} ${ca[1]} L${cb[0]} ${cb[1]}`} stroke={C.tealDeep} strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    </Fig>
  );
}
