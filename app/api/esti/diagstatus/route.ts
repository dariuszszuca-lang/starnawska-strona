import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { getLatestEstiPackage } from "@/lib/esti/ftp-client";
import { unpackEstiZip } from "@/lib/esti/parser";

// TYMCZASOWA diagnostyka: co jest w bieżącej paczce Esti (numer, price, area, action).
// Cel: czemu ST645923 nie trafia na stronę. Usunąć po naprawie.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
  try {
    const pkg = await getLatestEstiPackage();
    if (!pkg) return NextResponse.json({ ok: false, error: "no_package" });
    let xmlText: string;
    if (pkg.name.endsWith(".xml")) xmlText = pkg.buffer.toString("utf8");
    else xmlText = unpackEstiZip(pkg.buffer).xmlText ?? "";
    const xml = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      parseTagValue: false,
      trimValues: true,
      isArray: (n) => n === "offer",
    });
    const parsed = xml.parse(xmlText) as {
      offers?: { offer?: Record<string, unknown>[]; "@_export"?: string };
    };
    const offers = parsed.offers?.offer ?? [];
    const v = (x: unknown) =>
      x && typeof x === "object" ? (x as Record<string, unknown>)["#text"] : x;
    const list = offers.map((o) => ({
      id: o.id,
      num: o.numberExport ?? o.numberPrime ?? o.number,
      action: o.action,
      status: v(o.status),
      price: o.price,
      areaTotal: o.areaTotal,
      areaUsable: o.areaUsable,
      pics: (() => {
        const p = (o.pictures as { picture?: unknown } | undefined)?.picture;
        return Array.isArray(p) ? p.length : p ? 1 : 0;
      })(),
    }));
    return NextResponse.json({
      ok: true,
      package: pkg.name,
      exportMode: parsed.offers?.["@_export"],
      count: offers.length,
      hasST645923: list.some((x) => String(x.num).includes("645923")),
      offers: list,
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "unknown" });
  }
}
