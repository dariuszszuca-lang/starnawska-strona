import { NextResponse } from "next/server";
import { head } from "@vercel/blob";

export const dynamic = "force-dynamic";

/**
 * Proxy: /api/esti/image/{fileName.jpg} -> private Blob {esti-images/{fileName}.jpg}
 * Pozwala przeglądarce pobierać prywatne zdjęcia bez tokenu Bearer.
 * Cache 24h na Vercel CDN.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  // Sanityzacja: tylko alfanumeryczne, kropki i myślniki
  if (!/^[a-zA-Z0-9._-]+$/.test(name)) {
    return new NextResponse("invalid name", { status: 400 });
  }

  try {
    // @vercel/blob 2.x: head().url to permanent URL — dla private store
    // wymaga Authorization: Bearer ${BLOB_READ_WRITE_TOKEN}.
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const meta = await head(`esti-images/${name}`);
    if (!meta?.url || !token) return new NextResponse("not found", { status: 404 });

    const upstream = await fetch(meta.url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!upstream.ok || !upstream.body) {
      return new NextResponse("not found", { status: 404 });
    }

    const contentType =
      upstream.headers.get("content-type") ||
      (name.endsWith(".png")
        ? "image/png"
        : name.endsWith(".webp")
          ? "image/webp"
          : "image/jpeg");

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new NextResponse("not found", { status: 404 });
  }
}
