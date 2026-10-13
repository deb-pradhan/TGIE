/**
 * Enquiry schema shared by the /start form (client, inline validation) and the
 * /api/enquiry route handler (server, authoritative). Hand-written, no deps.
 */
export const ROLES = ["researcher", "lab", "founder", "other"] as const;
export const PILLAR_IDS = ["A", "B", "C", "D"] as const;

export type Role = (typeof ROLES)[number];
export type PillarId = (typeof PILLAR_IDS)[number];

export const LIMITS = {
  name: 120,
  email: 254,
  phone: 32,
  roleOther: 120,
  project: 4000,
  projectMin: 10,
} as const;

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  role: Role;
  roleOther: string;
  project: string;
  pillars: PillarId[];
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]+$/;

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Normalises untrusted input and validates it. Never throws. */
export function validateEnquiry(raw: unknown):
  | { ok: true; value: Enquiry }
  | { ok: false; errors: EnquiryErrors } {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const role = (ROLES as readonly string[]).includes(r.role as string) ? (r.role as Role) : "researcher";
  const pillars = Array.isArray(r.pillars)
    ? PILLAR_IDS.filter((p) => (r.pillars as unknown[]).includes(p))
    : [];
  const value: Enquiry = {
    name: str(r.name),
    email: str(r.email),
    phone: str(r.phone),
    role,
    roleOther: str(r.roleOther),
    project: str(r.project),
    pillars,
  };

  const errors: EnquiryErrors = {};
  if (!value.name) errors.name = "Please tell us your name.";
  else if (value.name.length > LIMITS.name) errors.name = `Keep it under ${LIMITS.name} characters.`;

  if (!value.email) errors.email = "Please add an email we can reply to.";
  else if (value.email.length > LIMITS.email || !EMAIL_RE.test(value.email))
    errors.email = "That email doesn't look right.";

  const digits = value.phone.replace(/\D/g, "").length;
  if (!value.phone) errors.phone = "Please add a phone number.";
  else if (value.phone.length > LIMITS.phone || !PHONE_RE.test(value.phone) || digits < 7 || digits > 15)
    errors.phone = "Use digits, spaces and an optional + only (7 to 15 digits).";

  if (value.role === "other") {
    if (!value.roleOther) errors.roleOther = "Tell us briefly what you do.";
    else if (value.roleOther.length > LIMITS.roleOther) errors.roleOther = `Keep it under ${LIMITS.roleOther} characters.`;
  } else {
    value.roleOther = "";
  }

  if (value.project.length < LIMITS.projectMin)
    errors.project = "A sentence or two helps us scope this properly.";
  else if (value.project.length > LIMITS.project) errors.project = `Keep it under ${LIMITS.project} characters.`;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

export const ROLE_LABEL: Record<Role, string> = {
  researcher: "Researcher / PhD scholar",
  lab: "University R&D lab",
  founder: "Founder / spin-off",
  other: "Something else",
};

/** Plain-text rendering used for the email body and the copy/mailto fallback. */
export function enquiryText(e: Enquiry, pillarNames: Record<PillarId, string>): string {
  return [
    `Name: ${e.name}`,
    `Email: ${e.email}`,
    `Phone: ${e.phone}`,
    `Role: ${e.role === "other" ? `${ROLE_LABEL.other} (${e.roleOther})` : ROLE_LABEL[e.role]}`,
    `Pillars of interest: ${e.pillars.length ? e.pillars.map((p) => `${p} ${pillarNames[p]}`).join(", ") : "not specified"}`,
    "",
    "What they are building:",
    e.project,
  ].join("\n");
}
