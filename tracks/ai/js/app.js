/* app.js — shared runtime for the topic pages. No dependencies.
   Pages are plain HTML in content/<folder>/<id>.html. */
(() => {
  'use strict';

  const PARTS = {
    1: 'Foundations',
    2: 'Retrieval',
    3: 'Tools & agents',
    4: 'Memory & safety',
    5: 'Proof & production',
  };

  const PAGES = [
    { id: 'llm-internals',    part: 1, file: '01-foundations/llm-internals.html',    title: 'How LLMs actually work' },
    { id: 'ml-multimodal',    part: 1, file: '01-foundations/ml-multimodal.html',    title: 'ML just enough · multimodal' },
    { id: 'finetune-decide',  part: 1, file: '01-foundations/finetune-decide.html',  title: 'Fine-tuning vs RAG vs prompting' },
    { id: 'tokens-cost',      part: 1, file: '02-tokens-context/tokens-cost.html',   title: 'Tokens, cost, caching' },
    { id: 'context-budget',   part: 1, file: '02-tokens-context/context-budget.html', title: 'Context budgeting' },
    { id: 'rag-overview',     part: 2, file: '03-rag-search/rag-overview.html',      title: 'RAG the big picture' },
    { id: 'chunking',         part: 2, file: '03-rag-search/chunking.html',          title: 'Chunking' },
    { id: 'embeddings',       part: 2, file: '03-rag-search/embeddings.html',        title: 'Embeddings & vector stores' },
    { id: 'search-rerank',    part: 2, file: '03-rag-search/search-rerank.html',     title: 'Search & reranking' },
    { id: 'rag-variants',     part: 2, file: '03-rag-search/rag-variants.html',      title: 'RAG variants' },
    { id: 'tool-calling',     part: 3, file: '04-tools-mcp/tool-calling.html',       title: 'Tool calling & structured output' },
    { id: 'mcp',              part: 3, file: '04-tools-mcp/mcp.html',                title: 'MCP protocol' },
    { id: 'ag-ui',            part: 3, file: '04-tools-mcp/ag-ui.html',              title: 'AG-UI generative components' },
    { id: 'agent-patterns',   part: 3, file: '05-agents-orchestration/agent-patterns.html', title: 'Agent patterns' },
    { id: 'graphs',           part: 3, file: '05-agents-orchestration/graphs.html',  title: 'Orchestration graphs' },
    { id: 'ops',              part: 3, file: '05-agents-orchestration/ops.html',     title: 'Durable ops' },
    { id: 'ecosystem',        part: 3, file: '05-agents-orchestration/ecosystem.html', title: 'Ecosystem' },
    { id: 'memory',           part: 4, file: '06-memory/memory.html',                title: 'Memory' },
    { id: 'injection',        part: 4, file: '07-security/injection.html',           title: 'Prompt injection & exfil' },
    { id: 'guardrails',       part: 4, file: '07-security/guardrails.html',          title: 'Guardrails & least privilege' },
    { id: 'evals',            part: 5, file: '08-evals/evals.html',                  title: 'Evals & observability' },
    { id: 'architecture',     part: 5, file: '09-systems/architecture.html',         title: 'System architecture' },
    { id: 'aws',              part: 5, file: '09-systems/aws.html',                  title: 'Systems on AWS' },
    { id: 'quickref',         part: 5, file: '10-quickref/quickref.html',            title: 'The 30-second layer' },
  ];

  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  const currentPage = () => {
    const path = decodeURIComponent(location.pathname);
    return PAGES.findIndex((p) => path.endsWith('/' + p.file) || path.endsWith(p.file));
  };

  /* ── sidebar + pager ─────────────────────────────── */
  function buildNav() {
    const nav = document.getElementById('toc');
    if (nav) {
      nav.innerHTML = '';
      const idx = currentPage();
      let lastPart = 0;
      PAGES.forEach((p, i) => {
        if (p.part !== lastPart) {
          nav.appendChild(el('div', 'nav-part', PARTS[p.part] || 'Part ' + p.part));
          lastPart = p.part;
        }
        const item = el('div', 'nav-sec');
        if (i === idx) item.classList.add('active');
        const a = el('a');
        a.href = '../' + p.file;
        a.appendChild(el('span', 'no', String(i + 1).padStart(2, '0')));
        a.appendChild(el('span', null, p.title));
        item.appendChild(a);
        if (i === idx) {
          const sub = el('div', 'nav-sub');
          document.querySelectorAll('.content h3[id]').forEach((h) => {
            const s = el('a', null, h.textContent);
            s.href = '#' + h.id;
            s.dataset.target = h.id;
            sub.appendChild(s);
          });
          item.appendChild(sub);
        }
        nav.appendChild(item);
      });
      if (idx === -1) {
        const home = el('div', 'nav-part', 'Start');
        nav.prepend(home);
        const a = el('a', null, '← overview');
        a.href = '../index.html';
        nav.insertBefore(a, home.nextSibling);
      }
    }

    const pager = document.getElementById('pager');
    if (pager) {
      const idx = currentPage();
      const prev = idx > 0 ? PAGES[idx - 1] : null;
      const next = idx >= 0 && idx < PAGES.length - 1 ? PAGES[idx + 1] : null;
      pager.innerHTML = '';
      if (prev) pager.appendChild(link(prev, '← previous', '../' + prev.file));
      pager.appendChild(el('span', 'spacer'));
      if (next) pager.appendChild(link(next, 'next →', '../' + next.file, true));
    }
    function link(p, dir, href, isNext) {
      const a = el('a', isNext ? 'next' : 'prev');
      a.href = href;
      a.appendChild(el('span', 'dir', dir));
      a.appendChild(el('span', 'what', p.title));
      return a;
    }
  }

  /* ── scrollspy + progress ─────────────────────────── */
  function wireScrollSpy() {
    const bar = document.getElementById('progress');
    const onScroll = () => {
      if (bar) {
        const max = document.documentElement.scrollHeight - innerHeight;
        bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
      }
      document.querySelectorAll('.nav-sub a.cur').forEach((n) => n.classList.remove('cur'));
      let curH = null;
      document.querySelectorAll('.content h3[id]').forEach((h) => {
        if (h.getBoundingClientRect().top < innerHeight * 0.33) curH = h;
      });
      if (curH) {
        const link = document.querySelector('.nav-sub a[data-target="' + curH.id + '"]');
        if (link) link.classList.add('cur');
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
      if (pre.dataset.file) bar.appendChild(el('span', 'cc-file', pre.dataset.file));
      bar.appendChild(el('span', 'cc-lang', pre.dataset.lang || 'code'));

      const copyBtn = el('button', 'cc-btn', 'copy');
      copyBtn.type = 'button';
      copyBtn.addEventListener('click', () => copyText(pre.innerText, copyBtn));

      const exBtn = el('button', 'cc-btn', 'open');
      exBtn.type = 'button';
      exBtn.addEventListener('click', () => {
        const open = card.classList.toggle('open');
        exBtn.textContent = open ? 'close' : 'open';
      });

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
        y = r.top - th - 6;
      } else {
        y = Math.min(r.bottom + 6, innerHeight - th - pad);
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

  /* ── solutions accordion ─────────────────────────── */
  function wireAccordions() {
    document.addEventListener('click', (e) => {
      const head = e.target.closest('.sol-head');
      if (head) head.closest('.sol-item').classList.toggle('open');
    });
    const openFor = (hash) => {
      if (!hash || hash === '#') return;
      let target;
      try { target = document.querySelector(decodeURIComponent(hash)); } catch (err) { return; }
      if (!target) return;
      const item = target.closest('.sol-item');
      if (item) item.classList.add('open');
    };
    openFor(location.hash);
    addEventListener('hashchange', () => openFor(location.hash));
  }

  /* ── mermaid via CDN, full width, readable ────────── */
  async function wireMermaid() {
    const nodes = Array.from(document.querySelectorAll('pre.mermaid'));
    if (!nodes.length) return;
    let mermaid = null;
    try {
      mermaid = (await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs')).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'loose',
        flowchart: { htmlLabels: true, useMaxWidth: true, nodeSpacing: 48, rankSpacing: 64, padding: 12 },
        sequence: { useMaxWidth: true, actorFontSize: 16, actorFontWeight: 600, messageFontSize: 15, noteFontSize: 14, wrap: true },
        themeVariables: {
          background: 'transparent',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '16px',
          /* light champagne fills + dark text: readable on dark page and on paper */
          primaryColor: '#ece5d8',
          primaryTextColor: '#141821',
          primaryBorderColor: '#a2926f',
          secondaryColor: '#e4dccb',
          tertiaryColor: '#f2ede2',
          textColor: '#aab5c5',
          lineColor: '#a2926f',
          edgeLabelBackground: 'transparent',
          clusterBkg: 'transparent',
          clusterBorder: '#5d6673',
          titleColor: '#c7d3e2',
          noteBkgColor: '#f2ede2',
          noteTextColor: '#141821',
          noteBorderColor: '#a2926f',
          actorBkg: '#ece5d8',
          actorBorder: '#a2926f',
          actorTextColor: '#141821',
          signalColor: '#9aa7ba',
          signalTextColor: '#aab5c5',
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
          item.style.display = !q || item.textContent.toLowerCase().includes(q) ? '' : 'none';
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
        const open = !!(document.querySelector('.code-card:not(.open)') || document.querySelector('.sol-item:not(.open)'));
        document.querySelectorAll('.code-card').forEach((c) => {
          c.classList.toggle('open', open);
          const b = c.querySelector('.cc-btn:last-of-type');
          if (b) b.textContent = open ? 'close' : 'open';
        });
        document.querySelectorAll('.sol-item').forEach((s) => s.classList.toggle('open', open));
        exAll.classList.toggle('on', open);
      });
    }

    const printBtn = document.getElementById('print-btn');
    if (printBtn) printBtn.addEventListener('click', () => print());

    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        if (matchMedia('(max-width: 1099px)').matches) {
          document.body.classList.toggle('nav-open');
        } else {
          const collapsed = document.body.classList.toggle('nav-collapsed');
          try { localStorage.setItem('ai-guide-nav', collapsed ? '1' : ''); } catch (e) { /* no-op */ }
        }
      });
      try {
        if (localStorage.getItem('ai-guide-nav') === '1') document.body.classList.add('nav-collapsed');
      } catch (e) { /* no-op */ }
      document.querySelector('.sidebar')?.addEventListener('click', (e) => {
        if (e.target.closest('a')) document.body.classList.remove('nav-open');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    wireCodeCards();
    wireTooltips();
    wireAccordions();
    wireToolbar();
    wireScrollSpy();
    wireMermaid();
  });
})();
