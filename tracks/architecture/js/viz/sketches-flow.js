window.SD = window.SD || {};

/* Canvas sketches for request flow: load balancing, locks, transactions, queues, tiers.
   Helpers and the colour palette live in sketch-kit.js. */

function sketchRoundRobin(canvas, colors) {
  const accent = colors.accent || SD_SKETCH.accent;
  const srv = colors.secondary || SD_SKETCH.good;
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
  const accent = colors.accent || SD_SKETCH.good;
  const warn = SD_SKETCH.warn;
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
  const accent = colors.accent || SD_SKETCH.good;
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
      sdRoundRect(ctx, x, 62, sw - 8, 58, 12, on ? sdAlpha(accent, 0.13) : done ? sdAlpha(SD_SKETCH.good, .12) : SD_SKETCH.panel, on ? accent : done ? SD_SKETCH.good : SD_SKETCH.line, on ? 2 : 1);
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
  const g = SD_SKETCH.good;
  const accent = colors.accent || SD_SKETCH.accent;
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
    ctx.fillStyle = over ? sdAlpha(SD_SKETCH.danger, .32) : sdAlpha(SD_SKETCH.good, .26);
    ctx.fillRect(queue.x + queue.w - 24, queue.y + 82 - fillH, 10, fillH);
    sdText(ctx, `oldest age ${Math.round(depth * 90)}s / SLA 65s`, queue.x + 12, queue.y + 112, { size: 8, color: over ? SD_SKETCH.danger : g });
    sdText(ctx, 'UI hint: place age-of-oldest, DLQ count, and worker autoscale state next to the queue.', 16, h - 54, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

function sketchProcessingTiers(canvas, colors) {
  const { ctx, w, h } = sdSetupCanvas(canvas, 230);
  const rose = SD_SKETCH.rose;
  const amber = SD_SKETCH.warn;
  const cyan = SD_SKETCH.cyan;
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
      sdRoundRect(ctx, b.x, 58 + (on ? 0 : 14), b.w, bh, 14, on ? sdAlpha(b.c, 0.13) : SD_SKETCH.panel, on ? b.c : SD_SKETCH.line, on ? 2 : 1);
      sdText(ctx, b.label, b.x + 12, 78 + (on ? 0 : 14), { size: 10, weight: 800, color: b.c });
      sdText(ctx, b.sub, b.x + 12, 100 + (on ? 0 : 14), { size: 9, color: SD_SKETCH.text });
      sdText(ctx, b.sub2, b.x + 12, 118 + (on ? 0 : 14), { size: 8, color: SD_SKETCH.muted });
      if (on) sdText(ctx, 'chosen for this step', b.x + 12, 142, { size: 8, color: b.c });
    });
    sdText(ctx, 'Good UX names the delay: instant response, “processing soon”, or “available tomorrow”.', 16, h - 54, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

Object.assign(SD.SKETCH_RUNNERS, {
  roundRobin: sketchRoundRobin,
  sqlLocks: sketchSqlLocks,
  txnTimeline: sketchTxnTimeline,
  queueSla: sketchQueueSla,
  processingTiers: sketchProcessingTiers,
});
