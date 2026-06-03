/** WhatsApp wa.me links + optional floating chat widget. */

export function buildWaUrl(wa) {
  if (!wa?.url) return 'https://wa.me/';
  const base = wa.url.split('?')[0].replace(/\/$/, '');
  const text = wa.message?.trim();
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

function applyWhatsAppLinks(cfg) {
  const wa = cfg?.whatsapp;
  if (!wa) return;

  const href = buildWaUrl(wa);

  const contactLink = document.getElementById('cta-whatsapp');
  if (contactLink) {
    contactLink.href = href;
    const text = contactLink.querySelector('.cta-whatsapp-text');
    if (text && wa.display) text.textContent = wa.display;
  }
}

function createWidget(cfg) {
  const wa = cfg.whatsapp;
  const widget = wa.widget || {};
  if (widget.enabled === false) return;

  const href = buildWaUrl(wa);
  const position = widget.position === 'bottom-left' ? 'bottom-left' : 'bottom-right';
  const showPanel = widget.showPanel !== false;

  const root = document.createElement('div');
  root.className = `wa-widget wa-widget--${position}`;
  root.id = 'wa-widget';
  root.setAttribute('aria-live', 'polite');

  if (showPanel) {
    const panel = document.createElement('div');
    panel.className = 'wa-widget-panel';
    panel.id = 'wa-widget-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'WhatsApp chat');

    const header = document.createElement('div');
    header.className = 'wa-widget-panel-header';
    header.innerHTML = '<i class="ti ti-brand-whatsapp" aria-hidden="true"></i><span>WhatsApp</span>';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'wa-widget-close';
    closeBtn.setAttribute('aria-label', 'Close chat panel');
    closeBtn.innerHTML = '<i class="ti ti-x" aria-hidden="true"></i>';

    const greeting = document.createElement('p');
    greeting.className = 'wa-widget-greeting';
    greeting.textContent =
      widget.greeting || 'Hi! Message us on WhatsApp — we typically reply during business hours.';

    const cta = document.createElement('a');
    cta.className = 'wa-widget-cta';
    cta.href = href;
    cta.target = '_blank';
    cta.rel = 'noopener noreferrer';
    cta.textContent = widget.ctaLabel || 'Start Chat';

    panel.append(header, greeting, cta);
    root.append(panel);

    const fab = document.createElement('button');
    fab.type = 'button';
    fab.className = 'wa-widget-fab';
    fab.setAttribute('aria-expanded', 'false');
    fab.setAttribute('aria-controls', panel.id);
    fab.setAttribute('aria-label', 'Open WhatsApp chat');
    fab.innerHTML = '<i class="ti ti-brand-whatsapp" aria-hidden="true"></i>';

    const setOpen = (open) => {
      panel.hidden = !open;
      fab.setAttribute('aria-expanded', String(open));
      root.classList.toggle('wa-widget--open', open);
    };

    fab.addEventListener('click', () => setOpen(panel.hidden));
    closeBtn.addEventListener('click', () => setOpen(false));
    header.append(closeBtn);

    document.addEventListener('click', (e) => {
      if (!root.classList.contains('wa-widget--open')) return;
      if (!root.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('wa-widget--open')) setOpen(false);
    });

    root.append(fab);
  } else {
    const fab = document.createElement('a');
    fab.className = 'wa-widget-fab';
    fab.href = href;
    fab.target = '_blank';
    fab.rel = 'noopener noreferrer';
    fab.setAttribute('aria-label', 'Chat on WhatsApp');
    fab.innerHTML = '<i class="ti ti-brand-whatsapp" aria-hidden="true"></i>';
    root.append(fab);
  }

  document.body.append(root);
}

export function initWhatsApp(cfg) {
  if (!cfg?.whatsapp) return;
  applyWhatsAppLinks(cfg);
  createWidget(cfg);
}
