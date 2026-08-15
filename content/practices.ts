import type { IsoVariant } from "@/components/illustration/Iso";

export type Capability = { title: string; note: string };

export type Practice = {
  slug: string;
  index: string;
  name: string;
  short: string; // nav label
  tagline: string; // mega-menu one-liner
  position: string; // point-of-view line
  body: string; // "the body it gives"
  weight: string; // "the weight it lifts"
  capabilities: Capability[];
  illustration: IsoVariant;
};

export const practices: Practice[] = [
  {
    slug: "engineering",
    index: "01",
    name: "Embedded Systems & Hardware",
    short: "Engineering",
    tagline: "Hardware & firmware, built from zero.",
    position: "We build from zero, because off-the-shelf compromises the science.",
    body: "a physical body — silicon, firmware, enclosure",
    weight: "building it from zero",
    capabilities: [
      { title: "Custom PCB design", note: "Up to 6 layers, DFM-ready Gerber" },
      { title: "Bare-metal firmware", note: "C/C++, FreeRTOS, ESP-IDF, nRF, STM32" },
      { title: "3D enclosures", note: "PETG · ABS · PLA, ergonomic housings" },
      { title: "Edge AI / TinyML", note: "On-device inference, Edge Impulse" },
    ],
    illustration: "iso-boards",
  },
  {
    slug: "research",
    index: "02",
    name: "Research & Academic Prototyping",
    short: "Research",
    tagline: "Apparatus as rigorous as your method.",
    position: "Your thesis deserves apparatus as rigorous as your method.",
    body: "a credible body — calibrated, field-ready apparatus",
    weight: "proving the data can be trusted",
    capabilities: [
      { title: "Thesis-grade builds", note: "Calibrated, field-ready delivery" },
      { title: "Zero packet loss", note: "Continuous high-frequency sampling" },
      { title: "Grant-phased delivery", note: "PoC → EVT → DVT → Launch" },
      { title: "In-house collaboration", note: "Iterate beside our engineers" },
    ],
    illustration: "iso-lab",
  },
  {
    slug: "fabrication",
    index: "03",
    name: "Fabrication & Manufacturing",
    short: "Fabrication",
    tagline: "One unit into a batch that behaves the same.",
    position: "The gap between one unit and a hundred is where most research dies.",
    body: "a repeatable body — units, not one-offs",
    weight: "holding quality at volume",
    capabilities: [
      { title: "Small-batch runs", note: "10–20 units for pilots" },
      { title: "SMD assembly", note: "Vetted domestic & global partners" },
      { title: "Bridge production", note: "In-house high-speed 3D printing" },
      { title: "Test jigs & QC", note: "Consistency across every batch" },
    ],
    illustration: "iso-factory",
  },
  {
    slug: "enablement",
    index: "04",
    name: "Business Enablement & Advisory",
    short: "Business Enablement",
    tagline: "The company around the idea.",
    position: "A prototype is not a company. We build the company too.",
    body: "a legal body — entity, compliance, operations",
    weight: "structure, audit, and admin",
    capabilities: [
      { title: "Incorporation", note: "India · Dubai/UAE · USA" },
      { title: "Audit & compliance", note: "Grant utilization, BOM traceability" },
      { title: "Branding & identity", note: "Naming, logo, positioning" },
      { title: "Operations", note: "Sourcing, fulfillment, SOPs" },
    ],
    illustration: "iso-legal",
  },
  {
    slug: "fundraising-gtm",
    index: "05",
    name: "Fundraising & GTM",
    short: "Fundraising & GTM",
    tagline: "The last distance — capital and the market.",
    position: "We carry it the last distance — into capital and the market.",
    body: "a market body — brand, capital, customers",
    weight: "reaching investors and buyers",
    capabilities: [
      { title: "Grants & schemes", note: "DST-NIDHI · BIRAC BIG · MeitY" },
      { title: "Investor access & pitch", note: "Deck, financial model, angels" },
      { title: "Go-to-market", note: "D2C & B2B channel plan" },
      { title: "Marketplace & Amazon", note: "Listing, A+ content, reviews" },
    ],
    illustration: "iso-market",
  },
];
