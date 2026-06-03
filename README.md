# Full Great Bros · 富贵兄弟

Static marketing site for **Full Great Bros** (富贵兄弟) — a Shenzhen-based brand spanning automotive service (**FG'S AUTO · 富贵车房**), media content, and social presence. Hosted on GitHub Pages at [fullgreatbros.com](https://fullgreatbros.com).

No build step, no framework. HTML partials load at runtime via `fetch()`, and each page is a thin shell that mounts shared components.

## Pages

| URL | Folder | Description |
|-----|--------|-------------|
| `/HOMEPAGE/` | `HOMEPAGE/` | Main landing — hero showcase, FG'S AUTO gallery block, stats, social |
| `/FGSAUTO/` | `FGSAUTO/` | FG'S AUTO service page |
| `/mediagallery/` | `mediagallery/` | Full photo gallery (114 images) |
| `/about/` | `about/` | About Full Great Bros |
| `/contact/` | `contact/` | Phone, location, directions |

The root `index.html` redirects visitors to `/HOMEPAGE/`.

## Project structure

```
longbk201.github.io/
├── index.html              # Redirect → /HOMEPAGE/
├── CNAME                   # fullgreatbros.com
├── HOMEPAGE/               # Main landing page
├── FGSAUTO/                # Auto shop page
├── about/
├── contact/
├── mediagallery/
├── components/             # HTML partials (one section per file)
├── styles/                 # CSS modules (imported by main.css)
├── scripts/
│   ├── config.js           # Content, social links, page manifest
│   ├── app.js              # Bootstrap entry point
│   ├── load-components.js
│   └── modules/            # social, gallery, video, scroll, …
└── assets/
    ├── images/
    │   ├── showcase/       # Homepage hero carousel slides
    │   ├── media-gallery/  # Full Great Media photos
    │   ├── gallery/        # FG'S AUTO grid images (optional)
    │   └── fullgreatbros/
    └── svg/                # Social icons + QR codes
```

## Quick start

Components are loaded with `fetch`, so serve over HTTP (not `file://`):

```bash
python3 -m http.server 8080
```

Open [http://localhost:8080/HOMEPAGE/](http://localhost:8080/HOMEPAGE/)

## Customize

**`scripts/config.js`** — phone, maps URL, social platforms, gallery items, media gallery image list, and per-page component manifests.

**`components/`** — section markup (`hero.html`, `gallery.html`, `social.html`, …).

**`styles/`** — section styles imported by `styles/main.css`.

### Social links

All platform URLs, tooltips, and QR images live in `config.js` → `social` array. UI is rendered by `scripts/modules/social.js` — do not hardcode links in HTML.

### Images

| Folder | Used by |
|--------|---------|
| `assets/images/showcase/` | Homepage hero carousel (`FULLGREATBROS.html`) |
| `assets/images/media-gallery/` | Media gallery page (`config.js` → `mediaGallery.images`) |
| `assets/images/gallery/` | FG'S AUTO grid on homepage (via `config.js` → `gallery`) |

## Deploy

Push to `main` on this repo. GitHub Pages serves the site automatically. ES modules require correct MIME types (standard on GitHub Pages). Custom domain is configured via `CNAME`.
