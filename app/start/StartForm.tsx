"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { start } from "@/content/start";
import { practices } from "@/content/practices";
import { PillarGlyph } from "@/components/illustration/work/ConceptStages";
import {
  LIMITS,
  PILLAR_IDS,
  ROLE_LABEL,
  enquiryText,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
  type PillarId,
  type Role,
} from "@/app/api/enquiry/schema";

const field =
  "w-full rounded-tile border bg-card px-3.5 py-2.5 text-[16px] text-ink outline-none transition-colors placeholder:text-muted sm:text-[14px] focus-visible:border-accent-deep focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent-deep";
const labelC = "mb-1.5 block text-[12px] font-medium uppercase tracking-[0.08em] text-ink-2";

const PILLAR_NAMES = Object.fromEntries(practices.map((p) => [p.index, p.short])) as Record<PillarId, string>;
const ORDER = ["name", "email", "phone", "role", "roleOther", "project"] as const;

type Status = "idle" | "sending" | "sent" | "fallback";

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" className={cn("shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 4.8v3.8M8 11.2h.01" />
    </svg>
  );
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  aside,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  /** right-aligned note under the control (e.g. a character counter); stays visible alongside an error */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelC} htmlFor={id}>
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-accent-deep">
            *
          </span>
        )}
        {optional && <span className="ml-1.5 font-normal normal-case tracking-normal text-muted">(optional)</span>}
      </label>
      {children}
      {(hint || error || aside) && (
        <div className="mt-1.5 flex items-start justify-between gap-3">
          <div>
            {hint && !error && (
              <p id={`${id}-hint`} className="text-[12px] text-muted">
                {hint}
              </p>
            )}
            {error && (
              <p id={`${id}-err`} role="alert" className="flex items-start gap-1.5 text-[12.5px] font-medium text-ink">
                <ErrorIcon className="mt-[3px]" />
                {error}
              </p>
            )}
          </div>
          {aside}
        </div>
      )}
    </div>
  );
}

export function StartForm({ contactEmail }: { contactEmail?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [role, setRole] = useState<Role>("researcher");
  const [pillars, setPillars] = useState<PillarId[]>([]);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [reason, setReason] = useState<"not_configured" | "failed">("failed");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sendError, setSendError] = useState("");
  const [count, setCount] = useState(0);
  const touched = useRef(new Set<keyof Enquiry>());
  const sendingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const openedAt = useRef<number>(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const fallbackRef = useRef<HTMLHeadingElement>(null);

  const read = (): Record<string, unknown> => {
    const f = new FormData(formRef.current!);
    return {
      name: f.get("name"),
      email: f.get("email"),
      phone: f.get("phone"),
      role,
      roleOther: f.get("roleOther"),
      project: f.get("project"),
      pillars,
    };
  };

  const err = (k: keyof Enquiry) => errors[k];
  const aria = (k: keyof Enquiry, hint = false) => ({
    "aria-invalid": err(k) ? (true as const) : undefined,
    "aria-describedby": err(k) ? `${k}-err` : hint ? `${k}-hint` : undefined,
  });
  const border = (k: keyof Enquiry) => (err(k) ? "border-ink" : "border-field");

  const focusField = (k: string) => formRef.current?.querySelector<HTMLElement>(`[name="${k}"]`)?.focus();

  /** validate a single field on blur, but only once the person has typed in it (or it already shows an error) */
  const blur = (k: keyof Enquiry) => {
    const r = validateEnquiry(read());
    setErrors((prev) => {
      const next = { ...prev };
      if (r.ok || !r.errors[k]) delete next[k];
      else next[k] = r.errors[k];
      return next;
    });
  };

  const touch = (k: keyof Enquiry) => touched.current.add(k);
  const blurTouched = (k: keyof Enquiry) => {
    if (touched.current.has(k) || errors[k]) blur(k);
  };

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sendingRef.current) return;
    const raw = read();
    const r = validateEnquiry(raw);
    if (!r.ok) {
      setErrors(r.errors);
      const first = ORDER.find((k) => r.errors[k]);
      if (first) focusField(first);
      return;
    }
    setErrors({});
    setSendError("");
    sendingRef.current = true;
    setStatus("sending");
    const text = enquiryText(r.value, PILLAR_NAMES);
    setMessage(text);
    const tgie_hp = new FormData(formRef.current!).get("tgie_hp");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...r.value, tgie_hp, elapsed: Date.now() - openedAt.current }),
      });
      if (res.ok) {
        setStatus("sent");
        setTimeout(() => headingRef.current?.focus(), 50);
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: EnquiryErrors };
      if (res.status === 400 && data.fields) {
        setErrors(data.fields);
        setStatus("idle");
        const first = ORDER.find((k) => data.fields?.[k]);
        if (first) focusField(first);
        return;
      }
      if (res.status === 429) {
        setSendError("That's a lot of messages in a short time. Please wait a few minutes and try again.");
        setStatus("idle");
        return;
      }
      setReason(data.error === "not_configured" ? "not_configured" : "failed");
    } catch {
      setReason("failed");
    } finally {
      sendingRef.current = false;
    }
    setStatus("fallback");
    setTimeout(() => fallbackRef.current?.focus(), 50);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const ta = document.getElementById("fallback-message") as HTMLTextAreaElement | null;
      ta?.select();
      document.execCommand("copy");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const mailto = contactEmail
    ? `mailto:${contactEmail}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(message)}`
    : null;
  const sending = status === "sending";

  function backToForm() {
    setStatus("idle");
    setTimeout(() => focusField("name"), 50);
  }

  return (
    <>
      {status === "sent" && (
        <div role="status" className="rounded-card border border-line bg-card p-6">
          <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-accent-pale text-accent-deep">
            <svg aria-hidden width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <h2 ref={headingRef} tabIndex={-1} className="mt-4 font-mono text-[18px] font-medium tracking-tight outline-none">
            {start.form.success.title}
          </h2>
          <p className="mt-2 text-[14px] text-ink-2">{start.form.success.body}</p>
        </div>
      )}

      {status === "fallback" && (
        <div className="rounded-card border border-line bg-card p-6">
          <h2 ref={fallbackRef} tabIndex={-1} className="font-mono text-[17px] font-medium tracking-tight outline-none">
            {reason === "not_configured" ? start.form.fallback.notConfigured : start.form.fallback.failed}
          </h2>
          <p className="mt-2 text-[14px] text-ink-2">
            {mailto ? start.form.fallback.actionEmail : start.form.fallback.actionNoEmail}
          </p>
          <label htmlFor="fallback-message" className={cn(labelC, "mt-5")}>
            Your message
          </label>
          <textarea
            id="fallback-message"
            readOnly
            rows={9}
            value={message}
            onFocus={(e) => e.currentTarget.select()}
            className={cn(field, "border-field font-mono text-[12.5px] leading-relaxed")}
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {mailto && (
              <a href={mailto} className="inline-flex items-center gap-2 rounded-btn bg-inkbtn px-[22px] py-3 text-[14.5px] font-medium text-white shadow-[var(--shadow-btn)] hover:-translate-y-px">
                Open in your email app
              </a>
            )}
            <button
              type="button"
              onClick={copy}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-btn border px-[22px] py-3 text-[14.5px] font-medium",
                mailto ? "border-field bg-transparent text-ink hover:border-ink" : "border-transparent bg-inkbtn text-white shadow-[var(--shadow-btn)] hover:-translate-y-px",
              )}
            >
              {copied ? "Copied" : "Copy message"}
            </button>
            <a href={start.contact.phoneHref} className="inline-flex min-h-[44px] items-center text-[14px] font-medium text-accent-deep underline-offset-4 hover:underline">
              Call {start.contact.phone}
            </a>
          </div>
          <button
            type="button"
            onClick={backToForm}
            className="mt-5 inline-flex min-h-[44px] cursor-pointer items-center text-[13px] text-muted underline underline-offset-4 hover:text-ink"
          >
            Back to the form
          </button>
          <span aria-live="polite" className="sr-only">
            {copied ? "Message copied to clipboard" : ""}
          </span>
        </div>
      )}

      {/* Stays mounted (just hidden) while the success/fallback panel shows, so "Back to the form" keeps what was typed. */}
      <form ref={formRef} noValidate onSubmit={onSubmit} hidden={status === "sent" || status === "fallback"} className="grid gap-5" aria-busy={sending}>
        {/* honeypot: real people never see or reach this; bots fill it. Name avoids browser autofill heuristics. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="tgie_hp">Leave this field empty</label>
          <input id="tgie_hp" name="tgie_hp" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <p className="text-[12px] text-muted">
          <span aria-hidden className="text-accent-deep">
            *
          </span>{" "}
          Required
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Name" required error={err("name")}>
            <input id="name" name="name" autoComplete="name" maxLength={LIMITS.name} required onInput={() => touch("name")} onBlur={() => blurTouched("name")} className={cn(field, border("name"))} {...aria("name")} />
          </Field>
          <Field id="email" label="Email" required error={err("email")}>
            <input id="email" name="email" type="email" autoComplete="email" maxLength={LIMITS.email} required onInput={() => touch("email")} onBlur={() => blurTouched("email")} className={cn(field, border("email"))} {...aria("email")} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="phone" label="Phone" required error={err("phone")}>
            <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={LIMITS.phone} required onInput={() => touch("phone")} onBlur={() => blurTouched("phone")} className={cn(field, border("phone"))} {...aria("phone")} />
          </Field>
          <Field id="role" label="You are a" optional>
            <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value as Role)} className={cn(field, "min-h-[44px] border-field")}>
              {(Object.keys(ROLE_LABEL) as Role[]).map((r) => (
                <option key={r} value={r}>
                  {ROLE_LABEL[r]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {role === "other" && (
          <Field id="roleOther" label="Tell us what you do" required error={err("roleOther")}>
            <input id="roleOther" name="roleOther" maxLength={LIMITS.roleOther} required onInput={() => touch("roleOther")} onBlur={() => blurTouched("roleOther")} className={cn(field, border("roleOther"))} {...aria("roleOther")} />
          </Field>
        )}

        <fieldset>
          <legend className={labelC}>
            {start.form.pillarsLabel}
            <span className="ml-1.5 font-normal normal-case tracking-normal text-muted">(optional)</span>
          </legend>
          <p className="-mt-0.5 mb-2.5 text-[12px] text-muted">{start.form.pillarsHint}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PILLAR_IDS.map((p) => {
              const on = pillars.includes(p);
              return (
                <label key={p} className="relative block cursor-pointer">
                  <input
                    type="checkbox"
                    name="pillars"
                    value={p}
                    checked={on}
                    onChange={() => setPillars((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]))}
                    className="peer sr-only"
                  />
                  <span
                    className={cn(
                      "flex h-full min-h-[44px] items-center gap-2 rounded-tile border px-3 py-2 font-mono text-[12.5px] tracking-tight transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-accent-deep",
                      on ? "border-accent bg-accent-pale text-accent-deep" : "border-field bg-card text-ink-2 hover:border-ink",
                    )}
                  >
                    <PillarGlyph pillar={p} size={18} />
                    <span>
                      <span className="font-medium">{p}</span> {PILLAR_NAMES[p]}
                    </span>
                    {on && (
                      <svg aria-hidden width="12" height="12" viewBox="0 0 24 24" className="ml-auto" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                      </svg>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <Field
          id="project"
          label="What are you building?"
          required
          error={err("project")}
          hint="A sentence or two is enough to start."
          aside={
            <span aria-hidden className={cn("shrink-0 font-mono text-[12px] tabular-nums", count > LIMITS.project ? "font-medium text-ink" : "text-muted")}>
              {count} / {LIMITS.project}
            </span>
          }
        >
          <textarea
            id="project"
            name="project"
            rows={5}
            required
            onInput={(e) => {
              touch("project");
              setCount(e.currentTarget.value.length);
            }}
            onBlur={() => blurTouched("project")}
            className={cn(field, border("project"), "resize-y")}
            {...aria("project", true)}
          />
        </Field>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          <button
            type="submit"
            aria-disabled={sending}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-btn border border-transparent bg-inkbtn px-[22px] py-3 text-[14.5px] font-medium text-white shadow-[var(--shadow-btn)] transition-transform duration-150 hover:-translate-y-px aria-disabled:cursor-wait aria-disabled:opacity-80 aria-disabled:hover:translate-y-0"
          >
            {sending && (
              <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" className="animate-spin" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M12 3a9 9 0 1 0 9 9" />
              </svg>
            )}
            {sending ? "Sending" : "Send it"}
          </button>
          <span className="text-[12.5px] text-muted">{start.next.response}</span>
        </div>
        {sendError && (
          <div role="alert" className="flex items-start gap-2.5 rounded-tile border border-ink bg-card px-4 py-3 text-[13px] font-medium text-ink">
            <ErrorIcon className="mt-[3px]" />
            {sendError}
          </div>
        )}
        <p aria-live="polite" className="sr-only">
          {sending ? "Sending your message" : ""}
        </p>
      </form>
    </>
  );
}
