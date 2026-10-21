import { PARTS, PAGES } from './data.js';

export function sidebarExpanded(isDesktop, collapsed, drawerOpen) {
  return isDesktop ? !collapsed : drawerOpen;
}
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
};
const topicIndex = () => {
  const path = decodeURIComponent(location.pathname);
  return PAGES.findIndex((page) => path.endsWith(page.file));
};

function buildNav() {
  const nav = document.getElementById('toc');
  const index = topicIndex();
  if (nav) {
    nav.replaceChildren();
    let lastPart = 0;
    PAGES.forEach((page, pageIndex) => {
      if (page.part !== lastPart) {
        nav.append(el('div', 'nav-part', PARTS[page.part]));
        lastPart = page.part;
      }
      const item = el('div', 'nav-sec');
      if (pageIndex === index) item.classList.add('active');
      const link = el('a');
      link.href = `../${page.file}`;
      link.append(el('span', 'no', String(pageIndex + 1).padStart(2, '0')), el('span', '', page.title));
      if (pageIndex === index) link.setAttribute('aria-current', 'page');
      item.append(link);
      if (pageIndex === index) {
        const sub = el('div', 'nav-sub');
        sub.setAttribute('aria-label', 'On this page');
        document.querySelectorAll('.content h2[id], .content h3[id]').forEach((heading) => {
          const anchor = el('a', '', (heading.querySelector('.bt') || heading).textContent.trim());
          anchor.href = `#${heading.id}`;
          anchor.dataset.target = heading.id;
          sub.append(anchor);
        });
        item.append(sub);
      }
      nav.append(item);
    });
    if (index === -1) {
      nav.prepend(el('div', 'nav-part', 'Start'));
      const link = el('a', '', '← overview');
      link.href = '../../index.html';
      nav.insertBefore(link, nav.children[1]);
    }
  }
  const pager = document.getElementById('pager');
  if (!pager) return;
  pager.replaceChildren();
  if (index > 0) pager.append(pageLink(PAGES[index - 1], '← previous'));
  pager.append(el('span', 'spacer'));
  if (index >= 0 && index < PAGES.length - 1) pager.append(pageLink(PAGES[index + 1], 'next →', true));
}
function pageLink(page, direction, next = false) {
  const link = el('a', next ? 'next' : 'prev');
  link.href = `../${page.file}`;
  link.append(el('span', 'dir', direction), el('span', 'what', page.title));
  return link;
}

function updateSection() {
  const headings = [...document.querySelectorAll('.content h2[id], .content h3[id]')];
  const top = headings.filter((heading) => heading.getBoundingClientRect().top < innerHeight * .34).at(-1);
  document.querySelectorAll('.nav-sub a').forEach((link) => {
    const current = link.dataset.target === top?.id;
    link.classList.toggle('cur', current);
    if (current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
function wireProgress() {
  const bar = document.getElementById('progress');
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
    updateSection();
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

function wireToolbar(nav) {
  const desktop = matchMedia('(min-width: 1100px)');
  const toggle = document.getElementById('nav-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;
  toggle.setAttribute('aria-controls', 'toc');
  const close = (restore = true) => {
    document.body.classList.remove('nav-open');
    sync();
    if (restore) toggle.focus();
  };
  const sync = () => {
    const expanded = sidebarExpanded(desktop.matches, document.body.classList.contains('nav-collapsed'), document.body.classList.contains('nav-open'));
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.setAttribute('aria-label', desktop.matches ? (expanded ? 'Hide contents' : 'Show contents') : (expanded ? 'Close contents' : 'Open contents'));
    sidebar.inert = !expanded;
    sidebar.setAttribute('aria-hidden', String(!expanded));
  };
  const stored = (() => { try { return localStorage.getItem('ai-guide-nav') === '1'; } catch { return false; } })();
  if (desktop.matches && stored) document.body.classList.add('nav-collapsed');
  sync();
  toggle.addEventListener('click', () => {
    if (desktop.matches) {
      const collapsed = document.body.classList.toggle('nav-collapsed');
      try { localStorage.setItem('ai-guide-nav', collapsed ? '1' : ''); } catch { /* Storage may be disabled. */ }
    } else {
      document.body.classList.toggle('nav-open');
    }
    sync();
    if (!desktop.matches && document.body.classList.contains('nav-open')) nav?.querySelector('.toc-close')?.focus();
  });
  const closeButton = el('button', 'tbtn toc-close', 'Close contents');
  closeButton.type = 'button';
  closeButton.addEventListener('click', () => close());
  nav?.prepend(closeButton);
  sidebar.addEventListener('click', (event) => { if (!desktop.matches && event.target.closest('a')) close(); });
  document.addEventListener('click', (event) => {
    if (!desktop.matches && document.body.classList.contains('nav-open') && !event.target.closest('.sidebar') && !event.target.closest('#nav-toggle')) close();
  });
  document.addEventListener('keydown', (event) => {
    if (!document.body.classList.contains('nav-open')) return;
    if (event.key === 'Escape') { close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...sidebar.querySelectorAll('a[href],button:not([disabled]),input:not([disabled])')].filter((node) => node.getClientRects().length);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  desktop.addEventListener('change', () => { document.body.classList.remove('nav-open'); sync(); });
  const expandAll = document.getElementById('expand-all');
  expandAll?.setAttribute('aria-expanded', 'false');
  expandAll?.addEventListener('click', (event) => {
    const button = event.currentTarget;
    const open = !!(document.querySelector('.code-card:not(.open), .sol-item:not(.open)'));
    document.querySelectorAll('.code-card').forEach((card) => {
      card.classList.toggle('open', open);
      const control = card.querySelector('.cc-btn:last-of-type');
      if (control) { control.textContent = open ? 'close' : 'open'; control.setAttribute('aria-expanded', String(open)); }
    });
    document.querySelectorAll('.sol-item').forEach((item) => {
      item.classList.toggle('open', open);
      item.querySelector('.sol-head')?.setAttribute('aria-expanded', String(open));
    });
    button.classList.toggle('on', open);
    button.textContent = open ? 'collapse' : 'expand';
    button.setAttribute('aria-expanded', String(open));
  });
}

export function wireNavigation() {
  buildNav();
  wireToolbar(document.getElementById('toc'));
  wireProgress();
}
