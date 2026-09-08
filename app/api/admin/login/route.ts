import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createSessionToken,
  verifyCredentials,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/lib/auth";
import { loginSchema, formatZodError } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", fields: formatZodError(parsed.error) },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  try {
    if (!verifyCredentials(email, password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Auth misconfigured" },
      { status: 500 }
    );
  }

  const token = createSessionToken(email.trim().toLowerCase());
  const store = await cookies();
  store.set(SESSION_COOKIE, token, sessionCookieOptions);

  return NextResponse.json({ success: true });
}
