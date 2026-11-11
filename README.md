# Mapa měst ČR (Leaflet + GeoJSON)

Jednoduchá webová mapa, která zobrazuje města České republiky z GeoJSON souboru pomocí knihovny [Leaflet](https://leafletjs.com/).

## Struktura projektu

```
mapa-mest/
├── index.html     – hlavní stránka, načítá Leaflet, styl a skript
├── map.js         – inicializace mapy a načtení bodů z GeoJSONu
├── styl.css       – vzhled stránky a vyskakovacích oken
├── body.geojson   – data měst (body)
└── README.md      – tento soubor
```

## Data (body.geojson)

Každé město je bod (`Point`) s atributy:

| Atribut   | Typ    | Popis                     |
|-----------|--------|---------------------------|
| `id`      | číslo  | jednoznačný identifikátor |
| `nazev`   | text   | název města               |
| `popisek` | text   | krátký popis města        |

Aktuálně obsahuje: **Praha**, **Olomouc**.

> Pozor: v GeoJSONu se souřadnice zapisují v pořadí **[zeměpisná délka, zeměpisná šířka]** (tj. lon, lat), v Leafletu u `setView` naopak [lat, lon].

### Přidání dalšího města

Do pole `features` v `body.geojson` přidej další objekt, např.:

```json
{
  "type": "Feature",
  "properties": {
    "id": 3,
    "nazev": "Brno",
    "popisek": "Druhé největší město ČR."
  },
  "geometry": {
    "type": "Point",
    "coordinates": [16.6068, 49.1951]
  }
}
```

Nezapomeň na čárku mezi jednotlivými objekty.

## Spuštění

Soubor `body.geojson` se načítá přes `fetch()`, takže **stránku nestačí otevřít dvojklikem** (prohlížeč blokuje načítání lokálních souborů přes `file://`). Je potřeba ji spustit přes lokální server, např.:

- **VS Code** – rozšíření *Live Server* → pravým tlačítkem na `index.html` → *Open with Live Server*
- **Python** – ve složce projektu spusť:
  ```
  python -m http.server 8000
  ```
  a otevři http://localhost:8000

## Použité technologie

- Leaflet 1.9.4 (načítán z CDN unpkg)
- Podkladová mapa OpenStreetMap
