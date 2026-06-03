const MOBILE_MQ = '(max-width: 900px)';
const BACK_TO_TOP_THRESHOLD = 320;
const SCROLL_HINT_DISMISS = 56;

function lockBodyScroll(locked) {
  document.body.classList.toggle('nav-open', locked);
}

export function initMobileNav() {
  const syncNavHeight = () => {
    document.querySelectorAll('.site-nav').forEach((nav) => {
      nav.style.setProperty('--site-nav-height', `${Math.round(nav.getBoundingClientRect().height)}px`);
    });
  };

  syncNavHeight();
  window.addEventListener('resize', syncNavHeight, { passive: true });

  document.querySelectorAll('.site-nav').forEach((nav) => {
    const toggle = nav.querySelector('.nav-toggle');
    const drawer = nav.querySelector('.site-nav-drawer');
    const backdrop = nav.querySelector('.site-nav-backdrop');
    if (!toggle || !drawer) return;

    const open = () => {
      syncNavHeight();
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      drawer.setAttribute('aria-hidden', 'false');
      if (backdrop) backdrop.hidden = false;
      lockBodyScroll(true);
    };

    const close = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      drawer.setAttribute('aria-hidden', 'true');
      if (backdrop) backdrop.hidden = true;
      lockBodyScroll(false);
    };

    toggle.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) close();
      else open();
    });

    backdrop?.addEventListener('click', close);

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', close);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        close();
        toggle.focus();
      }
    });

    window.matchMedia(MOBILE_MQ).addEventListener('change', (e) => {
      if (!e.matches) close();
    });
  });
}

export function initBackToTop() {
  if (document.querySelector('.back-to-top')) return;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="ti ti-arrow-up" aria-hidden="true"></i>';
  document.body.appendChild(btn);

  const onScroll = () => {
    btn.classList.toggle('is-visible', window.scrollY > BACK_TO_TOP_THRESHOLD);
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

export function initScrollHint() {
  if (document.querySelector('.scroll-hint')) return;

  const mq = window.matchMedia(MOBILE_MQ);
  const hint = document.createElement('button');
  hint.type = 'button';
  hint.className = 'scroll-hint';
  hint.setAttribute('aria-label', 'Scroll down');
  hint.innerHTML = '<i class="ti ti-chevron-down" aria-hidden="true"></i>';
  document.body.appendChild(hint);

  let dismissed = false;

  const syncVisibility = () => {
    if (dismissed || !mq.matches) {
      hint.classList.add('is-hidden');
      return;
    }
    hint.classList.remove('is-hidden');
  };

  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    hint.classList.add('is-hidden');
  };

  hint.addEventListener('click', () => {
    window.scrollBy({ top: window.innerHeight * 0.72, behavior: 'smooth' });
    dismiss();
  });

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > SCROLL_HINT_DISMISS) dismiss();
    },
    { passive: true }
  );

  mq.addEventListener('change', syncVisibility);
  syncVisibility();
}

export function initMobileUi() {
  initMobileNav();
  initBackToTop();
  initScrollHint();
}
