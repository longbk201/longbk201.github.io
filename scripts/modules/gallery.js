const DEFAULT_FGS_AUTO_URL = '/FGSAUTO/';
const DEFAULT_MEDIA_URL = '/mediagallery/';
const DEFAULT_MEDIA_BASE = '/assets/images/media-gallery/';

/** Bento slot shapes — mix portrait and landscape thumbnails */
const PREVIEW_SLOTS = [
  'slot-a',
  'slot-b',
  'slot-c',
  'slot-d',
  'slot-e',
  'slot-f',
  'slot-g',
  'slot-h',
  'slot-i',
  'slot-j',
];

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isExternalUrl(url) {
  return /^https?:\/\//i.test(url);
}

function createFgsAutoLink(url, className, innerHTML) {
  const link = document.createElement('a');
  link.className = className;
  link.href = url;
  if (isExternalUrl(url)) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  link.innerHTML = innerHTML;
  return link;
}

function createMediaLink(url, img) {
  const link = document.createElement('a');
  link.href = url;
  if (isExternalUrl(url)) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  link.appendChild(img);
  return link;
}

function shuffle(items) {
  const list = items.slice();
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function pickRandom(images) {
  return images[Math.floor(Math.random() * images.length)];
}

function mediaSrc(base, file) {
  return base + encodeURIComponent(file);
}

function pickUnique(images, count) {
  return shuffle(images).slice(0, Math.min(count, images.length));
}

function renderServiceCards(container, services, url, cardClass) {
  if (!container || !services?.length) return;

  container.replaceChildren(
    ...services.map((svc) => {
      const icon = svc.icon ? escapeHtml(svc.icon) : 'ti-tool';
      return createFgsAutoLink(
        url,
        cardClass,
        `<div class="fgsauto-service-icon"><i class="ti ${icon}"></i></div>
         <div class="fgsauto-service-name">${escapeHtml(svc.name)}</div>
         <p class="fgsauto-service-desc">${escapeHtml(svc.desc || '')}</p>
         <i class="ti ti-arrow-right fgsauto-service-arrow"></i>`
      );
    })
  );
}

export function initFgsAutoBlock(cfg) {
  const fgs = cfg?.fgsAuto || {};
  const url = fgs.url || DEFAULT_FGS_AUTO_URL;
  const services = cfg?.galleryServices || [];

  renderServiceCards(
    document.getElementById('fgsauto-services'),
    services,
    url,
    'fgsauto-service-card'
  );
}

export function initMediaPreview(mediaCfg) {
  const grid = document.getElementById('gallery-grid');
  if (!grid || !mediaCfg?.images?.length) return;

  const base = mediaCfg.basePath || DEFAULT_MEDIA_BASE;
  const url = mediaCfg.url || DEFAULT_MEDIA_URL;
  const count = mediaCfg.homePreviewCount || 10;
  const rotateMs = mediaCfg.homeRotateMs || mediaCfg.rotateMs || 8000;
  const files = pickUnique(mediaCfg.images, count);

  const cta = document.getElementById('media-preview-cta');
  if (cta) cta.href = url;

  grid.replaceChildren(
    ...files.map((file, index) => {
      const img = document.createElement('img');
      img.src = mediaSrc(base, file);
      img.alt = 'Full Great Media';
      img.loading = index < 4 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.dataset.file = file;

      const slotClass = PREVIEW_SLOTS[index] || 'slot-a';
      const link = createMediaLink(url, img);
      link.className = `media-preview-cell ${slotClass}`;
      return link;
    })
  );

  if (mediaCfg.images.length <= 1) return;

  window.setInterval(() => {
    const cells = grid.querySelectorAll('.media-preview-cell img');
    if (!cells.length) return;

    const img = cells[Math.floor(Math.random() * cells.length)];
    let nextFile = pickRandom(mediaCfg.images);
    if (mediaCfg.images.length > 1) {
      while (nextFile === img.dataset.file) {
        nextFile = pickRandom(mediaCfg.images);
      }
    }

    img.classList.add('is-fading');
    window.setTimeout(() => {
      img.src = mediaSrc(base, nextFile);
      img.dataset.file = nextFile;
      const done = () => {
        img.classList.remove('is-fading');
        img.removeEventListener('load', done);
      };
      img.addEventListener('load', done);
    }, 320);
  }, rotateMs);
}
