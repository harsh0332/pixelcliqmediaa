"use client";

import { useState } from "react";
import { EASING, MOTION } from "@/lib/design-tokens";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const DURATION_VAR = ["--dur-instant", "--dur-fast", "--dur-base", "--dur-slow"] as const;

/**
 * Runs both easings side by side at a chosen duration so the difference is
 * visible rather than theoretical. Honours prefers-reduced-motion through the
 * global rule in globals.css — with motion reduced, the dots jump.
 */
export function EaseDemo() {
  const [out, setOut] = useState(false);
  const [durationIndex, setDurationIndex] = useState(2);
  const durationVar = DURATION_VAR[durationIndex] ?? "--dur-base";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" onClick={() => setOut((v) => !v)}>
          {out ? "Send back" : "Play"}
        </Button>
        <div className="flex flex-wrap gap-1">
          {MOTION.map((m, i) => (
            <button
              key={m.cssVar}
              type="button"
              onClick={() => setDurationIndex(i)}
              aria-pressed={i === durationIndex}
              className={cn(
                "type-button rounded-pill border px-3 py-1.5 transition-colors duration-150",
                i === durationIndex
                  ? "border-ink bg-ink text-bone"
                  : "border-line-strong text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              {m.value}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {EASING.map((e) => (
          <div key={e.cssVar}>
            <div className="flex items-baseline justify-between gap-4">
              <code className="type-body-sm">--{e.cssVar}</code>
              <span className="type-caption">{e.use}</span>
            </div>
            <div className="@container relative mt-3 h-10 border-t border-line">
              <div
                className="absolute top-3 size-4 rounded-pill bg-accent"
                style={{
                  transitionProperty: "transform",
                  transitionTimingFunction: `var(--${e.cssVar})`,
                  transitionDuration: `var(${durationVar})`,
                  transform: out ? "translateX(calc(100cqw - 1rem))" : "translateX(0)",
                }}
              />
            </div>
            <p className="type-caption mt-2">{e.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
