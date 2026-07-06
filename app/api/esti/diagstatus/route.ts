import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { getLatestEstiPackage } from "@/lib/esti/ftp-client";
import { unpackEstiZip } from "@/lib/esti/parser";

// TYMCZASOWA diagnostyka statusów Esti (kody statusów + numery ofert, nie sekret).
// Cel: namierzyć kod "aktywna wewnętrznie". Usunąć po naprawie filtra.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET() {
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
    const parsed = xml.parse(xmlText) as { offers?: { offer?: unknown } };
    const raw = parsed.offers?.offer;
    const offers = (Array.isArray(raw) ? raw : raw ? [raw] : []) as Record<string, unknown>[];
    const val = (v: unknown) =>
      v && typeof v === "object" ? (v as Record<string, unknown>)["#text"] : v;
    const summary = offers.map((o) => ({
      id: o.id,
      numberExport: o.numberExport ?? o.numberPrime ?? o.number,
      status: val(o.status),
      offerExport: o.offerExport,
      companyStatus: o.companyStatus,
      contactStatus: o.contactStatus,
      portalTitle: o.portalTitle,
    }));
    const byStatus: Record<string, number> = {};
    for (const s of summary) byStatus[String(s.status)] = (byStatus[String(s.status)] || 0) + 1;
    return NextResponse.json({
      ok: true,
      package: pkg.name,
      count: offers.length,
      byStatus,
      offers: summary,
      firstKeys: offers[0] ? Object.keys(offers[0]) : [],
      rawStatusFields: offers.map((o) => ({
        id: o.id,
        status: o.status,
        offerExport: o.offerExport,
        companyStatus: o.companyStatus,
      })),
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "unknown" });
  }
}
