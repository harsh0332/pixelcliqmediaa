"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { automationSchematic } from "@/content/home";
import { EASE } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

const ROW = 58;
const RAIL_WIDTH = 72;
const LEFT = 14;
const RIGHT = 52;

function buildPath(count: number): string {
  const segments: string[] = [];
  for (let i = 0; i < count; i++) {
    const y = ROW / 2 + i * ROW;
    const x = i % 2 === 0 ? LEFT : RIGHT;
    if (i === 0) {
      segments.push(`M ${x} ${y}`);
    } else {
      // Down to the turn, across, then into the node: a real right angle.
      segments.push(`V ${y - ROW / 2}`);
      segments.push(`H ${x}`);
      segments.push(`V ${y}`);
    }
  }
  return segments.join(" ");
}

export interface AutomationSchematicProps {
  className?: string;
}

/**
 * A signal travelling through infrastructure: six nodes on a zig-zag rail, the
 * accent pulse drawing down through them as each one lights.
 *
 * Extracted from the homepage Automation block so the Automation & AI service
 * page can be built around the same schematic. Fills use --surface and strokes
 * use --accent-fg, so it is correct on bone and on the ink band without a
 * variant of its own.
 *
 * Reduced motion renders it complete.
 */
export function AutomationSchematic({ className }: AutomationSchematicProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [step, setStep] = useState(-1);

  const count = automationSchematic.length;
  const height = ROW * count;
  const path = buildPath(count);

  useEffect(() => {
    if (!inView || reduce) return;
    let index = -1;
    const timer = window.setInterval(() => {
      index += 1;
      setStep(index);
      if (index >= count - 1) window.clearInterval(timer);
    }, 267);
    return () => window.clearInterval(timer);
  }, [inView, reduce, count]);

  const activeCount = reduce ? count : step + 1;

  return (
    <div ref={ref} className={cn("flex", className)}>
      <svg
        aria-hidden="true"
        width={RAIL_WIDTH}
        height={height}
        viewBox={`0 0 ${RAIL_WIDTH} ${height}`}
        className="shrink-0"
      >
        <path d={path} fill="none" stroke="var(--line-strong)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <motion.path
          d={path}
          fill="none"
          stroke="var(--accent-fg)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: inView || reduce ? 1 : 0 }}
          // 1600ms: the pulse covers the whole chain in step with the six node
          // activations, so it is timed against them rather than to a token.
          transition={{ duration: reduce ? 0 : 1.6, ease: EASE.inOut }}
        />
        {automationSchematic.map((node, index) => {
          const x = index % 2 === 0 ? LEFT : RIGHT;
          const y = ROW / 2 + index * ROW;
          const lit = index < activeCount;
          return (
            <rect
              key={node}
              x={x - 3.5}
              y={y - 3.5}
              width={7}
              height={7}
              fill={lit ? "var(--accent-fg)" : "var(--surface)"}
              stroke={lit ? "var(--accent-fg)" : "var(--line-strong)"}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              className="transition-[fill,stroke] duration-300"
            />
          );
        })}
      </svg>

      <ol className="flex-1">
        {automationSchematic.map((node, index) => (
          <li key={node} style={{ height: ROW }} className="flex items-center">
            <span
              className={cn(
                "type-label transition-colors duration-300",
                index < activeCount ? "text-ink" : "text-ink-muted",
              )}
            >
              {node}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
