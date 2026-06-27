import {
  normalizeCategories,
  caseImageSrc,
} from './modules/fgsauto-cases.js';

function openLightbox(src, alt, title) {
  const existing = document.getElementById('fgsauto-case-lightbox');
  existing?.remove();

  const overlay = document.createElement('div');
  overlay.id = 'fgsauto-case-lightbox';
  overlay.className = 'fgsauto-case-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', title || 'Case photo');

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'fgsauto-case-lightbox__close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '&times;';

  const img = document.createElement('img');
  img.className = 'fgsauto-case-lightbox__img';
  img.src = src;
  img.alt = alt;

  overlay.append(closeBtn, img);
  if (title) {
    const caption = document.createElement('p');
    caption.className = 'fgsauto-case-lightbox__caption';
    caption.textContent = title;
    overlay.appendChild(caption);
  }

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

function buildGridItem(casesCfg, category, caseEntry, index) {
  const item = document.createElement('figure');
  item.className = 'fgsauto-case-item';
  item.tabIndex = 0;
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', caseEntry.title || 'Case ' + (index + 1));

  const img = document.createElement('img');
  img.alt = caseEntry.title || '';
  img.decoding = 'async';
  img.loading = index < 12 ? 'eager' : 'lazy';
  img.src = caseImageSrc(casesCfg, category, caseEntry.file);

  const label = document.createElement('span');
  label.className = 'fgsauto-case-item__view';
  label.textContent = 'View fullsize';

  if (caseEntry.title) {
    const caption = document.createElement('figcaption');
    caption.className = 'fgsauto-case-item__title';
    caption.textContent = caseEntry.title;
    item.append(img, label, caption);
  } else {
    item.append(img, label);
  }

  const open = () =>
    openLightbox(img.src, img.alt || category.name, caseEntry.title || '');
  item.addEventListener('click', open);
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });

  return item;
}

function parseCategoryHash() {
  const raw = (window.location.hash || '').replace(/^#/, '').trim();
  return raw || null;
}

export function initFgsAutoCasesPage(casesCfg) {
  const categories = normalizeCategories(casesCfg);
  if (!categories.length) return;

  const nav = document.getElementById('fgsauto-cases-nav');
  const grid = document.getElementById('fgsauto-cases-gallery');
  const empty = document.getElementById('fgsauto-cases-empty');
  const heading = document.getElementById('fgsauto-cases-heading');
  const tagEl = document.getElementById('fgsauto-cases-tag');
  const descEl = document.getElementById('fgsauto-cases-desc');

  let activeId = categories[0].id;

  function getCategory(id) {
    return categories.find((c) => c.id === id) || categories[0];
  }

  function renderGrid(category) {
    if (!grid) return;
    grid.replaceChildren();

    if (!category.cases?.length) {
      empty?.removeAttribute('hidden');
      return;
    }

    empty?.setAttribute('hidden', '');
    const fragment = document.createDocumentFragment();
    category.cases.forEach((entry, index) => {
      fragment.appendChild(buildGridItem(casesCfg, category, entry, index));
    });
    grid.appendChild(fragment);
  }

  function setCategory(id) {
    const category = getCategory(id);
    activeId = category.id;

    nav?.querySelectorAll('.fgsauto-case-nav').forEach((btn) => {
      const isActive = btn.dataset.category === id;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    if (heading) heading.textContent = category.name;
    if (tagEl) tagEl.textContent = category.tag || '';
    if (descEl) descEl.textContent = category.desc || '';

    document.title = category.name + " · FG'S AUTO · Full Great Bros";
    history.replaceState(null, '', '#' + id);
    renderGrid(category);
  }

  categories.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'fgsauto-case-nav';
    btn.dataset.category = cat.id;
    btn.innerHTML = `<span class="fgsauto-case-nav__name">${cat.name}</span><span class="fgsauto-case-nav__tag">${cat.tag || ''}</span>`;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    if (i === 0) btn.classList.add('is-active');
    btn.addEventListener('click', () => setCategory(cat.id));
    nav?.appendChild(btn);
  });

  window.addEventListener('hashchange', () => {
    const hashId = parseCategoryHash();
    if (hashId && categories.some((c) => c.id === hashId)) {
      setCategory(hashId);
    }
  });

  const hashId = parseCategoryHash();
  setCategory(hashId && categories.some((c) => c.id === hashId) ? hashId : activeId);
}
