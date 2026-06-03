/** Applies contact info (phone + location). Social links use initSocial(). */
export function applyConfig(cfg) {
  const phoneEl = document.getElementById('cta-phone');
  if (phoneEl && cfg.phone) {
    phoneEl.href = 'tel:' + cfg.phone.tel;
    const text = phoneEl.querySelector('.cta-phone-text');
    if (text) text.textContent = cfg.phone.display;
  }

  const loc = cfg.location || {};
  const mapsUrl = loc.mapsUrl || '#';

  const mapsLinks = document.querySelectorAll('#maps-link, #fgsauto-maps-link');
  mapsLinks.forEach((el) => {
    el.href = mapsUrl;
  });

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
