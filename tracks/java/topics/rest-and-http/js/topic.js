// REST & HTTP: shared glossary, the topic-level Try it and Check.
// The lessons live in js/lessons/*.js and append to Java.topics.restAndHttp.lessons.
Java.topics.restAndHttp = Java.topics.restAndHttp || {};

Java.topics.restAndHttp.lessons = [];

Java.topics.restAndHttp.glossary = [
  { term: 'client', definition: 'The program that asks: it opens the connection and sends the request. A browser, curl or your Java program.' },
  { term: 'server', definition: 'The program that waits on a port for requests and sends back one response for each.' },
  { term: 'HTTP', definition: 'HyperText Transfer Protocol: the text rules for one request and one response between a client and a server.' },
  { term: 'port', definition: 'A number (0 to 65535) that picks one program on a computer, like a flat number inside a building.' },
  { term: 'localhost', definition: 'The name for "this computer". Its address is 127.0.0.1. Requests to it never leave your machine.' },
  { term: 'header', definition: 'One `Name: value` line of extra information in a request or response, such as `Content-Type: application/json`.' },
  { term: 'status code', definition: 'The three-digit number at the start of a response that says how it went: 2xx worked, 4xx client mistake, 5xx server mistake.' },
  { term: 'REST', definition: 'REpresentational State Transfer: a style for web APIs. Things are resources at noun URLs, and standard HTTP methods say what to do with them.' },
  { term: 'resource', definition: 'One thing the API exposes, such as a book, a user or an order. It has its own URL.' },
  { term: 'endpoint', definition: 'One method plus one URL path that a client can call, such as `GET /books/42`.' },
  { term: 'representation', definition: 'A copy of a resource in a format such as JSON. The server sends a representation, never the Java object itself.' },
  { term: 'stateless', definition: 'The server keeps no memory of earlier requests from a client. Every request carries everything the server needs.' },
  { term: 'idempotent', definition: 'Sending the same request twice leaves the server in the same state as sending it once.' },
  { term: 'safe method', definition: 'A method that only reads and never changes data on the server: GET and HEAD.' },
  { term: 'query string', definition: 'The part of a URL after `?`, such as `?author=Le%20Guin&limit=5`. It holds filters and options.' },
  { term: 'JSON', definition: 'JavaScript Object Notation: a text format for data with objects `{}`, arrays `[]`, strings, numbers, true, false and null.' },
  { term: 'handler', definition: 'The code the server runs for one request. In `com.sun.net.httpserver` it is an `HttpHandler`.' },
  { term: 'lambda', definition: 'A short way to write an object of a one-method interface: `exchange -> { ... }` is an `HttpHandler`.' },
  { term: 'text block', definition: 'A string written between `"""` lines. Quotes inside it need no backslash, so JSON stays readable.' },
  { term: 'CompletableFuture', definition: 'A box for a result that arrives later. `join()` waits until the box is full and gives you the value.' }
];

Java.topics.restAndHttp.tryIt = {
  steps: [
    'Save the program from lesson A as `HelloHttp.java` and run it with `java HelloHttp.java`.',
    'Change the path in the client from `/hello` to `/nothing` and run it again.',
    'Change the server: answer with status `201` instead of `200`. Run it again.',
    'Open a terminal and run `curl -i https://jsonplaceholder.typicode.com/todos/1` (this one needs the internet).'
  ],
  see: 'First `Client: status 200` and the greeting. With `/nothing` you get `404` and the text `No context found for request`. After the server change the client prints `201`. curl prints a status line, headers, an empty line and a small JSON object.'
};

Java.topics.restAndHttp.check = [
  { q: 'Who sends first, the client or the server?', a: 'Always the client. The server waits on its port and only answers.' },
  { q: 'Name the four parts of an HTTP request.', a: 'The method (`GET`), the path (`/books/42`), the headers (`Accept: application/json`) and the body (often empty for GET).' },
  { q: 'You want to add a new order. Which method and URL?', a: '`POST /orders` with the order as JSON in the body. The server answers `201 Created` and a `Location: /orders/7` header.' },
  { q: 'The server answers 404. Is this a Java exception in `HttpClient`?', a: 'No. Any answer, even 404 or 500, is a normal `HttpResponse`. You read `response.statusCode()`. An exception only comes when there is no answer at all, for example `ConnectException`.' },
  { q: 'Why is `PUT /books/7` safe to retry, but `POST /books` is not?', a: '`PUT` is idempotent: the second time it writes the same book again. `POST` creates a new book every time, so a retry makes a duplicate.' }
];
