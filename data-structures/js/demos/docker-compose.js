window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.dockerCompose = function (container) {
  const UI = DS.demoUI;
  const services = [
    { id: 'web', label: 'frontend', icon: 'fa-window-maximize', port: '5173:5173', volume: null, status: 'stopped' },
    { id: 'api', label: 'backend', icon: 'fa-server', port: '3000:3000', volume: './backend:/app', status: 'stopped' },
    { id: 'db', label: 'database', icon: 'fa-database', port: '5432:5432', volume: 'db_data', status: 'stopped' },
  ];
  let step = 0;
  let networkReady = false;
  let running = false;

  const steps = [
    { label: 'Parse compose file', detail: 'Compose reads services: web, api, db.' },
    { label: 'Create network', detail: 'Default bridge network app_net is created.' },
    { label: 'Start db', detail: 'Database container starts and mounts volume db_data.' },
    { label: 'Start api', detail: 'API starts after db (depends_on) and reads DATABASE_URL.' },
    { label: 'Start web', detail: 'Frontend publishes port 5173 and calls http://api:3000.' },
    { label: 'Stack healthy', detail: 'All services running. Host ports and internal DNS work.' },
  ];

  const applyStep = () => {
    services.forEach((svc) => { svc.status = 'stopped'; });
    networkReady = false;
    if (step >= 1) networkReady = true;
    if (step >= 2) services.find((s) => s.id === 'db').status = 'running';
    if (step >= 3) services.find((s) => s.id === 'api').status = 'running';
    if (step >= 4) services.find((s) => s.id === 'web').status = 'running';
    running = step >= 5;
  };

  const renderStage = () => `
    <div class="compose-demo">
      <div class="compose-network ${networkReady ? 'is-live' : ''}">
        <span><i class="fas fa-network-wired"></i> app_net</span>
        <div class="compose-services">
          ${services.map((svc) => `
            <div class="compose-service ${svc.status}">
              <div class="compose-service-head">
                <i class="fas ${svc.icon}"></i>
                <strong>${UI.esc(svc.label)}</strong>
                <span class="compose-badge">${svc.status}</span>
              </div>
              <div class="compose-meta">
                <span>port ${UI.esc(svc.port)}</span>
                ${svc.volume ? `<span>volume ${UI.esc(svc.volume)}</span>` : '<span>no host bind</span>'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <pre class="compose-yaml">services:
  web:
    ports: ["5173:5173"]
    depends_on: [api]
  api:
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/app
    depends_on: [db]
  db:
    image: postgres:16
    volumes: [db_data:/var/lib/postgresql/data]</pre>
    </div>`;

  const inspectorRows = () => {
    const current = steps[Math.min(step, steps.length - 1)];
    return [
      ['Step', `${step + 1}/${steps.length}`, 'Compose startup progress'],
      ['Action', current.label, current.detail],
      ['Network', networkReady ? 'app_net ready' : 'not created', 'Services resolve each other by name'],
      ['Host access', running ? 'localhost:5173, :3000' : 'waiting', 'Published ports on your machine'],
    ];
  };

  const render = () => {
    applyStep();
    const current = steps[Math.min(step, steps.length - 1)];
    container.innerHTML = UI.shell({
      title: 'Docker Compose stack runner',
      hint: 'Step through docker compose up and see how frontend, backend, and database connect through ports, volumes, and a shared network.',
      stage: renderStage(),
      inspector: UI.inspector('Compose details', inspectorRows()),
      stats: [
        UI.statChip('Services', services.filter((s) => s.status === 'running').length + '/3'),
        UI.statChip('Network', networkReady ? 'up' : 'down'),
        UI.statChip('State', running ? 'healthy' : 'starting'),
      ].join(''),
      controls: `
        <button class="demo-btn success" onclick="composeDemoNext()"><i class="fas fa-play"></i> Next step</button>
        <button class="demo-btn" onclick="composeDemoPrev()"><i class="fas fa-backward-step"></i> Back</button>
        <button class="demo-btn danger" onclick="composeDemoReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'composeDemoMsg',
    });
    DS.showMsg('composeDemoMsg', current.detail, running ? 'success' : 'info');
  };

  window.composeDemoNext = () => {
    step = Math.min(step + 1, steps.length - 1);
    render();
  };

  window.composeDemoPrev = () => {
    step = Math.max(step - 1, 0);
    render();
  };

  window.composeDemoReset = () => {
    step = 0;
    render();
  };

  render();
};
