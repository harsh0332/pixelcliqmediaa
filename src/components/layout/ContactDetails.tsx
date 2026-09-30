import Link from "next/link";
import { site } from "@/content/site";
import { isPlaceholder } from "@/lib/placeholders";
import { cn } from "@/lib/utils";

/** Public channels, with a contact-page fallback when not configured. */
export function ContactDetails({ className }: { className?: string }) {
  const phone = isPlaceholder(site.phone) ? null : site.phone;
  const email = isPlaceholder(site.email) ? null : site.email;

  return (
    <ul className={cn("space-y-2", className)}>
      <li className="type-body-sm text-ink-soft">{site.location}</li>

      {phone ? (
        <li>
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="type-body-sm text-ink-soft underline-offset-4 hover:underline focus-visible:underline"
          >
            {phone}
          </a>
        </li>
      ) : null}

      {email ? (
        <li>
          <a
            href={`mailto:${email}`}
            className="type-body-sm text-ink-soft underline-offset-4 hover:underline focus-visible:underline"
          >
            {email}
          </a>
        </li>
      ) : null}

      {!phone && !email ? (
        <li>
          <Link
            href="/contact"
            className="target-44 type-body-sm text-ink-soft underline underline-offset-4 decoration-line-strong hover:decoration-ink focus-visible:decoration-ink"
          >
            Send an enquiry
          </Link>
        </li>
      ) : null}
    </ul>
  );
}
