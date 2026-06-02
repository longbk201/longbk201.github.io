const DEFAULT_BASE = '/assets/images/gallery%201/';

function shuffle(items) {
  const list = items.slice();
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function pickUniqueRandom(images, count) {
  return shuffle(images).slice(0, Math.min(count, images.length));
}

function imageSrc(base, file) {
  return base + encodeURIComponent(file);
}

function loadImageMeta(base, file) {
  return new Promise((resolve) => {
    const probe = new Image();
    probe.onload = () => {
      resolve({
        file,
        aspect: probe.naturalWidth >= probe.naturalHeight ? 'landscape' : 'portrait',
      });
    };
    probe.onerror = () => resolve({ file, aspect: 'landscape' });
    probe.src = imageSrc(base, file);
  });
}

const WIDTH_CLASSES = ['w-narrow', 'w-medium', 'w-wide'];

function pickColumnWidth() {
  return WIDTH_CLASSES[Math.floor(Math.random() * WIDTH_CLASSES.length)];
}

/** Random column stacks — portraits solo, landscapes stacked up to 3 per column. */
function buildColumnPlan(items) {
  const colCount = 3 + Math.floor(Math.random() * 3);
  const columns = Array.from({ length: colCount }, () => ({
    width: pickColumnWidth(),
    items: [],
  }));

  const shuffled = shuffle(items);

  shuffled.forEach((item, index) => {
    if (index < colCount) {
      columns[index].items.push(item);
      return;
    }

    let eligible = columns
      .map((col, colIndex) => ({ col, colIndex }))
      .filter(({ col }) => col.items.length < 3);

    if (item.aspect === 'portrait') {
      const solo = eligible.filter(({ col }) => col.items.length === 0);
      if (solo.length) eligible = solo;
    } else {
      const stacks = eligible.filter(
        ({ col }) =>
          col.items.length > 0 && col.items.every((entry) => entry.aspect === 'landscape')
      );
      if (stacks.length && Math.random() > 0.3) eligible = stacks;
    }

    const pick = eligible[Math.floor(Math.random() * eligible.length)];
    pick.col.items.push(item);
  });

  return columns.filter((col) => col.items.length);
}

function createCell(base, linkUrl, item, eager) {
  const cell = document.createElement('a');
  cell.className = 'gallery-cell gallery-spotlight-item';
  cell.href = linkUrl;
  cell.setAttribute('aria-label', 'Open FULL GREAT MEDIA gallery');

  const img = document.createElement('img');
  img.alt = '';
  img.decoding = 'async';
  img.loading = eager ? 'eager' : 'lazy';
  img.src = imageSrc(base, item.file);
  if (item.aspect === 'portrait') cell.classList.add('gallery-cell--portrait');

  cell.appendChild(img);
  return { cell, img, file: item.file };
}

function renderChaoticGrid(grid, columns, base, linkUrl) {
  grid.innerHTML = '';
  const slots = [];
  let eager = true;

  columns.forEach((column) => {
    const colEl = document.createElement('div');
    colEl.className = 'gallery-col gallery-col--' + column.width;

    column.items.forEach((item) => {
      const slot = createCell(base, linkUrl, item, eager);
      eager = false;
      colEl.appendChild(slot.cell);
      slots.push(slot);
    });

    grid.appendChild(colEl);
  });

  return slots;
}

async function buildGrid(grid, mediaCfg) {
  const base = mediaCfg.basePath || DEFAULT_BASE;
  const linkUrl = mediaCfg.url || '/mediagallery/';
  const cellCount = mediaCfg.previewCount || 8;
  const files = pickUniqueRandom(mediaCfg.images, cellCount);
  const metas = await Promise.all(files.map((file) => loadImageMeta(base, file)));
  const columns = buildColumnPlan(metas);
  return renderChaoticGrid(grid, columns, base, linkUrl);
}

/** Initializes homepage media gallery preview from site config. */
export function initFgsAuto(cfg) {
  initMediaGalleryPreview(cfg?.mediaGallery);
}

async function initMediaGalleryPreview(mediaCfg) {
  const grid = document.getElementById('gallery-grid');
  if (!grid || !mediaCfg?.images?.length) return;

  grid.classList.add('gallery-grid--chaos', 'gallery-spotlight-grid');

  const intervalMs = mediaCfg.rotateMs || 10000;
  await buildGrid(grid, mediaCfg);

  window.setInterval(async () => {
    grid.classList.add('is-refreshing');
    await buildGrid(grid, mediaCfg);
    requestAnimationFrame(() => grid.classList.remove('is-refreshing'));
  }, intervalMs);
}
