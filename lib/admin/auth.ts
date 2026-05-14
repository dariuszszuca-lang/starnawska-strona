import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Prosty auth dla panelu admin: HMAC-podpisana wartość w cookie httpOnly.
 * Cookie jest ważne 7 dni, podpisane sekretem (process.env.ADMIN_SESSION_SECRET).
 */

const COOKIE_NAME = "starnawska_admin";
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getSigningSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "fallback-dev-secret";
}

function sign(payload: string): string {
  return createHmac("sha256", getSigningSecret()).update(payload).digest("hex");
}

export function makeSessionToken(): string {
  const exp = Date.now() + TTL_MS;
  const payload = `v1.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const expected = sign(`${parts[0]}.${parts[1]}`);
  if (expected.length !== parts[2].length) return false;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(parts[2]));
  } catch {
    return false;
  }
}

export async function isAdmin(): Promise<boolean> {
  const c = await cookies();
  const token = c.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function setAdminCookie(): Promise<void> {
  const c = await cookies();
  c.set(COOKIE_NAME, makeSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TTL_MS / 1000,
    path: "/",
  });
}

export async function clearAdminCookie(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE_NAME);
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (password.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
  } catch {
    return false;
  }
}
