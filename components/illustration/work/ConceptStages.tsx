import type { ReactNode } from "react";
import { C, SceneFrame } from "../kit";
import { placed } from "./geo";
import { EnvSensor, Pcb, Transformer } from "./objects";

const NS = { vectorEffect: "non-scaling-stroke" as const };

function Slab({ children }: { children: ReactNode }) {
  return (
    <SceneFrame viewBox="0 0 320 200" ground tone="paper2">
      <path d="M30 128 L160 63 L290 128 L290 136 L160 201 L30 136 Z" fill={C.faceR} />
      <path d="M30 128 L160 63 L290 128 L160 193 Z" fill={C.accentPale} stroke={C.lineStrong} strokeLinejoin="round" />
      <path d="M30 128 L30 136 L160 201 L160 193 Z" fill={C.faceL} />
      {children}
    </SceneFrame>
  );
}

function Prototype() {
  const pcb = placed(1.7, 1.2, 112, 132, 21);
  const box = placed(1.5, 1.2, 232, 118, 15);
  return (
    <Slab>
      <Pcb c={pcb} />
      <path className="ill-dash" d="M148 112 Q184 82 206 104" fill="none" stroke={C.accent} strokeWidth={1.6} strokeDasharray="5 5" />
      <path d="M200 98 l7 7 l-9 2z" fill={C.accent} />
      <EnvSensor c={box} />
    </Slab>
  );
}

function Trials() {
  const dev = placed(1.5, 1.2, 128, 132, 21);
  const [ax, ay] = dev.proj(2.5, 0.4, 3);
  return (
    <Slab>
      <EnvSensor c={dev} full />
      <g className="ill-pulse" fill="none" stroke={C.accent} strokeWidth={1.5} strokeLinecap="round">
        <path d={`M${ax - 9} ${ay - 4} a13 13 0 0 1 18 0`} />
        <path d={`M${ax - 15} ${ay - 10} a21 21 0 0 1 30 0`} opacity={0.55} />
      </g>
      <g className="ill-float-2">
        <rect x={208} y={64} width={72} height={48} rx={5} fill={C.card} stroke={C.lineStrong} />
        <path d="M216 98 l9 -4 l9 6 l10 -14 l9 8 l9 -10 l10 4" fill="none" stroke={C.accent} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M216 104h56" stroke={C.line} strokeWidth={1} />
        <circle cx={218} cy={74} r={2.2} fill={C.accent} />
        <path d="M225 74h20" stroke={C.lineStrong} strokeWidth={2} strokeLinecap="round" />
      </g>
      <path className="ill-dash" d={`M${ax + 14} ${ay - 12} Q${ax + 50} ${ay - 36} 208 100`} fill="none" stroke={C.accent} strokeWidth={1.5} strokeDasharray="5 5" />
    </Slab>
  );
}

function Production() {
  const spots: [number, number][] = [
    [160, 104],
    [102, 134],
    [218, 134],
  ];
  return (
    <Slab>
      {spots.map(([x, y], i) => (
        <Transformer key={i} c={placed(1.5, 1, x, y, 13.5)} />
      ))}
      {[[142, 150], [176, 156], [198, 112], [120, 108]].map(([x, y], i) => (
        <circle key={i} className="ill-pulse" cx={x} cy={y} r={1.6} fill={C.accentSoft} />
      ))}
    </Slab>
  );
}

const MAP = { prototype: Prototype, trials: Trials, production: Production };
export type StageId = keyof typeof MAP;
export function StageArt({ id }: { id: StageId }) {
  const S = MAP[id];
  return <S />;
}

/* ---------------- pillar pictograms (24-box line glyphs) ---------------- */
const PILLAR_GLYPH: Record<"A" | "B" | "C" | "D", string> = {
  A: "M8 8h8v8H8z M10 4v4 M14 4v4 M10 16v4 M14 16v4 M4 10h4 M4 14h4 M16 10h4 M16 14h4",
  B: "M4 19h16 M6 15h12 M8 11h8 M10 7h4",
  C: "M5 20V9l7-4 7 4v11 M9 20v-5h6v5 M12 2v3 M12 2h3",
  D: "M4 5h16 M4 19h16 M12 5v14 M8 2l-1-1 M16 2l1-1 M12 1v1",
};

export function PillarGlyph({ pillar, size = 22, className }: { pillar: "A" | "B" | "C" | "D"; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d={PILLAR_GLYPH[pillar]} {...NS} />
    </svg>
  );
}
