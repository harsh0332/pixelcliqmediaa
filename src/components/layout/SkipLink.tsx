/**
 * The first focusable element on the page. Invisible until focused, then it
 * appears above the header and jumps past the chrome to the page content.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[200] focus-visible:inline-flex focus-visible:h-12 focus-visible:items-center focus-visible:rounded-pill focus-visible:bg-ink focus-visible:px-6 focus-visible:text-bone focus-visible:type-button"
    >
      Skip to content
    </a>
  );
}
