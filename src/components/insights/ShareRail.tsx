"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

/**
 * Share controls: sticky in the left margin on desktop, inline above the article
 * on mobile.
 *
 * Copy-link only for now. Social share buttons need real profile URLs, and ours
 * are still placeholders — a share button that posts to a dead handle is worse
 * than no button. They drop in beside this one when the URLs are real.
 */
export function ShareRail({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/insights/${slug}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions; failing quietly is correct
      // here — the URL is in the address bar either way.
    }
  };

  return (
    <div className="mb-8 lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:mb-0">
      <span className="type-label block text-ink-muted">Share</span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy link to “${title}”`}
        className={cn(
          "type-button mt-3 inline-flex min-h-11 cursor-pointer items-center gap-2",
          "text-ink-soft transition-colors duration-150 hover:text-ink focus-visible:text-ink",
        )}
      >
        {copied ? (
          <Check className="size-4 text-accent-deep" />
        ) : (
          <Link2 className="size-4" />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
