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

  racing: {
    url: '/racing/',
    basePath: '/assets/images/showcase/',
    stationLabel: '宁波站 R2',
    tag: 'Motorsport · Track Days',
    homePreviewCount: 8,
    homeRotateMs: 6000,
    showcaseRotateMs: 4500,
    images: [
      '0C1A3151.jpg',
      '0C1A3179.jpg',
      '0Z5A1184.jpg',
      '0Z5A1376.jpg',
      '0Z5A1381.jpg',
      '0Z5A1526.jpg',
      '0Z5A1976.jpg',
      '0Z5A2137.jpg',
      '0Z5A6892.jpg',
      '0Z5A8847.jpg',
      '0Z5A9196.jpg',
      '0Z5A9240.jpg',
      '0Z5A9254.jpg',
      'CMFL6659.jpg',
      'IMG_0121-10.jpg',
      'IMG_0212-23.jpg',
      'IMG_0555-78.jpg',
      'PRO60402.jpg',
      'SCR58023.jpg',
      'SCR59029.jpg',
      'SF300620 (1).jpg',
      'SF300640 (1).jpg',
      'SF300658.jpg',
      'SF309214.jpg',
      'SF906860.jpg',
      '_UR55011.jpg',
    ],
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

  /**
   * FG'S AUTO work cases — edit categories & photos here.
   * Put images under assets/images/fgsauto-cases/<category-id>/ or set basePath per category.
   * cases: string filename OR { image: 'file.jpg', title: 'Optional caption' }
   */
  fgsAutoCases: {
    url: '/FGSAUTO/cases/',
    basePath: '/assets/images/fgsauto-cases/',
    rotateMs: 8000,
    categories: [
      {
        id: 'ppf',
        name: '贴膜',
        tag: 'PPF & Film',
        icon: 'ti-shield',
        desc: 'Paint protection film, window tint, and vinyl wrap — precision install, lasting finish.',
        basePath: '/assets/images/media-gallery/',
        cases: [
          { image: 'IMG_3.jpg', title: 'Full body PPF' },
          { image: 'IMG_7.jpg', title: 'Front end PPF' },
          { image: 'IMG_12.jpg', title: 'Window tint' },
        ],
      },
      {
        id: 'brakes',
        name: '刹车',
        tag: 'Brakes',
        icon: 'ti-disc',
        desc: 'Brake pads, rotors, fluid service, and performance upgrades for confident stopping.',
        basePath: '/assets/images/media-gallery/',
        cases: [
          { image: 'IMG_18.jpg', title: 'Brake pad replacement' },
          { image: 'IMG_22.jpg', title: 'Rotor service' },
          { image: 'IMG_28.jpg', title: 'Performance brake kit' },
        ],
      },
      {
        id: 'suspension',
        name: '避震',
        tag: 'Suspension',
        icon: 'ti-arrows-vertical',
        desc: 'Coilovers, shocks, and suspension tuning for comfort, control, and track-ready setup.',
        basePath: '/assets/images/media-gallery/',
        cases: [
          { image: 'IMG_32.jpg', title: 'Coilover install' },
          { image: 'IMG_40.jpg', title: 'Suspension refresh' },
          { image: 'IMG_45.jpg', title: 'Lowering setup' },
        ],
      },
      {
        id: 'bodykit',
        name: '包围',
        tag: 'Body Kits',
        icon: 'ti-car',
        desc: 'Aero kits, lips, diffusers, and body styling — fitted and finished in-house.',
        basePath: '/assets/images/media-gallery/',
        cases: [
          { image: 'IMG_50.jpg', title: 'Front lip install' },
          { image: 'IMG_55.jpg', title: 'Side skirt fitment' },
          { image: 'IMG_60.jpg', title: 'Rear diffuser' },
        ],
      },
      {
        id: 'maintenance',
        name: '保养',
        tag: 'Maintenance',
        icon: 'ti-tool',
        desc: 'Oil changes, filters, fluids, and scheduled maintenance with multi-point inspection.',
        basePath: '/assets/images/media-gallery/',
        cases: [
          { image: 'IMG_64.jpg', title: 'Synthetic oil service' },
          { image: 'IMG_67.jpg', title: 'Fluid top-up' },
          { image: 'IMG_70.jpg', title: 'Multi-point inspection' },
        ],
      },
      {
        id: 'alignment',
        name: '轮毂定位',
        tag: 'Wheel Alignment',
        icon: 'ti-steering-wheel',
        desc: 'Wheel alignment, balancing, and tire mounting for even wear and straight tracking.',
        basePath: '/assets/images/media-gallery/',
        cases: [
          { image: 'IMG_74.jpg', title: 'Four-wheel alignment' },
          { image: 'IMG_78.jpg', title: 'Tire mount & balance' },
          { image: 'IMG_82.jpg', title: 'Camber adjustment' },
        ],
      },
    ],
  },

  /** Media gallery — images in assets/images/media-gallery/ */
  mediaGallery: {
    url: '/mediagallery/',
    basePath: '/assets/images/media-gallery/',
    homePreviewCount: 10,
    homeRotateMs: 8000,
    previewCount: 8,
    rotateMs: 10000,
    showcaseRotateMs: 5000,
    collections: [
      {
        id: 'gtr',
        label: 'GTR sssss....',
        basePath: '/assets/images/GTRs/',
        images: Array.from({ length: 121 }, (_, i) => 'GTRs_' + (i + 1) + '.avif'),
      },
      {
        id: 'brz',
        label: 'BRZs',
        basePath: '/assets/images/BRZs%20showcase/',
        images: [
          'BRZsshoot_3.avif', 'BRZsshoot_4.avif', 'BRZsshoot_5.avif', 'BRZsshoot_6.avif',
          'BRZsshoot_7.avif', 'BRZsshoot_8.avif', 'BRZsshoot_9.avif', 'BRZsshoot_10.avif',
          'BRZsshoot_11.avif', 'BRZsshoot_12.avif', 'BRZsshoot_13.avif', 'BRZsshoot_14.avif',
          'BRZsshoot_15.avif', 'BRZsshoot_16.avif', 'BRZsshoot_17.avif', 'BRZsshoot_18.avif',
          'BRZsshoot_19.avif', 'BRZsshoot_20.avif', 'BRZsshoot_21.avif', 'BRZsshoot_22.avif',
          'BRZsshoot_23.avif', 'BRZsshoot_24.avif', 'BRZsshoot_25.avif', 'BRZsshoot_26.avif',
          'BRZsshoot_27.avif', 'BRZsshoot_28.avif', 'BRZsshoot_29.avif', 'BRZsshoot_30.avif',
          'BRZsshoot_31.avif', 'BRZsshoot_32.avif', 'BRZsshoot_33.avif', 'BRZsshoot_35.avif',
          'BRZsshoot_36.avif', 'BRZsshoot_37.avif', 'BRZsshoot_38.avif', 'BRZsshoot_39.avif',
          'BRZsshoot_40.avif', 'BRZsshoot_41.avif',
        ],
      },
      {
        id: 'mini',
        label: 'MINI',
        basePath: '/assets/images/MINI/',
        images: [
          'mini_1.avif', 'mini_2.avif', 'mini_3.avif', 'mini_4.avif', 'mini_5.avif',
          'mini_6.avif', 'mini_7.avif', 'mini_8.avif', 'mini_9.avif', 'mini_10.avif',
          'mini_11.avif', 'mini_12.avif', 'mini_13.avif', 'mini_14.avif', 'mini_15.avif',
          'mini_16.avif', 'mini_17.avif', 'mini_18.avif',
        ],
      },
    ],
    /** @deprecated use collections[0].images — kept for homepage preview */
    images: Array.from({ length: 121 }, (_, i) => 'GTRs_' + (i + 1) + '.avif'),
  },

  pages: {
    home: {
      title: "FULL GREAT BROS · 富贵兄弟 · 深圳南山",
      initShowcase: true,
      initGallery: true,
      initRacingPreview: true,
      initScroll: true,
      components: [
        { mount: 'component-nav', file: 'FULLGREATBROS.html' },
        { mount: 'component-fgsauto', file: 'fgsauto.html' },
        { mount: 'component-racing-preview', file: 'racing-preview.html' },
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
    racing: {
      title: 'FG RACING DEPT. · Full Great Bros',
      initRacingPage: true,
      initScroll: true,
      components: [
        { mount: 'component-nav', file: 'site-nav.html' },
        { mount: 'component-racing-main', file: 'racing-main.html' },
        { mount: 'component-social', file: 'social.html' },
        { mount: 'component-footer', file: 'footer.html' },
      ],
    },
    fgsautoCases: {
      title: "案例展示 · FG'S AUTO · Full Great Bros",
      initFgsAutoCasesPage: true,
      initScroll: true,
      components: [
        { mount: 'component-nav', file: 'site-nav.html' },
        { mount: 'component-cases-main', file: 'fgsauto-cases-main.html' },
        { mount: 'component-footer', file: 'footer.html' },
      ],
    },
  },
};
