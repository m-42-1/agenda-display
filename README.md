# Outlook Agenda Display

Jednoduchá statická HTML stránka pre zobrazenie kalendárovej agendy z Outlook 365 ICS feedu. Určená pre kiosk displej (Android telefón v Fully Kiosk Browser).

## Funkcie

- Agenda view na 3 mesiace dopredu
- Slovenské názvy dní a mesiacov
- Automatická aktualizácia každú minútu (bez reloadu stránky), pri výpadku každých 15 sekúnd
- Digitálne hodiny v hlavičke (aktualizácia každú sekundu)
- ICS feed sa načítava cez vlastný Cloudflare Worker (Outlook neposiela CORS hlavičky)
- Pri výpadku siete ostávajú zobrazené posledné načítané dáta s odznakom „⚠ Offline · údaje z HH:MM"
- Správna konverzia časov z UTC do Europe/Bratislava (vrátane letného času)

## Deploy na GitHub Pages

### Prerekvizity
- GitHub účet
- Verejný (public) GitHub repozitár

### Kroky

1. Vytvorte nový **public** repozitár na GitHub (napr. `agenda-display`)

2. Nahrajte súbor `index.html` do repozitára:
   ```bash
   git init
   git add index.html
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VASE_MENO/agenda-display.git
   git push -u origin main
   ```

3. V repozitári na GitHub otvorte **Settings → Pages**

4. V sekcii **Source** vyberte vetvu `main` a priečinok `/ (root)`, kliknite **Save**

5. Počkajte 1–2 minúty, potom stránka bude dostupná na:
   ```
   https://VASE_MENO.github.io/agenda-display/
   ```

## Nastavenie Fully Kiosk Browser

1. Nainštalujte **Fully Kiosk Browser** z Google Play
2. Otvorte nastavenia → **Start URL** → zadajte URL vašej GitHub Pages stránky
3. Odporúčané nastavenia:
   - **Screen Orientation**: Portrait
   - **Keep Screen On**: zapnuté
   - **Reload on Idle**: vypnuté (stránka sa sama refreshuje)
   - **Allow JavaScript**: zapnuté (povinné)

## Cloudflare Worker (proxy pre ICS feed)

Outlook publikuje ICS feed bez `Access-Control-Allow-Origin`, takže ho prehliadač nevie načítať priamo. Verejné CORS proxy (corsproxy.io, allorigins) prestali fungovať, preto feed ide cez vlastný Worker: `https://agenda-ics.matuskoprda.workers.dev` (Cloudflare účet matuskoprda@gmail.com, free plán).

Zdrojový kód Workera je v `worker/calendar-proxy.js`. Worker vracia iba jeden pevne nastavený kalendár, takže ho nie je možné zneužiť ako otvorený proxy.

Úprava Workera: dash.cloudflare.com → **Workers & Pages** → `agenda-ics` → **Edit code** → vložiť obsah `worker/calendar-proxy.js` → **Deploy**.

## Zmena ICS feedu

ICS URL je iba vo Workeri. V `worker/calendar-proxy.js` zmeňte konštantu `ICS_URL` a Worker znova nasaďte (postup vyššie). V `index.html` sa nič nemení. `FEED_URL` v ňom ukazuje na Worker.

Ak by sa zmenila doména stránky, doplňte ju do `ALLOWED_ORIGINS` vo Workeri.
