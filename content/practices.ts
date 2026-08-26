import type { IsoVariant } from "@/components/illustration/Iso";

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
    position: "We build from zero, because off-the-shelf compromises the science.",
    body: "a physical form: silicon, firmware, enclosure",
    weight: "building it from zero",
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
    position: "Additive manufacturing, from a bespoke commission to a scalable retail line.",
    body: "objects at volume: enclosures, decor, parts, product",
    weight: "the tooling cost and lead time of injection molding",
    capabilities: [
      { title: "Industrial enclosures", note: "PA-CF, PET-CF ruggedized housings" },
      { title: "Kinetic IoT & decor", note: "Motorized, connected desktop art" },
      { title: "Automotive plastics", note: "Discontinued & custom cabin parts" },
      { title: "Retail & e-commerce", note: "High-margin Amazon / D2C runs" },
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
    body: "a legal, fundable form. The company around the idea",
    weight: "incorporation, compliance, capital, and admin",
    capabilities: [
      { title: "Branding & marketing", note: "Identity, Amazon, D2C content" },
      { title: "Startup services", note: "Incorporation, compliance, and fundraising" },
      { title: "Fundraising & GTM", note: "DST-NIDHI, BIRAC BIG, MeitY, angels" },
      { title: "Audit & operations", note: "Compliance, BOM traceability, SOPs" },
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
    body: "a production-grade structure: steel, welded, certified",
    weight: "the vendor-coordination burden of a fragmented fab chain",
    capabilities: [
      { title: "Single-source accountability", note: "RFQ to logistics, one PO" },
      { title: "In-house machinery", note: "Laser, plasma, 320-ton press brake" },
      { title: "Certified welding", note: "GMAW (MIG) and SMAW (ARC)" },
      { title: "QA & documentation", note: "ISO 9001:2015, mill certs, WPS" },
    ],
    illustration: "iso-factory",
  },
];
