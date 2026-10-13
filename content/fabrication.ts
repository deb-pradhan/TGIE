/** Heavy Fabrication (Pillar D) page. Showcase content: flow, the gap, stats. */

export const fabrication = {
  process: {
    eyebrow: "Single-source accountability",
    line1: "One Purchase Order,",
    line2: "from RFQ to a delivered structure.",
    steps: [
      {
        n: "Step 01",
        title: "RFQ & sourcing",
        scope: "Requirements, quoting, and material sourcing. One point of contact.",
      },
      {
        n: "Step 02",
        title: "Cutting & bending",
        scope: "Laser, plasma, and a 320-ton CNC press brake, in-house.",
      },
      {
        n: "Step 03",
        title: "Fabrication & welding",
        scope: "Assembly and certified GMAW (MIG) / SMAW (ARC) welding.",
      },
      {
        n: "Step 04",
        title: "Coating & logistics",
        scope: "Machining, galvanizing/powder coating, and delivery.",
      },
    ],
  },

  gap: {
    eyebrow: "Why heavy fabrication is its own pillar",
    heading: "A validated design still isn't a delivered structure.",
    photoCaption: "In the shop: certified GMAW and SMAW welding",
    body: "Clients issue a single Purchase Order and TGIE manages everything from sourcing to logistics, so there is no fragmented fab chain to coordinate.",
  },

  stats: {
    eyebrow: "Built at industrial scale",
    items: [
      { value: "ISO 9001", label: "2015 certified", note: "Process control & QC", icon: "quality" },
      { value: "~200 t", label: "Per month", note: "Fabricated material", icon: "gear" },
      { value: "250mm", label: "Plasma cut", note: "Mild steel capacity", icon: "laser" },
      { value: "1 PO", label: "Single source", note: "RFQ to logistics", icon: "accountability" },
    ],
  },

  ownership: {
    eyebrow: "Delivered with the paperwork",
    heading: "Certified, documented,",
    headingMuted: "delivered.",
    body: "Every fabrication engagement ships with mill certificates, Welding Procedure Specifications (WPS), and test reports. The QC documentation industrial OEMs and heavy-equipment manufacturers need on file.",
    docs: ["Mill certificates", "WPS", "Test reports"],
  },

  categories: {
    eyebrow: "Product categories",
    heading: "What comes off the floor",
    items: [
      "Transformer tanks (oil-cooled, pressure-tested)",
      "Multi-louver dampers",
      "Industrial furnace components",
      "Heavy equipment skid bases",
      "Structural frames",
      "Custom heavy mild-steel components",
    ],
  },

  sectors: {
    eyebrow: "Industry sectors",
    heading: "Who we build it for",
    items: [
      "Heavy equipment & construction machinery",
      "Transformers & power equipment",
      "Industrial furnaces & thermal systems",
    ],
  },
};
