window.SD = window.SD || {};

/* Shared drawing kit for the canvas sketches. Colours are read from the site theme
   (SD.token, js/ns.js) every frame, so the sketches follow light and dark mode. */
const SD_SKETCH = {};

function sdReadPalette() {
  const text = SD.token('--lp-text');
  Object.assign(SD_SKETCH, {
    bg: SD.token('--lp-surface'),
    panel: sdAlpha(text, 0.04),
    panel2: sdAlpha(text, 0.07),
    line: sdAlpha(text, 0.2),
    text,
    muted: SD.token('--lp-text-muted'),
    faint: sdAlpha(SD.token('--lp-text-muted'), 0.75),
    accent: SD.token('--lp-accent'),
    danger: SD.token('--lp-warn'),
    warn: SD.token('--lp-check'),
    good: SD.token('--lp-do'),
    cyan: SD.token('--lp-code-number'),
    rose: SD.token('--lp-code-keyword'),
    font: SD.token('--lp-font'),
    mono: SD.token('--lp-mono'),
  });
}

function sdAlpha(color, a) {
  return SD.alpha(color, a);
}

function sdSetupCanvas(canvas, cssH) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.max(320, canvas.parentElement ? canvas.parentElement.clientWidth : 520);
  const h = cssH || 220;
  canvas.style.width = '100%';
  canvas.style.maxWidth = '100%';
  canvas.style.height = h + 'px';
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.textBaseline = 'middle';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  return { ctx, w, h, dpr };
}

function sdRafLoop(fn) {
  let id;
  let stopped = false;
  const loop = (t) => {
    if (stopped) return;
    sdReadPalette();
    fn(t);
    id = requestAnimationFrame(loop);
  };
  id = requestAnimationFrame(loop);
  return () => {
    stopped = true;
    cancelAnimationFrame(id);
  };
}

function sdLoop(t, t0, ms) {
  return ((t - t0) % ms) / ms;
}

function sdPhase(p, ranges) {
  return ranges.find((r) => p >= r.from && p < r.to) || ranges[ranges.length - 1];
}

function sdEase(x) {
  const n = Math.max(0, Math.min(1, x));
  return n * n * (3 - 2 * n);
}

function sdMix(a, b, p) {
  return a + (b - a) * sdEase(p);
}

function sdText(ctx, text, x, y, opts = {}) {
  ctx.fillStyle = opts.color || SD_SKETCH.text;
  ctx.font = `${opts.weight || 500} ${opts.size || 10}px ${opts.mono ? SD_SKETCH.mono : SD_SKETCH.font}`;
  ctx.textAlign = opts.align || 'left';
  ctx.fillText(text, x, y, opts.maxWidth);
  ctx.textAlign = 'left';
}

function sdRoundRect(ctx, x, y, w, h, r, fill, stroke, lineWidth = 1) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

function sdNode(ctx, node, active, opts = {}) {
  const fill = active ? sdAlpha(node.color || opts.accent, 0.13) : SD_SKETCH.panel;
  const stroke = active ? node.color || opts.accent : SD_SKETCH.line;
  sdRoundRect(ctx, node.x, node.y, node.w, node.h, 12, fill, stroke, active ? 2 : 1);
  sdText(ctx, node.label, node.x + 12, node.y + 16, { size: opts.labelSize || 10, weight: 700, color: active ? node.color || opts.accent : SD_SKETCH.text });
  if (node.sub) sdText(ctx, node.sub, node.x + 12, node.y + 33, { size: 8, color: SD_SKETCH.muted });
  if (node.sub2) sdText(ctx, node.sub2, node.x + 12, node.y + 47, { size: 8, color: SD_SKETCH.faint });
}

function sdArrow(ctx, from, to, color, active = true, dashed = false) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.globalAlpha = active ? 0.9 : 0.22;
  ctx.lineWidth = active ? 2 : 1;
  if (dashed) ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.setLineDash([]);
  const a = Math.atan2(to.y - from.y, to.x - from.x);
  ctx.beginPath();
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(to.x - 8 * Math.cos(a - Math.PI / 6), to.y - 8 * Math.sin(a - Math.PI / 6));
  ctx.lineTo(to.x - 8 * Math.cos(a + Math.PI / 6), to.y - 8 * Math.sin(a + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function sdPacket(ctx, from, to, p, color, label) {
  if (p <= 0 || p >= 1) return;
  const x = sdMix(from.x, to.x, p);
  const y = sdMix(from.y, to.y, p);
  ctx.save();
  ctx.shadowBlur = 14;
  ctx.shadowColor = color;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  if (label) sdText(ctx, label, x + 8, y - 10, { size: 8, color });
}

function sdHeader(ctx, w, title, phaseLabel, accent) {
  sdText(ctx, title, 14, 17, { size: 11, weight: 700, color: SD_SKETCH.text, maxWidth: Math.max(120, w - 205) });
  sdRoundRect(ctx, w - 170, 7, 156, 22, 999, sdAlpha(accent, 0.09), sdAlpha(accent, 0.33));
  sdText(ctx, phaseLabel, w - 92, 18, { size: 8, weight: 700, color: accent, align: 'center' });
}

function sdStepper(ctx, labels, activeIndex, x, y, w, accent) {
  const gap = 8;
  const stepW = (w - gap * (labels.length - 1)) / labels.length;
  labels.forEach((label, i) => {
    const active = i === activeIndex;
    const done = i < activeIndex;
    const fill = active ? sdAlpha(accent, 0.14) : done ? sdAlpha(SD_SKETCH.good, .14) : sdAlpha(SD_SKETCH.text, .04);
    const stroke = active ? accent : done ? SD_SKETCH.good : sdAlpha(SD_SKETCH.text, .1);
    sdRoundRect(ctx, x + i * (stepW + gap), y, stepW, 24, 999, fill, stroke, active ? 1.5 : 1);
    sdText(ctx, label, x + i * (stepW + gap) + stepW / 2, y + 12, { size: 8, weight: 700, color: active ? accent : done ? SD_SKETCH.good : SD_SKETCH.muted, align: 'center' });
  });
}


SD.SKETCH_RUNNERS = {};

SD.stopAllSketches = function () {
  (SD.sketchCleanups || []).forEach((fn) => fn());
  SD.sketchCleanups = [];
};

/* zoneToken is the theme token of the open concept's zone, e.g. '--lp-do'. */
SD.startSketchesIn = function (rootEl, zoneToken) {
  SD.stopAllSketches();
  sdReadPalette();
  const accent = SD.token(zoneToken || '--lp-accent');
  const secondary = zoneToken === '--lp-do' ? SD_SKETCH.cyan : SD_SKETCH.good;
  const colors = { accent, secondary };

  rootEl.querySelectorAll('canvas[data-sketch]').forEach((canvas) => {
    const id = canvas.getAttribute('data-sketch');
    const runner = SD.SKETCH_RUNNERS[id];
    if (!runner) return;
    const cancel = runner(canvas, colors);
    SD.sketchCleanups.push(cancel);
  });
};
