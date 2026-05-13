import { NextResponse } from "next/server";
import { getLatestEstiPackage } from "@/lib/esti/ftp-client";
import { unpackEstiZip, parseEstiXml } from "@/lib/esti/parser";
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

  const isAuthorized =
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

    // 2. Wyciągnij XML (jeśli ZIP, rozpakuj)
    let xmlText: string;
    if (pkg.name.endsWith(".xml")) {
      xmlText = pkg.buffer.toString("utf8");
    } else {
      const { xmlText: x } = unpackEstiZip(pkg.buffer);
      if (!x) {
        return NextResponse.json(
          { ok: false, error: "no_xml_in_zip", package: pkg.name },
          { status: 200 }
        );
      }
      xmlText = x;
    }

    // 3. Parsuj
    const offers = parseEstiXml(xmlText);

    // 4. Zapisz cache
    await saveOffers(offers);

    return NextResponse.json({
      ok: true,
      package: pkg.name,
      packageSizeBytes: pkg.buffer.length,
      offersCount: offers.length,
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
