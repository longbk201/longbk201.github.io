const DEFAULT_BASE = '/assets/images/showcase/';

function pickRandom(images) {
  return images[Math.floor(Math.random() * images.length)];
}

function imageSrc(base, file) {
  return base + encodeURIComponent(file);
}

function initShowcase(racingCfg) {
  const slides = document.getElementById('racing-showcase-slides');
  const stationEl = document.getElementById('racing-page-station');
  if (!slides || !racingCfg?.images?.length) return;

  if (stationEl && racingCfg.stationLabel) {
    stationEl.textContent = racingCfg.stationLabel;
  }

  const base = racingCfg.basePath || DEFAULT_BASE;
  const intervalMs = racingCfg.showcaseRotateMs || 4500;

  const imgA = document.createElement('img');
  const imgB = document.createElement('img');
  imgA.className = 'racing-showcase-slide is-active';
  imgB.className = 'racing-showcase-slide';
  imgA.alt = '';
  imgB.alt = '';
  imgA.decoding = 'async';
  imgB.decoding = 'async';
  slides.append(imgA, imgB);

  let active = imgA;
  let inactive = imgB;
  let currentFile = pickRandom(racingCfg.images);

  active.src = imageSrc(base, currentFile);

  window.setInterval(() => {
    let nextFile = pickRandom(racingCfg.images);
    if (racingCfg.images.length > 1) {
      while (nextFile === currentFile) nextFile = pickRandom(racingCfg.images);
    }
    currentFile = nextFile;

    inactive.src = imageSrc(base, nextFile);
    inactive.classList.add('is-active');
    active.classList.remove('is-active');
    [active, inactive] = [inactive, active];
  }, intervalMs);
}

function openLightbox(src, alt) {
  const existing = document.getElementById('racing-lightbox');
  existing?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'racing-lightbox';
  overlay.className = 'racing-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Full size image');

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'racing-lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&times;';

  const img = document.createElement('img');
  img.className = 'racing-lightbox-img';
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

export function initRacingPage(racingCfg) {
  initShowcase(racingCfg);

  const grid = document.getElementById('racing-gallery-grid');
  if (!grid || !racingCfg?.images?.length) return;

  const base = racingCfg.basePath || DEFAULT_BASE;
  const fragment = document.createDocumentFragment();

  racingCfg.images.forEach((file, index) => {
    const item = document.createElement('figure');
    item.className = 'racing-gallery-item';
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'View full size racing image ' + (index + 1));

    const img = document.createElement('img');
    img.alt = 'FG Racing Dept. ' + (index + 1);
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
