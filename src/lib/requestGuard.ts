/**
 * Cheap, dependency-free checks for the public POST routes.
 *
 * Returns a status code when the request should be refused, otherwise null.
 * - Body size: a form submission is a few hundred bytes; anything past 20 KB is not a visitor.
 * - Origin: browsers always send it on cross-site POSTs, so a mismatch is a request from another site.
 */
const MAX_BYTES = 20_000;

export function refuseRequest(request: Request): { status: number; message: string } | null {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BYTES) return { status: 413, message: "Request too large." };

  const origin = request.headers.get("origin");
  if (origin) {
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    let originHost = "";
    try { originHost = new URL(origin).host; } catch { /* malformed origin is refused below */ }
    if (!host || originHost !== host) return { status: 403, message: "Cross-site request refused." };
  }
  return null;
}
