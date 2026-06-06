import {
  normalizeCollections,
  collectionBase,
  imageSrc,
} from './modules/media-collections.js';
import { initFgmediaLogo } from './modules/fgmedia-logo.js';

function openLightbox(src, alt) {
  const existing = document.getElementById('media-lightbox');
  existing?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'media-lightbox';
  overlay.className = 'media-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Full size image');

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'media-lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&times;';

  const img = document.createElement('img');
  img.className = 'media-lightbox-img';
  img.src = src;
  img.alt = alt;

  overlay.append(closeBtn, img);
  document.body.appendChild(overlay);
  document.body.classList.add('lightbox-open');
  closeBtn.focus();

  const close = () => {
    overlay.remove();
    document.body.classList.remove('lightbox-open');
    document.removeEventListener('keydown', onKey);
  };

  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', onKey);
}

function buildGridItem(base, file, index) {
  const item = document.createElement('figure');
  item.className = 'media-gallery-item';
  item.tabIndex = 0;
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', 'View fullsize — image ' + (index + 1));

  const img = document.createElement('img');
  img.alt = '';
  img.decoding = 'async';
  img.loading = index < 16 ? 'eager' : 'lazy';
  img.src = imageSrc(base, file);

  const label = document.createElement('span');
  label.className = 'media-gallery-view';
  label.textContent = 'View fullsize';

  const open = () => openLightbox(img.src, img.alt || 'Full Great Bros media');
  item.addEventListener('click', open);
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });

  item.append(img, label);
  return item;
}

function parseCollectionHash() {
  const raw = (window.location.hash || '').replace(/^#/, '').trim();
  return raw || null;
}

export function initMediaGalleryPage(mediaCfg) {
  const collections = normalizeCollections(mediaCfg);
  if (!collections.length) return;

  initFgmediaLogo();

  const nav = document.getElementById('media-collections');
  const grid = document.getElementById('media-gallery-grid');
  const gridEmpty = document.getElementById('media-gallery-empty');

  let activeId = collections[0].id;

  function getCollection(id) {
    return collections.find((c) => c.id === id) || collections[0];
  }

  function renderGrid(collection) {
    if (!grid) return;
    grid.replaceChildren();

    if (!collection.images?.length) {
      gridEmpty?.removeAttribute('hidden');
      return;
    }

    gridEmpty?.setAttribute('hidden', '');
    const fragment = document.createDocumentFragment();
    const base = collectionBase(mediaCfg, collection);
    collection.images.forEach((file, index) => {
      fragment.appendChild(buildGridItem(base, file, index));
    });
    grid.appendChild(fragment);
  }

  function setCollection(id) {
    const collection = getCollection(id);
    activeId = collection.id;

    nav?.querySelectorAll('.media-collection').forEach((btn) => {
      const isActive = btn.dataset.collection === id;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    document.title = collection.label + ' · FULL GREAT MEDIA · Full Great Bros';
    history.replaceState(null, '', '#' + id);
    renderGrid(collection);
  }

  collections.forEach((col, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'media-collection';
    btn.dataset.collection = col.id;
    btn.textContent = col.label;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    if (i === 0) btn.classList.add('is-active');
    btn.addEventListener('click', () => setCollection(col.id));
    nav?.appendChild(btn);
  });

  window.addEventListener('hashchange', () => {
    const hashId = parseCollectionHash();
    if (hashId && collections.some((c) => c.id === hashId)) {
      setCollection(hashId);
    }
  });

  const hashId = parseCollectionHash();
  setCollection(hashId && collections.some((c) => c.id === hashId) ? hashId : activeId);
}
