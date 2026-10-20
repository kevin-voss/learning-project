/* app.js — renders content registry, builds nav, wires interactions. No dependencies. */
(() => {
  'use strict';

  const PARTS = {
    1: 'Part 1 · Foundations',
    2: 'Part 2 · Retrieval',
    3: 'Part 3 · Tools & agents',
    4: 'Part 4 · Memory & safety',
    5: 'Part 5 · Proof & production',
  };

  /* ── content registry (content/*.js call this) ────── */
  const registry = [];
  window.AI_PUSH = (entry) => {
    if (!entry || !entry.id || !entry.title || typeof entry.html !== 'string') {
      console.error('AI_PUSH: entry needs id, title, html', entry);
      return;
    }
    if (registry.some((s) => s.id === entry.id)) {
      console.error('AI_PUSH: duplicate id ' + entry.id);
      return;
    }
    registry.push(entry);
  };

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  /* ── render sections + collect h3 subnav ─────────── */
  function renderContent() {
    const mount = document.getElementById('content');
    if (!mount) return;
    registry.forEach((sec, i) => {
      const no = String(i + 1).padStart(2, '0');
      const section = el('section', 'topic');
      section.id = sec.id;

      const head = el('div', 'topic-head');
      head.appendChild(el('span', 'no', no));
      head.appendChild(el('h2', null, sec.title));
      if (sec.blurb) head.appendChild(el('p', 'lead', sec.blurb));
      section.appendChild(head);

      const body = el('div', 'topic-body');
      body.innerHTML = sec.html;
      section.appendChild(body);

      body.querySelectorAll('h3').forEach((h, j) => {
        if (!h.id) h.id = sec.id + '--' + (slug(h.textContent) || 's' + (j + 1));
      });
      mount.appendChild(section);
    });
  }

  /* ── sidebar nav ──────────────────────────────────── */
  function buildNav() {
    const nav = document.getElementById('toc');
    if (!nav) return;
    nav.innerHTML = '';
    const byPart = new Map();
    registry.forEach((sec) => {
      if (!byPart.has(sec.part)) byPart.set(sec.part, []);
      byPart.get(sec.part).push(sec);
    });

    byPart.forEach((secs, partNo) => {
      nav.appendChild(el('div', 'nav-part', PARTS[partNo] || 'Part ' + partNo));
      secs.forEach((sec) => {
        const item = el('div', 'nav-sec');
        item.dataset.target = sec.id;
        const title = el('span', null, sec.title);
        const no = el('span', 'no', String(registry.indexOf(sec) + 1).padStart(2, '0'));
        const a = el('a', null);
        a.href = '#' + sec.id;
        a.appendChild(no);
        a.appendChild(title);
        item.appendChild(a);

        const sub = el('div', 'nav-sub');
        document.querySelectorAll('#' + sec.id + ' h3').forEach((h) => {
          const s = el('a', null, h.textContent);
          s.href = '#' + h.id;
          s.dataset.target = h.id;
          sub.appendChild(s);
        });
        item.appendChild(sub);
        nav.appendChild(item);
      });
    });
  }

  /* ── scrollspy + progress ─────────────────────────── */
  function wireScrollSpy() {
    const bar = document.getElementById('progress');
    const onScroll = () => {
      if (bar) {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
      }
      document.querySelectorAll('.nav-sec.active').forEach((n) => n.classList.remove('active'));
      document.querySelectorAll('.nav-sub a.cur').forEach((n) => n.classList.remove('cur'));
      let current = null;
      document.querySelectorAll('section.topic').forEach((s) => {
        if (s.getBoundingClientRect().top < innerHeight * 0.33) current = s;
      });
      if (current) {
        const item = document.querySelector('.nav-sec[data-target="' + current.id + '"]');
        if (item) item.classList.add('active');
        let curH = null;
        current.querySelectorAll('h3').forEach((h) => {
          if (h.getBoundingClientRect().top < innerHeight * 0.33) curH = h;
        });
        if (curH) {
          const link = document.querySelector('.nav-sub a[data-target="' + curH.id + '"]');
          if (link) link.classList.add('cur');
        }
      }
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── code cards: wrap pre.code, collapse + copy ───── */
  function wireCodeCards() {
    document.querySelectorAll('pre.code').forEach((pre) => {
      const card = el('div', 'code-card');
      const bar = el('div', 'cc-bar');
      const dots = el('span', 'cc-dots', '<i></i><i></i><i></i>');
      const file = el('span', 'cc-file', pre.dataset.file || '');
      const lang = el('span', 'cc-lang', pre.dataset.lang || 'code');

      const copyBtn = el('button', 'cc-btn', 'copy');
      copyBtn.type = 'button';
      copyBtn.addEventListener('click', () => copyText(pre.innerText, copyBtn));

      const exBtn = el('button', 'cc-btn', 'open');
      exBtn.type = 'button';
      exBtn.addEventListener('click', () => {
        const open = card.classList.toggle('open');
        exBtn.textContent = open ? 'close' : 'open';
      });

      bar.appendChild(dots);
      if (pre.dataset.file) bar.appendChild(file);
      bar.appendChild(lang);
      bar.appendChild(copyBtn);
      bar.appendChild(exBtn);

      const body = el('div', 'cc-body');
      pre.replaceWith(card);
      card.appendChild(bar);
      body.appendChild(pre);
      card.appendChild(body);
    });
  }

  function copyText(text, btn) {
    const done = () => {
      const old = btn.textContent;
      btn.textContent = 'copied';
      setTimeout(() => { btn.textContent = old; }, 1200);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, () => legacyCopy(text, done));
    } else {
      legacyCopy(text, done);
    }
  }
  function legacyCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* no-op */ }
    ta.remove();
  }

  /* ── tooltips: one floating node, clamped to viewport ── */
  function wireTooltips() {
    const tip = el('div');
    tip.id = 'tooltip';
    tip.setAttribute('role', 'tooltip');
    document.body.appendChild(tip);
    let current = null;

    function show(target) {
      current = target;
      tip.textContent = target.dataset.tip;
      tip.style.visibility = 'hidden';
      tip.classList.add('show');
      const r = target.getBoundingClientRect();
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      const pad = 10;
      let x = r.left + r.width / 2 - tw / 2;
      x = Math.max(pad, Math.min(x, innerWidth - tw - pad));
      let y;
      if (r.top - th - pad >= 0) {
        y = r.top - th - 6;               /* prefer above */
      } else {
        y = Math.min(r.bottom + 6, innerHeight - th - pad); /* flip below */
      }
      tip.style.left = x + 'px';
      tip.style.top = y + 'px';
      tip.style.visibility = 'visible';
    }
    function hide() {
      tip.classList.remove('show');
      current = null;
    }

    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('[data-tip]');
      if (t && t !== current) show(t);
      else if (!t && current) hide();
    });
    document.addEventListener('focusin', (e) => {
      const t = e.target.closest('[data-tip]');
      if (t) show(t);
    });
    document.addEventListener('focusout', hide);
    document.addEventListener('scroll', () => { if (current) show(current); }, { passive: true });
    addEventListener('resize', () => { if (current) show(current); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
  }

  /* ── mermaid via CDN, per-diagram isolation ───────── */
  async function wireMermaid() {
    const nodes = Array.from(document.querySelectorAll('pre.mermaid'));
    if (!nodes.length) return;
    let mermaid = null;
    try {
      mermaid = (await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        themeVariables: {
          background: 'transparent',
          fontFamily: 'JetBrains Mono, Menlo, monospace',
          fontSize: '13px',
        },
      });
    } catch (err) {
      mermaid = null;
    }
    nodes.forEach((n) => {
      if (!mermaid) return fallback(n);
      mermaid.run({ nodes: [n] }).catch(() => fallback(n));
    });
    function fallback(node) {
      node.setAttribute('src-fallback', '');
      if (!node.parentElement.querySelector('.diag-note')) {
        const note = el('div', 'diag-note', 'offline · diagram source shown (mermaid loads from CDN once online)');
        node.parentElement.appendChild(note);
      }
    }
  }

  /* ── toolbar: filter, expand all, print, nav toggle ── */
  function wireToolbar() {
    const filter = document.getElementById('toc-filter');
    if (filter) {
      filter.addEventListener('input', () => {
        const q = filter.value.trim().toLowerCase();
        document.querySelectorAll('#toc .nav-sec').forEach((item) => {
          const hit = !q || item.textContent.toLowerCase().includes(q);
          item.style.display = hit ? '' : 'none';
        });
        document.querySelectorAll('#toc .nav-part').forEach((p) => {
          let any = false;
          let n = p.nextElementSibling;
          while (n && !n.classList.contains('nav-part')) {
            if (n.classList.contains('nav-sec') && n.style.display !== 'none') any = true;
            n = n.nextElementSibling;
          }
          p.style.display = any ? '' : 'none';
        });
      });
      addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== filter) {
          e.preventDefault();
          filter.focus();
        }
      });
    }

    const exAll = document.getElementById('expand-all');
    if (exAll) {
      exAll.addEventListener('click', () => {
        const cards = document.querySelectorAll('.code-card');
        const openAny = document.querySelector('.code-card:not(.open)');
        cards.forEach((c) => {
          c.classList.toggle('open', !!openAny);
          const b = c.querySelector('.cc-btn:last-of-type');
          if (b) b.textContent = openAny ? 'close' : 'open';
        });
        exAll.classList.toggle('on', !!openAny);
      });
    }

    const printBtn = document.getElementById('print-btn');
    if (printBtn) printBtn.addEventListener('click', () => print());

    const navToggle = document.getElementById('nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (navToggle && sidebar) {
      navToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
      sidebar.addEventListener('click', (e) => {
        if (e.target.closest('a')) sidebar.classList.remove('open');
      });
    }
  }

  /* ── boot ─────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    renderContent();
    buildNav();
    wireCodeCards();
    wireTooltips();
    wireToolbar();
    wireScrollSpy();
    wireMermaid();
  });
})();
