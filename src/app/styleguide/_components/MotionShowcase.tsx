"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Rule } from "@/components/ui/Rule";
import { CountUp } from "@/components/motion/CountUp";
import { FadeUp } from "@/components/motion/FadeUp";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Parallax } from "@/components/motion/Parallax";
import { RevealText } from "@/components/motion/RevealText";
import { ScrollProgressLine } from "@/components/motion/ScrollProgressLine";
import { Stagger } from "@/components/motion/Stagger";

function Demo({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Eyebrow as="p" tone="ink">
        {title}
      </Eyebrow>
      <p className="type-caption mt-2 max-w-measure">{note}</p>
      <div className="mt-6">{children}</div>
      <Rule className="mt-10" />
    </div>
  );
}

export function MotionShowcase() {
  // Remounting resets the once-only viewport animations so they can be replayed.
  const [runId, setRunId] = useState(0);
  const reduce = useReducedMotion();
  const progressTarget = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm" onClick={() => setRunId((n) => n + 1)}>
          Replay entrances
        </Button>
        <span className="type-caption">
          prefers-reduced-motion is currently{" "}
          <strong className="text-ink">{reduce ? "ON" : "OFF"}</strong>
          {reduce
            ? " — every component below renders its final state instantly."
            : " — toggle it in your OS settings to verify the fallbacks."}
        </span>
      </div>

      <div key={runId} className="mt-12 space-y-10">
        <Demo
          title="RevealText"
          note="Masked per-line reveal. Lines are measured after layout, then each rises from behind its own edge with a 0.06s stagger. Select the text or resize the window — the split survives both."
        >
          <RevealText className="type-h1 max-w-[18ch]">
            The growth system behind D2C brands that scale.
          </RevealText>
        </Demo>

        <Demo
          title="FadeUp"
          note="24px up, fading in, once, at 20% visibility. The default entrance."
        >
          <div className="flex flex-wrap gap-4">
            {[0, 0.1, 0.2].map((delay) => (
              <FadeUp key={delay} delay={delay}>
                <div className="rounded-md border border-line bg-paper px-6 py-5">
                  <span className="type-body-sm">delay {delay}s</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </Demo>

        <Demo
          title="Stagger"
          note="Wraps each direct child and offsets it by 0.06s. Works with any markup, not only FadeUp."
        >
          <Stagger className="grid gap-4 sm:grid-cols-3">
            {["Creative", "Media", "Commerce"].map((label) => (
              <div
                key={label}
                className="rounded-md border border-line bg-paper px-6 py-5"
              >
                <span className="type-body-sm">{label}</span>
              </div>
            ))}
          </Stagger>
        </Demo>

        <Demo
          title="Parallax"
          note="Scroll-linked drift, capped at 60px, transform only. Disabled below 768px and under reduced motion. Scroll past it to see the offset."
        >
          <div className="flex gap-6">
            <Parallax speed={0.4} className="flex-1">
              <div className="flex h-40 items-center justify-center rounded-md bg-sand">
                <span className="type-caption">speed 0.4</span>
              </div>
            </Parallax>
            <Parallax speed={-0.4} className="flex-1">
              <div className="flex h-40 items-center justify-center rounded-md bg-accent-wash">
                <span className="type-caption">speed -0.4</span>
              </div>
            </Parallax>
          </div>
        </Demo>

        <Demo
          title="MagneticButton"
          note="Follows the cursor to a maximum of 8px, spring stiffness 150 damping 15. Pointer devices only. Tab to the button — focus never moves the target."
        >
          <MagneticButton className="inline-block">
            <Button>Book a Growth Call</Button>
          </MagneticButton>
        </Demo>

        <Demo
          title="ScrollProgressLine"
          note="A 1px accent line that draws as its target scrolls through. Used by the Compound Loop and the process section. Animates scaleY from a pinned origin."
        >
          <div ref={progressTarget} className="flex gap-8">
            <ScrollProgressLine target={progressTarget} className="h-48" />
            <div className="type-body-sm max-w-measure text-ink-soft">
              <p>
                The line beside this block fills as the block passes through the
                viewport. Under reduced motion it renders complete and static, so
                it still reads as structure rather than vanishing.
              </p>
            </div>
          </div>
          <ScrollProgressLine
            target={progressTarget}
            orientation="horizontal"
            className="mt-8"
          />
        </Demo>

        <Demo
          title="CountUp"
          note="Animates numbers on entry — and renders anything non-numeric verbatim, without animating. This is the rule that keeps the numbers page honest."
        >
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <span className="type-display block">
                <CountUp value="1,240" />
              </span>
              <span className="type-caption">numeric — animates</span>
            </div>
            <div>
              <span className="type-display block">
                <CountUp value="98.5" suffix="%" />
              </span>
              <span className="type-caption">decimal with suffix</span>
            </div>
            <div>
              <span className="type-display block text-ink-muted">
                <CountUp value="[VALUE]" />
              </span>
              <span className="type-caption">
                placeholder — rendered as-is, never animated
              </span>
            </div>
          </div>
        </Demo>
      </div>
    </div>
  );
}
