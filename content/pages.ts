/** Supporting content: Work, Insights, Company. Plus shared positioning assets. */

/* --------------------------------------------------------- shared: audiences */
/** Three audiences, one accountable team (portfolio v2). */
export const audiences = {
  eyebrow: "Who we serve",
  line1: "Three audiences,",
  line2: "one accountable roof.",
  lead: "The same team, dialed to who's in the room: a PhD scholar, a founder, or an industrial buyer.",
  items: [
    {
      title: "Research labs & PhD scholars",
      note: "Field-ready custom hardware, calibrated, documented, and yours to publish.",
      tag: "Serves pillars A + B",
    },
    {
      title: "Founders & academic spin-offs",
      note: "A validated prototype taken through fabrication, branding, incorporation, and launch.",
      tag: "Serves pillars A + B + C",
    },
    {
      title: "Industrial & OEM clients",
      note: "Heavy structural fabrication at scale, under single-source accountability.",
      tag: "Serves pillar D",
    },
  ],
};

/* ------------------------------------------------ shared: market segments */
export const segments = {
  eyebrow: "Market segments",
  line1: "Every pillar maps",
  line2: "to a real customer.",
  columns: [
    { id: "A", name: "Engineering", icon: "engineering" },
    { id: "B", name: "Products", icon: "products" },
    { id: "C", name: "Enablement", icon: "enablement" },
    { id: "D", name: "Fabrication", icon: "fabrication" },
  ],
  items: [
    { segment: "B2B hardware & IoT startups", pillars: "A + B", note: "Custom enclosures, IoT prototypes, test jigs, MVP builds" },
    { segment: "Academic & institutional R&D", pillars: "A", note: "PhD thesis hardware, PCB + firmware + enclosure, field-ready devices" },
    { segment: "Automotive repair & enthusiasts", pillars: "B", note: "Discontinued trim/interior parts, weather-resistant exterior components" },
    { segment: "Luxury & collector gifting", pillars: "B", note: "Scale vehicle replicas, architectural models, presentation centerpieces" },
    { segment: "Direct-to-consumer e-commerce", pillars: "B", note: "Kinetic decor, smart IoT home products, desk & utility goods" },
    { segment: "Funded startups (business services)", pillars: "C", note: "Branding, incorporation, audit, funding access, ops support" },
    { segment: "Heavy industrial & OEM", pillars: "D", note: "Transformer tanks, structural skid bases, furnace components" },
  ],
  note: "Engineering, additive manufacturing, business enablement, and heavy fabrication under one roof. A breadth no single regional competitor currently replicates.",
};

/* ------------------------------------------------ Pillar B: materials matrix */
export const materials = {
  eyebrow: "Material & capability matrix",
  line1: "The palette behind",
  line2: "every product line.",
  rows: [
    { category: "Engineering & structural", filaments: "PA-CF, PET-CF, PC, ABS", use: "Industrial PCB enclosures, engine-bay brackets, mechanical gears" },
    { category: "UV & weather-resistant", filaments: "ASA, PETG", use: "Exterior automotive caps, mirror housings, outdoor IoT enclosures" },
    { category: "Flexible & ergonomic", filaments: "TPU (95A / 85A)", use: "Gaskets, vibration dampeners, cable grommets, wearable accents" },
    { category: "Aesthetic & decorative", filaments: "Silk PLA, Wood-Fill, Marble PLA, Translucent PETG", use: "Kinetic sculptures, architectural replicas, planters, retail goods" },
  ],
};

/* --------------------------------------------------------------------- Work */
export type Pillar = "A" | "B" | "C" | "D";

export const work = {
  eyebrow: "Work & case studies",
  h1: "Proof,",
  h2: "not promises.",
  lead: "One accountable team, from a PhD's wearable sensor to a certified industrial fabrication run. Here are the engagements we can talk about, and the shapes a project takes.",
  examples: [
    { tag: "Academic · Pillar A", key: "wearable", pillars: ["A"] as Pillar[], title: "Wearable gait-analysis sensor", note: "Custom PCB, BLE firmware, and a 3D-printed enclosure in a single 1–2 month engagement, with full Gerber/firmware handoff for thesis documentation." },
    { tag: "Startup MVP · A + B", key: "environmental", pillars: ["A","B"] as Pillar[], title: "Field-deployable environmental sensor", note: "PCB, firmware, and a ruggedized PA-CF enclosure with weatherproof connector cutouts. Avoids injection-mold tooling costs at MVP volumes." },
    { tag: "Restoration · Pillar B", key: "bezel", pillars: ["B"] as Pillar[], title: "Discontinued dashboard bezel", note: "3D-scanned from the original and reproduced in UV-resistant ASA. A fitted replacement at a fraction of the cost of a rare OEM part." },
    { tag: "Collector · Pillar B", key: "replica", pillars: ["B"] as Pillar[], title: "Museum-grade scale replica", note: "Multi-material printing, with composite textures and metallic finishes, for an exact-scale desktop centerpiece." },
    { tag: "Business build-out · Pillar C", key: "startup", pillars: ["C"] as Pillar[], title: "Funded hardware startup", note: "Beyond the MVP enclosure: incorporation guidance, Amazon listing content, and warm investor introductions, handled through one relationship." },
    { tag: "Industrial · Pillar D", key: "transformer", pillars: ["D"] as Pillar[], title: "Pressure-tested transformer tanks", note: "A batch of transformer tanks and structural skid bases, sourcing to logistics under a single PO, with mill certificates and WPS delivered alongside." },
  ],
  concept: {
    eyebrow: "Pillars A → D",
    title: "Concept to structure, end to end",
    note: "A product idea starts as a PCB and enclosure prototype under Pillar A, is validated through field trials, then transitions into a production run of structural hardware fabricated at scale under Pillar D. All managed by TGIE, without a second vendor relationship.",
    stages: [
      { n: "01", title: "Prototype", pillar: "A" as Pillar, note: "A PCB and enclosure prototype." },
      { n: "02", title: "Field trials", pillar: "A" as Pillar, note: "The design validated through field trials." },
      { n: "03", title: "Production run", pillar: "D" as Pillar, note: "Structural hardware fabricated at scale." },
    ],
    bracket: { title: "One relationship", note: "No second vendor." },
  },
  references:
    "Institution-specific case studies and reference letters are shared on request during an engagement.",
};

/* ------------------------------------------------------------------ Insights */
export const insights = {
  eyebrow: "Insights & resources",
  h1: "Everything you need",
  h2: "to know.",
  lead: "Answers, guides, and the capability portfolio, for researchers, founders, and industrial buyers weighing an engagement.",
  resources: [
    {
      title: "Capability portfolio (PDF)",
      note: "The full technical and business capabilities document, across all four pillars.",
      cta: "Download the PDF",
      href: "/brochure.pdf",
      meta: "PDF · 1.5 MB",
      kind: "portfolio",
    },
    {
      title: "Engineering & funding notes",
      note: "Short, practical writing on hardware, grants, and getting a product to market.",
      cta: "Read the notes",
      href: "/work",
      meta: "Case studies",
      kind: "notes",
    },
    {
      title: "Engagement model",
      note: "How a project runs. The four-phase lifecycle, mapped to grant stages.",
      cta: "See the model",
      href: "/#lifecycle",
      meta: "Four phases · Home",
      kind: "model",
    },
  ],
};

/* ------------------------------------------------------------------- Company */
export const company = {
  eyebrow: "The Great Indian Engineers",
  h1: "Four pillars,",
  h2: "one accountable roof.",
  lead: "Engineering, additive manufacturing, business enablement, and heavy fabrication, held together as one accountable team. The engineering core carries over four years of embedded full-stack experience, grounded in institutional rigor and medical-grade discipline; the manufacturing arm is an ISO 9001:2015 certified fabrication operation.",
  stats: [
    { value: "4", unit: "pillars", label: "Under one roof", glyph: "pillars" },
    { value: "50+", unit: "PCBs", label: "Custom layouts delivered", glyph: "pcbs" },
    { value: "ISO 9001", unit: "", label: "2015 certified fabrication", glyph: "iso" },
    { value: "~200 t", unit: "", label: "Fabricated per month", glyph: "tonnes" },
  ],
  pedigree: [
    {
      step: "01",
      badge: "IIT Madras",
      fig: "foundation",
      title: "Institutional foundation",
      note: "Three years grounding at IIT Madras in advanced research engineering: low-power silicon, sensor fusion, and strict operational standards in laboratory settings.",
    },
    {
      step: "02",
      badge: "MedCuore",
      fig: "medical",
      title: "Medical-grade reliability",
      note: "Hands-on tenure (MedCuore) designing high-compliance, fault-tolerant electronics and firmware, so prototypes stay stable through extended trials.",
    },
    {
      step: "03",
      badge: "ISO 9001:2015",
      fig: "fabrication",
      title: "ISO 9001:2015 fabrication",
      note: "A certified heavy-fabrication operation processing roughly 200 tonnes a month. The same operational base as the prototyping lab, in Thirumudivakkam, Chennai.",
    },
  ],
  lab: {
    title: "The lab & infrastructure",
    intro:
      "Our prototyping laboratory and fabrication operation share one operational base in Thirumudivakkam, Chennai. A short drive from major campus clusters. Scholars, researchers, and founders are welcome to work in-house with our engineers.",
    items: [
      { n: 1, icons: ["oscilloscope"], title: "Diagnostic instrumentation", note: "Digital oscilloscopes, multi-channel logic analyzers, precision programmable DC power supplies" },
      { n: 2, icons: ["solder"], title: "Assembly & reflow", note: "Hakko / Quick precision SMD soldering and hot-air rework for fine-pitch components" },
      { n: 3, icons: ["printer", "laser", "press-brake"], title: "Mechanical fabrication", note: "High-speed enclosure 3D printing; heavy machinery: laser, plasma, 320-ton press brake" },
    ],
  },
};
