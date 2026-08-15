import { site } from "@/content/site";
import { Eyebrow } from "@/components/primitives/Pill";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/lib/motion";

export function Philosophy() {
  const p = site.philosophy;
  return (
    <Section id="philosophy" containerClassName="text-center">
      <Reveal>
        <div className="flex justify-center">
          <Eyebrow>{p.eyebrow}</Eyebrow>
        </div>
        <h2 className="mx-auto mt-6 max-w-[22ch] font-mono text-[clamp(26px,3.6vw,40px)] font-medium leading-tight tracking-tight text-ink">
          You carry the vision. <span className="text-teal-deep">We carry the weight.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-[56ch] text-[16px] text-muted">{p.sub}</p>
      </Reveal>
      <div className="mt-14 grid gap-8 text-left md:grid-cols-3">
        {p.tenets.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.08}>
            <div className="border-t-2 border-line pt-4">
              <div className="font-mono text-[13px] text-teal">{t.n}</div>
              <h3 className="mt-2 text-[18px] font-medium text-ink">{t.title}</h3>
              <p className="mt-2 text-[13.5px] text-muted">{t.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
