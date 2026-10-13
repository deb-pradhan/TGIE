import type { ReactNode } from "react";
import { C } from "../kit";

/**
 * Original generic glyphs for the trust band (not trademarked logos).
 * 48x48, accent-soft line work on graphite, one accent dot each. Decorative.
 */
const L = {
  fill: "none",
  stroke: C.accentSoft,
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
const D = { ...L, strokeOpacity: 0.45 } as const;

const glyphs: Record<string, ReactNode> = {
  /* RTOS: three tasks on one timeline, handing the CPU over (context switch) */
  FreeRTOS: (
    <g>
      <path
        d="M28.8 10.8A14 14 0 0 1 37.8 26.4M40.9 23.9L37.8 26.4L35.7 23.0M33.0 34.7A14 14 0 0 1 15.0 34.7M15.6 38.6L15.0 34.7L19.0 34.7M10.2 26.4A14 14 0 0 1 19.2 10.8M15.5 9.4L19.2 10.8L17.3 14.3"
        {...L}
      />
      <circle cx="24.0" cy="10.0" r="3.2" fill={C.accentSoft} />
      <circle cx="36.1" cy="31.0" r="3.2" {...L} />
      <circle cx="11.9" cy="31.0" r="3.2" {...L} />
      <path d="M20 24h8M24 21v6" {...D} />
    </g>
  ),
  /* MCU die in a package with pins */
  STM32CubeMX: (
    <g>
      <rect x="12" y="12" width="24" height="24" rx="3" {...L} />
      <rect x="18.5" y="18.5" width="11" height="11" rx="1.5" {...D} />
      <path
        d="M17 7v5M24 7v5M31 7v5M17 36v5M24 36v5M31 36v5M7 17h5M7 24h5M7 31h5M36 17h5M36 24h5M36 31h5"
        {...L}
      />
      <circle cx="16" cy="16" r="1.4" fill={C.accentSoft} />
    </g>
  ),
  /* radio link: a node, waves, and a small attribute tree (own mark, not the BT rune) */
  "BLE/GATT": (
    <g>
      <circle cx="24" cy="24" r="3.4" fill={C.accentSoft} />
      <path
        d="M29.7 18.3A8 8 0 0 1 29.7 29.7M18.3 18.3A8 8 0 0 0 18.3 29.7M33.9 14.1A14 14 0 0 1 33.9 33.9M14.1 14.1A14 14 0 0 0 14.1 33.9M38.1 9.9A20 20 0 0 1 38.1 38.1M9.9 9.9A20 20 0 0 0 9.9 38.1"
        {...L}
      />
      <path d="M24 28v8M24 36h-5M24 36h5" {...D} />
    </g>
  ),
  /* packet stream: every packet arrives */
  "Zero Data-Packet Loss": (
    <g>
      <rect x="4" y="18" width="8" height="12" rx="2" {...L} />
      <rect x="16" y="18" width="8" height="12" rx="2" {...L} />
      <rect x="28" y="18" width="8" height="12" rx="2" {...L} />
      <path d="M12 24h4M24 24h4M36 24h3" {...D} />
      <path d="M40 24l-3-3M40 24l-3 3" {...L} />
      <path d="M8 36h32" {...D} />
      <path d="M17 11l3 3 6-6" {...L} />
      <circle cx="8" cy="24" r="1.4" fill={C.accentSoft} />
    </g>
  ),
  /* Gerber: a stack of copper layers */
  "DFM-Ready Gerber": (
    <g>
      <path d="M24 6l17 8-17 8-17-8Z" {...L} />
      <path d="M7 22l17 8 17-8" {...D} />
      <path d="M7 30l17 8 17-8" {...D} />
      <path d="M17 14h8l4 2M22 18l5-2" {...D} />
      <circle cx="24" cy="14" r="1.6" fill={C.accentSoft} />
      <path d="M36 36l3 3 5-6" {...L} />
    </g>
  ),
};

export function TrustGlyph({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 48 48" className="h-11 w-11" aria-hidden>
      {glyphs[name] ?? null}
    </svg>
  );
}
