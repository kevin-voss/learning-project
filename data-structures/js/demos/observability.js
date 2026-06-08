window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.observability = function (container) {
  const UI = DS.demoUI;
  let phase = 0;
  const logs = [];
  const metrics = {
    requests: 0,
    errors: 0,
    p95ms: 120,
  };
  const spans = [];
  let alertFired = false;

  const phases = [
    { label: 'Request arrives', path: 'browser -> load balancer -> api' },
    { label: 'API handles request', path: 'api handler + auth check' },
    { label: 'Database query', path: 'api -> postgres' },
    { label: 'Payment timeout', path: 'api -> payment provider (slow)' },
    { label: 'Error response', path: '504 returned to user' },
  ];

  const resetSignals = () => {
    logs.length = 0;
    spans.length = 0;
    metrics.requests = 0;
    metrics.errors = 0;
    metrics.p95ms = 120;
    alertFired = false;
  };

  const runPhase = () => {
    if (phase === 0) {
      metrics.requests += 1;
      logs.push({ level: 'info', msg: 'checkout_started requestId=req_9f2a userId=42' });
      spans.push({ name: 'GET /checkout', ms: 0 });
    }
    if (phase === 1) {
      logs.push({ level: 'info', msg: 'auth_ok requestId=req_9f2a' });
      spans.push({ name: 'api.checkout', ms: 48 });
    }
    if (phase === 2) {
      logs.push({ level: 'info', msg: 'db_order_loaded requestId=req_9f2a orderId=881' });
      spans.push({ name: 'db.selectOrder', ms: 62 });
    }
    if (phase === 3) {
      logs.push({ level: 'warn', msg: 'payment_slow requestId=req_9f2a provider=stripe' });
      spans.push({ name: 'payment.charge', ms: 2100 });
      metrics.p95ms = 890;
    }
    if (phase === 4) {
      metrics.errors += 1;
      logs.push({ level: 'error', msg: 'payment_timeout requestId=req_9f2a status=504' });
      spans[0].ms = 920;
      if (metrics.errors / Math.max(metrics.requests, 1) > 0) {
        alertFired = true;
      }
    }
  };

  const renderStage = () => `
    <div class="obs-demo">
      <div class="obs-flow">
        ${['Browser', 'Load balancer', 'API', 'Database', 'Payment'].map((node, i) => `
          <div class="obs-node ${phase >= i ? 'is-active' : ''}">
            <i class="fas ${['fa-globe', 'fa-shuffle', 'fa-server', 'fa-database', 'fa-credit-card'][i]}"></i>
            <span>${UI.esc(node)}</span>
          </div>
          ${i < 4 ? '<div class="obs-arrow"><i class="fas fa-arrow-right"></i></div>' : ''}
        `).join('')}
      </div>
      <div class="obs-panels">
        <section class="obs-panel">
          <h4><i class="fas fa-file-lines"></i> Logs</h4>
          <ul>${logs.map((line) => `<li class="log-${line.level}">${UI.esc(line.msg)}</li>`).join('') || '<li class="obs-empty">No logs yet</li>'}</ul>
        </section>
        <section class="obs-panel">
          <h4><i class="fas fa-chart-line"></i> Metrics</h4>
          <div class="obs-metrics">
            <div><span>requests</span><strong>${metrics.requests}</strong></div>
            <div><span>errors</span><strong>${metrics.errors}</strong></div>
            <div><span>p95 latency</span><strong>${metrics.p95ms}ms</strong></div>
          </div>
        </section>
        <section class="obs-panel">
          <h4><i class="fas fa-route"></i> Trace</h4>
          <ul>${spans.map((span) => `<li>${UI.esc(span.name)} <strong>${span.ms}ms</strong></li>`).join('') || '<li class="obs-empty">No spans yet</li>'}</ul>
        </section>
        <section class="obs-panel ${alertFired ? 'is-alert' : ''}">
          <h4><i class="fas fa-bell"></i> Alert</h4>
          <p>${alertFired ? 'HighErrorRate: 5xx detected for req_9f2a: page on-call' : 'No alert yet'}</p>
        </section>
      </div>
    </div>`;

  const inspectorRows = () => {
    const current = phases[Math.min(phase, phases.length - 1)];
    return [
      ['Phase', current.label, 'Current step in the request'],
      ['Path', current.path, 'Where work is happening'],
      ['Logs', String(logs.length), 'Discrete events collected'],
      ['Alert', alertFired ? 'firing' : 'idle', 'Symptom-based notification'],
    ];
  };

  const render = () => {
    const current = phases[Math.min(phase, phases.length - 1)];
    UI.mount(container, {
      title: 'Observability request flow',
      hint: 'Walk through a checkout request. Watch logs, metrics, trace spans, and an alert when the payment times out.',
      stage: renderStage(),
      inspector: UI.inspector('Signal details', inspectorRows()),
      stats: [
        UI.statChip('Phase', `${phase + 1}/${phases.length}`),
        UI.statChip('Logs', logs.length),
        UI.statChip('Errors', metrics.errors),
      ].join(''),
      controls: `
        <button class="demo-btn success" onclick="obsDemoNext()"><i class="fas fa-forward-step"></i> Next</button>
        <button class="demo-btn" onclick="obsDemoPrev()"><i class="fas fa-backward-step"></i> Back</button>
        <button class="demo-btn danger" onclick="obsDemoReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'obsDemoMsg',
    });
    DS.showMsg('obsDemoMsg', current.path, alertFired ? 'error' : 'info');
  };

  window.obsDemoNext = () => {
    if (phase < phases.length - 1) {
      phase += 1;
      runPhase();
    }
    render();
  };

  window.obsDemoPrev = () => {
    phase = Math.max(phase - 1, 0);
    resetSignals();
    for (let i = 0. I <= phase. I += 1) runPhase();
    render();
  };

  window.obsDemoReset = () => {
    phase = 0;
    resetSignals();
    render();
  };

  render();
};
