window.SD = window.SD || {};

const SD_SKETCH = {
  bg: '#050505',
  panel: 'rgba(255,255,255,.035)',
  panel2: 'rgba(255,255,255,.055)',
  line: 'rgba(255,255,255,.16)',
  text: '#e5e5e5',
  muted: 'rgba(255,255,255,.48)',
  faint: 'rgba(255,255,255,.28)',
  danger: '#fb7185',
  warn: '#fbbf24',
  good: '#34d399',
  cyan: '#22d3ee',
};

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
  ctx.font = `${opts.weight || 500} ${opts.size || 10}px ${opts.mono ? 'ui-monospace, SFMono-Regular, Menlo, monospace' : 'Inter, system-ui, sans-serif'}`;
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
  const fill = active ? `${node.color || opts.accent}22` : SD_SKETCH.panel;
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
  sdRoundRect(ctx, w - 170, 7, 156, 22, 999, `${accent}18`, `${accent}55`);
  sdText(ctx, phaseLabel, w - 92, 18, { size: 8, weight: 700, color: accent, align: 'center' });
}

function sdStepper(ctx, labels, activeIndex, x, y, w, accent) {
  const gap = 8;
  const stepW = (w - gap * (labels.length - 1)) / labels.length;
  labels.forEach((label, i) => {
    const active = i === activeIndex;
    const done = i < activeIndex;
    const fill = active ? `${accent}24` : done ? 'rgba(52,211,153,.14)' : 'rgba(255,255,255,.04)';
    const stroke = active ? accent : done ? SD_SKETCH.good : 'rgba(255,255,255,.1)';
    sdRoundRect(ctx, x + i * (stepW + gap), y, stepW, 24, 999, fill, stroke, active ? 1.5 : 1);
    sdText(ctx, label, x + i * (stepW + gap) + stepW / 2, y + 12, { size: 8, weight: 700, color: active ? accent : done ? SD_SKETCH.good : SD_SKETCH.muted, align: 'center' });
  });
}

function sketchRoundRobin(canvas, colors) {
  const accent = colors.accent || '#818cf8';
  const srv = colors.secondary || '#34d399';
  const { ctx, w, h } = sdSetupCanvas(canvas, 230);
  const t0 = performance.now();
  const client = { x: 16, y: 63, w: 118, h: 54, label: 'User traffic', sub: '3 incoming requests', color: accent };
  const lb = { x: w * 0.38, y: 68, w: 120, h: 64, label: 'Load balancer', sub: 'next pointer', sub2: 'health checks pass', color: accent };
  const servers = [
    { x: w - 148, y: 48, w: 112, h: 42, label: 'Server 1', sub: 'request #1', color: srv },
    { x: w - 148, y: 98, w: 112, h: 42, label: 'Server 2', sub: 'request #2', color: srv },
    { x: w - 148, y: 148, w: 112, h: 42, label: 'Server 3', sub: 'request #3', color: srv },
  ];
  const phases = [
    { from: 0, to: 0.18, label: '1. accept request', active: 0 },
    { from: 0.18, to: 0.36, label: '2. route to S1', active: 1 },
    { from: 0.36, to: 0.54, label: '3. advance pointer', active: 2 },
    { from: 0.54, to: 0.72, label: '4. route to S2', active: 3 },
    { from: 0.72, to: 1, label: '5. route to S3', active: 4 },
  ];

  const draw = (t) => {
    const p = sdLoop(t, t0, 7800);
    const phase = sdPhase(p, phases);
    ctx.clearRect(0, 0, w, h);
    sdHeader(ctx, w, 'End-to-end: client → load balancer → backend pool', phase.label, accent);
    sdStepper(ctx, ['Ingress', 'Pick S1', 'Move pointer', 'Pick S2', 'Pick S3'], phase.active, 16, h - 36, w - 32, accent);
    sdNode(ctx, client, phase.active === 0, { accent });
    sdNode(ctx, lb, phase.active > 0, { accent });
    servers.forEach((s, i) => sdNode(ctx, s, (phase.active === 1 && i === 0) || (phase.active === 3 && i === 1) || (phase.active === 4 && i === 2), { accent: srv }));
    sdArrow(ctx, { x: client.x + client.w, y: client.y + 28 }, { x: lb.x, y: lb.y + 30 }, accent, true);
    servers.forEach((s, i) => sdArrow(ctx, { x: lb.x + lb.w, y: lb.y + 32 }, { x: s.x, y: s.y + 21 }, srv, phase.active >= 1, i > 0));
    sdPacket(ctx, { x: client.x + client.w, y: client.y + 28 }, { x: lb.x, y: lb.y + 30 }, Math.max(0, Math.min(1, p / 0.18)), accent, 'request');
    sdPacket(ctx, { x: lb.x + lb.w, y: lb.y + 32 }, { x: servers[0].x, y: servers[0].y + 21 }, Math.max(0, Math.min(1, (p - 0.18) / 0.16)), srv, '#1');
    sdPacket(ctx, { x: lb.x + lb.w, y: lb.y + 32 }, { x: servers[1].x, y: servers[1].y + 21 }, Math.max(0, Math.min(1, (p - 0.54) / 0.16)), srv, '#2');
    sdPacket(ctx, { x: lb.x + lb.w, y: lb.y + 32 }, { x: servers[2].x, y: servers[2].y + 21 }, Math.max(0, Math.min(1, (p - 0.72) / 0.18)), srv, '#3');
    sdText(ctx, 'UI hint: expose pool health, active policy, and per-server load beside routing decisions.', 16, h - 54, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

function sketchSqlLocks(canvas, colors) {
  const { ctx, w, h } = sdSetupCanvas(canvas, 230);
  const accent = colors.accent || '#34d399';
  const warn = '#fbbf24';
  const t0 = performance.now();
  const phases = [
    { from: 0, to: 0.18, label: '1. Txn A updates row', active: 0 },
    { from: 0.18, to: 0.38, label: '2. exclusive lock held', active: 1 },
    { from: 0.38, to: 0.58, label: '3. Txn B waits', active: 2 },
    { from: 0.58, to: 0.76, label: '4. A commits', active: 3 },
    { from: 0.76, to: 1, label: '5. B writes safely', active: 4 },
  ];

  const draw = (t) => {
    const p = sdLoop(t, t0, 8600);
    const phase = sdPhase(p, phases);
    ctx.clearRect(0, 0, w, h);
    sdHeader(ctx, w, 'End-to-end: concurrent writes serialize on one hot row', phase.label, accent);
    sdStepper(ctx, ['A starts', 'Lock', 'B waits', 'Commit', 'B proceeds'], phase.active, 16, h - 36, w - 32, accent);

    const a = { x: 16, y: 56, w: 118, h: 48, label: 'Txn A', sub: 'UPDATE balance', color: accent };
    const b = { x: 16, y: 122, w: 118, h: 48, label: 'Txn B', sub: 'same account row', color: SD_SKETCH.danger };
    const db = { x: w * 0.42, y: 66, w: 152, h: 86, label: 'Postgres row', sub: 'account_id = 7', sub2: phase.active < 3 ? 'exclusive lock: A' : phase.active === 3 ? 'release lock' : 'exclusive lock: B', color: phase.active === 2 ? warn : accent };
    const out = { x: w - 142, y: 82, w: 118, h: 58, label: 'Outcome', sub: phase.active < 3 ? 'B queued in DB' : phase.active === 3 ? 'A commit visible' : 'B retries/write', color: phase.active === 2 ? warn : SD_SKETCH.good };
    sdNode(ctx, a, phase.active <= 3, { accent });
    sdNode(ctx, b, phase.active >= 2, { accent: SD_SKETCH.danger });
    sdNode(ctx, db, true, { accent });
    sdNode(ctx, out, phase.active >= 2, { accent: out.color });
    sdArrow(ctx, { x: a.x + a.w, y: a.y + 24 }, { x: db.x, y: db.y + 24 }, accent, true);
    sdArrow(ctx, { x: b.x + b.w, y: b.y + 24 }, { x: db.x, y: db.y + 62 }, phase.active === 2 ? warn : SD_SKETCH.danger, phase.active >= 2, phase.active === 2);
    sdArrow(ctx, { x: db.x + db.w, y: db.y + 43 }, { x: out.x, y: out.y + 29 }, out.color, phase.active >= 2);
    sdPacket(ctx, { x: a.x + a.w, y: a.y + 24 }, { x: db.x, y: db.y + 24 }, Math.max(0, Math.min(1, p / 0.2)), accent, 'lock');
    sdPacket(ctx, { x: b.x + b.w, y: b.y + 24 }, { x: db.x, y: db.y + 62 }, Math.max(0, Math.min(1, (p - 0.34) / 0.2)), warn, 'wait');
    sdText(ctx, 'Watch in UI: lock wait time, queue depth, retry rate, and hot-row alarms.', 16, h - 54, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

function sketchTxnTimeline(canvas, colors) {
  const { ctx, w, h } = sdSetupCanvas(canvas, 210);
  const accent = colors.accent || '#34d399';
  const steps = ['BEGIN', 'READ snapshot', 'WRITE row', 'COMMIT'];
  const t0 = performance.now();

  const draw = (t) => {
    const loop = sdLoop(t, t0, 7600);
    const active = Math.min(3, Math.floor(loop * steps.length));
    ctx.clearRect(0, 0, w, h);
    sdHeader(ctx, w, 'End-to-end: transaction window from app request to durable commit', `${active + 1}. ${steps[active]}`, accent);
    sdStepper(ctx, ['Open', 'Read', 'Mutate', 'Durable'], active, 16, h - 34, w - 32, accent);
    const sw = (w - 46) / steps.length;
    steps.forEach((s, i) => {
      const x = 20 + i * sw;
      const done = i < active;
      const on = i === active;
      sdRoundRect(ctx, x, 62, sw - 8, 58, 12, on ? `${accent}20` : done ? 'rgba(52,211,153,.12)' : SD_SKETCH.panel, on ? accent : done ? SD_SKETCH.good : SD_SKETCH.line, on ? 2 : 1);
      sdText(ctx, s, x + 10, 80, { size: 9, weight: 700, color: on ? accent : SD_SKETCH.text });
      const detail = ['start clock', 'stable view', 'locks if needed', 'fsync + release'][i];
      sdText(ctx, detail, x + 10, 99, { size: 8, color: SD_SKETCH.muted });
    });

    const px = 20 + loop * (w - 46);
    sdArrow(ctx, { x: 22, y: 142 }, { x: w - 26, y: 142 }, SD_SKETCH.line, false);
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(px, 142, 5, 0, Math.PI * 2);
    ctx.fill();
    sdText(ctx, 'Keep the highlighted window short: user latency and lock risk both grow while it is open.', 16, h - 52, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

function sketchQueueSla(canvas, colors) {
  const { ctx, w, h } = sdSetupCanvas(canvas, 230);
  const g = '#34d399';
  const accent = colors.accent || '#818cf8';
  const t0 = performance.now();
  let depth = 0.28;

  const draw = (t) => {
    const secs = ((t - t0) / 1000) % 10;
    const produce = 1 + Math.sin(secs * 1.2) * 0.35 + 0.4;
    const consume = 0.85 + Math.sin(secs * 0.7 + 1) * 0.25;
    depth = Math.max(0, Math.min(1, depth + (produce - consume) * 0.035));
    const over = depth > 0.72;
    const phaseLabel = over ? 'SLA risk: scale consumers' : 'Healthy: lag under budget';
    ctx.clearRect(0, 0, w, h);
    sdHeader(ctx, w, 'End-to-end: producer burst → queue buffer → consumer workers', phaseLabel, over ? SD_SKETCH.danger : accent);
    sdStepper(ctx, ['Produce', 'Buffer', 'Measure age', 'Consume', 'Scale/shed'], over ? 4 : 3, 16, h - 36, w - 32, over ? SD_SKETCH.danger : accent);

    const prod = { x: 16, y: 62, w: 112, h: 50, label: 'Producers', sub: `${produce.toFixed(1)}x input`, color: accent };
    const queue = { x: w * 0.36, y: 48, w: w * 0.28, h: 94, label: 'Queue', sub: 'durable buffer', color: over ? SD_SKETCH.danger : g };
    const cons = { x: w - 142, y: 62, w: 118, h: 50, label: 'Consumers', sub: `${consume.toFixed(1)}x drain`, color: SD_SKETCH.warn };
    sdNode(ctx, prod, true, { accent });
    sdNode(ctx, queue, true, { accent: queue.color });
    sdNode(ctx, cons, true, { accent: SD_SKETCH.warn });
    sdArrow(ctx, { x: prod.x + prod.w, y: prod.y + 25 }, { x: queue.x, y: queue.y + 47 }, accent, true);
    sdArrow(ctx, { x: queue.x + queue.w, y: queue.y + 47 }, { x: cons.x, y: cons.y + 25 }, SD_SKETCH.warn, true);
    sdPacket(ctx, { x: prod.x + prod.w, y: prod.y + 25 }, { x: queue.x, y: queue.y + 47 }, (secs % 2.8) / 2.8, accent, 'events');
    sdPacket(ctx, { x: queue.x + queue.w, y: queue.y + 47 }, { x: cons.x, y: cons.y + 25 }, ((secs + 1.1) % 3.4) / 3.4, SD_SKETCH.warn, 'work');

    const fillH = 70 * depth;
    ctx.fillStyle = over ? 'rgba(248,113,113,.32)' : 'rgba(52,211,153,.26)';
    ctx.fillRect(queue.x + queue.w - 24, queue.y + 82 - fillH, 10, fillH);
    sdText(ctx, `oldest age ${Math.round(depth * 90)}s / SLA 65s`, queue.x + 12, queue.y + 112, { size: 8, color: over ? SD_SKETCH.danger : g });
    sdText(ctx, 'UI hint: place age-of-oldest, DLQ count, and worker autoscale state next to the queue.', 16, h - 54, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

function sketchProcessingTiers(canvas, colors) {
  const { ctx, w, h } = sdSetupCanvas(canvas, 230);
  const rose = '#fb7185';
  const amber = '#fbbf24';
  const cyan = '#22d3ee';
  const t0 = performance.now();

  const draw = (t) => {
    const p = sdLoop(t, t0, 9000);
    const active = p < 0.28 ? 0 : p < 0.62 ? 1 : 2;
    ctx.clearRect(0, 0, w, h);
    sdHeader(ctx, w, 'End-to-end: classify one feature by freshness and cost budget', ['Realtime path', 'Near-time path', 'Batch path'][active], [rose, amber, cyan][active]);
    sdStepper(ctx, ['User waits', 'Queue ok', 'Report later'], active, 16, h - 36, w - 32, [rose, amber, cyan][active]);

    const bars = [
      { x: 20, w: w * 0.29, c: rose, label: 'Real-time', sub: '<150ms p95', sub2: 'checkout, auth' },
      { x: 30 + w * 0.31, w: w * 0.29, c: amber, label: 'Near-time', sub: '<60s lag', sub2: 'search, email' },
      { x: w - w * 0.29 - 20, w: w * 0.29, c: cyan, label: 'Batch', sub: 'hourly/daily', sub2: 'reports, ML' },
    ];
    bars.forEach((b, i) => {
      const on = i === active;
      const bh = on ? 102 : 76;
      sdRoundRect(ctx, b.x, 58 + (on ? 0 : 14), b.w, bh, 14, on ? `${b.c}22` : SD_SKETCH.panel, on ? b.c : SD_SKETCH.line, on ? 2 : 1);
      sdText(ctx, b.label, b.x + 12, 78 + (on ? 0 : 14), { size: 10, weight: 800, color: b.c });
      sdText(ctx, b.sub, b.x + 12, 100 + (on ? 0 : 14), { size: 9, color: SD_SKETCH.text });
      sdText(ctx, b.sub2, b.x + 12, 118 + (on ? 0 : 14), { size: 8, color: SD_SKETCH.muted });
      if (on) sdText(ctx, 'chosen for this step', b.x + 12, 142, { size: 8, color: b.c });
    });
    sdText(ctx, 'Good UX names the delay: instant response, “processing soon”, or “available tomorrow”.', 16, h - 54, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

function sketchCacheKeys(canvas, colors) {
  const { ctx, w, h } = sdSetupCanvas(canvas, 220);
  const accent = colors.accent || '#818cf8';
  const t0 = performance.now();

  const draw = (t) => {
    const p = sdLoop(t, t0, 7600);
    const active = p < 0.28 ? 0 : p < 0.55 ? 1 : p < 0.78 ? 2 : 3;
    ctx.clearRect(0, 0, w, h);
    sdHeader(ctx, w, 'End-to-end: UI query becomes a safe cache key', ['Request', 'Namespace', 'Fetch/cache', 'Evict version'][active], accent);
    sdStepper(ctx, ['Tenant', 'Entity', 'Version', 'TTL'], active, 16, h - 34, w - 32, accent);

    const keys = ['tenant:acme:user:123:profile:v3', 'tenant:acme:user:123:orders:v2', 'tenant:beta:session:abc:cart:v1'];
    keys.forEach((k, i) => {
      const y = 54 + i * 36;
      sdRoundRect(ctx, 18, y - 13, w - 36, 28, 9, i === active % 3 ? `${accent}20` : SD_SKETCH.panel, i === active % 3 ? accent : SD_SKETCH.line, i === active % 3 ? 2 : 1);
      sdText(ctx, k, 28, y + 1, { size: 10, mono: true, color: i === active % 3 ? '#fff' : SD_SKETCH.text });
    });
    sdText(ctx, 'UI hint: show key parts near cache diagnostics so misses explain themselves.', 16, h - 52, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

function sketchCoalescing(canvas, colors) {
  const { ctx, w, h } = sdSetupCanvas(canvas, 230);
  const accent = colors.accent || '#34d399';
  const t0 = performance.now();

  const draw = (t) => {
    const p = sdLoop(t, t0, 8200);
    const active = p < 0.25 ? 0 : p < 0.48 ? 1 : p < 0.72 ? 2 : 3;
    ctx.clearRect(0, 0, w, h);
    sdHeader(ctx, w, 'End-to-end: cache miss herd collapses into one origin call', ['Misses arrive', 'Join in-flight', 'One origin call', 'Fan out result'][active], accent);
    sdStepper(ctx, ['Many callers', 'Dedupe key', 'Origin once', 'Reply all'], active, 16, h - 36, w - 32, accent);
    const clients = [52, 88, 124];
    const gate = { x: w * 0.36, y: 65, w: 126, h: 62, label: 'Single-flight', sub: 'key: product:42', color: accent };
    const origin = { x: w - 142, y: 72, w: 118, h: 48, label: 'Origin DB/API', sub: 'only one hit', color: SD_SKETCH.warn };
    clients.forEach((cy, i) => {
      sdRoundRect(ctx, 18, cy - 14, 96, 28, 999, SD_SKETCH.panel, active === 0 ? accent : SD_SKETCH.line);
      sdText(ctx, `Client ${i + 1}`, 32, cy, { size: 9, color: SD_SKETCH.text });
      sdArrow(ctx, { x: 114, y: cy }, { x: gate.x, y: gate.y + 31 }, accent, true, i > 0);
      sdPacket(ctx, { x: 114, y: cy }, { x: gate.x, y: gate.y + 31 }, Math.max(0, Math.min(1, (p - i * 0.04) / 0.35)), accent, i === 0 ? 'miss' : '');
    });
    sdNode(ctx, gate, active >= 1, { accent });
    sdNode(ctx, origin, active >= 2, { accent: SD_SKETCH.warn });
    sdArrow(ctx, { x: gate.x + gate.w, y: gate.y + 31 }, { x: origin.x, y: origin.y + 24 }, SD_SKETCH.warn, active >= 2);
    sdPacket(ctx, { x: gate.x + gate.w, y: gate.y + 31 }, { x: origin.x, y: origin.y + 24 }, Math.max(0, Math.min(1, (p - 0.48) / 0.2)), SD_SKETCH.warn, 'fetch');
    if (active === 3) sdText(ctx, 'same response wakes all waiters', gate.x + 4, gate.y + 88, { size: 9, color: SD_SKETCH.good });
    sdText(ctx, 'UI hint: show suppressed duplicate count and origin latency during incidents.', 16, h - 54, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

function sketchPgVsDynamo(canvas, colors) {
  const { ctx, w, h } = sdSetupCanvas(canvas, 230);
  const sqlc = colors.accent || '#818cf8';
  const ddbc = '#34d399';
  const t0 = performance.now();

  const draw = (t) => {
    const p = sdLoop(t, t0, 9000);
    const active = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
    ctx.clearRect(0, 0, w, h);
    sdHeader(ctx, w, 'End-to-end: screen query chooses storage access path', ['Product screen asks', 'SQL explores joins', 'Dynamo uses known keys'][active], active === 2 ? ddbc : sqlc);
    sdStepper(ctx, ['UI needs data', 'Ad-hoc shape', 'Known key path'], active, 16, h - 36, w - 32, active === 2 ? ddbc : sqlc);

    const ui = { x: 16, y: 70, w: 114, h: 54, label: 'Product UI', sub: 'orders + user + filters', color: sqlc };
    const pg = { x: w * 0.34, y: 48, w: 142, h: 72, label: 'PostgreSQL', sub: 'JOIN + WHERE', sub2: 'flexible questions', color: sqlc };
    const dy = { x: w * 0.34, y: 132, w: 142, h: 56, label: 'DynamoDB', sub: 'Query(pk, sk)', sub2: 'pre-modeled screen', color: ddbc };
    const result = { x: w - 146, y: 84, w: 120, h: 60, label: 'Response', sub: active === 1 ? 'rich relation set' : 'bounded item list', color: active === 2 ? ddbc : sqlc };
    sdNode(ctx, ui, active === 0, { accent: sqlc });
    sdNode(ctx, pg, active === 1, { accent: sqlc });
    sdNode(ctx, dy, active === 2, { accent: ddbc });
    sdNode(ctx, result, active > 0, { accent: result.color });
    sdArrow(ctx, { x: ui.x + ui.w, y: ui.y + 27 }, { x: pg.x, y: pg.y + 36 }, sqlc, active <= 1);
    sdArrow(ctx, { x: ui.x + ui.w, y: ui.y + 27 }, { x: dy.x, y: dy.y + 28 }, ddbc, active === 2, true);
    sdArrow(ctx, { x: pg.x + pg.w, y: pg.y + 36 }, { x: result.x, y: result.y + 24 }, sqlc, active === 1);
    sdArrow(ctx, { x: dy.x + dy.w, y: dy.y + 28 }, { x: result.x, y: result.y + 42 }, ddbc, active === 2);
    sdText(ctx, active === 1 ? 'SELECT orders JOIN users WHERE date BETWEEN ...' : 'Get by tenant#user, range orderDate', 22, 154, { size: 9, mono: true, color: active === 1 ? sqlc : ddbc });
    sdText(ctx, 'UI/UX decision: design the screen first, then prove each read/write path is bounded.', 16, h - 54, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

function sketchBtreeLookup(canvas, colors) {
  const { ctx, w, h } = sdSetupCanvas(canvas, 230);
  const g = '#34d399';
  const accent = colors.accent || '#818cf8';
  const t0 = performance.now();

  const nodes = [
    { x: w * 0.5, y: 62, lab: '30' },
    { x: w * 0.3, y: 112, lab: '10' },
    { x: w * 0.7, y: 112, lab: '50' },
    { x: w * 0.2, y: 152, lab: '5' },
    { x: w * 0.4, y: 152, lab: '20..29' },
  ];
  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
  ];

  const draw = (t) => {
    const p = sdLoop(t, t0, 7800);
    const step = Math.min(3, Math.floor(p * 4));
    const pathNodes = [];
    if (step >= 0) pathNodes.push(0);
    if (step >= 1) pathNodes.push(1);
    if (step >= 2) pathNodes.push(4);
    ctx.clearRect(0, 0, w, h);
    sdHeader(ctx, w, 'End-to-end: query predicate descends index pages', ['Compare root', 'Choose left child', 'Find leaf range', 'Fetch row pointer'][step], accent);
    sdStepper(ctx, ['Root', 'Branch', 'Leaf', 'Heap row'], step, 16, h - 36, w - 32, accent);

    edges.forEach(([a, b]) => {
      const ia = pathNodes.indexOf(a);
      const ib = pathNodes.indexOf(b);
      const on = ia !== -1 && ib !== -1 && Math.abs(ia - ib) === 1;
      ctx.strokeStyle = on ? g : 'rgba(255,255,255,.12)';
      ctx.lineWidth = on ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(nodes[a].x, nodes[a].y + 14);
      ctx.lineTo(nodes[b].x, nodes[b].y - 14);
      ctx.stroke();
    });

    nodes.forEach((n, i) => {
      const hi = pathNodes.includes(i);
      ctx.beginPath();
      ctx.fillStyle = hi ? 'rgba(52,211,153,.2)' : 'rgba(255,255,255,.04)';
      ctx.strokeStyle = hi ? g : 'rgba(255,255,255,.2)';
      ctx.lineWidth = hi ? 2 : 1;
      ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      sdText(ctx, n.lab, n.x, n.y + 1, { size: 9, mono: true, align: 'center', color: '#e5e5e5' });
    });

    const query = { x: 16, y: 50, w: 130, h: 42, label: 'WHERE key = 25', sub: 'planner picks index', color: accent };
    const heap = { x: w - 152, y: 150, w: 126, h: 42, label: 'Table row', sub: 'fetch by pointer', color: g };
    sdNode(ctx, query, step === 0, { accent });
    sdNode(ctx, heap, step === 3, { accent: g });
    if (step === 3) sdArrow(ctx, { x: nodes[4].x + 18, y: nodes[4].y }, { x: heap.x, y: heap.y + 20 }, g, true);
    sdText(ctx, 'UI hint: pair query demos with “pages read” so index wins are visible.', 16, h - 54, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

SD.SKETCH_RUNNERS = {
  roundRobin: sketchRoundRobin,
  sqlLocks: sketchSqlLocks,
  txnTimeline: sketchTxnTimeline,
  queueSla: sketchQueueSla,
  processingTiers: sketchProcessingTiers,
  cacheKeys: sketchCacheKeys,
  coalescing: sketchCoalescing,
  pgVsDynamo: sketchPgVsDynamo,
  btreeLookup: sketchBtreeLookup,
};

SD.stopAllSketches = function () {
  (SD.sketchCleanups || []).forEach((fn) => fn());
  SD.sketchCleanups = [];
};

SD.startSketchesIn = function (rootEl, zoneColor) {
  SD.stopAllSketches();
  const secondary = zoneColor === '#34d399' ? '#22d3ee' : '#34d399';
  const colors = { accent: zoneColor, secondary };

  rootEl.querySelectorAll('canvas[data-sketch]').forEach((canvas) => {
    const id = canvas.getAttribute('data-sketch');
    const runner = SD.SKETCH_RUNNERS[id];
    if (!runner) return;
    const cancel = runner(canvas, colors);
    SD.sketchCleanups.push(cancel);
  });
};
