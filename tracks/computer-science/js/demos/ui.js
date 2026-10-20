window.DS = window.DS || {};

DS.demoUI = {
  esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  formatDec(n) {
    const num = Number(n);
    if (!Number.isFinite(num)) return '—';
    return `${num} dec`;
  },

  formatHex(n, pad = 2) {
    const num = Number(n);
    if (!Number.isInteger(num) || num < 0) return '—';
    return `0x${num.toString(16).toUpperCase().padStart(pad, '0')} hex`;
  },

  formatBin(n, minPad = 8) {
    const num = Number(n);
    if (!Number.isInteger(num) || num < 0) return '—';
    const bits = num.toString(2);
    const padded = bits.length > minPad ? bits.slice(-32) : bits.padStart(minPad, '0');
    return `${padded} bin`;
  },

  memAddr(base, index, elemSize = 8) {
    const addr = base + index * elemSize;
    return this.formatHex(addr, 4);
  },

  numberInfo(n) {
    const num = Number(n);
    const isInt = Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER;
    return {
      type: 'Number (IEEE 754 float64)',
      bytes: 8,
      bits: 64,
      binary: isInt && num >= 0 ? this.formatBin(num) : '—',
      hex: isInt && num >= 0 ? this.formatHex(num) : '—',
      decimal: isInt ? this.formatDec(num) : '—',
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

  captureFocus(container) {
    const el = document.activeElement;
    if (!el || !container.contains(el)) return null;
    if (!['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName)) return null;
    return {
      id: el.id || '',
      ariaLabel: el.getAttribute('aria-label') || '',
      selectionStart: el.selectionStart,
      selectionEnd: el.selectionEnd,
    };
  },

  restoreFocus(container, captured) {
    if (!captured) return;
    let el = captured.id ? container.querySelector(`#${CSS.escape(captured.id)}`) : null;
    if (!el && captured.ariaLabel) {
      el = container.querySelector(`[aria-label="${CSS.escape(captured.ariaLabel)}"]`);
    }
    if (!el) return;
    el.focus();
    if (captured.selectionStart != null && el.setSelectionRange) {
      try {
        el.setSelectionRange(captured.selectionStart, captured.selectionEnd);
      } catch (_) { /* number inputs, etc. */ }
    }
  },

  mount(container, options) {
    const focus = this.captureFocus(container);
    container.innerHTML = this.shell(options);
    this.restoreFocus(container, focus);
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
        ${controls ? `
        <div class="demo-controls-wrap">
          <span class="controls-label"><i class="fas fa-hand-pointer"></i> Try it yourself</span>
          <div class="demo-controls">${controls}</div>
        </div>` : ''}
        ${msgId ? `<div class="demo-msg" id="${msgId}" aria-live="polite"></div>` : ''}
      </div>`;
  },
};
