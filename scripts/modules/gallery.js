const GALLERY_BASE = 'assets/images/gallery/';

function triggerUpload(cell) {
  cell.querySelector('input[type="file"]')?.click();
}

function loadImage(fileInput) {
  const cell = fileInput.closest('.gallery-cell');
  const img = cell?.querySelector('img');
  const inner = cell?.querySelector('.gallery-cell-inner');
  const file = fileInput.files?.[0];
  if (!file || !img) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    img.src = e.target.result;
    img.style.display = 'block';
    if (inner) inner.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function showGalleryImage(img, inner) {
  img.style.display = 'block';
  if (inner) inner.style.display = 'none';
}

/** Initializes gallery grid and FG'S AUTO section hooks from site config. */
export function initFgsAuto(cfg) {
  initGallery(cfg?.gallery);
}

export function initGallery(items) {
  const grid = document.getElementById('gallery-grid');
  if (!grid || !items?.length) return;

  items.forEach((item, index) => {
    const cell = document.createElement('div');
    cell.className = 'gallery-cell' + (item.tall ? ' tall' : '');
    cell.dataset.index = String(index);

    cell.innerHTML =
      '<img alt="' +
      item.alt +
      '" />' +
      '<input type="file" accept="image/*" />' +
      '<div class="gallery-cell-inner">' +
      '<i class="ti ' +
      item.icon +
      ' gallery-icon"></i>' +
      '<span class="gallery-label">' +
      item.label +
      '</span>' +
      '<span class="gallery-tip">Click to upload</span>' +
      '</div>' +
      '<div class="gallery-accent"></div>';

    const img = cell.querySelector('img');
    const inner = cell.querySelector('.gallery-cell-inner');
    const fileInput = cell.querySelector('input[type="file"]');

    img.addEventListener('load', () => showGalleryImage(img, inner));
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
    img.src = GALLERY_BASE + item.file;

    cell.addEventListener('click', (e) => {
      if (e.target === fileInput) return;
      triggerUpload(cell);
    });
    fileInput.addEventListener('change', () => loadImage(fileInput));
    fileInput.addEventListener('click', (e) => e.stopPropagation());

    grid.appendChild(cell);
  });
}
