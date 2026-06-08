window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'web-big-picture',
    category: 'Web Basics',
    title: 'How the Web Fits Together',
    icon: 'fa-map',
    number: '20',
    subtitle: 'Before learning tools, build a map of how browser apps, servers, networks, and databases work together.',
    analogy: 'A web app is like a delivery system. The browser is the customer, the internet is the road, the server is the shop, and the database is the storage room.',
    realWorldExample: {
      title: 'Opening a learning app',
      desc: 'You type a URL. The browser finds the server, downloads the app, asks an API for lessons, and displays the result. If you mark a lesson complete, the browser sends another request so the server can save progress.',
    },
    whatIsIt: 'The web is a set of connected responsibilities. The browser shows the screen. The internet carries messages. A server handles requests. A database remembers information. Developer tools help teams build, ship, and protect all of it.',
    whyUse: 'Beginners often learn Git, Docker, HTTP, auth, and deployment as separate words. This lesson gives one mental model first, so every later tool has a place to live.',
    conceptSections: [
      { icon: 'fa-window-maximize', title: 'Browser', desc: 'The browser is the user-facing part. It renders pages and runs frontend JavaScript.', example: 'Clicking a button can make the browser send a request.' },
      { icon: 'fa-network-wired', title: 'Internet', desc: 'The internet moves small packets of data between computers.', example: 'A request may cross Wi-Fi, routers, and providers before reaching a server.' },
      { icon: 'fa-server', title: 'Server', desc: 'The server waits for requests, runs logic, and sends responses.', example: 'A server checks login and returns profile data.' },
      { icon: 'fa-database', title: 'Database', desc: 'The database remembers data when the server restarts.', example: 'Users, posts, orders, and lessons often live in a database.' },
    ],
    conceptFlow: ['User opens URL', 'Browser finds server', 'Server sends app files', 'Browser runs JavaScript', 'JavaScript calls API', 'Server reads database', 'Browser updates screen'],
    mermaidDiagram: `flowchart LR
  User[User] --> Browser[Browser]
  Browser --> Internet[Internet]
  Internet --> Server[Server]
  Server --> Database[Database]
  Server --> API[API response]
  API --> Browser
  Browser --> Screen[Updated screen]`,
    demoType: 'web-foundations',
    demoTitle: 'Follow the app path',
    demoHint: 'Step through the high-level journey from browser to server and back.',
    demoSteps: [
      { label: 'Open URL', detail: 'The browser starts from a web address.', result: 'The browser knows which site the user wants.' },
      { label: 'Ask server', detail: 'A request travels across the internet to a server.', result: 'The server receives a message to handle.' },
      { label: 'Read data', detail: 'The server may ask a database for saved information.', result: 'Long-term data is loaded on the backend.' },
      { label: 'Render UI', detail: 'The response returns and the browser updates the screen.', result: 'The user sees a page, list, profile, or error.' },
    ],
    checklist: ['Explain the job of a browser, server, and database.', 'Describe a request and response in your own words.', 'Point to where deployment fits in the app journey.'],
  },
  {
    id: 'client-server',
    category: 'Web Basics',
    title: 'Client and Server',
    icon: 'fa-laptop-code',
    number: '21',
    subtitle: 'Most web apps are conversations between a user-facing client and a behind-the-scenes server.',
    analogy: 'A client and server are like a customer and a restaurant kitchen. The customer asks from the menu. The kitchen prepares the result and sends it back.',
    realWorldExample: {
      title: 'Loading your profile',
      desc: 'Your browser asks the server for profile data. The server checks who you are, reads saved information from a database, and sends JSON back. The browser turns that JSON into text, images, and buttons.',
    },
    whatIsIt: 'A client is the part of an app that makes a request. In web development, it is often the browser. A server receives requests, runs logic, talks to databases, and sends responses back.',
    whyUse: 'Client-server design separates responsibilities. The client focuses on the user interface. The server protects important logic, checks permissions, stores data, and gives many clients one shared source of truth.',
    conceptSections: [
      { icon: 'fa-display', title: 'Client', desc: 'The client displays the user interface and starts the conversation.', example: 'A browser sends a request when you click Load comments.' },
      { icon: 'fa-server', title: 'Server', desc: 'The server waits for requests, checks rules, and chooses a response.', example: 'A server checks whether you are logged in before returning private data.' },
      { icon: 'fa-database', title: 'Database', desc: 'The database stores information for later. The client usually should not talk to it directly.', example: 'Profiles, posts, scores, and orders often live in a database.' },
      { icon: 'fa-envelope', title: 'Request and response', desc: 'The client sends a request. The server sends a response.', example: 'GET /api/profile asks for profile data.' },
    ],
    conceptFlow: ['User clicks a button', 'Client sends HTTP request', 'Server receives request', 'Server may read or write database data', 'Server sends HTTP response', 'Client updates the screen'],
    mermaidDiagram: `sequenceDiagram
  participant User
  participant Client as Browser / Client
  participant Server
  participant DB as Database
  User->>Client: Click Load Profile
  Client->>Server: GET /api/profile
  Server->>DB: Read profile data
  DB-->>Server: Profile record
  Server-->>Client: 200 OK + JSON
  Client-->>User: Render profile`,
    whenToUse: [
      { icon: 'fa-window-maximize', title: 'Frontend apps', desc: 'Browsers and mobile apps usually act as clients.' },
      { icon: 'fa-server', title: 'Backend APIs', desc: 'Servers handle private logic and shared data.' },
      { icon: 'fa-user-lock', title: 'Private features', desc: 'Use the server to check who can access sensitive data.' },
      { icon: 'fa-plug', title: 'Integrations', desc: 'Clients and servers communicate through APIs.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Request animation',
    demoHint: 'Watch the client ask, the server decide, and the database remember.',
    demoSteps: [
      { label: 'Client asks', detail: 'The client sends GET /api/profile.', result: 'A request is moving toward the server.' },
      { label: 'Server checks', detail: 'The server decides if this client is allowed to see the data.', result: 'Private logic stays on the server.' },
      { label: 'Database reads', detail: 'The server fetches the saved profile from the database.', result: 'Stored data becomes part of the response.' },
      { label: 'Client renders', detail: 'The response returns as JSON and the client updates the page.', result: 'The user sees the profile.' },
    ],
    codeTitle: 'Client Code Example',
    codeLanguage: 'JavaScript',
    codeText: `async function loadProfile() {
  const response = await fetch('/api/profile');
  const profile = await response.json();

  console.log(profile.name);
}`,
    pros: ['Keeps user interface and private logic separate', 'Lets many clients share one backend', 'Makes databases easier to protect'],
    cons: ['Network failures must be handled', 'Frontend and backend must agree on API shape', 'More moving parts than a single local script'],
    checklist: ['Identify the client and server in a web app.', 'Explain why the browser should not connect directly to a private database.', 'Read a small fetch example and describe the request.'],
  },
  {
    id: 'http-requests-responses',
    category: 'Web Basics',
    title: 'HTTP Requests and Responses',
    icon: 'fa-arrows-left-right',
    number: '22',
    subtitle: 'HTTP is the language browsers and servers use to ask for data, send updates, and report what happened.',
    analogy: 'An HTTP conversation is like ordering at a counter. The method is what you want to do. Headers are notes on the order slip. The body is the actual payload. The status code is the cashier telling you whether it worked.',
    realWorldExample: {
      title: 'Saving a profile change',
      desc: 'You edit your display name and click Save. The browser sends a PATCH request with JSON in the body. The server checks your session cookie, updates the database, and replies with 200 OK plus the updated profile JSON.',
    },
    whatIsIt: 'HTTP is a request-and-response protocol. The client sends a request with a method, path, headers, and sometimes a body. The server sends back a status code, headers, and often a body. Browsers, mobile apps, and backend services all speak HTTP when they call APIs or load pages.',
    whyUse: 'Every web feature you build eventually shows up as HTTP: loading pages, logging in, uploading files, handling errors, caching assets, and calling APIs from JavaScript. Understanding requests and responses helps you debug DevTools, write fetch code, and read server logs.',
    conceptSections: [
      { icon: 'fa-paper-plane', title: 'Request', desc: 'A message the client sends to a server.', example: 'PATCH /api/profile with JSON in the body.' },
      { icon: 'fa-reply', title: 'Response', desc: 'The server reply with a status code, headers, and optional body.', example: '200 OK with updated profile JSON.' },
      { icon: 'fa-list-ol', title: 'Status code', desc: 'A three-digit summary of the result.', example: '404 means the resource was not found.' },
      { icon: 'fa-tags', title: 'Headers', desc: 'Metadata that travels with the message.', example: 'Content-Type tells the receiver how to read the body.' },
    ],
    conceptFlow: ['Client chooses method and URL', 'Client adds headers and optional body', 'Server receives request', 'Server runs logic and builds response', 'Client reads status, headers, and body', 'Client updates UI or handles error'],
    mermaidDiagram: `sequenceDiagram
  participant Browser
  participant Server
  Browser->>Server: PATCH /api/profile
  Note over Browser,Server: Headers: Cookie, Content-Type
  Note over Browser,Server: Body: {"name":"Maya"}
  Server-->>Browser: 200 OK
  Note over Browser,Server: Body: {"id":42,"name":"Maya"}`,
    whenToUse: [
      { icon: 'fa-code', title: 'Calling APIs', desc: 'Use HTTP methods and headers when frontend code talks to backend services.' },
      { icon: 'fa-bug', title: 'Debugging', desc: 'Read status codes and response bodies in DevTools when something fails.' },
      { icon: 'fa-lock', title: 'Auth flows', desc: 'Cookies, bearer tokens, and CORS rules all ride on HTTP messages.' },
      { icon: 'fa-gauge-high', title: 'Performance', desc: 'Cache-Control and redirects shape how fast pages and assets load.' },
    ],
    subPages: [
      { id: 'overview', label: 'Overview' },
      {
        id: 'request-anatomy',
        label: 'Request Anatomy',
        title: 'Request Anatomy',
        body: 'A raw HTTP request has four main parts: a request line, headers, a blank line, and an optional body.',
        conceptSections: [
          { icon: 'fa-file-lines', title: 'Request line', desc: 'METHOD path HTTP/version', example: 'GET /api/tasks HTTP/1.1' },
          { icon: 'fa-tags', title: 'Headers', desc: 'Name: value metadata lines', example: 'Host, Content-Type, Cookie' },
          { icon: 'fa-minus', title: 'Blank line', desc: 'Separates headers from the body', example: 'One empty line before body text' },
          { icon: 'fa-box', title: 'Body', desc: 'Optional payload', example: 'JSON for POST, PUT, and PATCH' },
        ],
        codeHttp: `PATCH /api/profile HTTP/1.1
Host: api.example.com
Content-Type: application/json
Cookie: session=abc123

{"name":"Maya"}`,
        codeFetch: `const response = await fetch('/api/profile', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ name: 'Maya' }),
});`,
      },
      {
        id: 'http-methods',
        label: 'HTTP Methods',
        title: 'HTTP Methods',
        body: 'The method says what action the client wants. GET reads, POST creates, PUT replaces, PATCH updates part of a resource, and DELETE removes.',
        conceptSections: [
          { icon: 'fa-download', title: 'GET', desc: 'Fetch data without changing server state', example: 'GET /api/profile' },
          { icon: 'fa-plus', title: 'POST', desc: 'Create a resource or submit data', example: 'POST /api/tasks' },
          { icon: 'fa-arrows-rotate', title: 'PUT', desc: 'Replace a whole resource at a URL', example: 'PUT /api/profile/42' },
          { icon: 'fa-pen', title: 'PATCH', desc: 'Change only some fields', example: 'PATCH /api/profile' },
          { icon: 'fa-trash', title: 'DELETE', desc: 'Remove a resource', example: 'DELETE /api/tasks/42' },
        ],
        codeHttp: `POST /api/tasks HTTP/1.1
Host: api.example.com
Content-Type: application/json

{"title":"Read HTTP lesson"}`,
        codeFetch: `await fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Read HTTP lesson' }),
});`,
      },
      {
        id: 'status-codes',
        label: 'Status Codes',
        title: 'Status Codes',
        body: 'Status codes group results into families. 2xx success, 3xx redirect, 4xx client mistake, 5xx server problem.',
        conceptSections: [
          { icon: 'fa-circle-check', title: '2xx', desc: 'Success', example: '200 OK, 201 Created' },
          { icon: 'fa-share', title: '3xx', desc: 'Redirect', example: '301 Moved Permanently, 302 Found' },
          { icon: 'fa-user-xmark', title: '4xx', desc: 'Client error', example: '400 Bad Request, 401 Unauthorized, 404 Not Found' },
          { icon: 'fa-server', title: '5xx', desc: 'Server error', example: '500 Internal Server Error' },
        ],
        codeHttp: `HTTP/1.1 404 Not Found
Content-Type: application/json

{"error":"Task not found"}`,
        codeFetch: `const response = await fetch('/api/tasks/999');
if (!response.ok) {
  console.error('Failed:', response.status, response.statusText);
}`,
      },
      {
        id: 'headers',
        label: 'Headers',
        title: 'Headers',
        body: 'Headers carry metadata: who you are, what format the body uses, caching rules, and security instructions.',
        conceptSections: [
          { icon: 'fa-server', title: 'Host', desc: 'Which server the request is for', example: 'Host: api.example.com' },
          { icon: 'fa-key', title: 'Authorization', desc: 'Bearer token or other credentials', example: 'Authorization: Bearer <token>' },
          { icon: 'fa-file-code', title: 'Accept', desc: 'Preferred response formats', example: 'Accept: application/json' },
          { icon: 'fa-cookie-bite', title: 'Set-Cookie', desc: 'Server tells the browser to store a cookie', example: 'Set-Cookie: session=abc123; HttpOnly' },
        ],
        codeHttp: `GET /api/profile HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...`,
        codeFetch: `await fetch('/api/profile', {
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
  },
});`,
      },
      {
        id: 'body-content-type',
        label: 'Body and Content-Type',
        title: 'Body and Content-Type',
        body: 'When a message has a body, Content-Type tells both sides how to encode and decode it.',
        conceptSections: [
          { icon: 'fa-brackets-curly', title: 'application/json', desc: 'JavaScript objects as JSON text', example: '{"name":"Maya"}' },
          { icon: 'fa-keyboard', title: 'form-urlencoded', desc: 'HTML form fields', example: 'email=maya%40example.com' },
          { icon: 'fa-paperclip', title: 'multipart/form-data', desc: 'File uploads with mixed parts', example: 'Upload avatar + text fields' },
          { icon: 'fa-code', title: 'text/html', desc: 'Web page markup in responses', example: '<!DOCTYPE html>...' },
        ],
        codeHttp: `POST /api/upload HTTP/1.1
Host: api.example.com
Content-Type: application/json

{"fileName":"notes.txt"}`,
        codeFetch: `await fetch('/api/upload', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fileName: 'notes.txt' }),
});`,
      },
      {
        id: 'cookies-storage',
        label: 'Cookies and Browser Storage',
        title: 'Cookies and Browser Storage',
        body: 'Cookies are small pieces of data the browser stores and sends back on matching requests. localStorage and sessionStorage stay in the browser and are not sent automatically.',
        conceptSections: [
          { icon: 'fa-cookie', title: 'Set-Cookie', desc: 'Response header that creates or updates a cookie', example: 'Set-Cookie: session=abc123' },
          { icon: 'fa-paper-plane', title: 'Cookie header', desc: 'Browser sends stored cookies on later requests', example: 'Cookie: session=abc123' },
          { icon: 'fa-lock', title: 'HttpOnly', desc: 'Keeps session IDs out of JavaScript', example: 'Set-Cookie: ...; HttpOnly' },
          { icon: 'fa-database', title: 'localStorage', desc: 'Persists in the browser until cleared', example: 'Not sent with every HTTP request' },
        ],
        codeHttp: `HTTP/1.1 200 OK
Set-Cookie: session=abc123; HttpOnly; Secure; Path=/
Content-Type: application/json

{"ok":true}`,
        codeFetch: `await fetch('/api/login', {
  method: 'POST',
  credentials: 'include',
  body: JSON.stringify({ email, password }),
});`,
      },
      {
        id: 'redirects',
        label: 'Redirects',
        title: 'Redirects',
        body: 'A redirect response tells the client to request a different URL. Temporary redirects use 302; permanent moves often use 301.',
        conceptSections: [
          { icon: 'fa-location-arrow', title: 'Location', desc: 'Header naming the new URL', example: 'Location: https://example.com/dashboard' },
          { icon: 'fa-route', title: 'Auto-follow', desc: 'Browsers usually follow redirects automatically', example: 'fetch with redirect: "follow"' },
          { icon: 'fa-bookmark', title: '301', desc: 'Permanent move for SEO and bookmarks', example: 'Old URL should update references' },
          { icon: 'fa-clock', title: '302', desc: 'Temporary redirect for now', example: 'Try another URL this time' },
        ],
        codeHttp: `HTTP/1.1 302 Found
Location: https://example.com/dashboard
Content-Length: 0`,
        codeFetch: `const response = await fetch('/old-dashboard', { redirect: 'follow' });
console.log('Final URL:', response.url);`,
      },
      {
        id: 'caching-headers',
        label: 'Caching Headers',
        title: 'Caching Headers',
        body: 'Cache-Control and related headers tell browsers and CDNs whether to reuse a response or fetch a fresh copy.',
        conceptSections: [
          { icon: 'fa-hourglass', title: 'max-age', desc: 'How long a cached copy may be reused', example: 'Cache-Control: max-age=3600' },
          { icon: 'fa-ban', title: 'no-store', desc: 'Do not save the response', example: 'Use for private or sensitive data' },
          { icon: 'fa-fingerprint', title: 'ETag', desc: 'Supports conditional requests', example: 'If-None-Match: "v42"' },
          { icon: 'fa-bolt', title: 'Performance', desc: 'Good caching speeds repeat visits', example: 'Static assets cache longer than API JSON' },
        ],
        codeHttp: `HTTP/1.1 200 OK
Cache-Control: public, max-age=3600
ETag: "v42"
Content-Type: application/json

{"lessons":[]}`,
        codeFetch: `const response = await fetch('/api/lessons');
console.log(response.headers.get('cache-control'));`,
      },
      {
        id: 'cors-preflight',
        label: 'CORS and Preflight',
        title: 'CORS and Preflight',
        body: 'Browsers block many cross-origin requests unless the server explicitly allows them. Some requests trigger a preflight OPTIONS check first.',
        conceptSections: [
          { icon: 'fa-globe', title: 'Origin', desc: 'Where the JavaScript page came from', example: 'Origin: https://app.example.com' },
          { icon: 'fa-check', title: 'Allow-Origin', desc: 'Server lists permitted origins', example: 'Access-Control-Allow-Origin: https://app.example.com' },
          { icon: 'fa-plane-departure', title: 'Preflight', desc: 'OPTIONS check before the real request', example: 'PATCH with custom headers may preflight' },
          { icon: 'fa-shield', title: 'Browser rule', desc: 'Servers must answer preflight before the real call proceeds', example: 'Missing CORS headers block the response' },
        ],
        codeHttp: `OPTIONS /api/profile HTTP/1.1
Host: api.example.com
Origin: https://app.example.com
Access-Control-Request-Method: PATCH`,
        codeFetch: `await fetch('https://api.example.com/profile', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Maya' }),
});`,
      },
      {
        id: 'idempotency',
        label: 'Idempotency',
        title: 'Idempotency',
        body: 'An idempotent request can be sent more than once without changing the result beyond the first successful call. GET, PUT, and DELETE are idempotent; POST usually is not.',
        conceptSections: [
          { icon: 'fa-download', title: 'GET', desc: 'Safe to repeat; reads the same resource', example: 'GET /api/profile' },
          { icon: 'fa-arrows-rotate', title: 'PUT', desc: 'Same body replaces the same resource', example: 'PUT /api/profile/42' },
          { icon: 'fa-trash', title: 'DELETE', desc: 'First call removes; later calls may 404', example: 'DELETE /api/tasks/42' },
          { icon: 'fa-plus', title: 'POST', desc: 'Usually creates a new resource each time', example: 'POST /api/tasks' },
        ],
        codeHttp: `PUT /api/profile/42 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{"name":"Maya","theme":"dark"}`,
        codeFetch: `await fetch('/api/profile/42', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Maya', theme: 'dark' }),
});`,
      },
    ],
    demoType: 'http',
    demoTitle: 'HTTP request inspector',
    demoHint: 'Pick a method, toggle headers, body, and cookies, then see the raw request and example response.',
    checklist: ['Read a raw HTTP request and name its parts.', 'Match GET, POST, PUT, PATCH, and DELETE to common use cases.', 'Explain what 2xx, 3xx, 4xx, and 5xx mean.', 'Describe when a cookie is sent vs when localStorage is used.'],
  },
  {
    id: 'networking-http',
    category: 'Web Basics',
    title: 'URLs, DNS, HTTP, and HTTPS',
    icon: 'fa-globe',
    number: '23',
    subtitle: 'The web works by finding servers, sending requests, receiving responses, and protecting data in transit.',
    analogy: 'Opening a website is like mailing a letter. The URL is the written address, DNS is the address book, HTTP is the message format, and HTTPS is the sealed envelope.',
    realWorldExample: {
      title: 'Typing a website URL',
      desc: 'When you type https://example.com, the browser parses the URL, asks DNS for an IP address, opens a connection, completes TLS, sends an HTTP request, and receives an HTTP response containing the page.',
    },
    whatIsIt: 'A URL tells the browser what you want. DNS finds the server address. HTTP is the request and response language. HTTPS uses TLS so other people on the network cannot easily read or change the conversation.',
    whyUse: 'Networking basics help beginners debug broken links, failed API calls, bad certificates, 404 pages, redirects, slow pages, and site cannot be reached errors.',
    conceptSections: [
      { icon: 'fa-link', title: 'URL', desc: 'A URL contains parts like protocol, domain, path, query string, and fragment.', example: 'https://shop.example.com/products?id=42#reviews' },
      { icon: 'fa-address-book', title: 'DNS', desc: 'DNS is the internet address book. It finds an IP for a domain.', example: 'example.com resolves to an IP address.' },
      { icon: 'fa-file-lines', title: 'HTTP', desc: 'HTTP messages have methods, headers, status codes, and sometimes a body.', example: 'GET /products asks for data. POST /login sends data.' },
      { icon: 'fa-lock', title: 'HTTPS', desc: 'HTTPS wraps HTTP in TLS encryption.', example: 'Passwords and tokens should travel over HTTPS.' },
    ],
    conceptFlow: ['User enters URL', 'Browser parses URL', 'DNS finds server IP', 'Browser opens connection', 'TLS secures HTTPS', 'Browser sends HTTP request', 'Server sends HTTP response', 'Browser renders page'],
    mermaidDiagram: `flowchart LR
  A[User enters URL] --> B[Browser parses URL]
  B --> C[DNS lookup]
  C --> D[Server IP]
  D --> E[Open connection]
  E --> F[TLS handshake]
  F --> G[HTTP request]
  G --> H[Web server]
  H --> I[HTTP response]
  I --> J[Browser displays page]`,
    demoType: 'web-foundations',
    demoTitle: 'Follow a website request',
    demoHint: 'Connect each network keyword to the browser journey.',
    demoSteps: [
      { label: 'URL', detail: 'The URL says use HTTPS, ask this domain, and request this path.', result: 'The browser knows what resource to ask for.' },
      { label: 'DNS', detail: 'DNS translates the domain into an IP address.', result: 'The browser knows where to connect.' },
      { label: 'TLS', detail: 'TLS creates an encrypted HTTPS channel.', result: 'The request is protected in transit.' },
      { label: 'HTTP', detail: 'The browser sends an HTTP request and reads the status, headers, and body.', result: 'The page or API data arrives.' },
    ],
    codeTitle: 'API Request Example',
    codeLanguage: 'JavaScript',
    codeText: `async function loadUser() {
  const response = await fetch('https://api.example.com/users/42');

  if (!response.ok) {
    throw new Error('Request failed: ' + response.status);
  }

  const user = await response.json();
  console.log(user.name);
}`,
    checklist: ['Break a URL into protocol, domain, path, query, and fragment.', 'Explain why DNS exists.', 'Describe why HTTPS matters for private data.'],
  },
  {
    id: 'networks-ips-requests',
    category: 'Networking',
    title: 'Networks, IPs, Ports, and Requests',
    icon: 'fa-network-wired',
    number: '22',
    subtitle: 'A request reaches a server by moving packets through networks toward an IP address and port.',
    analogy: 'A network request is like shipping a box. The IP address is the building address, the port is the department inside the building, packets are smaller boxes, and routers are delivery hubs along the route.',
    realWorldExample: {
      title: 'Calling a local development API',
      desc: 'When your browser calls http://localhost:3000/api/tasks, localhost points to your own computer, 3000 is the port where the server listens, and /api/tasks is the path the server handles.',
    },
    whatIsIt: 'A network is a group of computers that can send messages to each other. The internet is a network of networks. Data is split into packets, routed toward an IP address, delivered to a port, and then handled by a server process. IPv4 addresses are shorter four-part addresses. IPv6 addresses are longer hexadecimal addresses created because the internet needed far more unique addresses.',
    whyUse: 'Knowing networks, IPs, ports, IPv4, IPv6, and requests helps beginners debug connection refused, wrong port, server not running, timeout, cannot reach API, and works locally but not deployed errors.',
    conceptSections: [
      { icon: 'fa-location-dot', title: 'IP address', desc: 'An IP address identifies a device or server on a network. It is like the destination address for packets.', example: '127.0.0.1 points back to your own computer.' },
      { icon: 'fa-list-ol', title: 'IPv4', desc: 'IPv4 uses four octets. Each octet is a number from 0 to 255, which represents 8 bits.', example: '192.168.1.20 has four octets: 192, 168, 1, and 20.' },
      { icon: 'fa-hashtag', title: 'IPv6', desc: 'IPv6 uses eight hexadecimal groups and supports a much larger address space than IPv4.', example: '2001:0db8:0000:0000:0000:0000:0000:0001 can be shortened to 2001:db8::1.' },
      { icon: 'fa-sitemap', title: 'Subnet', desc: 'A subnet is a smaller range inside a network. CIDR notation says how many starting bits describe the network.', example: '192.168.1.0/24 usually covers 192.168.1.0 through 192.168.1.255.' },
      { icon: 'fa-door-open', title: 'Port', desc: 'A port is a numbered doorway where one server program listens.', example: 'A Vite app may use port 5173 while an API uses port 3000.' },
      { icon: 'fa-boxes-stacked', title: 'Packets', desc: 'Large messages are broken into packets so networks can move them in pieces.', example: 'A response body may arrive as many packets.' },
      { icon: 'fa-route', title: 'Routers', desc: 'Routers forward packets toward the destination network.', example: 'Home Wi-Fi sends traffic to your router, then your internet provider.' },
      { icon: 'fa-handshake', title: 'TCP and UDP', desc: 'TCP is reliable and connection-based. UDP is lighter and does not guarantee delivery.', example: 'Web pages usually use TCP; video calls and games may use UDP.' },
      { icon: 'fa-file-lines', title: 'Request shape', desc: 'A request has a method, path, headers, and sometimes a body.', example: 'POST /login sends credentials in a request body.' },
    ],
    conceptFlow: ['Client chooses host and port', 'DNS or config gives an IP address', 'Message becomes packets', 'Routers forward packets by network ranges', 'Server receives packets on a port', 'Server process handles request', 'Response packets travel back', 'Client rebuilds response'],
    mermaidDiagram: `flowchart LR
  A[Browser request] --> B{Address family}
  B --> C[IPv4 192.168.1.20]
  B --> D[IPv6 2001:db8::1]
  C --> E[Packets]
  D --> E
  E --> F[Home router]
  F --> G[Internet routers]
  G --> H[Server IP]
  H --> I[Port 443 or 3000]
  I --> J[Server process]
  J --> K[Response packets]
  K --> A`,
    demoType: 'web-foundations',
    demoTitle: 'Packet route simulator',
    demoHint: 'Follow a request from browser to IP address, port, server process, and back.',
    demoSteps: [
      { label: 'Choose address', detail: 'The client chooses a host, IP address, and port.', result: 'The request has a destination.' },
      { label: 'Read IP version', detail: 'IPv4 uses four decimal octets. IPv6 uses eight hexadecimal groups that can be shortened with :: once.', result: 'The client and network know which address format they are using.' },
      { label: 'Split packets', detail: 'The message is split into packets for the network.', result: 'Small chunks can travel through routers.' },
      { label: 'Reach port', detail: 'Packets arrive at the server IP and target port.', result: 'The correct server process can receive the request.' },
      { label: 'Return response', detail: 'The server sends response packets back to the client.', result: 'The browser rebuilds the response and uses it.' },
    ],
    codeTitle: 'Address and Request Examples',
    codeLanguage: 'HTTP',
    codeText: `IPv4: 192.168.1.20
  192 = octet 1
  168 = octet 2
  1   = octet 3
  20  = octet 4

IPv6: 2001:db8::1
  8 groups of hexadecimal numbers
  :: compresses groups of zeros once

POST /api/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "email": "maya@example.com",
  "password": "demo-password"
}`,
    checklist: ['Explain IP address vs port.', 'Describe IPv4 octets and IPv6 hexadecimal groups.', 'Describe what packets and routers do.', 'Read a simple HTTP request and identify method, path, headers, and body.'],
  },
  {
    id: 'git-collaboration',
    category: 'Developer Workflow',
    title: 'Git and Collaboration',
    icon: 'fa-code-branch',
    number: '25',
    subtitle: 'Git helps developers save changes, compare versions, and work together without overwriting each other.',
    analogy: 'Git is like a shared notebook with unlimited save points. Each commit is a labeled snapshot. A branch is a safe page for trying an idea.',
    realWorldExample: {
      title: 'Building a website with teammates',
      desc: 'One person edits the homepage, another fixes a button, and another updates styles. Git lets each person work on a branch, save commits, push changes, review work, and merge finished code back into the main project.',
    },
    whatIsIt: 'Git is version control for code. A commit is a saved snapshot. A branch is a separate line of work. A pull request is a review conversation before changes join the main project.',
    whyUse: 'Without Git, collaboration becomes copied folders, confusing file names, and overwritten work. With Git, teams can experiment safely, review changes, roll back mistakes, and keep clear history.',
    conceptSections: [
      { icon: 'fa-folder-tree', title: 'Repository', desc: 'A repository is the project Git watches.', example: 'A website folder with Git history is a repository.' },
      { icon: 'fa-camera', title: 'Commit', desc: 'A commit is a labeled snapshot of meaningful work.', example: 'Commit message: Add signup validation.' },
      { icon: 'fa-code-branch', title: 'Branch', desc: 'A branch lets you work separately from the main project.', example: 'feature/navbar can change navigation safely.' },
      { icon: 'fa-people-arrows', title: 'Pull request', desc: 'A pull request lets teammates review before merging.', example: 'A reviewer can approve or request changes.' },
    ],
    conceptFlow: ['Clone repository', 'Create branch', 'Edit files', 'Stage changes', 'Commit snapshot', 'Push branch', 'Open pull request', 'Review and merge'],
    mermaidDiagram: `flowchart LR
  A[Working directory] --> B[Stage changes]
  B --> C[Commit snapshot]
  C --> D[Push branch]
  D --> E[Open pull request]
  E --> F[Review changes]
  F --> G[Merge into main]
  G --> H[Teammates pull latest]`,
    whenToUse: [
      { icon: 'fa-clock-rotate-left', title: 'Track history', desc: 'Use Git whenever you want a clear record of how a project changed.' },
      { icon: 'fa-user-group', title: 'Work with teammates', desc: 'Use branches and pull requests so people can work in parallel.' },
      { icon: 'fa-flask', title: 'Experiment safely', desc: 'Try an idea on a branch without breaking the main version.' },
      { icon: 'fa-triangle-exclamation', title: 'Recover from mistakes', desc: 'Use history to inspect or undo changes when something goes wrong.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Branch and merge playground',
    demoHint: 'Move from local edits to reviewed work.',
    demoSteps: [
      { label: 'Branch', detail: 'Create a branch so unfinished work stays separate.', result: 'You have a safe workspace.' },
      { label: 'Commit', detail: 'Stage files and make a commit with a message.', result: 'Git has a snapshot you can inspect later.' },
      { label: 'Push', detail: 'Push sends your branch to the shared remote.', result: 'Teammates can see your work.' },
      { label: 'PR + merge', detail: 'A pull request collects review, then merge combines approved work.', result: 'The main branch receives the change.' },
    ],
    codeTitle: 'Git Command Example',
    codeLanguage: 'Shell',
    codeText: `git clone https://github.com/example/site.git
cd site
git switch -c feature/add-navbar
git status
git add index.html styles.css
git commit -m "Add navbar layout"
git push origin feature/add-navbar
git pull origin main`,
    pros: ['Protects project history', 'Makes teamwork safer', 'Supports experiments through branches', 'Helps review, debug, and undo changes'],
    cons: ['New terms can feel confusing at first', 'Merge conflicts require practice', 'Bad commit messages make history harder to understand'],
    checklist: ['Explain commit, branch, push, pull, and merge.', 'Describe why teams use pull requests.', 'Read git status and know whether work is staged.'],
  },
  {
    id: 'servers-deployment-devops',
    category: 'Deployment & DevOps',
    title: 'Servers, Deployment, and CI/CD',
    icon: 'fa-server',
    number: '26',
    subtitle: 'Learn how code moves from your computer to real users, and how teams keep it working.',
    analogy: 'Building an app is like opening a restaurant. Code is the recipe, a server is the kitchen, deployment opens the doors, CI/CD is the checklist, logs are kitchen notes, and monitoring is the smoke alarm.',
    realWorldExample: {
      title: 'Deploying a todo app',
      desc: 'You push code to GitHub. CI runs tests and builds the app. If checks pass, the hosting platform deploys it. Users visit the live URL. If a button breaks, logs show errors and monitoring can alert the team.',
    },
    whatIsIt: 'A server runs software for users. Deployment publishes code. CI checks changes automatically. CD prepares or releases code. Logs and monitoring help teams notice what happens after release.',
    whyUse: 'Real software is more than code on your laptop. It needs a repeatable path to production and a way to see whether users are getting errors, slow pages, or outages.',
    conceptSections: [
      { icon: 'fa-server', title: 'Server', desc: 'A server waits for requests and sends responses.', example: 'GET /health returns {"status":"ok"}.' },
      { icon: 'fa-rocket', title: 'Deployment', desc: 'Deployment copies, builds, or releases code where users can access it.', example: 'A static site may deploy to a CDN.' },
      { icon: 'fa-gears', title: 'CI/CD', desc: 'CI/CD automates checks and releases so humans make fewer repeat mistakes.', example: 'Run tests on every pull request.' },
      { icon: 'fa-chart-line', title: 'Logs and monitoring', desc: 'Logs show events. Monitoring shows health patterns over time.', example: 'An alert fires when error rate jumps.' },
    ],
    conceptFlow: ['Developer writes code', 'Push to Git repository', 'CI runs tests', 'Build app', 'Deploy to server', 'Users send requests', 'Logs and monitoring track health'],
    mermaidDiagram: `flowchart LR
  A[Developer code] --> B[Git push]
  B --> C[CI pipeline]
  C --> D{Tests pass?}
  D -- No --> E[Fix code]
  E --> B
  D -- Yes --> F[Build app]
  F --> G[Deploy]
  G --> H[Users]
  H --> I[Logs]
  H --> J[Monitoring]`,
    whenToUse: [
      { icon: 'fa-globe', title: 'Publishing apps', desc: 'Deploy when other people need to access your work.' },
      { icon: 'fa-vial', title: 'Automated checks', desc: 'Use CI so tests run consistently before changes ship.' },
      { icon: 'fa-chart-simple', title: 'Production health', desc: 'Use logs and monitoring to understand live behavior.' },
      { icon: 'fa-rotate', title: 'Repeatable releases', desc: 'Use CD to reduce manual release mistakes.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Deployment pipeline simulator',
    demoHint: 'Watch a change move through automated checks to a live app.',
    demoSteps: [
      { label: 'Push', detail: 'A developer pushes commits to the remote repository.', result: 'Automation has a new change to check.' },
      { label: 'Test', detail: 'CI runs tests, lint, and build steps.', result: 'Bad changes can stop before users see them.' },
      { label: 'Deploy', detail: 'A passing build is published to hosting or servers.', result: 'Users can reach the new version.' },
      { label: 'Observe', detail: 'Logs and monitoring show errors, latency, and traffic.', result: 'The team can detect and debug production issues.' },
    ],
    codeTitle: 'CI Workflow Example',
    codeLanguage: 'YAML',
    codeText: `name: Test and Build

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run build`,
    pros: ['Makes releases more repeatable', 'Catches mistakes before deployment', 'Gives teams visibility after launch'],
    cons: ['Pipelines need maintenance', 'Broken tests can block releases', 'Monitoring must be tuned to avoid noisy alerts'],
    checklist: ['Explain the path from Git push to deploy.', 'Describe what CI checks before release.', 'Explain why logs and monitoring matter after launch.'],
  },
  {
    id: 'docker-containers',
    category: 'Deployment & DevOps',
    title: 'Docker and Containers',
    icon: 'fa-box',
    number: '27',
    subtitle: 'Package an app with everything it needs so it runs the same way on any machine.',
    analogy: 'Docker is like packing a lunchbox for your app. Instead of hoping another kitchen has the same tools and ingredients, you pack the runtime, setup, and app together.',
    realWorldExample: {
      title: 'Web app plus database',
      desc: 'A Node app can run in one container and PostgreSQL in another. New developers do not manually install exact Node and database versions. They run one command and get the same setup as the team.',
    },
    whatIsIt: 'Docker builds images and runs containers. An image is a packaged template. A container is a running copy of that template. Containers help developers, CI systems, and servers run apps with consistent dependencies. When an app needs multiple containers — such as a frontend, API, and database — Docker Compose is the usual next step to run and wire them together.',
    whyUse: 'Docker helps solve "it works on my machine." If every developer, test server, and production server runs the same container image, the app is more likely to behave consistently everywhere. A single container is a great start; Compose becomes important once several services must start together with shared networks, ports, and volumes.',
    conceptSections: [
      { icon: 'fa-file-lines', title: 'Dockerfile', desc: 'A Dockerfile is the recipe for an image.', example: 'Start from node:20, copy files, install packages, run the app.' },
      { icon: 'fa-layer-group', title: 'Image', desc: 'An image is the packaged result of the Dockerfile.', example: 'hello-web:1.0 can be shared and run elsewhere.' },
      { icon: 'fa-play', title: 'Container', desc: 'A container is a live running instance of an image.', example: 'Run the image and expose port 3000.' },
      { icon: 'fa-database', title: 'Volume', desc: 'A volume helps important data survive container restarts.', example: 'Postgres data is stored in a volume.' },
    ],
    conceptFlow: ['Write app code', 'Write Dockerfile', 'Build image', 'Run container', 'Map host port to container port', 'Attach volume if data must persist', 'Use Compose for multiple services'],
    mermaidDiagram: `flowchart TD
  A[App code] --> B[Dockerfile]
  B --> C[Docker builds image]
  C --> D[Container runs]
  D --> E[App listens on container port]
  E --> F[Host port maps traffic]
  D --> G[Volume saves data]
  H[docker-compose.yml] --> D
  H --> I[Database container]`,
    whenToUse: [
      { icon: 'fa-user-plus', title: 'Onboarding developers', desc: 'New teammates can start without manually installing every dependency.' },
      { icon: 'fa-vial', title: 'Testing consistently', desc: 'Tests can run in the same environment on laptops and CI servers.' },
      { icon: 'fa-server', title: 'Deploying apps', desc: 'The same image can move from development to staging to production.' },
      { icon: 'fa-database', title: 'Running local services', desc: 'Databases, queues, and caches can run locally without permanent installs.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Build and run pipeline',
    demoHint: 'Move from Dockerfile to image to container and see where ports and volumes fit.',
    demoSteps: [
      { label: 'Dockerfile', detail: 'The Dockerfile lists setup instructions.', result: 'Docker has a recipe for the image.' },
      { label: 'Image', detail: 'Build turns the recipe into a reusable image.', result: 'The app environment is packaged.' },
      { label: 'Container', detail: 'Run starts a live container from the image.', result: 'The app is running in isolation.' },
      { label: 'Ports + volumes', detail: 'Port mapping exposes the app. Volumes preserve important data.', result: 'The container can be reached and data can survive restarts.' },
    ],
    codeTitle: 'Dockerfile Example',
    codeLanguage: 'Dockerfile',
    codeText: `FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]`,
    pros: ['Makes app environments repeatable', 'Simplifies setup with many dependencies', 'Works well for local development, CI, and deployment'],
    cons: ['Adds new concepts and commands', 'Images can become large', 'Ports, volumes, and networking can confuse beginners'],
    checklist: ['Explain image vs container.', 'Describe why Docker helps with "works on my machine".', 'Explain what a port mapping does.', 'Describe when Docker Compose is the next step after one container.'],
  },
  {
    id: 'encryption-concepts',
    category: 'Security',
    title: 'Encryption, Keys, and Certificates',
    icon: 'fa-key',
    number: '28',
    subtitle: 'Learn the most common encryption methods, what each one protects, and how data changes step by step.',
    analogy: 'Encryption is like using different kinds of locks. AES is a fast lock for lots of data, RSA and ECC help people agree on keys or protect tiny secrets, TLS combines both for HTTPS, hashes make fingerprints, and signatures prove who approved a message.',
    realWorldExample: {
      title: 'Sending a password over HTTPS',
      desc: 'When you log in, HTTPS uses TLS to protect the request in transit. Someone on the same Wi-Fi may see packets moving, but encryption makes the password unreadable. The server can read the password only after the protected connection delivers it.',
    },
    whatIsIt: 'Encryption changes plaintext into ciphertext using a key. The most common real-world pattern is hybrid encryption: public-key cryptography helps agree on or wrap a temporary key, then fast symmetric encryption protects the actual data. Hashing, password hashing, and digital signatures are related tools that often appear beside encryption, but each solves a different problem.',
    whyUse: 'Encryption protects private data in transit and at rest. It is the foundation behind HTTPS, encrypted backups, database encryption, password managers, cloud secrets, secure messaging, signed software downloads, and password storage checks.',
    conceptSections: [
      { icon: 'fa-file-lines', title: 'Plaintext and ciphertext', desc: 'Plaintext is readable data. Ciphertext is the scrambled result that should look useless without the right key.', example: 'Plaintext: meet at 4. Ciphertext: unreadable bytes.' },
      { icon: 'fa-key', title: 'AES symmetric encryption', desc: 'AES-GCM and ChaCha20-Poly1305 use one shared secret key and are popular for files, disks, databases, and HTTPS data after setup.', example: 'A backup file is encrypted and decrypted with the same secret key.' },
      { icon: 'fa-keycdn', title: 'RSA and ECC public-key crypto', desc: 'Public/private key pairs solve key exchange, small secret wrapping, signatures, and identity. ECC is common in modern TLS because keys are smaller and fast.', example: 'ECDHE helps a browser and server agree on a fresh session key.' },
      { icon: 'fa-certificate', title: 'TLS and certificates', desc: 'TLS is the protocol behind HTTPS. Certificates help the browser trust the server public key before creating encrypted traffic.', example: 'https://example.com presents a certificate for example.com.' },
      { icon: 'fa-fingerprint', title: 'Hashes and password hashes', desc: 'SHA-256 makes a one-way fingerprint. bcrypt, scrypt, and Argon2 are deliberately slow password hashing methods.', example: 'Store password hashes, not encrypted passwords.' },
      { icon: 'fa-signature', title: 'Digital signatures', desc: 'Ed25519, ECDSA, RSA-PSS, and HMAC-style message authentication prove a message was not changed and came from someone with the right secret.', example: 'Package managers verify signed releases.' },
    ],
    conceptFlow: ['Start with plaintext', 'Pick the right tool', 'Create or load keys', 'Encrypt, hash, or sign', 'Send or store the result', 'Decrypt or verify later'],
    mermaidDiagram: `flowchart LR
  A[Plaintext] --> B{Goal}
  B --> C[Fast private data: AES or ChaCha20]
  B --> D[Key setup or identity: RSA or ECC]
  B --> E[Fingerprint: SHA-256]
  B --> F[Password check: Argon2, bcrypt, or scrypt]
  B --> G[Proof: digital signature]
  D --> H[TLS hybrid session key]
  H --> C`,
    whenToUse: [
      { icon: 'fa-lock', title: 'Data in transit', desc: 'Use HTTPS/TLS to protect data moving between client and server.' },
      { icon: 'fa-database', title: 'Data at rest', desc: 'Encrypt sensitive stored data, disks, backups, or secrets.' },
      { icon: 'fa-user-secret', title: 'Keys and secrets', desc: 'Use key managers and environment secrets to protect API keys, private keys, signing keys, and tokens.' },
      { icon: 'fa-fingerprint', title: 'Verification', desc: 'Use hashes, password hashes, MACs, and signatures when you need proof rather than secrecy.' },
    ],
    demoType: 'encryption',
    demoScenario: 'tls',
    demoTitle: 'Encryption Method Explorer',
    demoHint: 'Pick a popular method, type a message, and step through what changes at each stage.',
    codeTitle: 'Encryption Shape Example',
    codeLanguage: 'Pseudocode',
    codeText: `// Real apps use trusted libraries and managed keys.
// This is the common high-level shape.
plaintext = "meet at 4"
secretKey = loadSecretKey()

ciphertext = aesGcmEncrypt(plaintext, secretKey, randomNonce())
store(ciphertext)

later = readFromStorage()
original = aesGcmDecrypt(later, secretKey)

// HTTPS/TLS idea:
// certificate proves the server identity,
// public-key key exchange creates a temporary session key,
// symmetric encryption protects the data.`,
    checklist: ['Explain plaintext vs ciphertext.', 'Choose AES/ChaCha20 for bulk encryption and RSA/ECC for key setup or signatures.', 'Explain why TLS uses certificates plus fast symmetric encryption.', 'Describe why password hashing is not the same as encryption.'],
    subPages: [
      {
        id: 'encryption-overview',
        label: 'Overview',
        title: 'Encryption Overview',
        subtitle: 'Pick the security tool based on the job.',
        body: 'Beginners often say encryption when they mean several different tools. Encryption hides data so it can be read later with the right key. Hashing creates a fingerprint that cannot be decrypted. Password hashing is slow hashing for login checks. Signatures prove integrity and identity. TLS combines several of these ideas to protect HTTPS.',
        demoType: 'encryption',
        demoScenario: 'tls',
        conceptSections: [
          { icon: 'fa-lock', title: 'Hide data', desc: 'Use symmetric encryption for private data that must be recovered later.', example: 'AES-GCM for encrypted records or backups.' },
          { icon: 'fa-handshake', title: 'Agree on keys', desc: 'Use public-key methods to set up trust or share a temporary key.', example: 'ECDHE during a TLS handshake.' },
          { icon: 'fa-check-double', title: 'Verify data', desc: 'Use hashes, MACs, signatures, and password hashes when you need proof.', example: 'Verify a release signature before installing.' },
        ],
        checklist: ['Explain the difference between hiding, fingerprinting, and proving.', 'Name one real use of TLS.', 'Say why toy ciphers are for learning only.'],
      },
      {
        id: 'aes-symmetric-encryption',
        label: 'AES / Symmetric',
        title: 'AES and Symmetric Encryption',
        subtitle: 'One shared secret key protects lots of data quickly.',
        body: 'Symmetric encryption uses the same secret key to encrypt and decrypt. AES-GCM and ChaCha20-Poly1305 are popular authenticated encryption choices: they protect confidentiality and detect tampering. Real encryption also needs a fresh nonce or IV for each message.',
        demoType: 'encryption',
        demoScenario: 'symmetric',
        conceptSections: [
          { icon: 'fa-key', title: 'Secret key', desc: 'Both sides need the same secret key.', example: 'A server loads a data-encryption key from a key manager.' },
          { icon: 'fa-dice', title: 'Nonce or IV', desc: 'A unique value keeps repeated messages from producing repeated ciphertext.', example: 'AES-GCM requires a fresh nonce for each encryption.' },
          { icon: 'fa-shield-halved', title: 'Auth tag', desc: 'Authenticated encryption detects if ciphertext was changed.', example: 'Wrong tag means reject instead of decrypting garbage.' },
        ],
        codeTitle: 'AES-GCM Shape',
        codeLanguage: 'Pseudocode',
        codeText: `key = keyManager.load("customer-data-key")
nonce = randomBytes(12)
ciphertext, tag = AES_GCM.encrypt(key, nonce, plaintext)

plaintext = AES_GCM.decrypt(key, nonce, ciphertext, tag)`,
        checklist: ['Explain why the key is secret.', 'Explain why a nonce must not repeat with the same key.', 'Name AES-GCM as a common modern choice.'],
      },
      {
        id: 'rsa-ecc-asymmetric',
        label: 'RSA / ECC',
        title: 'RSA, ECC, and Public-Key Cryptography',
        subtitle: 'A public key can be shared; the private key stays secret.',
        body: 'Public-key cryptography uses a key pair. RSA is older and still common. ECC uses elliptic curves and is popular in modern TLS and signatures because it can provide strong security with smaller keys. Public-key operations are slower than AES, so they usually protect small values or help create a symmetric session key.',
        demoType: 'encryption',
        demoScenario: 'asymmetric',
        conceptSections: [
          { icon: 'fa-share-nodes', title: 'Public key', desc: 'Safe to share. Others can use it to encrypt to you or verify your signature.', example: 'A server certificate contains a public key.' },
          { icon: 'fa-user-secret', title: 'Private key', desc: 'Must stay secret. It decrypts or signs depending on the algorithm.', example: 'A server stores its private key outside the browser.' },
          { icon: 'fa-bolt', title: 'Used sparingly', desc: 'Public-key crypto is powerful but slower, so apps combine it with symmetric encryption.', example: 'TLS creates an AES session key for the rest of the connection.' },
        ],
        codeTitle: 'Public-Key Shape',
        codeLanguage: 'Pseudocode',
        codeText: `// Small secret wrapping idea
wrappedKey = RSA_OAEP.encrypt(recipientPublicKey, randomSessionKey)
sessionKey = RSA_OAEP.decrypt(recipientPrivateKey, wrappedKey)

// Modern TLS often uses ECDHE to agree on a fresh session key.`,
        checklist: ['Explain public key vs private key.', 'Say why RSA/ECC usually do not encrypt large files directly.', 'Connect ECC to modern TLS key exchange.'],
      },
      {
        id: 'tls-certificates',
        label: 'TLS / HTTPS',
        title: 'TLS, HTTPS, and Certificates',
        subtitle: 'HTTPS uses certificates, public-key setup, and fast symmetric encryption together.',
        body: 'TLS is the protocol behind HTTPS. The browser checks the server certificate, uses public-key cryptography to establish a fresh shared session key, then sends normal HTTP data through fast symmetric encryption. This is why HTTPS can be both trusted and fast.',
        demoType: 'encryption',
        demoScenario: 'tls',
        conceptSections: [
          { icon: 'fa-certificate', title: 'Certificate check', desc: 'The browser checks the certificate domain, expiration, and issuer chain.', example: 'Certificate says the public key belongs to example.com.' },
          { icon: 'fa-handshake', title: 'Key exchange', desc: 'Browser and server create a temporary shared session key.', example: 'ECDHE gives forward secrecy.' },
          { icon: 'fa-lock', title: 'Encrypted HTTP', desc: 'After setup, requests and responses use fast symmetric encryption.', example: 'POST /login body is encrypted on the wire.' },
        ],
        codeTitle: 'TLS Mental Model',
        codeLanguage: 'Pseudocode',
        codeText: `browser checks server certificate
browser and server run ECDHE key exchange
sessionKey = derived shared secret
send AES-GCM encrypted HTTP requests and responses`,
        checklist: ['Explain why certificates matter.', 'Describe TLS as a hybrid system.', 'Say what HTTPS protects in transit.'],
      },
      {
        id: 'hashing-passwords',
        label: 'Hashes / Passwords',
        title: 'Hashes and Password Hashing',
        subtitle: 'Hashes verify data. Password hashes slow down guessing.',
        body: 'SHA-256 and SHA-3 produce fixed-size fingerprints. You cannot decrypt a hash back to the original. Passwords need special slow, salted hashing algorithms such as Argon2, bcrypt, or scrypt because attackers can guess common passwords very quickly if hashes are cheap to compute.',
        demoType: 'encryption',
        demoScenario: 'password',
        conceptSections: [
          { icon: 'fa-fingerprint', title: 'Normal hash', desc: 'Fast one-way fingerprint for files and messages.', example: 'Download page publishes a SHA-256 checksum.' },
          { icon: 'fa-salt-shaker', title: 'Salt', desc: 'Random data added so identical passwords do not have identical stored hashes.', example: 'Two users with password123 get different hashes.' },
          { icon: 'fa-hourglass-half', title: 'Slow work factor', desc: 'Password hashing intentionally costs time and memory.', example: 'Argon2id, bcrypt, and scrypt slow brute-force guessing.' },
        ],
        codeTitle: 'Password Hash Shape',
        codeLanguage: 'Pseudocode',
        codeText: `// At signup
salt = randomBytes(16)
storedHash = Argon2id.hash(password, salt, workFactor)

// At login
ok = Argon2id.verify(attemptedPassword, storedHash)`,
        checklist: ['Explain why hashes cannot be decrypted.', 'Say why password hashing needs salt.', 'Name Argon2, bcrypt, or scrypt as password hashing methods.'],
      },
      {
        id: 'digital-signatures',
        label: 'Signatures',
        title: 'Digital Signatures and Integrity',
        subtitle: 'Signatures prove who approved data and whether it changed.',
        body: 'Digital signatures use a private key to sign and a public key to verify. They do not hide the message. Instead, they tell the receiver that the message was approved by someone with the private key and has not changed since signing.',
        demoType: 'encryption',
        demoScenario: 'signature',
        conceptSections: [
          { icon: 'fa-file-signature', title: 'Sign with private key', desc: 'The owner creates a signature over the message or its hash.', example: 'A release maintainer signs a package.' },
          { icon: 'fa-eye', title: 'Verify with public key', desc: 'Anyone with the public key can check the signature.', example: 'Installer verifies the package before running it.' },
          { icon: 'fa-ban', title: 'Not secrecy', desc: 'Signing does not hide the message. Pair it with encryption when privacy is needed.', example: 'A public changelog can still be signed.' },
        ],
        codeTitle: 'Signature Shape',
        codeLanguage: 'Pseudocode',
        codeText: `signature = Ed25519.sign(privateKey, message)

if Ed25519.verify(publicKey, message, signature):
  trust that message was not changed
else:
  reject`,
        checklist: ['Explain signing vs encrypting.', 'Say which key signs and which key verifies.', 'Name one place signatures are useful.'],
      },
    ],
  },
);
