# Site data files (Phase 0)

Structured JSON mirrors of editable site content. **Not yet loaded at runtime** — the live site still reads [`scripts/config.js`](../scripts/config.js) and HTML partials.

When editing JSON files during Phase 0, keep `config.js` / HTML in sync manually until Phase 1 wiring lands.

## Section ownership

| File | Section | What it controls |
|------|---------|------------------|
| [`brand.json`](brand.json) | **Full Great Bros** | About page — hero, intro, chapters, values, closing |
| [`cases.json`](cases.json) | **FG'S AUTO** | Shop brand, service cards (oil, brakes, tires), future case studies |
| [`racing.json`](racing.json) | **FG RACING DEPT.** | Showcase images, station label, rotation timings |
| [`gallery.json`](gallery.json) | **FULL GREAT MEDIA** | Photo collections (GTR, BRZ, MINI), gallery settings |
| [`contact.json`](contact.json) | Site-wide | Phone, WhatsApp, email, WeChat, address, shop hours |
| [`navigation.json`](navigation.json) | Site-wide | Logo, nav links, Book Now CTA |

## Schemas (summary)

### `brand.json`

```json
{
  "section": "Full Great Bros",
  "url": "/about/",
  "hero": { "tag", "titleEn", "titleZh", "tagline" },
  "intro": { "paragraphs": [], "lead": "" },
  "chapters": [{ "id", "number", "title", "subtitle", "paragraphs" }],
  "closing": { "lines": [], "brand": "" }
}
```

Chapter `04` uses `"type": "values"` with a `values` array instead of `paragraphs`.

### `cases.json`

```json
{
  "section": "FG'S AUTO",
  "brand": { "url", "logo", "tag" },
  "services": [{ "id", "name", "desc", "icon", "badge" }],
  "cases": []
}
```

Future case study entry:

```json
{
  "id": "case-001",
  "title": "...",
  "serviceId": "oil",
  "image": "/assets/images/...",
  "summary": "...",
  "href": "/FGSAUTO/"
}
```

### `racing.json`

Mirrors `config.racing`: `url`, `basePath`, `stationLabel`, `tag`, timing fields, `images[]`.

**Sync note:** Homepage hero slides in [`components/FULLGREATBROS.html`](../components/FULLGREATBROS.html) are still hardcoded — keep in sync with `racing.json` images until Phase 2.

### `gallery.json`

Mirrors `config.mediaGallery`: collections with `id`, `label`, `basePath`, `images[]`. Top-level `images` kept for parity with deprecated config field.

### `contact.json`

Mirrors contact block in `config.js`: `phone`, `whatsapp`, `email`, `wechat`, `location`, `hours`.

### `navigation.json`

Mirrors [`components/site-nav.html`](../components/site-nav.html) and the hero nav in [`components/FULLGREATBROS.html`](../components/FULLGREATBROS.html).

## GitHub Pages

Files are served statically at `/data/*.json` once committed. No build step required.

## Phase 1 (planned)

- Add `scripts/load-data.js` to `fetch()` these files and merge into `FGS_CONFIG`
- On fetch failure: warn and fall back to `config.js` (site must keep working)
- No removal of HTML fallbacks until loader is proven stable

## Verification

```bash
python3 -m json.tool data/gallery.json > /dev/null
# GTR collection should have 121 images
python3 -c "import json; d=json.load(open('data/gallery.json')); print(len(d['collections'][0]['images']))"
```
