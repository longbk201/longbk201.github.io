/** Applies contact info (phone + location). WhatsApp + social use dedicated modules. */
export function applyConfig(cfg) {
  const phoneEl = document.getElementById('cta-phone');
  if (phoneEl && cfg.phone) {
    phoneEl.href = 'tel:' + cfg.phone.tel;
    const text = phoneEl.querySelector('.cta-phone-text');
    if (text) text.textContent = cfg.phone.display;
  }

  const emailEl = document.getElementById('cta-email');
  if (emailEl && cfg.email?.address) {
    emailEl.href = 'mailto:' + cfg.email.address;
    const emailText = emailEl.querySelector('.cta-email-text');
    if (emailText) emailText.textContent = cfg.email.address;
  }

  const wechatText = document.querySelector('.cta-wechat-text');
  if (wechatText && cfg.wechat?.id) wechatText.textContent = cfg.wechat.id;

  const loc = cfg.location || {};
  const mapsUrl = loc.mapsUrl || '#';

  const mapsLinks = document.querySelectorAll('#maps-link, #fgsauto-maps-link');
  mapsLinks.forEach((el) => {
    el.href = mapsUrl;
  });

  const mapFrame = document.getElementById('contact-google-map');
  if (mapFrame && loc.googleMapsEmbed) {
    mapFrame.src = loc.googleMapsEmbed;
  }

  const locationFields = [
    ['location-zh', loc.zh],
    ['location-en', loc.en],
    ['contact-location-zh', loc.zh],
    ['contact-location-en', loc.en],
    ['contact-location-short', loc.short],
  ];

  locationFields.forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  });

  const fgs = cfg.fgsAuto || {};
  document.querySelectorAll('.fgsauto-page-link').forEach((el) => {
    if (fgs.url) el.href = fgs.url;
  });

  const logo = document.querySelector('.fgsauto-logo');
  if (logo && fgs.logo) logo.src = fgs.logo;

  const tag = document.querySelector('.fgsauto-tag');
  if (tag && fgs.tag) tag.textContent = fgs.tag;
}
