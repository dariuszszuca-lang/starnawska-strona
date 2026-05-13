import { NextResponse } from "next/server";
import { listFtpFiles } from "@/lib/esti/ftp-client";
import { readOffers } from "@/lib/esti/store";

export const dynamic = "force-dynamic";

/**
 * Diagnostyka: pokazuje stan FTP + cache.
 * Endpoint chroniony tym samym sekretem co cron.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("secret");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && querySecret !== cronSecret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const result: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    env: {
      host: process.env.ESTI_FTP_HOST,
      port: process.env.ESTI_FTP_PORT,
      user: process.env.ESTI_FTP_USER,
      hasPassword: Boolean(process.env.ESTI_FTP_PASSWORD),
      remoteDir: process.env.ESTI_FTP_REMOTE_DIR,
    },
  };

  // FTP
  try {
    const files = await listFtpFiles();
    result.ftp = {
      ok: true,
      filesCount: files.length,
      latest: files.slice(0, 5).map((f) => ({
        name: f.name,
        size: f.size,
        modifiedAt: f.modifiedAt.toISOString(),
      })),
    };
  } catch (err) {
    result.ftp = {
      ok: false,
      error: err instanceof Error ? err.message : "unknown",
    };
  }

  // Cache
  const cache = await readOffers();
  result.cache = cache
    ? {
        ok: true,
        lastSync: cache.lastSync,
        offersCount: cache.offers.length,
        sample: cache.offers.slice(0, 3).map((o) => ({
          id: o.id,
          type: o.type,
          city: o.city,
          price: o.price,
          area: o.area,
        })),
      }
    : { ok: false, error: "no_cache" };

  return NextResponse.json(result);
}
