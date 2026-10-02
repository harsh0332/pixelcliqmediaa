import { whatsappHref } from "@/content/site";

/**
 * A floating WhatsApp button for tablet and desktop. On phones the sticky
 * mobile bar carries the same link, so this one stands down below 768px.
 */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Pixelcliq on WhatsApp"
      className="wa-fab"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" width="28" height="28">
        <path fill="currentColor" d="M16.04 3C9 3 3.3 8.7 3.3 15.74c0 2.25.6 4.45 1.72 6.38L3.2 28.8l6.86-1.8a12.7 12.7 0 0 0 5.98 1.52h.01c7.03 0 12.74-5.71 12.74-12.75C28.79 8.7 23.07 3 16.04 3Zm0 23.3h-.01a10.6 10.6 0 0 1-5.39-1.48l-.39-.23-4.07 1.07 1.09-3.97-.25-.41a10.56 10.56 0 0 1-1.62-5.62c0-5.85 4.76-10.6 10.63-10.6a10.6 10.6 0 0 1 10.6 10.62c0 5.86-4.76 10.62-10.59 10.62Zm5.81-7.95c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.5-2.56-1.58a9.6 9.6 0 0 1-1.77-2.2c-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.34-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"/>
      </svg>
    </a>
  );
}
