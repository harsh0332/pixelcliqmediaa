import { loopStages } from "@/content/growthSystem";
import { roundedPolygonPath, nodePosition, nodeSide } from "@/lib/compoundLoop";
import { cn } from "@/lib/utils";

/**
 * A static Compound Loop.
 *
 * Same geometry module as the homepage version, with every stage lit and
 * nothing scroll-driven — no pin, no drawing, no client JavaScript. A page that
 * is explaining the idea rather than performing it should not make the reader
 * scroll three viewports to see the whole diagram.
 *
 * The ring is decorative; the ordered list carries the meaning.
 */
const TOTAL = loopStages.length;
const RING_RADIUS = 34;
const LABEL_RADIUS = 45;

const SIDE_CLASS = {
  right: "md:text-left",
  left: "md:text-right",
  centre: "md:text-center",
} as const;

export function StaticCompoundLoop() {
  return (
    <div className="relative mx-auto w-full md:aspect-square md:max-w-[34rem] lg:max-w-[40rem]">
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute inset-0 hidden size-full md:block"
      >
        <path
          // Same rounded heptagon as the scroll-linked ring, so /about and the
          // reduced-motion fallback show the same shape as the animated section.
          d={roundedPolygonPath(TOTAL, RING_RADIUS, 4.8)}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
        {loopStages.map((stage, index) => {
          const point = nodePosition(index, TOTAL, RING_RADIUS);
          return (
            <circle
              key={stage.id}
              cx={point.x}
              cy={point.y}
              r={1.2}
              fill="var(--accent)"
              stroke="var(--accent)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      <ol className="relative border-t border-line md:absolute md:inset-0 md:border-0">
        {loopStages.map((stage, index) => {
          const point = nodePosition(index, TOTAL, LABEL_RADIUS);
          return (
            <li
              key={stage.id}
              style={
                {
                  "--node-x": `${point.x}%`,
                  "--node-y": `${point.y}%`,
                } as React.CSSProperties
              }
              className={cn(
                "border-b border-line py-4 md:border-0 md:py-0",
                "md:absolute md:left-[var(--node-x)] md:top-[var(--node-y)] md:w-[9rem]",
                "md:-translate-x-1/2 md:-translate-y-1/2",
                SIDE_CLASS[nodeSide(index, TOTAL)],
              )}
            >
              <span className="type-label text-ink-muted tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="type-h3 mt-1 block">{stage.label}</span>
              <span className="type-caption mt-1 block">{stage.oneLiner}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
