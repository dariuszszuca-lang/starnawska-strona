#!/usr/bin/env python3
"""
Monitor spójności ofert: EstiCRM (źródło prawdy) kontra starnawska.pl (co widzi klient).

Alarmuje mailem, gdy:
  1. oferta aktywna publikowana w Esti nie jest widoczna na stronie,
  2. na stronie wisi oferta, której w Esti już nie ma (np. sprzedana),
  3. oferta siedzi w Esti jako "aktywna wewnętrznie" (status 99) dłużej niż PROG_DNI
     — typowy przypadek "agentka dodała, ale nie opublikowała",
  4. strona albo API nie odpowiadają.

Cisza = wszystko się zgadza. Read-only, niczego nie zmienia.
Uruchamiany przez launchd raz dziennie (com.starnawska.monitor-ofert).
"""
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta

PROG_DNI_WEWNETRZNE = 3          # ile dni oferta może być "wewnętrzna", zanim to zgłosimy
STRONA = "https://starnawska.pl/oferty"
TIMEOUT = 45
ODBIORCY = ["dariusz.szuca@gmail.com"]


def wczytaj(sciezka, klucz):
    try:
        with open(os.path.expanduser(sciezka), encoding="utf-8") as f:
            for linia in f:
                linia = linia.strip()
                if linia.startswith(klucz + "="):
                    return linia.split("=", 1)[1].strip().strip('"').strip("'")
    except OSError:
        pass
    return ""


def oferty_z_esti(company, token, status):
    q = urllib.parse.urlencode({"company": company, "token": token, "status": status, "take": 300})
    url = f"https://app.esticrm.pl/apiClient/offer/list?{q}"
    with urllib.request.urlopen(url, timeout=TIMEOUT) as r:
        return json.load(r).get("data", [])


def id_ze_strony():
    req = urllib.request.Request(STRONA, headers={"User-Agent": "starnawska-monitor/1.0"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        html = r.read().decode("utf-8", "ignore")
    return set(re.findall(r"/oferty/(\d+)", html))


def wyslij_alert(temat, tresc):
    klucz = wczytaj("~/.secrets/ai-team-lead-email.env", "RESEND_API_KEY")
    nadawca = wczytaj("~/.secrets/ai-team-lead-email.env", "LEAD_EMAIL_FROM") or "AI-Team <onboarding@resend.dev>"
    if not klucz:
        print("BRAK klucza Resend — alert tylko na konsoli")
        return
    payload = json.dumps({"from": nadawca, "to": ODBIORCY, "subject": temat, "text": tresc}).encode()
    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=payload,
        headers={
            "Authorization": "Bearer " + klucz,
            "Content-Type": "application/json",
            "User-Agent": "starnawska-monitor/1.0",   # bez tego Cloudflare zwraca 403
            "Accept": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            print("Alert wysłany:", r.status)
    except urllib.error.HTTPError as e:
        print("Błąd Resend:", e.code, e.read().decode("utf-8", "ignore")[:200])


def main():
    company = wczytaj("~/.secrets/starnawska-esti.env", "ESTI_API_COMPANY")
    token = wczytaj("~/.secrets/starnawska-esti.env", "ESTI_API_TOKEN")
    if not (company and token):
        wyslij_alert("Monitor ofert: brak konfiguracji", "Nie znaleziono ESTI_API_COMPANY/ESTI_API_TOKEN w ~/.secrets/starnawska-esti.env")
        sys.exit(1)

    problemy = []

    # 1. Esti kontra strona
    try:
        aktywne = oferty_z_esti(company, token, "3")
    except Exception as e:
        wyslij_alert("Monitor ofert: API EstiCRM nie odpowiada", f"{type(e).__name__}: {e}")
        sys.exit(1)

    try:
        na_stronie = id_ze_strony()
    except Exception as e:
        wyslij_alert("Monitor ofert: strona nie odpowiada", f"{STRONA}\n{type(e).__name__}: {e}")
        sys.exit(1)

    id_esti = {str(o.get("id")): o for o in aktywne}

    brakuje = [o for i, o in id_esti.items() if i not in na_stronie]
    for o in brakuje:
        problemy.append(
            f"NIE MA NA STRONIE: {o.get('number')} — {o.get('locationCityName','')} "
            f"{o.get('locationStreetType','')} {o.get('locationStreetName','')} "
            f"(dodana {str(o.get('addDate',''))[:10]}, id {o.get('id')})"
        )

    zbedne = na_stronie - set(id_esti)
    for i in sorted(zbedne):
        problemy.append(f"WISI NA STRONIE, A NIE MA W ESTI: id {i} — https://starnawska.pl/oferty/{i}")

    # 2. Oferty zawieszone jako wewnętrzne
    try:
        wszystkie = oferty_z_esti(company, token, "3,99")
        prog = datetime.now() - timedelta(days=PROG_DNI_WEWNETRZNE)
        for o in wszystkie:
            if o.get("status") != 99:
                continue
            dodana = str(o.get("addDate") or "")[:19]
            if not dodana:
                continue
            try:
                kiedy = datetime.strptime(dodana, "%Y-%m-%d %H:%M:%S")
            except ValueError:
                continue
            if kiedy < prog:
                continue  # stara wewnętrzna = świadomie schowana, nie zawracamy głowy
            gdzie = " ".join(x for x in [o.get("locationCityName"), o.get("locationStreetName")] if x)
            problemy.append(
                f"AKTYWNA WEWNĘTRZNIE (nie trafi na stronę): {o.get('number')} — "
                f"{gdzie} (dodana {dodana[:10]})"
            )
    except Exception as e:
        problemy.append(f"Nie udało się sprawdzić ofert wewnętrznych: {type(e).__name__}")

    stempel = datetime.now().strftime("%d.%m.%Y %H:%M")
    print(f"[{stempel}] Esti aktywnych: {len(id_esti)} | na stronie: {len(na_stronie)} | problemów: {len(problemy)}")

    if not problemy:
        return  # cisza znaczy porządek

    tresc = (
        f"Monitor ofert starnawska.pl — {stempel}\n\n"
        f"Aktywnych w EstiCRM: {len(id_esti)}\nWidocznych na stronie: {len(na_stronie)}\n\n"
        "DO SPRAWDZENIA:\n" + "\n".join(f"  • {p}" for p in problemy) +
        "\n\nCo zwykle to znaczy:\n"
        "  - 'NIE MA NA STRONIE' albo 'AKTYWNA WEWNĘTRZNIE' → w EstiCRM oferta nie jest ustawiona\n"
        "    jako aktywna publikowana z eksportem. Poprawka po stronie CRM, strona zaciągnie ją do godziny.\n"
        "  - 'WISI NA STRONIE' → oferta zniknęła z Esti, a strona jeszcze jej nie odświeżyła (do godziny).\n"
        "    Jeśli utrzymuje się dłużej, to problem po stronie strony.\n"
    )
    wyslij_alert(f"Oferty starnawska.pl: {len(problemy)} rzeczy do sprawdzenia", tresc)


if __name__ == "__main__":
    main()
