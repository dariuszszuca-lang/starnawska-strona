import { NextResponse } from "next/server";
import { getLatestEstiPackage } from "@/lib/esti/ftp-client";
import { unpackEstiZip, parseEstiXml } from "@/lib/esti/parser";
import { commitFiles, listRepoFiles, type FileChange } from "@/lib/github/commit";
import type { Offer } from "@/lib/esti/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const OWNER = "dariuszszuca-lang";
const REPO = "starnawska-strona";
const BRANCH = "main";
const IMG_PREFIX = "public/oferty/";
const DATA_PATH = "data/offers.json";

/**
 * Cron: pobiera paczkę z ESTI, parsuje, zapisuje dane jako commit w repo.
 *
 * - Zdjęcia: public/oferty/<filename>  (delta — tylko nowe pliki blob upload)
 * - JSON ofert: data/offers.json
 *
 * Vercel widzi push → automatyczny rebuild → strona aktualna.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const querySecret = url.searchParams.get("secret");
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  const isAuthorized =
    !cronSecret ||
    querySecret === cronSecret ||
    authHeader === `Bearer ${cronSecret}`;

  if (!isAuthorized) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json({ ok: false, error: "github_token_missing" }, { status: 500 });
  }

  const start = Date.now();
  try {
    // 1. Pobierz paczkę z FTP
    const pkg = await getLatestEstiPackage();
    if (!pkg) return NextResponse.json({ ok: false, error: "no_package_found" });

    // 2. Rozpakuj ZIP / weź XML wprost
    let xmlText: string;
    let imagesMap = new Map<string, Buffer>();
    if (pkg.name.endsWith(".xml")) {
      xmlText = pkg.buffer.toString("utf8");
    } else {
      const result = unpackEstiZip(pkg.buffer);
      if (!result.xmlText) {
        return NextResponse.json({ ok: false, error: "no_xml_in_zip", package: pkg.name });
      }
      xmlText = result.xmlText;
      imagesMap = result.images;
    }

    // 3. Sprawdź jakie zdjęcia już są w repo
    const existing = await listRepoFiles(OWNER, REPO, IMG_PREFIX, BRANCH);
    const existingFilenames = new Set<string>(
      Array.from(existing.keys()).map((p) => p.slice(IMG_PREFIX.length))
    );

    // 4. Sparsuj XML (zdjęcia trafią do Offer.images jeśli będą w finalnym repo)
    // Najpierw zbieramy które pliki BĘDĄ — zdjęcia z paczki + już istniejące w repo.
    const inPackage = new Set(imagesMap.keys());
    const willExist = new Set<string>([...existingFilenames, ...inPackage]);

    const offers: Offer[] = parseEstiXml(xmlText, willExist);

    // 5. Delta zdjęć:
    //    - nowe (są w paczce, nie ma ich w repo) → upload
    //    - usuwane (są w repo, ale żadna oferta ich już nie używa) → delete
    const referenced = new Set<string>();
    for (const o of offers) {
      for (const img of o.images) {
        const fn = img.url.replace(/^\/oferty\//, "");
        referenced.add(fn);
      }
    }

    const toUpload: string[] = [];
    for (const fn of referenced) {
      if (inPackage.has(fn) && !existingFilenames.has(fn)) toUpload.push(fn);
    }

    const toDelete: string[] = [];
    for (const fn of existingFilenames) {
      if (!referenced.has(fn)) toDelete.push(fn);
    }

    // 6. Zbuduj listę plików do commit
    const changes: FileChange[] = [];

    // 6a. JSON ofert
    const payload = { lastSync: new Date().toISOString(), offers };
    changes.push({
      path: DATA_PATH,
      contentUtf8: JSON.stringify(payload, null, 2),
    });

    // 6b. Nowe zdjęcia jako base64
    for (const fn of toUpload) {
      const buf = imagesMap.get(fn);
      if (!buf) continue;
      changes.push({
        path: `${IMG_PREFIX}${fn}`,
        contentBase64: buf.toString("base64"),
      });
    }

    // 6c. Usunięcia
    for (const fn of toDelete) {
      changes.push({ path: `${IMG_PREFIX}${fn}`, delete: true });
    }

    // 7. Commit
    const summary = `sync esti: ${offers.length} ofert, +${toUpload.length} zdjęć, -${toDelete.length}`;
    const commit = await commitFiles({
      owner: OWNER,
      repo: REPO,
      branch: BRANCH,
      message: summary,
      files: changes,
    });

    return NextResponse.json({
      ok: true,
      package: pkg.name,
      packageSizeBytes: pkg.buffer.length,
      offersCount: offers.length,
      imagesInPackage: imagesMap.size,
      imagesUploaded: toUpload.length,
      imagesDeleted: toDelete.length,
      commitSha: commit.sha.slice(0, 7),
      blobsCreated: commit.blobsCreated,
      durationMs: Date.now() - start,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "unknown",
        stack: err instanceof Error ? err.stack?.split("\n").slice(0, 6) : undefined,
      },
      { status: 500 }
    );
  }
}
