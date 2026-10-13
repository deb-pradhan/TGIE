import { C, IsoBox, type Pt } from "../kit";
import { Fig, NS, Txt } from "./Fig";
import { iso } from "./geo";

/**
 * Edge AI — isometric register.
 * A microcontroller feeding a tiny neural-net node graph above it, and a
 * floating inference card (gauge + class confidence bars) beside the board.
 */
const g = iso(116, 100, 25, 17);
const { box, proj } = g;

const PLANE_Y = 2.0;
const layers: { x: number; zs: number[] }[] = [
  { x: 1.2, zs: [2.9, 3.7, 4.5] },
  { x: 2.5, zs: [2.5, 3.3, 4.1, 4.9] },
  { x: 3.8, zs: [3.3, 4.1] },
];
const node = (x: number, z: number) => proj(x, PLANE_Y, z);
const hot: [number, number][] = [[0, 1], [1, 2], [2, 0]]; // layer, index of the active path
const links: { a: Pt; b: Pt; on: boolean }[] = [];
for (let l = 0; l < layers.length - 1; l++)
  layers[l].zs.forEach((za, ia) =>
    layers[l + 1].zs.forEach((zb, ib) =>
      links.push({
        a: node(layers[l].x, za),
        b: node(layers[l + 1].x, zb),
        on: hot[l][1] === ia && hot[l + 1][1] === ib,
      }),
    ),
  );

// gauge (upper semicircle in the card plane)
const GC: [number, number] = [6.6, 2.35];
const GR = 0.85;
const gpt = (f: number): [number, number] => [GC[0] - GR * Math.cos(Math.PI * f), GC[1] - GR * Math.sin(Math.PI * f)];
const arc = (f: number) => {
  const [x0, y0] = gpt(0);
  const [x1, y1] = gpt(f);
  return `M${x0} ${y0} A${GR} ${GR} 0 0 1 ${x1.toFixed(3)} ${y1.toFixed(3)}`;
};

const pins = Array.from({ length: 5 }, (_, i) => i);
const bars: [string, number, string][] = [
  ["walk", 0.92, C.teal],
  ["stand", 0.06, C.tealSoft],
  ["fall", 0.02, C.lineStrong],
];

export function CapEdgeAI() {
  const beamA = proj(2.5, PLANE_Y, 0.4);
  const beamB = proj(2.5, PLANE_Y, 2.15);
  const p0 = proj(3.5, 2.0, 0.2);
  const p1 = proj(5.0, 2.0, 0.2);
  const p2 = proj(5.0, 0.0, 0.2);
  const p3 = proj(5.45, 0.0, 0.6);
  return (
    <Fig viewBox="14 14 372 234" bg="bg-card-soft">
      <ellipse cx="140" cy="208" rx="100" ry="13" fill={C.ink} opacity="0.05" />
      <IsoBox faces={box(0, 0, 5, 4, -0.3, 0)} stroke={C.lineStrong} />
      <g className="ill-ns" transform={g.top(0)}>
        {Array.from({ length: 4 }, (_, i) => (
          <path key={`gx${i}`} d={`M${i + 1} 0 V4`} stroke={C.line} strokeWidth=".7" {...NS} />
        ))}
        {Array.from({ length: 3 }, (_, i) => (
          <path key={`gy${i}`} d={`M0 ${i + 1} H5`} stroke={C.line} strokeWidth=".7" {...NS} />
        ))}
        <g fill="none" stroke={C.tealSoft} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...NS}>
          <path d="M0.85 0.85 V1.9 H1.45" />
          <path d="M4.15 0.85 V1.9 H3.55" />
          <path d="M2.0 2.95 V3.5 H0.7" />
          <path d="M3.0 2.95 V3.5 H4.3" />
        </g>
        {[[0.35, 0.35], [4.65, 0.35], [0.35, 3.65], [4.65, 3.65]].map(([x, y]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r="0.15" fill={C.paper2} stroke={C.lineStrong} strokeWidth="1" {...NS} />
        ))}
        <g fill={C.lineStrong}>
          {pins.map((i) => (
            <g key={i}>
              <rect x="1.4" y={1.35 + i * 0.28} width="0.32" height="0.13" />
              <rect x="3.28" y={1.35 + i * 0.28} width="0.32" height="0.13" />
              <rect x={1.75 + i * 0.28} y="2.78" width="0.13" height="0.32" />
              <rect x={1.75 + i * 0.28} y="0.9" width="0.13" height="0.32" />
            </g>
          ))}
        </g>
        <circle cx="1.0" cy="3.35" r="0.16" fill={C.teal} className="ill-blink" />
      </g>
      {/* IMU sensors feeding the chip */}
      <IsoBox faces={box(0.5, 0.5, 1.2, 1.2, 0, 0.2)} top={C.mint} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <IsoBox faces={box(3.8, 0.5, 4.5, 1.2, 0, 0.2)} top={C.mint} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />

      {/* MCU */}
      <IsoBox faces={box(1.7, 1.2, 3.3, 2.8, 0, 0.4)} top={C.ink2} right={C.ink} front="#2a2924" stroke={C.ink} />
      <g className="ill-ns" transform={g.top(0.4)}>
        <circle cx="1.95" cy="1.45" r="0.09" fill={C.teal} />
        <Txt x={2.5} y={2.15} size={0.46} fill="#fff" anchor="middle">
          ML
        </Txt>
      </g>

      {/* chip -> net beam */}
      <path d={`M${beamA[0]} ${beamA[1]} L${beamB[0]} ${beamB[1]}`} stroke={C.teal} strokeWidth="1.6" strokeDasharray="4 4" className="ill-dash" />

      {/* neural net on a glass plane */}
      <g className="ill-float">
        <path
          d={g.poly([proj(0.55, PLANE_Y, 5.3), proj(4.45, PLANE_Y, 5.3), proj(4.45, PLANE_Y, 2.15), proj(0.55, PLANE_Y, 2.15)])}
          fill="#fff"
          fillOpacity=".75"
          stroke={C.lineStrong}
          strokeWidth="1"
        />
        {links.map((l, i) => (
          <path key={i} d={g.seg(l.a, l.b)} stroke={l.on ? C.teal : C.tealSoft} strokeWidth={l.on ? 1.8 : 0.8} strokeOpacity={l.on ? 1 : 0.7} strokeDasharray={l.on ? "4 3" : undefined} className={l.on ? "ill-dash" : undefined} />
        ))}
        {layers.map((ly, li) =>
          ly.zs.map((z, ni) => {
            const [x, y] = node(ly.x, z);
            const on = hot[li][1] === ni;
            return <circle key={`${li}${ni}`} cx={x} cy={y} r="4" fill={on ? C.teal : "#fff"} stroke={C.teal} strokeWidth="1.5" />;
          }),
        )}
      </g>

      {/* output signal to the card */}
      <path d={`M${p0[0]} ${p0[1]} L${p1[0]} ${p1[1]} L${p2[0]} ${p2[1]} L${p3[0]} ${p3[1]}`} fill="none" stroke={C.teal} strokeWidth="1.6" strokeDasharray="4 4" className="ill-dash" />

      {/* inference card */}
      <g className="ill-float-2">
        <g className="ill-ns" transform={g.front(0, 3.7)}>
          <rect x="5.4" y="0" width="4.4" height="3.2" rx="0.16" fill="#fff" stroke={C.lineStrong} strokeWidth="1" {...NS} />
          <Txt x={5.65} y={0.52} size={0.27} fill={C.muted} ls={0.05}>
            INFERENCE
          </Txt>
          <Txt x={9.55} y={0.52} size={0.27} fill={C.tealDeep} anchor="end">
            3.1 ms
          </Txt>
          <path d={arc(1)} fill="none" stroke="#e7edea" strokeWidth="6" strokeLinecap="round" {...NS} />
          <path d={arc(0.92)} fill="none" stroke={C.teal} strokeWidth="6" strokeLinecap="round" {...NS} />
          <Txt x={GC[0]} y={GC[1] - 0.12} size={0.52} fill={C.ink} anchor="middle">
            92%
          </Txt>
          <Txt x={GC[0]} y={GC[1] + 0.32} size={0.25} fill={C.muted} anchor="middle" mono={false}>
            confidence
          </Txt>
          {bars.map(([t, v, fill], i) => (
            <g key={t}>
              <Txt x={7.9} y={1.28 + i * 0.58} size={0.24} fill={C.ink2} mono={false}>
                {t}
              </Txt>
              <rect x="8.65" y={1.12 + i * 0.58} width="1.0" height="0.18" rx="0.05" fill="#e7edea" />
              <rect x="8.65" y={1.12 + i * 0.58} width={Math.max(0.05, v)} height="0.18" rx="0.05" fill={fill} />
            </g>
          ))}
        </g>
      </g>
    </Fig>
  );
}
