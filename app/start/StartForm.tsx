"use client";

import { useState } from "react";

const field =
  "w-full rounded-tile border border-line bg-card px-3.5 py-2.5 text-[14px] text-ink outline-none focus-visible:border-teal";
const labelC = "mb-1.5 block text-[12px] font-medium uppercase tracking-[0.08em] text-muted";

export function StartForm() {
  const [sent, setSent] = useState(false);
  const [role, setRole] = useState("researcher");

  if (sent) {
    return (
      <div className="mt-8 rounded-card border border-line bg-card p-6">
        <div className="text-[16px] font-medium">Thanks. We&apos;ve got it.</div>
        <p className="mt-2 text-[14px] text-muted">
          We&apos;ll read what you sent and reply within two working days. In the meantime, the
          idea stays entirely yours.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-8 grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        // Wire to a server action / Resend / Formspree before launch.
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelC} htmlFor="name">
            Name
          </label>
          <input id="name" name="name" required className={field} />
        </div>
        <div>
          <label className={labelC} htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelC} htmlFor="phone">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" required className={field} />
        </div>
        <div>
          <label className={labelC} htmlFor="role">
            You are a
          </label>
          <select
            id="role"
            name="role"
            className={field}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="researcher">Researcher / PhD scholar</option>
            <option value="lab">University R&amp;D lab</option>
            <option value="founder">Founder / spin-off</option>
            <option value="other">Something else</option>
          </select>
        </div>
      </div>
      {role === "other" && (
        <div>
          <label className={labelC} htmlFor="roleOther">
            Tell us what you do
          </label>
          <input id="roleOther" name="roleOther" required className={field} />
        </div>
      )}
      <div>
        <label className={labelC} htmlFor="project">
          What are you building?
        </label>
        <textarea id="project" name="project" rows={5} required className={field} />
      </div>
      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          className="inline-flex cursor-pointer items-center gap-2 rounded-btn border border-transparent bg-inkbtn px-[22px] py-3 text-[14.5px] font-medium text-white shadow-[var(--shadow-btn)] transition-transform duration-150 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-teal"
        >
          Send it
        </button>
        <span className="text-[12.5px] text-muted">We reply within two working days.</span>
      </div>
    </form>
  );
}
