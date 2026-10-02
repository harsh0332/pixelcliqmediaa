"use client";

import { useId, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { homeContent } from "@/content/refinedHome";
import { whatsappHref } from "@/content/site";
import { cn } from "@/lib/utils";
import styles from "./PremiumHero.module.css";

/**
 * The hero's lead capture: one field, one button.
 *
 * Submitting opens WhatsApp with the brand already in the message, because
 * WhatsApp is the channel that reliably reaches the team today — the contact
 * form still hands off to the visitor's mail app. Without JavaScript the form
 * falls back to a plain GET to /contact, so the button is never dead.
 */
export function HeroOffer({ tone = "hero" }: { tone?: "hero" | "closing" }) {
  const { form } = homeContent.hero;
  const inputId = useId();
  const noteId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  return (
    <form
      action="/contact"
      method="get"
      noValidate
      className={cn(styles.offer, tone === "closing" && styles.offerClosing)}
      onSubmit={(event) => {
        event.preventDefault();
        const brand = value.trim();
        if (!brand) {
          setError(true);
          inputRef.current?.focus();
          return;
        }
        setError(false);
        window.open(whatsappHref(form.message + brand), "_blank", "noopener,noreferrer");
      }}
    >
      <label htmlFor={inputId} className={styles.offerLabel}>
        <i aria-hidden="true" /> {form.label}
      </label>
      <div className={cn(styles.offerRow, error && styles.offerRowError)}>
        <input
          ref={inputRef}
          id={inputId}
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder={form.placeholder}
          value={value}
          aria-invalid={error || undefined}
          aria-describedby={noteId}
          onChange={(event) => {
            setValue(event.target.value);
            if (error) setError(false);
          }}
        />
        <button type="submit">
          {form.button} <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </div>
      <p id={noteId} className={styles.offerNote} aria-live="polite">
        {error ? form.empty : form.note}
      </p>
    </form>
  );
}
