import type { Metadata } from "next";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { StartForm } from "./StartForm";

export const metadata: Metadata = {
  title: "Start a project — TGIE",
  description: "Tell us what you're building. We'll carry the weight.",
};

export default function StartPage() {
  return (
    <Section className="min-h-[70vh] pt-24">
      <div className="mx-auto max-w-[640px]">
        <Eyebrow>Start a project</Eyebrow>
        <TwoToneHeading
          as="h1"
          line1="Tell us what you're building."
          line2="We'll carry the weight."
          className="mt-4"
        />
        <p className="text-lead mt-4 text-muted">
          Whether it&apos;s a thesis apparatus or a product you want in the market, start here.
          You keep the idea. We handle the making.
        </p>
        <StartForm />
      </div>
    </Section>
  );
}
