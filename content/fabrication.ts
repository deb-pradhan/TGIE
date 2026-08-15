/** Fabrication practice page — showcase content (batch flow, the gap, stats). */

export const fabrication = {
  process: {
    eyebrow: "Batch production",
    line1: "From one working unit",
    line2: "to a batch that behaves the same.",
    steps: [
      {
        n: "Step 01",
        title: "DFM handoff",
        scope: "Manufacturing-ready Gerber and BOM handed to vetted partners.",
      },
      {
        n: "Step 02",
        title: "SMD assembly",
        scope: "Fine-pitch SMD placement and reflow, domestic or international.",
      },
      {
        n: "Step 03",
        title: "Enclosure run",
        scope: "Short-run 3D-printed housings on in-house high-speed printers.",
      },
      {
        n: "Step 04",
        title: "QC & test jigs",
        scope: "Functional test jigs verify every unit before it ships.",
      },
    ],
  },

  gap: {
    eyebrow: "Why fabrication is its own practice",
    heading: "The gap between one unit and a hundred is where most research dies.",
    body: "A single prototype proves an idea. A pilot proves it survives the world — repeatably. We handle the physical build-out of pre-production hardware, with quality control engineered in from Phase 1, so every unit behaves like the first.",
  },

  stats: {
    eyebrow: "Built to repeat",
    items: [
      { value: "10–20", label: "Units per batch", note: "Pilot studies & field trials" },
      { value: "100%", label: "Functionally tested", note: "Test jigs, every unit" },
      { value: "1", label: "Accountable team", note: "Fab, assembly & QC" },
      { value: "0", label: "Lock-in", note: "Files & BOM are yours" },
    ],
  },

  ownership: {
    eyebrow: "100% zero lock-in",
    heading: "We build the batch.",
    headingMuted: "You own every file.",
    body: "CAD, Gerber, firmware source, and a detailed BOM with exact part numbers — handed back on milestone completion, so any batch can be replicated without us.",
  },
};
