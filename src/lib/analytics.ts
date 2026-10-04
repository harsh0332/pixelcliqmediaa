/**
 * Consent-gated analytics.
 *
 * Google Analytics 4 runs only when two things are true: a measurement ID is
 * configured (NEXT_PUBLIC_GA_ID, e.g. "G-ABC123XYZ") and the visitor has said
 * yes in the cookie banner. Without an ID nothing loads and no banner shows,
 * which keeps the cookie policy's "no cookies of our own" literally true.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const analyticsEnabled = /^G-[A-Z0-9]{4,}$/.test(GA_ID);

export type Consent = "granted" | "denied";
const CONSENT_KEY = "pc-analytics-consent";
/** Holds the choice when storage is blocked, so the banner does not reappear on every render. */
let memoryConsent: Consent | null = null;
export const CONSENT_EVENT = "pc:consent";
export const CONSENT_OPEN_EVENT = "pc:consent-open";

export function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : memoryConsent;
  } catch {
    return memoryConsent;
  }
}

export function writeConsent(value: Consent) {
  memoryConsent = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Private mode or blocked storage: the choice holds for this page only.
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: value }));
}

/** Lets React read the choice as an external store and re-render when it changes. */
export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Reopens the banner, from the footer's "Cookie settings". */
export function openConsent() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/** Sends a GA4 event. A no-op until analytics has loaded with consent. */
export function track(event: string, params?: Record<string, unknown>) {
  window.gtag?.("event", event, params);
}
