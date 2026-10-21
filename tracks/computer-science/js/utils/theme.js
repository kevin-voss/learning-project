window.DS = window.DS || {};

// Light/dark support. The colours come from the site theme (--lp-* tokens in hub/theme/tokens.css).

// Read one theme token now, e.g. DS.cssVar('--lp-text', '#1f2933').
DS.cssVar = function (name, fallback) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
};

// Mermaid diagrams are drawn with the current theme colours.
DS.renderMermaid = function () {
  if (!window.mermaid) return;
  const nodes = document.querySelectorAll('.mermaid[data-src]');
  if (!nodes.length) return;
  const v = DS.cssVar;
  const text = v('--lp-text', '#1f2933');
  window.mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'strict',
    fontFamily: v('--lp-font', 'sans-serif'),
    themeVariables: {
      darkMode: getComputedStyle(document.documentElement).colorScheme.includes('dark'),
      background: v('--lp-surface', '#ffffff'),
      primaryColor: v('--lp-surface-2', '#f3efe6'),
      primaryTextColor: text,
      primaryBorderColor: v('--lp-accent', '#2f6fde'),
      secondaryColor: v('--lp-accent-soft', '#e6eefc'),
      tertiaryColor: v('--lp-surface', '#ffffff'),
      lineColor: v('--lp-text-muted', '#5f6b7a'),
      textColor: text,
      noteBkgColor: v('--lp-note-bg', '#eaf1fd'),
      noteTextColor: text,
      actorBkg: v('--lp-surface-2', '#f3efe6'),
      actorTextColor: text,
      signalColor: text,
      signalTextColor: text,
    },
  });
  // Put the source back so a diagram can be redrawn after a theme switch.
  nodes.forEach((node) => {
    node.removeAttribute('data-processed');
    node.textContent = node.dataset.src;
  });
  window.mermaid.run({ nodes: [...nodes] }).catch(() => {});
};

// Redraw theme-coloured parts (diagrams, canvas demos) when the theme changes.
DS.onThemeChange = function () {
  DS.renderMermaid();
  const area = document.getElementById('contentArea');
  const lesson = DS.curriculum[DS.currentSection];
  if (area && lesson && area.querySelector('.visual-demo canvas')) {
    const { view } = DS.resolveLessonView(lesson);
    DS.initDemo(view.id, view.demoScenario);
  }
};

new MutationObserver(() => DS.onThemeChange())
  .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => DS.onThemeChange());
