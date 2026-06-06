import { loadComponents } from './load-components.js';
import { applyConfig } from './modules/apply-config.js';
import { initSocial } from './modules/social.js';
import { initPptShowcase } from './modules/video.js';
import { initFgsAutoBlock, initMediaPreview } from './modules/gallery.js';
import { initRacingPreview } from './modules/racing.js';
import { initMediaGalleryPage } from './media-gallery-page.js';
import { initRacingPage } from './racing-page.js';
import { initSmoothScroll } from './modules/scroll.js';
import { initWhatsApp } from './modules/whatsapp.js';
import { initContact } from './modules/contact.js';
import { initBusinessHours } from './modules/business-hours.js';
import { initMobileUi } from './modules/mobile-ui.js';

async function bootstrap() {
  try {
    const cfg = window.FGS_CONFIG;
    const pageKey = window.FGS_PAGE || 'home';
    const pageCfg = cfg?.pages?.[pageKey];

    if (!cfg || !pageCfg) {
      console.error('[FGS] Missing config for page:', pageKey);
      document.body.classList.add('load-error');
      return;
    }

    if (pageCfg.title) document.title = pageCfg.title;

    try {
      await loadComponents(pageCfg.components);
    } catch (err) {
      console.error('[FGS] Component load failed:', err);
      document.body.classList.add('load-error');
      return;
    }

    applyConfig(cfg);
    initBusinessHours(cfg);
    initWhatsApp(cfg);
    initSocial(cfg.social);
    initContact(cfg);
    initMobileUi();

    if (pageCfg.initShowcase) initPptShowcase(cfg.racing);
    if (pageCfg.initFgsAuto) initFgsAutoBlock(cfg);
    if (pageCfg.initGallery) initMediaPreview(cfg.mediaGallery);
    if (pageCfg.initRacingPreview) initRacingPreview(cfg.racing);
    if (pageCfg.initMediaGallery) initMediaGalleryPage(cfg.mediaGallery);
    if (pageCfg.initRacingPage) initRacingPage(cfg.racing);
    if (pageCfg.initScroll) initSmoothScroll();
  } catch (err) {
    console.error('[FGS] Bootstrap failed:', err);
    document.body.classList.add('load-error');
  }
}

bootstrap();
