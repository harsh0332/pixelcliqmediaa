/**
 * Geometry and scroll mapping for the Compound Loop.
 *
 * Kept as pure functions, separate from the component, for two reasons: the
 * label positions have to be checked against the container bounds numerically
 * rather than by eye, and both candidate ring shapes can then be compared
 * without touching the component that draws them.
 *
 * Coordinates are percentages of a square container, so the whole diagram
 * scales with one width and never needs a viewport listener.
 */

/** Node 0 sits at the top, and the path is drawn clockwise from there. */
const START_ANGLE = -Math.PI / 2;

export function nodeAngle(index: number, total: number): number {
  return START_ANGLE + (index / total) * Math.PI * 2;
}

export interface Point {
  x: number;
  y: number;
}

/** A node's position as a percentage of the container, at a given radius. */
export function nodePosition(
  index: number,
  total: number,
  radiusPercent: number,
): Point {
  const angle = nodeAngle(index, total);
  return {
    x: 50 + Math.cos(angle) * radiusPercent,
    y: 50 + Math.sin(angle) * radiusPercent,
  };
}

/**
 * How far to translate a label so it sits entirely OUTSIDE its own point on
 * the ring, as percentages of the label's own box.
 *
 * The labels used a flat -50%/-50%, which centres each box on its anchor point
 * — so half of every box lay on the inward side, and with a label wider than
 * the gap between LABEL_RADIUS and RING_RADIUS that inner half crossed the
 * path. Six of seven did.
 *
 * Deriving the translation from the node's own angle instead pushes each box
 * radially outward: the top node clears upward, the side nodes clear sideways,
 * the bottom nodes clear downward, and the anchor point ends up on the box's
 * inward edge rather than at its centre.
 */
export function labelOffset(
  index: number,
  total: number,
  pushPx = 0,
): { tx: number; ty: number; px: number; py: number } {
  const angle = nodeAngle(index, total);
  return {
    tx: -50 + 50 * Math.cos(angle),
    ty: -50 + 50 * Math.sin(angle),
    // A flat radial nudge on top of the percentage push.
    //
    // The percentage push puts the anchor on the midpoint of the box's inward
    // EDGE, which is enough for a node on an axis but not for one on a
    // diagonal: there the inward corner still reaches closer to the centre
    // than the edge midpoint does. Measured against the real glyph rects, the
    // two upper diagonals cleared the path by 5px the moment their one-liner
    // appeared, against 15-16px everywhere else. A fixed radial offset lifts
    // the tight ones without changing the geometry that already works.
    px: pushPx * Math.cos(angle),
    py: pushPx * Math.sin(angle),
  };
}

/**
 * The radius of the largest circle that fits inside the rounded polygon — its
 * inradius, which is what the centre readout has to stay within.
 *
 * Derived, never typed in: change RING_RADIUS or the number of stages and the
 * centre box follows. The rounded corners bow slightly inward of the vertices,
 * so the true inner clearance is a shade larger than this — the error is in the
 * safe direction.
 */
export function innerRadiusPercent(radiusPercent: number, sides: number): number {
  return radiusPercent * Math.cos(Math.PI / sides);
}

/**
 * Which side of the ring a node sits on, so its label can be anchored away
 * from the centre instead of overlapping the ring.
 */
export function nodeSide(index: number, total: number): "left" | "right" | "centre" {
  const cos = Math.cos(nodeAngle(index, total));
  if (Math.abs(cos) < 0.25) return "centre";
  return cos > 0 ? "right" : "left";
}

/**
 * The ring, starting at the top and running clockwise, as two half-arcs.
 *
 * Two arcs rather than a <circle> so the path has an explicit start point: the
 * drawing has to begin at node 0 (Creative) and close back onto it, which is
 * the entire argument the diagram is making.
 */
/**
 * The ring: a heptagon with rounded corners, one vertex per stage.
 *
 * This is the shape the site ships. A circle was built alongside it and
 * rejected — it has no vertices, so seven stages become arbitrary points on a
 * smooth curve. The heptagon puts a corner at every stage, so the line visibly
 * turns to reach the next one.
 *
 * Corners are quadratic Béziers with the control point at the vertex and a
 * fixed trim distance along each edge, which pulls the curve slightly inside
 * the vertex radius — markers therefore sit a little proud of the line, by
 * design.
 */
export function roundedPolygonPath(
  sides: number,
  radiusPercent: number,
  cornerRadius = 6,
): string {
  const points: Point[] = Array.from({ length: sides }, (_, i) =>
    nodePosition(i, sides, radiusPercent),
  );

  const lerp = (a: Point, b: Point, t: number): Point => ({
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  });

  const segments: string[] = [];
  for (let i = 0; i < sides; i++) {
    const previous = points[(i - 1 + sides) % sides]!;
    const current = points[i]!;
    const next = points[(i + 1) % sides]!;

    const toPrevious = Math.hypot(current.x - previous.x, current.y - previous.y);
    const toNext = Math.hypot(next.x - current.x, next.y - current.y);
    const entry = lerp(current, previous, Math.min(0.5, cornerRadius / toPrevious));
    const exit = lerp(current, next, Math.min(0.5, cornerRadius / toNext));

    segments.push(
      i === 0 ? `M ${entry.x.toFixed(3)} ${entry.y.toFixed(3)}` : `L ${entry.x.toFixed(3)} ${entry.y.toFixed(3)}`,
    );
    segments.push(
      `Q ${current.x.toFixed(3)} ${current.y.toFixed(3)} ${exit.x.toFixed(3)} ${exit.y.toFixed(3)}`,
    );
  }
  segments.push("Z");
  return segments.join(" ");
}

/* -------------------------------------------------------------------------- */

/**
 * Scroll progress through the pinned section, mapped to how much of the ring is
 * drawn.
 *
 * A short lead-in keeps the ring from drawing before the section has settled,
 * and the drawing completes before the scroll does, leaving the last stretch for
 * the closing statement and the single pulse.
 */
export const DRAW_START = 0.02;
export const DRAW_END = 0.9;
/** Past this, the centre resolves to the closing line and the ring pulses once. */
export const CLOSE_AT = 0.93;

/**
 * How far along the path each node sits, as a fraction of total length.
 *
 * Not `i / 7`. The ring is a rounded heptagon whose path starts just clockwise
 * of the top vertex, so node 01 is at 0 and the rest sit at
 * `0.1207 + (i - 1) / 7`. Using even sevenths would light each node slightly
 * before or after the line actually reached it — visible, because the line and
 * the marker are on screen together.
 *
 * Node 01 appears twice in effect: at 0, and again at 1.0 where the line
 * returns to it. That return is the whole argument of the section.
 */
export const NODE_FRACTIONS = [
  0, 0.1207, 0.2636, 0.4064, 0.5493, 0.6922, 0.835,
] as const;

export function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

export function drawProgress(scrollProgress: number): number {
  return clamp01((scrollProgress - DRAW_START) / (DRAW_END - DRAW_START));
}

/**
 * How many nodes are lit at a given draw progress.
 *
 * A node lights the moment the drawn line reaches its own fraction along the
 * path — see NODE_FRACTIONS. Node 0 is lit from the start: the loop begins at
 * Creative. Nodes accumulate going forward and un-light in reverse, so the lit
 * set always matches the line.
 */
export function activeCount(draw: number, total: number): number {
  if (draw <= 0) return 1;
  let lit = 1;
  for (let i = 1; i < total; i++) {
    const fraction = NODE_FRACTIONS[i] ?? i / total;
    if (draw + 1e-6 >= fraction) lit = i + 1;
  }
  return Math.min(total, lit);
}

/** The index of the furthest-reached stage, for the centre text. */
export function activeIndex(draw: number, total: number): number {
  return activeCount(draw, total) - 1;
}

export function isClosed(scrollProgress: number): boolean {
  return scrollProgress >= CLOSE_AT;
}
