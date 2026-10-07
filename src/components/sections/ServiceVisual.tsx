import type { PillarId } from "@/types";
import { cn } from "@/lib/utils";

/**
 * One structural visual per pillar.
 *
 * ABSOLUTE RULE, enforced by construction: these show shape, never values.
 * There is not a single digit in this file. No mock dashboards, no invented
 * figures, no chart tooltips, no axis labels — a competitor ships animated
 * mockups cycling randomised numbers, which is fabricated evidence. Where a
 * visual would need a number to make sense, it was redesigned instead.
 *
 * Drawn in hairlines to match the rest of the site, with `vectorEffect` so the
 * strokes stay 1px however the frame scales. The accent appears once per visual,
 * marking the thing the pillar actually changes.
 *
 * Each is labelled with a real description rather than left decorative — they
 * carry meaning, so `role="img"` and `aria-label` are appropriate.
 */

const stroke = {
  fill: "none" as const,
  vectorEffect: "non-scaling-stroke" as const,
  strokeWidth: 1,
};

const line = "var(--line-strong)";
const accent = "var(--accent)";

function Frame({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={label}
      className={cn("size-full", className)}
    >
      {children}
    </svg>
  );
}

/** 01 — demand narrowing through the funnel, with the profitable step marked. */
function GrowthFunnel() {
  const rows = [
    { y: 70, half: 150 },
    { y: 125, half: 112 },
    { y: 180, half: 74 },
    { y: 235, half: 36 },
  ];
  return (
    <Frame label="A funnel schematic: four stages narrowing downward, the final stage marked in accent.">
      {rows.map((row, index) => (
        <g key={row.y}>
          <line
            x1={200 - row.half}
            y1={row.y}
            x2={200 + row.half}
            y2={row.y}
            stroke={index === rows.length - 1 ? accent : line}
            {...stroke}
          />
          {index < rows.length - 1 ? (
            <>
              <line
                x1={200 - row.half}
                y1={row.y}
                x2={200 - rows[index + 1]!.half}
                y2={rows[index + 1]!.y}
                stroke={line}
                {...stroke}
              />
              <line
                x1={200 + row.half}
                y1={row.y}
                x2={200 + rows[index + 1]!.half}
                y2={rows[index + 1]!.y}
                stroke={line}
                {...stroke}
              />
            </>
          ) : null}
        </g>
      ))}
    </Frame>
  );
}

/** 02 — the native ad ratios the work is actually made in. */
function CreativeCluster() {
  return (
    <Frame label="A cluster of creative frames in native ad ratios: two vertical nine-by-sixteen frames and one four-by-five frame, overlapping.">
      <g transform="rotate(-3 120 150)">
        <rect x={70} y={70} width={90} height={160} rx={6} stroke={line} {...stroke} />
      </g>
      <g transform="rotate(2 210 150)">
        <rect x={168} y={95} width={112} height={140} rx={6} stroke={accent} {...stroke} />
      </g>
      <g transform="rotate(4 300 150)">
        <rect x={266} y={72} width={78} height={139} rx={6} stroke={line} {...stroke} />
      </g>
    </Frame>
  );
}

/** 03 — the path from listing to product to checkout, as wireframes. */
function CommerceFlow() {
  const screens = [24, 152, 280];
  return (
    <Frame label="A wireframe store flow: three screens — collection, product and checkout — connected left to right, with the checkout step marked in accent.">
      {screens.map((x, index) => {
        const isLast = index === screens.length - 1;
        return (
          <g key={x}>
            <rect
              x={x}
              y={78}
              width={96}
              height={144}
              rx={6}
              stroke={isLast ? accent : line}
              {...stroke}
            />
            <line x1={x} y1={100} x2={x + 96} y2={100} stroke={line} {...stroke} />
            <line x1={x + 14} y1={124} x2={x + 82} y2={124} stroke={line} {...stroke} />
            <line x1={x + 14} y1={140} x2={x + 60} y2={140} stroke={line} {...stroke} />
            <rect
              x={x + 14}
              y={176}
              width={68}
              height={20}
              rx={10}
              stroke={isLast ? accent : line}
              {...stroke}
            />
            {!isLast ? (
              <>
                <line x1={x + 104} y1={150} x2={x + 144} y2={150} stroke={line} {...stroke} />
                <path
                  d={`M ${x + 138} 145 L ${x + 144} 150 L ${x + 138} 155`}
                  stroke={line}
                  {...stroke}
                />
              </>
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}

/** 05 — flows connecting the tools that would otherwise be joined by hand. */
function AutomationNodes() {
  const nodes = [
    { x: 70, y: 90 },
    { x: 70, y: 210 },
    { x: 200, y: 150 },
    { x: 330, y: 80 },
    { x: 330, y: 150 },
    { x: 330, y: 220 },
  ];
  const edges = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
    [2, 5],
  ] as const;
  return (
    <Frame label="A node and connector schematic: two inputs joining a central hub, which fans out to three outputs. The hub and its outgoing paths are marked in accent.">
      {edges.map(([from, to]) => {
        const a = nodes[from]!;
        const b = nodes[to]!;
        return (
          <path
            key={`${from}-${to}`}
            d={`M ${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y}, ${(a.x + b.x) / 2} ${b.y}, ${b.x} ${b.y}`}
            stroke={from === 2 ? accent : line}
            {...stroke}
          />
        );
      })}
      {nodes.map((node, index) => (
        <circle
          key={`${node.x}-${node.y}`}
          cx={node.x}
          cy={node.y}
          r={index === 2 ? 9 : 6}
          stroke={index === 2 ? accent : line}
          {...stroke}
          fill="var(--bone)"
        />
      ))}
    </Frame>
  );
}

/** 06 — a trend line with no axis values, because we have none to show. */
function DataChart() {
  return (
    <Frame label="A line chart showing an upward trend, drawn with no values on either axis.">
      <line x1={50} y1={60} x2={50} y2={240} stroke={line} {...stroke} />
      <line x1={50} y1={240} x2={360} y2={240} stroke={line} {...stroke} />
      {[100, 150, 200].map((y) => (
        <line key={y} x1={50} y1={y} x2={360} y2={y} stroke="var(--line)" {...stroke} />
      ))}
      <path
        d="M 62 215 L 112 200 L 162 208 L 212 172 L 262 150 L 312 108 L 352 84"
        stroke={accent}
        strokeLinecap="round"
        {...stroke}
      />
      <circle cx={352} cy={84} r={4} stroke={accent} {...stroke} fill={accent} />
    </Frame>
  );
}

/**
 * 04 — deliberately typographic, with no diagram.
 *
 * Organic is not a mechanism you can usefully draw; drawing one would be
 * decoration pretending to be information. HTML rather than SVG so the word is
 * real, selectable text in the real typeface.
 */
function OrganicType() {
  return (
    <div className="flex size-full items-center justify-center overflow-hidden px-8">
      <p className="type-display text-center leading-none text-ink">
        <span className="type-emphasis">Organic</span>
        <span className="type-caption mt-4 block tracking-[0.14em] uppercase">
          Compounding, not rented
        </span>
      </p>
    </div>
  );
}

const VISUALS: Record<PillarId, () => React.ReactElement> = {
  "d2c-growth": GrowthFunnel,
  "creative-content": CreativeCluster,
  "commerce-shopify": CommerceFlow,
  "seo-organic": OrganicType,
  "automation-ai": AutomationNodes,
  "data-optimisation": DataChart,
  // The two landing pages map into pillars 01 and 02, so they carry the same
  // visual as their parent rather than inventing a seventh and eighth diagram.
  performance: GrowthFunnel,
  "social-media": CreativeCluster,
  "web-development": CommerceFlow,
  "lead-generation": GrowthFunnel,
  "brand-design": CreativeCluster,
  "meta-ads": GrowthFunnel,
  "speed-optimization": CommerceFlow,
};

export function ServiceVisual({ pillar }: { pillar: PillarId }) {
  const Visual = VISUALS[pillar];
  return <Visual />;
}
