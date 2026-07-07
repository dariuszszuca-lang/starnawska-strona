import { NextResponse } from "next/server";
import { readOffers } from "@/lib/esti/store";

// Health/monitoring: co strona REALNIE serwuje (liczba ofert, numery, lastSync).
// Używane przez codzienną kontrolę porównującą stan strony ze źródłem prawdy (API Esti).
// Numery ofert są publiczne (widnieją na stronie) — brak danych wrażliwych.
export const dynamic = "force-dynamic";

export async function GET() {
  const cache = await readOffers();
  if (!cache) return NextResponse.json({ ok: false, count: 0, numbers: [] }, { status: 503 });
  const numbers = cache.offers.map((o) => o.offerNumber).filter(Boolean);
  return NextResponse.json({
    ok: true,
    count: cache.offers.length,
    lastSync: cache.lastSync,
    numbers,
  });
}
