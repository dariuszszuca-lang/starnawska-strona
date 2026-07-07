#!/usr/bin/env python3
"""Codzienna kontrola: oferty w Esti (źródło prawdy) vs to, co realnie na stronie.
Łapie regresje: aktywna oferta której nie ma na stronie, stale (API padło→snapshot), strona down.
Powiadamia (macOS notification) + log. Cron: launchd raz dziennie.
"""
import os, json, urllib.request, urllib.parse, datetime, subprocess, sys

BASE = os.path.dirname(os.path.abspath(__file__))
SECRETS = os.path.expanduser("~/.secrets/starnawska-esti.env")
HEALTH_URL = "https://starnawska.pl/api/health/offers"
HIDDEN = {"12049010", "11601806"}  # zgodne z HIDDEN_OFFER_IDS w store.ts
LOG = os.path.join(BASE, "kontrola.log")
STATUS = os.path.join(BASE, "kontrola-status.json")

def creds():
    d = {}
    for line in open(SECRETS):
        line = line.strip()
        if "=" in line and not line.startswith("#"):
            k, v = line.split("=", 1); d[k] = v.strip()
    return d["ESTI_API_COMPANY"], d["ESTI_API_TOKEN"]

def esti_truth():
    """Numery ofert które POWINNY być na stronie: status=3, price>0, area>0, nie ukryte."""
    comp, tok = creds()
    out = {}
    skip = 0
    while True:
        q = urllib.parse.urlencode({"company": comp, "token": tok, "status": "3", "take": 200, "skip": skip})
        d = json.load(urllib.request.urlopen(f"https://app.esticrm.pl/apiClient/offer/list?{q}", timeout=45))
        data = d.get("data") or []
        for o in data:
            num = str(o.get("numberExport") or o.get("number") or "")
            oid = str(o.get("id") or "")
            price = float(o.get("price") or 0)
            area = float(o.get("areaTotal") or o.get("areaUsable") or 0)
            if oid in HIDDEN or price <= 0 or area <= 0:
                continue
            if num:
                out[num] = oid
        skip += 200
        if len(data) < 200 or skip >= (d.get("totalCount") or 0):
            break
    return out

def site_state():
    r = urllib.request.urlopen(urllib.request.Request(HEALTH_URL, headers={"Accept": "application/json"}), timeout=40)
    d = json.load(r)
    return d

def notify(title, msg):
    try:
        subprocess.run(["osascript", "-e", f'display notification "{msg}" with title "{title}"'], timeout=10)
    except Exception:
        pass

def main():
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    problems = []
    try:
        truth = esti_truth()
    except Exception as e:
        line = f"[{now}] BŁĄD API Esti: {e}"
        open(LOG, "a").write(line + "\n"); notify("Kontrola Starnawska — BŁĄD", f"API Esti nieosiągalne")
        print(line); return
    try:
        site = site_state()
    except Exception as e:
        line = f"[{now}] BŁĄD strony (health): {e}"
        open(LOG, "a").write(line + "\n"); notify("Kontrola Starnawska — BŁĄD", "Strona/health nieosiągalne")
        print(line); return

    site_nums = set(str(n) for n in site.get("numbers", []))
    truth_nums = set(truth.keys())
    missing = sorted(truth_nums - site_nums)   # w Esti aktywne, a NA STRONIE NIE MA (błąd Joli)
    extra = sorted(site_nums - truth_nums)     # na stronie, a nie w źródle (stale)

    # świeżość: lastSync z API jest ustawiany "teraz" — stary = fallback na snapshot
    stale = False
    try:
        ls = site.get("lastSync", "")
        dt = datetime.datetime.fromisoformat(ls.replace("Z", "+00:00"))
        age_min = (datetime.datetime.now(datetime.timezone.utc) - dt).total_seconds() / 60
        stale = age_min > 90
    except Exception:
        age_min = None

    if missing: problems.append(f"{len(missing)} ofert brak na stronie: {', '.join(missing[:6])}")
    if extra:   problems.append(f"{len(extra)} nadmiarowych na stronie: {', '.join(extra[:6])}")
    if stale:   problems.append("strona serwuje STARE dane (API padło→snapshot)")
    if not site.get("ok"): problems.append("health zwraca ok=false")

    status = "FAIL" if problems else "OK"
    summary = f"Esti {len(truth_nums)} / strona {len(site_nums)}"
    line = f"[{now}] {status} — {summary}" + (f" | {'; '.join(problems)}" if problems else " | zgadza się")
    open(LOG, "a").write(line + "\n")
    json.dump({"at": now, "status": status, "esti": len(truth_nums), "site": len(site_nums),
               "missing": missing, "extra": extra, "stale": stale},
              open(STATUS, "w"), ensure_ascii=False, indent=2)
    print(line)

    if problems:
        notify("⚠️ Kontrola Starnawska — PROBLEM", "; ".join(problems)[:180])
    else:
        notify("✅ Kontrola Starnawska OK", f"{summary}, wszystko się zgadza")

if __name__ == "__main__":
    main()
