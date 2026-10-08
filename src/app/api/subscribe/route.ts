import { NextResponse } from "next/server";
import { refuseRequest } from "@/lib/requestGuard";

/**
 * Newsletter placeholder handler.
 *
 * Deliberately not storing anything. There is no list, no provider and no
 * privacy notice covering subscriber data yet, so accepting an address here
 * would be collecting personal data with nowhere lawful to put it.
 *
 * It validates the address and returns an honest 503 so the form has something
 * real to talk to. Wiring a provider is a change to this file alone.
 */
export async function POST(request: Request) {
  const refused = refuseRequest(request);
  if (refused) return NextResponse.json({ ok: false, message: refused.message }, { status: refused.status });

  let email = "";
  try {
    const body = (await request.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not read that request." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { ok: false, message: "That does not look like an email address." },
      { status: 400 },
    );
  }

  return NextResponse.json(
    {
      ok: false,
      message:
        "The list is not open yet. Nothing was stored — check back shortly and we will be accepting addresses properly.",
    },
    { status: 503 },
  );
}
