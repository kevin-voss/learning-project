Java.topics.restAndHttp = Java.topics.restAndHttp || {};

const httpGlossary = [
  { term: 'REST', definition: 'An architectural style that models server data as resources and uses standard HTTP behavior.' },
  { term: 'resource', definition: 'A thing the API exposes, such as a user, order, invoice, or search result.' },
  { term: 'endpoint', definition: 'A URL path where a client can access a resource or collection.' },
  { term: 'idempotent', definition: 'Safe to repeat: one request or many identical requests have the same intended server effect.' },
  { term: 'safe', definition: 'A safe method is intended for reading only, not changing server state.' },
  { term: 'request body', definition: 'Data sent after the headers, often JSON, used by POST, PUT and PATCH.' },
  { term: 'status code', definition: 'A three-digit response number that tells the client what happened.' }
];

Java.topics.restAndHttp.lessons = [
  {
    id: 'rest-resources',
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
    related: ['POST', 'Status Codes'],
    glossary: httpGlossary
  },
  {
    id: 'post',
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
    id: 'idempotency',
    title: 'Idempotency',
    category: 'design',
    icon: '↻',
    tagline: 'Safe to press twice',
    realWorld: 'Pressing the lift button five times still calls one lift to your floor.',
    definition: 'A request is idempotent when sending it twice has the same effect as sending it once. GET, PUT and DELETE are. POST is not: two POSTs can make two orders. The full idea lives in the [HTTP lesson](../../../computer-science/index.html#http-requests-responses).',
    keyPoints: ['Retry GET, PUT and DELETE without fear.', 'Be careful when you retry a POST.'],
    commonMistakes: ['Retrying a payment POST and charging twice.'],
    related: ['POST', 'PUT, PATCH, DELETE'],
    glossary: httpGlossary
  },
  {
    id: 'status-codes',
    title: 'Status Codes',
    category: 'design',
    icon: '200',
    tagline: 'The first digit tells the story',
    realWorld: 'A parcel slip: delivered, wrong address, or the depot is on fire.',
    definition: 'Every response starts with a three-digit status code. Read the first digit: 2 means it worked, 4 means the client asked wrongly, 5 means the server broke. All codes are explained in the [HTTP lesson](../../../computer-science/index.html#http-requests-responses).',
    table: {
      label: 'The three you meet first',
      head: ['Code', 'Means', 'Java API example'],
      rows: [
        ['`200` / `201`', 'OK / Created', 'GET a book, POST a new order'],
        ['`400` / `404`', 'Bad request / Not found', 'missing field, unknown id'],
        ['`500`', 'Server error', 'an exception nobody caught']
      ]
    },
    keyPoints: ['2xx worked. 4xx: fix the request. 5xx: fix the server.'],
    commonMistakes: ['Returning 200 with an error message inside the body.'],
    related: ['REST Resources'],
    glossary: httpGlossary
  },
  {
    id: 'request-response-shape',
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

Java.topics.restAndHttp.tryIt = {
  steps: [
    'Open the terminal.',
    'Run `curl -i https://jsonplaceholder.typicode.com/todos/1`.',
    'Run `curl -i https://jsonplaceholder.typicode.com/todos/999999`.'
  ],
  see: '`HTTP/2 200` and a small JSON todo first. Then `HTTP/2 404` and `{}`.'
};

Java.topics.restAndHttp.check = [
  { q: 'Which method reads data without changing anything?', a: 'GET.' },
  { q: 'You want to add a new order. Which method?', a: 'POST, to the collection: `POST /api/orders`.' },
  { q: 'The server answers 404. Whose side is the problem on?', a: 'The client’s: the thing asked for does not exist. 4xx means "fix the request".' }
];
