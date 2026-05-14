import { NextResponse } from "next/server";
import { get } from "@vercel/blob";

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
    const result = await get(`esti-images/${name}`, { access: "private" });
    if (!result || !result.stream) {
      return new NextResponse("not found", { status: 404 });
    }

    const contentType = name.endsWith(".png")
      ? "image/png"
      : name.endsWith(".webp")
        ? "image/webp"
        : "image/jpeg";

    return new NextResponse(result.stream, {
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
