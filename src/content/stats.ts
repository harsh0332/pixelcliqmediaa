export interface Stat {
  id: string;
  value: string;
  /** "%", "x", "+" — appended to value. Empty when the value stands alone. */
  suffix: string;
  label: string;
  /** One line of qualification: over what period, across how many accounts. */
  context: string;
}

/**
 * The /numbers page.
 *
 * Every slot is a placeholder. There is no verified performance data yet, and a
 * numbers page carrying invented figures is the fastest way to lose a
 * sophisticated founder. Components must detect the bracketed values and render
 * the empty state rather than printing them.
 *
 * When these are filled: each value needs a real `context` line — a number
 * without a denominator and a period is not evidence.
 */
export const stats: Stat[] = [
  { id: "stat-01", value: "[VALUE]", suffix: "", label: "[LABEL]", context: "[CONTEXT]" },
  { id: "stat-02", value: "[VALUE]", suffix: "", label: "[LABEL]", context: "[CONTEXT]" },
  { id: "stat-03", value: "[VALUE]", suffix: "", label: "[LABEL]", context: "[CONTEXT]" },
  { id: "stat-04", value: "[VALUE]", suffix: "", label: "[LABEL]", context: "[CONTEXT]" },
  { id: "stat-05", value: "[VALUE]", suffix: "", label: "[LABEL]", context: "[CONTEXT]" },
  { id: "stat-06", value: "[VALUE]", suffix: "", label: "[LABEL]", context: "[CONTEXT]" },
  { id: "stat-07", value: "[VALUE]", suffix: "", label: "[LABEL]", context: "[CONTEXT]" },
  { id: "stat-08", value: "[VALUE]", suffix: "", label: "[LABEL]", context: "[CONTEXT]" },
];
