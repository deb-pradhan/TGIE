import { validateEnquiry, enquiryText, type PillarId } from "./schema";

/**
 * POST /api/enquiry
 *
 * Delivers the /start form by email through Resend's REST API. It needs two
 * server-only env vars (see .env.example): RESEND_API_KEY and ENQUIRY_TO_EMAIL
 * (ENQUIRY_FROM_EMAIL is optional). Without them it answers 503
 * { error: "not_configured" } and the client shows the mailto / copy fallback.
 * Env values are read per request and never sent to the client.
 */

const PILLAR_NAMES: Record<PillarId, string> = {
  A: "Engineering",
  B: "Products",
  C: "Enablement",
  D: "Fabrication",
};

const MAX_BODY = 20_000; // bytes; the largest valid payload is ~5 KB
const MIN_FILL_MS = 1_500; // a human cannot fill this form faster
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

// Best-effort limiter: per server instance only (not shared across serverless instances).
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return false;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 150);

const json = (body: Record<string, unknown>, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "unsupported_media_type" }, 415);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: "too_large" }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "invalid" }, 400);
  }
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;

  // Honeypot / too-fast submissions: pretend success so bots learn nothing.
  const elapsed = typeof b.elapsed === "number" ? b.elapsed : Infinity;
  if (typeof b.website === "string" && b.website.length > 0) return json({ ok: true }, 200);
  if (elapsed < MIN_FILL_MS) return json({ ok: true }, 200);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return json({ error: "rate_limited" }, 429);

  const parsed = validateEnquiry(b);
  if (!parsed.ok) return json({ error: "invalid", fields: parsed.errors }, 400);
  const e = parsed.value;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!key || !to) return json({ error: "not_configured" }, 503);
  const from = process.env.ENQUIRY_FROM_EMAIL || "TGIE Website <onboarding@resend.dev>";

  const text = enquiryText(e, PILLAR_NAMES);
  const html = `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.55;color:#1c1b18"><pre style="font-family:inherit;white-space:pre-wrap;margin:0">${esc(text)}</pre></div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: e.email,
        subject: oneLine(`Project enquiry from ${e.name}`),
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("[enquiry] Resend responded", res.status);
      return json({ error: "delivery_failed" }, 502);
    }
  } catch (err) {
    console.error("[enquiry] delivery error", err instanceof Error ? err.message : err);
    return json({ error: "delivery_failed" }, 502);
  }

  return json({ ok: true }, 200);
}

