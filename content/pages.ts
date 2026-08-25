/** Supporting content: Work, Insights, Company — plus shared positioning assets. */

/* --------------------------------------------------------- shared: audiences */
/** Three audiences, one accountable team (portfolio v2). */
export const audiences = {
  eyebrow: "Who we serve",
  line1: "Three audiences,",
  line2: "one accountable roof.",
  lead: "The same team, dialed to who's in the room — a PhD scholar, a founder, or an industrial buyer.",
  items: [
    {
      title: "Research labs & PhD scholars",
      note: "Field-ready custom hardware — calibrated, documented, and yours to publish.",
    },
    {
      title: "Founders & academic spin-offs",
      note: "A validated prototype taken through fabrication, branding, incorporation, and launch.",
    },
    {
      title: "Industrial & OEM clients",
      note: "Heavy structural fabrication at scale, under single-source accountability.",
    },
  ],
};

/* ------------------------------------------------ shared: market segments */
export const segments = {
  eyebrow: "Market segments",
  line1: "Every pillar maps",
  line2: "to a real customer.",
  items: [
    { segment: "B2B hardware & IoT startups", pillars: "A + B", note: "Custom enclosures, IoT prototypes, test jigs, MVP builds" },
    { segment: "Academic & institutional R&D", pillars: "A", note: "PhD thesis hardware, PCB + firmware + enclosure, field-ready devices" },
    { segment: "Automotive repair & enthusiasts", pillars: "B", note: "Discontinued trim/interior parts, weather-resistant exterior components" },
    { segment: "Luxury & collector gifting", pillars: "B", note: "Scale vehicle replicas, architectural models, presentation centerpieces" },
    { segment: "Direct-to-consumer e-commerce", pillars: "B", note: "Kinetic decor, smart IoT home products, desk & utility goods" },
    { segment: "Funded startups (business services)", pillars: "C", note: "Branding, incorporation, audit, funding access, ops support" },
    { segment: "Heavy industrial & OEM", pillars: "D", note: "Transformer tanks, structural skid bases, furnace components" },
  ],
  note: "Engineering, additive manufacturing, business enablement, and heavy fabrication under one roof — a breadth no single regional competitor currently replicates.",
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
export const work = {
  eyebrow: "Work & case studies",
  h1: "Proof,",
  h2: "not promises.",
  lead: "One accountable team, from a PhD's wearable sensor to a certified industrial fabrication run. Here are the engagements we can talk about, and the shapes a project takes.",
  examples: [
    { tag: "Academic · Pillar A", title: "Wearable gait-analysis sensor", note: "Custom PCB, BLE firmware, and a 3D-printed enclosure in a single 1–2 month engagement, with full Gerber/firmware handoff for thesis documentation." },
    { tag: "Startup MVP · A + B", title: "Field-deployable environmental sensor", note: "PCB, firmware, and a ruggedized PA-CF enclosure with weatherproof connector cutouts — avoiding injection-mold tooling costs at MVP volumes." },
    { tag: "Restoration · Pillar B", title: "Discontinued dashboard bezel", note: "3D-scanned from the original and reproduced in UV-resistant ASA — a fitted replacement at a fraction of the cost of a rare OEM part." },
    { tag: "Collector · Pillar B", title: "Museum-grade scale replica", note: "Multi-material printing — composite textures and metallic finishes — for an exact-scale desktop centerpiece." },
    { tag: "Business build-out · Pillar C", title: "Funded hardware startup", note: "Beyond the MVP enclosure: incorporation guidance, Amazon listing content, and warm investor introductions, handled through one relationship." },
    { tag: "Industrial · Pillar D", title: "Pressure-tested transformer tanks", note: "A batch of transformer tanks and structural skid bases — sourcing to logistics under a single PO, with mill certificates and WPS delivered alongside." },
  ],
  concept: {
    title: "Concept to structure, end to end",
    note: "A product idea starts as a PCB and enclosure prototype under Pillar A, is validated through field trials, then transitions into a production run of structural hardware fabricated at scale under Pillar D — all managed by TGIE, without a second vendor relationship.",
  },
  references:
    "Institution-specific case studies and reference letters are shared on request during an engagement.",
};

/* ------------------------------------------------------------------ Insights */
export const insights = {
  eyebrow: "Insights & resources",
  h1: "Everything you need",
  h2: "to know.",
  lead: "Answers, guides, and the capability portfolio — for researchers, founders, and industrial buyers weighing an engagement.",
  resources: [
    {
      title: "Capability portfolio (PDF)",
      note: "The full technical and business capabilities document, across all four pillars.",
      cta: "Request the PDF",
    },
    {
      title: "Engineering & funding notes",
      note: "Short, practical writing on hardware, grants, and getting a product to market.",
      cta: "Read the notes",
    },
    {
      title: "Engagement model",
      note: "How a project runs — the four-phase lifecycle, mapped to grant stages.",
      cta: "See the model",
    },
  ],
};

/* ------------------------------------------------------------------- Company */
export const company = {
  eyebrow: "The Great Indian Engineers",
  h1: "Four pillars,",
  h2: "one accountable roof.",
  lead: "Engineering, additive manufacturing, business enablement, and heavy fabrication — held together as one accountable team. The engineering core carries over four years of embedded full-stack experience, grounded in institutional rigor and medical-grade discipline; the manufacturing arm is an ISO 9001:2015 certified fabrication operation.",
  pedigree: [
    {
      title: "Institutional foundation",
      note: "Three years grounding at IIT Madras in advanced research engineering — low-power silicon, sensor fusion, and strict operational standards in laboratory settings.",
    },
    {
      title: "Medical-grade reliability",
      note: "Hands-on tenure (MedCuore) designing high-compliance, fault-tolerant electronics and firmware — so prototypes stay stable through extended trials.",
    },
    {
      title: "ISO 9001:2015 fabrication",
      note: "A certified heavy-fabrication operation processing roughly 200 tonnes a month — the same operational base as the prototyping lab, in Thirumudivakkam, Chennai.",
    },
  ],
  lab: {
    title: "The lab & infrastructure",
    intro:
      "Our prototyping laboratory and fabrication operation share one operational base in Thirumudivakkam, Chennai — a short drive from major campus clusters. Scholars, researchers, and founders are welcome to work in-house with our engineers.",
    items: [
      { title: "Diagnostic instrumentation", note: "Digital oscilloscopes, multi-channel logic analyzers, precision programmable DC power supplies" },
      { title: "Assembly & reflow", note: "Hakko / Quick precision SMD soldering and hot-air rework for fine-pitch components" },
      { title: "Mechanical fabrication", note: "High-speed enclosure 3D printing; heavy machinery — laser, plasma, 320-ton press brake" },
    ],
  },
};
