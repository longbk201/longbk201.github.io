/** Renders social platforms from config into nav rows and the social section. */
export function initSocial(platforms) {
  if (!platforms?.length) return;

  document.querySelectorAll('.social-row').forEach((row) => {
    row.innerHTML = '';
    platforms.forEach((p) => row.appendChild(createNavButton(p)));
  });

  const cardsRoot = document.querySelector('.social-cards');
  if (cardsRoot) {
    cardsRoot.innerHTML = '';
    platforms.forEach((p) => cardsRoot.appendChild(createSocialCard(p)));
  }
}

function createNavButton(platform) {
  const btn = document.createElement(platform.type === 'link' ? 'a' : 'button');
  btn.className = 'soc-btn';
  btn.setAttribute('aria-label', platform.name);
  if (platform.tooltip) btn.title = platform.tooltip;

  if (platform.type === 'link') {
    btn.href = platform.url;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
  } else {
    btn.type = 'button';
    btn.addEventListener('click', () => toggleQrPopover(btn, platform));
  }

  btn.appendChild(createIcon(platform));
  return btn;
}

function createSocialCard(platform) {
  const card =
    platform.type === 'link'
      ? document.createElement('a')
      : document.createElement('button');
  card.className = 'soc-card';
  card.setAttribute('aria-label', platform.name);

  if (platform.type === 'link') {
    card.href = platform.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
  } else {
    card.type = 'button';
    card.addEventListener('click', () => toggleQrPopover(card, platform));
  }

  const iconWrap = document.createElement('div');
  iconWrap.className = 'soc-card-icon';
  iconWrap.appendChild(createIcon(platform, 22));

  const info = document.createElement('div');
  info.className = 'soc-card-info';
  info.innerHTML = `<p>${platform.name}</p><span>${platform.tooltip || ''}</span>`;

  card.append(iconWrap, info);
  return card;
}

function createIcon(platform, size = 18) {
  if (platform.icon?.endsWith('.svg')) {
    const img = document.createElement('img');
    img.src = platform.icon;
    img.alt = '';
    img.className = 'soc-btn-icon';
    img.width = size;
    img.height = size;
    return img;
  }
  const span = document.createElement('span');
  span.textContent = platform.name?.charAt(0) || '?';
  return span;
}

function toggleQrPopover(anchor, platform) {
  const existing = document.getElementById('social-qr-popover');
  if (existing?.dataset.platformId === platform.id) {
    existing.remove();
    anchor.classList.remove('is-qr-open');
    return;
  }
  existing?.remove();
  document.querySelectorAll('.is-qr-open').forEach((el) => el.classList.remove('is-qr-open'));

  if (!platform.qrImage) return;

  const pop = document.createElement('div');
  pop.id = 'social-qr-popover';
  pop.dataset.platformId = platform.id;
  pop.style.cssText =
    'position:fixed;z-index:9999;padding:12px;background:#0d1520;border:1px solid rgba(0,136,205,0.4);border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,0.5);';

  const img = document.createElement('img');
  img.src = platform.qrImage;
  img.alt = platform.name + ' QR code';
  img.style.cssText = 'display:block;width:min(240px,70vw);height:auto;border-radius:4px;';

  pop.appendChild(img);
  document.body.appendChild(pop);

  const rect = anchor.getBoundingClientRect();
  pop.style.left = `${Math.min(rect.left, window.innerWidth - pop.offsetWidth - 12)}px`;
  pop.style.top = `${Math.max(12, rect.bottom + 8)}px`;

  anchor.classList.add('is-qr-open');

  const close = (e) => {
    if (pop.contains(e.target) || anchor.contains(e.target)) return;
    pop.remove();
    anchor.classList.remove('is-qr-open');
    document.removeEventListener('click', close);
  };
  setTimeout(() => document.addEventListener('click', close), 0);
}
