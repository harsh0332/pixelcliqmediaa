/**
 * Split a paragraph after its own first sentence.
 *
 * Presentational only, and deliberately not a content-model change: an author
 * writes one paragraph and the layout decides whether to set the opening
 * sentence as a lead. Nothing is reordered — the lead is always the sentence
 * that was already first — so the prose reads identically with the styling
 * stripped, which is the constraint that matters for screen readers.
 *
 * Bails out and returns the paragraph whole when there is no sentence boundary,
 * when the opening sentence is long enough that promoting it would just move
 * the wall of text up a size, or when what follows is too short to be a
 * paragraph of its own.
 */
const MAX_LEAD = 150;
const MIN_SUPPORT = 40;

export function splitLead(text: string): { lead: string; support?: string } {
  const match = /[.?!]\s+/.exec(text);
  if (!match) return { lead: text };

  const cut = match.index + 1;
  const lead = text.slice(0, cut).trim();
  const support = text.slice(cut).trim();

  if (lead.length > MAX_LEAD || support.length < MIN_SUPPORT) return { lead: text };
  return { lead, support };
}
