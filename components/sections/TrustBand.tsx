import { site } from "@/content/site";
import { FrameBlock } from "@/components/frame/Grid";
import { TrustGlyph } from "@/components/illustration/home/TrustGlyphs";

export function TrustBand() {
  return (
    <FrameBlock>
      <div className="rounded-[6px] bg-graphite-deep px-6 py-9 text-ondark">
        <p className="text-center font-mono text-[11.5px] uppercase tracking-[0.18em] text-ondark-mut">
          {site.trust.caption}
        </p>
        <div className="mx-auto mt-7 grid max-w-[var(--maxw)] grid-cols-2 gap-3 lg:grid-cols-5">
          {site.trust.logos.map((logo, i) => (
            <div key={logo} className="notch-cell max-lg:last:col-span-2">
              <div className="flex min-h-[140px] flex-col items-center justify-start gap-2.5 px-3 pb-4 pt-5 text-center">
                <TrustGlyph name={logo} />
                <span className="text-[14px] font-medium leading-tight tracking-wide text-ondark/90">
                  {logo}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ondark-mut">
                  {site.trust.hints[i]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FrameBlock>
  );
}
