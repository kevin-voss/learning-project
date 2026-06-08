window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.cloudHosting = function (container) {
  const UI = DS.demoUI;
  const models = {
    vm: {
      label: 'Virtual Machine',
      icon: 'fa-server',
      summary: 'You rent a full machine and manage the OS, patches, and runtime.',
      cost: '$$$',
      scale: 'Manual: add VMs or resize',
      ops: 'High: OS, security, deploy scripts',
      coldStart: 'None: always on',
      bestFor: 'Legacy apps, full control, long-running processes',
    },
    container: {
      label: 'Containers (managed platform)',
      icon: 'fa-box',
      summary: 'You ship container images. The platform runs and restarts them.',
      cost: '$$',
      scale: 'Good: horizontal pod/instance scaling',
      ops: 'Medium: images, env vars, health checks',
      coldStart: 'Low: warm instances stay ready',
      bestFor: 'Web APIs, workers, most product teams',
    },
    serverless: {
      label: 'Serverless functions',
      icon: 'fa-bolt',
      summary: 'Provider runs your function per event. You do not manage servers.',
      cost: '$ at low traffic (pay per invocation)',
      scale: 'Excellent: automatic concurrency',
      ops: 'Low: function code + triggers only',
      coldStart: 'Yes: first request may be slower',
      bestFor: 'Webhooks, cron jobs, bursty light work',
    },
  };
  let selected = 'container';

  const renderStage = () => {
    const model = models[selected];
    return `
      <div class="cloud-demo">
        <div class="cloud-picker">
          ${Object.entries(models).map(([key, m]) => `
            <button type="button" class="cloud-option ${key === selected ? 'active' : ''}" onclick="cloudPick('${key}')">
              <i class="fas ${m.icon}"></i>
              <span>${UI.esc(m.label)}</span>
            </button>
          `).join('')}
        </div>
        <div class="cloud-detail">
          <h4>${UI.esc(model.label)}</h4>
          <p>${UI.esc(model.summary)}</p>
          <div class="cloud-grid">
            <div><span>Cost profile</span><strong>${UI.esc(model.cost)}</strong></div>
            <div><span>Scaling</span><strong>${UI.esc(model.scale)}</strong></div>
            <div><span>Ops burden</span><strong>${UI.esc(model.ops)}</strong></div>
            <div><span>Cold starts</span><strong>${UI.esc(model.coldStart)}</strong></div>
          </div>
          <div class="cloud-best">
            <strong>Best for:</strong> ${UI.esc(model.bestFor)}
          </div>
        </div>
      </div>`;
  };

  const inspectorRows = () => {
    const model = models[selected];
    return [
      ['Model', model.label, 'Selected deployment style'],
      ['Ops', model.ops, 'How much infrastructure you manage'],
      ['Scale', model.scale, 'How elasticity works'],
      ['Fit', model.bestFor, 'Typical use case'],
    ];
  };

  const render = () => {
    UI.mount(container, {
      title: 'Cloud deployment tradeoffs',
      hint: 'Pick VM, container, or serverless and compare cost, scaling, operations work, and cold starts.',
      stage: renderStage(),
      inspector: UI.inspector('Tradeoff lens', inspectorRows()),
      stats: [
        UI.statChip('Model', models[selected].label),
        UI.statChip('Cost', models[selected].cost),
        UI.statChip('Ops', models[selected].ops.split(' ')[0]),
      ].join(''),
      controls: `
        <button class="demo-btn" onclick="cloudPick('vm')"><i class="fas fa-server"></i> VM</button>
        <button class="demo-btn success" onclick="cloudPick('container')"><i class="fas fa-box"></i> Containers</button>
        <button class="demo-btn" onclick="cloudPick('serverless')"><i class="fas fa-bolt"></i> Serverless</button>`,
      msgId: 'cloudDemoMsg',
    });
    DS.showMsg('cloudDemoMsg', models[selected].summary, 'info');
  };

  window.cloudPick = (key) => {
    if (models[key]) selected = key;
    render();
  };

  render();
};
