import { site } from "./site";

/** /start (conversion page) copy. Contact facts live in content/site.ts (from public/brochure.html). */
export const start = {
  eyebrow: "Start a project",
  line1: "Tell us what you're building.",
  line2: "We'll carry the weight.",
  lead: "Whether it's a thesis apparatus or a product you want in the market, start here. You keep the idea. We handle the making.",

  next: {
    title: "What happens next",
    steps: [
      {
        icon: "phone" as const,
        title: "Scoping call",
        note: "We talk through what you're building, where it has to work, and who it's for.",
      },
      {
        icon: "design" as const,
        title: "Scoped plan",
        note: "You get a plan across the pillars your project needs, mapped to the four phases.",
      },
      {
        icon: "build" as const,
        title: "Build",
        note: "We build it and hand it all back. You own everything we make.",
      },
    ],
    /** already stated in the original form copy */
    response: "We reply within two working days.",
  },

  contact: {
    title: "Prefer to talk?",
    phone: site.contact.phone,
    phoneHref: site.contact.phoneHref,
    place: site.contact.location,
  },

  assurance: "100% IP transfer. Zero lock-in.",

  form: {
    pillarsLabel: "Where do you need us?",
    pillarsHint: "Optional. Pick any that apply.",
    ready: {
      title: "Your message is ready to send.",
      /** shown when a contact email is published (NEXT_PUBLIC_CONTACT_EMAIL) */
      actionEmail: "Your email app should open with it filled in. Press send there to deliver it; nothing is sent until you do. If nothing opened, use the buttons below.",
      /** no contact email yet: only copy + phone are offered, so do not promise email */
      actionNoEmail: "Copy it and call us, and we'll take it from there.",
    },
  },
};
