import { cn } from "@/lib/cn";

export type IsoVariant =
  | "iso-boards"
  | "iso-lab"
  | "iso-factory"
  | "iso-legal"
  | "iso-market";

const icons: Record<IsoVariant, string> = {
  "iso-boards": "M-9 -2h18v10h-18z M-9 2h18 M-3 -2v10 M4 -2v10",
  "iso-lab": "M-6 -6l0 5 -4 8a2 2 0 002 3h16a2 2 0 002 -3l-4 -8 0 -5 M-6 -6h12",
  "iso-factory": "M-9 8v-8l5 4v-4l5 4v-4l5 4v4z",
  "iso-legal": "M-9 8h18 M-6 8v-9l6 -4 6 4v9 M-2 8v-4h4v4",
  "iso-market": "M-9 -3l2 11h14l2 -11 M-9 -3h18 M-4 2v3 M0 1v4 M4 2v3",
};

/**
 * Isometric scene (design system §7.1). `bare` drops the card frame so it can
 * fill a bento cell that already supplies the iso-grid background.
 */
export function IsoScene({
  variant,
  className,
  bare = false,
}: {
  variant: IsoVariant;
  className?: string;
  bare?: boolean;
}) {
  const svg = (
    <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label="Isometric illustration">
      <path d="M110 150 L210 96" stroke="var(--color-teal)" strokeWidth="1.5" strokeDasharray="5 5" fill="none" />
      <Puck cx={230} cy={78} scale={0.72} />
      <Puck cx={130} cy={150} scale={1} iconPath={icons[variant]} />
    </svg>
  );

  if (bare) {
    return <div className={cn("relative h-full w-full", className)}>{svg}</div>;
  }

  return (
    <div className={cn("iso-grid relative aspect-[4/3] w-full overflow-hidden rounded-card border border-line bg-[#eef2ee]", className)}>
      <div className="absolute inset-0">{svg}</div>
    </div>
  );
}

function Puck({
  cx,
  cy,
  scale = 1,
  iconPath,
}: {
  cx: number;
  cy: number;
  scale?: number;
  iconPath?: string;
}) {
  const w = 92 * scale;
  const h = 46 * scale;
  const depth = 12 * scale;
  return (
    <g>
      <path
        d={`M${cx - w / 2} ${cy} L${cx} ${cy + h / 2} L${cx + w / 2} ${cy} L${cx + w / 2} ${cy + depth} L${cx} ${cy + h / 2 + depth} L${cx - w / 2} ${cy + depth} Z`}
        fill="#dfe7e2"
      />
      <path
        d={`M${cx - w / 2} ${cy} L${cx} ${cy - h / 2} L${cx + w / 2} ${cy} L${cx} ${cy + h / 2} Z`}
        fill="#ffffff"
        stroke="var(--color-line)"
        strokeWidth="1"
      />
      {iconPath && (
        <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
          <path
            d={iconPath}
            fill="none"
            stroke="var(--color-teal)"
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            transform="scale(1,0.55)"
          />
        </g>
      )}
    </g>
  );
}
