import type { ArticleBlock } from "@/content/insights";

/**
 * Long-form typography.
 *
 * Measure is held at the prose container's 720px; only the pull quote breaks
 * out, and only on desktop where there is margin to break into. Body copy runs
 * at 18px on a 1.7 leading — looser than the site's 1.65 default, because
 * sustained reading wants more air than an interface does.
 *
 * Every block type is styled explicitly rather than through a prose reset, so
 * the article inherits the same tokens as everything else and cannot drift into
 * a second typographic system.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="mt-12">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "h2":
            return (
              <h2 key={key} className="type-h2 mt-14 mb-5 first:mt-0">
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3 key={key} className="type-h3 mt-10 mb-4">
                {block.text}
              </h3>
            );

          case "ul":
            return (
              <ul key={key} className="my-7 space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-[0.85em] h-px w-4 shrink-0 bg-accent"
                    />
                    <span className="type-body-lg leading-[1.7] text-ink-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "ol":
            return (
              <ol key={key} className="my-7 space-y-3">
                {block.items.map((item, position) => (
                  <li key={item} className="flex gap-4">
                    <span className="type-label mt-[0.55em] shrink-0 text-accent-deep tabular-nums">
                      {String(position + 1).padStart(2, "0")}
                    </span>
                    <span className="type-body-lg leading-[1.7] text-ink-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            );

          case "quote":
            return (
              <blockquote
                key={key}
                className="my-10 border-l border-accent pl-6"
              >
                <p className="type-body-lg leading-[1.6] text-ink">{block.text}</p>
                {block.attribution ? (
                  <footer className="type-caption mt-3">
                    {block.attribution}
                  </footer>
                ) : null}
              </blockquote>
            );

          case "pull":
            // The one element allowed outside the measure, and only where
            // there is margin to break into.
            return (
              <p
                key={key}
                className="type-emphasis my-14 text-[clamp(1.5rem,3.2vw,2.25rem)] leading-[1.25] text-ink lg:-mx-24"
              >
                {block.text}
              </p>
            );

          case "code":
            return (
              <pre
                key={key}
                className="my-8 overflow-x-auto rounded-md border border-line bg-paper p-5"
              >
                <code className="font-mono text-[0.875rem] leading-[1.6] text-ink">
                  {block.text}
                </code>
              </pre>
            );

          default:
            return (
              <p
                key={key}
                className="type-body-lg mb-6 leading-[1.7] text-ink-soft"
              >
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
