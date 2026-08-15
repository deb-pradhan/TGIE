import { lifecycle } from "@/content/lifecycle";
import { Section } from "@/components/primitives/Section";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { Reveal } from "@/lib/motion";

export function Lifecycle() {
  return (
    <Section tone="paper2" id="lifecycle">
      <Reveal>
        <div className="mx-auto max-w-[620px] text-center">
          <div className="flex justify-center">
            <Eyebrow>Engagement model</Eyebrow>
          </div>
          <TwoToneHeading
            align="center"
            line1="One phased path"
            line2="from concept to launch."
            className="mt-4"
          />
          <p className="text-lead mx-auto mt-3 text-muted">
            Designed to fit university grant disbursement stages, milestone defenses, and
            early-stage launch timelines.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-12 overflow-hidden rounded-card border border-line bg-card shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between border-b border-line bg-card-soft px-6 py-4">
            <b className="text-[14px] font-medium">Phased research & product development lifecycle</b>
            <span className="rounded-pill bg-mint px-2.5 py-1 text-[10.5px] font-medium text-teal-deep">
              4 phases · single accountable team
            </span>
          </div>
          <div className="grid md:grid-cols-4">
            {lifecycle.map((ph, i) => (
              <div
                key={ph.n}
                className={`relative p-6 ${i < lifecycle.length - 1 ? "border-b border-line md:border-b-0 md:border-r" : ""}`}
              >
                <span className="absolute left-6 top-3.5 h-1 w-7 rounded bg-teal/50" />
                <div className="font-mono text-[13px] text-teal">{ph.n}</div>
                <h3 className="mt-2 font-mono text-[15px] font-medium tracking-tight">{ph.title}</h3>
                <p className="mt-2.5 text-[13px] text-muted">{ph.scope}</p>
                <div className="mt-3.5 rounded-[9px] border border-line bg-card-soft px-3 py-2.5">
                  <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-teal">
                    Objective
                  </div>
                  <div className="mt-0.5 text-[12px] text-ink-2">{ph.objective}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
