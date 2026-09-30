import { SpineLine } from "@/components/motion/SpineLine";
import { AutomationBlock } from "@/components/sections/story/AutomationBlock";
import { CommerceFlowBlock } from "@/components/sections/story/CommerceFlowBlock";
import { PerformanceBlock } from "@/components/sections/story/PerformanceBlock";
import { SeoBlock } from "@/components/sections/story/SeoBlock";

/**
 * Four blocks, four structures, alternating bone and sand.
 *
 *   1  Commerce    horizontal flow      — the path spend takes
 *   2  Performance asymmetric equation  — the parts that must agree
 *   3  Automation  vertical schematic   — a signal through infrastructure
 *   4  SEO         type only, no graphic — the rhythm reset
 *
 * The order is deliberate: three diagrams then none. A fourth would stop
 * reading as a decision and start reading as a habit.
 */
export function StoryBlocks() {
  return (
    // One accent line runs down the left margin across all four, drawing and
    // retracting with scroll, with a dot at each boundary and each block's
    // eyebrow lighting as the line reaches it. The four blocks are the middle
    // of the page and the only contiguous run long enough for a thread to mean
    // anything — a rule beside a single section is just a border.
    <SpineLine>
      <CommerceFlowBlock />
      <PerformanceBlock />
      <AutomationBlock />
      <SeoBlock />
    </SpineLine>
  );
}
