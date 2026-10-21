window.SD = window.SD || {};
SD.concepts = [];
SD.sketchCleanups = [];

/* Colours come from the site theme (hub/theme/tokens.css). Read them when you draw,
   so diagrams and canvas sketches follow light and dark mode. */
SD.FALLBACK = {
  '--lp-bg': '#faf8f3', '--lp-surface': '#ffffff', '--lp-surface-2': '#f3efe6', '--lp-text': '#1f2933',
  '--lp-text-muted': '#5f6b7a', '--lp-line': '#e4dfd3', '--lp-accent': '#2f6fde', '--lp-read': '#2f6fde',
  '--lp-do': '#1f9d55', '--lp-check': '#b7791f', '--lp-warn': '#c0392b', '--lp-code-keyword': '#b8326e',
  '--lp-code-number': '#0b5cad', '--lp-code-title': '#6f42c1',
  '--lp-font': 'system-ui, sans-serif', '--lp-mono': 'ui-monospace, SFMono-Regular, Menlo, monospace',
};

SD.token = function (name) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || SD.FALLBACK[name] || '#888888';
};

/* A colour with transparency: SD.alpha('#2f6fde', 0.2) → 'rgba(47, 111, 222, 0.2)'. */
SD.alpha = function (color, a) {
  let hex = String(color).trim().replace('#', '');
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(hex)) return color;
  const n = parseInt(hex, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

/* Calls back when the reader switches light or dark (toggle button or system setting). */
SD.onThemeChange = function (callback) {
  let last = SD.token('--lp-bg');
  const check = () => {
    const now = SD.token('--lp-bg');
    if (now !== last) { last = now; callback(); }
  };
  new MutationObserver(check).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', check);
};
