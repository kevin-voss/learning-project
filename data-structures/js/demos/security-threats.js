window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.securityThreats = function (container, initialScenario) {
  const UI = DS.demoUI;
  const scenarios = {
    xss: { label: 'XSS', icon: 'fa-code' },
    csrf: { label: 'CSRF', icon: 'fa-cookie-bite' },
    sql: { label: 'SQL Injection', icon: 'fa-database' },
    'command-injection': { label: 'Command Injection', icon: 'fa-terminal' },
    ssrf: { label: 'SSRF', icon: 'fa-server' },
    'path-traversal': { label: 'Path Traversal', icon: 'fa-folder-open' },
    idor: { label: 'IDOR', icon: 'fa-id-card' },
    'session-fixation': { label: 'Session Fixation', icon: 'fa-fingerprint' },
    'open-redirect': { label: 'Open Redirect', icon: 'fa-arrow-right' },
    headers: { label: 'Secure Headers', icon: 'fa-file-shield' },
    'rate-limit': { label: 'Rate Limiting', icon: 'fa-gauge-high' },
    secrets: { label: 'Secrets Leak', icon: 'fa-key' },
  };

  let scenario = initialScenario && scenarios[initialScenario] ? initialScenario : 'xss';
  let mode = 'unsafe';
  let userInput = 'Hello, learner!';
  let requestCount = 0;
  const rateLimit = 5;

  const esc = (value) => UI.esc(value);

  const escHtml = (value) => esc(value)
    .replace(/&lt;script&gt;/gi, '&lt;script&gt;')
    .replace(/&lt;\/script&gt;/gi, '&lt;/script&gt;');

  const xssPayload = '<script>alert("toy")</script>Nice try!';
  const csrfToken = 'csrf-a8f3-k9m2';

  const renderXss = () => {
    const input = userInput || xssPayload;
    const safeHtml = escHtml(input);
    const ranScript = mode === 'unsafe' && /<script/i.test(input);

    return `
      <div class="security-compare">
        <label class="security-field">
          <span>User comment (try plain text or a toy &lt;script&gt. Tag)</span>
          <input class="demo-input wide" value="${esc(input)}" oninput="securityThreatsSetInput(this.value)" aria-label="User comment">
        </label>
        <div class="security-panels">
          <div class="security-panel ${mode === 'unsafe' ? 'is-active unsafe' : ''}">
            <strong><i class="fas fa-triangle-exclamation"></i> Unsafe: innerHTML</strong>
            <p>Treats input as HTML. Scripts can run in a real browser.</p>
            <div class="security-preview unsafe-preview" id="xssPreview"></div>
          </div>
          <div class="security-panel ${mode === 'safe' ? 'is-active safe' : ''}">
            <strong><i class="fas fa-shield"></i> Safe: escaped text</strong>
            <p>Shows characters literally, script tags display as text.</p>
            <div class="security-preview safe-preview">${safeHtml}</div>
          </div>
        </div>
        <p class="security-note">${ranScript && mode === 'unsafe'
          ? '<i class="fas fa-circle-exclamation"></i> Toy demo: if this were innerHTML on a real page, script could run. Here we only display the literal string safely.'
          : 'Compare how the same input renders in each panel.'}</p>
      </div>`;
  };

  const renderCsrf = () => {
    const hasToken = mode === 'safe';
    const outcome = hasToken
      ? 'Blocked: CSRF token missing or invalid on forged request.'
      : 'Accepted: server trusted the session cookie alone.';
    return `
      <div class="security-compare">
        <div class="security-panels">
          <div class="security-panel ${!hasToken ? 'is-active unsafe' : ''}">
            <strong><i class="fas fa-globe"></i> Without CSRF token</strong>
            <p>Evil-site.com submits POST /transfer while you are logged in.</p>
            <code class="security-code">POST /transfer\nCookie: session=abc123\nBody: amount=100</code>
          </div>
          <div class="security-panel ${hasToken ? 'is-active safe' : ''}">
            <strong><i class="fas fa-ticket"></i> With CSRF token</strong>
            <p>Your app requires a secret token only your pages know.</p>
            <code class="security-code">POST /transfer\nCookie: session=abc123\nBody: amount=100&amp;_csrf=${csrfToken}</code>
          </div>
        </div>
        <div class="security-verdict ${hasToken ? 'safe' : 'unsafe'}">${esc(outcome)}</div>
      </div>`;
  };

  const renderSql = () => {
    const email = userInput || "maya@example.com";
    const unsafeQuery = `SELECT * FROM users WHERE email = '${email}'`;
    const safeQuery = 'SELECT * FROM users WHERE email = $1';
    const safeParams = `[ '${email.replace(/'/g, "''")}' ]`;
    const injectionHint = email.includes("'") || email.toLowerCase().includes('or');

    return `
      <div class="security-compare">
        <label class="security-field">
          <span>Login email input</span>
          <input class="demo-input wide" value="${esc(email)}" oninput="securityThreatsSetInput(this.value)" aria-label="Email input">
        </label>
        <div class="security-panels">
          <div class="security-panel ${mode === 'unsafe' ? 'is-active unsafe' : ''}">
            <strong><i class="fas fa-link"></i> Unsafe string query</strong>
            <code class="security-code">${esc(unsafeQuery)}</code>
            ${injectionHint && mode === 'unsafe' ? '<p class="security-warn">Query shape changed: user input became SQL code.</p>' : ''}
          </div>
          <div class="security-panel ${mode === 'safe' ? 'is-active safe' : ''}">
            <strong><i class="fas fa-database"></i> Parameterized query</strong>
            <code class="security-code">${esc(safeQuery)}\n-- params ${esc(safeParams)}</code>
            <p>Database treats input as data, not instructions.</p>
          </div>
        </div>
      </div>`;
  };

  const renderRateLimit = () => {
    const blocked = requestCount > rateLimit;
    const bar = Math.min(requestCount, rateLimit + 3);
    return `
      <div class="security-compare">
        <p class="security-field-desc">Simulate login attempts. Limit: ${rateLimit} per minute (toy demo).</p>
        <div class="security-meter">
          ${Array.from({ length: rateLimit + 3 }, (_, i) => `
            <div class="security-meter-seg ${i < requestCount ? (i < rateLimit ? 'filled' : 'blocked') : ''}"></div>
          `).join('')}
        </div>
        <div class="security-verdict ${blocked ? 'unsafe' : 'safe'}">
          ${blocked
            ? `429 Too Many Requests: blocked after ${rateLimit} attempts.`
            : `Attempt ${requestCount} of ${rateLimit} allowed.`}
        </div>
        <button class="demo-btn" onclick="securityThreatsSendRequest()"><i class="fas fa-paper-plane"></i> Send login attempt</button>
        <button class="demo-btn" onclick="securityThreatsResetRequests()"><i class="fas fa-rotate"></i> Reset counter</button>
      </div>`;
  };

  const renderSecrets = () => {
    const exposed = mode === 'unsafe';
    return `
      <div class="security-compare">
        <div class="security-panels">
          <div class="security-panel ${exposed ? 'is-active unsafe' : ''}">
            <strong><i class="fas fa-file-code"></i> Secret in frontend bundle</strong>
            <code class="security-code">const STRIPE_SECRET = 'sk_live_abc123';\nfetch('/api/charge', { headers: { Authorization: STRIPE_SECRET } });</code>
            <p>Anyone can open DevTools and copy the key.</p>
          </div>
          <div class="security-panel ${!exposed ? 'is-active safe' : ''}">
            <strong><i class="fas fa-server"></i> Secret on server only</strong>
            <code class="security-code">// browser\nfetch('/api/charge', { method: 'POST', body: JSON.stringify({ plan: 'pro' }) });\n\n// server uses process.env.STRIPE_SECRET</code>
            <p>Browser never downloads the private key.</p>
          </div>
        </div>
      </div>`;
  };

  const renderGeneric = (unsafe, safe, unsafeTitle, safeTitle) => `
    <div class="security-compare">
      <div class="security-panels">
        <div class="security-panel ${mode === 'unsafe' ? 'is-active unsafe' : ''}">
          <strong><i class="fas fa-triangle-exclamation"></i> ${esc(unsafeTitle)}</strong>
          <p>${esc(unsafe)}</p>
        </div>
        <div class="security-panel ${mode === 'safe' ? 'is-active safe' : ''}">
          <strong><i class="fas fa-shield"></i> ${esc(safeTitle)}</strong>
          <p>${esc(safe)}</p>
        </div>
      </div>
    </div>`;

  const renderStage = () => {
    switch (scenario) {
      case 'csrf': return renderCsrf();
      case 'sql': return renderSql();
      case 'rate-limit': return renderRateLimit();
      case 'secrets': return renderSecrets();
      case 'command-injection':
        return renderGeneric(
          'exec("convert " + userFilename): attacker adds . Rm -rf /',
          'Use library API with argument array. Never invoke shell with user strings.',
          'Shell with user input',
          'Safe API call'
        );
      case 'ssrf':
        return renderGeneric(
          'Server fetches any URL from user: attacker requests http://169.254.169.254/',
          'Allowlist hosts. Block private IP ranges. No raw user URLs.',
          'Open fetch proxy',
          'Validated outbound requests'
        );
      case 'path-traversal':
        return renderGeneric(
          'open("/uploads/" + userPath) with ../../../etc/passwd',
          'Canonicalize path. Reject ... Jail to upload root.',
          'Relative path concat',
          'Chrooted file access'
        );
      case 'idor':
        return renderGeneric(
          'GET /invoice/99: logged in as user 5, no ownership check',
          'Server verifies invoice.userId === session.userId before respond.',
          'ID only in URL',
          'Authorization check'
        );
      case 'session-fixation':
        return renderGeneric(
          'Attacker sets session=evil before victim logs in. Same ID after login',
          'regenerateSessionId() after successful authentication.',
          'Fixed session ID',
          'Rotate on login'
        );
      case 'open-redirect':
        return renderGeneric(
          '/login?next=https://evil.example/phish: trusted domain forwards user',
          'Allow only relative paths like /dashboard or allowlisted hosts.',
          'Arbitrary next= URL',
          'Relative redirect only'
        );
      case 'headers':
        return renderGeneric(
          'No CSP: one XSS mistake runs any script origin.',
          "Content-Security-Policy: default-src 'self'; frame-ancestors 'none'",
          'Missing headers',
          'Helmet / CSP defaults'
        );
      default: return renderXss();
    }
  };

  const inspectorRows = () => {
    const rows = [
      ['Scenario', scenarios[scenario].label, 'Which threat pattern you are exploring'],
      ['Mode', mode === 'safe' ? 'Safer pattern' : 'Risky pattern', 'Toggle to compare defenses'],
    ];
    if (scenario === 'rate-limit') {
      rows.push(['Attempts', String(requestCount), 'Requests sent in this demo window']);
      rows.push(['Limit', String(rateLimit), 'Max allowed before block']);
    }
    return rows;
  };

  const frameworkWarning = 'Real apps use trusted libraries and framework protections (React escaping, ORM parameters, CSRF middleware, Helmet headers, rate-limit packages). This demo is a visual model only, never test attacks on systems you do not own.';

  const render = () => {
    const showModeToggle = scenario !== 'rate-limit';
    container.innerHTML = UI.shell({
      title: 'Security threats: safe vs risky patterns',
      hint: 'Pick a scenario, toggle unsafe vs safe, and see how defenses change outcomes. Toy examples only.',
      stage: `
        <div class="security-scenario-tabs">
          ${Object.entries(scenarios).map(([key, meta]) => `
            <button type="button" class="demo-btn ${scenario === key ? 'success' : ''}" onclick="securityThreatsScenario('${key}')">
              <i class="fas ${meta.icon}"></i> ${esc(meta.label)}
            </button>
          `).join('')}
        </div>
        ${renderStage()}
        <div class="security-framework-warning">
          <i class="fas fa-circle-info"></i> ${esc(frameworkWarning)}
        </div>`,
      inspector: UI.inspector('Scenario details', inspectorRows()),
      stats: [
        UI.statChip('Scenario', scenarios[scenario].label),
        UI.statChip('View', mode === 'safe' ? 'Safer' : 'Risky'),
      ].join(''),
      controls: showModeToggle ? `
        <button class="demo-btn ${mode === 'unsafe' ? 'danger' : ''}" onclick="securityThreatsMode('unsafe')"><i class="fas fa-triangle-exclamation"></i> Risky pattern</button>
        <button class="demo-btn ${mode === 'safe' ? 'success' : ''}" onclick="securityThreatsMode('safe')"><i class="fas fa-shield"></i> Safer pattern</button>
        <button class="demo-btn" onclick="securityThreatsReset()"><i class="fas fa-rotate"></i> Reset</button>` : '',
      msgId: 'securityThreatsMsg',
    });

    if (scenario === 'xss') {
      const preview = container.querySelector('#xssPreview');
      if (preview) preview.textContent = userInput || xssPayload;
    }

    DS.showMsg('securityThreatsMsg', frameworkWarning, 'info');
  };

  window.securityThreatsScenario = (next) => {
    if (!scenarios[next]) return;
    scenario = next;
    mode = 'unsafe';
    userInput = next === 'sql' ? "maya@example.com" : 'Hello, learner!';
    requestCount = 0;
    render();
  };

  window.securityThreatsMode = (next) => {
    mode = next === 'safe' ? 'safe' : 'unsafe';
    render();
  };

  window.securityThreatsSetInput = (value) => {
    userInput = value;
    render();
  };

  window.securityThreatsSendRequest = () => {
    requestCount += 1;
    render();
  };

  window.securityThreatsResetRequests = () => {
    requestCount = 0;
    render();
  };

  window.securityThreatsReset = () => {
    mode = 'unsafe';
    userInput = scenario === 'sql' ? "maya@example.com" : 'Hello, learner!';
    requestCount = 0;
    render();
  };

  render();
};
