import type { IsoVariant } from "@/components/illustration/Iso";
import type { IconName } from "@/components/icons/Icon";

export type Capability = { title: string; note: string };

export type Practice = {
  slug: string;
  index: string; // pillar letter, A / B / C / D
  name: string;
  short: string; // nav label
  tagline: string; // mega-menu one-liner
  position: string; // point-of-view line
  body: string; // "the form it gives"
  weight: string; // "the weight it lifts"
  capabilities: Capability[];
  illustration: IsoVariant;
};

/**
 * The four pillars (portfolio v2). Capabilities are organized across:
 *  A. Embedded Hardware & Engineering
 *  B. Additive Manufacturing & Product Lines
 *  C. Business Enablement & Advisory
 *  D. Heavy Fabrication & Manufacturing
 * Their combination under one roof, with single-source accountability, is
 * the core differentiator no regional competitor currently replicates.
 */
export const practices: Practice[] = [
  {
    slug: "engineering",
    index: "A",
    name: "Embedded Hardware & Engineering",
    short: "Engineering",
    tagline: "Silicon, firmware, and enclosures, built from zero.",
    position: "Off-the-shelf boards fail exactly where research gets interesting. We build hardware that survives the edge cases your data depends on.",
    body: "Working hardware: silicon, firmware, and enclosure.",
    weight: "Building it from zero.",
    capabilities: [
      { title: "Custom PCB & schematic", note: "Up to 6 layers, DFM-ready Gerber" },
      { title: "Embedded firmware", note: "Bare-metal, FreeRTOS, BLE/GATT" },
      { title: "3D enclosures", note: "Designed with the PCB footprint" },
      { title: "Edge AI / TinyML", note: "On-device inference, no cloud" },
    ],
    illustration: "iso-boards",
  },
  {
    slug: "products",
    index: "B",
    name: "Additive Manufacturing & Product Lines",
    short: "Products",
    tagline: "One process, from a single replica to a retail run.",
    position: "One print process takes you from a bespoke commission to a scalable retail line, with no mold to pay for.",
    body: "Objects at volume: enclosures, decor, parts, and product lines.",
    weight: "The tooling cost and lead time of injection molding.",
    capabilities: [
      { title: "Industrial enclosures", note: "PA-CF, PET-CF ruggedized housings" },
      { title: "Kinetic IoT & decor", note: "Motorized, connected desktop art" },
      { title: "Automotive plastics", note: "Discontinued & custom cabin parts" },
      { title: "Retail & e-commerce", note: "Curated Amazon / D2C product runs" },
    ],
    illustration: "iso-market",
  },
  {
    slug: "enablement",
    index: "C",
    name: "Business Enablement & Advisory",
    short: "Enablement",
    tagline: "The company, capital, and market around the idea.",
    position: "A prototype is not a company. We build the company too.",
    body: "A legal, fundable company around the idea.",
    weight: "Incorporation, compliance, capital, and admin.",
    capabilities: [
      { title: "Branding & marketing", note: "Identity, Amazon, D2C content" },
      { title: "Company incorporation", note: "India, UAE, and USA entities" },
      { title: "Fundraising & GTM", note: "DST-NIDHI, BIRAC BIG, MeitY, angels" },
      { title: "Corporate audit", note: "Compliance, BOM traceability, SOPs" },
    ],
    illustration: "iso-legal",
  },
  {
    slug: "fabrication",
    index: "D",
    name: "Heavy Fabrication & Manufacturing",
    short: "Fabrication",
    tagline: "Heavy structural fabrication. Single-source, ISO 9001 certified.",
    position: "One Purchase Order, from RFQ to a delivered, certified structure.",
    body: "A production-grade structure: steel, welded, certified.",
    weight: "The vendor-coordination burden of a fragmented fab chain.",
    capabilities: [
      { title: "Single-source accountability", note: "RFQ to logistics, one PO" },
      { title: "In-house machinery", note: "Laser, plasma, 320-ton press brake" },
      { title: "Certified welding", note: "GMAW (MIG) and SMAW (ARC)" },
      { title: "QA & documentation", note: "ISO 9001:2015, mill certs, WPS" },
    ],
    illustration: "iso-factory",
  },
];

/** Icon for each sub-service tile on the pillar pages, keyed by sub slug. */
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

/** Shared copy for the pillar pages' form / weight band and the closing tile. */
export const pillarPage = {
  form: { eyebrow: "The form we give", icon: "form" as IconName },
  weight: { eyebrow: "The weight we lift", icon: "weight" as IconName },
  capabilities: {
    eyebrow: "What we deliver",
    line1: "Everything in this pillar,",
    line2: "under one accountable team.",
  },
  tilesCta: {
    href: "/start",
    title: "Something between the pillars?",
    note: "Most projects cross more than one. Describe the idea and we will scope the whole path.",
    cta: "Start a project",
  },
};
