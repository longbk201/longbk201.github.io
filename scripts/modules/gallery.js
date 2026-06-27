import {
  normalizeCollections,
  pickCollectionThumbnail,
  buildCollectionCard,
  pickRandom,
  imageSrc,
  collectionBase,
} from './media-collections.js';
import { renderFgsAutoCaseServices } from './fgsauto-cases.js';

const DEFAULT_FGS_AUTO_URL = '/FGSAUTO/';
const DEFAULT_MEDIA_URL = '/mediagallery/';

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
  const container = document.getElementById('fgsauto-services');
  if (renderFgsAutoCaseServices(container, cfg?.fgsAutoCases)) return;

  const fgs = cfg?.fgsAuto || {};
  const url = fgs.url || DEFAULT_FGS_AUTO_URL;
  const services = cfg?.galleryServices || [];

  renderServiceCards(container, services, url, 'fgsauto-service-card');
}

/** Homepage: 3× 3:4 collection cards, rotating images, geometric hover wipe. */
export function initMediaPreview(mediaCfg) {
  const grid = document.getElementById('gallery-grid');
  const collections = normalizeCollections(mediaCfg);
  if (!grid || !collections.length) return;

  const baseUrl = mediaCfg.url || DEFAULT_MEDIA_URL;
  const rotateMs = mediaCfg.homeRotateMs || mediaCfg.rotateMs || 8000;
  const cta = document.getElementById('media-preview-cta');
  if (cta) cta.href = baseUrl;

  const thumbCache = {};
  const fragment = document.createDocumentFragment();
  const rotateMeta = [];

  collections.forEach((col) => {
    const thumb = pickCollectionThumbnail(mediaCfg, col, thumbCache);
    if (!thumb) return;
    const card = buildCollectionCard(thumb, {
      href: baseUrl.replace(/\/?$/, '/') + '#' + col.id,
      variant: 'home',
    });
    fragment.appendChild(card);
    if (col.images?.length > 1) {
      rotateMeta.push({
        img: card.querySelector('.media-collection-card__img'),
        images: col.images,
        base: collectionBase(mediaCfg, col),
      });
    }
  });

  grid.appendChild(fragment);

  if (!rotateMeta.length) return;

  window.setInterval(() => {
    rotateMeta.forEach(({ img, images, base }) => {
      if (!img) return;
      let next = pickRandom(images);
      if (images.length > 1) {
        while (next === img.dataset.file) next = pickRandom(images);
      }
      img.classList.add('is-fading');
      window.setTimeout(() => {
        img.src = imageSrc(base, next);
        img.dataset.file = next;
        const done = () => {
          img.classList.remove('is-fading');
          img.removeEventListener('load', done);
        };
        img.addEventListener('load', done);
      }, 320);
    });
  }, rotateMs);
}
