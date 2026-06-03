const DEFAULT_FGS_AUTO_URL = 'https://fullgreatbros.com/FGAUTO';
const GALLERY_BASE = '/assets/images/gallery/';

function resolveImageSrc(item) {
  if (item.src) return item.src;
  if (item.file) return GALLERY_BASE + item.file;
  return '';
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function createFgsAutoLink(url, className, innerHTML) {
  const link = document.createElement('a');
  link.className = className;
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.innerHTML = innerHTML;
  return link;
}

export function initGallery(items) {
  const cfg = window.FGS_CONFIG || {};
  const fgs = cfg.fgsAuto || {};
  const url = fgs.url || DEFAULT_FGS_AUTO_URL;
  const services = cfg.galleryServices || [];

  const logo = document.querySelector('.fgs-auto-logo');
  if (logo && fgs.logo) logo.src = fgs.logo;

  const tag = document.querySelector('.fgs-auto-section .sec-tag');
  if (tag && fgs.tag) tag.textContent = fgs.tag;

  const grid = document.getElementById('gallery-grid');
  if (grid && items?.length) {
    items.forEach((item, index) => {
      const src = resolveImageSrc(item);
      const iconMarkup = item.icon
        ? `<i class="ti ${escapeHtml(item.icon)} gallery-cell-icon"></i>`
        : '';

      const cell = createFgsAutoLink(
        url,
        'gallery-cell' + (item.tall ? ' tall' : ''),
        `<img src="${escapeHtml(src)}" alt="${escapeHtml(item.alt || item.label || '')}" loading="lazy" decoding="async" />
         <div class="gallery-cell-overlay">
           ${iconMarkup}
           <span class="gallery-cell-label">${escapeHtml(item.label || '')}</span>
           <span class="gallery-cell-go">View on FG'S AUTO <i class="ti ti-arrow-up-right"></i></span>
         </div>
         <div class="gallery-accent"></div>`
      );
      cell.dataset.index = String(index);
      grid.appendChild(cell);
    });
  }

  const servicesEl = document.getElementById('fgs-services');
  if (servicesEl && services.length) {
    services.forEach((svc) => {
      const card = createFgsAutoLink(
        url,
        'fgs-service-card',
        `<div class="fgs-service-icon"><i class="ti ${escapeHtml(svc.icon)}"></i></div>
         <div class="fgs-service-name">${escapeHtml(svc.name)}</div>
         <p class="fgs-service-desc">${escapeHtml(svc.desc)}</p>
         <i class="ti ti-arrow-right fgs-service-arrow"></i>`
      );
      servicesEl.appendChild(card);
    });
  }

  const cta = document.querySelector('.fgs-auto-cta');
  if (cta) cta.href = url;
}

/** Alias used by app.js */
export function initFgsAuto(cfg) {
  initGallery(cfg?.gallery);
}
