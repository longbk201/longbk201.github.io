# AGENTS.md

## Cursor Cloud specific instructions

### Product

Multi-page static marketing site for **Full Great Bros** (FG'S AUTO · 富贵车房). No `package.json`, build step, test runner, or linter. HTML partials under `components/`, styles under `styles/`, ES modules under `scripts/`.

### Dev server (required)

Components load via `fetch()`, so **do not** open pages with `file://`. From the repository root:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080/HOMEPAGE/

Alternatives (`npx serve`, Live Server, etc.) are fine as long as ES modules are served with correct MIME types.

### Lint / test / build

None configured. There is nothing to run beyond serving static files.

### Entry points

| Role | Path |
|------|------|
| Root redirect | `index.html` → `/HOMEPAGE/` |
| Homepage shell | `HOMEPAGE/index.html` |
| Other pages | `FGSAUTO/`, `about/`, `contact/`, `mediagallery/` |
| Config | `scripts/config.js` (`window.FGS_CONFIG`) |
| Bootstrap | `scripts/app.js` → `load-components.js` + `scripts/modules/*` |

### Optional external deps

Google Fonts and Tabler Icons load from CDNs in page shells. The site works offline except for those assets and outbound social/map links.

### Gotchas

- Asset paths in config and markup should be root-absolute (`/assets/...`) so they work from any page depth.
- Root `/` redirects to `/HOMEPAGE/`; nav logo and Social hash links use `/HOMEPAGE/`.
- QR images: `assets/svg/rednoteQR.svg`, `assets/svg/tiktokQR.svg`.
