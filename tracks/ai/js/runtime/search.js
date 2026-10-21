import { PARTS, PAGES } from './data.js';

/* Fuzzy matching: every query word must appear in order inside the text; contiguous runs and word starts score higher. */
export function fuzzyScore(query, text) {
  const words = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return { score: 0, hits: [] };
  const haystack = text.toLocaleLowerCase();
  let total = 0;
  const hits = [];
  for (const word of words) {
    const exact = haystack.indexOf(word);
    if (exact !== -1) {
      const start = exact === 0 || /[\s\-·/(&]/.test(haystack[exact - 1]);
      total += word.length * 3 + (start ? 6 : 0);
      for (let i = 0; i < word.length; i += 1) hits.push(exact + i);
      continue;
    }
    let from = 0;
    let run = 0;
    let score = 0;
    for (const char of word) {
      const index = haystack.indexOf(char, from);
      if (index === -1) return null;
      run = index === from && from > 0 ? run + 1 : 0;
      const start = index === 0 || /[\s\-·/(&]/.test(haystack[index - 1]);
      score += 1 + run * 2 + (start ? 3 : 0) - Math.min(index - from, 6) * .3;
      hits.push(index);
      from = index + 1;
    }
    if (score < word.length * .9) return null;
    total += score;
  }
  return { score: total - text.length * .01, hits: [...new Set(hits)].sort((a, b) => a - b) };
}

const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
};
const slug = (text) => text.toLocaleLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);
export const solId = (pageId, name) => `${pageId}--sol-${slug(name)}`;

function baseEntries(prefix) {
  return PAGES.map((page, index) => ({
    kind: 'Chapter', title: page.title, context: `${String(index + 1).padStart(2, '0')} · ${PARTS[page.part]}`,
    href: `${prefix}${page.file}`, boost: 8,
  }));
}

function pageEntries(page, html, prefix) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const href = `${prefix}${page.file}`;
  const entries = [];
  const context = page.title;
  doc.querySelectorAll('.content h2[id], .content h3[id]').forEach((heading) => {
    const label = heading.querySelector('.bh')?.textContent || heading.textContent;
    entries.push({ kind: 'Section', title: label.trim(), context, href: `${href}#${heading.id}`, boost: 4 });
  });
  doc.querySelectorAll('.sol-item').forEach((item) => {
    const name = item.querySelector('.sol-name')?.firstChild?.textContent?.trim();
    if (!name) return;
    entries.push({ kind: 'Concept', title: name, context, detail: item.querySelector('.sol-sum')?.textContent.trim(), href: `${href}#${solId(page.id, name)}`, boost: 3 });
  });
  doc.querySelectorAll('[data-tip]').forEach((term) => {
    entries.push({ kind: 'Term', title: term.textContent.trim(), context, detail: term.dataset.tip, href, boost: 2 });
  });
  doc.querySelectorAll('.content li, .content p, .content td').forEach((block) => {
    const text = block.textContent.replace(/\s+/g, ' ').trim();
    if (text.length < 24) return;
    const anchor = block.closest('.sol-item');
    const name = anchor?.querySelector('.sol-name')?.firstChild?.textContent?.trim();
    entries.push({ kind: 'Text', title: text, context, href: name ? `${href}#${solId(page.id, name)}` : href, boost: 0, fullText: true });
  });
  return entries;
}

function textMatch(query, text) {
  const words = query.toLocaleLowerCase().split(/\s+/).filter((word) => word.length > 1);
  const haystack = text.toLocaleLowerCase();
  if (!words.length || !words.every((word) => haystack.includes(word))) return null;
  const first = haystack.indexOf(words[0]);
  return { score: words.length * 2 - 4, first };
}

function snippet(text, first) {
  const start = Math.max(0, first - 50);
  return `${start ? '…' : ''}${text.slice(start, start + 150)}${start + 150 < text.length ? '…' : ''}`;
}

function highlighted(text, hits) {
  const fragment = document.createDocumentFragment();
  const set = new Set(hits);
  let buffer = '';
  let marked = false;
  const flush = () => {
    if (!buffer) return;
    fragment.append(marked ? el('mark', '', buffer) : document.createTextNode(buffer));
    buffer = '';
  };
  [...text].forEach((char, index) => {
    const isHit = set.has(index);
    if (isHit !== marked) { flush(); marked = isHit; }
    buffer += char;
  });
  flush();
  return fragment;
}

export function wireSearch() {
  const trigger = document.getElementById('search-open');
  if (!trigger) return;
  const onTopic = location.pathname.includes('/content/');
  const prefix = onTopic ? '../' : 'content/';
  let entries = baseEntries(prefix);
  let loading = null;
  const load = () => {
    loading ||= Promise.all(PAGES.map((page) => fetch(new URL(`${prefix}${page.file}`, location.href))
      .then((response) => (response.ok ? response.text() : ''))
      .then((html) => (html ? pageEntries(page, html, prefix) : []))
      .catch(() => [])))
      .then((lists) => { entries = [...baseEntries(prefix), ...lists.flat()]; });
    return loading;
  };

  const dialog = el('dialog', 'search');
  dialog.setAttribute('aria-label', 'Search the guide');
  const box = el('div', 'search-box');
  const input = el('input');
  Object.assign(input, { type: 'search', placeholder: 'Search chapters, sections, concepts, terms…', autocomplete: 'off', spellcheck: false });
  input.setAttribute('aria-label', 'Search the guide');
  input.setAttribute('aria-controls', 'search-results');
  const hint = el('kbd', 'search-esc', 'esc');
  box.append(input, hint);
  const list = el('ol', 'search-results');
  list.id = 'search-results';
  list.setAttribute('role', 'listbox');
  const footer = el('div', 'search-foot', '↑ ↓ to move · enter to open · fuzzy: "kv cach", "rrf", "agent card"');
  dialog.append(box, list, footer);
  document.body.append(dialog);
  let active = 0;
  let shown = [];

  const setActive = (index) => {
    active = Math.max(0, Math.min(index, shown.length - 1));
    [...list.children].forEach((item, i) => item.setAttribute('aria-selected', String(i === active)));
    list.children[active]?.scrollIntoView({ block: 'nearest' });
  };
  const render = () => {
    const query = input.value.trim();
    list.replaceChildren();
    if (!query) {
      shown = entries.filter((entry) => entry.kind === 'Chapter');
    } else {
      const ranked = [];
      for (const entry of entries) {
        if (entry.fullText) {
          const match = textMatch(query, entry.title);
          if (match) ranked.push({ entry, score: match.score, hits: [], text: snippet(entry.title, match.first) });
          continue;
        }
        const titleMatch = fuzzyScore(query, entry.title);
        const detailMatch = !titleMatch && entry.detail && textMatch(query, entry.detail);
        if (titleMatch) ranked.push({ entry, score: titleMatch.score + entry.boost, hits: titleMatch.hits });
        else if (detailMatch) ranked.push({ entry, score: detailMatch.score + entry.boost, hits: [] });
      }
      ranked.sort((a, b) => b.score - a.score);
      const seen = new Set();
      shown = ranked.filter(({ entry, text }) => {
        const key = `${entry.href}|${text || entry.title}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).slice(0, 40);
    }
    if (query && !shown.length) list.append(el('li', 'search-empty', 'No matches. Try fewer letters or another word.'));
    shown.forEach((result, index) => {
      const entry = result.entry || result;
      const item = el('li');
      item.setAttribute('role', 'option');
      const link = el('a');
      link.href = entry.href;
      link.tabIndex = -1;
      const head = el('span', 'sr-head');
      head.append(el('span', `sr-kind k-${entry.kind.toLocaleLowerCase()}`, entry.kind));
      const title = el('span', 'sr-title');
      title.append(result.text ? document.createTextNode(result.text) : highlighted(entry.title, result.hits || []));
      head.append(title);
      link.append(head, el('span', 'sr-context', entry.detail && !result.text ? `${entry.context} · ${entry.detail}` : entry.context));
      item.append(link);
      item.addEventListener('mousemove', () => { if (active !== index) setActive(index); });
      list.append(item);
    });
    setActive(0);
  };

  const open = () => {
    if (dialog.open) return;
    dialog.showModal();
    input.select();
    render();
    load().then(() => { if (dialog.open) render(); });
  };
  const close = () => dialog.close();
  trigger.addEventListener('click', open);
  input.addEventListener('input', render);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive(active + 1); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setActive(active - 1); }
    else if (event.key === 'Enter') {
      const link = list.children[active]?.querySelector('a');
      if (link) { event.preventDefault(); close(); location.href = link.href; }
    }
  });
  list.addEventListener('click', (event) => { if (event.target.closest('a')) close(); });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  addEventListener('keydown', (event) => {
    const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if ((event.key === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !typing)) {
      event.preventDefault();
      open();
    }
  });
}
