const DEFAULT_BASE = '/assets/images/media-gallery/';

export function normalizeCollections(mediaCfg) {
  if (mediaCfg?.collections?.length) return mediaCfg.collections;
  if (mediaCfg?.images?.length) {
    return [
      {
        id: 'gtr',
        label: mediaCfg.showcaseTitle || 'GTR sssss....',
        basePath: mediaCfg.basePath || DEFAULT_BASE,
        images: mediaCfg.images,
      },
    ];
  }
  return [];
}

export function collectionBase(mediaCfg, collection) {
  return collection.basePath || mediaCfg?.basePath || DEFAULT_BASE;
}

export function imageSrc(base, file) {
  return base + encodeURIComponent(file);
}

export function pickRandom(images) {
  if (!images?.length) return null;
  return images[Math.floor(Math.random() * images.length)];
}

export function pickCollectionThumbnail(mediaCfg, collection, cache) {
  const key = collection.id;
  if (cache?.[key]) return cache[key];

  const file = pickRandom(collection.images);
  if (!file) return null;

  const thumb = {
    file,
    src: imageSrc(collectionBase(mediaCfg, collection), file),
    label: collection.label,
    id: collection.id,
    images: collection.images,
    basePath: collectionBase(mediaCfg, collection),
  };

  if (cache) cache[key] = thumb;
  return thumb;
}

export function buildCollectionCard(thumb, options = {}) {
  const { href, asButton = false, onSelect, variant = 'default' } = options;
  const el = document.createElement(asButton ? 'button' : 'a');
  el.className = 'media-collection-card' + (variant === 'home' ? ' media-collection-card--home' : '');
  el.dataset.collection = thumb.id;

  if (asButton) {
    el.type = 'button';
    el.addEventListener('click', () => onSelect?.(thumb.id));
  } else {
    el.href = href || '/mediagallery/#' + thumb.id;
  }

  el.setAttribute('aria-label', thumb.label + ' collection');

  const frame = document.createElement('div');
  frame.className = 'media-collection-card__frame';

  const stage = document.createElement('div');
  stage.className = 'media-collection-card__stage';

  const img = document.createElement('img');
  img.className = 'media-collection-card__img';
  img.src = thumb.src;
  img.alt = '';
  img.decoding = 'async';
  img.loading = 'lazy';
  if (thumb.file) img.dataset.file = thumb.file;

  const label = document.createElement('span');
  label.className = 'media-collection-card__label';
  label.textContent = thumb.label;

  stage.append(img, label);

  const wipeA = document.createElement('span');
  wipeA.className = 'media-collection-card__wipe media-collection-card__wipe--diag';
  const wipeB = document.createElement('span');
  wipeB.className = 'media-collection-card__wipe media-collection-card__wipe--tri';
  const wipeC = document.createElement('span');
  wipeC.className = 'media-collection-card__wipe media-collection-card__wipe--bar';

  frame.append(stage, wipeA, wipeB, wipeC);
  el.append(frame);

  if (variant === 'home' && thumb.images?.length > 1) {
    el.dataset.rotate = 'true';
  }

  return el;
}
