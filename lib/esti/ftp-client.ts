import { Client } from "basic-ftp";
import { Readable } from "node:stream";

const config = {
  host: process.env.ESTI_FTP_HOST || "starnawska.iq.pl",
  port: Number(process.env.ESTI_FTP_PORT || 21),
  user: process.env.ESTI_FTP_USER || "starnawska_esti",
  password: process.env.ESTI_FTP_PASSWORD || "",
  remoteDir: process.env.ESTI_FTP_REMOTE_DIR || "/",
};

export type FtpFile = {
  name: string;
  size: number;
  modifiedAt: Date;
};

/**
 * Listuje pliki w katalogu FTP. Sortowane po dacie, najnowsze pierwsze.
 */
export async function listFtpFiles(): Promise<FtpFile[]> {
  const client = new Client(30_000);
  client.ftp.verbose = false;
  try {
    await client.access({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      secure: false,
    });
    // CD tylko jeśli REMOTE_DIR != "/" (konta chroot startują już w swoim home)
    if (config.remoteDir && config.remoteDir !== "/") {
      await client.cd(config.remoteDir);
    }
    const list = await client.list();
    return list
      .filter((f) => f.isFile)
      .map((f) => ({
        name: f.name,
        size: f.size,
        modifiedAt: f.modifiedAt ?? new Date(0),
      }))
      .sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
  } finally {
    client.close();
  }
}

/**
 * Pobiera plik z FTP jako Buffer.
 * Używamy dla małych XML albo ZIP-ów (do ~20 MB).
 */
export async function downloadFtpFile(name: string): Promise<Buffer> {
  const client = new Client(60_000);
  client.ftp.verbose = false;
  try {
    await client.access({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      secure: false,
    });
    if (config.remoteDir && config.remoteDir !== "/") {
      await client.cd(config.remoteDir);
    }

    const chunks: Buffer[] = [];
    const stream = new (class extends Readable {
      _read() {
        /* push-only mode */
      }
    })();
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));

    // basic-ftp expects writable; tworzymy mostek
    const writable = new (require("node:stream").Writable)({
      write(chunk: Buffer, _enc: string, cb: () => void) {
        chunks.push(chunk);
        cb();
      },
    });
    await client.downloadTo(writable, name);
    return Buffer.concat(chunks);
  } finally {
    client.close();
  }
}

/**
 * Znajduje NAJNOWSZĄ paczkę ESTI (.zip lub .xml).
 * ESTI generuje: starnawska_pl_esti_YYYY-MM-DD_HH-MM-SS.zip
 */
export async function getLatestEstiPackage(): Promise<{ name: string; buffer: Buffer } | null> {
  const files = await listFtpFiles();
  const packages = files.filter(
    (f) => f.name.endsWith(".zip") || f.name.endsWith(".xml")
  );
  if (packages.length === 0) return null;
  const latest = packages[0];
  const buffer = await downloadFtpFile(latest.name);
  return { name: latest.name, buffer };
}
