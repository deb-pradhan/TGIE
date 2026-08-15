export type Phase = {
  n: string;
  title: string;
  scope: string;
  objective: string;
};

export const lifecycle: Phase[] = [
  {
    n: "Phase 1",
    title: "Proof of Concept",
    scope: "Development-board breadboarding, core sensor communication, and logic validation.",
    objective: "Feasibility for thesis, grant, or pitch.",
  },
  {
    n: "Phase 2",
    title: "Engineering Validation",
    scope: "Custom PCB layout, miniaturization, 3D enclosure printing, and bare-metal firmware.",
    objective: "Lab-bench validation & data integrity.",
  },
  {
    n: "Phase 3",
    title: "Design Validation",
    scope: "Fully integrated device delivery, optimized firmware, and diagnostic GUI integration.",
    objective: "Field trials & final documentation.",
  },
  {
    n: "Phase 4",
    title: "Launch Readiness",
    scope: "Small-batch fabrication, branding assets, marketplace listing, and compliance readiness.",
    objective: "Sellable, fundable, incorporated product.",
  },
];
