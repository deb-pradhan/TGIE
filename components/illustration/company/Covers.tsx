import { C, IsoBox, makeIso } from "../kit";
import { Stage, flatT, qT } from "./bits";

export type CoverKind = "portfolio" | "notes" | "model";

const MONO = "var(--font-mono)";

/** flat cover art in page units (5 wide x 7 tall); laid onto an iso slab by <CoverSlab>. */
function Art({ kind }: { kind: CoverKind }) {
  const ns = { vectorEffect: "non-scaling-stroke" } as const;
  if (kind === "portfolio") {
    const tiles = [
      { l: "A", x: 0.4, y: 2.3 },
      { l: "B", x: 2.6, y: 2.3 },
      { l: "C", x: 0.4, y: 4.0 },
      { l: "D", x: 2.6, y: 4.0 },
    ];
    return (
      <g>
        <rect x=".4" y=".45" width="1.25" height=".4" rx=".08" fill={C.teal} />
        <text x=".52" y=".76" fontFamily={MONO} fontSize=".3" fontWeight="700" fill="#fff">TGIE</text>
        <rect x="3.45" y=".45" width="1.15" height=".4" rx=".2" fill="none" stroke={C.teal} strokeWidth="1.2" {...ns} />
        <text x="3.64" y=".75" fontFamily={MONO} fontSize=".26" fontWeight="700" fill={C.tealDeep}>PDF</text>
        <rect x=".4" y="1.2" width="3.4" height=".26" rx=".06" fill={C.ink2} />
        <rect x=".4" y="1.62" width="2.3" height=".26" rx=".06" fill={C.muted} />
        {tiles.map((t) => (
          <g key={t.l}>
            <rect x={t.x} y={t.y} width="2" height="1.5" rx=".12" fill={C.mint} />
            <text x={t.x + 0.15} y={t.y + 0.45} fontFamily={MONO} fontSize=".34" fontWeight="700" fill={C.tealDeep}>{t.l}</text>
            <rect x={t.x + 0.45} y={t.y + 0.7} width=".7" height=".5" rx=".06" fill={C.teal} opacity={t.l === "A" ? 1 : 0.35} />
            <rect x={t.x + 1.2} y={t.y + 0.7} width=".5" height=".5" rx=".06" fill={C.teal} opacity={t.l === "C" ? 1 : 0.35} />
            <rect x={t.x + 0.15} y={t.y + 0.7} width=".2" height=".5" rx=".05" fill={C.teal} opacity={t.l === "D" ? 1 : 0.35} />
          </g>
        ))}
        <path d="M.4 5.85H4.6M.4 6.15H3.2M.4 6.45H3.9" stroke={C.lineStrong} strokeWidth="2" strokeLinecap="round" {...ns} />
      </g>
    );
  }
  if (kind === "notes") {
    return (
      <g>
        <rect width="5" height="7" fill={C.soft} />
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <circle cx=".32" cy={0.55 + i * 0.72} r=".11" fill={C.paper} stroke={C.lineStrong} strokeWidth="1" {...ns} />
          </g>
        ))}
        <rect x=".95" y=".45" width="3" height=".42" rx=".05" fill={C.tealSoft} opacity=".55" />
        <rect x="1.05" y=".55" width="2.2" height=".22" rx=".05" fill={C.ink2} />
        <path d="M1 1.35H4.5M1 1.75H3.9M1 2.15H4.2" stroke={C.lineStrong} strokeWidth="2" strokeLinecap="round" {...ns} />
        <g fill="none" stroke={C.teal} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 3.4H1.9L2.3 3H3.3L3.7 3.5H4.5" {...ns} />
          <circle cx="1" cy="3.4" r=".09" fill={C.teal} {...ns} />
          <circle cx="4.5" cy="3.5" r=".09" fill={C.teal} {...ns} />
        </g>
        <path d="M1 5.9V4.1M1 5.9H4.5" stroke={C.ink2} strokeWidth="1.4" fill="none" {...ns} />
        <path d="M1.1 5.5L2 5.1L2.8 5.3L3.6 4.5L4.4 4.3" stroke={C.teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" {...ns} />
        <path d="M1 6.4H3.6M1 6.7H2.8" stroke={C.lineStrong} strokeWidth="2" strokeLinecap="round" {...ns} />
      </g>
    );
  }
  return (
    <g>
      <rect width="5" height="7" fill={C.mint} />
      <path d="M1.1 1.1V4.5" stroke={C.teal} strokeWidth="1.5" strokeDasharray="4 4" fill="none" {...ns} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="1.1" cy={1.1 + i * 1.15} r=".3" fill={C.teal} />
          <text x="1.1" y={1.2 + i * 1.15} textAnchor="middle" fontFamily={MONO} fontSize=".3" fontWeight="700" fill="#fff">{i + 1}</text>
          <rect x="1.7" y={0.92 + i * 1.15} width={2.4 - i * 0.2} height=".2" rx=".05" fill={C.ink2} />
          <rect x="1.7" y={1.28 + i * 1.15} width={1.7 - i * 0.1} height=".16" rx=".05" fill={C.muted} opacity=".7" />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={0.6 + i * 0.85} y={5.85 + i * 0.22} width="1.3" height=".18" rx=".05" fill={C.teal} opacity={0.35 + i * 0.2} />
      ))}
    </g>
  );
}

/**
 * One document cover as an isometric slab (a few sheets thick) whose flat art
 * is laid onto the top face. (cx, cy) = screen centre of the cover at z = 0.
 */
export function CoverSlab({
  cx,
  cy,
  kind,
  k = 20,
  hz = 16,
  z = 0,
  className,
}: {
  cx: number;
  cy: number;
  kind: CoverKind;
  k?: number;
  hz?: number;
  z?: number;
  className?: string;
}) {
  const ox = cx + k;
  const oy = cy - 3 * k - z * hz;
  const P = makeIso(ox, oy, k, hz);
  const o = { ox, oy, k, hz };
  return (
    <g className={className}>
      <IsoBox faces={P.box(0.12, 0.12, 5.12, 7.12, -0.14, 0.04)} top={C.faceDark} right={C.faceDark} front={C.faceDark} stroke={C.lineStrong} />
      <IsoBox faces={P.box(0.06, 0.06, 5.06, 7.06, 0, 0.1)} top={C.faceTop} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <IsoBox faces={P.box(0, 0, 5, 7, 0.1, 0.24)} top={C.faceTop} right={C.faceR} front={C.faceL} stroke={C.lineStrong} />
      <g transform={flatT(o, 0, 0, 0.24)}>
        <Art kind={kind} />
      </g>
      <path d={P.poly([P.proj(0, 0, 0.24), P.proj(5, 0, 0.24), P.proj(5, 7, 0.24), P.proj(0, 7, 0.24)])} fill="none" stroke={C.lineStrong} strokeWidth="1" />
      {/* spine edge */}
      <path d={qT(P, 0, 0, 0.18, 7, 0.24)} fill={C.teal} opacity=".9" />
    </g>
  );
}

/** soft diamond shadow under a floating cover */
export function CoverShadow({ cx, cy, k = 20, dy = 30 }: { cx: number; cy: number; k?: number; dy?: number }) {
  const pts = [
    [cx + k, cy - 3 * k],
    [cx + 6 * k, cy - 0.5 * k],
    [cx - k, cy + 3 * k],
    [cx - 6 * k, cy + 0.5 * k],
  ];
  return <path d={"M" + pts.map(([x, y]) => `${x} ${y + dy}`).join(" L") + " Z"} fill={C.lineStrong} opacity=".4" />;
}

/** Card illustration: a single cover with a second sheet peeking out and a soft shadow. */
export function CoverCard({ kind, label }: { kind: CoverKind; label: string }) {
  return (
    <Stage w={360} h={240} tone={kind === "model" ? "paper2" : "mint"} label={label}>
      <CoverShadow cx={196} cy={112} dy={34} />
      <CoverSlab cx={196} cy={112} kind={kind} z={0.2} className="ill-float" />
      <g className="ill-float-2">
        <circle cx="288" cy="52" r="5" fill={C.teal} />
        <circle cx="288" cy="52" r="11" fill="none" stroke={C.teal} strokeOpacity=".4" />
      </g>
    </Stage>
  );
}
