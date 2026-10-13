import type { ReactNode } from "react";
import { C, SceneFrame } from "../kit";
import { Chip, Coins, Dash, Dots, Fit, Lines, Mat, Person, Shadow, Slab, STAR, Tick, gearPath, mkIso, mono } from "./_shared2/parts";

/** Sub-service illustrations for the "enablement" pillar, keyed by sub slug. */

/* ------------------------------------------------------------------ branding-marketing */
function BrandingMarketing() {
  const iso = mkIso(330, 170, 22, 15);
  const [lx, ly] = iso.proj(5.5, 4.6, 0.9);
  const swatches = [C.graphite, C.accentDeep, C.accent, C.accentSoft, C.accentPale, C.paper];
  return (
    <SceneFrame ground>
      <Fit s={1.25} dx={-26}>
      <Mat iso={iso} w={10} d={9} />
      {/* connectors on the mat */}
      <Dash d={iso.seg(iso.proj(1.2, 4.6, 0), iso.proj(3.4, 4.6, 0))} />
      <Dash d={iso.seg(iso.proj(7.6, 4.6, 0), iso.proj(9.2, 4.6, 0))} />

      {/* brand guidelines card (left wall) */}
      <Slab iso={iso} b={[0.5, 1, 0.8, 6.5, 0, 6]} right={C.card} front={C.faceL} />
      <g transform={iso.wallR(0.8, 6.5, 6)}>
        <rect x={7} y={7} width={36} height={22} rx={3} fill={C.accentPale} />
        <text x={13} y={25} fontSize={19} fill={C.accentDeep} style={mono}>Aa</text>
        <rect x={50} y={7} width={22} height={22} rx={5} fill={C.accentDeep} />
        <path d="M55 13h12M61 13v11" stroke="#fff" strokeWidth={3} strokeLinecap="round" />
        <Lines x={80} y={9} widths={[32, 24, 28]} gap={7} />
        <Lines x={7} y={38} widths={[100, 78, 90]} gap={7} />
        {[C.graphite, C.accentDeep, C.accent, C.accentSoft, C.accentPale].map((f, i) => (
          <rect key={i} x={7 + i * 21} y={64} width={18} height={18} rx={3} fill={f} stroke={C.lineStrong} strokeWidth={0.6} />
        ))}
        <rect x={7} y={87} width={100} height={1.6} fill={C.line} />
      </g>

      {/* hero: logo construction tile */}
      <Slab iso={iso} b={[3.6, 2.8, 7.4, 6.4, 0, 0.9]} />
      <g transform={iso.flat(3.6, 2.8, 0.9)} fill="none" stroke={C.accentSoft} strokeWidth={1}>
        <rect x={10} y={10} width={59} height={59} rx={6} stroke={C.line} strokeWidth={1.2} />
        <circle cx={39.5} cy={39.5} r={24} />
        <circle cx={39.5} cy={39.5} r={11} strokeDasharray="3 3" />
        <path d="M39.5 4v71M4 39.5h71" stroke={C.line} />
        <path d="M18 18L61 61M61 18L18 61" stroke={C.line} strokeDasharray="2 3" />
      </g>
      <Shadow x={lx} y={ly + 2} rx={22} o={0.14} />
      {/* floating finished mark */}
      <g className="ill-float">
        <g transform={`translate(${lx} ${ly - 62})`}>
          <path d="M-26 0 L0 -15 L26 0 L26 28 L0 43 L-26 28 Z" fill={C.accentDeep} />
          <path d="M-26 0 L0 -15 L26 0 L0 15 Z" fill={C.accent} />
          <path d="M-26 0 L0 15 L0 43 L-26 28 Z" fill={C.accentDeep} />
          <path d="M-13 -1 L13 -1 M0 -1 L0 22" stroke="#fff" strokeWidth={5} strokeLinecap="round" transform="translate(0 6)" />
        </g>
      </g>
      <Dots className="ill-blink" pts={[[lx - 44, ly - 82], [lx + 46, ly - 70], [lx + 36, ly - 100], [lx - 38, ly - 52]]} s={3} fill={C.accentSoft} />

      {/* colour swatches (front edge) */}
      {swatches.map((f, i) => (
        <Slab key={i} iso={iso} b={[1.6 + i * 1.4, 7.2, 2.75 + i * 1.4, 8.4, 0, 0.45 + (i % 3) * 0.25]} top={f} right={C.faceDark} front={f} stroke={C.lineStrong} />
      ))}
      <Chip x={iso.proj(2.2, 8.4, 1.2)[0] - 8} y={iso.proj(2.2, 8.4, 1.2)[1] + 6} label="#E2561F" size={12} tone="accentPale" />

      {/* product listing card (right wall) */}
      <Slab iso={iso} b={[9.4, 1, 9.7, 5.5, 0, 7]} right={C.card} front={C.faceL} />
      <g transform={iso.wallR(9.7, 5.5, 7)}>
        <rect x={7} y={7} width={85} height={46} rx={4} fill={C.accentPale} />
        <path d="M49.5 12 L64 20 L49.5 28 L35 20Z" fill={C.card} stroke={C.accentDeep} strokeWidth={1.2} strokeLinejoin="round" />
        <path d="M35 20 L49.5 28 L49.5 44 L35 36Z" fill={C.faceL} stroke={C.accentDeep} strokeWidth={1.2} strokeLinejoin="round" />
        <path d="M49.5 28 L64 20 L64 36 L49.5 44Z" fill={C.faceR} stroke={C.accentDeep} strokeWidth={1.2} strokeLinejoin="round" />
        <rect x={7} y={60} width={62} height={4.5} rx={2} fill={C.ink2} />
        <rect x={7} y={69} width={40} height={3} rx={1.5} fill={C.line} />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={STAR} transform={`translate(${14 + i * 12} 83) scale(.9)`} fill={i < 4 ? C.accent : C.line} className={i === 3 ? "ill-pulse" : undefined} />
        ))}
        <rect x={7} y={93} width={85} height={11} rx={5.5} fill={C.accentDeep} />
        <rect x={32} y={97.5} width={35} height={2.6} rx={1.3} fill="#fff" />
      </g>
      <Chip x={iso.proj(9.7, 1, 7)[0] - 4} y={iso.proj(9.7, 1, 7)[1] - 16} label="4.8 / 5" size={12} tone="white" />
      </Fit>
    </SceneFrame>
  );
}


/* ------------------------------------------------------------------ incorporation */
function Incorporation() {
  const iso = mkIso(330, 165, 22, 15);
  const [sx, sy] = iso.proj(2.0 + 84 / 22, 4.4 + 66 / 22, 0.25);
  const wins = [0, 1, 2, 3];
  return (
    <SceneFrame ground>
      <Fit s={1.25} dx={-26}>
        <Mat iso={iso} w={10} d={9} />

        {/* checklist wall (left) */}
        <Slab iso={iso} b={[0.5, 0.8, 0.8, 5.0, 0, 5.2]} right={C.card} front={C.faceL} />
        <g transform={iso.wallR(0.8, 5.0, 5.2)}>
          <rect x={8} y={7} width={40} height={4} rx={2} fill={C.ink2} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={8} y={20 + i * 14} width={10} height={10} rx={3} fill={i < 3 ? C.accentPale : "none"} stroke={i < 3 ? C.accent : C.lineStrong} strokeWidth={1.2} strokeDasharray={i < 3 ? undefined : "2 2"} />
              {i < 3 && <Tick x={13} y={25.5 + i * 14} s={0.9} w={2} />}
              <rect x={24} y={23 + i * 14} width={[52, 40, 58, 34][i]} height={3} rx={1.5} fill={i < 3 ? C.line : C.lineStrong} />
            </g>
          ))}
        </g>

        {/* office building (back right) */}
        <Slab iso={iso} b={[6.9, 0.9, 9.3, 3.3, 0, 5.4]} />
        <Slab iso={iso} b={[7.5, 1.5, 8.7, 2.7, 5.4, 6.1]} top={C.accentPale} right={C.accentSoft} front={C.accentPale} stroke={C.accentSoft} />
        <g transform={iso.wallF(6.9, 3.3, 5.4)}>
          {wins.map((j) =>
            [0, 1, 2].map((i) => (
              <rect key={`${i}${j}`} x={6 + i * 15} y={6 + j * 16} width={10} height={9} rx={1.5} fill={(i + j) % 4 === 1 ? C.accent : C.accentPale} stroke={C.accentSoft} strokeWidth={0.8} className={i === 2 && j === 1 ? "ill-blink" : undefined} />
            )),
          )}
          <rect x={19} y={70} width={14} height={11} rx={1.5} fill={C.accentDeep} />
        </g>
        <g transform={iso.wallR(9.3, 3.3, 5.4)}>
          {wins.map((j) =>
            [0, 1, 2].map((i) => (
              <rect key={`${i}${j}`} x={6 + i * 15} y={6 + j * 16} width={10} height={9} rx={1.5} fill={C.accentPale} stroke={C.accentSoft} strokeWidth={0.8} />
            )),
          )}
        </g>
        {/* flag */}
        <path d={`M${iso.proj(8.1, 2.1, 6.1)[0]} ${iso.proj(8.1, 2.1, 6.1)[1]} v-30`} stroke={C.ink2} strokeWidth={1.6} />
        <path className="ill-float-2" d={`M${iso.proj(8.1, 2.1, 6.1)[0]} ${iso.proj(8.1, 2.1, 6.1)[1] - 30} l20 5 l-20 6z`} fill={C.accent} />

        {/* route doc -> building */}
        <Dash d={`M${iso.proj(6.9, 5.8, 0).join(" ")} L${iso.proj(8.1, 5.8, 0).join(" ")} L${iso.proj(8.1, 3.5, 0).join(" ")}`} />

        {/* hero: certificate of incorporation */}
        <Slab iso={iso} b={[2.0, 4.4, 7.0, 8.8, 0, 0.25]} />
        <g transform={iso.flat(2.0, 4.4, 0.25)}>
          <rect x={5} y={5} width={100} height={87} rx={3} fill="none" stroke={C.accentSoft} strokeWidth={1.2} />
          <rect x={5} y={5} width={100} height={87} rx={3} fill="none" stroke={C.line} strokeWidth={4} opacity={0.6} transform="translate(0 0)" />
          <rect x={30} y={13} width={50} height={6} rx={3} fill={C.accentDeep} />
          <rect x={38} y={24} width={34} height={3} rx={1.5} fill={C.lineStrong} />
          <rect x={22} y={34} width={66} height={4.5} rx={2} fill={C.ink2} />
          <rect x={30} y={43} width={50} height={3} rx={1.5} fill={C.line} />
          <rect x={14} y={54} width={44} height={3} rx={1.5} fill={C.line} />
          <rect x={14} y={61} width={36} height={3} rx={1.5} fill={C.line} />
          <path d="M14 82 q6 -10 11 -2 t10 -3 t9 1" fill="none" stroke={C.accentDeep} strokeWidth={1.6} strokeLinecap="round" />
          <circle cx={84} cy={66} r={14} fill={C.accentPale} stroke={C.accent} strokeWidth={2} />
          <circle cx={84} cy={66} r={10} fill="none" stroke={C.accentSoft} strokeWidth={1} strokeDasharray="2 2" />
          <path d={STAR} transform="translate(84 66) scale(1.15)" fill={C.accent} />
        </g>
        {/* floating rubber stamp */}
        <ellipse cx={sx} cy={sy + 1} rx={14} ry={7} fill={C.ink} opacity={0.12} />
        <g className="ill-float">
          <g transform={`translate(${sx} ${sy - 34})`}>
            <path d="M-17 0 v-8 a17 8.5 0 0 1 34 0 v8 a17 8.5 0 0 1 -34 0z" fill={C.accentDeep} />
            <ellipse cx={0} cy={-8} rx={17} ry={8.5} fill={C.accent} />
            <path d="M-6 -8 v-16 h12 v16" fill={C.accentDeep} />
            <ellipse cx={0} cy={-26} rx={9} ry={5} fill={C.accentSoft} stroke={C.accentDeep} strokeWidth={1.2} />
            <path d="M-6 -8 v-16" stroke={C.accentDeep} strokeWidth={1.2} />
          </g>
        </g>

        {/* jurisdictions */}
        {(
          [
            ["India", 8.0, 8.6, "accentPale"],
            ["UAE", 9.0, 7.6, "white"],
            ["USA", 10.0, 6.6, "accentPale"],
          ] as const
        ).map(([l, x, y, t]) => (
          <Chip key={l} x={iso.proj(x, y, 0.4)[0]} y={iso.proj(x, y, 0.4)[1]} label={l} size={12} tone={t} />
        ))}
      </Fit>
    </SceneFrame>
  );
}

/* ------------------------------------------------------------------ funding-investor-access */
function Funding() {
  const iso = mkIso(300, 170, 22, 15);
  const tops = [C.accentPale, "#ffd7c0", C.accentSoft, C.accent];
  const hs = [0.7, 1.6, 2.6, 3.8];
  const chipLabels = ["DST-NIDHI", "BIRAC", "MeitY"];
  const centers = [0, 1, 2, 3].map((i) => iso.proj(4.2, 6.6 - i * 1.8 - 0.9, hs[i]));
  const nodes: [number, number][] = [[8.6, 1.4], [9.4, 3.6], [8.2, 5.6]];
  const np = nodes.map(([x, y]) => iso.proj(x, y, 0.5));
  const top = centers[3];
  return (
    <SceneFrame ground>
      <Fit s={1.3} cy={240} dx={-6} dy={-11}>
        <Mat iso={iso} w={10.5} d={8.2} />
        {/* investor network (right) */}
        <path d={`M${np[0].join(" ")} L${np[1].join(" ")} L${np[2].join(" ")} Z`} fill="none" stroke={C.lineStrong} strokeWidth={1.2} />
        {np.map(([x, y], i) => (
          <Dash key={i} d={`M${x - 16} ${y - 6} Q${(x + top[0]) / 2 - 10} ${Math.min(y, top[1]) - 54 + i * 14} ${top[0] + 12} ${top[1] - 2}`} flow />
        ))}
        {/* stairs: back (highest) first */}
        {[3, 2, 1, 0].map((i) => (
          <g key={i}>
            <Slab iso={iso} b={[2, 7 - 1.8 * (i + 1), 6.5, 7 - 1.8 * i, 0, hs[i]]} top={tops[i]} right={C.faceDark} front={i === 3 ? C.accentSoft : C.faceL} stroke={i === 3 ? C.accentDeep : C.lineStrong} />
          </g>
        ))}
        <g transform={iso.wallF(2, 7, hs[0])}>
          <rect x={10} y={2} width={40} height={2.5} rx={1.2} fill={C.lineStrong} />
          <rect x={10} y={6} width={26} height={2.5} rx={1.2} fill={C.line} />
        </g>
        {/* rising path across the step tops */}
        <Dash d={`M${centers[0][0]} ${centers[0][1]} L${centers[1][0]} ${centers[1][1]} L${centers[2][0]} ${centers[2][1]} L${centers[3][0]} ${centers[3][1]}`} w={2} />
        <path d={`M${centers[3][0] + 2} ${centers[3][1] - 8} l8 8 l-10 3z`} fill={C.accentDeep} transform="translate(-4 -2)" />
        {/* coins + grant chips on the lower three steps */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Coins x={centers[i][0]} y={centers[i][1] - 4} n={i + 1} r={13} />
            <Chip x={centers[i][0] - 6} y={centers[i][1] - 22 - i * 6 - 12} label={chipLabels[i]} size={12} tone={i === 1 ? "accent" : "white"} />
          </g>
        ))}
        {/* top step: star + stack */}
        <g className="ill-float">
          <path d={STAR} transform={`translate(${centers[3][0]} ${centers[3][1] - 30}) scale(2.6)`} fill={C.accentDeep} />
        </g>
        <Coins x={centers[3][0] + 2} y={centers[3][1] - 2} n={4} r={13} />
        {/* investors */}
        {np.map(([x, y], i) => (
          <g key={i} className={i === 1 ? "ill-float" : i === 2 ? "ill-float-2" : undefined}>
            <Person x={x} y={y} s={0.95} tone={i === 1 ? "accent" : "white"} />
          </g>
        ))}
        <Chip x={np[1][0] + 6} y={np[1][1] + 32} label="Angels" size={12} tone="accentPale" />
        <Chip x={np[2][0] - 2} y={np[2][1] + 32} label="HW funds" size={12} />
      </Fit>
    </SceneFrame>
  );
}

/* ------------------------------------------------------------------ audit-compliance */
function Audit() {
  const iso = mkIso(330, 168, 22, 15);
  const [mx, my] = iso.proj(3.0 + 60 / 22, 2.9 + 51 / 22, 0.2);
  const rows = [0, 1, 2, 3, 4];
  const [bx, by] = iso.proj(8.9, 1.9, 0.5);
  return (
    <SceneFrame ground>
      <Fit s={1.25} dx={-26} dy={-39}>
        <Mat iso={iso} w={10} d={9} />
        {/* ledger books (back left) */}
        <Slab iso={iso} b={[0.7, 0.9, 3.3, 2.9, 0, 0.9]} top={C.card} right={C.faceDark} front={C.faceR} />
        <Slab iso={iso} b={[0.9, 1.1, 3.1, 2.7, 0.9, 1.7]} top={C.accentPale} right={C.accentSoft} front={C.accentPale} stroke={C.accentSoft} />
        <g transform={iso.wallF(0.7, 2.9, 0.9)}>
          <rect x={4} y={3} width={44} height={3} rx={1.5} fill={C.accentDeep} />
          <rect x={4} y={9} width={30} height={2} rx={1} fill={C.lineStrong} />
        </g>
        <g transform={iso.flat(0.9, 1.1, 1.7)}>
          <rect x={8} y={8} width={30} height={3} rx={1.5} fill={C.accentSoft} />
          <rect x={8} y={15} width={20} height={2.5} rx={1.2} fill={C.lineStrong} />
          <rect x={8} y={21} width={26} height={2.5} rx={1.2} fill={C.lineStrong} />
        </g>

        {/* hero: BOM table */}
        <Slab iso={iso} b={[3.0, 2.9, 8.6, 7.0, 0, 0.2]} />
        <g transform={iso.flat(3.0, 2.9, 0.2)}>
          <rect x={0} y={0} width={123} height={14} fill={C.accentDeep} />
          {[8, 40, 70, 104].map((x, i) => (
            <rect key={x} x={x} y={5} width={[22, 20, 20, 12][i]} height={3} rx={1.5} fill="#fff" opacity={0.9} />
          ))}
          {rows.map((r) => (
            <g key={r} transform={`translate(0 ${19 + r * 13})`}>
              {r === 2 && <rect x={2} y={-2} width={119} height={12} rx={2} fill={C.accentPale} stroke={C.accentSoft} strokeWidth={1} />}
              {[8, 40, 70].map((x, i) => (
                <rect key={x} x={x} y={3} width={[26, 18, 16][(i + r) % 3]} height={3} rx={1.5} fill={r === 2 ? C.accentDeep : C.lineStrong} />
              ))}
              <Tick x={110} y={5} s={0.8} w={1.8} stroke={r === 4 ? C.lineStrong : C.accent} />
            </g>
          ))}
        </g>

        {/* magnifier */}
        <ellipse cx={mx + 6} cy={my + 6} rx={26} ry={9} fill={C.ink} opacity={0.1} />
        <g className="ill-float">
          <path d={`M${mx + 17} ${my - 14} L${mx + 44} ${my + 10}`} stroke={C.ink2} strokeWidth={7} strokeLinecap="round" />
          <circle cx={mx} cy={my - 30} r={26} fill="#fff" fillOpacity={0.6} stroke={C.accentDeep} strokeWidth={4.5} />
          <rect x={mx - 16} y={my - 40} width={22} height={4} rx={2} fill={C.accentDeep} />
          <rect x={mx - 16} y={my - 31} width={15} height={3} rx={1.5} fill={C.lineStrong} />
          <Tick x={mx + 12} y={my - 29} s={1.1} w={2.4} />
          <path d={`M${mx - 18} ${my - 46} q6 -7 14 -9`} stroke="#fff" strokeWidth={3} strokeLinecap="round" fill="none" />
        </g>

        {/* traceability chain (front) */}
        <g transform={iso.flat(2.6, 7.6, 0)}>
          {[0, 1, 2, 3, 4].map((i) =>
            i % 2 === 0 ? (
              <rect key={i} x={i * 24} y={0} width={34} height={16} rx={8} fill="none" stroke={C.accentDeep} strokeWidth={3.2} />
            ) : (
              <rect key={i} x={i * 24 + 6} y={3} width={22} height={10} rx={5} fill={C.accentSoft} stroke={C.accentDeep} strokeWidth={2.4} />
            ),
          )}
          <path d="M8 8 H128" stroke={C.accent} strokeWidth={1.6} strokeDasharray="4 4" className="ill-dash" />
        </g>
        <Chip x={iso.proj(9.4, 8.4, 0.4)[0]} y={iso.proj(9.4, 8.4, 0.4)[1] + 2} label="BOM > milestone" size={11} tone="accentPale" />

        {/* shield-check */}
        <Dash d={`M${iso.proj(8.4, 5.0, 0).join(" ")} L${iso.proj(9.0, 5.0, 0).join(" ")} L${iso.proj(9.0, 2.7, 0).join(" ")}`} />
        <Slab iso={iso} b={[8.2, 1.1, 9.8, 2.7, 0, 0.5]} />
        <ellipse cx={bx} cy={by + 4} rx={14} ry={7} fill={C.ink} opacity={0.12} />
        <g className="ill-float-2">
          <g transform={`translate(${bx} ${by - 34})`}>
            <path d="M0 -26 L20 -18 V4 C20 17 9 25 0 30 C-9 25 -20 17 -20 4 V-18Z" fill={C.accentDeep} />
            <path d="M0 -26 L20 -18 V4 C20 17 9 25 0 30Z" fill={C.accent} />
            <path d="M-9 2 L-2 9 L11 -6" fill="none" stroke="#fff" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      </Fit>
    </SceneFrame>
  );
}

/* ------------------------------------------------------------------ lead-gen-networking */
function LeadGen() {
  const iso = mkIso(330, 175, 22, 15);
  const [, ty] = iso.proj(4.4, 4.4, 0.4);
  const fy = ty - 92; // funnel mouth centre y
  const people: { x: number; y: number; tone: "white" | "accent"; label?: string }[] = [
    { x: 118, y: fy + 4, tone: "white", label: "TBI" },
    { x: 140, y: fy + 96, tone: "white", label: "PhD guide" },
    { x: 330, y: fy - 78, tone: "accent" },
    { x: 538, y: fy + 4, tone: "white", label: "R&D head" },
    { x: 520, y: fy + 96, tone: "white", label: "Founder" },
  ];
  return (
    <SceneFrame ground>
      <Fit s={1.15} cy={235} dx={-20}>
        <Mat iso={iso} w={10} d={9} />
        {/* connections to the funnel mouth */}
        {people.map((p, i) => (
          <Dash key={i} d={`M${p.x + (p.x < 330 ? 18 : p.x > 330 ? -18 : 0)} ${p.y + (p.x === 330 ? 14 : -4)} Q${(p.x + 330) / 2} ${fy - 30 + (i % 2) * 40} ${330 + (p.x < 330 ? -42 : p.x > 330 ? 42 : 0)} ${fy + (p.x === 330 ? -30 : 4)}`} />
        ))}
        {/* tray + lead cards */}
        <Slab iso={iso} b={[3.3, 3.3, 5.5, 5.5, 0, 0.4]} />
        <Slab iso={iso} b={[3.9, 3.9, 4.9, 4.9, 0.4, 0.7]} top={C.accent} right={C.accentDeep} front={C.accentDeep} stroke={C.accentDeep} />
        <Slab iso={iso} b={[4.0, 4.0, 4.8, 4.8, 0.7, 0.95]} top={C.accentPale} right={C.accentSoft} front={C.accentSoft} stroke={C.accentSoft} />
        {/* funnel */}
        <g className="ill-float">
          <path d={`M274 ${fy} A56 28 0 0 0 386 ${fy} L${330 + 13} ${fy + 82} A13 6.5 0 0 1 ${330 - 13} ${fy + 82} Z`} fill={C.faceL} stroke={C.lineStrong} strokeWidth={1} strokeLinejoin="round" />
          <path d={`M330 ${fy + 28} A56 28 0 0 0 386 ${fy} L343 ${fy + 82} A13 6.5 0 0 1 330 ${fy + 88.5} Z`} fill={C.faceR} />
          <path d={`M${330 - 36} ${fy + 28} A36 18 0 0 0 ${330 + 36} ${fy + 28}`} fill="none" stroke={C.accent} strokeWidth={2} />
          <path d={`M${330 - 24} ${fy + 52} A24 12 0 0 0 ${330 + 24} ${fy + 52}`} fill="none" stroke={C.accentDeep} strokeWidth={2} />
          <ellipse cx={330} cy={fy} rx={56} ry={28} fill={C.accentPale} stroke={C.accentDeep} strokeWidth={1.6} />
          <ellipse cx={330} cy={fy + 1} rx={44} ry={21} fill={C.faceDark} opacity={0.5} />
          <Dots pts={[[310, fy - 2], [326, fy + 6], [344, fy - 4], [334, fy + 10], [318, fy + 12]]} s={4} fill={C.accent} className="ill-blink" />
        </g>
        <Dots className="ill-blink" pts={[[330, ty - 18], [326, ty - 10], [334, ty - 4]]} s={3} />
        {/* people */}
        {people.map((p, i) => (
          <g key={i} className={i % 2 ? "ill-float-2" : undefined}>
            <Person x={p.x} y={p.y} s={0.95} tone={p.tone} />
            {p.label && <Chip x={p.x} y={p.y + 30} label={p.label} size={12} tone={i === 3 ? "accentPale" : "white"} />}
          </g>
        ))}
        {/* meeting calendar (front right) */}
        <Slab iso={iso} b={[6.0, 5.4, 9.6, 8.6, 0, 0.25]} />
        <g transform={iso.flat(6.0, 5.4, 0.25)}>
          <rect x={0} y={0} width={79} height={15} fill={C.accentDeep} />
          <circle cx={16} cy={7.5} r={2.4} fill="#fff" />
          <circle cx={63} cy={7.5} r={2.4} fill="#fff" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect key={`${r}${c}`} x={8 + c * 17.5} y={22 + r * 14} width={11} height={8} rx={2} fill={r === 1 && c === 2 ? C.accent : C.line} className={r === 1 && c === 2 ? "ill-pulse" : undefined} />
            )),
          )}
        </g>
        <Chip x={iso.proj(9.6, 7.0, 0.5)[0] + 38} y={iso.proj(9.6, 7.0, 0.5)[1] + 4} label="Tue 11:00" size={12} tone="accent" />
        <Dash d={`M${iso.proj(5.7, 4.4, 0).join(" ")} L${iso.proj(7.6, 4.4, 0).join(" ")} L${iso.proj(7.6, 5.3, 0).join(" ")}`} />
      </Fit>
    </SceneFrame>
  );
}

/* ------------------------------------------------------------------ operations */
function Operations() {
  const iso = mkIso(330, 168, 22, 15);
  const cards = [3, 2, 1];
  return (
    <SceneFrame ground>
      <Fit s={1.22} dx={-26} dy={-8}>
        <Mat iso={iso} w={10} d={9} />
        {/* dashboard dials (left wall) */}
        <Slab iso={iso} b={[0.5, 1.2, 0.8, 5.4, 0, 4.8]} right={C.card} front={C.faceL} />
        <g transform={iso.wallR(0.8, 5.4, 4.8)}>
          <rect x={5} y={6} width={82} height={60} rx={4} fill={C.soft} stroke={C.line} />
          {[26, 64].map((cx, i) => (
            <g key={cx}>
              <path d={`M${cx - 15} 36 A15 15 0 0 1 ${cx + 15} 36`} fill="none" stroke={C.line} strokeWidth={5} strokeLinecap="round" />
              <path d={`M${cx - 15} 36 A15 15 0 0 1 ${i ? cx + 4 : cx - 4} ${i ? 21.5 : 21.7}`} fill="none" stroke={C.accent} strokeWidth={5} strokeLinecap="round" className="ill-pulse" />
              <path d={`M${cx} 36 L${cx + (i ? 6 : -5)} ${i ? 23 : 24}`} stroke={C.ink2} strokeWidth={1.8} strokeLinecap="round" />
              <circle cx={cx} cy={36} r={2.6} fill={C.accentDeep} />
            </g>
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={12 + i * 11.5} y={58 - [4, 7, 5, 9, 6, 10][i]} width={8} height={[4, 7, 5, 9, 6, 10][i]} rx={1.5} fill={i > 3 ? C.accent : C.accentSoft} />
          ))}
        </g>

        {/* kanban board (back wall) */}
        <Slab iso={iso} b={[2.2, 0.7, 8.6, 1.0, 0, 5.4]} right={C.faceR} front={C.card} />
        <g transform={iso.wallF(2.2, 1.0, 5.4)}>
          {[0, 1, 2].map((c) => (
            <g key={c} transform={`translate(${5 + c * 45} 6)`}>
              <rect x={0} y={0} width={41} height={8} rx={2} fill={c === 2 ? C.accent : C.accentPale} />
              <rect x={5} y={3} width={16} height={2.4} rx={1.2} fill={c === 2 ? "#fff" : C.accentDeep} />
              {Array.from({ length: cards[c] }).map((_, r) => (
                <g key={r}>
                  <rect x={0} y={13 + r * 17} width={41} height={14} rx={2.5} fill={C.soft} stroke={C.line} strokeWidth={1} />
                  <rect x={0} y={13 + r * 17} width={2.6} height={14} rx={1} fill={c === 2 ? C.accent : C.accentSoft} />
                  <rect x={7} y={17 + r * 17} width={22 + ((r * 7) % 10)} height={2.6} rx={1.3} fill={C.lineStrong} />
                  <rect x={7} y={22 + r * 17} width={14} height={2.2} rx={1.1} fill={C.line} />
                </g>
              ))}
              {c === 1 && (
                <g className="ill-scan">
                  <rect x={0} y={47} width={41} height={14} rx={2.5} fill="none" stroke={C.accent} strokeWidth={1.4} strokeDasharray="3 2" />
                  <Tick x={33} y={54.5} s={0.8} w={1.8} />
                </g>
              )}
            </g>
          ))}
        </g>

        {/* flow links */}
        <Dash d={`M${iso.proj(5.4, 1.3, 0).join(" ")} L${iso.proj(5.4, 2.5, 0).join(" ")}`} />
        <Dash d={`M${iso.proj(5.0, 7.5, 0).join(" ")} L${iso.proj(7.2, 7.5, 0).join(" ")} L${iso.proj(7.2, 6.1, 0).join(" ")}`} />

        {/* gears (center) */}
        <Slab iso={iso} b={[3.2, 2.6, 8.6, 6.0, 0, 0.3]} />
        <g transform={iso.flat(3.2, 2.6, 0.3)}>
          <g transform="translate(36 37)">
            <g className="ill-spin">
              <path d={gearPath(20, 11)} fill={C.card} stroke={C.accentDeep} strokeWidth={1.6} strokeLinejoin="round" />
              <circle r={7} fill={C.accentPale} stroke={C.accent} strokeWidth={1.4} />
              <path d="M0 -13 V13 M-13 0 H13" stroke={C.accentSoft} strokeWidth={1.4} />
            </g>
          </g>
          <g transform="translate(80 37)">
            <g className="ill-spin" style={{ animationDirection: "reverse", animationDuration: "15s" }}>
              <path d={gearPath(13, 8)} fill={C.accentPale} stroke={C.accent} strokeWidth={1.6} strokeLinejoin="round" />
              <circle r={4.5} fill={C.card} stroke={C.accentDeep} strokeWidth={1.2} />
            </g>
          </g>
          <rect x={98} y={20} width={14} height={34} rx={3} fill={C.accentPale} stroke={C.accentSoft} />
          <rect x={101} y={26} width={8} height={2.4} rx={1.2} fill={C.accentDeep} />
          <rect x={101} y={32} width={8} height={2.4} rx={1.2} fill={C.lineStrong} />
          <rect x={101} y={38} width={8} height={2.4} rx={1.2} fill={C.lineStrong} />
        </g>

        {/* SOP binder (front left) */}
        <Slab iso={iso} b={[1.6, 6.5, 4.8, 8.7, 0, 0.9]} top={C.card} right={C.faceDark} front={C.faceR} />
        <Slab iso={iso} b={[1.6, 6.5, 1.95, 8.7, 0, 0.9]} top={C.accentDeep} right={C.accentDeep} front={C.accentDeep} stroke={C.accentDeep} />
        <g transform={iso.flat(1.6, 6.5, 0.9)}>
          <rect x={14} y={7} width={50} height={34} rx={3} fill={C.accentPale} stroke={C.accentSoft} strokeWidth={1} />
          <text x={39} y={29} textAnchor="middle" fontSize={14} fill={C.accentDeep} style={mono}>SOP</text>
          <rect x={14} y={42} width={30} height={2.4} rx={1.2} fill={C.accentSoft} />
        </g>
        <Chip x={iso.proj(4.8, 8.7, 0.9)[0] + 4} y={iso.proj(4.8, 8.7, 0.9)[1] + 18} label="SOP-01 v3" size={12} tone="accentPale" />
      </Fit>
    </SceneFrame>
  );
}

export const enablementArt: Record<string, () => ReactNode> = {
  "branding-marketing": BrandingMarketing,
  incorporation: Incorporation,
  "funding-investor-access": Funding,
  "audit-compliance": Audit,
  "lead-gen-networking": LeadGen,
  operations: Operations,
};
