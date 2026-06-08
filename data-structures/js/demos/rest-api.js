window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.restApi = function (container) {
  const UI = DS.demoUI;
  let method = 'GET';
  let path = '/users/1';
  const responses = {
    'GET /users/1': '200 { "id": 1, "name": "Maya" }',
    'POST /users': '201 { "id": 2, "name": "created" }',
    'DELETE /users/1': '204 (no body)',
    'GET /users': '200 [ { "id": 1 }, { "id": 2 } ]',
  };

  const render = () => {
    const key = `${method} ${path}`;
    container.innerHTML = UI.shell({
      title: 'REST request builder',
      hint: 'Pick method and path: see typical status and JSON body.',
      stage: `
        <div class="rest-demo">
          <div class="demo-controls">
            ${['GET', 'POST', 'DELETE'].map(m => `
              <button type="button" class="demo-btn ${method === m ? 'success' : ''}" onclick="restSetMethod('${m}')">${m}</button>
            `).join('')}
          </div>
          <input type="text" class="demo-input" value="${UI.esc(path)}" onchange="restSetPath(this.value)" aria-label="API path">
          <pre class="rest-response">${UI.esc(responses[key] || '404 Not found')}</pre>
        </div>`,
      inspector: UI.inspector('REST', [
        ['Method', method, 'HTTP verb'],
        ['Path', path, 'Resource locator'],
        ['Idempotent', method === 'GET' ? 'yes' : method === 'DELETE' ? 'yes' : 'no', 'Safe to repeat?'],
      ]),
    });
  };
  window.restSetMethod = (m) => { method = m. If (m === 'POST') path = '/users'; render(); };
  window.restSetPath = (p) => { path = p. Render(); };
  render();
};
