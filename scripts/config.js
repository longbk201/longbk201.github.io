/** Site-wide content — edit contact & social links here. */
window.FGS_CONFIG = {
  /** Phone + maps — applied by apply-config.js */
  phone: {
    display: '+86 13686481010',
    tel: '+86 13686481010',
  },
  location: {
    mapsUrl: 'https://www.amap.com/place/B0LK5HSI6N',
  },

  /**
   * Social platforms — rendered by scripts/modules/social.js
   * type: "link" opens url in new tab | "qr" shows qrImage popover on click
   */
  social: [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '/assets/svg/youtube.svg',
      type: 'link',
      url: 'https://www.youtube.com/@fullgreatbros001',
      tooltip: '@fullgreatbros001',
    },
    {
      id: 'bilibili',
      name: 'Bilibili',
      icon: '/assets/svg/bilibili.svg',
      type: 'link',
      url: 'https://space.bilibili.com/3546866983635207?spm_id_from=333.337.0.0',
      tooltip: '@富贵兄弟FGmotorsport',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '/assets/svg/instagram.svg',
      type: 'link',
      url: 'https://www.instagram.com/fg_bros_auto/',
      tooltip: '@fgbrosauto',
    },
    {
      id: 'rednote',
      name: '小红书',
      icon: '/assets/svg/rednote.svg',
      type: 'qr',
      qrImage: '/assets/svg/rednoteQR.svg',
      tooltip: "#FG'S AUTO富贵车房",
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: '/assets/svg/tiktok.svg',
      type: 'qr',
      qrImage: '/assets/svg/tiktokQR.svg',
      tooltip: "@富贵车房 FG'S AUTO",
    },
  ],

  fgsAuto: {
    url: '/FGSAUTO/',
    logo: '/assets/images/FGSAUTOLOGO.svg',
    tag: 'Local Auto Shop · Shenzhen',
  },

  galleryServices: [
    {
      icon: 'ti-droplet',
      name: 'Oil Changes & Maintenance',
      desc: 'Conventional, synthetic, and high-mileage oil changes with a full multi-point inspection every visit.',
    },
    {
      icon: 'ti-wave-square',
      name: 'Brake & Suspension',
      desc: 'From brake pad replacement to full suspension diagnostics — we keep you safe on every road.',
    },
    {
      icon: 'ti-rotate-clockwise',
      name: 'Tire Services',
      desc: 'Mounting, balancing, rotation, and alignment. We work with all major tire brands and sizes.',
    },
  ],

  /** Homepage media preview + /mediagallery index — images in assets/images/gallery 1/ */
  mediaGallery: {
    url: '/mediagallery/',
    basePath: '/assets/images/gallery%201/',
    showcaseTitle: 'GTR sssss....',
    previewCount: 8,
    rotateMs: 10000,
    showcaseRotateMs: 5000,
    images: Array.from({ length: 114 }, (_, i) => 'IMG_' + (i + 1) + '.jpg'),
  },

  pages: {
    home: {
      title: "FULL GREAT BROS · 富贵兄弟 · 深圳南山",
      initShowcase: true,
      initGallery: true,
      initScroll: true,
      components: [
        { mount: 'component-nav', file: 'FULLGREATBROS.html' },
        { mount: 'component-hero', file: 'hero.html' },
        { mount: 'component-stats', file: 'stats.html' },
        { mount: 'component-gallery', file: 'gallery.html' },
        { mount: 'component-social', file: 'social.html' },
        { mount: 'component-footer', file: 'footer.html' },
      ],
    },
    fgsauto: {
      title: "FG'S AUTO · Full Great Bros",
      initScroll: true,
      components: [
        { mount: 'component-nav', file: 'site-nav.html' },
        { mount: 'component-hero', file: 'hero.html' },
        { mount: 'component-services', file: 'services.html' },
        { mount: 'component-stats', file: 'stats.html' },
        { mount: 'component-footer', file: 'footer.html' },
      ],
    },
    about: {
      title: 'About · Full Great Bros',
      components: [
        { mount: 'component-nav', file: 'site-nav.html' },
        { mount: 'component-about', file: 'about.html' },
        { mount: 'component-footer', file: 'footer.html' },
      ],
    },
    contact: {
      title: 'Contact · Full Great Bros',
      components: [
        { mount: 'component-nav', file: 'site-nav.html' },
        { mount: 'component-contact', file: 'contact.html' },
        { mount: 'component-footer', file: 'footer.html' },
      ],
    },
    mediagallery: {
      title: 'FULL GREAT MEDIA · Full Great Bros',
      initMediaGallery: true,
      components: [
        { mount: 'component-nav', file: 'site-nav.html' },
        { mount: 'component-gallery-main', file: 'media-gallery-main.html' },
        { mount: 'component-social', file: 'social.html' },
        { mount: 'component-footer', file: 'footer.html' },
      ],
    },
  },
};
