"use client";

import { useSyncExternalStore } from "react";
import { normalizeHex } from "@/lib/contrast";
import { ALL_COLOR_TOKENS } from "@/lib/design-tokens";

interface Drift {
  cssVar: string;
  documented: string;
  actual: string;
}

/** The DOM is read once per page load; the result is stable thereafter. */
let snapshot: Drift[] | null = null;

function computeDrift(): Drift[] {
  const styles = getComputedStyle(document.documentElement);
  return ALL_COLOR_TOKENS.flatMap((token) => {
    const actual = styles.getPropertyValue(`--${token.cssVar}`).trim();
    if (!actual) {
      return [{ cssVar: token.cssVar, documented: token.hex, actual: "not defined" }];
    }
    return normalizeHex(actual) === normalizeHex(token.hex)
      ? []
      : [{ cssVar: token.cssVar, documented: token.hex, actual }];
  });
}

/** Computed styles do not change under us, so there is nothing to subscribe to. */
const subscribe = () => () => {};

function getSnapshot(): Drift[] {
  snapshot ??= computeDrift();
  return snapshot;
}

/** Null on the server: there are no computed styles to read yet. */
const getServerSnapshot = (): Drift[] | null => null;

/**
 * Guards against the one real risk of mirroring tokens in TypeScript: the
 * mirror drifting from globals.css. Reads the computed custom properties in the
 * browser and reports any that no longer match what this page claims.
 */
export function TokenDrift() {
  const drift = useSyncExternalStore<Drift[] | null>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (drift === null) {
    return <p className="type-caption">Checking tokens against globals.css…</p>;
  }

  if (drift.length === 0) {
    return (
      <p className="type-body-sm text-ink-soft">
        <span className="text-accent-deep">✓</span> All {ALL_COLOR_TOKENS.length}{" "}
        colour tokens on this page match the computed values in globals.css.
      </p>
    );
  }

  return (
    <div className="border border-accent-deep p-4">
      <p className="type-body-sm font-medium">
        {drift.length} token{drift.length === 1 ? "" : "s"} drifted from globals.css:
      </p>
      <ul className="mt-2 space-y-1">
        {drift.map((d) => (
          <li key={d.cssVar} className="type-body-sm">
            <code>--{d.cssVar}</code> — this page says {d.documented}, the stylesheet
            says {d.actual}
          </li>
        ))}
      </ul>
    </div>
  );
}
