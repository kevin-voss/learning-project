window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.http = function (container) {
  const UI = DS.demoUI;
  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
  const paths = {
    GET: '/api/profile',
    POST: '/api/tasks',
    PUT: '/api/profile/42',
    PATCH: '/api/profile',
    DELETE: '/api/tasks/42',
  };
  const bodies = {
    POST: '{\n  "title": "Read HTTP lesson"\n}',
    PUT: '{\n  "name": "Maya",\n  "theme": "dark"\n}',
    PATCH: '{\n  "name": "Maya"\n}',
  };

  let method = 'GET';
  let includeHeaders = true;
  let includeBody = false;
  let includeCookie = false;
  let responseKind = 'success';

  const bodyMethods = new Set(['POST', 'PUT', 'PATCH']);

  const buildRequest = () => {
    const lines = [`${method} ${paths[method]} HTTP/1.1`];
    if (includeHeaders) {
      lines.push('Host: api.example.com');
      lines.push('Accept: application/json');
      if (includeCookie) lines.push('Cookie: session=abc123');
      if (includeBody && bodyMethods.has(method)) {
        lines.push('Content-Type: application/json');
      }
    }
    if (includeBody && bodyMethods.has(method)) {
      lines.push('');
      lines.push(bodies[method] || bodies.PATCH);
    }
    return lines.join('\n');
  };

  const buildResponse = () => {
    const responses = {
      success: {
        GET: { status: '200 OK', headers: ['Content-Type: application/json'], body: '{\n  "id": 42,\n  "name": "Maya"\n}' },
        POST: { status: '201 Created', headers: ['Content-Type: application/json', 'Location: /api/tasks/99'], body: '{\n  "id": 99,\n  "title": "Read HTTP lesson"\n}' },
        PUT: { status: '200 OK', headers: ['Content-Type: application/json'], body: '{\n  "id": 42,\n  "name": "Maya",\n  "theme": "dark"\n}' },
        PATCH: { status: '200 OK', headers: ['Content-Type: application/json'], body: '{\n  "id": 42,\n  "name": "Maya"\n}' },
        DELETE: { status: '204 No Content', headers: [], body: '' },
      },
      redirect: {
        status: '302 Found',
        headers: ['Location: https://api.example.com/dashboard', 'Content-Length: 0'],
        body: '',
      },
      client: {
        status: '404 Not Found',
        headers: ['Content-Type: application/json'],
        body: '{\n  "error": "Resource not found"\n}',
      },
      server: {
        status: '500 Internal Server Error',
        headers: ['Content-Type: application/json'],
        body: '{\n  "error": "Something went wrong on the server"\n}',
      },
    };

    if (responseKind === 'success') {
      const picked = responses.success[method];
      const headerLines = [...picked.headers];
      if (includeCookie && method === 'POST') {
        headerLines.unshift('Set-Cookie: session=abc123; HttpOnly; Path=/');
      }
      const parts = [`HTTP/1.1 ${picked.status}`, ...headerLines];
      if (picked.body) {
        parts.push('');
        parts.push(picked.body);
      }
      return { text: parts.join('\n'), status: picked.status };
    }

    const picked = responses[responseKind];
    const parts = [`HTTP/1.1 ${picked.status}`, ...picked.headers];
    if (picked.body) {
      parts.push('');
      parts.push(picked.body);
    }
    return { text: parts.join('\n'), status: picked.status };
  };

  const inspectorNote = () => {
    const notes = [];
    notes.push(`${method} selects the request line and typical path.`);
    if (includeHeaders) notes.push('Headers add Host, Accept, and optional Cookie or Content-Type.');
    else notes.push('Without headers, the raw request shows only the request line.');
    if (includeBody && bodyMethods.has(method)) notes.push('Body JSON is included after the blank line.');
    else if (bodyMethods.has(method)) notes.push('Toggle body to send JSON with POST, PUT, or PATCH.');
    if (includeCookie) notes.push('Cookie header sends session=abc123; POST success may Set-Cookie.');
    const kindLabels = {
      success: '2xx success family',
      redirect: '3xx redirect with Location header',
      client: '4xx client error',
      server: '5xx server error',
    };
    notes.push(`Response mode: ${kindLabels[responseKind]}.`);
    return notes.join(' ');
  };

  const renderStage = () => {
    const request = buildRequest();
    const response = buildResponse();

    return `
      <div class="http-demo">
        <div class="http-message-grid">
          <div class="http-message request">
            <strong><i class="fas fa-paper-plane"></i> Request</strong>
            <pre>${UI.esc(request)}</pre>
          </div>
          <div class="http-message response ${responseKind}">
            <strong><i class="fas fa-reply"></i> Response · ${UI.esc(response.status)}</strong>
            <pre>${UI.esc(response.text)}</pre>
          </div>
        </div>
        <div class="http-toggles">
          <label class="http-toggle">
            <input type="checkbox" ${includeHeaders ? 'checked' : ''} onchange="httpToggleHeaders(this.checked)">
            <span>Headers</span>
          </label>
          <label class="http-toggle">
            <input type="checkbox" ${includeBody ? 'checked' : ''} onchange="httpToggleBody(this.checked)">
            <span>Body</span>
          </label>
          <label class="http-toggle">
            <input type="checkbox" ${includeCookie ? 'checked' : ''} onchange="httpToggleCookie(this.checked)">
            <span>Cookie</span>
          </label>
        </div>
      </div>`;
  };

  const inspectorRows = () => {
    const response = buildResponse();
    return [
      ['Method', method, 'HTTP verb on the request line'],
      ['Path', paths[method], 'Resource the client is calling'],
      ['Headers', includeHeaders ? 'On' : 'Off', 'Metadata such as Host, Accept, Cookie, Content-Type'],
      ['Body', includeBody && bodyMethods.has(method) ? 'On' : 'Off', 'Payload for POST, PUT, and PATCH'],
      ['Cookie', includeCookie ? 'On' : 'Off', 'Session cookie on request; Set-Cookie on some responses'],
      ['Response', response.status, 'Example status for the selected outcome'],
      ['Inspector', inspectorNote(), 'What changed in this configuration'],
    ];
  };

  const render = () => {
    UI.mount(container, {
      title: 'HTTP request inspector',
      hint: 'Choose a method and response type, toggle headers, body, and cookies, then read the raw request and example response.',
      stage: renderStage(),
      inspector: UI.inspector('HTTP details', inspectorRows()),
      stats: [
        UI.statChip('Method', method),
        UI.statChip('Response', responseKind),
        UI.statChip('Status', buildResponse().status.split(' ')[0]),
      ].join(''),
      controls: `
        ${methods.map(m => `
          <button class="demo-btn ${method === m ? 'success' : ''}" onclick="httpSetMethod('${m}')">${m}</button>
        `).join('')}
        <button class="demo-btn ${responseKind === 'success' ? 'success' : ''}" onclick="httpSetResponse('success')"><i class="fas fa-circle-check"></i> Success</button>
        <button class="demo-btn ${responseKind === 'redirect' ? 'success' : ''}" onclick="httpSetResponse('redirect')"><i class="fas fa-share"></i> Redirect</button>
        <button class="demo-btn ${responseKind === 'client' ? 'success' : ''}" onclick="httpSetResponse('client')"><i class="fas fa-user-xmark"></i> Client error</button>
        <button class="demo-btn ${responseKind === 'server' ? 'success' : ''}" onclick="httpSetResponse('server')"><i class="fas fa-server"></i> Server error</button>
        <button class="demo-btn danger" onclick="httpReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'httpMsg',
    });

    DS.showMsg('httpMsg', inspectorNote(), 'info');
  };

  window.httpSetMethod = (nextMethod) => {
    method = nextMethod;
    if (!bodyMethods.has(method)) includeBody = false;
    render();
  };

  window.httpSetResponse = (kind) => {
    responseKind = kind;
    render();
  };

  window.httpToggleHeaders = (value) => {
    includeHeaders = value;
    render();
  };

  window.httpToggleBody = (value) => {
    includeBody = value;
    render();
  };

  window.httpToggleCookie = (value) => {
    includeCookie = value;
    render();
  };

  window.httpReset = () => {
    method = 'GET';
    includeHeaders = true;
    includeBody = false;
    includeCookie = false;
    responseKind = 'success';
    render();
  };

  render();
};
