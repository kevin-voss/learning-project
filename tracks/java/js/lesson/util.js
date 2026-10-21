// Shared helpers for the lesson renderer: icons, escaping and inline text.
(function () {
  const svg = body => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${body}</svg>`;

  const icons = {
    info: svg('<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'),
    world: svg('<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
    code: svg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
    syntax: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9h8M8 13h5M8 17h7"/>'),
    check: svg('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'),
    alert: svg('<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>'),
    link: svg('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'),
    picture: svg('<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>'),
    play: svg('<polygon points="6 4 20 12 6 20 6 4"/>'),
    question: svg('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>')
  };

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeAttribute(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
  }

  // Plain text with glossary hover terms.
  // Topic terms match in any case. Hub-wide terms (Java.glossary) match only in
  // their exact case, and bare Java keywords (if, do, case …) are skipped, so
  // everyday words like "do" or "get" in a sentence stay plain.
  function glossaryTerms(lesson) {
    const global = Java.glossary || [];
    const local = ((lesson && lesson.glossary) || []).filter(item => !global.includes(item));
    const shared = global
      .filter(item => !(/^[a-z]+$/.test(item.term) && /keyword/i.test(item.definition)))
      .map(item => Object.assign({ exact: true }, item));
    return local.concat(shared).sort((a, b) => b.term.length - a.term.length);
  }

  function glossaryText(str, lesson) {
    const terms = glossaryTerms(lesson);
    if (!terms.length) return escapeHtml(str);

    let html = '';
    let index = 0;

    while (index < str.length) {
      const match = terms.find(item => {
        const candidate = str.slice(index, index + item.term.length);
        const before = str[index - 1] || '';
        const after = str[index + item.term.length] || '';
        const same = item.exact ? candidate === item.term : candidate.toLowerCase() === item.term.toLowerCase();
        return same && !/[\w-]/.test(before) && !/[\w-]/.test(after);
      });

      if (match) {
        const found = str.slice(index, index + match.term.length);
        html += `<span class="term" tabindex="0" data-tip="${escapeAttribute(match.definition)}">${escapeHtml(found)}</span>`;
        index += match.term.length;
      } else {
        html += escapeHtml(str[index]);
        index += 1;
      }
    }

    return html;
  }

  // Text with glossary terms, `inline code`, **bold** and [links](href).
  function renderText(value, lesson, plain) {
    const str = String(value || '');
    return str.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/).map(part => {
      if (/^`[^`]+`$/.test(part)) return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
      if (/^\*\*[^*]+\*\*$/.test(part)) return `<strong>${renderText(part.slice(2, -2), lesson, plain)}</strong>`;
      const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (link) return `<a href="${escapeAttribute(link[2])}">${escapeHtml(link[1])}</a>`;
      return plain ? escapeHtml(part) : glossaryText(part, lesson);
    }).join('');
  }

  // Same as renderText, without glossary hover terms (for page headers).
  function renderInline(value) {
    return renderText(value, null, true);
  }

  function renderList(items, lesson) {
    return (items || []).map(item => `<li>${renderText(item, lesson)}</li>`).join('');
  }

  function renderTextBlock(value, lesson) {
    if (!value) return '';
    if (Array.isArray(value)) return `<ul>${renderList(value, lesson)}</ul>`;
    return `<p>${renderText(value, lesson)}</p>`;
  }

  // A string is one paragraph, an array is several paragraphs (not a list).
  function renderParagraphs(value, lesson, className) {
    if (!value) return '';
    const cls = className ? ` class="${className}"` : '';
    return [].concat(value).map(item => `<p${cls}>${renderText(item, lesson)}</p>`).join('');
  }

  function indexToLetters(index) {
    let value = index + 1;
    let label = '';
    while (value > 0) {
      value -= 1;
      label = String.fromCharCode(65 + (value % 26)) + label;
      value = Math.floor(value / 26);
    }
    return label;
  }

  function normalizeLookup(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\bbasics\b/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  Java.lesson = Object.assign(Java.lesson || {}, {
    icons,
    escapeHtml,
    escapeAttribute,
    renderText,
    renderInline,
    renderList,
    renderTextBlock,
    renderParagraphs,
    indexToLetters,
    normalizeLookup
  });
})();
