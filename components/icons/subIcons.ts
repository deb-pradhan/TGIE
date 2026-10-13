import type { IconName } from "./Icon";

/** Pillar slug to icon. */
export const pillarIcons: Record<string, IconName> = {
  engineering: "engineering",
  products: "products",
  enablement: "enablement",
  fabrication: "fabrication",
};

/** Sub-page slug to icon (content/practiceDetail.ts slugs). */
export const subIcons: Record<string, IconName> = {
  "custom-pcb-design": "pcb",
  "3d-enclosures": "enclosure",
  "embedded-firmware": "firmware",
  "edge-ai-tinyml": "edge-ai",
  "data-dashboards": "dashboard",
  "small-batch-production": "small-batch",
  "industrial-enclosures": "industrial-enclosure",
  "kinetic-iot-decor": "kinetic",
  "automotive-plastics": "automotive",
  "scale-miniatures": "miniature",
  "retail-ecommerce": "retail",
  "branding-marketing": "branding",
  incorporation: "incorporation",
  "funding-investor-access": "funding",
  "audit-compliance": "audit",
  "lead-gen-networking": "leads",
  operations: "operations",
  "single-source-accountability": "accountability",
  "machinery-welding": "welding",
  "partner-network-ops": "partners",
  "quality-documentation": "quality",
};
