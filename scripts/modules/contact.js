import { bindQrTrigger } from './social.js';

/** Contact page: WeChat QR popover (reuses social QR layer). */
export function initContact(cfg) {
  const wechatBtn = document.getElementById('cta-wechat');
  const wechat = cfg?.wechat;
  if (!wechatBtn || !wechat?.qrImage) return;

  bindQrTrigger(wechatBtn, {
    name: 'WeChat',
    qrImage: wechat.qrImage,
  });
}
