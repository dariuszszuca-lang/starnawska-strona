import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { getLatestEstiPackage } from "@/lib/esti/ftp-client";
import { unpackEstiZip } from "@/lib/esti/parser";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Diagnostyka pól typu z ESTI — żeby zobaczyć dlaczego oferty są źle podpisywane.
 * Zwraca dla każdej oferty: id, typeName, mainTypeId, mainType, title, area, price.
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
      isArray: (name) => ["offer"].includes(name),
    });
    const parsed = xml.parse(xmlText) as {
      offers?: { offer?: Record<string, unknown>[] };
    };
    const offers = parsed.offers?.offer ?? [];

    const dump = offers.map((o) => {
      const get = (k: string) => {
        const v = o[k];
        if (v === null || v === undefined) return null;
        if (typeof v === "object") {
          const obj = v as Record<string, unknown>;
          return {
            text: obj["#text"] ?? null,
            dict: obj["@_dictionary"] ?? null,
          };
        }
        return v;
      };
      return {
        id: o.id ?? null,
        portalTitle: o.portalTitle ?? null,
        typeName: o.typeName ?? null,
        type: get("type"),
        mainType: get("mainType"),
        mainTypeId: get("mainTypeId"),
        subType: get("subType"),
        offerKind: get("offerKind"),
        marketType: get("marketType"),
        area: o.areaTotal ?? o.areaUsable ?? null,
        price: o.price ?? null,
        city: o.locationCityName ?? null,
      };
    });

    return NextResponse.json({
      ok: true,
      count: dump.length,
      offers: dump,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : "unknown",
    });
  }
}
