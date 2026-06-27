import { imageSrc } from './media-collections.js';

const DEFAULT_CASES_URL = '/FGSAUTO/cases/';
const DEFAULT_BASE = '/assets/images/fgsauto-cases/';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** @param {string|{ image?: string, file?: string, title?: string }} entry */
export function normalizeCaseEntry(entry) {
  if (typeof entry === 'string') return { file: entry, title: '' };
  return {
    file: entry.image || entry.file || '',
    title: entry.title || '',
  };
}

export function normalizeCategories(casesCfg) {
  return (casesCfg?.categories || [])
    .filter((cat) => cat?.id && cat?.name)
    .map((cat) => ({
      ...cat,
      cases: (cat.cases || cat.images || []).map(normalizeCaseEntry).filter((c) => c.file),
    }));
}

export function categoryBase(casesCfg, category) {
  return category.basePath || casesCfg?.basePath || DEFAULT_BASE;
}

export function caseImageSrc(casesCfg, category, file) {
  return imageSrc(categoryBase(casesCfg, category), file);
}

/** Render case categories as Our Services cards — returns true when rendered. */
export function renderFgsAutoCaseServices(container, casesCfg) {
  const categories = normalizeCategories(casesCfg);
  if (!container || !categories.length) return false;

  const baseUrl = (casesCfg?.url || DEFAULT_CASES_URL).replace(/\/?$/, '/');

  container.replaceChildren(
    ...categories.map((cat) => {
      const icon = escapeHtml(cat.icon || 'ti-tool');
      const href = baseUrl + '#' + cat.id;
      const tagHtml = cat.tag
        ? `<span class="fgsauto-service-tag">${escapeHtml(cat.tag)}</span>`
        : '';
      const bodyDesc = cat.desc ? escapeHtml(cat.desc) : '';
      const descHtml =
        tagHtml && bodyDesc ? tagHtml + '<br />' + bodyDesc : tagHtml || bodyDesc;

      const link = document.createElement('a');
      link.className = 'fgsauto-service-card fgsauto-service-card--case';
      link.href = href;
      link.setAttribute('aria-label', cat.name + (cat.tag ? ' — ' + cat.tag : ''));
      link.innerHTML = `
        <div class="fgsauto-service-icon"><i class="ti ${icon}"></i></div>
        <div class="fgsauto-service-name">${escapeHtml(cat.name)}</div>
        <p class="fgsauto-service-desc">${descHtml}</p>
        <i class="ti ti-arrow-right fgsauto-service-arrow"></i>`;
      return link;
    })
  );

  return true;
}
