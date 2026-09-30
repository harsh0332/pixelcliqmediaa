"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { insightsPage } from "@/content/home";

/**
 * A single-field capture.
 *
 * The handler behind it stores nothing and says so — there is no provider and
 * no privacy notice covering subscriber data yet, and taking an address with
 * nowhere lawful to put it would be worse than not asking. The form is real, so
 * connecting a provider later is one file.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };
      setMessage(data.message ?? "Something went wrong.");
    } catch {
      setMessage("Could not reach the server. Try again shortly.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-measure">
      <label htmlFor="newsletter-email" className="type-body text-ink">
        {insightsPage.newsletterLabel}
      </label>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={insightsPage.newsletterPlaceholder}
          aria-describedby={message ? "newsletter-message" : undefined}
          // --line-field, not --line: this is a control boundary and needs
          // 3:1 against the page under WCAG 1.4.11.
          className="type-body h-12 min-w-0 flex-1 rounded-pill border border-line-field bg-paper px-5 text-ink placeholder:text-ink-muted"
        />
        <Button type="submit" loading={busy}>
          {insightsPage.newsletterCta}
        </Button>
      </div>

      {message ? (
        <p
          id="newsletter-message"
          role="status"
          className="type-body-sm mt-4 text-ink-soft"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
