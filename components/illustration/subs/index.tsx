import type { ReactNode } from "react";
import { engineeringArt } from "./engineering";
import { productsArt } from "./products";
import { enablementArt } from "./enablement";
import { fabricationArt } from "./fabrication";

const registry: Record<string, () => ReactNode> = {
  ...engineeringArt,
  ...productsArt,
  ...enablementArt,
  ...fabricationArt,
};

/** Illustration for a sub-service page, by slug. Returns null if none is registered. */
export function SubArt({ slug }: { slug: string }) {
  const Art = registry[slug];
  return Art ? <>{Art()}</> : null;
}
