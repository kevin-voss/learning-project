import { PAGES } from '../nav/data.js';
import { solId } from '../nav/search.js';

const el = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text != null) node.textContent = text;
  return node;
};

function copyText(text, button) {
  const done = () => {
    const previous = button.textContent;
    button.textContent = 'copied';
    setTimeout(() => { button.textContent = previous; }, 1200);
  };
  const fallback = () => {
    const area = el('textarea');
    area.value = text;
    area.style.cssText = 'position:fixed;opacity:0';
    document.body.append(area);
    area.select();
    try { document.execCommand('copy'); done(); } catch { /* Clipboard unavailable. */ }
    area.remove();
  };
  if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
  else fallback();
}

function wireCodeCards() {
  document.querySelectorAll('pre.code').forEach((pre) => {
    const card = el('div', 'code-card');
    const bar = el('div', 'cc-bar');
    if (pre.dataset.file) bar.append(el('span', 'cc-file', pre.dataset.file));
    bar.append(el('span', 'cc-lang', pre.dataset.lang || 'code'));
    const copy = el('button', 'cc-btn', 'copy');
    copy.type = 'button';
    copy.addEventListener('click', () => copyText(pre.innerText, copy));
    const toggle = el('button', 'cc-btn', 'open');
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const open = card.classList.toggle('open');
      toggle.textContent = open ? 'close' : 'open';
      toggle.setAttribute('aria-expanded', String(open));
    });
    bar.append(copy, toggle);
    const body = el('div', 'cc-body');
    pre.replaceWith(card);
    body.append(pre);
    card.append(bar, body);
  });
}

function wireTooltips() {
  const tip = el('div');
  tip.id = 'tooltip';
  tip.setAttribute('role', 'tooltip');
  document.body.append(tip);
  let current;
  const hide = () => { tip.classList.remove('show'); current = null; };
  const show = (target) => {
    current = target;
    tip.textContent = target.dataset.tip;
    tip.style.visibility = 'hidden';
    tip.classList.add('show');
    const rect = target.getBoundingClientRect();
    const pad = 10;
    const x = Math.max(pad, Math.min(rect.left + rect.width / 2 - tip.offsetWidth / 2, innerWidth - tip.offsetWidth - pad));
    const y = rect.top - tip.offsetHeight - pad >= 0 ? rect.top - tip.offsetHeight - 6 : Math.min(rect.bottom + 6, innerHeight - tip.offsetHeight - pad);
    tip.style.left = `${x}px`;
    tip.style.top = `${y}px`;
    tip.style.visibility = 'visible';
  };
  document.addEventListener('mouseover', (event) => {
    const target = event.target.closest('[data-tip]');
    if (target && target !== current) show(target);
    else if (!target && current) hide();
  });
  document.addEventListener('focusin', (event) => { const target = event.target.closest('[data-tip]'); if (target) show(target); });
  document.addEventListener('focusout', hide);
  document.addEventListener('scroll', () => { if (current) show(current); }, { passive: true });
  addEventListener('resize', () => { if (current) show(current); });
  addEventListener('keydown', (event) => { if (event.key === 'Escape') hide(); });
}

function wireAccordions() {
  const path = decodeURIComponent(location.pathname);
  const page = PAGES.find((entry) => path.endsWith(entry.file));
  document.querySelectorAll('.sol-item .sol-head').forEach((head) => {
    const item = head.closest('.sol-item');
    const name = head.querySelector('.sol-name')?.firstChild?.textContent?.trim();
    if (page && name && !item.id) item.id = solId(page.id, name);
    head.setAttribute('aria-expanded', String(item.classList.contains('open')));
  });
  document.addEventListener('click', (event) => {
    const head = event.target.closest('.sol-head');
    const item = head?.closest('.sol-item');
    if (item) {
      const open = item.classList.toggle('open');
      head.setAttribute('aria-expanded', String(open));
    }
  });
  const openFor = (hash) => {
    if (!hash || hash === '#') return;
    let target;
    try { target = document.querySelector(decodeURIComponent(hash)); } catch { return; }
    const item = target?.closest('.sol-item');
    if (!item) return;
    item.classList.add('open');
    item.querySelector('.sol-head')?.setAttribute('aria-expanded', 'true');
    if (target !== item) return;
    /* Diagrams above the card render late and shift layout; keep the card pinned until the reader takes over. */
    let userMoved = false;
    const stop = () => { userMoved = true; };
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((type) => addEventListener(type, stop, { once: true, passive: true }));
    const pin = () => { if (!userMoved) item.scrollIntoView({ block: 'start', behavior: 'instant' }); };
    pin();
    addEventListener('load', pin, { once: true });
    [400, 1200, 2500].forEach((delay) => setTimeout(pin, delay));
  };
  openFor(location.hash);
  addEventListener('hashchange', () => openFor(location.hash));
}

export function wireContent() {
  wireCodeCards();
  wireTooltips();
  wireAccordions();
}
