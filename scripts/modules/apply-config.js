/** Applies contact info (phone + location). Social links use initSocial(). */
export function applyConfig(cfg) {
  const phoneEl = document.getElementById('cta-phone');
  if (phoneEl && cfg.phone) {
    phoneEl.href = 'tel:' + cfg.phone.tel;
    const text = phoneEl.querySelector('.cta-phone-text');
    if (text) text.textContent = cfg.phone.display;
  }

  const mapsLink = document.getElementById('maps-link');
  if (mapsLink && cfg.location) mapsLink.href = cfg.location.mapsUrl;
}
