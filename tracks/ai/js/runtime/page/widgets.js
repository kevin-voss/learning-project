/* Interactive explainers. Markup lives in the lesson HTML; this module only computes and writes values. */

export function softmax(logits, temperature = 1) {
  const t = Math.max(temperature, 1e-3);
  const scaled = logits.map((logit) => logit / t);
  const max = Math.max(...scaled);
  const exps = scaled.map((value) => Math.exp(value - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((value) => value / sum);
}

export function nucleus(probs, topP) {
  const order = probs.map((p, i) => [p, i]).sort((a, b) => b[0] - a[0]);
  const kept = new Set();
  let cumulative = 0;
  for (const [p, i] of order) {
    kept.add(i);
    cumulative += p;
    if (cumulative >= topP - 1e-9) break;
  }
  const mass = [...kept].reduce((sum, i) => sum + probs[i], 0);
  return probs.map((p, i) => (kept.has(i) ? p / mass : 0));
}

export function kvCacheBytes({ layers, kvHeads, headDim, bytes, tokens, sequences = 1 }) {
  return 2 * layers * kvHeads * headDim * bytes * tokens * sequences;
}

const pct = (value) => (value > 0 && value < .001 ? '<0.1%' : `${(value * 100).toFixed(value >= .1 && value < .995 ? 0 : 1)}%`);
const formatBytes = (value) => {
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
  let index = 0;
  while (value >= 1024 && index < units.length - 1) { value /= 1024; index += 1; }
  return `${value.toFixed(value >= 100 || index === 0 ? 0 : 1)} ${units[index]}`;
};

function bindInputs(root, update) {
  root.querySelectorAll('[data-input]').forEach((input) => input.addEventListener('input', update));
  update();
}
const read = (root, name) => Number(root.querySelector(`[data-input="${name}"]`)?.value);
const write = (root, name, text) => root.querySelectorAll(`[data-out="${name}"]`).forEach((node) => { node.textContent = text; });

function sampling(root) {
  const rows = [...root.querySelectorAll('.vb[data-logit]')];
  const logits = rows.map((row) => Number(row.dataset.logit));
  bindInputs(root, () => {
    const temperature = read(root, 'temperature');
    const topP = read(root, 'top-p');
    const probs = softmax(logits, temperature);
    const final = nucleus(probs, topP);
    write(root, 'temperature', temperature.toFixed(2));
    write(root, 'top-p', topP.toFixed(2));
    rows.forEach((row, i) => {
      row.classList.toggle('cut', final[i] === 0);
      row.style.setProperty('--v', `${(final[i] || probs[i]) * 100}%`);
      row.querySelector('.vb-val').textContent = final[i] ? pct(final[i]) : 'cut';
    });
    const kept = final.filter(Boolean).length;
    const top = Math.max(...final);
    write(root, 'summary', `${kept} of ${rows.length} tokens can be sampled · the top token wins ${pct(top)} of draws`);
  });
}

function kvCache(root) {
  bindInputs(root, () => {
    const config = {
      layers: read(root, 'layers'), kvHeads: read(root, 'kv-heads'), headDim: read(root, 'head-dim'),
      bytes: read(root, 'bytes'), tokens: read(root, 'tokens'), sequences: read(root, 'sequences'),
    };
    const perToken = kvCacheBytes({ ...config, tokens: 1, sequences: 1 });
    write(root, 'per-token', formatBytes(perToken));
    write(root, 'per-sequence', formatBytes(perToken * config.tokens));
    write(root, 'total', formatBytes(kvCacheBytes(config)));
  });
}

const WIDGETS = { sampling, 'kv-cache': kvCache };

function wireReveal() {
  const targets = document.querySelectorAll('.diagram, .steps, .stack, .stats, .viz-bars, .widget, .pc, .tbl-wrap, .code-card');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((node) => node.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in-view');
    observer.unobserve(entry.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  targets.forEach((node) => { node.classList.add('reveal'); observer.observe(node); });
}

export function wireWidgets() {
  document.querySelectorAll('[data-widget]').forEach((root) => WIDGETS[root.dataset.widget]?.(root));
  wireReveal();
}
