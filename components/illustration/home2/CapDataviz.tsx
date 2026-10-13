import { useId } from "react";
import { Live } from "../Live";

const BARS = [34, 52, 41, 63, 48, 72, 58, 80, 66, 90, 74, 62, 84, 96];
const BW = 190 / BARS.length;
const DONUT_R = 19;
const DONUT_C = 2 * Math.PI * DONUT_R;

/**
 * Full-stack data viz: a mini live-telemetry dashboard on a soft card.
 * Axis ticks and sub-captions are left out on purpose so every remaining label
 * stays legible when the 400-unit viewBox is scaled down to a card column.
 */
export function CapDataviz() {
  const uid = useId();
  const areaId = `${uid}-area`;
  const barId = `${uid}-bar`;
  const shadowId = `${uid}-shadow`;
  return (
    <div className="relative h-full w-full overflow-hidden bg-card-soft">
      <Live>
        <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.2" />
              <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={barId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--color-accent-soft)" />
              <stop offset="1" stopColor="var(--color-accent)" />
            </linearGradient>
            <filter id={shadowId} x="-10%" y="-10%" width="120%" height="130%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          <rect x="34" y="30" width="332" height="216" rx="14" fill="#0d0f0e" opacity="0.1" filter={`url(#${shadowId})`} />
          <rect x="28" y="18" width="344" height="222" rx="14" fill="#fff" stroke="var(--color-line)" />

          {/* header */}
          <circle cx="50" cy="40" r="4" fill="var(--color-accent)" />
          <circle cx="50" cy="40" r="4" fill="none" stroke="var(--color-accent)" className="ill-ping" />
          <text x="62" y="45.5" fontSize="14" fontWeight="500" className="fill-ink">Live telemetry</text>
          <rect x="322" y="28" width="38" height="22" rx="6" fill="var(--color-accent-pale)" />
          <text x="341" y="43.5" fontSize="13.5" fontWeight="500" textAnchor="middle" fill="var(--color-accent-deep)">24h</text>

          {/* line chart (no axis ticks) */}
          <g transform="translate(-14 0)">
            <g stroke="var(--color-line)" strokeWidth="1">
              {[72, 102, 132, 162].map((y) => (
                <path key={y} d={`M62 ${y} H252`} />
              ))}
            </g>
            <path d="M62 150 C84 146 92 112 112 118 S142 140 160 108 S196 84 210 96 S236 78 252 82 L252 162 L62 162 Z" fill={`url(#${areaId})`} />
            <path d="M62 150 C84 146 92 112 112 118 S142 140 160 108 S196 84 210 96 S236 78 252 82" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M62 156 C100 150 130 146 160 142 S220 128 252 124" fill="none" stroke="var(--color-muted-2)" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
            <circle cx="252" cy="82" r="8" fill="var(--color-accent)" opacity="0.18" className="ill-pulse" />
            <circle cx="252" cy="82" r="3.5" fill="#fff" stroke="var(--color-accent)" strokeWidth="2" />
            <rect x="210" y="50" width="44" height="21" rx="5" fill="var(--color-inkbtn)" />
            <text x="232" y="65" fontSize="13" fontWeight="500" textAnchor="middle" fill="#fff">72.4</text>
          </g>

          {/* stat tiles */}
          <rect x="250" y="66" width="108" height="52" rx="10" fill="var(--color-card-soft)" stroke="var(--color-line)" />
          <text x="261" y="90" fontSize="22" fontWeight="500" className="fill-ink" style={{ fontFamily: "var(--font-mono), monospace" }}>98.2</text>
          <text x="319" y="90" fontSize="14" fontWeight="500" fill="var(--color-accent-deep)">%</text>
          <text x="261" y="109" fontSize="13.5" className="fill-muted">Signal</text>
          <rect x="250" y="124" width="108" height="42" rx="10" fill="var(--color-card-soft)" stroke="var(--color-line)" />
          <text x="261" y="146" fontSize="18" fontWeight="500" className="fill-ink" style={{ fontFamily: "var(--font-mono), monospace" }}>4.2k</text>
          <text x="306" y="146" fontSize="13.5" className="fill-muted">/ s</text>

          {/* bars */}
          {BARS.map((d, i) => {
            const h = (d / 100) * 40;
            const last = i === BARS.length - 1;
            return (
              <rect
                key={i}
                x={46 + i * BW + BW * 0.16}
                y={230 - h}
                width={BW * 0.68}
                height={h}
                rx="2.5"
                fill={last ? "var(--color-accent-deep)" : `url(#${barId})`}
                opacity={last ? 1 : 0.55 + i * 0.03}
              />
            );
          })}

          {/* donut */}
          <circle cx="318" cy="205" r={DONUT_R} fill="none" stroke="var(--color-line)" strokeWidth="6" />
          <circle cx="318" cy="205" r={DONUT_R} fill="none" stroke="var(--color-accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${DONUT_C * 0.72} ${DONUT_C}`} transform="rotate(-90 318 205)" />
          <text x="318" y="205" fontSize="14" fontWeight="500" textAnchor="middle" dominantBaseline="central" className="fill-ink">72%</text>
        </svg>
      </Live>
    </div>
  );
}
