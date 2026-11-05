# Köln Wochenende

Plan-App für das Wochenende vom 6. bis 8. November 2026 in Köln.

- `index.html`: die App
- `data.json`: der ganze Plan (Zeitplan, Ideen, offene Fragen, Nachrichten an Claude)
- `icon-180.png`: Symbol für den Home-Bildschirm

## Nutzung

**Ansehen (alle):** Die GitHub-Pages-Adresse öffnen. Es ist keine Anmeldung nötig. Auf dem iPhone über Teilen → „Zum Home-Bildschirm“ hinzufügen.

**Bearbeiten (nur der Planer):** In der App auf „Bearbeiten“ tippen und einen GitHub-Token einfügen. Dafür einen Fine-grained Token anlegen, nur für dieses Repo, mit der Berechtigung „Contents: Read and write“. Der Token bleibt nur auf dem eigenen Gerät gespeichert. Jede Änderung wird als Commit in `data.json` gespeichert.

## Einrichten

Settings → Pages → Source: „Deploy from a branch“, Branch `main`, Ordner `/ (root)`.
