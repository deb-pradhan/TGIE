/** Deep content for each pillar page and its sub-pages (portfolio v2). */

export type Sub = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
  /** Summary-band "Scope" text. Omit to use the generic hardware wording. */
  scopeNote?: string;
  /** Summary-band "Ownership" text. Omit to use the generic hardware wording. */
  ownershipNote?: string;
};

/** Swap hyphens inside compounds for U+2011 so titles like "E-Commerce" never break at the hyphen. */
export const nbHyphen = (t: string) => t.replace(/(?<=\w)-(?=\w)/g, "\u2011");

export type PracticeDetail = {
  lead: string;
  /** Closing call-to-action copy for the pillar and its sub-pages. */
  cta: { heading: string; accent: string; sub: string };
  /** Heading above each sub-page's deliverables list. */
  deliver: { line1: string; line2: string };
  subs: Sub[];
};

export const practiceDetail: Record<string, PracticeDetail> = {
  // ---------------------------------------------------------------- Pillar A
  engineering: {
    lead: "From research question or product idea to a working, field-ready device: off-the-shelf boards fail at the edges, so we build the full stack from zero and you keep complete design ownership.",
    cta: {
      heading: "Have a device in mind?",
      accent: "We will build it from zero.",
      sub: "Describe the sensor, the form factor and the data you need. We scope the board, firmware and enclosure as one engineering path.",
    },
    deliver: { line1: "Every file and board,", line2: "handed back to you." },
    subs: [
      {
        slug: "custom-pcb-design",
        title: "Custom PCB & Schematic Design",
        summary:
          "Compact, application-specific PCBs (up to 6 layers) for wearable form factors, constrained biomechanical housings, and low-power battery operation.",
        points: [
          "Schematic capture from a blank sheet",
          "Up to 6-layer multi-layer routing",
          "Miniaturized layouts for wearables and constrained housings",
          "Manufacturing-ready Gerber files: you keep complete design ownership",
        ],
      },
      {
        slug: "3d-enclosures",
        title: "Mechanical & Ergonomic 3D Enclosures",
        summary:
          "Custom housings, sensor mounts, and ergonomic enclosures designed concurrently with the PCB footprint, so no board is ever left raw and exposed.",
        points: [
          "Engineering-grade filaments: PETG, ABS, PLA",
          "Custom sensor mounts and fixtures",
          "Designed alongside the PCB, not after it",
          "High-speed in-house printing",
        ],
      },
      {
        slug: "embedded-firmware",
        title: "Embedded Firmware Development",
        summary:
          "Bare-metal and FreeRTOS firmware across Espressif ESP-IDF, Nordic nRF Connect, and STM32CubeMX, engineered for research-grade data integrity.",
        points: [
          "Sensor fusion and BLE/GATT communication protocols",
          "Zero-packet-loss high-frequency sampling",
          "C/C++, bare-metal, FreeRTOS",
          "Delivered with fully commented source",
        ],
      },
      {
        slug: "edge-ai-tinyml",
        title: "Edge AI & On-Device ML (TinyML)",
        summary:
          "Lightweight neural networks on microcontrollers for movement detection and bio-signal processing: real-time inference at the edge, no cloud dependence.",
        points: [
          "Edge Impulse and TensorFlow Lite",
          "On-device, real-time inference",
          "Movement detection and bio-signal processing",
          "No cloud round-trip",
        ],
      },
      {
        slug: "data-dashboards",
        title: "Full-Stack Data Visualization",
        summary:
          "Cross-platform mobile app interfaces and desktop diagnostic dashboards, closing the loop from sensor to actionable data for research and product clients alike.",
        points: [
          "Mobile app interfaces (HTML/JavaScript)",
          "Desktop diagnostic dashboards (Python)",
          "Real-time telemetry visualization",
          "Built around your data, not a template",
        ],
      },
      {
        slug: "small-batch-production",
        title: "Small-Batch R&D Production",
        summary:
          "The physical build-out of research and pre-production hardware: more than a one-off prototype, lighter than heavy fabrication.",
        points: [
          "Small-batch runs, typically 10–20 units",
          "Pilot studies, field trials, grant-milestone demonstrations",
          "PCB fabrication and SMD assembly with vetted partners",
          "Functional test jigs for batch-to-batch consistency",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- Pillar B
  products: {
    lead: "Industrial-grade, multi-material 3D printing for everything from one-off commissions to retail runs, with no injection-mold tooling cost or multi-week lead time: a direct advantage for startups and industrial clients at low volumes.",
    cta: {
      heading: "Need parts without a tooling bill?",
      accent: "Print the first run with us.",
      sub: "Share a part, a scan or a product idea. We recommend the material and finish, then quote a run from a single piece to a retail batch.",
    },
    deliver: { line1: "Materials and finishes,", line2: "specified up front." },
    subs: [
      {
        slug: "industrial-enclosures",
        title: "Custom PCB Enclosures & IoT Hardware Packaging",
        summary:
          "Ruggedized industrial housings in carbon-fiber-reinforced composites and high-impact polymers, paired directly with Pillar A electronics.",
        points: [
          "PA-CF, PET-CF composites; ABS, PC high-impact polymers",
          "Passive cooling fin arrays, vents, tight-tolerance connector cutouts",
          "USB-C, Ethernet, M12 industrial connectors, external antennas",
          "Rapid prototyping to low-volume production, no injection-mold tooling",
        ],
      },
      {
        slug: "kinetic-iot-decor",
        title: "Smart IoT & Kinetic Tabletop Decor",
        summary:
          "Electro-mechanical kinetic sculptures and embedded IoT home decor: motorized, connected, and paired with custom Pillar A electronics.",
        points: [
          "Cam-driven and motorized kinetic art: wave models, orreries",
          "Smart lighting, interactive mirrors, automated indoor gardens",
          "Onboard sensors and Wi-Fi/BLE connectivity",
          "Custom housings matched to microcontrollers and mobile companion apps",
        ],
      },
      {
        slug: "automotive-plastics",
        title: "Automotive Replacement & Custom Plastics",
        summary:
          "Hard-to-find and discontinued interior parts, plus heat- and UV-resistant exterior components, for tuning, restoration and replacement.",
        points: [
          "Interior: switch bezels, A/C vent louvers, dashboard plates, trim clips",
          "Exterior: under-hood ducts, fluid caps, mirror shells in ASA/Nylon/ABS",
          "Bespoke in-car accessories, mounts, and cable routing",
          "A fraction of the cost and lead time of sourcing a rare OEM part",
        ],
        scopeNote: "Scan or measure the original, model it, then print it in a material matched to the heat and UV it will face.",
        ownershipNote: "The finished parts are yours, and so is the scanned part model, so a spare can be printed whenever you need one.",
      },
      {
        slug: "scale-miniatures",
        title: "Bespoke Scale Miniatures & Architectural Replicas",
        summary:
          "Exact-scale, showroom-accurate vehicle models and high-detail architectural miniatures, built to your specification as presentation-grade centerpieces.",
        points: [
          "Custom vehicle replicas matched to owner specifications",
          "Architectural real-estate models for architects and realtors",
          "Multi-material detailing: composite textures, translucent, metallic finishes",
          "Presentation-grade desktop centerpieces",
        ],
        scopeNote: "One bespoke model, built to your reference drawings, photos or owner specification.",
        ownershipNote: "The finished model is yours, and the model files stay available if you want a second copy.",
      },
      {
        slug: "retail-ecommerce",
        title: "Curated Commercial E-Commerce & Retail Products",
        summary:
          "Production of top-performing, commercially licensed designs: you launch with proven products and skip the design risk, while the sales stay yours.",
        points: [
          "Proven Amazon / D2C products from creator ecosystems",
          "Gaming & desk setups: controller docks, headphone stands, organizers",
          "Articulated & kinetic toys: print-in-place flexi models, fidgets",
          "Home & utility: planters, drawer organizers, tool-mounting brackets",
        ],
        scopeNote: "Production runs of commercially licensed designs, made to order for your D2C and marketplace channels.",
        ownershipNote: "You own the production run and the storefront; each design stays under its creator's licence.",
      },
    ],
  },

  // ---------------------------------------------------------------- Pillar C
  enablement: {
    lead: "Beyond hardware, we help founders, research spin-offs and institutions turn validated prototypes into fundable, sellable, legally sound businesses, directly or through vetted partner firms, with one accountable team across engineering, legal, branding and operations.",
    cta: {
      heading: "Ready to build the company too?",
      accent: "One team for the paperwork.",
      sub: "Tell us where the venture stands today. We map incorporation, grants, branding and operations, and coordinate the licensed partners.",
    },
    deliver: { line1: "Filings, assets and plans,", line2: "ready to use." },
    subs: [
      {
        slug: "branding-marketing",
        title: "Branding & Marketing",
        summary:
          "Brand identity and marketplace-ready content for D2C and B2B channels.",
        points: [
          "Naming, logo, positioning, product packaging design",
          "Amazon listing copy, A+ content, comparison assets",
          "Website, technical spec sheets, social assets",
          "A consistent brand voice across every channel",
        ],
        scopeNote: "Identity, packaging and channel content, produced as working files you can hand to any printer, platform or agency.",
        ownershipNote: "Logo files, brand guidelines and listing content are handed over in editable formats, and the brand is yours.",
      },
      {
        slug: "incorporation",
        title: "Company Incorporation: India, UAE & USA",
        summary: "Cross-border company formation, coordinated with licensed partners.",
        points: [
          "India: Pvt Ltd / LLP, MSME (Udyam), GST, DPIIT recognition",
          "Dubai / UAE: free zone and mainland setup, trade license",
          "USA: Delaware / Wyoming C-Corp or LLC, EIN",
          "We bridge; licensed CA / CS / legal counsel execute",
        ],
        scopeNote: "We coordinate formation in India, the UAE and the USA while licensed partners handle the filings.",
        ownershipNote: "The company, its registrations and its records are in your name, with licensed CA, CS and legal counsel doing the execution.",
      },
      {
        slug: "funding-investor-access",
        title: "Fundraising & GTM",
        summary:
          "Grant guidance, pitch preparation, and warm introductions for hardware and medtech-adjacent ventures.",
        points: [
          "Government grant schemes: DST-NIDHI, BIRAC BIG, MeitY, Startup India Seed",
          "Pitch deck and financial-model preparation",
          "Warm introductions to angels and hardware-focused early-stage funds",
          "Fundraising-conversation readiness",
        ],
        scopeNote: "Grant mapping, pitch and financial-model preparation, and introductions to angels and early-stage funds.",
        ownershipNote: "The deck, model and grant drafts are yours to reuse, and the investor relationships are yours to keep.",
      },
      {
        slug: "audit-compliance",
        title: "Corporate Audit Services",
        summary:
          "Statutory audit coordination and grant-use compliance, with audit-ready records from Phase 1.",
        points: [
          "Statutory audits through partner Chartered Accountant firms",
          "Grant-use and milestone-compliance support (DST, BIRAC, MeitY)",
          "BOM traceability and expense-to-milestone mapping",
          "Audit-ready record keeping",
        ],
        scopeNote: "Coordination with partner Chartered Accountant firms, with records kept audit-ready from Phase 1.",
        ownershipNote: "Ledgers, BOM traceability and milestone mapping stay with you, ready for any auditor you appoint.",
      },
      {
        slug: "lead-gen-networking",
        title: "Networking & Lead Generation",
        summary:
          "Introductions to university incubators, research labs and hardware vendors, plus a demand plan for your D2C and marketplace channels.",
        points: [
          "Introductions to university Technology Business Incubators (TBIs) and industry-academia cells",
          "Access to the R&D heads, PhD guides and lab coordinators who commission hardware",
          "Amazon and D2C growth: keyword research, listing optimization, reviews",
          "A CRM that keeps academic and commercial leads in separate pipelines",
        ],
        scopeNote: "Introductions across the academic and vendor network, plus demand-generation planning for your channels.",
        ownershipNote: "Contact lists, CRM data and listing content are handed to you, so the pipeline keeps working without us.",
      },
      {
        slug: "operations",
        title: "End-to-End Business Operations",
        summary:
          "Vendor and supply-chain coordination, plus the SOPs to run fabrication and fulfillment, under one accountable team.",
        points: [
          "Sourcing, cost negotiation, quality control for procurement",
          "SOPs for fabrication runs and inventory management",
          "Order fulfillment for marketplace sales",
          "Single point-of-contact project management",
        ],
        scopeNote: "Sourcing, SOPs and fulfillment coordinated through a single point of contact.",
        ownershipNote: "SOPs, vendor lists and process documents are handed over, so your team can run operations on its own.",
      },
    ],
  },

  // ---------------------------------------------------------------- Pillar D
  fabrication: {
    lead: "Heavy structural fabrication from a certified shop in Thirumudivakkam, Chennai: a distinct scale tier for industrial OEMs and heavy-equipment makers, closing the gap between a validated design and a delivered structure.",
    cta: {
      heading: "Have a drawing to fabricate?",
      accent: "Send us the RFQ.",
      sub: "Share your drawings and quantities. We quote the full path from cutting and welding to coating and delivery, under a single purchase order.",
    },
    deliver: { line1: "Processes and paperwork,", line2: "scoped before the order." },
    subs: [
      {
        slug: "single-source-accountability",
        title: "Single-Source Accountability",
        summary:
          "Clients issue one Purchase Order; TGIE manages the entire fabrication lifecycle end to end.",
        points: [
          "RFQ, sourcing, cutting, bending, fabrication and assembly",
          "Machining, coating, and logistics under one PO",
          "In-house operations plus a tightly managed local partner network",
          "Removes the vendor-coordination burden of a fragmented supply chain",
        ],
        scopeNote: "One purchase order covers RFQ through logistics, with in-house work and a managed local partner network.",
        ownershipNote: "Your drawings and specifications stay yours, and inspection records come back with the delivery.",
      },
      {
        slug: "machinery-welding",
        title: "In-House Machinery & Certified Welding",
        summary:
          "A heavy-machinery floor with certified welders: precision and scale in one operation.",
        points: [
          "Laser cutting: mild steel up to 16mm, stainless up to 10mm",
          "Plasma / oxy-fuel cutting: mild steel up to 250mm",
          "320-ton CNC press brake for precision bending",
          "Certified welders in GMAW (MIG) and SMAW (ARC)",
        ],
        scopeNote: "In-house cutting, bending and welding, taking a validated design from sheet and plate to a finished structure.",
        ownershipNote: "Your drawings stay yours, and every job ships with its material and weld records.",
      },
      {
        slug: "partner-network-ops",
        title: "Extended Partner-Network Operations",
        summary:
          "Precision machining and surface treatment beyond in-house capability, managed under TGIE's quality supervision.",
        points: [
          "Precision machining for toleranced features",
          "Hot-dip galvanizing and electroplating",
          "Powder coating",
          "All coordinated under one accountable team",
        ],
        scopeNote: "Machining and surface treatment beyond in-house capability, supervised by TGIE from dispatch to return.",
        ownershipNote: "Partner treatment and inspection records come back to you under TGIE sign-off.",
      },
      {
        slug: "quality-documentation",
        title: "Quality Assurance & Documentation",
        summary:
          "Every engagement is backed by ISO 9001:2015 process control, with inspection records, weld traceability, and stage-by-stage sign-off.",
        points: [
          "ISO 9001:2015 certified process control",
          "Mill certificates delivered with the finished units",
          "Welding Procedure Specifications (WPS)",
          "Test reports alongside every delivery",
        ],
        scopeNote: "ISO 9001:2015 process control, with inspection records and stage-by-stage sign-off on every engagement.",
        ownershipNote: "Mill certificates, WPS and test reports are delivered with every batch, ready for your own QC file.",
      },
    ],
  },
};
