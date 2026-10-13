import type { IconName } from "@/components/icons/Icon";

/**
 * Where each sub-service sits in the four-phase lifecycle (content/lifecycle.ts)
 * and its icon. `phases` are 1-based; `note` is one plain sentence on its role.
 */
export type SubFit = { icon: IconName; phases: number[]; note: string };

export const subFit: Record<string, SubFit> = {
  "custom-pcb-design": { icon: "pcb", phases: [2, 3], note: "Breadboard logic becomes a miniaturized board in Phase 2, then a field-ready revision in Phase 3." },
  "3d-enclosures": { icon: "enclosure", phases: [2, 3], note: "Housings are printed beside the PCB footprint in Phase 2 and refined for field trials in Phase 3." },
  "embedded-firmware": { icon: "firmware", phases: [1, 2, 3], note: "Sensor bring-up starts in Phase 1; data-integrity firmware is locked in across Phases 2 and 3." },
  "edge-ai-tinyml": { icon: "edge-ai", phases: [2, 3], note: "Models are trained and quantized once the sensor data is trustworthy, then tuned on device." },
  "data-dashboards": { icon: "dashboard", phases: [3], note: "Diagnostic GUIs close the loop in Phase 3 so field trials produce usable, documented data." },
  "small-batch-production": { icon: "small-batch", phases: [4], note: "Phase 4 turns the validated design into a repeatable run of tested units." },

  "industrial-enclosures": { icon: "industrial-enclosure", phases: [2, 3, 4], note: "From a rapid prototype to a low-volume run, with no injection-mold tooling in the way." },
  "kinetic-iot-decor": { icon: "kinetic", phases: [1, 2, 4], note: "Mechanism proof first, then custom electronics and a housing, then a small production batch." },
  "automotive-plastics": { icon: "automotive", phases: [1, 4], note: "Scan and replicate a part to prove fit, then print it in the right material for the job." },
  "scale-miniatures": { icon: "miniature", phases: [3, 4], note: "A single presentation-grade piece, delivered once the design is approved." },
  "retail-ecommerce": { icon: "retail", phases: [4], note: "Licensed designs go straight to production and listing, so you skip the design phase and sell from day one." },

  "branding-marketing": { icon: "branding", phases: [4], note: "Brand assets and a marketplace presence are prepared so the product is ready to sell." },
  "incorporation": { icon: "incorporation", phases: [3, 4], note: "The legal entity is set up before launch so grants, orders and IP sit in the right place." },
  "funding-investor-access": { icon: "funding", phases: [3, 4], note: "Validated hardware and documentation become the proof behind a raise and a go-to-market plan." },
  "audit-compliance": { icon: "audit", phases: [4], note: "Books, filings and compliance are in order before the product and the entity go public." },
  "lead-gen-networking": { icon: "leads", phases: [4], note: "Introductions and outreach start once there is a launch-ready product to show." },
  "operations": { icon: "operations", phases: [4], note: "Day-to-day operations are handed over in a state the team can run on its own." },

  "single-source-accountability": { icon: "accountability", phases: [2, 3, 4], note: "One purchase order and one accountable team, from first drawing to delivered assembly." },
  "machinery-welding": { icon: "welding", phases: [3, 4], note: "Certified in-house fabrication takes a validated design into structural production." },
  "partner-network-ops": { icon: "partners", phases: [3, 4], note: "Vetted partners extend capacity while we hold the schedule, quality and logistics." },
  "quality-documentation": { icon: "quality", phases: [3, 4], note: "Inspection and documentation travel with every batch from final trials to launch." },
};
