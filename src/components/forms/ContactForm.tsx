"use client";

import { useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { contactPage } from "@/content/home";
import { primaryPillars } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * The contact form.
 *
 * Underline fields on the page background rather than a boxed card — the page
 * is the container. Labels are always visible above each field: a placeholder
 * is not a label, it disappears the moment someone types, and it fails anyone
 * relying on magnification.
 *
 * Every error slot reserves its height whether or not it holds a message, so
 * validating a field never pushes the rest of the form down the page.
 *
 * Errors say what to fix rather than that something is wrong, are linked by
 * aria-describedby, and on a failed submit the first invalid field takes focus.
 */

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  spend: string;
  message: string;
  website2: string;
};

const EMPTY: Values = {
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  spend: contactPage.spendOptions[5],
  message: "",
  website2: "",
};

const FIELD_ORDER = ["name", "company", "email", "phone", "website", "help", "message"] as const;

const inputClass = [
  "type-body w-full min-h-11 bg-transparent pt-2 pb-3 text-ink",
  "border-0 border-b border-line-field",
  "placeholder:text-ink-muted",
  "transition-colors duration-150",
  "focus:border-accent focus:outline-none",
  "disabled:opacity-50",
].join(" ");

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [help, setHelp] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const set = (key: keyof Values, value: string) =>
    setValues((current) => ({ ...current, [key]: value }));

  const validateField = (key: string, next = values, chips = help): string => {
    const e = contactPage.errors;
    switch (key) {
      case "name":
        return next.name.trim() ? "" : e.name;
      case "company":
        return next.company.trim() ? "" : e.company;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(next.email.trim()) ? "" : e.email;
      case "website":
        // A bare domain is fine. Demanding "https://" was the single most
        // common validation failure a founder could hit on this form, and it
        // punished exactly the people who type "brand.com" the way they say it.
        return !next.website.trim() ||
          /^(https?:\/\/)?[^\s.]+(\.[^\s.]+)+\S*$/.test(next.website.trim())
          ? ""
          : e.website;
      case "phone":
        return !next.phone.trim() || next.phone.replace(/\D/g, "").length >= 7
          ? ""
          : e.phone;
      case "help":
        return chips.length > 0 ? "" : e.help;
      case "message":
        return next.message.trim().length >= 10 ? "" : e.message;
      default:
        return "";
    }
  };

  const onBlur = (key: string) =>
    setErrors((current) => ({ ...current, [key]: validateField(key) }));

  const toggleHelp = (label: string) => {
    setHelp((current) => {
      const next = current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label];
      setErrors((prev) => ({ ...prev, help: validateField("help", values, next) }));
      return next;
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found: Record<string, string> = {};
    for (const key of FIELD_ORDER) {
      const message = validateField(key);
      if (message) found[key] = message;
    }
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Focus the first invalid field in document order, not in object order.
      const firstInvalid = FIELD_ORDER.find((key) => found[key]);
      const target = formRef.current?.querySelector<HTMLElement>(
        firstInvalid === "help" ? "#help-group button" : `#${firstInvalid}`,
      );
      target?.focus();
      return;
    }

    if (values.website2) return;
    setStatus("done");
  };

  if (status === "done") {
    const body = [
      `Name: ${values.name}`, `Company: ${values.company}`,
      `Email: ${values.email}`, `Phone: ${values.phone || "Not provided"}`,
      `Website: ${values.website || "Not provided"}`,
      `Services: ${help.join(", ")}`, `Monthly spend: ${values.spend}`,
      "", values.message,
    ].join("\n");
    const draft = `mailto:${site.email}?subject=${encodeURIComponent(`Growth enquiry — ${values.company}`)}&body=${encodeURIComponent(body)}`;
    return (
      <div role="status" className="rounded-md border border-line p-8">
        <h2 className="type-h2">Your brief is ready.</h2>
        <p className="type-body-lg mt-5 text-ink-soft">
          Open your email draft, review it and send it to {site.email}.
          Your enquiry has not been sent yet.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href={draft}>Open email draft</Button>
          <Button variant="secondary" onClick={() => setStatus("idle")}>Edit your brief</Button>
        </div>
        <p className="type-body-sm mt-6 text-ink-soft">
          No email app? Copy the brief below into your email, or call <a className="underline" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>.
        </p>
        <textarea aria-label="Your enquiry brief" readOnly value={body} rows={9} className="type-body-sm mt-4 w-full rounded border border-line bg-transparent p-4" />
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={busy}>
      <fieldset disabled={busy} className="space-y-8">
        <legend className="sr-only">{contactPage.form.legend}</legend>

        <Field id="name" label={contactPage.form.name} required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => onBlur("name")}
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(inputClass, errors.name && "border-error")}
          />
        </Field>

        <Field
          id="company"
          label={contactPage.form.company}
          required
          error={errors.company}
        >
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            onBlur={() => onBlur("company")}
            aria-required="true"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={cn(inputClass, errors.company && "border-error")}
          />
        </Field>

        <Field id="email" label={contactPage.form.email} required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            onBlur={() => onBlur("email")}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputClass, errors.email && "border-error")}
          />
        </Field>

        <Field id="phone" label={contactPage.form.phone} error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => onBlur("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(inputClass, errors.phone && "border-error")}
          />
        </Field>

        <Field id="website" label={contactPage.form.website} error={errors.website}>
          <input
            id="website"
            name="website"
            type="url"
            autoComplete="url"
            placeholder="https://"
            value={values.website}
            onChange={(e) => set("website", e.target.value)}
            onBlur={() => onBlur("website")}
            aria-invalid={Boolean(errors.website)}
            aria-describedby={errors.website ? "website-error" : undefined}
            className={cn(inputClass, errors.website && "border-error")}
          />
        </Field>

        {/* Multi-select as real buttons: Space and Enter toggle natively, and
            aria-pressed carries the state. */}
        <fieldset>
          <legend className="type-label text-ink-muted">
            {contactPage.form.help}
            <span aria-hidden="true" className="text-accent-deep"> *</span>
            <span className="sr-only"> (required)</span>
          </legend>
          <p className="type-caption mt-1">{contactPage.form.helpHint}</p>
          <div
            id="help-group"
            role="group"
            // No aria-required here: it is only defined for form controls
            // (input, select, listbox, radiogroup and friends), not for a
            // generic group, so it is an unsupported attribute rather than an
            // extra hint. The requirement is carried by the legend, which ends
            // in a visible "*" plus an sr-only "(required)", and by the error
            // when nothing is chosen.
            aria-label={contactPage.form.help}
            aria-describedby={errors.help ? "help-error" : undefined}
            className="mt-4 flex flex-wrap gap-2"
          >
            {[...primaryPillars.map((p) => p.title), contactPage.form.notSure].map(
              (label) => (
                <Chip
                  key={label}
                  pressed={help.includes(label)}
                  onClick={() => toggleHelp(label)}
                >
                  {label}
                </Chip>
              ),
            )}
          </div>
          <ErrorSlot id="help-error" message={errors.help} />
        </fieldset>

        <Field id="spend" label={contactPage.form.spend}>
          <select
            id="spend"
            name="spend"
            value={values.spend}
            onChange={(e) => set("spend", e.target.value)}
            className={cn(inputClass, "cursor-pointer")}
          >
            {contactPage.spendOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="message"
          label={contactPage.form.message}
          required
          error={errors.message}
        >
          <textarea
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            onBlur={() => onBlur("message")}
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={cn(inputClass, "resize-y", errors.message && "border-error")}
          />
        </Field>

        {/* Honeypot. Hidden from everyone, including assistive technology. */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="website2">Leave this field empty</label>
          <input
            id="website2"
            name="website2"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website2}
            onChange={(e) => set("website2", e.target.value)}
          />
        </div>

        <div>
          <Button type="submit" size="lg" loading={busy} className="w-full">
            Prepare email enquiry
          </Button>
          <p className="type-body-sm mt-3 text-ink-soft">Next, review your brief and send it through your email app.</p>
          <ErrorSlot id="server-error" message={errors.server} live />
        </div>
      </fieldset>
    </form>
  );
}

function Field({
  id,
  label,
  required = false,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* A real <label>, styled with the label token. Eyebrow is typed as a
          span and cannot carry htmlFor, and the association matters more than
          reusing the component. */}
      <label htmlFor={id} className="type-label block text-ink-muted">
        {label}
        {required ? (
          <>
            {/* The asterisk is a sighted-reader convention and is hidden from
                assistive tech, which would otherwise announce "star". The
                sr-only word is what a screen reader reads, so the requirement
                is conveyed in text on both channels — aria-required alone
                marks the field but never says so in the label. */}
            <span aria-hidden="true" className="text-accent-deep"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>
      <div className="mt-2">{children}</div>
      <ErrorSlot id={`${id}-error`} message={error} />
    </div>
  );
}

/** Always occupies its line, so showing an error never moves the page. */
function ErrorSlot({
  id,
  message,
  live = false,
}: {
  id: string;
  message?: string;
  live?: boolean;
}) {
  return (
    <p
      id={id}
      role={live ? "alert" : undefined}
      className="type-caption mt-2 block min-h-[1.5em] text-error"
    >
      {message ?? " "}
    </p>
  );
}
