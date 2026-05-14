import { NextResponse } from "next/server";
import { get } from "@vercel/blob";

export const dynamic = "force-dynamic";

const BLOB_PATH = "esti-offers/current.json";

export async function GET() {
  try {
    const result = await get(BLOB_PATH, { access: "private" });
    if (!result) return NextResponse.json({ stage: "no_result" });
    const hasStream = Boolean(result.stream);
    if (!hasStream) return NextResponse.json({ stage: "no_stream", keys: Object.keys(result) });
    const text = await new Response(result.stream).text();
    const len = text.length;
    let parsed: { lastSync?: string; offersCount?: number; firstId?: string } = {};
    try {
      const obj = JSON.parse(text) as { lastSync: string; offers: { id: string }[] };
      parsed = {
        lastSync: obj.lastSync,
        offersCount: obj.offers.length,
        firstId: obj.offers[0]?.id,
      };
    } catch (e) {
      return NextResponse.json({ stage: "json_parse_failed", textLen: len, headFirst200: text.slice(0, 200), err: e instanceof Error ? e.message : "?" });
    }
    return NextResponse.json({ stage: "ok", textLen: len, ...parsed });
  } catch (err) {
    return NextResponse.json({
      stage: "throw",
      error: err instanceof Error ? err.message : "?",
      stack: err instanceof Error ? err.stack?.split("\n").slice(0, 6) : null,
    });
  }
}
