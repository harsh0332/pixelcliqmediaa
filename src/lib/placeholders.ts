/**
 * The agency is new and most client-side facts are not verified yet. Unknown
 * values are written as bracketed tokens — "[CLIENT_NAME]", "[METRIC]" — and
 * these helpers let components detect them and render an honest empty state
 * instead of printing a placeholder as though it were real.
 */

const PLACEHOLDER = /^\[[A-Z0-9_]+\]$/;

/** True when a value is an unresolved bracketed token. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return typeof value === "string" && PLACEHOLDER.test(value.trim());
}

/** True when any value in the list is still unresolved. */
export function hasPlaceholder(...values: (string | null | undefined)[]): boolean {
  return values.some(isPlaceholder);
}

/**
 * The value when it is real, otherwise the fallback. Use for optional details
 * that can degrade quietly — never for a headline claim or a metric.
 */
export function resolved(value: string | null | undefined, fallback = ""): string {
  return isPlaceholder(value) || !value ? fallback : value;
}
