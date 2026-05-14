import { NextResponse } from "next/server";
import { clearAdminCookie } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  await clearAdminCookie();
  const url = new URL(req.url);
  return NextResponse.redirect(new URL("/admin/login", url.origin), { status: 303 });
}
