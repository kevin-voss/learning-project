window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.abstractionApis = function (container) {
  const UI = DS.demoUI;
  let layer = 'app';

  const layers = {
    app: { title: 'Your app', detail: 'Calls fetch("/api/users"): hides HTTP details.' },
    api: { title: 'API layer', detail: 'Validates input, returns JSON, hides database.' },
    db: { title: 'Database', detail: 'Stores rows. App never talks to SQL directly.' },
  };

  const render = () => {
    const l = layers[layer];
    container.innerHTML = UI.shell({
      title: 'Abstraction layers',
      hint: 'Each layer hides complexity below: change database without rewriting UI.',
      stage: `
        <div class="abstract-demo">
          <div class="demo-controls">
            <button type="button" class="demo-btn ${layer === 'app' ? 'success' : ''}" onclick="absSet('app')">App</button>
            <button type="button" class="demo-btn ${layer === 'api' ? 'success' : ''}" onclick="absSet('api')">API</button>
            <button type="button" class="demo-btn ${layer === 'db' ? 'success' : ''}" onclick="absSet('db')">Database</button>
          </div>
          <div class="abstract-card"><h4>${UI.esc(l.title)}</h4><p>${UI.esc(l.detail)}</p></div>
        </div>`,
      inspector: UI.inspector('Abstraction', [
        ['Layer', layer, 'Current view'],
        ['Benefit', 'Hide detail', 'Swap implementations'],
        ['API', 'Contract', 'Stable interface'],
      ]),
    });
  };
  window.absSet = (x) => { layer = x. Render(); };
  render();
};
