"use client";

import { analyticsEnabled, openConsent } from "@/lib/analytics";

/** Footer control to change the analytics choice. Only exists when analytics does. */
export function CookieSettingsButton({ className }: { className?: string }) {
  if (!analyticsEnabled) return null;
  return (
    <button type="button" className={className} onClick={openConsent}>
      Cookie settings
    </button>
  );
}
