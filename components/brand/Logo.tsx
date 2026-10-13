/** TGIE "Cell T" mark: a T cut from collage cells, stem cell in teal. */
export function LogoMark({ size = 28, dark = false }: { size?: number; dark?: boolean }) {
  const main = dark ? "#eaf1ed" : "#0f3a2e";
  const accent = dark ? "#6fd0bb" : "#2fae97";
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 64 64" className="shrink-0">
      <g fill={main} opacity=".16">
        <rect x="0" y="22.5" width="19" height="19" rx="4.5" />
        <rect x="45" y="22.5" width="19" height="19" rx="4.5" />
        <rect x="0" y="45" width="19" height="19" rx="4.5" />
        <rect x="45" y="45" width="19" height="19" rx="4.5" />
      </g>
      <g fill={main}>
        <rect x="0" y="0" width="19" height="19" rx="4.5" />
        <rect x="22.5" y="0" width="19" height="19" rx="4.5" />
        <rect x="45" y="0" width="19" height="19" rx="4.5" />
        <rect x="22.5" y="22.5" width="19" height="19" rx="4.5" />
      </g>
      <rect x="22.5" y="45" width="19" height="19" rx="4.5" fill={accent} />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <LogoMark size={28} dark={dark} />
      TGIE
    </>
  );
}
