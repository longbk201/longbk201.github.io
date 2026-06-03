/** Ensure asset paths work from any page depth (e.g. /mediagallery/). */
function resolveAsset(path) {
  if (!path || /^https?:\/\//.test(path) || path.startsWith('/')) return path;
  return '/' + path.replace(/^\.\//, '');
}

let qrLayer = null;
let activeTrigger = null;

function createIconImg(src, className) {
  const img = document.createElement('img');
  img.src = resolveAsset(src);
  img.alt = '';
  img.className = className;
  img.decoding = 'async';
  return img;
}

function attachTooltip(el, text) {
  el.dataset.tooltip = text;
}

function createNavControl(platform) {
  const isLink = platform.type === 'link';
  const el = document.createElement(isLink ? 'a' : 'button');
  el.className = 'soc-btn';
  el.id = 'nav-' + platform.id;
  el.setAttribute('aria-label', platform.name);

  if (isLink) {
    el.href = platform.url;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  } else {
    el.type = 'button';
    bindQrTrigger(el, platform);
  }

  el.appendChild(createIconImg(platform.icon, 'soc-btn-icon'));
  attachTooltip(el, platform.tooltip);
  return el;
}

function createSectionCard(platform) {
  const isLink = platform.type === 'link';
  const el = document.createElement(isLink ? 'a' : 'button');
  el.className = 'soc-card';
  el.id = platform.id + '-card';
  el.setAttribute('aria-label', platform.name);

  if (isLink) {
    el.href = platform.url;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  } else {
    el.type = 'button';
    bindQrTrigger(el, platform);
  }

  const iconWrap = document.createElement('div');
  iconWrap.className = 'soc-card-icon';
  iconWrap.appendChild(createIconImg(platform.icon, 'soc-card-icon-img'));

  const info = document.createElement('div');
  info.className = 'soc-card-info';
  info.innerHTML = '<p>' + platform.name + '</p><span>' + platform.tooltip + '</span>';

  el.append(iconWrap, info);
  attachTooltip(el, platform.tooltip);
  return el;
}

function ensureQrLayer() {
  if (qrLayer) return qrLayer;

  qrLayer = document.createElement('div');
  qrLayer.className = 'social-qr-layer';
  qrLayer.hidden = true;
  qrLayer.innerHTML =
    '<div class="social-qr-layer__backdrop" data-qr-close></div>' +
    '<div class="social-qr-popover" role="dialog" aria-modal="true" aria-label="QR code">' +
    '<img class="social-qr-popover__img" alt="" />' +
    '</div>';

  qrLayer.querySelector('[data-qr-close]').addEventListener('click', closeQrPopover);
  document.body.appendChild(qrLayer);
  return qrLayer;
}

function positionPopover(trigger, popover) {
  const rect = trigger.getBoundingClientRect();
  const margin = 12;
  popover.style.visibility = 'hidden';
  popover.style.display = 'block';

  const popRect = popover.getBoundingClientRect();
  let top = rect.top - popRect.height - margin;
  let left = rect.left + rect.width / 2 - popRect.width / 2;

  if (top < margin) top = rect.bottom + margin;
  left = Math.max(margin, Math.min(left, window.innerWidth - popRect.width - margin));
  top = Math.max(margin, Math.min(top, window.innerHeight - popRect.height - margin));

  popover.style.top = top + 'px';
  popover.style.left = left + 'px';
  popover.style.visibility = '';
}

function openQrPopover(trigger, platform) {
  const layer = ensureQrLayer();
  const img = layer.querySelector('.social-qr-popover__img');
  const popover = layer.querySelector('.social-qr-popover');

  img.src = resolveAsset(platform.qrImage);
  img.alt = platform.name + ' QR code';
  activeTrigger = trigger;
  trigger.classList.add('is-qr-open');
  layer.hidden = false;
  layer.classList.add('is-open');
  positionPopover(trigger, popover);

  requestAnimationFrame(() => positionPopover(trigger, popover));
}

function closeQrPopover() {
  if (!qrLayer) return;
  qrLayer.hidden = true;
  qrLayer.classList.remove('is-open');
  activeTrigger?.classList.remove('is-qr-open');
  activeTrigger = null;
}

function toggleQrPopover(trigger, platform) {
  if (qrLayer?.classList.contains('is-open') && activeTrigger === trigger) {
    closeQrPopover();
    return;
  }
  closeQrPopover();
  openQrPopover(trigger, platform);
}

/** Bind any button to the shared QR popover (e.g. contact WeChat). */
export function bindQrTrigger(trigger, platform) {
  if (!trigger || !platform?.qrImage) return;
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleQrPopover(trigger, platform);
  });
}

function bindGlobalClose() {
  document.addEventListener('click', (e) => {
    if (!qrLayer?.classList.contains('is-open')) return;
    if (
      e.target.closest('.social-qr-popover') ||
      e.target.closest('.soc-btn[type="button"]') ||
      e.target.closest('.soc-card[type="button"]') ||
      e.target.closest('.contact-wechat-btn[type="button"]')
    ) {
      return;
    }
    closeQrPopover();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQrPopover();
  });

  window.addEventListener('resize', () => {
    if (!activeTrigger || !qrLayer?.classList.contains('is-open')) return;
    positionPopover(activeTrigger, qrLayer.querySelector('.social-qr-popover'));
  });
}

export function initSocial(platforms) {
  if (!Array.isArray(platforms) || !platforms.length) return;

  document.querySelectorAll('.social-row').forEach((navRow) => {
    navRow.replaceChildren(...platforms.map(createNavControl));
  });

  const cards = document.querySelector('.social-cards');
  if (cards) {
    cards.replaceChildren(...platforms.map(createSectionCard));
  }

  bindGlobalClose();
}
