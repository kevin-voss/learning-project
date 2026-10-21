/* Mermaid labels render at 18px. Inline diagrams stay between ~14px and ~21px labels. */
export const READABLE_MIN = 0.78;
export const READABLE_MAX = 1.15;

export function autoScale(width, height, frameWidth, { maxHeight = Infinity, max = READABLE_MAX } = {}) {
  if (!(width > 0 && height > 0 && frameWidth > 0)) return 1;
  let scale = Math.min(frameWidth / width, max);
  if (height * scale > maxHeight) scale = maxHeight / height;
  return Math.max(scale, READABLE_MIN);
}

export function fitScale(width, height, frameWidth, frameHeight = Infinity) {
  if (!(width > 0 && height > 0 && frameWidth > 0)) return 1;
  return Math.min(frameWidth / width, frameHeight / height);
}

export function zoomDimensions(width, height, scale) {
  return { width: Math.max(1, width * scale), height: Math.max(1, height * scale) };
}

/* Diagram colours come from the site theme, read when the diagram is drawn. */
const redraws = [];
const token = (name, fallback) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

function mermaidConfig() {
  const bg = token('--lp-bg', '#faf8f3');
  const surface = token('--lp-surface', '#ffffff');
  const surface2 = token('--lp-surface-2', '#f3efe6');
  const text = token('--lp-text', '#1f2933');
  const line = token('--lp-line', '#e4dfd3');
  const read = token('--lp-read', '#2f6fde');
  const note = token('--lp-note-bg', '#eaf1fd');
  const picture = token('--lp-picture-bg', '#fff6d9');
  return {
    startOnLoad: false, theme: 'base', securityLevel: 'strict',
    flowchart: { htmlLabels: true, useMaxWidth: false, nodeSpacing: 44, rankSpacing: 56, padding: 14 },
    sequence: { useMaxWidth: false, actorFontSize: 18, messageFontSize: 17, noteFontSize: 16, wrap: true },
    themeVariables: {
      darkMode: getComputedStyle(document.documentElement).colorScheme === 'dark',
      background: surface, fontFamily: token('--lp-font', 'system-ui, sans-serif'), fontSize: '18px',
      primaryColor: note, primaryTextColor: text, primaryBorderColor: read,
      secondaryColor: picture, tertiaryColor: bg, textColor: text,
      lineColor: read, edgeLabelBackground: surface, clusterBkg: surface2,
      clusterBorder: line, noteBkgColor: picture, noteTextColor: text,
      actorBkg: note, actorBorder: read, actorTextColor: text, signalColor: read, signalTextColor: text,
    },
  };
}

/* Lesson pages colour Mermaid classes with the old light palette. Swap each colour for its theme token. */
const CLASS_COLOURS = {
  '#e7edf0': '--lp-note-bg', '#ede7f4': '--lp-surface-2', '#e7efe7': '--lp-try-bg', '#f1e8dc': '--lp-check-bg',
  '#557184': '--lp-read', '#735c83': '--lp-code-title', '#57704d': '--lp-do', '#a56d3e': '--lp-check', '#18222d': '--lp-text',
};
function themed(source) {
  return source.replace(/#[0-9a-f]{6}\b/gi, (hex) => {
    const name = CLASS_COLOURS[hex.toLowerCase()];
    return name ? token(name, hex) : hex;
  });
}

function onThemeChange(callback) {
  let last = getComputedStyle(document.documentElement).getPropertyValue('--lp-bg');
  const check = () => {
    const now = getComputedStyle(document.documentElement).getPropertyValue('--lp-bg');
    if (now !== last) { last = now; callback(); }
  };
  new MutationObserver(check).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', check);
}

let renderQueue = Promise.resolve();
function enqueueRender(task) {
  const current = renderQueue.then(task, task);
  renderQueue = current.catch(() => {});
  return current;
}

function dimensions(svg) {
  const viewBox = svg.viewBox?.baseVal;
  if (viewBox?.width && viewBox?.height) return { width: viewBox.width, height: viewBox.height };
  const width = Number.parseFloat(svg.getAttribute('width')) || svg.getBoundingClientRect().width;
  const height = Number.parseFloat(svg.getAttribute('height')) || svg.getBoundingClientRect().height;
  return { width, height };
}

function makeButton(label, accessible, handler) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'tbtn';
  button.textContent = label;
  button.setAttribute('aria-label', accessible);
  button.addEventListener('click', handler);
  return button;
}

function setupDiagram(node, mermaid) {
  const frame = node.closest('.diag-body') || node.parentElement;
  const shell = node.closest('.diagram') || frame;
  const source = node.textContent;
  node.textContent = themed(source);
  frame.tabIndex = 0;
  frame.setAttribute('role', 'region');
  frame.setAttribute('aria-label', 'Scrollable diagram frame. Use the diagram controls to fit, zoom, or expand.');
  let mode = 'auto';
  let scale = 1;
  let natural;
  let modal = null;
  let rendering = false;
  let rerenderRequested = false;
  const status = document.createElement('p');
  status.className = 'diag-status';
  status.setAttribute('role', 'status');
  status.textContent = mermaid ? 'Rendering diagram…' : 'Diagram source is available below. Connect to the internet to render it.';
  shell.append(status);
  const controls = document.createElement('div');
  controls.className = 'diag-controls';
  const setMode = (next) => { mode = next; layout(); };
  const zoom = (factor) => { mode = 'manual'; scale = Math.max(.25, Math.min(3, scale * factor)); layout(); };
  const level = document.createElement('span');
  level.className = 'diag-level';
  level.setAttribute('aria-live', 'polite');
  controls.append(
    level,
    makeButton('Fit', 'Fit the whole diagram in the frame', () => setMode('fit')),
    makeButton('100%', 'Show diagram at actual size', () => { mode = 'manual'; scale = 1; layout(); }),
    makeButton('−', 'Zoom out', () => zoom(1 / 1.2)),
    makeButton('+', 'Zoom in', () => zoom(1.2)),
  );
  const expand = makeButton('Expand', 'Expand diagram', toggleModal);
  expand.setAttribute('aria-pressed', 'false');
  controls.append(expand);
  shell.insertBefore(controls, frame);
  controls.querySelectorAll('button').forEach((button) => { button.disabled = true; });

  function layout() {
    const svg = frame.querySelector('svg');
    if (!svg || !natural || !frame.clientWidth) return;
    const expanded = !!modal;
    const frameHeight = expanded ? frame.clientHeight : Math.max(420, innerHeight * .72);
    if (mode === 'auto') scale = autoScale(natural.width, natural.height, frame.clientWidth, { maxHeight: frameHeight, max: expanded ? 1.8 : READABLE_MAX });
    else if (mode === 'fit') scale = fitScale(natural.width, natural.height, frame.clientWidth, expanded ? frame.clientHeight : Infinity);
    const { width, height } = zoomDimensions(natural.width, natural.height, scale);
    level.textContent = `${Math.round(scale * 100)}%`;
    svg.style.width = `${width}px`;
    svg.style.height = `${height}px`;
    svg.style.maxWidth = 'none';
    svg.style.transform = 'none';
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Technical diagram');
    frame.style.minHeight = '';
  }

  function fail(error) {
    node.removeAttribute('data-processed');
    node.setAttribute('src-fallback', '');
    node.textContent = themed(source);
    status.textContent = 'Diagram could not render. Read the source below.';
    status.dataset.error = error?.message || 'render-failed';
    controls.querySelectorAll('button').forEach((button) => { button.disabled = true; });
  }

  async function render() {
    if (!mermaid || rendering || node.hasAttribute('data-processed') || !frame.getBoundingClientRect().width) {
      if (rendering) rerenderRequested = true;
      return;
    }
    rendering = true;
    status.textContent = 'Rendering diagram…';
    try {
      await enqueueRender(() => mermaid.run({ nodes: [node] }));
      const svg = frame.querySelector('svg');
      if (!svg) throw new Error('Mermaid produced no SVG');
      natural = dimensions(svg);
      if (!(natural.width > 0 && natural.height > 0)) throw new Error('Diagram has no measurable size');
      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');
      layout();
      status.remove();
      node.setAttribute('data-processed', 'true');
      controls.querySelectorAll('button').forEach((button) => { button.disabled = false; });
    } catch (error) {
      fail(error);
    } finally {
      rendering = false;
      if (rerenderRequested) { rerenderRequested = false; requestAnimationFrame(layout); }
    }
  }

  function toggleModal() {
    if (modal) { closeModal(); return; }
    const placeholder = document.createComment('diagram-position');
    shell.before(placeholder);
    const overlay = document.createElement('div');
    overlay.className = 'diagram-overlay';
    overlay.append(shell);
    document.body.append(overlay);
    const inertBefore = [...document.body.children].filter((child) => child !== overlay).map((child) => [child, child.inert]);
    const previousOverflow = document.body.style.overflow;
    const controller = new AbortController();
    modal = { placeholder, overlay, inertBefore, previousOverflow, scrollX: window.scrollX, scrollY: window.scrollY, controller };
    inertBefore.forEach(([child]) => { child.inert = true; });
    document.body.classList.add('dialog-open');
    shell.classList.add('diagram-expanded');
    shell.setAttribute('role', 'dialog');
    shell.setAttribute('aria-modal', 'true');
    shell.setAttribute('aria-label', 'Expanded technical diagram');
    expand.textContent = 'Close';
    expand.setAttribute('aria-label', 'Close expanded diagram');
    expand.setAttribute('aria-pressed', 'true');
    mode = 'auto';
    layout();
    expand.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); closeModal(); return; }
      if (event.key !== 'Tab') return;
      const focusable = [...shell.querySelectorAll('button:not([disabled])')].filter((item) => item.getClientRects().length);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKey, { signal: controller.signal });
    overlay.addEventListener('click', (event) => { if (event.target === overlay) closeModal(); }, { signal: controller.signal });
  }

  function closeModal() {
    if (!modal) return;
    const { placeholder, overlay, inertBefore, previousOverflow, scrollX, scrollY, controller } = modal;
    modal = null;
    controller.abort();
    shell.classList.remove('diagram-expanded');
    shell.removeAttribute('role');
    shell.removeAttribute('aria-modal');
    shell.removeAttribute('aria-label');
    placeholder.replaceWith(shell);
    overlay.remove();
    inertBefore.forEach(([child, wasInert]) => { child.inert = wasInert; });
    document.body.classList.remove('dialog-open');
    document.body.style.overflow = previousOverflow;
    window.scrollTo(scrollX, scrollY);
    expand.textContent = 'Expand';
    expand.setAttribute('aria-label', 'Expand diagram');
    expand.setAttribute('aria-pressed', 'false');
    mode = 'auto';
    layout();
    expand.focus();
  }

  redraws.push(() => {
    if (rendering || !node.hasAttribute('data-processed')) return;
    node.removeAttribute('data-processed');
    node.textContent = themed(source);
    render();
  });

  if (!mermaid) {
    node.setAttribute('src-fallback', '');
    controls.querySelectorAll('button').forEach((button) => { button.disabled = true; });
    return;
  }
  const details = node.closest('details');
  if (details && !details.open) details.addEventListener('toggle', () => { if (details.open) render(); });
  else render();
  const observer = new ResizeObserver(() => {
    if (node.hasAttribute('data-processed')) layout();
    else render();
  });
  observer.observe(frame);
  window.addEventListener('resize', () => { if (node.hasAttribute('data-processed')) layout(); });
}

export async function wireDiagrams() {
  const nodes = [...document.querySelectorAll('pre.mermaid')];
  if (!nodes.length) return;
  let mermaid = null;
  try {
    mermaid = (await import('https://cdn.jsdelivr.net/npm/mermaid@11.12.0/dist/mermaid.esm.min.mjs')).default;
    mermaid.initialize(mermaidConfig());
  } catch { /* Source remains available when Mermaid cannot load. */ }
  nodes.forEach((node) => setupDiagram(node, mermaid));
  if (mermaid) onThemeChange(() => {
    mermaid.initialize(mermaidConfig());
    redraws.forEach((redraw) => redraw());
  });
}
