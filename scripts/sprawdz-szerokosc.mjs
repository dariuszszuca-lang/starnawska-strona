// Sprawdza, czy strony ofert nie są szersze niż ekran telefonu (390 px).
// Użycie: node scripts/sprawdz-szerokosc.mjs [adres bazowy]
// Kod wyjścia 1 = co najmniej jedna strona rozjeżdża się na telefonie.
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = (process.argv[2] || "https://starnawska.pl").replace(/\/$/, "");
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const WIDTH = 390;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function offerUrls() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return urls
    .filter((u) => /\/oferty\/[^/]+$/.test(u))
    .map((u) => u.replace(/^https?:\/\/[^/]+/, BASE));
}

function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const events = [];
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    } else if (msg.method) events.push(msg.method);
  };
  const ready = new Promise((r) => (ws.onopen = r));
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const n = ++id;
      pending.set(n, resolve);
      ws.send(JSON.stringify({ id: n, method, params }));
    });
  return { ready, send, events, close: () => ws.close() };
}

async function main() {
  const urls = await offerUrls();
  if (urls.length === 0) {
    console.error("BRAK ofert w sitemap.xml");
    process.exit(2);
  }
  const profile = mkdtempSync(join(tmpdir(), "szerokosc-"));
  const chrome = spawn(CHROME, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ]);
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    await sleep(200);
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      target = list.find((t) => t.type === "page");
    } catch {}
  }
  if (!target) throw new Error("Chrome nie wystartował");
  const c = cdp(target.webSocketDebuggerUrl);
  await c.ready;
  await c.send("Page.enable");
  await c.send("Emulation.setDeviceMetricsOverride", {
    width: WIDTH,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });

  const bad = [];
  for (const url of urls) {
    c.events.length = 0;
    await c.send("Page.navigate", { url });
    for (let i = 0; i < 100 && !c.events.includes("Page.loadEventFired"); i++)
      await sleep(100);
    await sleep(500);
    const r = await c.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `({sw: document.documentElement.scrollWidth, vw: document.documentElement.clientWidth})`,
    });
    const { sw, vw } = r.result.result.value;
    const ok = sw <= vw + 1;
    console.log(`${ok ? "OK " : "ZLE"} ${sw}/${vw}px ${url}`);
    if (!ok) bad.push(url);
  }
  c.close();
  const exited = new Promise((r) => chrome.once("exit", r));
  chrome.kill();
  await exited;
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {}
  console.log(`Sprawdzone: ${urls.length}, rozjeżdża się: ${bad.length}`);
  process.exit(bad.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
