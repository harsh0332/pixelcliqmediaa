"use client";

import { useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { loopSection } from "@/content/home";
import { loopStages } from "@/content/growthSystem";
import { servicePillars } from "@/content/services";
import {
  activeIndex,
  roundedPolygonPath,
  drawProgress,
  innerRadiusPercent,
  isClosed,
  labelOffset,
  nodePosition,
  nodeSide,
  DRAW_END,
  DRAW_START,
} from "@/lib/compoundLoop";
import { EASE } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

/**
 * THE COMPOUND LOOP — the signature section.
 *
 * Seven stages around a closed ring, connected by one continuous line that
 * draws itself as the section is scrolled. The line closing back onto Creative
 * is the argument the whole site makes, so it is the last thing that happens.
 *
 * Shape — a circle, not a rounded heptagon. Both are implemented in
 * lib/compoundLoop.ts and were compared: with seven vertices the polygon reads
 * as an arbitrary shape rather than a loop, and its uneven sides fight the
 * evenly spaced nodes. The circle states the idea without decorating it.
 * Switching is one call in `ringPath` below.
 *
 * Accessibility — the SVG is decorative and aria-hidden. The real content is an
 * ordered list in stage order, so a screen reader reads Creative through
 * Automation as a sequence regardless of where the nodes are painted. Each node
 * is a link to its pillar, which means keyboard users reach them naturally and
 * focusing one activates it; there is no focus trap because nothing is trapped.
 *
 * Performance — only stroke-dashoffset (via pathLength), opacity and transform
 * are animated. `will-change` is applied to the pinned container while it is in
 * view and dropped the moment it leaves, so it does not hold a layer for the
 * whole page.
 *
 * Reduced motion — the pin is removed in CSS and the ring renders complete with
 * every stage lit. The section becomes a static, readable diagram.
 */

const TOTAL = loopStages.length;
const RING_RADIUS = 34;
/**
 * Where a label's inward edge sits. Was 44 with the box centred on it, which
 * put the box's inner half across the path; the box is now pushed outward from
 * this point (see labelOffset), so this is the inward edge, not the centre.
 *
 * 37, not 40. The top node's block is pushed fully above its anchor, so it
 * reaches roughly 40px above the ring box — and at 40 that put "Creative" 22px
 * INTO the section heading. Every 1% here moves the top block about 5px, and
 * 37 still leaves a 3% gap (~15px) between the path and the nearest text.
 */
const LABEL_RADIUS = 37;
/** Extra radial clearance, in px — see labelOffset. Paid for by LABEL_PUSH_MT. */
const LABEL_PUSH = 16;
const MARKER_RADIUS = 1.2;

/**
 * The centre readout's safe box, derived from the shape rather than typed in.
 *
 * The inradius is the largest circle inside the heptagon. Take 40px off it for
 * clearance, then fit the widest box that still fits: for half-width a and
 * half-height b the corner constraint is a² + b² ≤ r², and 0.90r × 0.37r puts
 * the corner at 0.973r — inside, with the long axis where the text needs it and
 * enough slack that the measured clearance stays above 40px rather than landing
 * on it. Three 16px lines need 79px, so height is the cheap axis: the box is as
 * wide as the corner constraint allows once 83px of height is reserved.
 * 1.80 × 0.74 holds three lines of 16px type at the ring sizes we ship,
 * which is what sets the shape of the box in the first place.
 *
 * The readout is type-body, not type-body-lg. At 18px the three-line box needs
 * 89px of height, and once the top node's label — which is pushed fully clear
 * of the path — is added above the ring, a ring large enough to give that box
 * 40px of clearance no longer fits the pin inside one viewport. 16px costs the
 * readout nothing: it is a caption echoing the list, not a headline.
 *
 * Percentages resolve against the ring container, which is square, so one
 * expression is correct for both axes and the box scales with the diagram.
 */
const INNER_RADIUS = innerRadiusPercent(RING_RADIUS, TOTAL);
const CENTRE_CLEARANCE_PX = 40;
const SAFE_RADIUS = `(${INNER_RADIUS.toFixed(3)}% - ${CENTRE_CLEARANCE_PX}px)`;
const CENTRE_MAX_W = `calc(1.80 * ${SAFE_RADIUS})`;
const CENTRE_MAX_H = `calc(0.74 * ${SAFE_RADIUS})`;

/*
 * The rounded heptagon, not the circle.
 *
 * Both shapes were built and compared; the heptagon is the one the design
 * lands on. A circle has no vertices, so the seven stages are arbitrary points
 * on a smooth curve — the shape says "cycle" but not "seven stages". The
 * heptagon puts a corner at every stage: the line visibly turns to get to the
 * next one, which is the argument the section is making.
 *
 * Corner construction matches the spec exactly — a quadratic Bézier per corner
 * with the control point at the vertex, trimmed along each edge. The spec trims
 * d = 48 against R = 340 in a 1200-unit design space (d/R = 0.141); at our
 * RING_RADIUS of 34% that is 4.8%.
 */
const ringPath = roundedPolygonPath(TOTAL, RING_RADIUS, 4.8);

/** Stage id -> the pillar page it links through to. */
const pillarHref = new Map(servicePillars.map((p) => [p.id, p.slug]));

const SIDE_CLASS = {
  right: "md:text-left",
  left: "md:text-right",
  centre: "md:text-center",
} as const;

export function CompoundLoop() {
  const scroller = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pinInView = useInView(pin, { amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: scroller,
    offset: ["start start", "end end"],
  });

  const drawn = useTransform(scrollYProgress, [DRAW_START, DRAW_END], [0, 1], {
    clamp: true,
  });

  const [active, setActive] = useState(0);
  const [closed, setClosed] = useState(false);
  /** Latched, so the closing pulse plays exactly once per page load. */
  const [pulsed, setPulsed] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setActive(activeIndex(drawProgress(progress), TOTAL));
    const nowClosed = isClosed(progress);
    setClosed(nowClosed);
    if (nowClosed && !pulsed) setPulsed(true);
  });

  // Reduced motion short-circuits every derived value to its end state.
  const activeStage = reduce ? TOTAL - 1 : active;
  const showClosing = reduce ? true : closed;
  const centre = showClosing
    ? loopSection.closing
    : (loopStages[activeStage]?.description ?? "");

  return (
    <section
      ref={scroller}
      // A stable, human-readable anchor. The heading keeps its own id for
      // aria-labelledby; linking to that id instead would work but couples
      // every inbound link to an accessibility detail, and scrolls to the
      // heading rather than to the top of the section.
      id="compound-loop"
      data-loop-scroller
      aria-labelledby="compound-loop-heading"
      // Tablet pins for 200vh, desktop for 300vh — the larger ring has
      // further to draw, so it earns the extra scroll.
      className="relative md:h-[200vh] lg:h-[300vh]"
    >
      <div
        ref={pin}
        data-loop-pin
        className={cn(
          // min-h, not h: a sticky box fixed at exactly one viewport height
          // has no way to reveal content taller than itself — the overflow
          // simply sits below the fold and scrolling moves the page, not the
          // pinned box. That is invisible at normal metrics but becomes real
          // content loss under the WCAG 1.4.12 text-spacing overrides, which
          // push this content ~240px past the viewport. With min-h the
          // container grows and the sticky release happens later, so the extra
          // text is reachable. Identical rendering whenever content fits.
          "md:sticky md:top-0 md:flex md:min-h-svh md:items-center",
          pinInView && "md:will-change-transform",
        )}
      >
        {/*
          spacing="none", not "large".

          SPACING.large is lg:py-50 — 200px top and bottom. The `md:py-0` here
          was meant to cancel it, but Tailwind orders lg after md, so at desktop
          the padding won and added 400px to a container that has to fit inside
          one viewport. The pin owns its own centring; the Section only needs to
          carry the tone.
        */}
        {/*
          py-10 at md, not py-6. The node labels are absolutely positioned
          against the ring, so they escape the Container and can paint outside
          this Section's box — at py-6 the bottom label crossed the band's edge
          by 8px and sat on the bone section below it. The padding is what keeps
          the ink under the whole diagram, labels included.
        */}
        <Section tone="inverse" spacing="none" className="w-full py-16 md:py-10">
          <Container>
            <div className="mx-auto mb-12 max-w-measure text-center md:mb-4">
              <Eyebrow as="p" className="inline-block">{loopSection.eyebrow}</Eyebrow>
              <h2 id="compound-loop-heading" className="type-h2 mt-4">
                {loopSection.headline}
              </h2>
              <p className="type-body mt-4 text-ink-soft md:sr-only">
                {loopSection.intro}
              </p>
            </div>

            {/* The diagram. Square on desktop so the ring stays a circle; on
                mobile this collapses to a plain vertical rhythm. */}
            {/*
              Sized against the viewport, not a fixed rem.

              This was max-w-[46rem] — a 736px square. With the heading block
              above it and the section's padding, the pinned container came to
              1279px inside an 813px viewport, so the ring was always taller
              than the screen and the reader never saw the whole loop at once.
              That is what made a correctly-drawing path look broken and
              unfinished.

              72vh leaves room for the heading above it; 88vw stops it touching
              the gutters on a short, wide window; the rem cap keeps it sane on
              a very tall display.
            */}
            {/*
              mt-14/16, not mt-4.

              The top node's block is pushed fully clear of the path, so it
              reaches about 40px above the ring's own box — and the pin centres
              its content, which left 60-97px of unused room BELOW the diagram
              while "Creative" sat 35px inside the section heading. The margin
              buys the top block its own space and the pin re-centres around it;
              nothing had to shrink to pay for it. LABEL_PUSH adds 16px to the
              top block's reach, so 16px of this margin is paying that back —
              the two move together and the heading gap stays where it is.
            */}
            <div className="relative mx-auto w-full md:aspect-square md:mt-18 lg:mt-20 md:max-w-[min(26rem,74vw,55vh)] lg:max-w-[min(32rem,74vw,61vh)]">
              {/* Ring — decorative. All meaning lives in the list below. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="absolute inset-0 hidden size-full md:block"
              >
                <motion.g
                  style={{ transformOrigin: "50% 50%" }}
                  animate={pulsed && !reduce ? { scale: [1, 1.01, 1] } : { scale: 1 }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: EASE.inOut }}
                >
                  {/* Faint track, so the shape of the loop is legible before
                      the line has drawn it. */}
                  <path
                    d={ringPath}
                    fill="none"
                    stroke="var(--inverse-line-strong)"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                  <motion.path
                    d={ringPath}
                    fill="none"
                    stroke="var(--accent-lift)"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength: reduce ? 1 : drawn }}
                    // Brightens a step once the circuit closes — the only
                    // colour change in the section, and it happens once.
                    animate={{
                      strokeWidth: showClosing ? 1.6 : 1,
                      opacity: showClosing ? 1 : 0.9,
                    }}
                    transition={{ duration: reduce ? 0 : 0.4, ease: EASE.inOut }}
                  />
                  {loopStages.map((stage, index) => {
                    const point = nodePosition(index, TOTAL, RING_RADIUS);
                    const lit = index <= activeStage;
                    return (
                      <circle
                        key={stage.id}
                        cx={point.x}
                        cy={point.y}
                        r={MARKER_RADIUS}
                        fill={lit ? "var(--accent-lift)" : "var(--inverse-bg)"}
                        stroke={
                          lit ? "var(--accent-lift)" : "var(--inverse-line-strong)"
                        }
                        strokeWidth={1}
                        vectorEffect="non-scaling-stroke"
                        className="transition-[fill,stroke] duration-300"
                      />
                    );
                  })}
                </motion.g>
              </svg>

              {/* Centre readout. A visual echo of the active stage, so it is
                  aria-hidden — the same words are in the list. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex"
              >
                {/* A true crossfade: the outgoing and incoming lines overlap
                    while they fade, so nothing blinks and nothing moves. Not
                    mode="wait", which is a sequential swap — it would hold the
                    old text for the full exit before the new one appeared. Both
                    are absolutely placed so they stack instead of reflowing. */}
                <div
                  className="relative flex items-center justify-center overflow-hidden text-center"
                  style={{
                    width: CENTRE_MAX_W,
                    height: CENTRE_MAX_H,
                    maxWidth: CENTRE_MAX_W,
                    maxHeight: CENTRE_MAX_H,
                  }}
                >
                  <AnimatePresence initial={false}>
                    <motion.p
                      key={showClosing ? "closing" : activeStage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3 }}
                      className={cn(
                        // line-clamp is the hard stop, not the plan: the
                        // descriptions are written to 90 characters so three
                        // lines is what they naturally take. It is here so a
                        // longer string can never push text back over the path.
                        "absolute inset-x-0 line-clamp-3",
                        // Same size in both states. The closing line ran at
                        // type-h2, which set 44px type in a 246px box: six
                        // lines, 290px tall, reaching 11px PAST the inner
                        // radius and covering the diagram it was resolving.
                        // The loop closing is the climax; the words confirm it.
                        showClosing
                          ? "type-body text-inverse-text"
                          : "type-body text-inverse-ink-soft",
                      )}
                    >
                      {centre}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobile: the line that draws downward beside the stages. */}
              <MobileSpine reduce={reduce} />

              <ol className="relative md:absolute md:inset-0">
                {loopStages.map((stage, index) => {
                  const point = nodePosition(index, TOTAL, LABEL_RADIUS);
                  const offset = labelOffset(index, TOTAL, LABEL_PUSH);
                  const lit = index <= activeStage;
                  // Three states, not two. Every reached stage used to hold its
                  // label at full brightness and show its one-liner, so by the
                  // end of the scroll seven blocks of caption competed at once
                  // and the diagram read as noise. Now exactly one stage speaks.
                  // Reduced motion has no scroll narrative to stage, so the
                  // staging is switched off there and the diagram reads as a
                  // finished static one: every label at full strength, every
                  // one-liner shown. Dimming six of seven captions makes sense
                  // while a line is travelling past them; on a still image it
                  // just withholds the content from the people who asked for
                  // less movement, not less information.
                  const staged = !reduce;
                  const isActive = !staged || index === activeStage;
                  const isPast = staged && index < activeStage;
                  const href = pillarHref.get(stage.pillar) ?? "/services";
                  return (
                    <li
                      key={stage.id}
                      id={index === 0 ? "loop-stage-1" : undefined}
                      style={
                        {
                          "--node-x": `${point.x}%`,
                          "--node-y": `${point.y}%`,
                          // Percentages of the label's own box, from its angle.
                          "--node-tx": `${offset.tx.toFixed(2)}%`,
                          "--node-ty": `${offset.ty.toFixed(2)}%`,
                          "--node-px": `${offset.px.toFixed(1)}px`,
                          "--node-py": `${offset.py.toFixed(1)}px`,
                        } as CSSProperties
                      }
                      className={cn(
                        "relative pb-10 pl-12 last:pb-0",
                        "md:absolute md:left-[var(--node-x)] md:top-[var(--node-y)]",
                        // ~180px, per the collision budget: wide enough for a
                        // 45-character one-liner on two lines, narrow enough
                        // that a label cannot reach into its neighbour.
                        "md:w-[9rem] lg:w-[11.25rem]",
                        // Radial, not centred. The anchor point lands on the
                        // box's inward edge and the box grows outward from it.
                        "md:translate-x-[calc(var(--node-tx)+var(--node-px))] md:p-0",
                        "md:translate-y-[calc(var(--node-ty)+var(--node-py))]",
                        SIDE_CLASS[nodeSide(index, TOTAL)],
                      )}
                    >
                      {/* Mobile marker on the spine. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute top-1.5 left-[-4px] size-2 rounded-pill transition-colors duration-300 md:hidden",
                          lit ? "bg-accent-lift" : "bg-inverse-line-strong",
                        )}
                      />
                      <Link
                        href={href}
                        onFocus={() => setActive(index)}
                        className="group/node block"
                      >
                        <span className="type-label text-link tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {/* One colour, three opacities. Dimming by swapping to
                            a muted token AND lowering opacity would compound
                            the two; carrying the state in opacity alone keeps
                            the maths checkable — 1.0 / 0.7 / 0.35 of ivory on
                            ink measures 16.73:1, 8.59:1 and 3.06:1.

                            type-h3 clamps to 20px at its floor and is weight
                            700, so it is WCAG large text at every width where
                            this dimming applies and the floor is 3:1, not 4.5.
                            3.06 clears it by 0.06 — so if --inverse-bg is ever
                            lightened, or type-h3 drops below 18.66px bold, the
                            idle state fails and 0.35 has to come up. */}
                        <span
                          className={cn(
                            "type-h3 mt-1 block text-inverse-text transition-opacity duration-300",
                            staged ? "md:opacity-35" : "md:opacity-100",
                            isActive && "md:opacity-100",
                            isPast && "md:opacity-70",
                            "group-hover/node:text-accent-lift group-focus-visible/node:text-accent-lift",
                          )}
                        >
                          {stage.label}
                        </span>
                        {/* Opacity, not display: the block keeps its height in
                            every state, so nothing reflows as the active stage
                            moves around the ring and the collision geometry
                            holds at all seven positions. On mobile there is no
                            centre readout, so every one-liner stays visible. */}
                        <span
                          className={cn(
                            "type-caption mt-1 block transition-opacity duration-300",
                            "opacity-100",
                            isActive ? "md:opacity-100" : "md:opacity-0",
                          )}
                        >
                          {stage.oneLiner}
                        </span>
                        {/* Read by assistive tech everywhere; shown only on
                            mobile, where there is no centre readout. */}
                        <span className="type-body mt-2 block text-ink-soft md:sr-only">
                          {stage.description}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>

              {/* Mobile: the curve back to the top, so the loop survives. */}
              {/*
                A real anchor, not a decorated div. On mobile there is no ring
                to close, so this is the only thing that makes the sequence a
                loop rather than a list — and it should actually take you back
                to the start, the way the drawn line does on desktop.
              */}
              <a
                href="#loop-stage-1"
                className="group/back relative mt-2 flex items-center gap-3 rounded-sm pl-12 md:hidden"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 40 40"
                  className="size-8 shrink-0 -translate-x-[3.1rem]"
                >
                  <path
                    d="M2 0 L2 26 Q2 36 12 36 L34 36"
                    fill="none"
                    stroke="var(--accent-lift)"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M30 32 L34 36 L30 40"
                    fill="none"
                    stroke="var(--accent-lift)"
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <span className="type-label -ml-10 text-accent-lift">
                  {loopSection.mobileLoopBack}
                </span>
              </a>
            </div>

            {/* The closing statement. Visible on mobile, where the centre
                readout does not exist; on desktop the centre says it instead,
                so here it stays available to assistive technology only. */}
            <p className="type-h3 mx-auto mt-12 max-w-measure text-center md:sr-only">
              {loopSection.closing}
            </p>
          </Container>
        </Section>
      </div>
    </section>
  );
}

/**
 * The mobile spine: a hairline that fills downward as the stages scroll past.
 * scaleY from a pinned top origin, so it never triggers layout.
 */
function MobileSpine({ reduce }: { reduce: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute top-2 bottom-16 left-8 w-px bg-inverse-line-strong md:hidden"
    >
      <motion.div
        // Explicit neutral value — see ScrollProgressLine.
        style={reduce ? { scaleY: 1 } : { scaleY: scrollYProgress }}
        className="h-full w-px origin-top bg-accent-lift"
      />
    </div>
  );
}
