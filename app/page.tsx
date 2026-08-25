import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { Philosophy } from "@/components/sections/Philosophy";
import { Practices } from "@/components/sections/Practices";
import { Audiences } from "@/components/sections/Audiences";
import { Capabilities } from "@/components/sections/Capabilities";
import { Ownership } from "@/components/sections/Ownership";
import { Lifecycle } from "@/components/sections/Lifecycle";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Faq } from "@/components/sections/Faq";
import { GapStrip, DottedStrip } from "@/components/frame/Grid";

export default function Home() {
  return (
    <div className="flex flex-col gap-[2px] bg-paper pb-[2px]">
      <Hero />
      <TrustBand />
      <GapStrip />
      <Philosophy />
      <GapStrip />
      <Practices />
      <DottedStrip />
      <Audiences />
      <DottedStrip />
      <Capabilities />
      <GapStrip />
      <Lifecycle />
      <GapStrip />
      <Ownership />
      <GapStrip />
      <CaseStudy />
      <DottedStrip />
      <FinalCTA />
      <GapStrip />
      <Faq />
    </div>
  );
}
