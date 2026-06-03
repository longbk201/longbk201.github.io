const DEFAULT_RACING_URL = '/racing/';
const DEFAULT_RACING_BASE = '/assets/images/showcase/';

/** Bento slot shapes for racing preview mosaic */
const RACING_PREVIEW_SLOTS = [
  'slot-a',
  'slot-b',
  'slot-c',
  'slot-d',
  'slot-e',
  'slot-f',
  'slot-g',
  'slot-h',
];

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

function pickUnique(images, count) {
  return shuffle(images).slice(0, Math.min(count, images.length));
}

export function initRacingPreview(racingCfg) {
  const section = document.getElementById('racing-in-moment');
  const grid = document.getElementById('racing-preview-grid');
  if (!section || !grid || !racingCfg?.images?.length) return;

  const base = racingCfg.basePath || DEFAULT_RACING_BASE;
  const url = racingCfg.url || DEFAULT_RACING_URL;
  const count = racingCfg.homePreviewCount || 8;
  const rotateMs = racingCfg.homeRotateMs || 6000;
  const files = pickUnique(racingCfg.images, count);

  section.href = url;

  const stationEl = document.getElementById('racing-preview-station');
  if (stationEl && racingCfg.stationLabel) {
    stationEl.textContent = racingCfg.stationLabel;
  }

  grid.replaceChildren(
    ...files.map((file, index) => {
      const img = document.createElement('img');
      img.src = imageSrc(base, file);
      img.alt = 'Racing in moment';
      img.loading = index < 4 ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.dataset.file = file;

      const cell = document.createElement('div');
      cell.className = `racing-preview-cell ${RACING_PREVIEW_SLOTS[index] || 'slot-a'}`;
      cell.appendChild(img);
      return cell;
    })
  );

  if (racingCfg.images.length <= 1) return;

  window.setInterval(() => {
    const imgs = grid.querySelectorAll('.racing-preview-cell img');
    if (!imgs.length) return;

    const img = imgs[Math.floor(Math.random() * imgs.length)];
    let nextFile = pickRandom(racingCfg.images);
    if (racingCfg.images.length > 1) {
      while (nextFile === img.dataset.file) {
        nextFile = pickRandom(racingCfg.images);
      }
    }

    img.classList.add('is-fading');
    window.setTimeout(() => {
      img.src = imageSrc(base, nextFile);
      img.dataset.file = nextFile;
      const done = () => {
        img.classList.remove('is-fading');
        img.removeEventListener('load', done);
      };
      img.addEventListener('load', done);
    }, 320);
  }, rotateMs);
}
