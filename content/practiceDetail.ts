/** Deep content for each practice page and its sub-pages (sitemap Tier 2). */

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
  engineering: {
    lead: "Development boards fail research at the edges — strict form factors, unstable high-frequency sampling. So we engineer the full stack from zero: schematic capture, a miniaturized multi-layer PCB, and bare-metal firmware written for zero data-packet loss.",
    subs: [
      {
        slug: "custom-pcb-design",
        title: "Custom PCB & Schematic Design",
        summary:
          "Compact, application-specific boards for wearable form factors, constrained housings, and low-power battery operation.",
        points: [
          "Schematic capture from a blank sheet",
          "Up to 6-layer multi-layer routing",
          "Miniaturized layouts for wearables and biomechanical housings",
          "DFM-ready Gerber for production handoff",
        ],
      },
      {
        slug: "firmware-rtos",
        title: "Firmware & RTOS",
        summary:
          "Bare-metal and RTOS firmware engineered to stay stable through extended trials.",
        points: [
          "C/C++ and FreeRTOS",
          "Espressif ESP-IDF, Nordic nRF Connect SDK, STM32CubeMX",
          "Zero data-packet loss at continuous high-frequency sampling",
          "Delivered with fully commented source",
        ],
      },
      {
        slug: "3d-enclosures",
        title: "3D Enclosures & Mechanical",
        summary:
          "Ergonomic housings and sensor mounts, designed concurrently with the PCB footprint.",
        points: [
          "Engineering-grade PETG, ABS, PLA",
          "Custom sensor mounts and fixtures",
          "High-speed in-house printing",
          "No raw, exposed circuit boards",
        ],
      },
      {
        slug: "edge-ai-tinyml",
        title: "Edge AI & TinyML",
        summary:
          "Lightweight neural networks on microcontrollers — movement and bio-signal inference at the edge.",
        points: [
          "Edge Impulse and TensorFlow Lite",
          "On-device, real-time inference",
          "Movement detection and bio-signal processing",
          "No cloud round-trip",
        ],
      },
      {
        slug: "data-dashboards",
        title: "Data Visualization & Dashboards",
        summary:
          "Cross-platform app interfaces and desktop diagnostic dashboards that read your telemetry in real time.",
        points: [
          "Mobile app interfaces (HTML/JavaScript)",
          "Desktop diagnostic dashboards (Python)",
          "Real-time telemetry visualization",
          "Built around your data, not a template",
        ],
      },
    ],
  },

  research: {
    lead: "A conclusion is only as trustworthy as the instrument behind it. We serve as the sole lead engineer across the full hardware and firmware lifecycle — calibrated, field-ready, and phased to fit grant disbursement and milestone defenses.",
    subs: [
      {
        slug: "thesis-hardware",
        title: "Thesis Hardware Development",
        summary:
          "Custom, highly specialized devices that capture the exact experimental data your study depends on.",
        points: [
          "Engineered for strict form-factor limits",
          "Stable high-frequency sampling",
          "Delivered fully calibrated and field-ready",
          "Pristine empirical dataset logs for defense",
        ],
      },
      {
        slug: "rd-lifecycle",
        title: "Phased R&D Lifecycle",
        summary:
          "A four-phase workflow mapped to grant stages and milestone defenses.",
        points: [
          "Phase 1 — Proof of Concept",
          "Phase 2 — Engineering Validation",
          "Phase 3 — Design Validation",
          "Phase 4 — Launch Readiness",
        ],
      },
      {
        slug: "in-house-lab",
        title: "In-House Collaboration Lab",
        summary:
          "Work in-house with our engineers for real-time iteration and hands-on oversight.",
        points: [
          "Dedicated prototyping lab in Thirumudivakkam, Chennai",
          "Digital oscilloscopes, logic analyzers, programmable DC supplies",
          "Fine-pitch SMD soldering and hot-air rework",
          "ESD-safe assembly benches",
        ],
      },
      {
        slug: "ip-transfer",
        title: "IP Transparency & Transfer",
        summary:
          "On milestone completion, complete ownership of the apparatus transfers to you. Zero lock-in.",
        points: [
          "Full CAD/STEP and schematic files",
          "Manufacturing-ready Gerber packages",
          "Fully commented firmware source and build scripts",
          "Detailed BOM and unrestricted publication rights",
        ],
      },
    ],
  },

  fabrication: {
    lead: "A single prototype proves an idea; a pilot proves it can survive the world. We handle the physical build-out of pre-production hardware — with quality control engineered in from Phase 1, so every unit behaves like the first.",
    subs: [
      {
        slug: "small-batch-runs",
        title: "Small-Batch Production",
        summary:
          "Repeatable runs of 10–20 units for pilot studies, field trials, and grant-milestone demonstrations.",
        points: [
          "Typically 10–20 units",
          "Pilot studies and field trials",
          "Grant-milestone demonstrations",
          "Distinct from one-off prototyping",
        ],
      },
      {
        slug: "pcb-smd-assembly",
        title: "PCB Fabrication & SMD Assembly",
        summary:
          "PCB fabrication and SMD assembly coordinated with vetted domestic and international partners.",
        points: [
          "Fine-pitch SMD components",
          "Vetted domestic and international manufacturing partners",
          "Production handoff from DFM-ready Gerber",
          "Coordinated by one accountable team",
        ],
      },
      {
        slug: "enclosure-production",
        title: "Enclosure Production",
        summary:
          "Short-run and bridge manufacturing of 3D-printed enclosures on in-house high-speed infrastructure.",
        points: [
          "In-house high-speed 3D printing",
          "Short-run and bridge manufacturing",
          "Consistent housings across a batch",
          "Engineering-grade filaments",
        ],
      },
      {
        slug: "qc-test-jigs",
        title: "Quality Control & Test Jigs",
        summary:
          "Functional test-jig development to ensure consistency across every fabrication batch.",
        points: [
          "Functional test jigs",
          "Batch-to-batch consistency",
          "Quality control built into the workflow",
          "Verified before it ships",
        ],
      },
    ],
  },

  enablement: {
    lead: "The distance between a working device and a fundable, sellable, legally-sound business is its own discipline. We support founders and research spin-offs — directly, or coordinated through vetted CA / CS and corporate-law partners in each jurisdiction.",
    subs: [
      {
        slug: "incorporation",
        title: "Company Incorporation",
        summary: "Cross-border company formation, coordinated with licensed partners.",
        points: [
          "India — Pvt Ltd / LLP, MSME (Udyam), GST, DPIIT recognition",
          "Dubai / UAE — free zone and mainland setup, trade license",
          "USA — Delaware / Wyoming C-Corp or LLC, EIN",
          "We bridge; licensed CA / CS / legal counsel execute",
        ],
      },
      {
        slug: "audit-compliance",
        title: "Corporate Audit & Compliance",
        summary:
          "Statutory audit coordination and grant-utilization compliance, with audit-ready records from Phase 1.",
        points: [
          "Statutory audits through partner Chartered Accountant firms",
          "Grant utilization and milestone-compliance support (DST, BIRAC, MeitY)",
          "BOM traceability and expense-to-milestone mapping",
          "Audit-ready record keeping",
        ],
      },
      {
        slug: "branding-identity",
        title: "Branding & Identity",
        summary: "Brand identity and marketplace-ready content for D2C and B2B channels.",
        points: [
          "Naming, logo, and positioning",
          "Product packaging design",
          "Website, technical spec sheets, social assets",
          "A consistent brand voice",
        ],
      },
      {
        slug: "operations",
        title: "Operations & Supply Chain",
        summary:
          "Vendor and supply-chain coordination, plus the SOPs to run fabrication and fulfillment.",
        points: [
          "Sourcing, cost negotiation, quality control",
          "SOPs for fabrication runs",
          "Inventory management",
          "Order fulfillment for marketplace sales",
        ],
      },
    ],
  },

  "fundraising-gtm": {
    lead: "We carry it the last distance — into capital and the market. Grant guidance, investor prep, and a go-to-market plan, for hardware and medtech-adjacent ventures.",
    subs: [
      {
        slug: "grants-schemes",
        title: "Grants & Government Schemes",
        summary:
          "Guidance on the government grant schemes relevant to hardware and medtech-adjacent ventures.",
        points: [
          "DST-NIDHI, BIRAC BIG, MeitY",
          "Startup India Seed Fund",
          "Milestone-compliance mapping",
          "Documentation hygiene from Phase 1 onward",
        ],
      },
      {
        slug: "investor-pitch",
        title: "Investor Access & Pitch",
        summary:
          "Pitch deck and financial-model preparation, plus warm introductions where available.",
        points: [
          "Pitch deck preparation",
          "Financial-model support",
          "Warm angel and early-stage fund introductions",
          "Fundraising-conversation readiness",
        ],
      },
      {
        slug: "go-to-market",
        title: "Go-to-Market Strategy",
        summary: "A D2C and B2B channel plan to take a validated product to market.",
        points: [
          "D2C and B2B channel strategy",
          "Positioning at conferences, expos, demo days",
          "Outbound and inbound lead strategy",
          "CRM and pipeline tracking",
        ],
      },
      {
        slug: "marketplace-amazon",
        title: "Marketplace & Amazon",
        summary: "Marketplace-ready content and listing operations for Amazon and D2C.",
        points: [
          "Amazon listing copy and A+ content",
          "Product photography direction",
          "Keyword research and listing optimization",
          "Review-generation practices",
        ],
      },
      {
        slug: "lead-gen",
        title: "Lead Generation & Networking",
        summary:
          "Outbound and inbound strategy, plus introductions across the academic and vendor network.",
        points: [
          "Reaching R&D heads, PhD guides, lab coordinators",
          "University Technology Business Incubators (TBIs)",
          "Academic and vendor networks in Chennai and beyond",
          "Academic and commercial lead funnels, kept distinct",
        ],
      },
    ],
  },
};
