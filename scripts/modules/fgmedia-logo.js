/** Mediagallery hero: fgmedia.svg OR fgmediacn.svg — never both visible. */
export function initFgmediaLogo() {
  const brand = document.getElementById('fgmedia-brand');
  if (!brand) return;

  function showCn() {
    brand.classList.add('is-hover', 'is-show-cn');
  }

  function showEn() {
    brand.classList.remove('is-show-cn', 'is-hover');
  }

  brand.addEventListener('mouseenter', showCn);
  brand.addEventListener('mouseleave', showEn);
  brand.addEventListener('focusin', showCn);
  brand.addEventListener('focusout', (e) => {
    if (!brand.contains(e.relatedTarget)) showEn();
  });
}
