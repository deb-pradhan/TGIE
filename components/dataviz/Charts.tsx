/* ---------------- Stat tile ---------------- */
export function StatTile({ value, label, unit }: { value: string; label: string; unit?: string }) {
  return (
    <div>
      <div className="text-[26px] font-medium tracking-tight text-ink">
        {value}
        {unit && <span className="ml-1 text-[13px] font-medium text-accent-deep">{unit}</span>}
      </div>
      <div className="mt-0.5 text-[12.5px] text-muted">{label}</div>
    </div>
  );
}
