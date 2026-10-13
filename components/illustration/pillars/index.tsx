import type { ReactNode } from "react";
import { EngineeringScene } from "./EngineeringScene";
import { ProductsScene } from "./ProductsScene";
import { EnablementScene } from "./EnablementScene";
import { FabricationScene } from "./FabricationScene";

const scenes: Record<string, () => ReactNode> = {
  engineering: EngineeringScene,
  products: ProductsScene,
  enablement: EnablementScene,
  fabrication: FabricationScene,
};

/** Signature isometric scene for a pillar slug. Fills its parent (which must supply size). */
export function PillarScene({ slug }: { slug: string }) {
  const Scene = scenes[slug];
  return Scene ? <Scene /> : null;
}

export { EngineeringScene, ProductsScene, EnablementScene, FabricationScene };
