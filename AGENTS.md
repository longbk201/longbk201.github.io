# AGENTS.md

## Cursor Cloud specific instructions

### Product

Single static marketing site (FG'S AUTO / Full Great Bros). No `package.json`, build step, test runner, or linter. All content is HTML partials under `components/`, styles under `styles/`, and ES modules under `scripts/`.

### Dev server (required)

Components load via `fetch()`, so **do not** open `index.html` with `file://`. From the repository root (`/workspace`, not a `fgs-auto-website/` subfolder):

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

Alternatives (`npx serve`, Live Server, etc.) are fine as long as ES modules are served with correct MIME types.

### Lint / test / build

None configured. There is nothing to run beyond serving static files.

### Entry points

| Role | Path |
|------|------|
| Shell page | `index.html` |
| Config | `scripts/config.js` (`window.FGS_CONFIG`) |
| Bootstrap | `scripts/app.js` → `load-components.js` + `scripts/modules/*` |

### Optional external deps

Google Fonts and Tabler Icons load from CDNs in `index.html`. The site works offline except for those assets and outbound social/map links.

### Gotchas

- README `cd fgs-auto-website` is outdated; the repo root **is** the site.
- Nav/hero links use `#fgs-auto`, but no element with `id="fgs-auto"` exists yet.
- QR images referenced in `scripts/config.js` (`rednoteQR.svg`, `tiktokQR.svg`) may be missing from `assets/svg/`.
- Legacy monolithic `main.js` is not loaded by `index.html`; use the modular `scripts/app.js` path.
