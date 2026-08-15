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
