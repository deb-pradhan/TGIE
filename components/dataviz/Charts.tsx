import { cn } from "@/lib/cn";

/* ---------------- Donut ---------------- */
export function Donut({
  value,
  label,
  size = 74,
}: {
  value: number;
  label?: string;
  size?: number;
}) {
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  const dash = (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${value}%${label ? ` ${label}` : ""}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e7edea" strokeWidth="6" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="fill-ink" fontSize="14" fontWeight="500">
        {value}%
      </text>
    </svg>
  );
}

/* ---------------- Gauge ---------------- */
export function Gauge({ value, unit = "Available" }: { value: string; unit?: string }) {
  // 270° arc
  const r = 52;
  const cx = 70;
  const cy = 70;
  const start = 135;
  const sweep = 270 * 0.68;
  const pt = (ang: number) => {
    const a = (ang * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const arc = (from: number, to: number) => {
    const [x1, y1] = pt(from);
    const [x2, y2] = pt(to);
    const large = to - from > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };
  return (
    <svg width="140" height="128" viewBox="0 0 140 128" role="img" aria-label={`${value} ${unit}`}>
      <defs>
        <linearGradient id="gaugeg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-teal-deep)" />
          <stop offset="1" stopColor="var(--color-teal-soft)" />
        </linearGradient>
      </defs>
      <path d={arc(start, start + 270)} fill="none" stroke="#e7edea" strokeWidth="9" strokeLinecap="round" />
      <path d={arc(start, start + sweep)} fill="none" stroke="url(#gaugeg)" strokeWidth="9" strokeLinecap="round" />
      <text x="70" y="66" textAnchor="middle" className="fill-ink" fontSize="24" fontWeight="500">
        {value}
      </text>
      <text x="70" y="88" textAnchor="middle" className="fill-muted" fontSize="10">
        {unit}
      </text>
    </svg>
  );
}

/* ---------------- Bar chart ---------------- */
export function BarChart({ data, className }: { data: number[]; className?: string }) {
  const max = Math.max(...data);
  return (
    <svg viewBox="0 0 220 90" preserveAspectRatio="none" className={cn("h-[90px] w-full", className)} role="img" aria-label="Activity volume by month">
      <defs>
        <linearGradient id="barg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-teal-soft)" />
          <stop offset="1" stopColor="var(--color-teal)" />
        </linearGradient>
      </defs>
      {data.map((d, i) => {
        const w = 220 / data.length;
        const h = (d / max) * 78;
        return (
          <rect
            key={i}
            x={i * w + w * 0.18}
            y={90 - h}
            width={w * 0.64}
            height={h}
            rx="3"
            fill="url(#barg)"
          />
        );
      })}
    </svg>
  );
}

/* ---------------- Line chart ---------------- */
export function LineChart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 90" preserveAspectRatio="none" className={cn("h-full w-full", className)} role="img" aria-label="Workload trend over time">
      <defs>
        <linearGradient id="lineg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-teal)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--color-teal)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 84 C40 78 60 40 100 44 S170 18 220 8 L220 90 L0 90 Z" fill="url(#lineg)" />
      <path d="M0 84 C40 78 60 40 100 44 S170 18 220 8" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- Stat tile ---------------- */
export function StatTile({ value, label, unit }: { value: string; label: string; unit?: string }) {
  return (
    <div>
      <div className="text-[26px] font-medium tracking-tight text-ink">
        {value}
        {unit && <span className="ml-1 text-[13px] font-medium text-teal">{unit}</span>}
      </div>
      <div className="mt-0.5 text-[12.5px] text-muted">{label}</div>
    </div>
  );
}

/* ---------------- Dashboard mock (illustration) ---------------- */
/**
 * A tiny live-telemetry dashboard drawn in the same hand-built style as the
 * charts above: teal line + area, rounded-top bars, stat tiles, a donut and a
 * pulsing live dot. Decorative; fills its parent (use inside a Live frame so
 * the .ill-* motion only runs on screen).
 */
export function DashboardMock({ className }: { className?: string }) {
  const bars = [34, 52, 41, 63, 48, 72, 58, 80, 66, 90, 74, 62, 84, 96];
  const bw = 190 / bars.length;
  const donutR = 19;
  const donutC = 2 * Math.PI * donutR;
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet" className={cn("absolute inset-0 h-full w-full", className)} aria-hidden>
      <defs>
        <linearGradient id="dm-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-teal)" stopOpacity="0.2" />
          <stop offset="1" stopColor="var(--color-teal)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dm-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-teal-soft)" />
          <stop offset="1" stopColor="var(--color-teal)" />
        </linearGradient>
        <filter id="dm-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <rect x="34" y="30" width="332" height="216" rx="14" fill="#1c1b18" opacity="0.1" filter="url(#dm-shadow)" />
      <rect x="28" y="18" width="344" height="222" rx="14" fill="#fff" stroke="var(--color-line)" />

      {/* header */}
      <circle cx="50" cy="40" r="4" fill="var(--color-teal)" />
      <circle cx="50" cy="40" r="4" fill="none" stroke="var(--color-teal)" className="ill-ping" />
      <text x="62" y="44" fontSize="11.5" fontWeight="500" className="fill-ink">Live telemetry</text>
      <g fontSize="9" fontWeight="500" textAnchor="middle">
        <rect x="262" y="29" width="26" height="20" rx="6" fill="none" />
        <text x="275" y="42.5" className="fill-muted">1h</text>
        <rect x="292" y="29" width="32" height="20" rx="6" fill="var(--color-mint)" />
        <text x="308" y="42.5" fill="var(--color-teal-deep)">24h</text>
        <rect x="328" y="29" width="30" height="20" rx="6" fill="none" />
        <text x="343" y="42.5" className="fill-muted">7d</text>
      </g>

      {/* line chart */}
      <g stroke="#ece9e0" strokeWidth="1">
        {[72, 102, 132, 162].map((y) => (
          <path key={y} d={`M62 ${y} H252`} />
        ))}
      </g>
      <g fontSize="8" textAnchor="end" className="fill-muted">
        <text x="54" y="75">120</text>
        <text x="54" y="105">80</text>
        <text x="54" y="135">40</text>
        <text x="54" y="165">0</text>
      </g>
      <path d="M62 150 C84 146 92 112 112 118 S142 140 160 108 S196 84 210 96 S236 78 252 82 L252 162 L62 162 Z" fill="url(#dm-area)" />
      <path d="M62 150 C84 146 92 112 112 118 S142 140 160 108 S196 84 210 96 S236 78 252 82" fill="none" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M62 156 C100 150 130 146 160 142 S220 128 252 124" fill="none" stroke="var(--color-muted-2)" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
      <circle cx="252" cy="82" r="8" fill="var(--color-teal)" opacity="0.18" className="ill-pulse" />
      <circle cx="252" cy="82" r="3.5" fill="#fff" stroke="var(--color-teal)" strokeWidth="2" />
      <rect x="222" y="58" width="32" height="15" rx="5" fill="var(--color-inkbtn)" />
      <text x="238" y="68.5" fontSize="8.5" fontWeight="500" textAnchor="middle" fill="#fff">72.4</text>

      {/* stat tiles */}
      <rect x="268" y="66" width="90" height="52" rx="10" fill="var(--color-card-soft)" stroke="var(--color-line)" />
      <text x="279" y="92" fontSize="21" fontWeight="500" className="fill-ink" style={{ fontFamily: "var(--font-mono), monospace" }}>98.2</text>
      <text x="334" y="92" fontSize="10" fontWeight="500" fill="var(--color-teal)">%</text>
      <text x="279" y="108" fontSize="8.5" className="fill-muted">Signal quality</text>
      <rect x="268" y="124" width="90" height="42" rx="10" fill="var(--color-card-soft)" stroke="var(--color-line)" />
      <text x="279" y="146" fontSize="17" fontWeight="500" className="fill-ink" style={{ fontFamily: "var(--font-mono), monospace" }}>4.2k</text>
      <text x="279" y="159" fontSize="8.5" className="fill-muted">samples / s</text>

      {/* bars */}
      <text x="62" y="186" fontSize="8.5" className="fill-muted">Steps per minute</text>
      {bars.map((d, i) => {
        const h = (d / 100) * 40;
        const last = i === bars.length - 1;
        return (
          <rect
            key={i}
            x={62 + i * bw + bw * 0.16}
            y={230 - h}
            width={bw * 0.68}
            height={h}
            rx="2.5"
            fill={last ? "var(--color-teal-deep)" : "url(#dm-bar)"}
            opacity={last ? 1 : 0.55 + i * 0.03}
          />
        );
      })}

      {/* donut */}
      <circle cx="318" cy="205" r={donutR} fill="none" stroke="#e7edea" strokeWidth="6" />
      <circle cx="318" cy="205" r={donutR} fill="none" stroke="var(--color-teal)" strokeWidth="6" strokeLinecap="round" strokeDasharray={`${donutC * 0.72} ${donutC}`} transform="rotate(-90 318 205)" />
      <text x="318" y="205" fontSize="9.5" fontWeight="500" textAnchor="middle" dominantBaseline="central" className="fill-ink">72%</text>
      <text x="318" y="236" fontSize="8" textAnchor="middle" className="fill-muted">on target</text>
    </svg>
  );
}
