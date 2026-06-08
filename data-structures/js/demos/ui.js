window.DS = window.DS || {};

DS.demoUI = {
  esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  memAddr(base, index, elemSize = 8) {
    const addr = base + index * elemSize;
    return '0x' + addr.toString(16).toUpperCase().padStart(4, '0');
  },

  numberInfo(n) {
    const num = Number(n);
    const isInt = Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER;
    const binary = isInt && num >= 0
      ? num.toString(2).padStart(8, '0').slice(-32)
      : '—';
    const hex = isInt && num >= 0
      ? '0x' + num.toString(16).toUpperCase()
      : '—';
    return {
      type: 'Number (IEEE 754 float64)',
      bytes: 8,
      bits: 64,
      binary,
      hex,
      isInt,
    };
  },

  stringInfo(s) {
    const chars = s.length;
    const bytes = chars * 2;
    return {
      type: 'String (UTF-16 in JS)',
      chars,
      bytes,
      bits: bytes * 8,
    };
  },

  statChip(label, value, hint = '') {
    return `
      <div class="demo-stat" title="${this.esc(hint)}">
        <span class="demo-stat-label">${this.esc(label)}</span>
        <span class="demo-stat-value">${value}</span>
      </div>`;
  },

  inspectorRowsHtml(rows) {
    if (!rows.length) {
      return '<p class="inspector-empty">Interact with the structure to see details here.</p>';
    }
    return rows.map(([k, v, hint]) => `
      <div class="inspector-row" ${hint ? `title="${this.esc(hint)}"` : ''}>
        <span class="inspector-key">${this.esc(k)}</span>
        <span class="inspector-val">${v}</span>
      </div>`).join('');
  },

  inspector(title, rows) {
    return `
      <aside class="demo-inspector">
        <div class="inspector-title"><i class="fas fa-microscope"></i> ${this.esc(title)}</div>
        <div class="inspector-body">${this.inspectorRowsHtml(rows)}</div>
      </aside>`;
  },

  emptyStage(icon, title, desc) {
    return `
      <div class="demo-empty">
        <i class="fas ${icon}"></i>
        <strong>${this.esc(title)}</strong>
        <span>${this.esc(desc)}</span>
      </div>`;
  },

  shell({ title, hint, stage, inspector, stats = '', controls, msgId }) {
    return `
      <div class="demo-shell">
        <header class="demo-head">
          <div class="demo-title"><i class="fas fa-flask"></i> ${title}</div>
          <p class="demo-hint">${hint}</p>
        </header>
        <div class="demo-body">
          <div class="demo-stage">${stage}</div>
          ${inspector}
        </div>
        ${stats ? `<div class="demo-stats">${stats}</div>` : ''}
        <div class="demo-controls-wrap">
          <span class="controls-label"><i class="fas fa-hand-pointer"></i> Try it yourself</span>
          <div class="demo-controls">${controls}</div>
        </div>
        <div class="demo-msg" id="${msgId}" ${msgId ? 'aria-live="polite"' : ''}></div>
      </div>`;
  },
};
