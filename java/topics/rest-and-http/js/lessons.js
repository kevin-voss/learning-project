Java.topics.restAndHttp = Java.topics.restAndHttp || {};

const httpGlossary = [
  { term: 'REST', definition: 'An architectural style that models server data as resources and uses standard HTTP behavior.' },
  { term: 'resource', definition: 'A thing the API exposes, such as a user, order, invoice, or search result.' },
  { term: 'endpoint', definition: 'A URL path where a client can access a resource or collection.' },
  { term: 'idempotent', definition: 'Safe to repeat: one request or many identical requests have the same intended server effect.' },
  { term: 'safe', definition: 'A safe method is intended for reading only, not changing server state.' },
  { term: 'request body', definition: 'Data sent after the headers, often JSON, used by POST, PUT, PATCH, and QUERY.' },
  { term: 'status code', definition: 'A three-digit response number that tells the client what happened.' },
  { term: 'QUERY', definition: 'HTTP method from RFC 10008 for safe, idempotent requests with request content.' }
];

Java.topics.restAndHttp.lessons = [
  {
    id: 'rest-resources',
    num: '01',
    title: 'REST Resources',
    category: 'foundations',
    icon: '/api',
    tagline: 'Model things, not actions',
    definition: 'REST APIs expose a resource through an endpoint, then use HTTP methods to say what should happen to that resource.',
    realWorld: 'A library catalog has books, members, and loans. Those are resources. The desk clerk does different actions depending on whether you ask to read, create, update, or delete a record.',
    syntax: 'Use plural nouns for collections: /api/books, /api/books/42, /api/books/42/reviews. Let the HTTP method carry the action instead of naming endpoints /getBook or /deleteBook.',
    exampleLabel: 'HTTP Example',
    codeLanguage: 'http',
    fileName: 'resources.http',
    code: `GET /api/books HTTP/1.1
Host: example.com
Accept: application/json

GET /api/books/42 HTTP/1.1
Host: example.com
Accept: application/json`,
    keyPoints: [
      'A resource is the thing your API exposes.',
      'An endpoint is the URL where that thing can be reached.',
      'REST works best when URLs are stable nouns.',
      'Methods like GET and POST express intent.'
    ],
    commonMistakes: [
      'Putting verbs everywhere, such as /createBook or /deleteBook.',
      'Changing endpoint names when only behavior changes.',
      'Treating REST as just any JSON-over-HTTP API.'
    ],
    pros: [
      'Predictable URLs are easy for beginners and tools to understand.',
      'Resource-focused APIs map naturally to database-backed apps.',
      'Standard HTTP behavior can be reused by clients, caches, and gateways.'
    ],
    cons: [
      'Not every workflow maps cleanly to a simple resource.',
      'Poor resource names can make an API feel awkward.',
      'REST still requires careful consistency; HTTP alone does not design the API for you.'
    ],
    related: ['GET', 'Status Codes'],
    glossary: httpGlossary
  },
  {
    id: 'get',
    num: '02',
    title: 'GET',
    category: 'methods',
    icon: 'GET',
    tagline: 'Read without changing state',
    definition: 'GET asks the server to return a representation of a resource. GET is safe and idempotent.',
    realWorld: 'It is like reading a menu. Looking at it should not place an order or change the kitchen inventory.',
    syntax: 'GET /resource or GET /resource?filter=value. Put simple filters in the query string, and do not send private or huge data in the URL.',
    exampleLabel: 'HTTP Example',
    codeLanguage: 'http',
    fileName: 'get.http',
    code: `GET /api/orders?status=open&limit=20 HTTP/1.1
Host: example.com
Accept: application/json`,
    keyPoints: [
      'GET is for reading.',
      'GET requests are safe and idempotent.',
      'Query strings are visible in logs and browser history.',
      'GET responses can often be cached.'
    ],
    commonMistakes: [
      'Using GET to delete or update data.',
      'Putting secrets in query parameters.',
      'Forcing very complex search JSON into a long URL.'
    ],
    pros: [
      'Simple, widely supported, cache-friendly.',
      'Easy to test in a browser.',
      'Great for simple filtering and lookups.'
    ],
    cons: [
      'URL length and privacy become problems for complex queries.',
      'Request bodies on GET are not reliably interoperable.',
      'Easy to misuse for actions that should change server state.'
    ],
    related: ['QUERY', 'Status Codes'],
    glossary: httpGlossary
  },
  {
    id: 'post',
    num: '03',
    title: 'POST',
    category: 'methods',
    icon: 'POST',
    tagline: 'Create or submit processing',
    definition: 'POST sends a request body for the server to process, commonly to create a new resource or trigger a command.',
    realWorld: 'It is like handing in a form at an office. The office processes it and may create a new record.',
    syntax: 'POST /collection with a JSON request body. Return 201 Created when a new resource is created, often with a Location header.',
    exampleLabel: 'HTTP Example',
    codeLanguage: 'http',
    fileName: 'post.http',
    code: `POST /api/orders HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "customerId": 7,
  "items": [
    { "sku": "BOOK-21", "quantity": 1 }
  ]
}`,
    keyPoints: [
      'POST is not automatically idempotent.',
      'POST is common for create operations.',
      'POST can also model commands such as /payments/123/capture.',
      'The request body usually contains JSON in modern APIs.'
    ],
    commonMistakes: [
      'Using POST for every operation because it accepts a body.',
      'Returning 200 OK for created resources when 201 Created would be clearer.',
      'Retrying POST blindly after a timeout without idempotency protection.'
    ],
    pros: [
      'Flexible and universally supported.',
      'Good for creation and command-style workflows.',
      'Can carry complex request bodies.'
    ],
    cons: [
      'Less cache-friendly than GET.',
      'Retries can accidentally create duplicates.',
      'Too much POST makes API intent vague.'
    ],
    related: ['PUT and PATCH', 'Status Codes'],
    glossary: httpGlossary
  },
  {
    id: 'put-patch-delete',
    num: '04',
    title: 'PUT, PATCH, DELETE',
    category: 'methods',
    icon: 'Δ',
    tagline: 'Replace, partially update, or remove',
    definition: 'PUT replaces a resource, PATCH partially updates it, and DELETE removes it. PUT and DELETE are idempotent by intent.',
    realWorld: 'PUT replaces the whole contact card. PATCH changes just the phone number. DELETE removes the card from the address book.',
    syntax: 'PUT /resource/id for full replacement. PATCH /resource/id for specific changes. DELETE /resource/id for removal.',
    exampleLabel: 'HTTP Example',
    codeLanguage: 'http',
    fileName: 'update-delete.http',
    code: `PATCH /api/users/42 HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "displayName": "Mina Voss"
}

DELETE /api/users/42 HTTP/1.1
Host: example.com`,
    keyPoints: [
      'PUT usually means replace the full resource.',
      'PATCH means partial change.',
      'DELETE removes a resource or marks it deleted.',
      'Idempotent methods are easier to retry safely.'
    ],
    commonMistakes: [
      'Using PUT for partial updates without documenting it.',
      'Expecting DELETE to always physically remove database rows.',
      'Returning unclear status codes after update or delete.'
    ],
    pros: [
      'Clearer intent than using POST for every change.',
      'PUT and DELETE fit retry-friendly workflows.',
      'PATCH avoids sending a whole resource for small edits.'
    ],
    cons: [
      'PATCH formats must be documented carefully.',
      'DELETE semantics can be tricky with audit logs and soft deletes.',
      'Some clients or gateways need configuration for less common methods.'
    ],
    related: ['POST', 'Idempotency'],
    glossary: httpGlossary
  },
  {
    id: 'query',
    num: '05',
    title: 'QUERY',
    category: 'methods',
    icon: 'QUERY',
    tagline: 'Safe search with a body',
    definition: 'QUERY is an HTTP method defined by RFC 10008. It lets a client send request content for safe, idempotent processing and receive the result.',
    realWorld: 'It is like submitting a detailed search worksheet to a librarian. The librarian reads the worksheet and returns matching books, but does not change the library records.',
    syntax: 'QUERY /resource/search with a request body. Use it for complex read-only searches where GET query parameters become too large or awkward.',
    exampleLabel: 'HTTP QUERY Example',
    codeLanguage: 'http',
    fileName: 'query.http',
    code: `QUERY /api/orders/search HTTP/1.1
Host: example.com
Content-Type: application/json
Accept: application/json

{
  "status": ["open", "delayed"],
  "createdAfter": "2026-01-01",
  "totalGreaterThan": 100,
  "sort": ["-createdAt"]
}`,
    keyPoints: [
      'QUERY is safe and idempotent like a read operation.',
      'QUERY can carry request content, unlike interoperable GET patterns.',
      'QUERY is useful for complex searches and filters.',
      'Because it is newer, support across frameworks and gateways must be checked.'
    ],
    commonMistakes: [
      'Using QUERY to change data.',
      'Assuming every deployed HTTP stack already supports QUERY.',
      'Replacing simple GET filters with QUERY when a URL would be clearer.'
    ],
    pros: [
      'Handles complex read-only queries without huge URLs.',
      'Communicates safer retry behavior better than POST-for-search.',
      'Keeps search criteria in structured request content.'
    ],
    cons: [
      'Newer method, so infrastructure support may lag.',
      'Browser form support and tooling are less familiar than GET and POST.',
      'Teams must document caching and compatibility behavior explicitly.'
    ],
    related: ['GET', 'Idempotency'],
    glossary: httpGlossary
  },
  {
    id: 'idempotency',
    num: '06',
    title: 'Idempotency',
    category: 'design',
    icon: '↻',
    tagline: 'Repeat without multiplying effects',
    definition: 'An idempotent request can be repeated with the same intended server effect as making it once.',
    realWorld: 'Pressing an elevator button five times still requests the same floor. It should not schedule five separate elevators.',
    syntax: 'GET, PUT, DELETE, and QUERY are idempotent by intent. POST is not automatically idempotent unless the API adds a key or rule.',
    exampleLabel: 'HTTP Example',
    codeLanguage: 'http',
    fileName: 'idempotency.http',
    code: `PUT /api/users/42/email HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "email": "mina@example.com"
}`,
    keyPoints: [
      'Idempotency matters for retries after network failures.',
      'PUT replacement is naturally repeatable.',
      'POST creation may need an Idempotency-Key header.',
      'Idempotent does not mean the response must be byte-for-byte identical.'
    ],
    commonMistakes: [
      'Thinking idempotent means no data changes ever happen.',
      'Retrying non-idempotent POST requests without a plan.',
      'Ignoring payment and order creation duplicate risks.'
    ],
    pros: [
      'Safer retries and more resilient clients.',
      'Clearer distributed-system behavior.',
      'Helpful for queues, gateways, and mobile networks.'
    ],
    cons: [
      'Requires careful API and database design.',
      'Idempotency keys add storage and expiry decisions.',
      'Mislabeling a method as idempotent can create subtle bugs.'
    ],
    related: ['QUERY', 'POST'],
    glossary: httpGlossary
  },
  {
    id: 'status-codes',
    num: '07',
    title: 'Status Codes',
    category: 'design',
    icon: '200',
    tagline: 'Tell the client what happened',
    definition: 'A status code is the server’s compact answer about the result of a request.',
    realWorld: 'It is like a delivery slip: delivered, created, missing address, forbidden, or warehouse error.',
    why: 'Clients, logs, gateways, monitors, and humans can react quickly when the status code matches what actually happened.',
    howThink: 'Read the first digit first: 2xx worked, 4xx means the client needs to change something or authenticate, 5xx means the server failed.',
    whenUse: 'Use status codes every time a Java API controller returns a response, especially for validation, login, permissions, missing resources, conflicts, and server failures.',
    syntax: 'Use 200 OK for successful reads, 201 Created for creation, 204 No Content for success with no body, 400 for malformed input, 401 when login is missing or invalid, 403 when login is valid but not allowed, 404 not found, 409 conflict, 422 semantic validation failure, 429 rate limit, 500 server bug, and 503 temporary service outage.',
    statusCodes: [
      { code: 200, name: 'OK', happened: 'The request worked and the response body contains the result.', example: 'GET /api/books/42 -> 200 with book JSON' },
      { code: 201, name: 'Created', happened: 'The server created a new resource.', example: 'POST /api/orders -> 201 with Location: /api/orders/991' },
      { code: 204, name: 'No Content', happened: 'The request worked, but there is no response body to send back.', example: 'DELETE /api/sessions/current -> 204' },
      { code: 400, name: 'Bad Request', happened: 'The request was malformed or missing basic required data.', example: 'POST /api/users with invalid JSON -> 400' },
      { code: 401, name: 'Unauthorized', happened: 'The client is not authenticated; the server does not know who is calling.', example: 'GET /api/me without a token -> 401' },
      { code: 403, name: 'Forbidden', happened: 'The client is authenticated, but this user is not allowed to do that action.', example: 'DELETE /api/users/7 as a normal user -> 403' },
      { code: 404, name: 'Not Found', happened: 'The requested resource or route was not found.', example: 'GET /api/books/999999 -> 404' },
      { code: 409, name: 'Conflict', happened: 'The request conflicts with current server state.', example: 'POST /api/users with an email already taken -> 409' },
      { code: 422, name: 'Unprocessable Content', happened: 'The JSON was readable, but the values fail business validation.', example: 'POST /api/orders with quantity -3 -> 422' },
      { code: 429, name: 'Too Many Requests', happened: 'The client sent too many requests in a time window.', example: 'POST /api/login too often -> 429' },
      { code: 500, name: 'Internal Server Error', happened: 'A server bug or unexpected failure stopped a valid-looking request.', example: 'GET /api/reports when code throws unexpectedly -> 500' },
      { code: 503, name: 'Service Unavailable', happened: 'The service is temporarily unavailable, overloaded, or down for maintenance.', example: 'GET /api/search while search service is restarting -> 503' }
    ],
    exampleLabel: 'HTTP Example',
    codeLanguage: 'http',
    fileName: 'status-codes.http',
    code: `HTTP/1.1 201 Created
Location: /api/orders/991
Content-Type: application/json

{
  "id": 991,
  "status": "open"
}`,
    keyPoints: [
      '2xx means success.',
      '4xx means the client request needs correction or permission.',
      '5xx means the server failed to complete a valid-looking request.',
      'Status codes and response bodies should agree.',
      '401 means “please authenticate”; 403 means “you are authenticated, but not allowed.”'
    ],
    commonMistakes: [
      'Returning 200 OK for every response, including errors.',
      'Using 500 for validation problems.',
      'Hiding useful error details from the client.',
      'Mixing up 401 and 403: missing login is 401, insufficient permission is 403.'
    ],
    pros: [
      'Standard status codes make APIs easier to debug.',
      'Clients can branch behavior without parsing custom text first.',
      'Monitoring tools understand status classes.'
    ],
    cons: [
      'Status codes alone are not enough; error bodies still matter.',
      'Teams sometimes disagree on close choices like 400 vs 422.',
      'Incorrect codes are worse than simple but consistent codes.'
    ],
    related: ['REST Resources', 'POST'],
    glossary: httpGlossary
  },
  {
    id: 'request-response-shape',
    num: '08',
    title: 'Request and Response Shape',
    category: 'design',
    icon: '{}',
    tagline: 'Make payloads predictable',
    definition: 'The request and response shape is the JSON structure clients send and receive for an endpoint.',
    realWorld: 'It is like a form template. Everyone can move faster when fields have stable names and expected formats.',
    syntax: 'Use consistent field names, predictable arrays, explicit error objects, and version carefully when changing payloads.',
    exampleLabel: 'JSON Example',
    codeLanguage: 'json',
    fileName: 'response.json',
    code: `{
  "data": {
    "id": 42,
    "type": "book",
    "title": "Learning Java"
  },
  "meta": {
    "requestId": "req_123"
  }
}`,
    keyPoints: [
      'Stable JSON shapes reduce client bugs.',
      'Use clear names instead of clever abbreviations.',
      'Document required, optional, and nullable fields.',
      'Error responses should be as predictable as success responses.'
    ],
    commonMistakes: [
      'Changing field types without warning.',
      'Returning totally different shapes for similar endpoints.',
      'Mixing transport status with business status unclearly.'
    ],
    pros: [
      'Predictable payloads are easy to test and validate.',
      'Clear schemas help frontend and backend teams work independently.',
      'Consistent errors make support and debugging easier.'
    ],
    cons: [
      'Overly rigid schemas slow down early experimentation.',
      'Versioning can add maintenance cost.',
      'Nested payloads can become hard to scan if they grow unchecked.'
    ],
    related: ['Status Codes', 'REST Resources'],
    glossary: httpGlossary
  }
];
