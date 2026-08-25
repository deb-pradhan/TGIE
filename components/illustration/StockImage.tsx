import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Interim stock photo that fills its container (object-cover). Used as a
 * placeholder in illustration cells while bespoke visuals are produced.
 */
export function StockImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
    </div>
  );
}
