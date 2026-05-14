import { NextResponse } from "next/server";
import { list, head } from "@vercel/blob";

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
    // Test nowej drogi: head().url + fetch z Bearer
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const meta = await head(BLOB_PATH);
    if (!meta?.url) return NextResponse.json({ stage: "no_url", list: listResult, head: headResult });
    const res = await fetch(meta.url, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({
        stage: "fetch_failed",
        fetchStatus: res.status,
        fetchHeaders: Object.fromEntries(res.headers.entries()),
        list: listResult,
        head: headResult,
      });
    }
    const text = await res.text();
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
      stack: err instanceof Error ? err.stack?.split("\n").slice(0, 10) : null,
      list: listResult,
      head: headResult,
    });
  }
}
