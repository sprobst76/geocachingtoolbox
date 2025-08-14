# GCC Web – Geocache Calculator (PWA)

Modulare, komplett client-seitige Geocaching-Tools als Progressive Web App (GitHub Pages ready).

## Schnellstart
1. **Dieses Repo auf GitHub** anlegen und Dateien pushen oder die ZIP hochladen.
2. **GitHub Pages aktivieren**: Repository → Settings → Pages → Build and deployment → *GitHub Actions*.
3. Auf `main` pushen; die mitgelieferte Workflow-Datei (`.github/workflows/pages.yml`) deployt automatisch.

## Lokal testen
Ein einfacher Static Server ist ausreichend z. B. mit Python:
```bash
python -m http.server 8000
# dann http://localhost:8000 aufrufen
```

## Struktur
```
/ (root)
  index.html
  /pwa
    manifest.webmanifest
    sw.js
  /src
    /core
      app.js
      registry.js
      style.css
    /plugins
      cipher.atbash.js
      cipher.caesar.js
  /.github/workflows/pages.yml
```

## Icons
Lege zwei Icons ab (PNG):
- `icons/icon-192.png`
- `icons/icon-512.png`

Diese sind bereits im Manifest referenziert. Platzhalter-Dateien kannst du mit beliebigem Inhalt ersetzen.
