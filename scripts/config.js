/** Site-wide content — edit contact & social links here. */
window.FGS_CONFIG = {
  /** Phone + maps — applied by apply-config.js */
  phone: {
    display: '+86 13686481010',
    tel: '+8613686481010',
  },
  location: {
    mapsUrl: 'https://maps.google.com/?q=Shenzhen+Guangdong+China',
  },

  /**
   * Social platforms — rendered by scripts/modules/social.js
   * type: "link" opens url in new tab | "qr" shows qrImage popover on click
   */
  social: [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: 'assets/svg/youtube.svg',
      type: 'link',
      url: 'https://www.youtube.com/@fullgreatbros001',
      tooltip: '@fullgreatbros001',
    },
    {
      id: 'bilibili',
      name: 'Bilibili',
      icon: 'assets/svg/bilibili.svg',
      type: 'link',
      url: 'https://space.bilibili.com/3546866983635207?spm_id_from=333.337.0.0',
      tooltip: '@富贵兄弟FGmotorsport',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: 'assets/svg/instagram.svg',
      type: 'link',
      url: 'https://www.instagram.com/fg_bros_auto/',
      tooltip: '@fgbrosauto',
    },
    {
      id: 'rednote',
      name: '小红书',
      icon: 'assets/svg/rednote.svg',
      type: 'qr',
      qrImage: 'assets/svg/rednoteQR.svg',
      tooltip: "#FG'S AUTO富贵车房",
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: 'assets/svg/tiktok.svg',
      type: 'qr',
      qrImage: 'assets/svg/tiktokQR.svg',
      tooltip: "@富贵车房 FG'S AUTO",
    },
  ],

  fgsAuto: {
    url: 'https://fullgreatbros.com/FGAUTO',
    logo: 'assets/images/FGSAUTOLOGO.svg',
    tag: 'Local Auto Shop · Shenzhen',
  },

  gallery: [
    {
      src: 'assets/images/test%20image/0C1A3151.jpg',
      alt: 'FG\'S AUTO shop floor',
      label: 'Shop Floor',
      icon: 'ti-photo',
      tall: true,
    },
    {
      src: 'assets/images/test%20image/0Z5A1184.jpg',
      alt: 'Oil change service',
      label: 'Oil Change',
      icon: 'ti-droplet',
    },
    {
      src: 'assets/images/test%20image/0Z5A6892.jpg',
      alt: 'Tire service',
      label: 'Tire Service',
      icon: 'ti-circle',
    },
    {
      src: 'assets/images/test%20image/0Z5A1976.jpg',
      alt: 'Brake service',
      label: 'Brakes',
      icon: 'ti-wave-square',
    },
    {
      src: 'assets/images/test%20image/SF300658.jpg',
      alt: 'Before and after',
      label: 'Before & After',
      icon: 'ti-star',
    },
  ],

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
      icon: 'ti-rotate-clockwise',
    },
  ],

  components: [
    { mount: 'component-nav', file: 'FULLGREATBROS.html' },
    { mount: 'component-hero', file: 'hero.html' },
    { mount: 'component-stats', file: 'stats.html' },
    { mount: 'component-gallery', file: 'gallery.html' },
    { mount: 'component-about', file: 'about.html' },
    { mount: 'component-social', file: 'social.html' },
    { mount: 'component-contact', file: 'contact.html' },
    { mount: 'component-footer', file: 'footer.html' },
  ],
};
