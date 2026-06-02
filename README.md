# FG'S AUTO · 富贵车房

Modular static marketing site for FG's Auto in Shenzhen.

## Project structure

```
fgs-auto-website/
├── index.html              # Shell + component mount points
├── components/             # HTML partials (one section per file)
│   ├── nav.html
│   ├── video.html
│   ├── hero.html
│   ├── stats.html
│   ├── gallery.html
│   ├── services.html
│   ├── about.html
│   ├── social.html
│   ├── contact.html
│   └── footer.html
├── styles/                 # CSS modules (imported by main.css)
│   ├── main.css
│   ├── base.css
│   ├── hero.css
│   ├── services.css
│   ├── about.css
│   ├── contact.css
│   ├── footer.css
│   └── …
├── scripts/
│   ├── config.js           # Content + component manifest
│   ├── app.js              # Entry point
│   ├── load-components.js
│   └── modules/
│       ├── apply-config.js
│       ├── video.js
│       ├── gallery.js
│       └── scroll.js
└── assets/
    ├── images/
    │   ├── FGSAUTOLOGO.svg
    │   └── gallery/
    └── svg/
        └── video-bg-pattern.svg
```

## Quick start

Components are loaded with `fetch`, so serve over HTTP:

```bash
cd fgs-auto-website
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080).

## Customize

Edit **`scripts/config.js`** for phone, maps, social platforms (`social` array), gallery filenames, and the component load order. Social UI is built by **`scripts/modules/social.js`** — do not hardcode links in HTML.

Edit section markup in **`components/`** (e.g. `hero.html`, `services.html`).

Edit section styles in matching files under **`styles/`**.

### Gallery images

Place photos in `assets/images/gallery/`:

- `shop-floor.jpg`
- `oil-change.jpg`
- `tire-service.jpg`
- `brakes.jpg`
- `before-after.jpg`

## Deploy

Upload the full project root to any static host. No build step required. ES modules must be served with correct MIME types (standard on Netlify, GitHub Pages, Cloudflare Pages).
