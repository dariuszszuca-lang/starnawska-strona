import { NextResponse } from "next/server";
import { get, list, head } from "@vercel/blob";

export const dynamic = "force-dynamic";

const BLOB_PATH = "esti-offers/current.json";

export async function GET() {
  // diag pomocniczy
  let listResult: unknown = null;
  try {
    const l = await list({ prefix: "esti-offers/", limit: 5 });
    listResult = {
      blobsCount: l.blobs.length,
      blobs: l.blobs.map((b) => ({ pathname: b.pathname, size: b.size, uploadedAt: b.uploadedAt })),
    };
  } catch (e) {
    listResult = { error: e instanceof Error ? e.message : "?" };
  }

  let headResult: unknown = null;
  try {
    const h = await head(BLOB_PATH);
    headResult = { pathname: h.pathname, size: h.size, uploadedAt: h.uploadedAt, hasUrl: Boolean(h.url) };
  } catch (e) {
    headResult = { error: e instanceof Error ? e.message : "?" };
  }

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
    return NextResponse.json({ stage: "ok", textLen: len, list: listResult, head: headResult, ...parsed });
  } catch (err) {
    return NextResponse.json({
      stage: "throw",
      error: err instanceof Error ? err.message : "?",
      list: listResult,
      head: headResult,
    });
  }
}
