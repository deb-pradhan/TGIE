import { lifecycle } from "@/content/lifecycle";
import { Section } from "@/components/primitives/Section";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Eyebrow } from "@/components/primitives/Pill";
import { Icon, type IconName } from "@/components/icons/Icon";
import { Reveal } from "@/lib/motion";
import { RoadmapDesktop, StationMobile } from "@/components/illustration/home2/LifecycleArt";

const phaseIcon: IconName[] = ["discover", "design", "build", "handover"];

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
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-card-soft px-5 py-4 sm:px-6">
            <b className="text-[14px] font-medium">Phased research & product development lifecycle</b>
            <span className="rounded-pill bg-mint px-2.5 py-1 text-[10.5px] font-medium text-teal-deep">
              4 phases · single accountable team
            </span>
          </div>

          <div className="iso-grid hidden border-b border-line bg-card-soft md:block">
            <RoadmapDesktop />
          </div>

          <div className="relative grid md:grid-cols-4">
            {/* mobile: the path becomes a vertical dashed rail */}
            <span aria-hidden className="absolute bottom-6 left-[22px] top-6 border-l-2 border-dashed border-teal/50 md:hidden" />
            {lifecycle.map((ph, i) => (
              <div
                key={ph.n}
                className={`relative pb-6 pl-[52px] pr-5 pt-6 md:p-6 ${i < lifecycle.length - 1 ? "border-b border-line md:border-b-0 md:border-r" : ""}`}
              >
                <span
                  aria-hidden
                  className="absolute left-[14px] top-[30px] grid h-4 w-4 place-items-center rounded-full border-2 border-teal bg-card md:hidden"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                </span>
                <StationMobile i={i} />
                <div className="mt-3 flex items-center gap-2.5 md:mt-0">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-mint text-teal-deep">
                    <Icon name={phaseIcon[i]} size={17} />
                  </span>
                  <div className="font-mono text-[13px] text-teal">{ph.n}</div>
                </div>
                <h3 className="mt-3 font-mono text-[15px] font-medium tracking-tight">{ph.title}</h3>
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
