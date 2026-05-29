(function () {
  const cfg = window.FGS_CONFIG;
  if (!cfg) return;

  function applyConfig() {
    const phoneEl = document.getElementById('cta-phone');
    if (phoneEl && cfg.phone) {
      phoneEl.href = 'tel:' + cfg.phone.tel;
      phoneEl.querySelector('.cta-phone-text').textContent = cfg.phone.display;
    }

    const mapsLink = document.getElementById('maps-link');
    if (mapsLink && cfg.location) mapsLink.href = cfg.location.mapsUrl;

    const socialMap = [
      ['instagram', 'nav-ig-link', 'ig-card'],
      ['xiaohongshu', 'nav-xhs-link', 'xhs-card'],
      ['tiktok', 'nav-tt-link', 'tt-card'],
    ];
    socialMap.forEach(([key, ...ids]) => {
      const url = cfg.social[key];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && url && url !== '#') el.href = url;
      });
    });

    const videoTitle = document.getElementById('video-title');
    if (videoTitle && cfg.video?.title) videoTitle.textContent = cfg.video.title;

    if (cfg.video?.defaultUrl) {
      const input = document.getElementById('video-url-input');
      if (input) input.value = cfg.video.defaultUrl;
      setVideo(cfg.video.defaultUrl);
    }
  }

  function setVideo(rawUrl) {
    const input = document.getElementById('video-url-input');
    const raw = (rawUrl ?? input?.value ?? '').trim();
    if (!raw) return;

    let embedUrl = raw;
    const ytMatch = raw.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (ytMatch) {
      embedUrl = 'https://www.youtube.com/embed/' + ytMatch[1] + '?autoplay=1&rel=0';
    }

    const wrap = document.getElementById('video-embed-wrap');
    const overlay = document.getElementById('video-overlay');
    if (!wrap || !overlay) return;

    wrap.innerHTML =
      '<iframe src="' +
      embedUrl +
      '" title="FG\'s Auto shop tour" allowfullscreen allow="autoplay; encrypted-media"></iframe>';
    wrap.style.display = 'block';
    overlay.style.display = 'none';
  }

  function initVideo() {
    const input = document.getElementById('video-url-input');
    const playBtn = document.getElementById('video-play-btn');
    const setBtn = document.getElementById('video-set-btn');

    setBtn?.addEventListener('click', () => setVideo());
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') setVideo();
    });
    playBtn?.addEventListener('click', () => {
      if (input?.value.trim()) setVideo();
    });
  }

  function triggerUpload(cell) {
    const input = cell.querySelector('input[type="file"]');
    input?.click();
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

  function initGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid || !cfg.gallery?.length) return;

    cfg.gallery.forEach((item, index) => {
      const cell = document.createElement('div');
      cell.className = 'gallery-cell' + (item.tall ? ' tall' : '');
      cell.dataset.index = String(index);

      const src = 'assets/images/gallery/' + item.file;
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
      img.src = src;

      cell.addEventListener('click', (e) => {
        if (e.target === fileInput) return;
        triggerUpload(cell);
      });
      fileInput.addEventListener('change', () => loadImage(fileInput));
      fileInput.addEventListener('click', (e) => e.stopPropagation());

      grid.appendChild(cell);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href')?.slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    document.querySelectorAll('[data-scroll-to]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-scroll-to');
        const target = id ? document.getElementById(id) : null;
        target?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  applyConfig();
  initVideo();
  initGallery();
  initSmoothScroll();
})();
