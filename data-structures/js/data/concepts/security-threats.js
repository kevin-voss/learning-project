window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'web-security-threats',
  category: 'Security',
  title: 'Web Security Threats',
  icon: 'fa-bug-slash',
  number: '30',
  subtitle: 'Recognize common web attacks, learn safe patterns, and know when to rely on trusted libraries.',
  analogy: 'Web security is like building a house with locks, peepholes, and fire exits. You think about who might try the door, what they want, and how each layer slows them down.',
  whatIsIt: 'Web security threats are ways attackers abuse normal features, forms, URLs, cookies, databases, and APIs, to steal data, change accounts, or crash services. Beginners do not need exploit recipes. They need to recognize risky patterns and replace them with validation, escaping, tokens, parameterized queries, rate limiting, and least privilege.',
  whyUse: 'Many breaches start with simple mistakes: trusting user input, exposing secrets in frontend code, or skipping CSRF protection. Learning threat names and safe defaults helps you read security advice, code reviews, and dependency alerts with confidence.',
  subPages: [
    {
      label: 'Threat Model Basics',
      title: 'Threat Model Basics',
      subtitle: 'Start by naming what you protect, who might attack, and what could go wrong.',
      analogy: 'A threat model is like a home security plan. You list valuables, likely entry points, and which locks or alarms go where, before buying random gadgets.',
      whatIsIt: 'A threat model is a beginner-friendly map of assets (passwords, profiles, payments), trust boundaries (browser vs server vs database), and realistic risks. You do not need a formal document on day one. Ask: what data matters, who can reach it, and what happens if input or sessions are abused?',
      conceptSections: [
        { icon: 'fa-gem', title: 'Assets', desc: 'What must stay private or correct?', example: 'User emails, session tokens, admin actions, payment records.' },
        { icon: 'fa-user-ninja', title: 'Adversaries', desc: 'Who might try to abuse the system?', example: 'Strangers on the internet, logged-in users pushing limits, compromised dependencies.' },
        { icon: 'fa-door-open', title: 'Entry points', desc: 'Where does untrusted input enter?', example: 'Forms, URLs, file uploads, webhooks, API bodies.' },
        { icon: 'fa-shield', title: 'Controls', desc: 'What defenses exist already?', example: 'HTTPS, auth, validation, CSRF tokens, rate limits, security headers.' },
      ],
      checklist: ['Name three assets your app must protect.', 'Point to one trust boundary between browser and server.', 'List two entry points where user input arrives.'],
    },
    {
      label: 'Input Validation',
      title: 'Input Validation',
      subtitle: 'Treat all user input as untrusted until it passes clear rules.',
      analogy: 'Input validation is like checking IDs at the door. You verify format and permissions before letting data into sensitive rooms.',
      whatIsIt: 'Input validation checks type, length, format, and allowed values on the server. The browser can hint with HTML attributes, but attackers can bypass the browser. Validation reduces bad data. Sanitization and escaping handle display and storage safely. Real apps use schema libraries (Zod, Joi, class-validator) and framework helpers, do not hand-roll every rule from scratch.',
      conceptSections: [
        { icon: 'fa-ruler', title: 'Validate early', desc: 'Reject unexpected input before business logic runs.', example: 'Email must look like an email. Age must be a number within range.' },
        { icon: 'fa-list-check', title: 'Allowlists beat blocklists', desc: 'Define what is allowed instead of guessing every bad pattern.', example: 'Role must be student or admin, not free-form text.' },
        { icon: 'fa-server', title: 'Server-side is required', desc: 'Client checks help UX. Server checks enforce security.', example: 'A crafted HTTP request can skip browser validation entirely.' },
      ],
      codeTitle: 'Validation Shape Example',
      codeLanguage: 'JavaScript',
      codeText: `const schema = {
  email: { type: 'string', maxLength: 254, format: 'email' },
  age: { type: 'number', minimum: 13, maximum: 120 },
};

function validateProfile(input) {
  if (typeof input.email !== 'string' || input.email.length > 254) {
    return { ok: false, error: 'Invalid email' };
  }
  if (typeof input.age !== 'number' || input.age < 13 || input.age > 120) {
    return { ok: false, error: 'Invalid age' };
  }
  return { ok: true, data: input };
}`,
      demoType: 'security-threats',
      demoScenario: 'xss',
      checklist: ['Explain why server-side validation is required.', 'Give one allowlist example.', 'Describe how validation differs from escaping.'],
    },
    {
      label: 'XSS',
      title: 'Cross-Site Scripting (XSS)',
      subtitle: 'Never treat user text as HTML unless you deliberately sanitize it.',
      analogy: 'XSS is like letting a guest write on your storefront sign. If you hang their note as-is, they can change what every passerby sees, or worse, run a script in visitors’ browsers.',
      whatIsIt: 'Cross-Site Scripting (XSS) happens when user-controlled data is rendered as active HTML or JavaScript in another user’s browser. Stored XSS saves the payload in the database. Reflected XSS bounces it through a URL or error page. Defense: escape output for the context (HTML, attribute, URL), use safe templating, and prefer textContent over innerHTML. Frameworks like React escape by default, danger returns when you use dangerouslySetInnerHTML or raw HTML sinks without a trusted sanitizer.',
      conceptSections: [
        { icon: 'fa-code', title: 'Unsafe sink', desc: 'A place where HTML runs instead of displaying as text.', example: 'element.innerHTML = userComment is risky.' },
        { icon: 'fa-shield-virus', title: 'Safe display', desc: 'Show user words as text, not markup.', example: 'element.textContent = userComment or framework auto-escape.' },
        { icon: 'fa-filter', title: 'Sanitize when needed', desc: 'Rich text editors need allowlisted tags from a trusted library.', example: 'DOMPurify with a strict config, not homemade regex.' },
      ],
      codeTitle: 'Display User Comment Safely',
      codeLanguage: 'JavaScript',
      codeText: `// Risky: interprets HTML and script
// element.innerHTML = userComment;

// Safer: show literal text
element.textContent = userComment;

// Rich HTML only through a trusted sanitizer + allowlist
// element.innerHTML = DOMPurify.sanitize(userComment, { ALLOWED_TAGS: ['b', 'i', 'p'] });`,
      demoType: 'security-threats',
      demoScenario: 'xss',
      checklist: ['Explain stored vs reflected XSS in plain language.', 'Name one unsafe DOM API and one safe alternative.', 'State why trusted sanitizers beat homemade filters.'],
    },
    {
      label: 'CSRF',
      title: 'Cross-Site Request Forgery (CSRF)',
      subtitle: 'Ensure state-changing requests really came from your app.',
      analogy: 'CSRF is like a forged signature on a form. The bank trusts your session cookie, so a malicious site tries to submit a transfer while you are still logged in.',
      whatIsIt: 'Cross-Site Request Forgery (CSRF) tricks a logged-in browser into sending unwanted POST, PUT, or DELETE requests. The browser automatically attaches cookies, so the server may think the user intended the action. Defenses include CSRF tokens tied to the session, SameSite cookies, and re-checking sensitive actions. Modern frameworks often ship CSRF middleware, use it instead of inventing token logic alone.',
      conceptSections: [
        { icon: 'fa-cookie-bite', title: 'Automatic cookies', desc: 'Browsers send session cookies without asking each time.', example: 'That helps UX but enables CSRF if actions lack extra proof.' },
        { icon: 'fa-ticket', title: 'CSRF token', desc: 'A secret value embedded in your form that attackers cannot read cross-origin.', example: 'Server compares token in body/header with session store.' },
        { icon: 'fa-lock', title: 'SameSite cookies', desc: 'Limits when cookies ride along on cross-site requests.', example: 'SameSite=Lax or Strict reduces CSRF risk for many apps.' },
      ],
      codeTitle: 'CSRF Token Pattern',
      codeLanguage: 'HTML',
      codeText: `<form method="POST" action="/transfer">
  <input type="hidden" name="_csrf" value="session-bound-random-token">
  <label>Amount <input name="amount" type="number"></label>
  <button type="submit">Transfer</button>
</form>

// Server must reject POST /transfer when token is missing or wrong.`,
      demoType: 'security-threats',
      demoScenario: 'csrf',
      checklist: ['Explain why cookies alone do not prove intent.', 'Describe what a CSRF token adds.', 'Name one framework or middleware feature that helps.'],
    },
    {
      label: 'SQL Injection',
      title: 'SQL Injection',
      subtitle: 'Never build SQL by concatenating raw user strings.',
      analogy: 'SQL injection is like letting a customer write part of the shop inventory query. They might rewrite the question to see everyone’s records instead of their own.',
      whatIsIt: 'SQL injection inserts database commands through input that was stitched into a query string. Attackers may read, change, or delete data. Fix: parameterized queries (prepared statements) where user values are data, not code. ORMs help when you avoid raw string SQL. This lesson shows toy examples only, never probe real systems.',
      conceptSections: [
        { icon: 'fa-link-slash', title: 'String concatenation', desc: 'Building SQL with + or template strings around raw input is unsafe.', example: `"SELECT * FROM users WHERE email = '" + email + "'"` },
        { icon: 'fa-database', title: 'Parameters', desc: 'The database treats user input as a value bound to placeholders.', example: 'SELECT * FROM users WHERE email = $1 with params [email]' },
        { icon: 'fa-user-lock', title: 'Least privilege', desc: 'DB accounts should not have admin powers the app does not need.', example: 'Read-only role for reporting queries.' },
      ],
      codeTitle: 'Parameterized Query Example',
      codeLanguage: 'JavaScript',
      codeText: `// Unsafe
// db.query("SELECT * FROM users WHERE email = '" + email + "'");

// Safer: parameter binding
await db.query('SELECT * FROM users WHERE email = $1', [email]);`,
      demoType: 'security-threats',
      demoScenario: 'sql',
      checklist: ['Explain why concatenating SQL strings is risky.', 'Show a parameterized query in your own words.', 'Note why ORMs still need careful raw queries.'],
    },
    {
      label: 'Command Injection',
      title: 'Command Injection',
      subtitle: 'Avoid passing user input to shell commands.',
      analogy: 'Command injection is like handing a stranger your keyboard while a terminal is open. One extra semicolon can run a command you never intended.',
      whatIsIt: 'Command injection runs operating-system commands when user input is passed to exec, spawn, or shell utilities. Web apps should rarely shell out at all. Prefer language libraries and APIs. If you must run commands, use strict allowlists, never invoke a shell with interpolated input, and run with minimal OS permissions.',
      conceptSections: [
        { icon: 'fa-terminal', title: 'Shell metacharacters', desc: 'Characters like ;, |, && can chain extra commands.', example: 'filename.txt; rm -rf / in a toy lesson, not a recipe for attacks.' },
        { icon: 'fa-ban', title: 'Avoid shells', desc: 'exec("convert " + userFile) is dangerous.', example: 'Use a library API that accepts arguments as an array.' },
        { icon: 'fa-user-shield', title: 'Sandbox and privilege', desc: 'Run helpers as a low-power user with no secrets nearby.', example: 'Container with read-only filesystem for image processing.' },
      ],
      codeTitle: 'Prefer APIs Over Shell',
      codeLanguage: 'JavaScript',
      codeText: `// Risky pattern: do not copy
// exec('ping ' + userHost);

// Better: validate host against allowlist + use safe API
const allowed = /^[a-z0-9.-]+$/i;
if (!allowed.test(userHost)) throw new Error('Invalid host');
// use a vetted network library instead of shell ping`,
      demoType: 'security-threats',
      demoScenario: 'command-injection',
      checklist: ['Explain why shell string concatenation is dangerous.', 'Name one safer alternative to shelling out.', 'Connect command injection to least privilege on servers.'],
    },
    {
      label: 'SSRF',
      title: 'Server-Side Request Forgery (SSRF)',
      subtitle: 'Do not let users pick arbitrary URLs your server will fetch.',
      whatIsIt: 'SSRF tricks your server into requesting internal URLs (metadata services, admin panels) the attacker cannot reach directly. Validate outbound hosts, block private IP ranges, and use allowlists.',
      demoType: 'security-threats',
      demoScenario: 'ssrf',
      checklist: ['Explain why server-side fetches are sensitive.', 'Name one internal target attackers seek.', 'Describe allowlist validation for URLs.'],
    },
    {
      label: 'Path Traversal',
      title: 'Path Traversal',
      subtitle: 'Reject ../ and absolute paths in file parameters.',
      whatIsIt: 'Path traversal uses ../ sequences to escape intended directories and read or write files like /etc/passwd. Canonicalize paths, chroot to allowed roots, and never pass raw user strings to open().',
      demoType: 'security-threats',
      demoScenario: 'path-traversal',
      checklist: ['Show how ../ walks up directories.', 'Explain canonical path checks.', 'Keep uploads outside web root.'],
    },
    {
      label: 'IDOR',
      title: 'Insecure Direct Object Reference (IDOR)',
      subtitle: 'IDs in URLs must be authorized, not just guessed.',
      whatIsIt: 'IDOR exposes objects when apps check authentication but skip authorization: user 5 can open /invoice/99 belonging to user 2. Always verify resource ownership server-side.',
      demoType: 'security-threats',
      demoScenario: 'idor',
      checklist: ['Contrast authentication vs authorization.', 'Give an IDOR example with numeric IDs.', 'State the server-side ownership check pattern.'],
    },
    {
      label: 'Session Fixation',
      title: 'Session Fixation',
      subtitle: 'Issue a new session ID after login.',
      whatIsIt: 'Session fixation attacks trick users into using an attacker-known session ID before login. Regenerate session identifiers on privilege change and mark cookies HttpOnly and Secure.',
      demoType: 'security-threats',
      demoScenario: 'session-fixation',
      checklist: ['Explain when to rotate session IDs.', 'Name two safe cookie flags.', 'Link to authentication-sessions lesson.'],
    },
    {
      label: 'Open Redirect',
      title: 'Open Redirect',
      subtitle: 'Validate redirect targets: do not forward users to arbitrary URLs.',
      whatIsIt: 'Open redirects in ?next= parameters enable phishing: your trusted domain sends users to a fake login. Allow only relative paths or an allowlist of hosts.',
      demoType: 'security-threats',
      demoScenario: 'open-redirect',
      checklist: ['Show a malicious next= URL example.', 'Prefer relative redirects.', 'Reject protocol-relative //evil URLs.'],
    },
    {
      label: 'Rate Limiting',
      title: 'Rate Limiting',
      subtitle: 'Slow down brute-force and abuse before it overwhelms you.',
      analogy: 'Rate limiting is like a bouncer counting entries per minute. Legitimate guests still get in. Someone hammering the door gets turned away.',
      whatIsIt: 'Rate limiting caps how many requests a user, IP, or API key can make in a window. It protects login, password reset, coupon redemption, and expensive endpoints. Combine with logging and alerts. Gateways (Cloudflare, API gateways) and libraries (express-rate-limit, Redis counters) provide battle-tested patterns, rolling your own counters is fine for learning, not for production alone.',
      conceptSections: [
        { icon: 'fa-gauge-high', title: 'Limits', desc: 'Define max attempts per minute or hour.', example: '5 login failures per IP per 15 minutes.' },
        { icon: 'fa-hourglass-half', title: 'Windows', desc: 'Counters reset or slide over time.', example: 'Token bucket or fixed window algorithms.' },
        { icon: 'fa-reply', title: 'Responses', desc: 'Return 429 Too Many Requests with Retry-After.', example: 'Tell clients to back off instead of silently failing.' },
      ],
      demoType: 'security-threats',
      demoScenario: 'rate-limit',
      checklist: ['Name two endpoints worth rate limiting.', 'Explain what HTTP 429 communicates.', 'Describe why rate limits complement strong passwords.'],
    },
    {
      label: 'Secrets Leaks',
      title: 'Secrets Leaks',
      subtitle: 'If it is in the browser bundle, assume the world can read it.',
      analogy: 'Putting API secrets in frontend code is like taping your house key to the outside of the door. Anyone who walks by can copy it.',
      whatIsIt: 'Secrets leaks expose private keys, database passwords, or signing secrets in JavaScript bundles, mobile apps, Git repos, or screenshots. Browsers download frontend code to every visitor, there is no hiding. Keep secrets on the server, environment variables, or a secrets manager. Use short-lived tokens and scoped keys when the client must call third parties.',
      conceptSections: [
        { icon: 'fa-eye', title: 'Public client code', desc: 'Anything shipped to the browser is inspectable.', example: 'DevTools → Sources shows bundled strings.' },
        { icon: 'fa-server', title: 'Server-only secrets', desc: 'Payment, database, and admin keys stay off the client.', example: 'Server calls Stripe. Browser gets a public publishable key only.' },
        { icon: 'fa-rotate', title: 'Rotate and scope', desc: 'If a key leaks, revoke it and issue a narrower replacement.', example: 'Read-only API key instead of full admin access.' },
      ],
      demoType: 'security-threats',
      demoScenario: 'secrets',
      checklist: ['Explain why frontend code cannot hide secrets.', 'Name one place secrets should live instead.', 'Describe what to do after accidental commit of a key.'],
    },
    {
      label: 'Secure Headers',
      title: 'Secure Headers',
      subtitle: 'Tell browsers to enable extra protections automatically.',
      analogy: 'Security headers are like safety signs in a factory. They do not replace locks, but they remind every browser how strictly to behave on your site.',
      whatIsIt: 'Security headers are HTTP response headers that activate browser defenses: Content-Security-Policy reduces XSS impact, Strict-Transport-Security enforces HTTPS, X-Frame-Options or frame-ancestors reduces clickjacking, and X-Content-Type-Options stops MIME sniffing. Platforms and middleware (Helmet for Express, framework configs) set sensible defaults, tune carefully instead of copying random snippets.',
      conceptSections: [
        { icon: 'fa-file-shield', title: 'Content-Security-Policy', desc: 'Controls which scripts, styles, and connections load.', example: "default-src 'self'. Script-src 'self'" },
        { icon: 'fa-lock', title: 'Strict-Transport-Security', desc: 'Forces HTTPS for future visits.', example: 'max-age=31536000; includeSubDomains' },
        { icon: 'fa-window-restore', title: 'Clickjacking defenses', desc: 'Prevent your site from being embedded in malicious frames.', example: 'frame-ancestors none or X-Frame-Options DENY' },
      ],
      codeTitle: 'Example Security Headers',
      codeLanguage: 'HTTP',
      codeText: `Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin`,
      demoType: 'security-threats',
      demoScenario: 'headers',
      checklist: ['Name two security headers and what they do.', 'Explain why CSP helps after an XSS mistake.', 'Note that headers complement, not replace, secure coding.'],
    },
    {
      label: 'Dependency Vulnerabilities',
      title: 'Dependency Vulnerabilities',
      subtitle: 'Your app inherits security bugs from packages you import.',
      analogy: 'Dependencies are like ingredients from other kitchens. If a supplier recalls flour, your bread is affected even if your recipe never changed.',
      whatIsIt: 'A dependency vulnerability is a known flaw in a library you use transitively or directly. Attackers scan for outdated packages with public CVEs. Use lockfiles, npm audit, Dependabot, Snyk, or OSV scanners. Upgrade deliberately, read changelogs, and pin versions in production. Removing unused packages shrinks attack surface.',
      conceptSections: [
        { icon: 'fa-box-open', title: 'Transitive deps', desc: 'Your dependencies have their own dependencies.', example: 'A small utility may pull in dozens of packages.' },
        { icon: 'fa-magnifying-glass', title: 'Scanning', desc: 'Automated tools match versions to advisory databases.', example: 'CI fails when critical CVEs appear.' },
        { icon: 'fa-arrow-up', title: 'Patch cadence', desc: 'Schedule regular upgrades and test after bumps.', example: 'Weekly review of high-severity alerts.' },
      ],
      checklist: ['Explain direct vs transitive dependencies.', 'Name one tool that reports CVEs.', 'Describe why unused packages should be removed.'],
    },
    {
      label: 'Least Privilege',
      title: 'Least Privilege',
      subtitle: 'Give every user, service, and token the minimum power it needs.',
      analogy: 'Least privilege is like giving hotel guests room keys, not master keys to every floor. Staff get only the doors their job requires.',
      whatIsIt: 'Least privilege limits accounts, API tokens, database roles, and cloud IAM policies to necessary actions. Admins can edit lessons. Students cannot. Microservices use separate credentials. Short-lived tokens beat long-lived god keys. When something is compromised, narrow permissions contain the blast radius.',
      conceptSections: [
        { icon: 'fa-user-gear', title: 'Roles', desc: 'Map permissions to job functions.', example: 'viewer, editor, admin, not one superuser for everyone.' },
        { icon: 'fa-key', title: 'Scoped tokens', desc: 'API keys should read OR write specific resources.', example: 'Upload key cannot delete billing data.' },
        { icon: 'fa-clock', title: 'Time limits', desc: 'Expire credentials and revisit access regularly.', example: 'Contractor account disabled after project ends.' },
      ],
      checklist: ['Give one role separation example.', 'Explain how least privilege helps after a leak.', 'Connect least privilege to database users and cloud IAM.'],
    },
    {
      label: 'Safe Defaults Checklist',
      title: 'Safe Defaults Checklist',
      subtitle: 'A practical recap before you ship real features.',
      analogy: 'Safe defaults are like a pilot checklist. You verify the same critical items every flight so nothing important is assumed.',
      whatIsIt: 'Before shipping, walk through defenses: HTTPS everywhere, server-side validation, escaped output, CSRF tokens on state changes, parameterized SQL, no shell with user input, rate limits on auth, secrets server-side only, security headers, dependency scanning, and least privilege. Real teams embed these in code review templates and CI. Trusted frameworks provide many defaults, learn what they do and what you must still configure.',
      conceptSections: [
        { icon: 'fa-check-double', title: 'Build time', desc: 'Lockfiles, audit in CI, no secrets in repo.', example: 'Pre-commit hooks block .env commits.' },
        { icon: 'fa-rocket', title: 'Deploy time', desc: 'TLS, headers, environment isolation.', example: 'Separate staging and production credentials.' },
        { icon: 'fa-heart-pulse', title: 'Run time', desc: 'Logging, alerts, incident playbooks.', example: 'Rotate keys if leak suspected.' },
      ],
      checklist: [
        'Use HTTPS and secure cookies for auth.',
        'Validate on the server. Escape or sanitize on output.',
        'Use CSRF protection and parameterized SQL.',
        'Rate-limit sensitive endpoints and keep secrets off the client.',
        'Set security headers, scan dependencies, and apply least privilege.',
      ],
    },
  ],
});
