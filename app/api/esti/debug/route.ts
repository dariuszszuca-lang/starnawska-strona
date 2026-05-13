import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { getLatestEstiPackage } from "@/lib/esti/ftp-client";
import { unpackEstiZip } from "@/lib/esti/parser";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Diagnostyka: zwraca surowe XML keys + przykład pierwszej oferty.
 * Chronione CRON_SECRET.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("secret");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && querySecret !== cronSecret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const pkg = await getLatestEstiPackage();
    if (!pkg) return NextResponse.json({ ok: false, error: "no_package" });

    let xmlText: string;
    if (pkg.name.endsWith(".xml")) {
      xmlText = pkg.buffer.toString("utf8");
    } else {
      const { xmlText: x } = unpackEstiZip(pkg.buffer);
      xmlText = x ?? "";
    }

    const xml = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      parseTagValue: false,
      trimValues: true,
    });
    const parsed = xml.parse(xmlText);

    // Znajdź root tablicy ofert
    const rootKey = Object.keys(parsed)[0];
    const root = parsed[rootKey];
    const offersKey = root ? Object.keys(root)[0] : null;
    const items = offersKey ? root[offersKey] : null;
    const list = Array.isArray(items) ? items : items ? [items] : [];

    return NextResponse.json({
      ok: true,
      package: pkg.name,
      structure: {
        rootKey,
        offersKey,
        totalOffers: list.length,
      },
      xmlTopLevelKeys: Object.keys(parsed),
      firstOfferKeys: list[0] ? Object.keys(list[0]) : [],
      firstOffer: list[0] ?? null,
      secondOffer: list[1] ?? null,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : "unknown",
    });
  }
}
