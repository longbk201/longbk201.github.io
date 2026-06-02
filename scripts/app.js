import { loadComponents } from './load-components.js';
import { applyConfig } from './modules/apply-config.js';
import { initSocial } from './modules/social.js';
import { initPptShowcase } from './modules/video.js';
import { initFgsAuto } from './modules/gallery.js';
import { initSmoothScroll } from './modules/scroll.js';

async function bootstrap() {
  const cfg = window.FGS_CONFIG;
  if (!cfg) {
    console.error('[FGS] Missing FGS_CONFIG — load scripts/config.js first.');
    return;
  }

  try {
    await loadComponents(cfg.components);
  } catch (err) {
    console.error('[FGS]', err);
    document.body.classList.add('load-error');
    return;
  }

  applyConfig(cfg);
  initSocial(cfg.social);
  initPptShowcase();
  initFgsAuto(cfg);
  initSmoothScroll();
}

bootstrap();
