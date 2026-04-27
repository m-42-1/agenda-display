# Outlook Agenda Display

Jednoduchá statická HTML stránka pre zobrazenie kalendárovej agendy z Outlook 365 ICS feedu. Určená pre kiosk displej (Android telefón v Fully Kiosk Browser).

## Funkcie

- Agenda view na 3 mesiace dopredu
- Slovenské názvy dní a mesiacov
- Automatická aktualizácia každých 15 minút (bez reloadu stránky)
- Digitálne hodiny v hlavičke (aktualizácia každú sekundu)
- Automatický CORS proxy fallback pre načítanie ICS feedu
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

## Zmena ICS feedu

V súbore `index.html` nájdite riadok:
```javascript
const ICS_URL = 'https://outlook.office365.com/...';
```
a nahraďte URL vaším ICS feedom z Outlook kalendára.
