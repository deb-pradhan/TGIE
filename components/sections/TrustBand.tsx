import { site } from "@/content/site";
import { FrameBlock } from "@/components/frame/Grid";

export function TrustBand() {
  return (
    <FrameBlock>
      <div className="rounded-[6px] bg-forest-deep px-6 py-9 text-ondark">
        <p className="text-center font-mono text-[11.5px] uppercase tracking-[0.18em] text-ondark-mut">
          {site.trust.caption}
        </p>
        <div className="mx-auto mt-7 grid max-w-[var(--maxw)] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {site.trust.logos.map((logo) => (
            <div key={logo} className="notch-cell">
              <div className="grid h-16 place-items-center px-4 text-center text-[15px] font-medium tracking-wide text-ondark/90">
                {logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </FrameBlock>
  );
}
