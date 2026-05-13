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

    // Znajdź `offers` lub podobne na top level
    const root = parsed.offers ?? parsed.oferty ?? parsed;
    const rootKeys = root && typeof root === "object" ? Object.keys(root) : [];

    // Pierwszy klucz który ma tablicę
    let offerArray: unknown[] = [];
    let offerKey = "";
    for (const k of rootKeys) {
      const v = (root as Record<string, unknown>)[k];
      if (Array.isArray(v)) {
        offerArray = v;
        offerKey = k;
        break;
      }
    }

    return NextResponse.json({
      ok: true,
      package: pkg.name,
      xmlSize: xmlText.length,
      xmlSample: xmlText.slice(0, 2000),
      topLevelKeys: Object.keys(parsed),
      offersWrapper: parsed.offers ? "offers" : parsed.oferty ? "oferty" : "none",
      offersWrapperKeys: rootKeys,
      offerArrayKey: offerKey,
      offerArrayLength: offerArray.length,
      firstOfferKeys: offerArray[0] && typeof offerArray[0] === "object"
        ? Object.keys(offerArray[0])
        : [],
      firstOffer: offerArray[0] ?? null,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : "unknown",
    });
  }
}
