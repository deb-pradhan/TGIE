import { cn } from "@/lib/cn";

/**
 * Retro pixel-art backdrop — ONLY ever behind a floating white card
 * (design system §7.3), never behind text. Purely decorative.
 */
export function PixelBackdrop({ className }: { className?: string }) {
  const px = 10; // pixel unit
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden rounded-card", className)}
      style={{
        imageRendering: "pixelated",
        background: "linear-gradient(180deg,#8fc3d8 0%,#a9d2df 46%,#7fae7c 46%,#6fa06d 100%)",
      }}
    >
      {/* sun */}
      <div
        className="absolute"
        style={{ top: px * 2, right: px * 3, width: px * 4, height: px * 4, background: "#f2d67a" }}
      />
      {/* clouds */}
      <div className="absolute" style={{ top: px * 3, left: px * 3, width: px * 5, height: px, background: "rgba(255,255,255,.75)" }} />
      <div className="absolute" style={{ top: px * 2, left: px * 4, width: px * 3, height: px, background: "rgba(255,255,255,.75)" }} />
      {/* rolling hills — stepped pixel bands */}
      <div
        className="absolute inset-x-0"
        style={{
          bottom: 0,
          height: "58%",
          backgroundImage:
            "repeating-linear-gradient(180deg,#4f9268 0 10px,#5aa070 10px 20px)",
        }}
      />
      {/* tree/building blocks */}
      <div className="absolute inset-x-0 bottom-0 flex h-[46%] items-end gap-[6px] px-2">
        {[40, 66, 34, 78, 50, 88, 44, 70, 36, 74, 52].map((h, i) => (
          <div
            key={i}
            className="flex-1"
            style={{
              height: `${h}%`,
              background: i % 3 === 0 ? "#2f6b57" : i % 3 === 1 ? "#3d7d66" : "#357a5a",
              boxShadow: "inset 0 6px 0 rgba(255,255,255,0.07), inset -3px 0 0 rgba(0,0,0,0.08)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
