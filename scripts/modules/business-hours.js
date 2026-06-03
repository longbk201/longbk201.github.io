/** Live open/closed status from shop hours (visitor sees current shop-local time). */

function parseMinutes(time24) {
  const [h, m] = time24.split(':').map(Number);
  return h * 60 + m;
}

function formatTime12(time24) {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

export function getShopClock(timezone) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })
      .formatToParts(new Date())
      .filter((p) => p.type !== 'literal')
      .map((p) => [p.type, p.value])
  );

  const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    day: dayMap[parts.weekday] ?? 0,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

export function getHoursStatus(hoursCfg) {
  const tz = hoursCfg.timezone || 'Asia/Shanghai';
  const { day, minutes } = getShopClock(tz);
  const block = (hoursCfg.schedule || []).find((s) => s.days?.includes(day));

  if (!block) {
    return { isOpen: false, closedToday: true, block: null, tz };
  }

  const openMin = parseMinutes(block.open);
  const closeMin = parseMinutes(block.close);
  const isOpen = minutes >= openMin && minutes <= closeMin;

  return { isOpen, closedToday: false, block, tz };
}

function statusLines(hoursCfg, status) {
  const labels = hoursCfg.labels || {};
  const block = status.block;

  if (status.isOpen) {
    return {
      en: labels.openNow || 'Open now',
      zh: labels.openNowZh || '营业中',
      todayEn: block
        ? `${labels.openToday || 'Open today'} · ${formatTime12(block.open)} – ${formatTime12(block.close)}`
        : '',
      todayZh: block
        ? `${labels.openTodayZh || '今日营业'} · ${block.open}–${block.close}`
        : '',
      state: 'open',
    };
  }

  if (status.closedToday) {
    return {
      en: labels.closedToday || 'Closed today',
      zh: labels.closedTodayZh || '今日休息',
      todayEn: '',
      todayZh: '',
      state: 'closed-today',
    };
  }

  return {
    en: labels.closed || 'Closed',
    zh: labels.closedZh || '已打烊',
    todayEn: block
      ? `${labels.openToday || 'Open today'} · ${formatTime12(block.open)} – ${formatTime12(block.close)}`
      : '',
    todayZh: block ? `${labels.openTodayZh || '今日营业'} · ${block.open}–${block.close}` : '',
    state: 'closed',
  };
}

function renderHoursRoot(root, hoursCfg, status) {
  const lines = statusLines(hoursCfg, status);
  const labels = hoursCfg.labels || {};

  root.classList.toggle('shop-hours--open', status.isOpen);
  root.classList.toggle('shop-hours--closed', !status.isOpen);

  const dot = root.querySelector('.shop-hours-dot');
  const statusText = root.querySelector('.shop-hours-status-text');
  const todayEn = root.querySelector('.shop-hours-today');
  const scheduleEn = root.querySelector('.shop-hours-schedule');
  const scheduleZh = root.querySelector('.shop-hours-schedule-zh');

  if (dot) {
    dot.classList.toggle('is-open', status.isOpen);
    dot.classList.toggle('is-closed', !status.isOpen);
  }

  if (statusText) {
    statusText.innerHTML =
      `<span class="shop-hours-status-en">${lines.en}</span>` +
      `<span class="shop-hours-status-zh">${lines.zh}</span>`;
  }

  if (todayEn) {
    if (lines.todayEn) {
      todayEn.hidden = false;
      todayEn.innerHTML =
        `<span class="shop-hours-today-en">${lines.todayEn}</span>` +
        (lines.todayZh ? `<span class="shop-hours-today-zh">${lines.todayZh}</span>` : '');
    } else {
      todayEn.hidden = true;
    }
  }

  if (scheduleEn && labels.hoursRange) scheduleEn.textContent = labels.hoursRange;
  if (scheduleZh && labels.hoursRangeZh) scheduleZh.textContent = labels.hoursRangeZh;

  const note = root.querySelector('.shop-hours-note');
  if (note && (labels.sundayNote || labels.sundayNoteZh)) {
    const noteEn = note.querySelector('.shop-hours-note-en');
    const noteZh = note.querySelector('.shop-hours-note-zh');
    if (noteEn && labels.sundayNote) noteEn.textContent = labels.sundayNote;
    if (noteZh && labels.sundayNoteZh) noteZh.textContent = labels.sundayNoteZh;
  }
}

export function initBusinessHours(cfg) {
  const hoursCfg = cfg?.hours;
  if (!hoursCfg) return;

  const roots = document.querySelectorAll('[data-shop-hours]');
  if (!roots.length) return;

  const tick = () => {
    const status = getHoursStatus(hoursCfg);
    roots.forEach((root) => renderHoursRoot(root, hoursCfg, status));
  };

  tick();
  window.setInterval(tick, 60_000);
}
