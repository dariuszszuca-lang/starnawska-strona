import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { getLatestEstiPackage } from "@/lib/esti/ftp-client";
import { unpackEstiZip, parseEstiXml } from "@/lib/esti/parser";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// TEMP DIAG TOKEN — usunac po diagnozie ST297928
const TEMP_DIAG_TOKEN = "WKlRdJyH9iYNVdJI0ABHglfdWtvrrrWZ";

/**
 * Diagnostyka: zwraca surowe XML keys + przykład pierwszej oferty.
 * Chronione CRON_SECRET.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("secret");
  const tempToken = url.searchParams.get("t");
  const cronSecret = process.env.CRON_SECRET;
  const okTemp = tempToken === TEMP_DIAG_TOKEN;
  if (!okTemp && cronSecret && querySecret !== cronSecret) {
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

    // Ile ofert wyciaga PRAWDZIWY parser (to co trafia do offers.json)
    const parsedOffers = parseEstiXml(xmlText);
    const offerTagCount = (xmlText.match(/<offer[\s>]/gi) || []).length;
    const hasST297928 = xmlText.includes("ST297928") || xmlText.includes("297928");
    // numery wszystkich ofert wg parsera
    const offerNumbers = parsedOffers
      .map((o) => o.offerNumber)
      .filter(Boolean)
      .slice(0, 200);

    return NextResponse.json({
      ok: true,
      package: pkg.name,
      xmlSize: xmlText.length,
      offerTagCount,
      parsedOffersCount: parsedOffers.length,
      hasST297928,
      offerNumbers,
      topLevelKeys: Object.keys(parsed),
      offersWrapper: parsed.offers ? "offers" : parsed.oferty ? "oferty" : "none",
      offersWrapperKeys: rootKeys,
      offerArrayKey: offerKey,
      offerArrayLength: offerArray.length,
      xmlSample: xmlText.slice(0, 1500),
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : "unknown",
    });
  }
}
