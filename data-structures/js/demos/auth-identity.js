window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.authIdentity = function (container, initialScenario) {
  const UI = DS.demoUI;
  let scenario = initialScenario || 'session';

  const session = {
    loggedIn: false,
    sessionId: null,
    browserCookie: null,
    expired: false,
    lastAction: 'Start by logging in.',
    flags: { httpOnly: true, secure: true, sameSite: true },
  };

  const permission = {
    role: 'student',
    action: 'view lesson',
    owner: 'own',
  };

  const jwt = {
    tampered: false,
    expired: false,
    oauthStep: 0,
  };

  const password = {
    plain: 'correct horse battery staple',
    saltA: 'salt-r7q',
    saltB: 'salt-k2m',
    resetToken: null,
    resetExpired: false,
    mfaCode: '',
    passkeyRegistered: true,
    lastAction: 'Try changing the password or creating a reset token.',
  };

  const oauthSteps = [
    'App redirects user to provider',
    'User reviews consent screen',
    'Provider redirects back with authorization code',
    'App exchanges code for tokens',
    'App calls API with access token',
  ];

  const esc = (value) => UI.esc(value);
  const boolClass = (value) => value ? 'safe' : 'unsafe';
  const boolText = (value) => value ? 'On' : 'Off';

  const toyHash = (text, salt) => {
    const input = `${salt}:${text}`;
    let hash = 2166136261;
    for (let i = 0; i < input.length; i += 1) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `toy_${(hash >>> 0).toString(16).padStart(8, '0')}`;
  };

  const currentCookieHeader = () => session.browserCookie ? `Cookie: sid=${session.browserCookie}` : 'Cookie: (none)';
  const sessionTrusted = () => Boolean(session.browserCookie && session.sessionId === session.browserCookie && session.loggedIn && !session.expired);

  const renderSessionStage = () => {
    const trusted = sessionTrusted();
    const setCookie = session.sessionId
      ? `Set-Cookie: sid=${session.sessionId}; Path=/;${session.flags.httpOnly ? ' HttpOnly;' : ''}${session.flags.secure ? ' Secure;' : ''}${session.flags.sameSite ? ' SameSite=Lax;' : ''}`
      : 'Set-Cookie: (not issued yet)';

    return `
      <div class="auth-demo">
        <div class="auth-flow-grid">
          ${[
            ['User submits email/password', session.loggedIn || session.sessionId, 'fa-user'],
            ['Server checks password hash', session.loggedIn || session.sessionId, 'fa-fingerprint'],
            ['Server creates session id', Boolean(session.sessionId), 'fa-server'],
            ['Browser stores cookie', Boolean(session.browserCookie), 'fa-cookie-bite'],
            ['Next request sends cookie', Boolean(session.browserCookie), 'fa-paper-plane'],
            ['Server looks up session', trusted, 'fa-database'],
            ['Logout invalidates session', !session.loggedIn && !session.sessionId && !session.browserCookie, 'fa-right-from-bracket'],
          ].map(([label, active, icon], i) => `
            <div class="auth-step ${active ? 'is-active' : ''}">
              <span>${i + 1}</span>
              <i class="fas ${icon}"></i>
              <strong>${esc(label)}</strong>
            </div>
          `).join('')}
        </div>

        <div class="security-panels">
          <div class="security-panel safe is-active">
            <strong><i class="fas fa-server"></i> Server session store</strong>
            <code class="security-code">${session.sessionId ? esc(`${session.sessionId} -> userId=42, expires=${session.expired ? 'expired' : 'valid'}`) : 'No active session record'}</code>
          </div>
          <div class="security-panel ${trusted ? 'safe' : 'unsafe'} is-active">
            <strong><i class="fas fa-cookie-bite"></i> Browser cookie</strong>
            <code class="security-code">${esc(currentCookieHeader())}</code>
          </div>
        </div>

        <div class="auth-cookie-flags">
          ${Object.entries(session.flags).map(([flag, value]) => `
            <button class="auth-flag ${value ? 'on' : 'off'}" onclick="authIdentityToggleFlag('${flag}')">
              <i class="fas ${value ? 'fa-toggle-on' : 'fa-toggle-off'}"></i>
              ${esc(flag === 'httpOnly' ? 'HttpOnly' : flag === 'sameSite' ? 'SameSite' : 'Secure')}
            </button>
          `).join('')}
        </div>

        <pre class="auth-code">${esc(setCookie)}

GET /api/profile
${esc(currentCookieHeader())}

Server trust: ${trusted ? 'valid session found' : 'missing, expired, or revoked session'}</pre>
      </div>`;
  };

  const permissionRules = {
    student: ['view lesson'],
    editor: ['view lesson', 'edit lesson'],
    admin: ['view lesson', 'edit lesson', 'delete user'],
  };

  const permissionDecision = () => {
    const allowedByRole = permissionRules[permission.role].includes(permission.action);
    const ownershipOk = permission.owner === 'own' || permission.role === 'admin';
    const allowed = allowedByRole && ownershipOk;
    let reason = `${permission.role} has ${permission.action} permission.`;
    if (!allowedByRole) reason = `${permission.role} does not have ${permission.action} permission.`;
    if (allowedByRole && !ownershipOk) reason = `${permission.role} can act only on owned resources; this resource belongs to another user.`;
    if (allowed && permission.role === 'admin' && permission.owner === 'other') reason = 'admin has explicit cross-user permission, but this should be audited.';
    return { allowed, reason };
  };

  const renderPermissionStage = () => {
    const decision = permissionDecision();
    return `
      <div class="auth-demo">
        <div class="auth-picker-grid">
          <label class="security-field">
            <span>Current user role</span>
            <select class="demo-input auth-select" onchange="authIdentitySetPermission('role', this.value)">
              ${['student', 'editor', 'admin'].map(role => `<option value="${role}" ${permission.role === role ? 'selected' : ''}>${role}</option>`).join('')}
            </select>
          </label>
          <label class="security-field">
            <span>Selected action</span>
            <select class="demo-input auth-select" onchange="authIdentitySetPermission('action', this.value)">
              ${['view lesson', 'edit lesson', 'delete user'].map(action => `<option value="${action}" ${permission.action === action ? 'selected' : ''}>${action}</option>`).join('')}
            </select>
          </label>
          <label class="security-field">
            <span>Resource owner</span>
            <select class="demo-input auth-select" onchange="authIdentitySetPermission('owner', this.value)">
              <option value="own" ${permission.owner === 'own' ? 'selected' : ''}>current user owns it</option>
              <option value="other" ${permission.owner === 'other' ? 'selected' : ''}>another user owns it</option>
            </select>
          </label>
        </div>

        <div class="security-verdict ${decision.allowed ? 'safe' : 'unsafe'}">
          ${decision.allowed ? 'ALLOW' : 'DENY'} — ${esc(decision.reason)}
        </div>

        <pre class="auth-code">${esc(`user.role = "${permission.role}"
action = "${permission.action}"
resource.owner = "${permission.owner === 'own' ? 'current user' : 'another user'}"

server:
  require login
  check role permissions
  check ownership when needed
  result = ${decision.allowed ? 'allow' : 'deny 403'}`)}</pre>
      </div>`;
  };

  const renderJwtStage = () => {
    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
      sub: 'user_42',
      role: jwt.tampered ? 'admin' : 'student',
      aud: 'learning-api',
      exp: jwt.expired ? 'expired' : '15 min from now',
    };
    const signature = jwt.tampered ? 'invalid-after-payload-edit' : 'valid-signature';
    const tokenStatus = jwt.expired ? 'Expired token rejected' : jwt.tampered ? 'Tampered payload rejected' : 'Signature and expiration valid';

    return `
      <div class="auth-demo">
        <div class="jwt-parts">
          <div class="jwt-part">
            <span>Header</span>
            <code>${esc(JSON.stringify(header, null, 2))}</code>
          </div>
          <div class="jwt-part ${jwt.tampered ? 'is-tampered' : ''}">
            <span>Payload / claims</span>
            <code>${esc(JSON.stringify(payload, null, 2))}</code>
          </div>
          <div class="jwt-part ${jwt.tampered ? 'is-bad' : ''}">
            <span>Signature</span>
            <code>${esc(signature)}</code>
          </div>
        </div>

        <div class="security-verdict ${jwt.tampered || jwt.expired ? 'unsafe' : 'safe'}">${esc(tokenStatus)}</div>

        <div class="oauth-flow">
          ${oauthSteps.map((step, index) => `
            <div class="oauth-step ${index === jwt.oauthStep ? 'is-active' : ''} ${index < jwt.oauthStep ? 'is-done' : ''}">
              <span>${index + 1}</span>
              <strong>${esc(step)}</strong>
            </div>
          `).join('')}
        </div>
      </div>`;
  };

  const renderPasswordStage = () => {
    const hashA = toyHash(password.plain, password.saltA);
    const hashB = toyHash(password.plain, password.saltB);
    const resetStatus = password.resetToken
      ? `${password.resetToken} (${password.resetExpired ? 'expired' : 'single-use, expires soon'})`
      : 'No reset token yet';
    const mfaOk = password.mfaCode === '123456';

    return `
      <div class="auth-demo">
        <label class="security-field">
          <span>Plain password input - toy demo only</span>
          <input class="demo-input auth-password-input" value="${esc(password.plain)}" oninput="authIdentityPassword(this.value)" aria-label="Plain password">
        </label>

        <div class="security-panels">
          <div class="security-panel safe is-active">
            <strong><i class="fas fa-shuffle"></i> Salt A</strong>
            <code class="security-code">${esc(password.saltA)} + password
${esc(hashA)}</code>
          </div>
          <div class="security-panel safe is-active">
            <strong><i class="fas fa-shuffle"></i> Salt B</strong>
            <code class="security-code">${esc(password.saltB)} + same password
${esc(hashB)}</code>
          </div>
        </div>

        <div class="security-panels">
          <div class="security-panel ${password.resetToken && !password.resetExpired ? 'safe' : 'unsafe'} is-active">
            <strong><i class="fas fa-link"></i> Reset token</strong>
            <p>${esc(resetStatus)}</p>
          </div>
          <div class="security-panel ${mfaOk ? 'safe' : 'unsafe'} is-active">
            <strong><i class="fas fa-mobile-screen-button"></i> MFA step</strong>
            <input class="demo-input" value="${esc(password.mfaCode)}" placeholder="123456" oninput="authIdentityMfa(this.value)" aria-label="MFA code">
            <p>${mfaOk ? 'TOTP code accepted in this toy demo.' : 'Enter 123456 to simulate a valid TOTP code.'}</p>
          </div>
          <div class="security-panel safe is-active">
            <strong><i class="fas fa-fingerprint"></i> Passkey concept</strong>
            <code class="security-code">server stores: public key
device keeps: private key
login: device signs challenge</code>
          </div>
        </div>
      </div>`;
  };

  const renderStage = () => {
    if (scenario === 'permissions') return renderPermissionStage();
    if (scenario === 'jwt') return renderJwtStage();
    if (scenario === 'passwords') return renderPasswordStage();
    return renderSessionStage();
  };

  const inspectorRows = () => {
    if (scenario === 'permissions') {
      const decision = permissionDecision();
      return [
        ['Role', permission.role, 'Current user role'],
        ['Action', permission.action, 'Requested action'],
        ['Owner', permission.owner === 'own' ? 'current user' : 'another user', 'Resource ownership'],
        ['Result', decision.allowed ? 'ALLOW' : 'DENY', 'Server-side authorization result'],
      ];
    }
    if (scenario === 'jwt') {
      return [
        ['JWT status', jwt.tampered ? 'tampered' : jwt.expired ? 'expired' : 'valid', 'Signature and expiration state'],
        ['OAuth step', `${jwt.oauthStep + 1}/${oauthSteps.length}`, 'Authorization code flow progress'],
        ['Access token', 'for API calls', 'Used by resource APIs'],
        ['ID token', 'for sign-in info', 'Used by client app'],
      ];
    }
    if (scenario === 'passwords') {
      return [
        ['Plain password', `${password.plain.length} chars`, 'Input before hashing'],
        ['Salt output', toyHash(password.plain, password.saltA) === toyHash(password.plain, password.saltB) ? 'same' : 'different', 'Same password with different salt'],
        ['Reset token', password.resetToken ? (password.resetExpired ? 'expired' : 'active') : 'none', 'Single-use recovery proof'],
        ['MFA', password.mfaCode === '123456' ? 'verified' : 'waiting', 'Toy TOTP code check'],
      ];
    }
    return [
      ['Session id', session.sessionId || 'none', 'Server-side session identifier'],
      ['Browser cookie', session.browserCookie || 'none', 'Cookie stored by browser'],
      ['Server trusts', sessionTrusted() ? 'yes' : 'no', 'Valid unexpired session lookup'],
      ['Flags', Object.entries(session.flags).filter(([, value]) => value).map(([key]) => key).join(', ') || 'none', 'Cookie handling flags'],
    ];
  };

  const stats = () => {
    if (scenario === 'permissions') {
      const decision = permissionDecision();
      return [
        UI.statChip('Scenario', 'Permissions'),
        UI.statChip('Server result', decision.allowed ? 'ALLOW' : 'DENY'),
      ].join('');
    }
    if (scenario === 'jwt') {
      return [
        UI.statChip('Scenario', 'JWT/OAuth'),
        UI.statChip('Signature', jwt.tampered ? 'Invalid' : 'Valid'),
        UI.statChip('Expiration', jwt.expired ? 'Expired' : 'Fresh'),
      ].join('');
    }
    if (scenario === 'passwords') {
      return [
        UI.statChip('Scenario', 'Passwords'),
        UI.statChip('Hash mode', 'Toy only'),
        UI.statChip('MFA', password.mfaCode === '123456' ? 'OK' : 'Pending'),
      ].join('');
    }
    return [
      UI.statChip('Scenario', 'Sessions'),
      UI.statChip('Cookie', session.browserCookie ? 'Stored' : 'Missing'),
      UI.statChip('Trust', sessionTrusted() ? 'Trusted' : 'Denied'),
    ].join('');
  };

  const controls = () => {
    if (scenario === 'permissions') {
      return '<button class="demo-btn" onclick="authIdentityResetPermissions()"><i class="fas fa-rotate"></i> Reset choices</button>';
    }
    if (scenario === 'jwt') {
      return `
        <button class="demo-btn ${jwt.tampered ? 'danger' : ''}" onclick="authIdentityToggleJwt('tampered')"><i class="fas fa-file-pen"></i> Toggle tampered payload</button>
        <button class="demo-btn ${jwt.expired ? 'danger' : ''}" onclick="authIdentityToggleJwt('expired')"><i class="fas fa-clock"></i> Toggle expired</button>
        <button class="demo-btn success" onclick="authIdentityNextOauth()"><i class="fas fa-forward-step"></i> Next OAuth step</button>
        <button class="demo-btn" onclick="authIdentityResetJwt()"><i class="fas fa-rotate"></i> Reset</button>`;
    }
    if (scenario === 'passwords') {
      return `
        <button class="demo-btn success" onclick="authIdentityCreateReset()"><i class="fas fa-link"></i> Create reset token</button>
        <button class="demo-btn danger" onclick="authIdentityExpireReset()"><i class="fas fa-clock"></i> Expire reset token</button>
        <button class="demo-btn" onclick="authIdentityRotateSalt()"><i class="fas fa-shuffle"></i> New salts</button>
        <button class="demo-btn" onclick="authIdentityResetPasswords()"><i class="fas fa-rotate"></i> Reset</button>`;
    }
    return `
      <button class="demo-btn success" onclick="authIdentityLogin()"><i class="fas fa-right-to-bracket"></i> Login</button>
      <button class="demo-btn" onclick="authIdentityProfile()"><i class="fas fa-user"></i> Request profile</button>
      <button class="demo-btn danger" onclick="authIdentityExpireSession()"><i class="fas fa-clock"></i> Expire session</button>
      <button class="demo-btn danger" onclick="authIdentityLogout()"><i class="fas fa-right-from-bracket"></i> Logout</button>`;
  };

  const message = () => {
    if (scenario === 'permissions') return permissionDecision().reason;
    if (scenario === 'jwt') return jwt.expired ? 'Expired access tokens should be rejected.' : jwt.tampered ? 'Changing the payload breaks signature verification.' : 'JWT shape is valid in this toy model. Real apps must verify issuer, audience, signature, and expiration.';
    if (scenario === 'passwords') return `${password.lastAction} Toy hashes are not real security; real apps use bcrypt, scrypt, Argon2, and trusted libraries.`;
    return session.lastAction;
  };

  const render = () => {
    const titles = {
      session: 'Session Login Inspector',
      permissions: 'Permission Check Simulator',
      jwt: 'JWT and OAuth Flow Visualizer',
      passwords: 'Password Safety Demo',
    };
    container.innerHTML = UI.shell({
      title: titles[scenario] || titles.session,
      hint: 'Interactive toy model for learning only. Production auth should use trusted frameworks, providers, and libraries.',
      stage: renderStage(),
      inspector: UI.inspector('Auth state', inspectorRows()),
      stats: stats(),
      controls: controls(),
      msgId: 'authIdentityMsg',
    });
    DS.showMsg('authIdentityMsg', message(), scenario === 'session' && sessionTrusted() ? 'success-msg' : 'info');
  };

  window.authIdentityToggleFlag = (flag) => {
    if (!Object.prototype.hasOwnProperty.call(session.flags, flag)) return;
    session.flags[flag] = !session.flags[flag];
    session.lastAction = `${flag} flag is now ${boolText(session.flags[flag])}.`;
    render();
  };

  window.authIdentityLogin = () => {
    session.sessionId = `s_${Math.random().toString(16).slice(2, 8)}`;
    session.browserCookie = session.sessionId;
    session.loggedIn = true;
    session.expired = false;
    session.lastAction = 'Login accepted: server checked password hash, created a session id, and set a cookie.';
    render();
  };

  window.authIdentityProfile = () => {
    session.lastAction = sessionTrusted()
      ? 'Profile allowed: browser sent cookie and server found a valid session.'
      : 'Profile denied: having a cookie is not enough unless the server trusts the session.';
    render();
  };

  window.authIdentityExpireSession = () => {
    session.expired = true;
    session.loggedIn = false;
    session.lastAction = 'Session expired on the server. The browser may still have a cookie, but the server no longer trusts it.';
    render();
  };

  window.authIdentityLogout = () => {
    session.loggedIn = false;
    session.sessionId = null;
    session.browserCookie = null;
    session.expired = false;
    session.lastAction = 'Logout invalidated server-side state and cleared the browser cookie.';
    render();
  };

  window.authIdentitySetPermission = (key, value) => {
    if (!Object.prototype.hasOwnProperty.call(permission, key)) return;
    permission[key] = value;
    render();
  };

  window.authIdentityResetPermissions = () => {
    permission.role = 'student';
    permission.action = 'view lesson';
    permission.owner = 'own';
    render();
  };

  window.authIdentityToggleJwt = (key) => {
    if (!Object.prototype.hasOwnProperty.call(jwt, key)) return;
    jwt[key] = !jwt[key];
    render();
  };

  window.authIdentityNextOauth = () => {
    jwt.oauthStep = (jwt.oauthStep + 1) % oauthSteps.length;
    render();
  };

  window.authIdentityResetJwt = () => {
    jwt.tampered = false;
    jwt.expired = false;
    jwt.oauthStep = 0;
    render();
  };

  window.authIdentityPassword = (value) => {
    password.plain = value;
    password.lastAction = 'Password input changed. Notice that each salt produces a different toy hash.';
    render();
  };

  window.authIdentityMfa = (value) => {
    password.mfaCode = value;
    password.lastAction = value === '123456' ? 'MFA code accepted in this toy flow.' : 'MFA code waiting. Try 123456.';
    render();
  };

  window.authIdentityCreateReset = () => {
    password.resetToken = `reset_${Math.random().toString(16).slice(2, 8)}`;
    password.resetExpired = false;
    password.lastAction = 'Created a single-use reset token that should expire soon.';
    render();
  };

  window.authIdentityExpireReset = () => {
    password.resetExpired = true;
    password.lastAction = 'Reset token expired. A real server would reject it.';
    render();
  };

  window.authIdentityRotateSalt = () => {
    password.saltA = `salt-${Math.random().toString(36).slice(2, 5)}`;
    password.saltB = `salt-${Math.random().toString(36).slice(2, 5)}`;
    password.lastAction = 'Generated new salts. Same password, different salts, different toy hashes.';
    render();
  };

  window.authIdentityResetPasswords = () => {
    password.plain = 'correct horse battery staple';
    password.saltA = 'salt-r7q';
    password.saltB = 'salt-k2m';
    password.resetToken = null;
    password.resetExpired = false;
    password.mfaCode = '';
    password.lastAction = 'Password demo reset.';
    render();
  };

  render();
};
