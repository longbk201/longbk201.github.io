/** Site-wide content — edit contact & social links here. */
window.FGS_CONFIG = {
  /** Phone + maps — applied by apply-config.js */
  phone: {
    display: '+86 13686481010',
    tel: '+86 13686481010',
  },
  /** WhatsApp Click-to-Chat (wa.me) + floating widget — scripts/modules/whatsapp.js */
  whatsapp: {
    url: 'https://wa.me/19494164168',
    display: 'FGSAUTO',
    /** Optional prefilled message (?text=) */
    message: '',
    widget: {
      enabled: true,
      position: 'bottom-right',
      greeting: 'Hi! Message us on WhatsApp — we typically reply during business hours.',
      ctaLabel: 'Start Chat',
      /** false = FAB opens wa.me directly; true = FAB opens a small panel first */
      showPanel: true,
    },
  },
  email: {
    address: 'contact@fullgreatbros.com',
  },
  wechat: {
    id: 'FGSAUTO',
    qrImage: '/assets/svg/wechatQR.png',
  },
  /**
   * Shop hours — live Open now / Closed (shop timezone).
   * Mon–Sat 09:30–19:30; Sunday closed.
   */
  hours: {
    timezone: 'Asia/Shanghai',
    schedule: [{ days: [1, 2, 3, 4, 5, 6], open: '09:30', close: '19:30' }],
    labels: {
      openNow: 'Open now',
      openNowZh: '营业中',
      closed: 'Closed',
      closedZh: '已打烊',
      closedToday: 'Closed today',
      closedTodayZh: '今日休息',
      openToday: 'Open today',
      openTodayZh: '今日营业',
      hoursRange: 'Mon–Sat 9:30 AM – 7:30 PM',
      hoursRangeZh: '周一至周六 09:30–19:30',
      sundayNote: 'Sunday closed',
      sundayNoteZh: '周日休息',
    },
  },
  location: {
    mapsUrl: 'https://www.amap.com/place/B0LK5HSI6N',
    zh: '深圳市南山区南山大道南油第四工业区一栋一层1022',
    en: '1022 Building 1, Nanyou 4th Industrial Zone, Nanshan Avenue, Nanshan District, Shenzhen, Guangdong, China',
    short: '南山区 · 深圳市 · 广东省',
    /** Google Maps embed iframe src (Visit Us card) */
    googleMapsEmbed:
      'https://www.google.com/maps/embed?q=1022+Building+1,+Nanyou+4th+Industrial+Zone,+Nanshan+Avenue,+Nanshan+District,+Shenzhen,+Guangdong,+China&hl=en&z=17',
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

  home: {
    url: '/HOMEPAGE/',
  },

  fgsAuto: {
    url: '/FGSAUTO/',
    logo: '/assets/images/FGSAUTOLOGO.svg',
    tag: 'Local Auto Shop · Shenzhen',
  },

  galleryServices: [
    {
      name: 'Oil Changes & Maintenance',
      desc: 'Conventional, synthetic, and high-mileage oil changes with a full multi-point inspection included every visit.',
      icon: 'ti-droplet',
    },
    {
      name: 'Brake & Suspension',
      desc: 'From brake pad replacement to full suspension diagnostics — we keep you safe on every road.',
      icon: 'ti-wave-square',
    },
    {
      name: 'Tire Services',
      desc: 'Mounting, balancing, rotation, and alignment. We work with all major tire brands and sizes.',
      icon: 'ti-circle',
    },
  ],

  /** Media gallery — images in assets/images/media-gallery/ */
  mediaGallery: {
    url: '/mediagallery/',
    basePath: '/assets/images/media-gallery/',
    homePreviewCount: 10,
    homeRotateMs: 8000,
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
        { mount: 'component-fgsauto', file: 'fgsauto.html' },
        { mount: 'component-stats', file: 'stats.html' },
        { mount: 'component-gallery', file: 'gallery.html' },
        { mount: 'component-social', file: 'social.html' },
        { mount: 'component-footer', file: 'footer.html' },
      ],
    },
    fgsauto: {
      title: "FG'S AUTO · Full Great Bros",
      initFgsAuto: true,
      initScroll: true,
      components: [
        { mount: 'component-nav', file: 'site-nav.html' },
        { mount: 'component-fgsauto', file: 'fgsauto.html' },
        { mount: 'component-stats', file: 'stats.html' },
        { mount: 'component-footer', file: 'footer.html' },
      ],
    },
    about: {
      title: 'About · FULL GREAT BROS · 富贵兄弟',
      components: [
        { mount: 'component-nav', file: 'site-nav.html' },
        { mount: 'component-about', file: 'about.html' },
        { mount: 'component-footer', file: 'footer.html' },
      ],
    },
    contact: {
      title: "Contact · FULL GREAT BROS · FG'S AUTO",
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
