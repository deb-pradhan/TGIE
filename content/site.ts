export const site = {
  name: "TGIE",
  fullName: "The Great Indian Engineers",
  base: "Thirumudivakkam, Chennai · working globally",

  hero: {
    eyebrow: "The Great Indian Engineers",
    line1: "Theory, embodied.",
    line2: "One accountable team, from first sketch to shipped hardware.",
    lead: "Most partners hand you a piece. We hold the whole thing: the board, the enclosure, the product line, the company, and heavy fabrication at scale, as one accountable team. You keep the idea, and you own everything we make.",
    stats: [
      { value: "4", unit: "pillars", label: "Under one accountable roof" },
      { value: "ISO 9001", label: "2015 certified fabrication" },
      { value: "100%", label: "IP transfer · zero lock-in" },
    ],
  },

  trust: {
    caption: "Institutional rigor · medical-grade discipline · ISO 9001:2015 fabrication",
    logos: [
      "IIT Madras",
      "MedCuore",
      "ISO 9001:2015",
      "ESP-IDF",
      "Nordic nRF",
      "STM32",
      "Edge Impulse",
      "TensorFlow Lite",
    ],
  },

  philosophy: {
    eyebrow: "Our conviction",
    headline: "You carry the vision. We carry the weight.",
    sub: "The discovery is yours: the thesis, the data, the IP. What we carry is the operational weight of turning an idea into something you can hold, defend, publish, and sell.",
    tenets: [
      {
        n: "Principle I",
        title: "An idea is only real once it has a body",
        body: "Papers and slides prove that something can be. Physical, legal, and commercial form is what makes it exist.",
      },
      {
        n: "Principle II",
        title: "The weight shouldn't fall on the creator",
        body: "Vision and operational weight are different jobs. We shoulder the weight so the thinking stays yours.",
      },
      {
        n: "Principle III",
        title: "A body we build, you own completely",
        body: "Files, IP, entity, brand. All of it, handed back. Zero lock-in.",
      },
    ],
  },

  ownership: {
    eyebrow: "100% zero lock-in",
    line1: "We build the body.",
    line2: "You own it.",
    sub: "Publication and grant compliance demand full transparency over the apparatus. On milestone completion, complete ownership transfers to you. No licensing friction between you and your own work.",
    items: [
      { title: "Complete CAD & Gerber", note: "Full STEP files, schematics, manufacturing-ready packages" },
      { title: "Firmware source access", note: "Fully commented repositories and build scripts" },
      { title: "Detailed Bill of Materials", note: "Exact manufacturer part numbers for easy replication" },
      { title: "Unrestricted publication", note: "Full freedom to document, publish, and patent" },
    ],
  },

  capabilities: {
    eyebrow: "Core technical stack",
    line1: "Capabilities built",
    line2: "for research and product teams.",
    cards: [
      {
        title: "Firmware & silicon mastery",
        body: "Bare-metal and FreeRTOS across Espressif ESP-IDF, Nordic nRF Connect, and STM32. Engineered to stay stable through extended trials.",
        chart: "line" as const,
      },
      {
        title: "Full-stack data visualization",
        body: "Cross-platform app interfaces and desktop diagnostic dashboards that read your telemetry in real time.",
        chart: "bar" as const,
      },
      {
        title: "Edge AI & on-device ML",
        body: "Lightweight models on microcontrollers via Edge Impulse and TensorFlow Lite. Movement and bio-signal inference at the edge.",
        chart: "gauge" as const,
      },
    ],
  },

  caseStudy: {
    eyebrow: "Proven track record",
    quote:
      "The custom hardware was delivered fully calibrated and field-ready, enabling pristine empirical dataset logs required for a successful thesis defense.",
    who: "Doctoral thesis validation",
    role: "PhD scholar, premier Indian technical institute",
  },

  finalCta: {
    line1: "Bring your research to the world.",
    line2: "You dream it. We'll carry it.",
    sub: "Take the operational weight off your plate. One accountable team spanning engineering, legal, branding, and market, based in Thirumudivakkam, Chennai, working with institutions and founders globally.",
  },

  footer: {
    blurb:
      "The Great Indian Engineers: embedded systems, academic hardware prototyping, fabrication, and end-to-end business enablement.",
    columns: [
      {
        title: "Practices",
        links: [
          { label: "Engineering", href: "/practices/engineering" },
          { label: "Products", href: "/practices/products" },
          { label: "Business Enablement", href: "/practices/enablement" },
          { label: "Heavy Fabrication", href: "/practices/fabrication" },
        ],
      },
      {
        title: "Capabilities",
        links: [
          { label: "Custom PCB design", href: "/practices/engineering/custom-pcb-design" },
          { label: "Edge AI / TinyML", href: "/practices/engineering/edge-ai-tinyml" },
          { label: "Industrial enclosures", href: "/practices/products/industrial-enclosures" },
          { label: "Incorporation", href: "/practices/enablement/incorporation" },
          { label: "Certified welding", href: "/practices/fabrication/machinery-welding" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Work & case studies", href: "/work" },
          { label: "Company", href: "/company" },
          { label: "Insights", href: "/insights" },
          { label: "Start a project", href: "/start" },
        ],
      },
    ],
    legal: ["Privacy", "Terms", "IP Transparency"],
  },
};
