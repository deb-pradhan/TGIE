/** Deep content for each pillar page and its sub-pages (portfolio v2). */

export type Sub = {
  slug: string;
  title: string;
  summary: string;
  points: string[];
};

export type PracticeDetail = {
  lead: string;
  subs: Sub[];
};

export const practiceDetail: Record<string, PracticeDetail> = {
  // ---------------------------------------------------------------- Pillar A
  engineering: {
    lead: "The engineering core of TGIE — taking a research question or a product idea from concept to a working, field-ready electronic device. Off-the-shelf boards fail at the edges: strict form factors, unstable high-frequency sampling. So we build the full stack from zero, and you retain complete design ownership.",
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
          "Full manufacturing-ready Gerber — you keep complete design ownership",
        ],
      },
      {
        slug: "3d-enclosures",
        title: "Mechanical & Ergonomic 3D Enclosures",
        summary:
          "No raw, exposed circuit boards. Custom housings, sensor mounts, and ergonomic enclosures designed concurrently with the PCB footprint.",
        points: [
          "Engineering-grade filaments — PETG, ABS, PLA",
          "Custom sensor mounts and fixtures",
          "Designed alongside the PCB, not after it",
          "High-speed in-house printing",
        ],
      },
      {
        slug: "embedded-firmware",
        title: "Embedded Firmware Development",
        summary:
          "Bare-metal and FreeRTOS firmware across Espressif ESP-IDF, Nordic nRF Connect, and STM32CubeMX — engineered for research-grade data integrity.",
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
          "Lightweight neural networks deployed onto microcontrollers for movement detection and bio-signal processing — real-time inference at the edge, no cloud dependence.",
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
          "Cross-platform mobile app interfaces and desktop diagnostic dashboards — closing the loop from sensor to actionable data for research and product clients alike.",
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
          "The physical build-out of research and pre-production hardware — distinct from one-off prototyping, and distinct from heavy fabrication.",
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
    lead: "Industrial-grade, multi-material 3D printing applied across distinct product lines — from one-off bespoke commissions to scalable retail runs. Additive manufacturing removes the high upfront tooling cost and multi-week lead time of injection molding: a direct advantage for hardware startups and industrial clients optimizing unit cost at low volumes.",
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
          "Rapid prototyping to low-volume production — no injection-mold tooling",
        ],
      },
      {
        slug: "kinetic-iot-decor",
        title: "Smart IoT & Kinetic Tabletop Decor",
        summary:
          "Electro-mechanical kinetic sculptures and embedded IoT home decor — motorized, connected, and paired with custom Pillar A electronics.",
        points: [
          "Cam-driven and motorized kinetic art — wave models, orreries",
          "Smart lighting, interactive mirrors, automated indoor gardens",
          "Onboard sensors and Wi-Fi/BLE connectivity",
          "Custom housings matched to microcontrollers and mobile companion apps",
        ],
      },
      {
        slug: "automotive-plastics",
        title: "Automotive Replacement & Custom Plastics",
        summary:
          "Hard-to-find and discontinued interior parts, plus heat- and UV-resistant exterior components — an accessible tuning, restoration, and replacement niche.",
        points: [
          "Interior: switch bezels, A/C vent louvers, dashboard plates, trim clips",
          "Exterior: under-hood ducts, fluid caps, mirror shells in ASA/Nylon/ABS",
          "Bespoke in-car accessories, mounts, and cable routing",
          "A fraction of the cost and lead time of sourcing a rare OEM part",
        ],
      },
      {
        slug: "scale-miniatures",
        title: "Bespoke Scale Miniatures & Architectural Replicas",
        summary:
          "Exact-scale, showroom-accurate models and high-detail architectural miniatures — the highest-margin, most bespoke line in the portfolio.",
        points: [
          "Custom vehicle replicas matched to owner specifications",
          "Architectural real-estate models for architects and realtors",
          "Multi-material detailing — composite textures, translucent, metallic finishes",
          "Presentation-grade desktop centerpieces",
        ],
      },
      {
        slug: "retail-ecommerce",
        title: "Curated Commercial E-Commerce & Retail Products",
        summary:
          "Manufacturing of top-performing, commercially licensed designs — reducing design risk while retaining full production margin.",
        points: [
          "High-margin Amazon / D2C products from creator ecosystems",
          "Gaming & desk setups — controller docks, headphone stands, organizers",
          "Articulated & kinetic toys — print-in-place flexi models, fidgets",
          "Home & utility — planters, drawer organizers, tool-mounting brackets",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- Pillar C
  enablement: {
    lead: "Beyond hardware, we help founders, research spin-offs, and institutional partners turn validated prototypes into fundable, sellable, legally sound businesses. Offered directly or coordinated through a network of vetted partner firms — a single accountable team across engineering, legal, branding, and operations.",
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
      },
      {
        slug: "incorporation",
        title: "Company Incorporation — India, UAE & USA",
        summary: "Cross-border company formation, coordinated with licensed partners.",
        points: [
          "India — Pvt Ltd / LLP, MSME (Udyam), GST, DPIIT recognition",
          "Dubai / UAE — free zone and mainland setup, trade license",
          "USA — Delaware / Wyoming C-Corp or LLC, EIN",
          "We bridge; licensed CA / CS / legal counsel execute",
        ],
      },
      {
        slug: "funding-investor-access",
        title: "Funding & Investor Access",
        summary:
          "Grant guidance, pitch preparation, and warm introductions for hardware and medtech-adjacent ventures.",
        points: [
          "Government grant schemes — DST-NIDHI, BIRAC BIG, MeitY, Startup India Seed",
          "Pitch deck and financial-model preparation",
          "Warm introductions to angels and hardware-focused early-stage funds",
          "Fundraising-conversation readiness",
        ],
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
      },
      {
        slug: "lead-gen-networking",
        title: "Networking & Lead Generation",
        summary:
          "Introductions across the academic and vendor network, plus outbound and inbound demand strategy.",
        points: [
          "University Technology Business Incubators (TBIs), industry-academia cells",
          "R&D heads, PhD guides, lab coordinators who commission hardware",
          "Amazon and D2C: keyword research, listing optimization, reviews",
          "CRM keeping academic and commercial funnels distinct",
        ],
      },
      {
        slug: "operations",
        title: "End-to-End Business Operations",
        summary:
          "Vendor and supply-chain coordination, plus the SOPs to run fabrication and fulfillment — one accountable team.",
        points: [
          "Sourcing, cost negotiation, quality control for procurement",
          "SOPs for fabrication runs and inventory management",
          "Order fulfillment for marketplace sales",
          "Single point-of-contact project management",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------- Pillar D
  fabrication: {
    lead: "TGIE's manufacturing extends well beyond 3D-printed and small-batch parts into heavy structural fabrication — an ISO 9001:2015 certified operation, based in Thirumudivakkam, Chennai, processing roughly 200 tonnes of fabricated material a month. This is a distinct scale tier, aimed at industrial OEMs and heavy-equipment manufacturers, and it closes the gap between a validated design and a delivered, production-grade structure.",
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
      },
      {
        slug: "machinery-welding",
        title: "In-House Machinery & Certified Welding",
        summary:
          "A heavy-machinery floor with certified welders — precision and scale in one operation.",
        points: [
          "Laser cutting — mild steel up to 16mm, stainless up to 10mm",
          "Plasma / oxy-fuel cutting — mild steel up to 250mm",
          "320-ton CNC press brake for precision bending",
          "Certified welders in GMAW (MIG) and SMAW (ARC)",
        ],
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
      },
    ],
  },
};
