import type { ReactNode } from "react";

/**
 * Sets one named run inside a sentence in Satoshi 500.
 *
 * For the places body copy names the seven stages or the six pillars: those
 * words are the vocabulary the whole site runs on, and lifting them half a
 * weight makes them findable in a paragraph without spending colour on it.
 *
 * Weight only — no size change, no accent. And once per sentence: a second
 * emphasised run turns emphasis into texture and stops meaning anything.
 *
 * Matches the first occurrence, verbatim. A term that is not present renders
 * the sentence unchanged rather than throwing, so a copy edit upstream can
 * never break a page.
 */
export function TermRun({ text, term }: { text: string; term: string }): ReactNode {
  const at = text.indexOf(term);
  if (at < 0) return text;

  return (
    <>
      {text.slice(0, at)}
      <span className="type-term">{term}</span>
      {text.slice(at + term.length)}
    </>
  );
}
