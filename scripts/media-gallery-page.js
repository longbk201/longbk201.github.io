const DEFAULT_BASE = '/assets/images/media-gallery/';

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

function imageSrc(base, file) {
  return base + encodeURIComponent(file);
}

function initShowcase(mediaCfg) {
  const slides = document.getElementById('media-showcase-slides');
  const titleEl = document.querySelector('.media-showcase-title');
  if (!slides || !mediaCfg?.images?.length) return;

  if (titleEl && mediaCfg.showcaseTitle) {
    titleEl.textContent = mediaCfg.showcaseTitle;
  }

  const base = mediaCfg.basePath || DEFAULT_BASE;
  const intervalMs = mediaCfg.showcaseRotateMs || mediaCfg.rotateMs || 5000;

  const imgA = document.createElement('img');
  const imgB = document.createElement('img');
  imgA.className = 'media-showcase-slide is-active';
  imgB.className = 'media-showcase-slide';
  imgA.alt = '';
  imgB.alt = '';
  imgA.decoding = 'async';
  imgB.decoding = 'async';
  slides.append(imgA, imgB);

  let active = imgA;
  let inactive = imgB;
  let currentFile = pickRandom(mediaCfg.images);

  active.src = imageSrc(base, currentFile);

  window.setInterval(() => {
    let nextFile = pickRandom(mediaCfg.images);
    if (mediaCfg.images.length > 1) {
      while (nextFile === currentFile) nextFile = pickRandom(mediaCfg.images);
    }
    currentFile = nextFile;

    inactive.src = imageSrc(base, nextFile);
    inactive.classList.add('is-active');
    active.classList.remove('is-active');
    [active, inactive] = [inactive, active];
  }, intervalMs);
}

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

export function initMediaGalleryPage(mediaCfg) {
  initShowcase(mediaCfg);

  const grid = document.getElementById('media-gallery-grid');
  if (!grid || !mediaCfg?.images?.length) return;

  const base = mediaCfg.basePath || DEFAULT_BASE;
  const fragment = document.createDocumentFragment();

  mediaCfg.images.forEach((file, index) => {
    const item = document.createElement('figure');
    item.className = 'media-gallery-item gallery-spotlight-item';
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'View full size image ' + (index + 1));

    const img = document.createElement('img');
    img.alt = 'Full Great Bros media ' + (index + 1);
    img.decoding = 'async';
    img.loading = index < 12 ? 'eager' : 'lazy';
    img.src = imageSrc(base, file);

    const open = () => openLightbox(img.src, img.alt);
    item.addEventListener('click', open);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });

    item.appendChild(img);
    fragment.appendChild(item);
  });

  grid.appendChild(fragment);
}
