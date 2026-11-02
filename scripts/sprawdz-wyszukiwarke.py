#!/usr/bin/env python3
"""
Strażnik wyszukiwarki: każda aktywna oferta z Esti musi dać się znaleźć tak, jak szuka człowiek.

Dla każdej pary miasto + dzielnica sprawdza na żywej stronie:
  - miasto i dzielnica w osobnych polach,
  - miasto i dzielnica razem w polu Miasto,
  - to samo bez polskich znaków,
  - sama nazwa miasta nie zwraca ofert spoza tego miasta.

Wypisuje linie "ZLE ...", kod 1 gdy coś nie działa. Read-only.
Użycie: sprawdz-wyszukiwarke.py [adres strony]
"""
import os
import re
import sys
import time
import unicodedata
import urllib.parse
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from monitor_ofert import TIMEOUT, oferty_z_esti, wczytaj

STRONA = "https://www.starnawska.pl"


def bez_znakow(tekst):
    tekst = (tekst or "").lower().replace("ł", "l")
    return "".join(z for z in unicodedata.normalize("NFD", tekst) if not unicodedata.combining(z))


def znalezione(baza, **pola):
    adres = f"{baza}/oferty?{urllib.parse.urlencode(pola)}"
    req = urllib.request.Request(adres, headers={"User-Agent": "starnawska-monitor/1.0"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        html = r.read().decode("utf-8", "ignore")
    time.sleep(0.3)
    return set(re.findall(r'href="/oferty/(\d+)"', html))


def main():
    baza = (sys.argv[1] if len(sys.argv) > 1 else STRONA).rstrip("/")
    company = wczytaj("~/.secrets/starnawska-esti.env", "ESTI_API_COMPANY")
    token = wczytaj("~/.secrets/starnawska-esti.env", "ESTI_API_TOKEN")
    oferty = oferty_z_esti(company, token, "3")
    zle = []
    miasta = {}
    sprawdzone = 0

    for o in oferty:
        miasto = o.get("locationCityName") or ""
        dzielnica = o.get("locationPrecinctName") or ""
        if not miasto:
            continue
        miasta.setdefault(miasto, set()).add(str(o["id"]))
        if not dzielnica or dzielnica == miasto:
            continue
        for pola in (
            {"miasto": miasto, "dzielnica": dzielnica},
            {"miasto": f"{miasto} {dzielnica}"},
            {"miasto": bez_znakow(f"{miasto} {dzielnica}")},
        ):
            sprawdzone += 1
            if str(o["id"]) not in znalezione(baza, **pola):
                zle.append(f"{o.get('number')} nie znaleziona przez {pola}")

    for miasto, swoje in miasta.items():
        cudze = znalezione(baza, miasto=miasto) - swoje
        # Oferta z innego miasta jest OK tylko wtedy, gdy nazwa szukanego miasta jest w jej dzielnicy albo mieście.
        for i in sorted(cudze):
            o = next((x for x in oferty if str(x["id"]) == i), None)
            gdzie = bez_znakow(f"{o.get('locationCityName')} {o.get('locationPrecinctName')}") if o else ""
            if bez_znakow(miasto) not in gdzie.split():
                zle.append(f"szukanie miasta {miasto} pokazuje obcą ofertę {i}")

    if sprawdzone == 0:
        zle.append("nie sprawdzono żadnej oferty, Esti nie podaje dzielnic pod oczekiwaną nazwą pola")
    for linia in zle:
        print("ZLE", linia)
    print(f"Ofert: {len(oferty)} | wyszukiwań: {sprawdzone} | błędów: {len(zle)}")
    sys.exit(1 if zle else 0)


if __name__ == "__main__":
    main()
