window.DS = window.DS || {};

// Stage pictures for the auth demo (sessions, permissions, tokens, passwords).
// Called once per demo with the shared state from auth-identity/demo.js.
DS.authIdentityStages = function ({ UI, session, permission, jwt, password, oauthSteps, esc, boolClass, boolText, toyHash, currentCookieHeader, sessionTrusted }) {
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
    if (allowedByRole && !ownershipOk) reason = `${permission.role} can act only on owned resources. This resource belongs to another user.`;
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
          ${decision.allowed ? 'ALLOW' : 'DENY'}: ${esc(decision.reason)}
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

  return { renderSessionStage, renderPermissionStage, renderJwtStage, renderPasswordStage, permissionDecision };
};
