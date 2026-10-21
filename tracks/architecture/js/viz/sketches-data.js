window.SD = window.SD || {};

/* Canvas sketches for data: cache keys, request coalescing, SQL vs DynamoDB, B-tree lookup.
   Helpers and the colour palette live in sketch-kit.js. */

function sketchCacheKeys(canvas, colors) {
  const { ctx, w, h } = sdSetupCanvas(canvas, 220);
  const accent = colors.accent || SD_SKETCH.accent;
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
      sdRoundRect(ctx, 18, y - 13, w - 36, 28, 9, i === active % 3 ? sdAlpha(accent, 0.13) : SD_SKETCH.panel, i === active % 3 ? accent : SD_SKETCH.line, i === active % 3 ? 2 : 1);
      sdText(ctx, k, 28, y + 1, { size: 10, mono: true, color: i === active % 3 ? SD_SKETCH.text : SD_SKETCH.text });
    });
    sdText(ctx, 'UI hint: show key parts near cache diagnostics so misses explain themselves.', 16, h - 52, { size: 9, color: SD_SKETCH.muted });
  };

  return sdRafLoop(draw);
}

function sketchCoalescing(canvas, colors) {
  const { ctx, w, h } = sdSetupCanvas(canvas, 230);
  const accent = colors.accent || SD_SKETCH.good;
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
  const sqlc = colors.accent || SD_SKETCH.accent;
  const ddbc = SD_SKETCH.good;
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
  const g = SD_SKETCH.good;
  const accent = colors.accent || SD_SKETCH.accent;
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
      ctx.strokeStyle = on ? g : sdAlpha(SD_SKETCH.text, .12);
      ctx.lineWidth = on ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(nodes[a].x, nodes[a].y + 14);
      ctx.lineTo(nodes[b].x, nodes[b].y - 14);
      ctx.stroke();
    });

    nodes.forEach((n, i) => {
      const hi = pathNodes.includes(i);
      ctx.beginPath();
      ctx.fillStyle = hi ? sdAlpha(SD_SKETCH.good, .2) : sdAlpha(SD_SKETCH.text, .04);
      ctx.strokeStyle = hi ? g : sdAlpha(SD_SKETCH.text, .2);
      ctx.lineWidth = hi ? 2 : 1;
      ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      sdText(ctx, n.lab, n.x, n.y + 1, { size: 9, mono: true, align: 'center', color: SD_SKETCH.text });
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

Object.assign(SD.SKETCH_RUNNERS, {
  cacheKeys: sketchCacheKeys,
  coalescing: sketchCoalescing,
  pgVsDynamo: sketchPgVsDynamo,
  btreeLookup: sketchBtreeLookup,
});
