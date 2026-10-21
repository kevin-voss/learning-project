// Page behaviour shared by lesson pages: diagrams, glossary popovers, copy button, toast.
(function () {
  // Pages load mermaid themselves, or it is fetched the first time a lesson has a diagram.
  const MERMAID_URL = 'https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js';

  function loadMermaid(done) {
    let script = document.getElementById('mermaidScript');
    if (!script) {
      script = document.createElement('script');
      script.id = 'mermaidScript';
      script.src = MERMAID_URL;
      document.head.appendChild(script);
    }
    script.addEventListener('load', done, { once: true });
  }

  function renderMermaidDiagrams(root) {
    if (!root.querySelector('.mermaid')) return;
    if (!window.mermaid) {
      loadMermaid(() => renderMermaidDiagrams(root));
      return;
    }

    // Colours come from the site theme at draw time, so light and dark both work.
    const css = getComputedStyle(document.documentElement);
    const token = (name, fallback) => (css.getPropertyValue(name) || '').trim() || fallback;
    window.mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'strict',
      themeVariables: {
        background: token('--lp-code-bg', '#f4f1ea'),
        primaryColor: token('--lp-surface', '#ffffff'),
        primaryTextColor: token('--lp-text', '#1f2933'),
        primaryBorderColor: token('--lp-line', '#e4dfd3'),
        lineColor: token('--lp-accent', '#2f6fde'),
        secondaryColor: token('--lp-surface-2', '#f3efe6'),
        tertiaryColor: token('--lp-surface-2', '#f3efe6'),
        textColor: token('--lp-text', '#1f2933'),
        fontFamily: token('--lp-font', 'system-ui, sans-serif')
      }
    });

    const nodes = root.querySelectorAll('.mermaid');
    if (!nodes.length) return;

    window.mermaid.run({ nodes }).catch(() => {
      nodes.forEach(node => {
        node.classList.add('mermaid-error');
      });
    });
  }

  function ensureTermPopover() {
    let popover = document.getElementById('termPopover');
    if (!popover) {
      popover = document.createElement('div');
      popover.id = 'termPopover';
      popover.className = 'term-popover';
      document.body.appendChild(popover);
    }
    return popover;
  }

  function placeTermPopover(term, popover) {
    const gap = 10;
    const rect = term.getBoundingClientRect();
    const popRect = popover.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - popRect.width / 2;
    let top = rect.top - popRect.height - gap;

    left = Math.max(12, Math.min(left, window.innerWidth - popRect.width - 12));
    if (top < 12) top = rect.bottom + gap;
    if (top + popRect.height > window.innerHeight - 12) {
      top = Math.max(12, window.innerHeight - popRect.height - 12);
    }

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }

  function attachTermTooltips(root) {
    const popover = ensureTermPopover();
    const show = event => {
      const term = event.currentTarget;
      popover.textContent = term.dataset.tip;
      popover.classList.add('show');
      placeTermPopover(term, popover);
    };
    const hide = () => popover.classList.remove('show');

    root.querySelectorAll('.term').forEach(term => {
      term.addEventListener('mouseenter', show);
      term.addEventListener('focus', show);
      term.addEventListener('click', show);
      term.addEventListener('mouseleave', hide);
      term.addEventListener('blur', hide);
    });
  }

  window.copyCode = function copyCode(btn) {
    const code = btn.closest('.code-wrap').querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = 'copied!';
      btn.classList.add('copied');
      showToast('Code copied to clipboard');
      setTimeout(() => {
        btn.textContent = 'copy';
        btn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      showToast('Copy failed — select manually');
    });
  };

  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.querySelector('span').textContent = msg;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  Java.lesson = Object.assign(Java.lesson || {}, {
    renderMermaidDiagrams,
    attachTermTooltips,
    showToast
  });
})();
