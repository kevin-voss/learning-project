window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

// Uses DS.authIdentityPage and DS.authSafeWarning from auth-sessions.js.
DS.curriculum.push(
  {
    id: 'authorization-roles',
    category: 'More: Security',
    title: 'Authorization and Roles',
    icon: 'fa-user-shield',
    subtitle: 'Learn how apps decide what an authenticated user is allowed to do.',
    analogy: 'Authentication gets you into the building. Authorization decides which rooms you can enter and which tools you can use.',
    realWorldExample: {
      title: 'Student, editor, and admin in a learning app',
      desc: 'A student can view lessons. An editor can update lesson text. An admin can manage users. Everyone may be logged in, but they do not have the same permissions.',
    },
    whatIsIt: `Authorization means checking what you can do. Logged in does not mean allowed. Frontend hiding a button is helpful UX, not security. The server must check roles, permissions, and resource ownership before changing or revealing protected data. ${DS.authSafeWarning}`,
    whyUse: 'Authorization prevents users from reading, editing, or deleting resources they should not control. It is where role-based access control, permission-based access control, ownership checks, and least privilege meet.',
    conceptSections: [
      { icon: 'fa-users-gear', title: 'Roles', desc: 'Roles bundle permissions by job or responsibility.', example: 'student, editor, admin.' },
      { icon: 'fa-list-check', title: 'Permissions', desc: 'Permissions describe specific actions.', example: 'lesson:view, lesson:edit, user:delete.' },
      { icon: 'fa-id-badge', title: 'Ownership', desc: 'Some actions depend on who owns the resource.', example: 'Edit your profile, not another user’s.' },
      { icon: 'fa-server', title: 'Server checks', desc: 'Backend checks enforce security.', example: 'API returns 403 Forbidden when denied.' },
    ],
    conceptFlow: ['Authenticate user', 'Read role', 'Read permissions', 'Check resource owner', 'Apply least privilege', 'Allow or deny on server'],
    mermaidDiagram: `flowchart TD
  A[Incoming request] --> B{Authenticated?}
  B -- No --> C[401 Unauthorized]
  B -- Yes --> D[Load user role and permissions]
  D --> E{Action permission?}
  E -- No --> F[403 Forbidden]
  E -- Yes --> G{Ownership required?}
  G -- No --> H[Allow]
  G -- Yes --> I{Owns resource?}
  I -- Yes --> H
  I -- No --> F`,
    whenToUse: [
      { icon: 'fa-user-lock', title: 'Private features', desc: 'Use authorization whenever different users can do different things.' },
      { icon: 'fa-pen-to-square', title: 'Mutations', desc: 'Check permission before creating, editing, or deleting data.' },
      { icon: 'fa-database', title: 'Resource access', desc: 'Check ownership before returning private records.' },
      { icon: 'fa-scale-balanced', title: 'Least privilege', desc: 'Grant the smallest permission set that solves the task.' },
    ],
    demoType: 'auth-identity',
    demoScenario: 'permissions',
    demoTitle: 'Permission Check Simulator',
    demoHint: 'Choose a role, action, and resource owner to see the server-side allow or deny decision.',
    subPages: [
      DS.authIdentityPage({ id: 'what-authorization-means', label: 'What Authorization Means', title: 'What Authorization Means', subtitle: 'Authorization answers: what can you do?', analogy: 'A concert ticket gets you inside. A backstage pass grants extra access.', exampleTitle: 'Editing a lesson', exampleDesc: 'A logged-in student can view a lesson, but the server denies lesson edits unless the user has editor permission.', whatIsIt: 'Authorization is the server-side decision that allows or denies an action for the current user, action, and resource.', sections: [{ icon: 'fa-user-check', title: 'Current user', desc: 'Who is making the request?', example: 'userId 42.' }, { icon: 'fa-bolt', title: 'Action', desc: 'What are they trying to do?', example: 'delete user.' }, { icon: 'fa-box', title: 'Resource', desc: 'Which object is affected?', example: 'lesson 8 or profile 42.' }], code: `if can(user, "lesson:edit", lesson): allow()
else: deny(403)`, checklist: ['Define authorization as what you can do.', 'Name user, action, and resource in a request.', 'Explain why authorization runs after authentication.'], demoScenario: 'permissions' }),
      DS.authIdentityPage({ id: 'authn-vs-authz', label: 'Authn vs Authz', title: 'Authentication vs Authorization', subtitle: 'Who you are is not the same as what you may do.', analogy: 'Passport first, boarding pass second.', exampleTitle: 'Logged-in student', exampleDesc: 'A student is authenticated, but cannot delete another user. The server should return 403, not success.', whatIsIt: 'Authentication proves identity. Authorization checks allowed actions. Confusing them leads to bugs like letting every logged-in user call admin APIs.', sections: [{ icon: 'fa-id-card', title: 'Authentication', desc: 'Who are you?', example: 'Maya is user 42.' }, { icon: 'fa-shield-halved', title: 'Authorization', desc: 'What can you do?', example: 'Maya can view lessons.' }, { icon: 'fa-triangle-exclamation', title: 'Bug pattern', desc: 'Only checking logged-in status is not enough.', example: 'if user then deleteUser() is unsafe.' }], code: `user = requireLogin(request)
requirePermission(user, "user:delete")`, checklist: ['Explain logged in does not mean allowed.', 'Describe a 401 vs 403 difference.', 'Spot an authn/authz mix-up.'], demoScenario: 'permissions' }),
      DS.authIdentityPage({ id: 'roles', label: 'Roles', title: 'Roles', subtitle: 'Roles group permissions by responsibility.', analogy: 'A job title comes with a bundle of keys.', exampleTitle: 'Editor role', exampleDesc: 'Editors can create and edit lessons, but cannot delete users unless that permission is added.', whatIsIt: 'Role-Based Access Control (RBAC) assigns users to roles such as student, editor, or admin. Each role maps to a set of allowed actions.', sections: [{ icon: 'fa-users', title: 'Role name', desc: 'A readable label for a group.', example: 'admin.' }, { icon: 'fa-key', title: 'Role permissions', desc: 'Actions attached to that role.', example: 'lesson:edit.' }, { icon: 'fa-user-plus', title: 'Assignment', desc: 'Users receive one or more roles.', example: 'Maya has editor.' }], code: `roles.editor = ["lesson:view", "lesson:edit"]
if user.role == "editor":
  permissions = roles.editor`, checklist: ['Define RBAC.', 'Map a role to permissions.', 'Avoid making every user admin.'], demoScenario: 'permissions' }),
      DS.authIdentityPage({ id: 'permissions', label: 'Permissions', title: 'Permissions', subtitle: 'Permissions are exact allowed actions.', analogy: 'A key opens one lock, not every door in the building.', exampleTitle: 'lesson:edit', exampleDesc: 'An API can check lesson:edit directly instead of relying only on broad role names.', whatIsIt: 'Permission-based access control checks specific capabilities. It is useful when roles become too broad or users need custom combinations of abilities.', sections: [{ icon: 'fa-list', title: 'Action names', desc: 'Use clear permission names.', example: 'user:delete.' }, { icon: 'fa-puzzle-piece', title: 'Compose roles', desc: 'Roles can be bundles of permissions.', example: 'admin includes user:delete.' }, { icon: 'fa-magnifying-glass', title: 'Audit', desc: 'Specific permissions are easier to review.', example: 'Who can export data?' }], code: `requirePermission(user, "lesson:edit")
updateLesson(lessonId, changes)`, checklist: ['Define permission.', 'Give one permission naming example.', 'Explain why permissions can be more precise than roles.'], demoScenario: 'permissions' }),
      DS.authIdentityPage({ id: 'resource-ownership', label: 'Resource Ownership', title: 'Resource Ownership', subtitle: 'Some permissions depend on who owns the data.', analogy: 'You can open your locker, not every locker.', exampleTitle: 'Editing your profile', exampleDesc: 'A user can edit their own profile. Editing another user’s profile requires a stronger permission.', whatIsIt: 'An ownership check compares the current user with the resource owner. It prevents horizontal access bugs where one user changes another user’s data by guessing an id.', sections: [{ icon: 'fa-fingerprint', title: 'Owner id', desc: 'Resources often store an owner field.', example: 'profile.userId.' }, { icon: 'fa-equals', title: 'Compare', desc: 'Match resource owner to current user.', example: 'profile.userId === user.id.' }, { icon: 'fa-user-shield', title: 'Override', desc: 'Admins may have explicit override permission.', example: 'profile:edit:any.' }], code: `if profile.userId == user.id:
  allow("edit own profile")
else:
  requirePermission(user, "profile:edit:any")`, checklist: ['Define ownership check.', 'Explain own profile vs another user’s profile.', 'Name the bug this prevents.'], demoScenario: 'permissions' }),
      DS.authIdentityPage({ id: 'admin-vs-user', label: 'Admin vs User', title: 'Admin vs User', subtitle: 'Admin power should be rare and intentional.', analogy: 'Most staff need room keys. Few need the building master key.', exampleTitle: 'Deleting users', exampleDesc: 'A regular user can delete their own draft. Only an admin can delete another account, and even that should be logged.', whatIsIt: 'Admin roles often bypass normal limits, so they need careful assignment, auditing, MFA, and least privilege. Do not use admin as a shortcut for every feature.',
        sections: [{ icon: 'fa-user', title: 'User', desc: 'Normal account permissions.', example: 'View lessons.' }, { icon: 'fa-user-tie', title: 'Admin', desc: 'High-risk management permissions.', example: 'Delete users.' }, { icon: 'fa-clipboard-list', title: 'Audit', desc: 'Record sensitive admin actions.', example: 'adminId, action, targetId, time.' }], code: `requirePermission(admin, "user:delete")
audit("user deleted", { adminId, targetUserId })`, checklist: ['Explain why admin access is sensitive.', 'Give one regular user action and one admin action.', 'Describe why admin actions should be logged.'], demoScenario: 'permissions' }),
      DS.authIdentityPage({ id: 'server-side-checks', label: 'Server-Side Checks', title: 'Server-Side Checks', subtitle: 'Frontend hiding a button is not security.', analogy: 'Removing a door sign does not lock the door.', exampleTitle: 'Hidden Delete button', exampleDesc: 'A student cannot see Delete User in the UI, but they can still craft an HTTP request. The server must deny it.', whatIsIt: 'Client-side checks improve user experience. Server-side checks enforce security. Every protected API endpoint should verify authentication and authorization.',
        sections: [{ icon: 'fa-eye-slash', title: 'Hide UI', desc: 'Good for clarity, not enforcement.', example: 'Do not show admin buttons to students.' }, { icon: 'fa-terminal', title: 'Craft request', desc: 'Attackers can call endpoints directly.', example: 'curl DELETE /api/users/7.' }, { icon: 'fa-server', title: 'Backend guard', desc: 'The server is the authority.', example: 'Return 403.' }], code: `// UI may hide button, but API still checks
DELETE /api/users/7
requirePermission(currentUser, "user:delete")`, checklist: ['Say why frontend hiding a button is not security.', 'Explain where the real check belongs.', 'Name the expected denial status.'], demoScenario: 'permissions' }),
      DS.authIdentityPage({ id: 'least-privilege-authz', label: 'Least Privilege', title: 'Least Privilege', subtitle: 'Give only the access needed for the job.', analogy: 'A hotel guest gets one room key, not the staff key ring.', exampleTitle: 'Editor without user deletion', exampleDesc: 'An editor needs lesson editing permissions, not billing exports or account deletion.', whatIsIt: 'Least privilege reduces damage from mistakes or compromised accounts. Users, services, and tokens should have the minimum permissions needed, reviewed over time.', sections: [{ icon: 'fa-scissors', title: 'Minimize', desc: 'Start with fewer powers.', example: 'viewer before editor.' }, { icon: 'fa-clock', title: 'Review', desc: 'Remove stale access.', example: 'Disable contractor admin after project.' }, { icon: 'fa-bomb', title: 'Limit blast radius', desc: 'Compromise hurts less.', example: 'Read-only token cannot delete data.' }], code: `grant(user, ["lesson:view"])
// Add lesson:edit only when the user needs editing work.`, checklist: ['Define least privilege.', 'Explain how it limits damage.', 'Give one over-permissioned example.'], demoScenario: 'permissions' }),
      DS.authIdentityPage({ id: 'authz-common-mistakes', label: 'Common Mistakes', title: 'Common Mistakes', subtitle: 'Authorization bugs often look like missing checks.',
        analogy: 'The side door was unlocked because everyone focused on the front gate.', exampleTitle: 'ID guessing', exampleDesc: 'A user changes /profiles/42 to /profiles/43 and sees someone else’s data because the server checked login but not ownership.', whatIsIt: 'Common mistakes include checking only login, trusting role data from the browser, missing ownership checks, using one admin role for everything, and forgetting authorization on new endpoints.',
        sections: [{ icon: 'fa-cookie', title: 'Trusting client claims', desc: 'Roles from browser input can be changed.', example: 'Never trust role=admin from a request body.' }, { icon: 'fa-link', title: 'IDOR', desc: 'Insecure direct object references expose other users’ resources.', example: 'Guessing /invoice/123.' }, { icon: 'fa-plus', title: 'New endpoint gap', desc: 'New APIs need the same checks.', example: 'Bulk export route forgot permission.' }], code: `// Risky
if loggedIn: return invoiceById(id)

// Safer
invoice = findInvoice(id)
requireOwnerOrPermission(user, invoice.ownerId, "invoice:view:any")`, checklist: ['Spot login-only checks.', 'Explain why role data from the browser is untrusted.', 'Remember ownership checks for private resources.'], demoScenario: 'permissions' }),
    ],
    codeTitle: 'Authorization Guard Shape',
    codeLanguage: 'Pseudocode',
    codeText: `user = requireLogin(request)
resource = loadResource(request.params.id)

if hasPermission(user, "lesson:edit") and ownsOrCanManage(user, resource):
  allow()
else:
  deny(403)`,
    checklist: ['Explain authorization in plain language.', 'Describe RBAC, permissions, and ownership checks.', 'Explain why the server must enforce authorization.'],
  },
  {
    id: 'tokens-jwts-oauth',
    category: 'More: Security',
    title: 'Tokens, JWTs, and OAuth',
    icon: 'fa-ticket',
    subtitle: 'Understand proof strings, signed JWTs, token expiration, refresh tokens, and the big picture of delegated OAuth access.',
    analogy: 'A bearer token is like a concert wristband: whoever holds it can use it. OAuth is like giving a valet limited permission to park your car without handing over every key you own.',
    realWorldExample: {
      title: 'Connecting a calendar app',
      desc: 'A user lets a scheduling app read calendar availability. The app receives an access token for that limited purpose instead of the user’s calendar password.',
    },
    whatIsIt: `A token is a proof string. A bearer token means whoever holds it can use it, so storage and transport matter. A JWT has header.payload.signature. Claims are statements like userId, role, issuer, and expiration. JWTs are signed, not automatically encrypted. OAuth is delegated access, not just login. Use trusted OAuth libraries and providers. ${DS.authSafeWarning}`,
    whyUse: 'Tokens let APIs accept proof without a server session lookup on every request, and OAuth lets users grant limited access between services.',
    conceptSections: [
      { icon: 'fa-ticket', title: 'Token', desc: 'A string that proves something to a server.', example: 'Authorization: Bearer abc...' },
      { icon: 'fa-file-signature', title: 'JWT', desc: 'A signed token with header, payload, and signature.', example: 'header.payload.signature.' },
      { icon: 'fa-clock', title: 'Expiration', desc: 'Tokens should stop working after a set time.', example: 'exp claim.' },
      { icon: 'fa-share-nodes', title: 'OAuth', desc: 'A protocol for delegated access.', example: 'App can read calendar availability.' },
    ],
    conceptFlow: ['Create token', 'Send as Bearer token', 'Verify signature', 'Read claims', 'Check expiration', 'Use refresh token carefully', 'Delegate access with OAuth code flow'],
    mermaidDiagram: `sequenceDiagram
  participant User
  participant App
  participant Provider
  participant API
  User->>App: Click Connect Provider
  App->>Provider: Redirect for authorization
  Provider->>User: Consent screen
  Provider-->>App: Authorization code
  App->>Provider: Exchange code for tokens
  Provider-->>App: Access token and ID token
  App->>API: Bearer access token`,
    whenToUse: [
      { icon: 'fa-plug', title: 'API calls', desc: 'Use access tokens when calling APIs that expect bearer authorization.' },
      { icon: 'fa-clock', title: 'Short-lived proof', desc: 'Use expiration so stolen tokens have limited lifetime.' },
      { icon: 'fa-rotate', title: 'Renewal', desc: 'Use refresh tokens only with careful storage, rotation, and provider guidance.' },
      { icon: 'fa-handshake', title: 'Delegated access', desc: 'Use OAuth when one app needs limited access to another service.' },
    ],
    demoType: 'auth-identity',
    demoScenario: 'jwt',
    demoTitle: 'JWT and OAuth Flow Visualizer',
    demoHint: 'Split a JWT, toggle tampering and expiration, then step through the OAuth authorization code flow.',
    subPages: [
      DS.authIdentityPage({ id: 'tokens', label: 'Tokens', title: 'Tokens', subtitle: 'A token is a proof string.', analogy: 'A claim ticket proves you can pick up an item.', exampleTitle: 'API token', exampleDesc: 'The client sends a token with a request. The API validates it before returning data.', whatIsIt: 'A token is a string that a server can validate. It might represent an API key, access grant, session-like proof, or signed claims.', sections: [{ icon: 'fa-font', title: 'String', desc: 'A token is usually text.', example: 'abc123 or a JWT.' }, { icon: 'fa-shield', title: 'Proof', desc: 'The server decides what it proves.', example: 'Access to /profile.' }, { icon: 'fa-lock', title: 'Sensitive', desc: 'Tokens should be protected like credentials.', example: 'Do not paste in logs.' }], code: `request.headers.Authorization = "Bearer " + accessToken
api.verify(accessToken)`, checklist: ['Define token as a proof string.', 'Explain why tokens are sensitive.', 'Describe one API token use.'], demoScenario: 'jwt' }),
      DS.authIdentityPage({ id: 'bearer-tokens', label: 'Bearer Tokens', title: 'Bearer Tokens', subtitle: 'Whoever bears the token can use it.', analogy: 'A movie ticket works for whoever holds it at the door.', exampleTitle: 'Authorization header', exampleDesc: 'A frontend or backend client sends Authorization: Bearer <token> to an API.', whatIsIt: 'A bearer token does not prove possession of a private key by itself. The API usually trusts whoever presents a valid token, so transport over HTTPS and safe storage are critical.', sections: [{ icon: 'fa-paper-plane', title: 'Header', desc: 'Bearer tokens commonly ride in Authorization.', example: 'Authorization: Bearer eyJ...' }, { icon: 'fa-user-secret', title: 'Holder risk', desc: 'The holder can use it.', example: 'A stolen token may call APIs.' }, { icon: 'fa-clock', title: 'Short life', desc: 'Short expiration reduces damage.', example: '15 minutes for access token.' }], code: `GET /api/profile
Authorization: Bearer access_token_here`, checklist: ['Define bearer token.', 'Explain why HTTPS matters.', 'Avoid storing bearer tokens in unsafe frontend locations.'], demoScenario: 'jwt' }),
      DS.authIdentityPage({ id: 'jwt-structure', label: 'JWT Structure', title: 'JWT Structure', subtitle: 'A JWT is header.payload.signature.', analogy: 'It is a signed envelope with a label, message, and tamper seal.', exampleTitle: 'Decoded JWT', exampleDesc: 'Developers can base64url-decode the header and payload to inspect claims. The signature must still be verified by the server.', whatIsIt: 'A JSON Web Token has three dot-separated parts: header, payload, and signature. The payload is readable when decoded. Signed does not mean encrypted.', sections: [{ icon: 'fa-heading', title: 'Header', desc: 'Algorithm and token type.', example: '{"alg":"RS256","typ":"JWT"}.' }, { icon: 'fa-box-open', title: 'Payload', desc: 'Claims live here.', example: '{"sub":"42","exp":...}.' }, { icon: 'fa-signature', title: 'Signature', desc: 'Detects tampering when verified.', example: 'Signed with issuer key.' }], code: `jwt = base64url(header) + "." +
      base64url(payload) + "." +
      signature`, checklist: ['Name the three JWT parts.', 'Explain readable payload vs verified signature.', 'State that JWTs are not automatically encrypted.'], demoScenario: 'jwt' }),
      DS.authIdentityPage({ id: 'claims', label: 'Claims', title: 'Claims', subtitle: 'Claims are statements inside the token.', analogy: 'A badge lists name, department, and expiry date.', exampleTitle: 'User id and role claim', exampleDesc: 'A payload might say sub=42 and role=editor. The API should trust claims only after verifying the issuer and signature.', whatIsIt: 'JWT claims are statements such as subject, issuer, audience, role, scope, and expiration. Claims are not magic. They are trusted only if the token is valid for your API.', sections: [{ icon: 'fa-user', title: 'sub', desc: 'Subject: who the token is about.', example: 'sub: user_42.' }, { icon: 'fa-users-gear', title: 'role or scope', desc: 'Authorization-related statements.', example: 'scope: lesson:read.' }, { icon: 'fa-clock', title: 'exp', desc: 'Expiration time.', example: 'exp: Unix timestamp.' }], code: `claims = verifyJwt(token)
if claims.aud != "learning-api":
  reject()
userId = claims.sub`, checklist: ['Define jwt claim.', 'Name userId, role, and exp examples.', 'Explain why claims require verification.'], demoScenario: 'jwt' }),
      DS.authIdentityPage({ id: 'token-expiration', label: 'Expiration', title: 'Expiration', subtitle: 'Tokens need time limits.', analogy: 'A temporary pass stops working after the event.', exampleTitle: 'Expired API call', exampleDesc: 'The API checks exp and returns 401 when the access token is too old.', whatIsIt: 'Expiration limits how long a token can be used. Access tokens should usually be short-lived. Clients must handle expiry by asking the auth system for a new token through a safe flow.', sections: [{ icon: 'fa-hourglass-end', title: 'exp claim', desc: 'The token carries an expiry time.', example: 'exp < now means expired.' }, { icon: 'fa-ban', title: 'Reject old tokens', desc: 'APIs should deny expired tokens.', example: '401 Unauthorized.' }, { icon: 'fa-rotate', title: 'Renew carefully', desc: 'Use provider-approved refresh flows.', example: 'Refresh token rotation.' }], code: `claims = verifyJwt(token)
if claims.exp < now:
  return 401`, checklist: ['Explain token expiration.', 'Describe what an API does with expired tokens.', 'Connect short-lived tokens to damage reduction.'], demoScenario: 'jwt' }),
      DS.authIdentityPage({ id: 'refresh-tokens', label: 'Refresh Tokens', title: 'Refresh Tokens', subtitle: 'Refresh tokens request new access tokens.', analogy: 'A renewal card lets you get a new short pass at the desk.', exampleTitle: 'Mobile app token renewal', exampleDesc: 'The app uses a carefully stored refresh token to obtain a new short-lived access token without asking the user to log in every few minutes.', whatIsIt: 'A refresh token is longer-lived and higher risk than an access token. Store it carefully, rotate it when used, revoke it on logout, and follow your auth provider’s guidance.', sections: [{ icon: 'fa-clock', title: 'Longer lived', desc: 'Refresh tokens often last longer than access tokens.', example: 'Days or weeks.' }, { icon: 'fa-rotate', title: 'Rotation', desc: 'Replace refresh tokens after use when supported.', example: 'Old token becomes invalid.' }, { icon: 'fa-trash', title: 'Revocation', desc: 'Logout should revoke refresh tokens.', example: 'Provider revocation endpoint.' }], code: `if accessTokenExpired:
  newTokens = authProvider.refresh(refreshToken)
  storeRotatedRefreshToken(newTokens.refreshToken)`, checklist: ['Distinguish access token vs refresh token.', 'Explain why refresh tokens are sensitive.', 'Name rotation and revocation.'], demoScenario: 'jwt' }),
      DS.authIdentityPage({ id: 'oauth-big-picture', label: 'OAuth Big Picture', title: 'OAuth Big Picture', subtitle: 'OAuth is delegated access, not just login.', analogy: 'You grant a delivery app permission to drop off one package, not move into your house.', exampleTitle: 'Read calendar availability', exampleDesc: 'The scheduling app receives permission to read availability from a calendar provider without seeing the user’s password.', whatIsIt: 'OAuth lets a user authorize one app to access another service with limited scopes. Login often uses OpenID Connect on top of OAuth, but OAuth itself is about delegated access.', sections: [{ icon: 'fa-user', title: 'Resource owner', desc: 'The user who grants access.', example: 'Calendar owner.' }, { icon: 'fa-mobile-screen', title: 'Client app', desc: 'The app requesting access.', example: 'Scheduling app.' }, { icon: 'fa-cloud', title: 'Provider', desc: 'The service issuing tokens.', example: 'Calendar provider.' }], code: `app asks provider for scope "calendar.read"
user consents
provider issues access token for that scope`, checklist: ['Explain OAuth as delegated access.', 'Avoid saying OAuth is just login.', 'Name user, app, provider, and scope.'], demoScenario: 'jwt' }),
      DS.authIdentityPage({ id: 'authorization-code-flow', label: 'Authorization Code Flow', title: 'Authorization Code Flow', subtitle: 'The app receives a code, then exchanges it for tokens.', analogy: 'A claim code is safer to carry through the browser than the final valuables.', exampleTitle: 'Web app sign-in with provider', exampleDesc: 'The browser redirects to the provider. After consent, the provider redirects back with a code. The app backend exchanges the code for tokens.', whatIsIt: 'Authorization Code Flow keeps token exchange between the app and provider. Modern apps should use PKCE where appropriate and rely on trusted OAuth libraries.', sections: [{ icon: 'fa-arrow-up-right-from-square', title: 'Redirect', desc: 'App sends user to provider.', example: 'GET /authorize.' }, { icon: 'fa-check-double', title: 'Consent', desc: 'User approves requested scopes.', example: 'Read profile.' }, { icon: 'fa-repeat', title: 'Code exchange', desc: 'App trades code for tokens.', example: 'POST /token.' }], code: `redirect user to provider
provider returns ?code=abc
server exchanges code with provider
server receives tokens`, checklist: ['Describe redirect, consent, code, exchange.', 'Mention trusted OAuth libraries.', 'Explain why the code is not the access token.'], demoScenario: 'jwt' }),
      DS.authIdentityPage({ id: 'access-token-vs-id-token', label: 'Access vs ID Token', title: 'Access Token vs ID Token', subtitle: 'Access tokens are for APIs. ID tokens describe login.', analogy: 'One badge opens doors. Another badge says who you are.', exampleTitle: 'OpenID Connect login', exampleDesc: 'The app receives an ID token to learn the user signed in, and an access token to call a protected API if needed.', whatIsIt: 'An access token is meant for an API. An ID token is meant for the client app and says authentication happened. Do not send ID tokens to APIs as a substitute for access tokens unless your provider explicitly designs that flow.', sections: [{ icon: 'fa-plug', title: 'Access token', desc: 'Used to authorize API calls.', example: 'Bearer token to resource server.' }, { icon: 'fa-id-card', title: 'ID token', desc: 'Used by the client to understand sign-in.', example: 'Contains issuer and subject.' }, { icon: 'fa-triangle-exclamation', title: 'Do not mix', desc: 'Audience and purpose matter.', example: 'API checks aud.' }], code: `api expects access_token with aud = "learning-api"
client reads id_token to know signed-in user`, checklist: ['Define access token.', 'Define ID token.', 'Explain why audience and purpose matter.'], demoScenario: 'jwt' }),
      DS.authIdentityPage({ id: 'token-common-mistakes', label: 'Common Mistakes', title: 'Common Mistakes', subtitle: 'Token bugs often come from trusting strings too casually.', analogy: 'A copied wristband should not get unlimited access forever.', exampleTitle: 'Tampered role claim', exampleDesc: 'A learner edits the JWT payload from role=student to role=admin. The API must verify the signature and reject tampering.', whatIsIt: 'Common mistakes include inventing token formats, accepting unsigned JWTs, ignoring expiration, storing long-lived tokens in unsafe places, putting secrets in frontend code, and treating OAuth as a simple login button without understanding scopes and audience.', sections: [{ icon: 'fa-file-pen', title: 'Tampering', desc: 'Readable payloads can be changed by attackers.', example: 'Signature verification catches changes.' }, { icon: 'fa-clock', title: 'No expiry', desc: 'Long-lived bearer tokens increase risk.', example: 'A leaked token works too long.' }, { icon: 'fa-key', title: 'Secret leak', desc: 'Signing secrets belong on the server.', example: 'Never in browser bundles.' }], code: `// Required checks
verify signature
verify issuer and audience
verify expiration
check permissions on server`, checklist: ['State JWT is signed, not automatically encrypted.', 'Say not to invent token formats.', 'Repeat that secrets do not belong in frontend code.'], demoScenario: 'jwt' }),
    ],
    codeTitle: 'JWT Verification Shape',
    codeLanguage: 'Pseudocode',
    codeText: `claims = trustedJwtLibrary.verify(token, issuerPublicKey)
require claims.issuer == expectedIssuer
require claims.audience == "learning-api"
require claims.exp > now
requirePermission(claims.sub, "lesson:view")`,
    checklist: ['Explain token, bearer token, JWT parts, claims, and expiration.', 'Distinguish access tokens, refresh tokens, and ID tokens.', 'Explain OAuth as delegated access.'],
  },
  {
    id: 'passwords-mfa-passkeys',
    category: 'More: Security',
    title: 'Passwords, Reset Links, MFA, and Passkeys',
    icon: 'fa-fingerprint',
    subtitle: 'Learn safe password storage ideas, reset link rules, second factors, and why passkeys use public/private key thinking.',
    analogy: 'Passwords are secret phrases, reset links are temporary replacement keys, MFA adds a second lock, and passkeys use a matching key pair where the private key stays on the device.',
    realWorldExample: {
      title: 'Recovering an account safely',
      desc: 'A user forgets a password. The app sends a single-use reset link that expires soon, then asks for MFA or a passkey during future sign-ins.',
    },
    whatIsIt: `Never store plain passwords. Hashing is one-way, and a salt prevents reused passwords from producing identical hashes. Slow password hashing algorithms such as bcrypt, scrypt, and Argon2 make guessing more expensive. Reset links and magic links must be single-use and expire. MFA adds another factor. Passkeys use public/private key ideas: the server stores a public key and the device keeps the private key. Account recovery is security-sensitive. ${DS.authSafeWarning}`,
    whyUse: 'Account systems are frequent attack targets. Safe password storage, reset flows, MFA, and passkeys reduce the chance that one leaked secret becomes a full account takeover.',
    conceptSections: [
      { icon: 'fa-fingerprint', title: 'Password hashing', desc: 'Store a one-way hash, not the password.', example: 'bcrypt(password, salt).' },
      { icon: 'fa-shuffle', title: 'Salt', desc: 'Random salt makes identical passwords hash differently.', example: 'same password + different salt = different hash.' },
      { icon: 'fa-link', title: 'Reset links', desc: 'Single-use and expiring links limit recovery risk.', example: 'Reset token expires in 15 minutes.' },
      { icon: 'fa-mobile-screen-button', title: 'MFA and passkeys', desc: 'Add another factor or use public-key login.', example: 'TOTP code or WebAuthn passkey.' },
    ],
    conceptFlow: ['User creates password', 'Generate salt', 'Use bcrypt/scrypt/Argon2', 'Store hash only', 'Reset token is single-use and expiring', 'MFA verifies second factor', 'Passkey signs challenge with device private key'],
    mermaidDiagram: `flowchart LR
  A[Password] --> B[Random salt]
  B --> C[Slow hash library]
  C --> D[Store hash and salt]
  E[Forgot password] --> F[Single-use reset token]
  F --> G[Expires soon]
  H[Passkey login] --> I[Device private key signs challenge]
  I --> J[Server verifies with public key]`,
    whenToUse: [
      { icon: 'fa-user-lock', title: 'Account signup', desc: 'Use trusted password hashing when users create passwords.' },
      { icon: 'fa-unlock-keyhole', title: 'Recovery', desc: 'Use expiring single-use reset flows and log sensitive recovery events.' },
      { icon: 'fa-shield-halved', title: 'Higher assurance', desc: 'Add MFA for sensitive accounts and actions.' },
      { icon: 'fa-key', title: 'Passwordless', desc: 'Use passkeys/WebAuthn through trusted platform libraries.' },
    ],
    demoType: 'auth-identity',
    demoScenario: 'passwords',
    demoTitle: 'Password Safety Demo',
    demoHint: 'Try a password, change salts, create reset tokens, verify MFA, and see the passkey public/private key idea.',
    subPages: [
      DS.authIdentityPage({ id: 'password-hashing', label: 'Password Hashing', title: 'Password Hashing', subtitle: 'Never store plain passwords.', analogy: 'Store a fingerprint, not the whole secret.', exampleTitle: 'Database breach defense', exampleDesc: 'If a user table leaks, attackers should see slow password hashes, not readable passwords.', whatIsIt: 'Password hashing is a one-way transformation used to verify a password later. Real apps use trusted password hashing libraries, never homemade hash code.', sections: [{ icon: 'fa-arrow-right', title: 'One-way', desc: 'You verify by hashing an attempt and comparing safely.', example: 'You do not decrypt a password hash.' }, { icon: 'fa-database', title: 'Store hash', desc: 'Save hash metadata, not plain text.', example: 'algorithm, salt, hash.' }, { icon: 'fa-shield', title: 'Trusted library', desc: 'Use framework or vetted library helpers.', example: 'bcrypt, scrypt, Argon2.' }], code: `hash = passwordHasher.hash(password)
store(hash)

passwordHasher.verify(attempt, storedHash)`, checklist: ['Say never store plain passwords.', 'Explain hashing is one-way.', 'Say not to write custom password hashing.'], demoScenario: 'passwords' }),
      DS.authIdentityPage({ id: 'salt', label: 'Salt', title: 'Salt', subtitle: 'Salt makes identical passwords look different after hashing.', analogy: 'The same recipe tastes different with a unique secret spice per account.', exampleTitle: 'Two users choose the same password', exampleDesc: 'Different salts mean their stored hashes do not match, making reused passwords less obvious.', whatIsIt: 'A salt is random data added to the password before hashing. It is not a secret like a password. It is stored with the hash so verification can repeat the same process.', sections: [{ icon: 'fa-dice', title: 'Random per password', desc: 'Each password gets its own salt.', example: 'saltA and saltB.' }, { icon: 'fa-not-equal', title: 'Different output', desc: 'Same password hashes differently.', example: 'password + saltA != password + saltB.' }, { icon: 'fa-box-archive', title: 'Stored with hash', desc: 'The verifier needs the salt later.', example: 'Modern hash formats include it.' }], code: `hash1 = hash(password + saltA)
hash2 = hash(password + saltB)
// hash1 and hash2 differ`, checklist: ['Define salt.', 'Explain same password with different salt gives different output.', 'Know salt is stored with hash.'], demoScenario: 'passwords' }),
      DS.authIdentityPage({ id: 'slow-hashing', label: 'Slow Hashing', title: 'Slow Hashing: bcrypt/scrypt/Argon2', subtitle: 'Password hashing should be intentionally expensive.', analogy: 'A lock should be quick for the owner but slow for someone trying millions of keys.', exampleTitle: 'Brute-force resistance', exampleDesc: 'If hashes leak, slow hashing makes large guessing attacks more costly.', whatIsIt: 'bcrypt, scrypt, and Argon2 are password hashing algorithms designed to be slow and configurable. General fast hashes are not enough for passwords.', sections: [{ icon: 'fa-gauge-low', title: 'Slowness', desc: 'Makes each guess cost time.', example: 'Tuned work factor.' }, { icon: 'fa-memory', title: 'Memory hardness', desc: 'scrypt and Argon2 can require memory too.', example: 'Harder for attackers to parallelize.' }, { icon: 'fa-wrench', title: 'Tuning', desc: 'Settings should be updated as hardware improves.', example: 'Follow library guidance.' }], code: `passwordHasher = Argon2id(recommendedSettings)
stored = passwordHasher.hash(password)`, checklist: ['Name bcrypt, scrypt, and Argon2.', 'Explain why slow hashing matters.', 'Avoid fast general hashes for passwords.'], demoScenario: 'passwords' }),
      DS.authIdentityPage({ id: 'password-reset-links', label: 'Password Reset Links', title: 'Password Reset Links', subtitle: 'Reset links are powerful temporary secrets.', analogy: 'A reset link is a temporary replacement key mailed to the owner.', exampleTitle: 'Forgot password email', exampleDesc: 'The user receives a link with a random token. The server accepts it once before expiration, then invalidates it.', whatIsIt: 'A password reset token should be random, single-use, tied to an account, and expire quickly. Store only a hash of the reset token if possible, and do not reveal whether an email exists.', sections: [{ icon: 'fa-dice', title: 'Random token', desc: 'Hard to guess.', example: 'Generated by secure randomness.' }, { icon: 'fa-clock', title: 'Expires', desc: 'Short lifetime.', example: '15 to 60 minutes.' }, { icon: 'fa-trash', title: 'Single-use', desc: 'Invalidate after success.', example: 'Delete token record.' }], code: `token = randomSecret()
store(hash(token), userId, expiresAt)
sendResetLink(token)

onUse: verify hash, check expiry, delete token`, checklist: ['Define password reset token.', 'Explain single-use and expiration.', 'Avoid leaking whether an email exists.'], demoScenario: 'passwords' }),
      DS.authIdentityPage({ id: 'magic-links', label: 'Magic Links', title: 'Magic Links', subtitle: 'Magic links log users in through a short-lived link.', analogy: 'A temporary door code sent to your inbox.', exampleTitle: 'Email-only sign-in', exampleDesc: 'The user clicks a link from email. The server validates the token and creates a session without a password.', whatIsIt: 'A magic link is similar to a reset link but creates login state. It must expire, be single-use, and be protected against email account compromise and link leakage.', sections: [{ icon: 'fa-envelope', title: 'Email delivery', desc: 'The inbox becomes part of login security.', example: 'Protect email account with MFA.' }, { icon: 'fa-link', title: 'One click', desc: 'Good UX, still a bearer secret.', example: 'Anyone with link can use it before expiry.' }, { icon: 'fa-right-to-bracket', title: 'Create session', desc: 'Successful token validation signs the user in.', example: 'Set session cookie.' }], code: `if magicLinkToken is valid and unused:
  mark token used
  create session for user`, checklist: ['Define magic link.', 'Explain why it must expire.', 'Connect magic links to session creation.'], demoScenario: 'passwords' }),
      DS.authIdentityPage({ id: 'mfa', label: 'MFA', title: 'MFA', subtitle: 'MFA adds another factor besides a password.', analogy: 'A door needs both a key and a keypad code.', exampleTitle: 'Admin login', exampleDesc: 'After password verification, an admin must provide a second factor before accessing admin tools.', whatIsIt: 'Multi-factor authentication uses more than one kind of proof: something you know, have, or are. MFA reduces damage from stolen passwords but must be implemented with safe recovery paths.', sections: [{ icon: 'fa-brain', title: 'Know', desc: 'Something memorized.', example: 'Password.' }, { icon: 'fa-mobile-screen', title: 'Have', desc: 'Something in your possession.', example: 'Authenticator app or security key.' }, { icon: 'fa-fingerprint', title: 'Are', desc: 'Biometric unlocks a local credential.', example: 'Device fingerprint unlock for passkey.' }], code: `verify password
if account.requiresMfa:
  verify second factor
create session`, checklist: ['Define MFA.', 'Name two factor types.', 'Explain how MFA helps after password theft.'], demoScenario: 'passwords' }),
      DS.authIdentityPage({ id: 'totp-codes', label: 'TOTP Codes', title: 'TOTP Codes', subtitle: 'TOTP is a time-based one-time password code.', analogy: 'Both sides have synchronized clocks and a shared secret recipe.', exampleTitle: 'Authenticator app', exampleDesc: 'The app shows a six-digit code that changes every 30 seconds. The server checks the same calculation with a small clock tolerance.', whatIsIt: 'TOTP codes come from a shared secret and the current time. They are common for MFA, but phishing-resistant options like passkeys or security keys are stronger when available.', sections: [{ icon: 'fa-key', title: 'Shared secret', desc: 'Set up during enrollment.', example: 'QR code contains secret.' }, { icon: 'fa-clock', title: 'Time window', desc: 'Code changes regularly.', example: '30 seconds.' }, { icon: 'fa-shield', title: 'Verification', desc: 'Server compares expected code.', example: 'Allow small clock drift.' }], code: `expected = totp(sharedSecret, currentTimeWindow)
if safeCompare(userCode, expected):
  passMfa()`, checklist: ['Define TOTP.', 'Explain why the code changes.', 'Know TOTP is an MFA method.'], demoScenario: 'passwords' }),
      DS.authIdentityPage({ id: 'passkeys-webauthn', label: 'Passkeys / WebAuthn', title: 'Passkeys / WebAuthn', subtitle: 'Passkeys use public/private key login.', analogy: 'The lock knows your public key. Your device keeps the private key and proves it is present.', exampleTitle: 'Device passkey sign-in', exampleDesc: 'The server sends a challenge. The device signs it with a private key. The server verifies the signature with the stored public key.', whatIsIt: 'WebAuthn is the web standard behind passkeys and hardware authenticators. The private key stays on the device or platform account. The server stores the public key. Use trusted WebAuthn libraries because details are easy to get wrong.', sections: [{ icon: 'fa-key', title: 'Private key', desc: 'Kept by the device.', example: 'Not sent to server.' }, { icon: 'fa-keycdn', title: 'Public key', desc: 'Stored by the server.', example: 'Used to verify signatures.' }, { icon: 'fa-file-signature', title: 'Challenge', desc: 'Server sends random data to sign.', example: 'Prevents replay.' }], code: `challenge = server.randomChallenge()
signature = device.sign(challenge, privateKey)
server.verify(signature, publicKey)`, checklist: ['Define passkey.', 'Mention WebAuthn.', 'Explain server public key vs device private key.'], demoScenario: 'passwords' }),
      DS.authIdentityPage({ id: 'account-recovery', label: 'Account Recovery', title: 'Account Recovery', subtitle: 'Recovery is security-sensitive because it can bypass normal login.', analogy: 'A locksmith process needs strict proof before opening the door.', exampleTitle: 'Lost phone and password', exampleDesc: 'The user loses MFA access. Recovery flow must verify identity carefully without letting attackers take over accounts.', whatIsIt: 'Account recovery includes password resets, backup codes, support workflows, and device changes. It needs rate limits, logging, notifications, expiration, and careful human processes for high-risk accounts.', sections: [{ icon: 'fa-life-ring', title: 'Backup paths', desc: 'Give users safe ways back in.', example: 'Backup codes stored offline.' }, { icon: 'fa-bell', title: 'Notifications', desc: 'Alert users about recovery events.', example: 'Email after password reset.' }, { icon: 'fa-clipboard-list', title: 'Audit', desc: 'Record sensitive recovery actions.', example: 'Who changed MFA, when, and from where.' }], code: `startRecovery()
rateLimit(userOrIp)
verify recovery token
notify account owner
log security event`, checklist: ['Explain why recovery is sensitive.', 'Name one recovery protection.', 'Connect recovery to logging and notifications.'], demoScenario: 'passwords' }),
      DS.authIdentityPage({ id: 'password-common-mistakes', label: 'Common Mistakes', title: 'Common Mistakes', subtitle: 'Do not weaken the strongest part of your account system.', analogy: 'A safe is useless if the reset code is printed on the receipt.', exampleTitle: 'Plain password storage', exampleDesc: 'A database leak exposes every user password because the app stored plain text instead of slow hashes.', whatIsIt: 'Common mistakes include storing plain passwords, using fast hashes, reusing reset tokens, letting reset links live too long, skipping rate limits, weak account recovery, storing secrets in frontend code, and trying to implement passkeys without trusted libraries.', sections: [{ icon: 'fa-database', title: 'Plain text', desc: 'Never store readable passwords.', example: 'password column should not contain secret words.' }, { icon: 'fa-hourglass', title: 'Long-lived reset', desc: 'Reset links should expire quickly.', example: 'Not valid for weeks.' }, { icon: 'fa-code', title: 'DIY crypto', desc: 'Custom security code fails easily.', example: 'Use trusted password and WebAuthn libraries.' }], code: `// Required production stance
use trusted password hashing
use single-use expiring reset tokens
use trusted MFA/passkey libraries
keep secrets server-side`, checklist: ['Repeat never store plain passwords.', 'Explain why reset links expire and are single-use.', 'Repeat not to write custom password hashing.'], demoScenario: 'passwords' }),
    ],
    codeTitle: 'Password Storage Shape',
    codeLanguage: 'Pseudocode',
    codeText: `signup(password):
  storedHash = trustedPasswordHasher.hash(password)
  save storedHash

login(passwordAttempt):
  if trustedPasswordHasher.verify(passwordAttempt, storedHash):
    continue to MFA or create session`,
    checklist: ['Explain hashing, salt, slow hashing, reset links, magic links, MFA, TOTP, and passkeys.', 'Describe why account recovery is sensitive.', 'Repeat the production warnings.'],
  },
);
