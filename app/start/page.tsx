import { pageMeta } from "@/lib/pageMeta";
import { start } from "@/content/start";
import { PageHero } from "@/components/sections/PageHero";
import { FrameBlock, Cell, GapStrip } from "@/components/frame/Grid";
import { Icon } from "@/components/icons/Icon";
import { ConversationScene } from "@/components/illustration/work/ConversationScene";
import { StartForm } from "./StartForm";

export const metadata = pageMeta({
  title: "Start a project",
  description:
    "Tell us what you're building. A scoping call, a scoped plan, then the build. You keep the idea and own everything we make.",
  path: "/start",
});

export default function StartPage() {
  const { next, contact } = start;
  // public, optional: the visible contact email for the mailto fallback (see .env.example)
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined;

  return (
    <div className="flex flex-col gap-[2px] bg-paper pb-[2px]">
      <PageHero
        eyebrow={start.eyebrow}
        line1={start.line1}
        line2={start.line2}
        lead={start.lead}
        art={<ConversationScene />}
      />

      <GapStrip />
      <FrameBlock>
        <div className="grid gap-[2px] lg:grid-cols-[1.3fr_0.7fr]">
          <Cell className="px-[var(--gutter)] py-12 sm:py-14">
            <h2 className="mb-7 font-mono text-[18px] font-medium tracking-tight text-ink">Send us the brief</h2>
            <StartForm contactEmail={contactEmail} />
          </Cell>

          <div className="flex flex-col gap-[2px]">
            <Cell className="flex-1 px-6 py-8 sm:px-8">
              <h2 className="font-mono text-[18px] font-medium tracking-tight text-ink">{next.title}</h2>
              <ol className="relative mt-6 flex flex-col gap-6">
                <span aria-hidden className="absolute bottom-6 left-5 top-6 w-px border-l border-dashed border-accent/60" />
                {next.steps.map((s, i) => (
                  <li key={s.title} className="relative flex gap-4">
                    <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-[12px] border border-line bg-card text-accent-deep">
                      <Icon name={s.icon} size={20} />
                    </span>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="font-mono text-[15px] font-medium tracking-tight text-ink">{s.title}</div>
                      <p className="mt-1 text-[13.5px] text-ink-2">{s.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-7 inline-flex items-center gap-2 rounded-chip border border-line bg-card px-3 py-1.5 text-[12.5px] text-ink-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {next.response}
              </p>
            </Cell>

            <Cell className="bg-accent-pale px-6 py-7 sm:px-8">
              <h2 className="font-mono text-[15px] font-medium tracking-tight text-ink">{contact.title}</h2>
              <a
                href={contact.phoneHref}
                className="mt-1 flex min-h-[44px] items-center gap-2.5 font-mono text-[17px] font-medium tracking-tight text-ink hover:text-accent-deep"
              >
                <Icon name="phone" size={18} className="text-accent-deep" />
                {contact.phone}
              </a>
              <div className="mt-2 flex items-center gap-2.5 text-[13.5px] text-ink-2">
                <Icon name="pin" size={18} className="text-accent-deep" />
                {contact.place}
              </div>
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} className="flex min-h-[44px] items-center gap-2.5 text-[13.5px] text-ink-2 hover:text-accent-deep">
                  <Icon name="mail" size={18} className="text-accent-deep" />
                  {contactEmail}
                </a>
              )}
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-deep">{start.assurance}</p>
            </Cell>
          </div>
        </div>
      </FrameBlock>
    </div>
  );
}
