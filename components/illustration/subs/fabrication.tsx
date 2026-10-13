import type { ReactNode } from "react";
import { C, SceneFrame } from "../kit";
import { Chip, Dash, Dots, Fit, Lines, Mat, Shadow, Slab, Tick, Truck, gearPath, mkIso, mono } from "./_shared2/parts";

/** Sub-service illustrations for the "fabrication" pillar, keyed by sub slug. */

/* ------------------------------------------------------------------ single-source-accountability */
function SingleSource() {
  const iso = mkIso(223, 132, 22, 15);
  const [px, py] = iso.proj(6.7, 2.9, 1.1);
  const steps = ["Cut", "Bend", "Weld", "Coat"];
  return (
    <SceneFrame ground>
      <Fit s={1.08} cy={245} dy={-6}>
        <Mat iso={iso} w={15} d={6.2} />
        {/* the single dashed path: RFQ -> PO -> truck */}
        <Dash d={`M${iso.proj(3.6, 3.1, 0).join(" ")} L${iso.proj(14.8, 3.1, 0).join(" ")}`} w={2} />

        {/* RFQ document */}
        <Slab iso={iso} b={[0.6, 1.3, 3.6, 4.9, 0, 0.2]} />
        <g transform={iso.flat(0.6, 1.3, 0.2)}>
          <rect x={6} y={4} width={32} height={14} rx={2} fill={C.accentPale} stroke={C.accentSoft} />
          <text x={22} y={14.4} textAnchor="middle" fontSize={11} fill={C.accentDeep} style={mono}>RFQ</text>
          <rect x={44} y={8} width={22} height={3} rx={1.5} fill={C.lineStrong} />
          <rect x={44} y={13} width={14} height={2.4} rx={1.2} fill={C.line} />
          <path d="M8 26 h20 v14 h-8 v-7 h-12z" fill={C.faceL} stroke={C.accentDeep} strokeWidth={1.2} strokeLinejoin="round" />
          <circle cx={13} cy={29} r={1.5} fill="none" stroke={C.accentDeep} />
          <Lines x={36} y={28} widths={[30, 24, 28]} gap={6} h={2.4} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={6} y={50 + i * 7} width={60} height={5} rx={1.5} fill="none" stroke={C.line} />
          ))}
        </g>

        {/* hero: the one PO tile */}
        <Slab iso={iso} b={[5.0, 1.2, 8.4, 4.6, 0, 1.1]} top={C.accentDeep} right={C.graphite} front={C.graphiteDeep} stroke={C.graphite} />
        <g transform={iso.flat(5.0, 1.2, 1.1)}>
          <rect x={4} y={4} width={67} height={67} rx={4} fill="none" stroke={C.accentSoft} strokeWidth={1.2} className="ill-pulse" />
          <text x={37.5} y={50} textAnchor="middle" fontSize={34} fill="#fff" style={mono}>PO</text>
        </g>
        <g transform={iso.wallF(5.0, 4.6, 1.1)}>
          <rect x={8} y={5} width={36} height={2.6} rx={1.3} fill={C.accentSoft} />
        </g>
        {/* lifecycle chips tethered to the PO */}
        <g className="ill-float">
          <path d={`M${px - 78} ${py - 78} H${px + 78} M${px} ${py - 78} V${py - 14}`} fill="none" stroke={C.accentSoft} strokeWidth={1.4} strokeDasharray="3 3" />
          {steps.map((s, i) => (
            <Chip key={s} x={px - 78 + i * 52} y={py - 88} label={s} size={12} tone={i === 2 ? "accent" : "white"} />
          ))}
        </g>

        {/* steel stock (front) */}
        {[0, 1, 2].map((i) => (
          <Slab key={i} iso={iso} b={[5.4, 5.2, 8.0, 6.0, i * 0.22, (i + 1) * 0.22]} top={i === 2 ? C.card : C.faceL} right={C.faceDark} front={C.faceR} stroke={C.lineStrong} />
        ))}

        {/* truck + delivery */}
        <Truck iso={iso} x={10.4} y={2.2} />
        <Shadow x={iso.proj(12.3, 3.2, 0)[0]} y={iso.proj(12.3, 3.2, 0)[1] + 6} rx={50} o={0.08} />
        <g className="ill-float-2">
          <Chip x={iso.proj(12.8, 2.2, 3.4)[0]} y={iso.proj(12.8, 2.2, 3.4)[1] - 6} label="Delivered" size={12} tone="accentPale" />
          <Tick x={iso.proj(12.8, 2.2, 3.4)[0] + 34} y={iso.proj(12.8, 2.2, 3.4)[1] - 6} s={0.9} w={2} />
        </g>
      </Fit>
    </SceneFrame>
  );
}

/* ------------------------------------------------------------------ machinery-welding */
function MachineryWelding() {
  const iso = mkIso(290, 150, 22, 15);
  const [hx, hy] = iso.proj(3.7, 3.0, 1.0);
  const [, cy] = iso.proj(3.7, 3.0, 2.5);
  const [wx, wy] = iso.proj(8.7, 6.6, 0.8);
  const slats = Array.from({ length: 9 }, (_, i) => 6 + i * 13);
  const dark = { right: C.graphite, front: C.accentDeep, stroke: C.graphite };
  return (
    <SceneFrame ground>
      <Fit s={1.22} cy={250} dx={10} dy={-20}>
        <Mat iso={iso} w={11} d={9} />

        {/* CNC plasma / laser bed */}
        <Slab iso={iso} b={[0.6, 0.6, 7.0, 5.8, 0, 1.0]} top={C.faceDark} {...dark} />
        <g transform={iso.flat(0.6, 0.6, 1.0)}>
          {slats.map((x) => (
            <path key={x} d={`M${x} 3 V111`} stroke={C.muted} strokeWidth={1.4} opacity={0.5} />
          ))}
          {/* steel sheet being cut */}
          <rect x={10} y={10} width={120} height={94} rx={1.5} fill={C.card} stroke={C.lineStrong} />
          <path d="M30 28 H60 V44 H46 V82 H30Z" fill={C.accentPale} stroke={C.accentDeep} strokeWidth={1.4} strokeLinejoin="round" />
          <path d="M60 44 H100 V82" fill="none" stroke={C.accent} strokeWidth={1.6} strokeDasharray="4 3" className="ill-dash" />
          <circle cx={90} cy={34} r={9} fill="none" stroke={C.accent} strokeWidth={1.4} strokeDasharray="3 3" />
          <circle cx={38} cy={68} r={3.4} fill={C.faceDark} stroke={C.accentDeep} />
          <circle cx={38} cy={36} r={3.4} fill={C.faceDark} stroke={C.accentDeep} />
        </g>
        {/* gantry */}
        <Slab iso={iso} b={[3.3, 0.2, 4.1, 0.8, 0, 2.5]} top={C.card} {...dark} />
        <Slab iso={iso} b={[3.3, 5.6, 4.1, 6.2, 0, 2.5]} top={C.card} {...dark} />
        <Slab iso={iso} b={[3.3, 0.2, 4.1, 6.2, 2.5, 3.1]} top={C.accentSoft} right={C.accentDeep} front={C.accent} stroke={C.accentDeep} />
        {/* carriage, head, beam, sparks */}
        <Slab iso={iso} b={[3.3, 2.6, 4.1, 3.4, 3.1, 3.7]} top={C.card} right={C.faceDark} front={C.faceR} stroke={C.accentDeep} />
        <path d={`M${hx} ${cy - 22} V${hy - 10}`} stroke={C.ink2} strokeWidth={5} strokeLinecap="round" />
        <path d={`M${hx - 5} ${hy - 30} L${hx} ${hy - 10} L${hx + 5} ${hy - 30}Z`} fill={C.accentDeep} />
        <path d={`M${hx} ${hy - 10} V${hy}`} stroke={C.accentSoft} strokeWidth={3.4} strokeLinecap="round" className="ill-pulse" />
        <Dots className="ill-blink" pts={[[hx - 9, hy + 2], [hx + 10, hy - 3], [hx - 16, hy + 7], [hx + 16, hy + 6], [hx + 2, hy + 9], [hx - 4, hy - 8]]} s={3.4} fill={C.accent} />
        <Chip x={iso.proj(0.4, 5.9, 1.0)[0] - 4} y={iso.proj(0.4, 5.9, 1.0)[1] + 12} label="Laser 16mm" size={12} tone="accentPale" />
        <Chip x={iso.proj(2.4, 6.9, 1.0)[0]} y={iso.proj(2.4, 6.9, 1.0)[1] + 4} label="Plasma 250mm" size={12} />

        {/* press brake (back right) */}
        <Slab iso={iso} b={[7.6, 0.6, 10.8, 3.0, 0, 1.2]} top={C.faceDark} {...dark} />
        <Slab iso={iso} b={[7.6, 0.6, 8.2, 3.0, 1.2, 4.0]} top={C.card} {...dark} />
        <Slab iso={iso} b={[10.2, 0.6, 10.8, 3.0, 1.2, 4.0]} top={C.card} {...dark} />
        <Slab iso={iso} b={[7.6, 0.6, 10.8, 3.0, 3.2, 4.0]} top={C.accentSoft} right={C.accentDeep} front={C.accent} stroke={C.accentDeep} />
        <Slab iso={iso} b={[8.8, 1.4, 9.6, 2.2, 2.5, 3.2]} top={C.ink2} right={C.ink} front={C.ink2} stroke={C.ink} />
        <path d={`M${iso.proj(9.2, 2.6, 1.25).join(" ")} l-14 -3 l14 7 l14 -7 l-14 -3z`} transform="translate(0 -2)" fill={C.accentPale} stroke={C.accentDeep} strokeWidth={2} strokeLinejoin="round" />
        <Chip x={iso.proj(10.8, 3.0, 4.0)[0] + 20} y={iso.proj(10.8, 3.0, 4.0)[1] - 6} label="320T" size={12} tone="accent" />

        {/* weld station (front right) */}
        <Slab iso={iso} b={[7.2, 5.0, 10.6, 8.4, 0, 0.7]} top={C.faceDark} {...dark} />
        <Slab iso={iso} b={[7.9, 5.8, 10.0, 7.2, 0.7, 0.95]} top={C.card} right={C.faceDark} front={C.faceR} />
        <Slab iso={iso} b={[8.6, 5.8, 9.1, 7.2, 0.95, 2.0]} top={C.card} right={C.faceDark} front={C.faceR} />
        <path d={`M${iso.proj(8.85, 5.8, 0.98).join(" ")} L${iso.proj(8.85, 7.2, 0.98).join(" ")}`} stroke={C.accent} strokeWidth={3} strokeLinecap="round" />
        {/* torch (GMAW gun) */}
        <path d={`M${wx + 12} ${wy - 40} L${wx + 3} ${wy - 8}`} stroke={C.ink2} strokeWidth={9} strokeLinecap="round" />
        <path d={`M${wx + 4} ${wy - 14} L${wx} ${wy - 3}`} stroke={C.accentDeep} strokeWidth={6} strokeLinecap="round" />
        <path d={`M${wx + 16} ${wy - 46} C${wx + 46} ${wy - 74} ${wx + 70} ${wy - 44} ${wx + 62} ${wy - 12}`} fill="none" stroke={C.ink2} strokeWidth={3.4} strokeLinecap="round" />
        <circle cx={wx} cy={wy} r={4} fill={C.accentSoft} className="ill-pulse" />
        <Dots className="ill-blink" pts={[[wx - 10, wy - 8], [wx + 12, wy - 10], [wx - 18, wy + 2], [wx + 18, wy + 2], [wx - 4, wy - 18], [wx + 6, wy - 22], [wx - 14, wy - 20], [wx + 22, wy - 16]]} s={3.4} fill={C.accent} />
        <Dots className="ill-float" pts={[[wx - 24, wy - 12], [wx + 28, wy - 6], [wx - 6, wy - 30]]} s={2.6} fill={C.accentSoft} />
        <Chip x={wx - 50} y={wy + 28} label="GMAW" size={12} tone="accent" />
        <Chip x={wx + 14} y={wy + 40} label="SMAW" size={12} />
      </Fit>
    </SceneFrame>
  );
}

/* ------------------------------------------------------------------ partner-network-ops */
function PartnerNetwork() {
  const iso = mkIso(304, 122, 22, 15);
  const sats: { x: number; y: number; id: string; label: string }[] = [
    { x: 0.6, y: 0.6, id: "gear", label: "Machining" },
    { x: 10.4, y: 0.6, id: "zn", label: "Galvanizing" },
    { x: 0.6, y: 8.6, id: "bolt", label: "Plating" },
    { x: 10.4, y: 8.6, id: "spray", label: "Powder coat" },
  ];
  const icon = (id: string) => {
    if (id === "gear")
      return (
        <g transform="translate(22 22)">
          <g className="ill-spin">
            <path d={gearPath(10, 9)} fill={C.accentPale} stroke={C.accentDeep} strokeWidth={1.4} strokeLinejoin="round" />
            <circle r={3.6} fill={C.card} stroke={C.accentDeep} strokeWidth={1.2} />
          </g>
        </g>
      );
    if (id === "zn")
      return (
        <g>
          <path d="M22 9 C22 9 12 22 12 29 a10 10 0 0 0 20 0 C32 22 22 9 22 9z" fill={C.accentPale} stroke={C.accentDeep} strokeWidth={1.4} />
          <text x={22} y={33} textAnchor="middle" fontSize={11} fill={C.accentDeep} style={mono}>Zn</text>
        </g>
      );
    if (id === "bolt")
      return (
        <g fill="none" stroke={C.accentDeep} strokeWidth={1.5} strokeLinejoin="round">
          <path d="M12 13 H32 V19 H12Z" fill={C.accentPale} />
          <path d="M17 19 V35 M27 19 V35" />
          <path d="M17 24 h10 M17 29 h10" stroke={C.accent} />
        </g>
      );
    return (
      <g fill="none" stroke={C.accentDeep} strokeWidth={1.5} strokeLinejoin="round">
        <rect x={9} y={16} width={10} height={14} rx={2} fill={C.accentPale} />
        <path d="M19 20 L35 12 M19 23 L36 23 M19 26 L35 34" stroke={C.accent} strokeDasharray="2 2.5" />
      </g>
    );
  };
  return (
    <SceneFrame ground>
      <Fit s={1.06} cy={250} dx={-4}>
        <Mat iso={iso} w={13} d={11.2} />
        {/* bus connectors */}
        <Dash d={`M${iso.proj(1.6, 2.9, 0).join(" ")} L${iso.proj(1.6, 8.5, 0).join(" ")}`} />
        <Dash d={`M${iso.proj(11.4, 2.9, 0).join(" ")} L${iso.proj(11.4, 8.5, 0).join(" ")}`} />
        <Dash d={`M${iso.proj(1.6, 5.5, 0).join(" ")} L${iso.proj(11.4, 5.5, 0).join(" ")}`} />
        {/* satellites */}
        {sats.map((s) => (
          <g key={s.id}>
            <Slab iso={iso} b={[s.x, s.y, s.x + 2, s.y + 2, 0, 0.55]} />
            <g transform={iso.flat(s.x, s.y, 0.55)}>{icon(s.id)}</g>
            <Chip x={iso.proj(s.x + 1, s.y + 1, 0.55)[0]} y={iso.proj(s.x + 1, s.y + 1, 0.55)[1] - 42} label={s.label} size={12} tone="white" />
          </g>
        ))}
        {/* hero hub */}
        <Slab iso={iso} b={[5.2, 4.2, 7.8, 6.8, 0, 1.0]} top={C.accentDeep} right={C.graphite} front={C.graphiteDeep} stroke={C.graphite} />
        <g transform={iso.flat(5.2, 4.2, 1.0)}>
          <rect x={5} y={5} width={47} height={47} rx={5} fill="none" stroke={C.accentSoft} strokeWidth={1.2} className="ill-pulse" />
          <path d="M16 18 H41 M28.5 18 V40" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
        </g>
        <Chip x={iso.proj(6.5, 5.5, 1.0)[0]} y={iso.proj(6.5, 5.5, 1.0)[1] - 40} label="TGIE QA" size={12} tone="accent" />
        {/* logistics truck */}
        <Dash d={`M${iso.proj(6.5, 6.9, 0).join(" ")} L${iso.proj(6.5, 9.4, 0).join(" ")}`} />
        <Truck iso={iso} x={4.6} y={9.2} />
        <Chip x={iso.proj(7.4, 11.0, 0.4)[0] + 6} y={iso.proj(7.4, 11.0, 0.4)[1] + 10} label="Logistics" size={12} tone="accentPale" />
      </Fit>
    </SceneFrame>
  );
}

/* ------------------------------------------------------------------ quality-documentation */
function QualityDocs() {
  const iso = mkIso(330, 150, 22, 15);
  const [rx, ry] = iso.proj(8.6, 1.8, 0.4);
  return (
    <SceneFrame ground>
      <Fit s={1.14} cy={250} dx={-17} dy={-21}>
        <Mat iso={iso} w={10} d={9.5} />

        {/* mill test certificate */}
        <Slab iso={iso} b={[0.8, 0.8, 4.6, 5.6, 0, 0.2]} />
        <g transform={iso.flat(0.8, 0.8, 0.2)}>
          <rect x={6} y={4} width={66} height={14} rx={2} fill={C.accentDeep} />
          <text x={39} y={14.4} textAnchor="middle" fontSize={11} fill="#fff" style={mono}>MILL CERT</text>
          <rect x={76} y={9} width={8} height={4} rx={2} fill={C.lineStrong} />
          {[0, 1, 2, 3, 4].map((r) => (
            <g key={r} transform={`translate(6 ${22 + r * 12})`}>
              <rect x={0} y={0} width={72} height={9} rx={1.5} fill={r === 1 ? C.accentPale : "none"} stroke={C.line} />
              <rect x={4} y={3.2} width={[24, 16, 30, 18, 26][r]} height={2.6} rx={1.3} fill={C.lineStrong} />
              <Tick x={64} y={4.6} s={0.66} w={1.7} />
            </g>
          ))}
          <path d="M8 96 q6 -9 11 -2 t10 -3" fill="none" stroke={C.accentDeep} strokeWidth={1.4} strokeLinecap="round" />
          <circle cx={64} cy={92} r={8} fill="none" stroke={C.accent} strokeWidth={1.4} />
          <Tick x={64} y={92.5} s={0.8} w={1.8} />
        </g>

        {/* WPS sheet (offset, overlapping slightly) */}
        <Slab iso={iso} b={[4.3, 3.0, 8.1, 7.4, 0, 0.2]} />
        <g transform={iso.flat(4.3, 3.0, 0.2)}>
          <rect x={6} y={4} width={48} height={14} rx={2} fill={C.accentPale} stroke={C.accentSoft} />
          <text x={30} y={14.4} textAnchor="middle" fontSize={11} fill={C.accentDeep} style={mono}>WPS-04</text>
          {/* V-groove weld joint cross-section */}
          <path d="M6 24 H30 L38 36 L46 24 H78 V34 H6Z" fill={C.faceL} stroke={C.accentDeep} strokeWidth={1.2} strokeLinejoin="round" />
          <path d="M30 24 L38 36 L46 24Z" fill={C.accent} />
          <path d="M6 36 H78 V47 H6Z" fill={C.faceR} stroke={C.accentDeep} strokeWidth={1.2} />
          <Lines x={6} y={56} widths={[44, 66, 36, 56]} gap={8} h={2.8} fill={C.lineStrong} />
          <rect x={56} y={80} width={22} height={11} rx={2} fill="none" stroke={C.accent} strokeDasharray="2 2" />
        </g>

        {/* floating ISO 9001:2015 rosette */}
        <Dash d={`M${iso.proj(8.1, 4.8, 0).join(" ")} L${iso.proj(8.6, 4.8, 0).join(" ")} L${iso.proj(8.6, 2.7, 0).join(" ")}`} />
        <Slab iso={iso} b={[7.8, 1.0, 9.4, 2.6, 0, 0.4]} />
        <Shadow x={rx} y={ry + 2} rx={20} o={0.12} />
        <g className="ill-float">
          <g transform={`translate(${rx} ${ry - 46})`}>
            <path d="M-12 18 L-18 46 L-8 40 L0 48 L2 22Z" fill={C.accentDeep} />
            <path d="M12 18 L18 46 L8 40 L0 48 L-2 22Z" fill={C.accent} />
            <path d={gearPath(25, 16, 0.1)} fill={C.accent} stroke={C.accentDeep} strokeWidth={1.4} strokeLinejoin="round" />
            <circle r={21} fill={C.accentDeep} />
            <circle r={17} fill="none" stroke={C.accentSoft} strokeWidth={1} strokeDasharray="2 2.4" />
            <text y={-2} textAnchor="middle" fontSize={11} fill="#fff" style={mono}>ISO</text>
            <text y={12} textAnchor="middle" fontSize={11} fill={C.accentPale} style={mono}>9001</text>
          </g>
        </g>
        <Chip x={iso.proj(9.4, 2.6, 0.4)[0] - 4} y={iso.proj(9.4, 2.6, 0.4)[1] + 20} label="ISO 9001:2015" size={12} tone="accentPale" />

        {/* calipers + measured part (front) */}
        <Slab iso={iso} b={[1.6, 8.3, 3.4, 9.1, 0, 0.7]} top={C.accentPale} right={C.faceDark} front={C.faceR} stroke={C.accentDeep} />
        <g transform={iso.flat(1.2, 7.8, 0.12)}>
          <rect x={0} y={0} width={126} height={9} rx={1.5} fill={C.card} stroke={C.ink2} strokeWidth={1.2} />
          {Array.from({ length: 22 }, (_, i) => (
            <path key={i} d={`M${12 + i * 5} 0 v${i % 5 === 0 ? 5 : 3}`} stroke={C.ink2} strokeWidth={0.8} />
          ))}
          <path d="M0 0 h6 v30 h-6z" fill={C.ink2} />
          <g className="ill-scan">
            <path d="M52 0 h6 v30 h-6z" fill={C.accentDeep} />
            <rect x={48} y={-2} width={20} height={13} rx={2.5} fill={C.accent} stroke={C.accentDeep} />
            <circle cx={58} cy={4.5} r={2.4} fill="#fff" />
          </g>
        </g>
        <Chip x={iso.proj(7.4, 8.8, 0.3)[0]} y={iso.proj(7.4, 8.8, 0.3)[1]} label="±0.05 mm" size={12} />
      </Fit>
    </SceneFrame>
  );
}

export const fabricationArt: Record<string, () => ReactNode> = {
  "single-source-accountability": SingleSource,
  "machinery-welding": MachineryWelding,
  "partner-network-ops": PartnerNetwork,
  "quality-documentation": QualityDocs,
};
