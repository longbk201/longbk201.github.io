const AUTO_MS = 4500;
const RESUME_MS = 8000;
const DEFAULT_RACING_URL = '/racing/';

export function initPptShowcase(racingCfg) {
  const root = document.getElementById('fgb-showcase');
  if (!root) return;

  const racingUrl = racingCfg?.url || DEFAULT_RACING_URL;
  const stationLink = document.getElementById('fgb-station-link');
  if (stationLink) stationLink.href = racingUrl;

  const slides = [...root.querySelectorAll('.fgb-slide')];
  const prevBtn = document.getElementById('fgb-prev');
  const nextBtn = document.getElementById('fgb-next');
  if (!slides.length) return;

  let index = slides.findIndex((s) => s.classList.contains('is-active'));
  if (index < 0) index = 0;

  let timer = null;
  let resumeTimer = null;
  let touchStartX = 0;

  function show(nextIndex) {
    const count = slides.length;
    index = ((nextIndex % count) + count) % count;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
  }

  function stopAuto() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startAuto() {
    stopAuto();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer = setInterval(() => show(index + 1), AUTO_MS);
  }

  function pauseThenResume() {
    stopAuto();
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(startAuto, RESUME_MS);
  }

  function go(delta) {
    show(index + delta);
    pauseThenResume();
  }

  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  root.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0]?.clientX ?? 0;
    },
    { passive: true }
  );

  root.addEventListener(
    'touchend',
    (e) => {
      const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX;
      if (Math.abs(dx) < 40) return;
      go(dx < 0 ? 1 : -1);
    },
    { passive: true }
  );

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAuto();
    else startAuto();
  });

  root.addEventListener('click', (e) => {
    if (e.target.closest('nav, .fgb-arrow, button, a')) return;
    window.location.href = racingUrl;
  });

  root.style.cursor = 'pointer';

  show(index);
  startAuto();
}
