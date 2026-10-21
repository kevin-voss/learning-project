window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.authIdentityPage = ({
  id,
  label,
  title,
  subtitle,
  analogy,
  exampleTitle,
  exampleDesc,
  whatIsIt,
  sections,
  code,
  checklist,
  demoScenario,
}) => ({
  id,
  label,
  title,
  subtitle,
  analogy,
  realWorldExample: { title: exampleTitle, desc: exampleDesc },
  whatIsIt,
  conceptSections: sections,
  codeTitle: 'Beginner Safe Shape',
  codeLanguage: 'Pseudocode',
  codeText: code,
  demoType: 'auth-identity',
  demoScenario,
  checklist,
});

DS.authSafeWarning = 'For production, use trusted auth libraries, framework middleware, and providers. Do not write custom password hashing, invent token formats, or store secrets in frontend code.';

DS.curriculum.push(
  {
    id: 'authentication-sessions',
    category: 'More: Security',
    title: 'Authentication and Sessions',
    icon: 'fa-user-check',
    subtitle: 'Learn how login proves who a user is, how the server remembers that login, and why cookies are only one part of trust.',
    analogy: 'Authentication is showing ID at a front desk. A session is the desk writing your visit into its own notebook. A cookie is the claim ticket you carry back on later visits.',
    realWorldExample: {
      title: 'Opening your profile page',
      desc: 'You log in once. The server creates a session ID and sends it in a session cookie. Later, your browser sends the cookie, and the server looks up the session before returning private profile data.',
    },
    whatIsIt: `Authentication means proving who you are. A session is server-side login memory, usually stored in a database, cache, or signed server store. A cookie is browser storage that is sent with matching requests. A browser having a cookie is not the same as the server trusting the session: the server must find a valid, unexpired session ID and should delete or invalidate it on logout. ${DS.authSafeWarning}`,
    whyUse: 'Sessions let web apps keep users logged in across many HTTP requests without sending the password again. Cookie flags such as HttpOnly, Secure, and SameSite reduce common browser-side risks.',
    conceptSections: [
      { icon: 'fa-id-card', title: 'Authenticate once', desc: 'The user proves identity with a password, passkey, or trusted provider.', example: 'POST /login sends credentials over HTTPS.' },
      { icon: 'fa-server', title: 'Remember on the server', desc: 'The app creates server-side state keyed by a random session id.', example: 'sessions[sid] = { userId: 42, expiresAt }.' },
      { icon: 'fa-cookie-bite', title: 'Carry the session id', desc: 'The browser stores a session cookie and sends it on matching requests.', example: 'Cookie: sid=s_8f3a...' },
      { icon: 'fa-right-from-bracket', title: 'Logout invalidates trust', desc: 'Logout must remove server-side session state, not just hide UI.', example: 'Delete sessions[sid] and clear the cookie.' },
    ],
    conceptFlow: ['Submit login', 'Check password hash', 'Create session id', 'Set session cookie', 'Send cookie on next request', 'Look up server session', 'Allow profile', 'Logout invalidates session'],
    mermaidDiagram: `sequenceDiagram
  participant Browser
  participant Server
  participant Store as Session Store
  Browser->>Server: POST /login email + password
  Server->>Server: Verify password hash
  Server->>Store: Create session id
  Server-->>Browser: Set-Cookie sid=...; HttpOnly; Secure; SameSite=Lax
  Browser->>Server: GET /profile with Cookie
  Server->>Store: Look up sid
  Store-->>Server: Valid user session
  Server-->>Browser: Profile data
  Browser->>Server: POST /logout
  Server->>Store: Delete session`,
    whenToUse: [
      { icon: 'fa-user-lock', title: 'Private accounts', desc: 'Use sessions when users need private pages and server-rendered or browser API access.' },
      { icon: 'fa-cookie', title: 'Browser apps', desc: 'Use secure cookie settings so browsers handle session IDs more safely.' },
      { icon: 'fa-clock', title: 'Time-limited login', desc: 'Expire inactive or old sessions and require re-login for sensitive actions.' },
      { icon: 'fa-shield', title: 'Trusted tooling', desc: 'Use framework session middleware rather than hand-rolled production auth.' },
    ],
    demoType: 'auth-identity',
    demoScenario: 'session',
    demoTitle: 'Session Login Inspector',
    demoHint: 'Click through login, profile requests, session expiration, logout, and cookie flag changes.',
    subPages: [
      DS.authIdentityPage({
        id: 'what-authentication-means',
        label: 'What Authentication Means',
        title: 'What Authentication Means',
        subtitle: 'Authentication answers: who are you?',
        analogy: 'It is like showing a passport before entering a secure area.',
        exampleTitle: 'Email and password login',
        exampleDesc: 'The user sends an email and password. The server finds the account and verifies the password against a stored password hash.',
        whatIsIt: 'Authentication is the step where a system checks proof of identity. It does not decide everything the user may do. It only establishes who the request belongs to.',
        sections: [
          { icon: 'fa-user', title: 'Identity', desc: 'The account the user claims to be.', example: 'maya@example.com.' },
          { icon: 'fa-key', title: 'Proof', desc: 'Something that supports the claim.', example: 'Password, passkey, or OAuth provider result.' },
          { icon: 'fa-check', title: 'Result', desc: 'The server decides whether the proof matches the account.', example: 'Authenticated user id 42.' },
        ],
        code: `user = findUserByEmail(email)
if user and verifyPasswordHash(password, user.passwordHash):
  return authenticated(user.id)
return reject("Invalid login")`,
        checklist: ['Define authentication as proving who you are.', 'Explain why authentication is separate from permission checks.', 'Name one trusted way users can prove identity.'],
        demoScenario: 'session',
      }),
      DS.authIdentityPage({
        id: 'login-request-flow',
        label: 'Login Request Flow',
        title: 'Login Request Flow',
        subtitle: 'A login request is a normal HTTP request with very sensitive data.',
        analogy: 'It is like handing credentials to a clerk through a sealed window.',
        exampleTitle: 'POST /login',
        exampleDesc: 'A browser sends email and password over HTTPS. The server validates input, checks the hash, and creates login state only after success.',
        whatIsIt: 'A login flow should use HTTPS, server-side validation, rate limiting, and safe password verification. The password should not be logged or stored in plain text.',
        sections: [
          { icon: 'fa-lock', title: 'HTTPS', desc: 'Protect credentials in transit.', example: 'Never send passwords over plain HTTP.' },
          { icon: 'fa-fingerprint', title: 'Hash check', desc: 'Compare the attempt with a stored password hash.', example: 'verify(password, hash).' },
          { icon: 'fa-ban', title: 'Generic failure', desc: 'Avoid revealing which part failed.', example: 'Use Invalid email or password.' },
        ],
        code: `POST /login
server:
  validate email and password shape
  user = find user
  if password hash matches:
    create session
  else:
    return 401`,
        checklist: ['Describe what happens after POST /login.', 'Explain why the server checks a password hash.', 'Avoid advising plain password storage.'],
        demoScenario: 'session',
      }),
      DS.authIdentityPage({
        id: 'sessions',
        label: 'Sessions',
        title: 'Sessions',
        subtitle: 'A session is server-side login memory.',
        analogy: 'The server keeps the guest list. The browser carries only a ticket number.',
        exampleTitle: 'Profile request after login',
        exampleDesc: 'The browser sends a session ID. The server looks it up in the session store and finds user id, role, and expiration time.',
        whatIsIt: 'A session stores login state on the server. The browser usually receives only a random session id. If the session is missing, expired, or revoked, the request should be treated as logged out even if a cookie exists.',
        sections: [
          { icon: 'fa-dice', title: 'Random id', desc: 'Session ids must be hard to guess.', example: 'Use cryptographic randomness.' },
          { icon: 'fa-database', title: 'Server store', desc: 'The session data lives in server-managed storage.', example: 'Redis, database, or framework session store.' },
          { icon: 'fa-user-clock', title: 'Lifecycle', desc: 'Sessions are created, refreshed, expired, and deleted.', example: 'Expire after inactivity.' },
        ],
        code: `sid = randomSecureId()
sessionStore.set(sid, {
  userId: user.id,
  expiresAt: now + 30 minutes
})`,
        checklist: ['Define session as server-side login memory.', 'Explain why a random session id matters.', 'Tell the difference between cookie present and session trusted.'],
        demoScenario: 'session',
      }),
      DS.authIdentityPage({
        id: 'session-cookies',
        label: 'Session Cookies',
        title: 'Session Cookies',
        subtitle: 'A session cookie carries the session id back to the server.',
        analogy: 'It is a coat-check ticket: useful only because the counter has a matching record.',
        exampleTitle: 'Cookie header',
        exampleDesc: 'The server sends Set-Cookie. Later, the browser automatically includes Cookie on requests that match the domain, path, and policy.',
        whatIsIt: 'A cookie is browser storage that can be sent automatically with matching HTTP requests. A session cookie often contains a session id, not the full user profile.',
        sections: [
          { icon: 'fa-download', title: 'Set-Cookie', desc: 'The server tells the browser what to store.', example: 'Set-Cookie: sid=s_123; Path=/.' },
          { icon: 'fa-upload', title: 'Cookie header', desc: 'The browser sends it back automatically.', example: 'Cookie: sid=s_123.' },
          { icon: 'fa-server', title: 'Server decides', desc: 'The server still validates the session id.', example: 'No matching session means logged out.' },
        ],
        code: `response header:
Set-Cookie: sid=s_abc; Path=/; HttpOnly; Secure; SameSite=Lax

next request:
Cookie: sid=s_abc`,
        checklist: ['Define cookie as browser storage sent with matching requests.', 'Explain why a cookie can carry only an id.', 'Describe what the server checks on the next request.'],
        demoScenario: 'session',
      }),
      DS.authIdentityPage({
        id: 'cookie-flags',
        label: 'Cookie Flags',
        title: 'Cookie Flags: HttpOnly, Secure, SameSite',
        subtitle: 'Cookie flags tell browsers to handle session cookies more carefully.',
        analogy: 'Flags are handling instructions on a valuable package.',
        exampleTitle: 'Safer session cookie',
        exampleDesc: 'A production session cookie usually includes HttpOnly, Secure, and a SameSite policy chosen for the app.',
        whatIsIt: 'HttpOnly keeps JavaScript from reading the cookie, which helps if an XSS bug appears. Secure means browsers send the cookie only over HTTPS. SameSite limits when cookies are sent on cross-site requests, reducing CSRF risk.',
        sections: [
          { icon: 'fa-code', title: 'HttpOnly', desc: 'JavaScript cannot read the cookie value.', example: 'document.cookie will not reveal sid.' },
          { icon: 'fa-lock', title: 'Secure', desc: 'Cookie travels only over HTTPS.', example: 'Prevents sending sid over plain HTTP.' },
          { icon: 'fa-globe', title: 'SameSite', desc: 'Controls cross-site cookie sending.', example: 'Lax is a common default for many apps.' },
        ],
        code: `Set-Cookie: sid=s_abc;
  Path=/;
  HttpOnly;
  Secure;
  SameSite=Lax`,
        checklist: ['Explain why HttpOnly matters.', 'Explain why Secure matters.', 'Explain why SameSite matters.'],
        demoScenario: 'session',
      }),
      DS.authIdentityPage({
        id: 'logout',
        label: 'Logout',
        title: 'Logout',
        subtitle: 'Logout must invalidate server-side state.',
        analogy: 'Throwing away your ticket is not enough if the front desk still accepts its number.',
        exampleTitle: 'POST /logout',
        exampleDesc: 'The server deletes the session record and sends a cookie-clearing response. Future requests with the old id fail.',
        whatIsIt: 'Logout should remove or revoke the session on the server. Clearing the browser cookie improves UX, but the important security action is making the session id unusable server-side.',
        sections: [
          { icon: 'fa-trash', title: 'Delete session', desc: 'Remove the session id from server storage.', example: 'sessionStore.delete(sid).' },
          { icon: 'fa-cookie-bite', title: 'Clear cookie', desc: 'Tell the browser to forget the cookie.', example: 'Set cookie with Max-Age=0.' },
          { icon: 'fa-ban', title: 'Reject old id', desc: 'The old id should no longer map to a user.', example: 'GET /profile returns 401.' },
        ],
        code: `sid = readCookie("sid")
sessionStore.delete(sid)
setCookie("sid", "", { maxAge: 0 })
return 204`,
        checklist: ['Explain why logout must invalidate server-side state.', 'Describe why clearing only the browser is incomplete.', 'Predict what happens to an old cookie after logout.'],
        demoScenario: 'session',
      }),
      DS.authIdentityPage({
        id: 'session-expiration',
        label: 'Session Expiration',
        title: 'Session Expiration',
        subtitle: 'Sessions should not last forever.',
        analogy: 'A day pass stops working when the day ends.',
        exampleTitle: 'Inactive account tab',
        exampleDesc: 'A user leaves a shared computer. After expiration, the old cookie no longer unlocks the profile page.',
        whatIsIt: 'Expiration limits the time a stolen or forgotten session can be used. Apps may use idle timeout, absolute timeout, or both. Sensitive changes can require fresh authentication.',
        sections: [
          { icon: 'fa-hourglass-half', title: 'Idle timeout', desc: 'Expire after no activity.', example: '30 minutes since last request.' },
          { icon: 'fa-calendar-xmark', title: 'Absolute timeout', desc: 'Expire after a fixed lifetime.', example: 'Re-login after 7 days.' },
          { icon: 'fa-user-shield', title: 'Fresh check', desc: 'Ask again before high-risk actions.', example: 'Confirm password before changing email.' },
        ],
        code: `session = sessionStore.get(sid)
if not session or session.expiresAt < now:
  return 401
extendIdleTimeout(session)`,
        checklist: ['Explain why sessions expire.', 'Compare idle and absolute timeout.', 'Describe how expiration changes server trust.'],
        demoScenario: 'session',
      }),
      DS.authIdentityPage({
        id: 'remember-me',
        label: 'Remember Me',
        title: 'Remember Me',
        subtitle: 'Remember Me extends login carefully, not permanently.',
        analogy: 'It is like a longer hotel key card, not a master key with no end date.',
        exampleTitle: 'Trusted personal laptop',
        exampleDesc: 'The user opts in on a private device. The app stores a longer-lived, revocable credential and can still require fresh login for sensitive actions.',
        whatIsIt: 'Remember Me usually means a longer-lived session or refresh-style credential. It should be opt-in, revocable, protected by secure cookies, and designed for stolen-device risk.',
        sections: [
          { icon: 'fa-toggle-on', title: 'Opt-in', desc: 'Users choose it, especially on shared devices.', example: 'Do not remember by default in risky contexts.' },
          { icon: 'fa-rotate', title: 'Rotate', desc: 'Longer-lived credentials should rotate or be revocable.', example: 'Replace token after use.' },
          { icon: 'fa-lock', title: 'Step-up', desc: 'Ask again for sensitive changes.', example: 'Password reset or billing change.' },
        ],
        code: `if rememberMe:
  create longLivedSession(deviceId)
else:
  create shortSession()

requireFreshLoginFor("change password")`,
        checklist: ['Explain Remember Me without calling it permanent login.', 'Name one risk of shared computers.', 'Describe why sensitive actions may need fresh auth.'],
        demoScenario: 'session',
      }),
      DS.authIdentityPage({
        id: 'session-common-mistakes',
        label: 'Common Mistakes',
        title: 'Common Mistakes',
        subtitle: 'Small auth mistakes can become account takeover bugs.',
        analogy: 'A strong door still fails if the spare key is taped outside.',
        exampleTitle: 'Buggy logout',
        exampleDesc: 'A site removes the cookie in the UI, but the old session id still works when replayed. The server never revoked it.',
        whatIsIt: 'Common mistakes include storing passwords in plain text, putting secrets in frontend code, trusting the cookie without server lookup, missing cookie flags, weak session ids, no expiration, and logout that only changes the screen.',
        sections: [
          { icon: 'fa-eye', title: 'Frontend trust', desc: 'The browser can be inspected and modified.', example: 'Hidden buttons are not security.' },
          { icon: 'fa-cookie', title: 'Weak cookies', desc: 'Missing flags increases risk.', example: 'No HttpOnly makes cookie theft easier after XSS.' },
          { icon: 'fa-user-clock', title: 'No lifecycle', desc: 'Sessions need expiration and revocation.', example: 'Forgotten sessions should not last forever.' },
        ],
        code: `// Risky
if browserHasCookie:
  return profile

// Safer
session = lookupValidSession(cookie.sid)
if session:
  return profile`,
        checklist: ['Avoid treating browser state as trusted.', 'Name the three important cookie flags.', 'Repeat the warning to use trusted auth libraries.'],
        demoScenario: 'session',
      }),
    ],
    codeTitle: 'Session Login Shape',
    codeLanguage: 'Pseudocode',
    codeText: `login(email, password):
  user = find user by email
  verify password with trusted password hashing library
  sid = create random session id
  store sid on server with user id and expiration
  set cookie sid with HttpOnly, Secure, SameSite

profile(request):
  sid = request.cookie.sid
  session = find valid unexpired session
  return profile only if session is trusted`,
    checklist: ['Define authentication, session, cookie, and session id.', 'Explain cookie flags in plain language.', 'Explain why logout must invalidate the server session.'],
  },
);
