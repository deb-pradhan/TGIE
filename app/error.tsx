"use client";

import { useEffect } from "react";
import { FrameBlock, Cell } from "@/components/frame/Grid";
import { Eyebrow } from "@/components/primitives/Pill";
import { TwoToneHeading } from "@/components/primitives/TwoToneHeading";
import { Button } from "@/components/primitives/Button";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <FrameBlock>
      <Cell className="px-[var(--gutter)] py-16 text-ink sm:py-24">
        <Eyebrow>Something broke</Eyebrow>
        <TwoToneHeading as="h1" line1="That didn't load." line2="It's on our side, not yours." className="mt-5" />
        <p className="text-lead mt-6 max-w-[62ch] text-muted">
          An unexpected error stopped this page. Trying again usually clears it. If it keeps happening, call us
          or start a project and we will pick it up from there.
        </p>
        <div className="mt-8 flex flex-wrap gap-3.5">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex items-center gap-2 rounded-btn border border-transparent bg-inkbtn px-[22px] py-3 text-[14.5px] font-medium text-white shadow-[var(--shadow-btn)] transition-[transform,background-color,border-color,box-shadow] duration-150 hover:-translate-y-px active:translate-y-0 active:scale-[0.985]"
          >
            Try again
          </button>
          <Button href="/" variant="ghost">
            Home
          </Button>
          <Button href="/start" variant="ghost">
            Start a Project
          </Button>
        </div>
        {error.digest && <p className="mt-8 font-mono text-[12px] text-muted">Reference: {error.digest}</p>}
      </Cell>
    </FrameBlock>
  );
}
