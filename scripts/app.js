import { loadComponents } from './load-components.js';
import { applyConfig } from './modules/apply-config.js';
import { initSocial } from './modules/social.js';
import { initPptShowcase } from './modules/video.js';
import { initFgsAutoBlock, initMediaPreview } from './modules/gallery.js';
import { initMediaGalleryPage } from './media-gallery-page.js';
import { initSmoothScroll } from './modules/scroll.js';

async function bootstrap() {
  const cfg = window.FGS_CONFIG;
  const pageKey = window.FGS_PAGE || 'home';
  const pageCfg = cfg?.pages?.[pageKey];

  if (!cfg || !pageCfg) {
    console.error('[FGS] Missing config for page:', pageKey);
    return;
  }

  if (pageCfg.title) document.title = pageCfg.title;

  try {
    await loadComponents(pageCfg.components);
  } catch (err) {
    console.error('[FGS]', err);
    document.body.classList.add('load-error');
    return;
  }

  applyConfig(cfg);
  initSocial(cfg.social);

  if (pageCfg.initShowcase) initPptShowcase();
  if (pageCfg.initFgsAuto) initFgsAutoBlock(cfg);
  if (pageCfg.initGallery) initMediaPreview(cfg.mediaGallery);
  if (pageCfg.initMediaGallery) initMediaGalleryPage(cfg.mediaGallery);
  if (pageCfg.initScroll) initSmoothScroll();
}

bootstrap();
