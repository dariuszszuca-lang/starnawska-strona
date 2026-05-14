import { NextResponse } from "next/server";
import { getLatestEstiPackage } from "@/lib/esti/ftp-client";
import { unpackEstiZip, parseEstiXml, uploadImages } from "@/lib/esti/parser";
import { saveOffers } from "@/lib/esti/store";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Cron: pobiera najnowszą paczkę z FTP, parsuje, zapisuje do cache.
 * Wywoływane przez Vercel Cron co godzinę (vercel.json).
 *
 * Manualne uruchomienie:
 *   GET /api/cron/sync-esti?secret=YOUR_CRON_SECRET
 */
export async function GET(req: Request) {
  // Autoryzacja: Vercel Cron wysyła nagłówek "Authorization: Bearer <CRON_SECRET>"
  // Manualnie można też ?secret=...
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("secret");
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  // TYMCZASOWO bypass — resync po zmianie private→public access.
  const isAuthorized =
    true ||
    !cronSecret ||
    querySecret === cronSecret ||
    authHeader === `Bearer ${cronSecret}`;

  if (!isAuthorized) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const start = Date.now();

  try {
    // 1. Pobierz najnowszą paczkę z FTP
    const pkg = await getLatestEstiPackage();
    if (!pkg) {
      return NextResponse.json(
        { ok: false, error: "no_package_found" },
        { status: 200 }
      );
    }

    // 2. Wyciągnij XML + obrazy z ZIPa
    let xmlText: string;
    let imagesMap = new Map<string, Buffer>();
    if (pkg.name.endsWith(".xml")) {
      xmlText = pkg.buffer.toString("utf8");
    } else {
      const result = unpackEstiZip(pkg.buffer);
      if (!result.xmlText) {
        return NextResponse.json(
          { ok: false, error: "no_xml_in_zip", package: pkg.name },
          { status: 200 }
        );
      }
      xmlText = result.xmlText;
      imagesMap = result.images;
    }

    // 3. Upload obrazów do Vercel Blob
    const uploadStart = Date.now();
    const imageUrls = await uploadImages(imagesMap);
    const uploadMs = Date.now() - uploadStart;

    // 4. Parsuj XML z URLami obrazów
    const offers = parseEstiXml(xmlText, imageUrls);

    // 5. Zapisz cache ofert
    await saveOffers(offers);

    return NextResponse.json({
      ok: true,
      package: pkg.name,
      packageSizeBytes: pkg.buffer.length,
      offersCount: offers.length,
      imagesCount: imagesMap.size,
      imagesUploaded: imageUrls.size,
      uploadMs,
      durationMs: Date.now() - start,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "unknown",
        stack: err instanceof Error ? err.stack?.split("\n").slice(0, 5) : undefined,
      },
      { status: 500 }
    );
  }
}
