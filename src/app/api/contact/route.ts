import { NextResponse } from "next/server";
import { refuseRequest } from "@/lib/requestGuard";
import { contactPage } from "@/content/home";

/** One source of error copy, so the server can never contradict the field
 *  labels the visitor just read on the client. */
const copy = contactPage.errors;

/** No delivery provider is configured. Never report an unsent lead as delivered. */

interface ContactPayload {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  help?: unknown;
  spend?: unknown;
  message?: unknown;
  /** Honeypot. Real people never fill this; bots usually do. */
  website2?: unknown;
}

const isText = (value: unknown, min = 1): value is string =>
  typeof value === "string" && value.trim().length >= min;

export async function POST(request: Request) {
  const refused = refuseRequest(request);
  if (refused) return NextResponse.json({ ok: false, errors: { server: refused.message } }, { status: refused.status });

  let payload: ContactPayload;
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ ok: false, errors: { server: "Invalid request." } }, { status: 400 });
    }
    payload = body as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, errors: { server: "Could not read that request." } },
      { status: 400 },
    );
  }

  // Honeypot: accept silently so a bot cannot tell it failed.
  if (isText(payload.website) && payload.website.trim() && !/^https?:\/\//i.test(payload.website.trim())) {
    payload.website = "https://" + payload.website.trim();
  }

  if (isText(payload.website2)) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const errors: Record<string, string> = {};
  if (!isText(payload.name)) errors.name = copy.name;
  if (!isText(payload.company)) errors.company = copy.company;
  if (
    typeof payload.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email.trim())
  ) {
    errors.email = copy.email;
  }
  if (!isText(payload.message, 10)) {
    errors.message = copy.message;
  }
  if (!Array.isArray(payload.help) || payload.help.length === 0) {
    errors.help = copy.help;
  }
  if (
    isText(payload.website) &&
    !/^https?:\/\/[^\s.]+\.\S{2,}$/.test((payload.website as string).trim())
  ) {
    errors.website = copy.website;
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  return NextResponse.json(
    { ok: false, errors: { server: "Please email contact@pixelcliqmedia.com or call +91 7024332332. Online delivery is not configured." } },
    { status: 503 },
  );
}
