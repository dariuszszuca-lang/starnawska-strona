import { NextResponse } from "next/server";
import { checkPassword, setAdminCookie } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const data = await req.formData();
  const password = String(data.get("password") || "");
  const from = String(data.get("from") || "/admin");

  if (!checkPassword(password)) {
    const url = new URL(req.url);
    const redirectUrl = new URL("/admin/login", url.origin);
    redirectUrl.searchParams.set("error", "bad-password");
    if (from && from.startsWith("/admin")) redirectUrl.searchParams.set("from", from);
    return NextResponse.redirect(redirectUrl, { status: 303 });
  }

  await setAdminCookie();

  const url = new URL(req.url);
  const target = from && from.startsWith("/admin") ? from : "/admin";
  return NextResponse.redirect(new URL(target, url.origin), { status: 303 });
}
