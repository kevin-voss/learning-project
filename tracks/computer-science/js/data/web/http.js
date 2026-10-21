window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

// HTTP. Sub-lessons 1-5 are the basics (method, URL, status, headers, body).
// "Deeper: ..." sub-lessons come after them. Sub-lesson ids are used in deep links: keep them.
DS.curriculum.push({
  id: 'http-requests-responses',
  category: 'How the Web Works',
  title: 'HTTP Requests and Responses',
  icon: 'fa-arrows-left-right',
  subtitle: 'The order slip the browser sends, and the answer that comes back.',
  demoType: 'http',
  demoTitle: 'HTTP request inspector',
  demoHint: 'Pick a method. Switch headers and body on and off. Read the request and the response.',
  keywords: ['http', 'request', 'response', 'method', 'status code', 'headers', 'body'],
  relatedIds: ['client-server', 'networks-ips-requests', 'authentication-sessions'],
  subPages: [
    {
      id: 'request-anatomy',
      label: 'The picture',
      title: 'An order slip and a receipt',
      analogy: 'At the restaurant, the waiter writes your order on a slip. The slip says what you want (the method), which dish (the URL), some notes like "no onions" (the headers) and maybe a long wish list (the body). The kitchen sends back a receipt with a short result like "OK" or "sold out" (the status) plus the food.',
      whatIsIt: 'HTTP is the language browsers and servers use. The browser sends a request: a method, a URL, headers and sometimes a body. The server sends a response: a status code, headers and usually a body. Every page and every app button uses this.',
      codeTitle: 'One request, one response',
      codeLanguage: 'HTTP',
      codeText: `GET /api/profile HTTP/1.1          <- method and URL
Host: example.com                  <- header
Accept: application/json           <- header

HTTP/1.1 200 OK                    <- status
Content-Type: application/json     <- header

{"name": "Maya"}                   <- body`,
      tryIt: {
        steps: [
          'Open any website and press F12.',
          'Click the Network tab and reload the page (F5).',
          'Click the first row in the list.',
        ],
        result: 'The Request Method, the Request URL and a Status Code like 200.',
      },
      checklist: [
        'You can name the parts of a request: method, URL, headers, body.',
        'You can name the parts of a response: status, headers, body.',
        'You can find a request in the Network tab of your browser.',
      ],
      check: [
        { q: 'Which part of the request says what you want to do?', a: 'The method, for example GET or POST.' },
        { q: 'Which part of the response tells you if it worked?', a: 'The status code, for example 200 OK or 404 Not Found.' },
      ],
    },
    {
      id: 'http-methods',
      label: 'Methods',
      title: 'Methods: what do you want to do?',
      whatIsIt: 'The method is the verb of the request. GET reads something. POST creates something new. PUT replaces something. PATCH changes a part of something. DELETE removes something.',
      conceptSections: [
        { icon: 'fa-download', title: 'GET', desc: 'Read. Changes nothing.', example: 'GET /api/profile' },
        { icon: 'fa-plus', title: 'POST', desc: 'Create something new.', example: 'POST /api/tasks' },
        { icon: 'fa-arrows-rotate', title: 'PUT', desc: 'Replace the whole thing.', example: 'PUT /api/profile/42' },
        { icon: 'fa-pen', title: 'PATCH', desc: 'Change some fields.', example: 'PATCH /api/profile' },
        { icon: 'fa-trash', title: 'DELETE', desc: 'Remove it.', example: 'DELETE /api/tasks/42' },
      ],
      check: [
        { q: 'You add a new task to a to-do app. Which method fits?', a: 'POST. It creates something new.' },
        { q: 'Which method only reads and never changes data?', a: 'GET.' },
      ],
    },
    {
      id: 'status-codes',
      label: 'Status codes',
      title: 'Status codes: did it work?',
      whatIsIt: 'The status code is a three-digit answer. The first digit tells the family. 2xx: it worked. 3xx: look somewhere else. 4xx: the client made a mistake. 5xx: the server broke.',
      conceptSections: [
        { icon: 'fa-circle-check', title: '2xx success', desc: 'It worked.', example: '200 OK, 201 Created' },
        { icon: 'fa-share', title: '3xx redirect', desc: 'Go to another address.', example: '301 Moved Permanently' },
        { icon: 'fa-user-xmark', title: '4xx client error', desc: 'Your request was wrong.', example: '400 Bad Request, 401 Unauthorized, 404 Not Found' },
        { icon: 'fa-server', title: '5xx server error', desc: 'The server failed.', example: '500 Internal Server Error' },
      ],
      check: [
        { q: 'You type a wrong page address. Which status do you get?', a: '404 Not Found, a 4xx client error.' },
        { q: 'Whose fault is a 500?', a: 'The server\'s.' },
      ],
    },
    {
      id: 'headers',
      label: 'Headers',
      title: 'Headers: notes on the slip',
      whatIsIt: 'Headers are short notes in the form Name: value. They say things like which server you mean, which format you want back and who you are. You can ignore most of them at first.',
      conceptSections: [
        { icon: 'fa-server', title: 'Host', desc: 'Which server the request is for.', example: 'Host: example.com' },
        { icon: 'fa-file-code', title: 'Accept', desc: 'Which format you want back.', example: 'Accept: application/json' },
        { icon: 'fa-file-lines', title: 'Content-Type', desc: 'Which format the body has.', example: 'Content-Type: application/json' },
        { icon: 'fa-key', title: 'Authorization', desc: 'Proof of who you are.', example: 'Authorization: Bearer abc...' },
      ],
      check: [
        { q: 'Which header tells the server what format the body has?', a: 'Content-Type.' },
      ],
    },
    {
      id: 'body-content-type',
      label: 'Body',
      title: 'Body: the actual content',
      whatIsIt: 'The body is the content itself. A GET request usually has no body. A POST often sends data in the body, most of the time as JSON. The response body is the page or the data you asked for. Content-Type says how to read it.',
      codeTitle: 'A POST with a JSON body',
      codeLanguage: 'HTTP',
      codeText: `POST /api/tasks HTTP/1.1
Host: example.com
Content-Type: application/json

{"title": "Read the HTTP lesson"}`,
      check: [
        { q: 'Does a GET request usually have a body?', a: 'No. It only asks for something.' },
        { q: 'What format do most APIs use for the body?', a: 'JSON, with Content-Type: application/json.' },
      ],
    },
    {
      id: 'cookies-storage',
      label: 'Deeper: cookies',
      title: 'Deeper: cookies and browser storage',
      demoType: null,
      body: 'A cookie is a small note the server asks the browser to keep (Set-Cookie). The browser sends it back on every matching request (Cookie). That is how a site remembers that you are logged in. localStorage also stays in the browser, but it is never sent automatically.',
      conceptSections: [
        { icon: 'fa-cookie', title: 'Set-Cookie', desc: 'Response header that stores a cookie.', example: 'Set-Cookie: session=abc123' },
        { icon: 'fa-paper-plane', title: 'Cookie', desc: 'Request header that sends it back.', example: 'Cookie: session=abc123' },
        { icon: 'fa-lock', title: 'HttpOnly', desc: 'JavaScript cannot read this cookie.', example: 'Protects session ids.' },
        { icon: 'fa-database', title: 'localStorage', desc: 'Stays in the browser, not sent.', example: 'Settings like dark mode.' },
      ],
      codeHttp: `HTTP/1.1 200 OK
Set-Cookie: session=abc123; HttpOnly; Secure; Path=/

{"ok":true}`,
      codeFetch: `await fetch('/api/login', {
  method: 'POST',
  credentials: 'include',   // send and store cookies
  body: JSON.stringify({ email, password }),
});`,
      checklist: ['Describe when a cookie is sent and when localStorage is used.'],
    },
    {
      id: 'redirects',
      label: 'Deeper: redirects',
      title: 'Deeper: redirects',
      demoType: null,
      body: 'A 3xx response with a Location header says "ask over there instead". The browser follows it on its own. 301 means moved for good. 302 means only for now.',
      codeHttp: `HTTP/1.1 302 Found
Location: https://example.com/dashboard`,
      codeFetch: `const response = await fetch('/old-dashboard');
console.log(response.url);   // the final address after the redirect`,
      checklist: ['Explain 301 vs 302.'],
    },
    {
      id: 'caching-headers',
      label: 'Deeper: caching',
      title: 'Deeper: caching headers',
      demoType: null,
      body: 'A cache keeps a copy of a response, so the next request is faster. Cache-Control tells browsers how long they may reuse a copy. no-store means never keep a copy. ETag is a version label: the browser can ask "do you still have version v42?" and get a short 304 Not Modified answer. Using a stored copy is a cache hit. Fetching a fresh one is a cache miss. Browsers, CDNs and servers (for example with Redis) can all keep caches.',
      conceptSections: [
        { icon: 'fa-hourglass', title: 'max-age', desc: 'Reuse the copy for this many seconds.', example: 'Cache-Control: max-age=3600' },
        { icon: 'fa-ban', title: 'no-store', desc: 'Never keep a copy.', example: 'For private data.' },
        { icon: 'fa-fingerprint', title: 'ETag', desc: 'Version label for a response.', example: 'If-None-Match: "v42"' },
      ],
      codeHttp: `HTTP/1.1 200 OK
Cache-Control: public, max-age=3600
ETag: "v42"`,
      codeFetch: `const response = await fetch('/api/lessons');
console.log(response.headers.get('cache-control'));`,
      checklist: ['Explain what max-age and no-store do.'],
    },
    {
      id: 'cors-preflight',
      label: 'Deeper: CORS',
      title: 'Deeper: CORS and preflight',
      demoType: null,
      body: 'An origin is protocol + domain + port, like https://app.example.com. The browser protects you: JavaScript from one origin may not read answers from another origin, unless that server allows it with Access-Control-Allow-Origin. For some requests, the browser first sends a quick OPTIONS request to ask. That check is called a preflight.',
      conceptSections: [
        { icon: 'fa-globe', title: 'Origin', desc: 'Where the page came from.', example: 'Origin: https://app.example.com' },
        { icon: 'fa-check', title: 'Allow-Origin', desc: 'The server lists who may read.', example: 'Access-Control-Allow-Origin: https://app.example.com' },
        { icon: 'fa-plane-departure', title: 'Preflight', desc: 'An OPTIONS check before the real request.', example: 'PATCH with JSON often triggers it.' },
      ],
      codeHttp: `OPTIONS /api/profile HTTP/1.1
Origin: https://app.example.com
Access-Control-Request-Method: PATCH`,
      codeFetch: `await fetch('https://api.example.com/profile', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Maya' }),
});`,
      checklist: ['Explain what a CORS error in the console means.'],
    },
    {
      id: 'idempotency',
      label: 'Deeper: idempotency',
      title: 'Deeper: idempotency (safe to repeat?)',
      demoType: null,
      body: 'Idempotent means: sending the same request twice has the same effect as sending it once. GET, PUT and DELETE are idempotent. POST usually is not: two clicks can create two orders. That matters when a network error makes the client try again.',
      conceptSections: [
        { icon: 'fa-download', title: 'GET', desc: 'Safe to repeat.', example: 'GET /api/profile' },
        { icon: 'fa-arrows-rotate', title: 'PUT', desc: 'Same body, same result.', example: 'PUT /api/profile/42' },
        { icon: 'fa-trash', title: 'DELETE', desc: 'Gone is gone. Later calls may return 404.', example: 'DELETE /api/tasks/42' },
        { icon: 'fa-plus', title: 'POST', desc: 'Repeating can create duplicates.', example: 'POST /api/orders' },
      ],
      checklist: ['Say why a double-click on "Buy" (POST) can be a problem.'],
    },
  ],
});
