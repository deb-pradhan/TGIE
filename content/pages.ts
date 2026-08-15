/** Content for the supporting sitemap sections: Work, Insights, Company. */

export const work = {
  eyebrow: "Work & case studies",
  h1: "Proof,",
  h2: "not promises.",
  lead: "Additional institution-specific case studies and reference letters are available on request, and can be appended when we engage with a specific university or department. Here is the one we can talk about openly.",
  index: {
    title: "Research hardware we build",
    items: [
      { title: "Wearable devices", note: "Compact, low-power, body-worn sensing" },
      { title: "Biomechanical housings", note: "Constrained form factors, custom mounts" },
      { title: "IoT sensor nodes", note: "Field-deployed telemetry" },
      { title: "Bio-signal instruments", note: "High-frequency, zero packet loss" },
    ],
  },
  references:
    "Reference letters from institutions and PhD scholars are shared on request during an engagement.",
};

export const insights = {
  eyebrow: "Insights & resources",
  h1: "Everything you need",
  h2: "to know.",
  lead: "Answers, guides, and the capability portfolio — for researchers and founders weighing an engagement.",
  resources: [
    {
      title: "Capability portfolio (PDF)",
      note: "The full technical and business capabilities document.",
      cta: "Request the PDF",
    },
    {
      title: "Engineering & funding notes",
      note: "Short, practical writing on hardware, grants, and getting research to market.",
      cta: "Read the notes",
    },
    {
      title: "Engagement model",
      note: "How a project runs — the four-phase lifecycle, mapped to grant stages.",
      cta: "See the model",
    },
  ],
};

export const company = {
  eyebrow: "The Greate Indian Engineers",
  h1: "Institutional rigor,",
  h2: "medical-grade discipline.",
  lead: "All technical execution is led by an engineer with over four years of embedded full-stack prototyping experience — combining institutional academic rigor with medical-grade product development standards.",
  pedigree: [
    {
      title: "Institutional foundation",
      note: "Three years grounding at IIT Madras in advanced research engineering — low-power silicon, sensor fusion, and strict operational standards in laboratory settings.",
    },
    {
      title: "Medical-grade reliability",
      note: "Hands-on tenure (MedCuore) designing high-compliance, fault-tolerant electronics and firmware — so academic prototypes stay stable through extended trials.",
    },
    {
      title: "Proven output",
      note: "50+ custom PCB layouts across wearable, biomechanical, and IoT sensor applications — schematic capture through DFM-ready Gerber.",
    },
  ],
  lab: {
    title: "The lab & infrastructure",
    intro:
      "Our dedicated prototyping laboratory is in Thirumudivakkam, Chennai — a short drive from major campus clusters. Scholars, researchers, and founders are welcome to work in-house with our engineers.",
    items: [
      { title: "Diagnostic instrumentation", note: "Digital oscilloscopes, multi-channel logic analyzers, precision programmable DC power supplies" },
      { title: "Assembly & reflow", note: "Hakko / Quick precision SMD soldering and hot-air rework for fine-pitch components" },
      { title: "Mechanical fabrication", note: "High-speed enclosure 3D printing, ESD-safe assembly benches, protective testing protocols" },
    ],
  },
};
