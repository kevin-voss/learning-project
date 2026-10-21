// Lesson C: what REST means.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;

  T.lessons.push(
    {
      num: '03',
      id: 'rest-resources',
      title: 'What REST Means',
      category: 'foundations',
      icon: '/api',
      tagline: 'Nouns in the URL, verbs in the method',
      realWorld: 'A library. Every book has its own shelf number. You do not need a special desk for "lend", "return" and "renew". You go to the one desk, name the book and say what you want to do with it.',
      kid: [
        'Think of a toy box with labelled drawers: "cars", "dolls", "blocks". Each toy in a drawer has a number. "Cars, number 3" is always the same red car.',
        'Now there are only a few things you can do: **look** at a toy, **put in** a new toy, **swap** a toy, **take out** a toy. You say the drawer and number, and you say what you want to do.',
        'REST works like that. The drawers and numbers are web addresses, like `/books/3`. The few things you can do are the HTTP methods: GET, POST, PUT, PATCH, DELETE.'
      ],
      definition: '**REST** (REpresentational State Transfer) is a style for designing web APIs. The data is a set of **resources**, each with its own URL. Clients use the standard HTTP methods on those URLs and exchange **representations**, usually JSON.',
      explain: [
        'An **API** (application programming interface) is the list of requests a server understands. A **resource** is one thing the API offers: a book, a user, an order. A **collection** is a group of them. In REST each has a URL: `/books` is the collection, `/books/2` is one book.',
        'URLs are **nouns**. The action is the **method**: `GET /books/2` reads book 2, `DELETE /books/2` removes it. You do not write `/getBook?id=2` or `/deleteBook/2`. One URL, many methods.',
        'The server keeps the book as a Java object in its memory or in a database. It never sends that object. It sends a **representation**: a copy written as text, usually **JSON** such as `{"id": 2, "title": "Emma"}`. The client builds its own object from that text.',
        'REST is **stateless**: the server remembers nothing about earlier requests of a client. Each request carries everything needed, for example a key in the `Authorization` header every time. The server may still store data (the books). It only does not keep a conversation.',
        'An **endpoint** is one method plus one path, such as `GET /books/{id}`. The `{id}` is a placeholder for a real number. A REST API is the list of its endpoints.'
      ],
      why: 'When every API uses nouns and the same few methods, a developer can guess how a new API works. Tools such as browsers, caches and test tools understand it too.',
      whenUse: 'Whenever you design or call a web API that offers data: shops, libraries, weather, to-do lists. Most public APIs are REST style.',
      syntax: 'METHOD /collection   or   METHOD /collection/{id}   e.g. GET /books, GET /books/2, POST /books, DELETE /books/2',
      fileName: 'BookResources.java',
      code: `import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class BookResources {
    static final List<String> TITLES = List.of("Dune", "Emma", "Momo");

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/books", exchange -> {
            String path = exchange.getRequestURI().getPath();
            if (path.equals("/books")) {                       // the collection
                List<String> all = new ArrayList<>();
                for (int id = 1; id <= TITLES.size(); id++) all.add(bookJson(id));
                send(exchange, 200, "[" + String.join(", ", all) + "]");
                return;
            }
            int id = Integer.parseInt(path.substring("/books/".length()));
            if (id >= 1 && id <= TITLES.size()) send(exchange, 200, bookJson(id)); // one item
            else send(exchange, 404, """
                    {"error": "no book %d"}""".formatted(id));
        });
        server.start();
        String base = "http://127.0.0.1:" + server.getAddress().getPort();

        try (HttpClient client = HttpClient.newHttpClient()) {
            for (String path : List.of("/books", "/books/2", "/books/9")) {
                HttpRequest request = HttpRequest.newBuilder(URI.create(base + path)).build();
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                System.out.println("GET " + path + " -> " + response.statusCode() + " " + response.body());
            }
        } finally {
            server.stop(0);
        }
    }

    // The representation: a JSON copy of one book.
    static String bookJson(int id) {
        return """
                {"id": %d, "title": "%s"}""".formatted(id, TITLES.get(id - 1));
    }

    static void send(HttpExchange exchange, int status, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream out = exchange.getResponseBody()) {
            out.write(bytes);
        }
    }
}`,
      output: `GET /books -> 200 [{"id": 1, "title": "Dune"}, {"id": 2, "title": "Emma"}, {"id": 3, "title": "Momo"}]
GET /books/2 -> 200 {"id": 2, "title": "Emma"}
GET /books/9 -> 404 {"error": "no book 9"}`,
      codeSummary: 'A tiny REST API with one resource, books. `/books` is the collection, `/books/2` is one item, and an unknown id gets 404. The server sends JSON representations, never the Java objects.',
      codeExplanation: [
        { label: 'Line 15', code: 'static final List<String> TITLES = List.of("Dune", "Emma", "Momo");', text: 'The data the server owns. Book 1 is Dune, book 2 Emma, book 3 Momo.' },
        { label: 'Line 19', code: 'server.createContext("/books", exchange -> {', text: 'One handler for the whole resource. A context matches every path that starts with `/books`, so `/books/2` lands here too.' },
        { label: 'Line 21', code: 'if (path.equals("/books")) {', text: 'No id in the path: the client wants the **collection**.' },
        { label: 'Line 24', code: 'send(exchange, 200, "[" + String.join(", ", all) + "]");', text: 'A JSON array `[...]` with one object per book. `String.join` puts `, ` between them.' },
        { label: 'Line 27', code: 'int id = Integer.parseInt(path.substring("/books/".length()));', text: 'Cuts `/books/` off the front and turns the rest, `"2"`, into the number 2.' },
        { label: 'Line 29', code: 'else send(exchange, 404, """', text: 'An id that does not exist: status 404 and a small JSON error. The `"""` starts a **text block**, a string where quotes need no backslash.' },
        { label: 'Line 30', code: '{"error": "no book %d"}""".formatted(id));', text: '`formatted(id)` puts the id where `%d` stands, like `String.format`.' },
        { label: 'Line 47', code: 'static String bookJson(int id) {', text: 'Builds the **representation** of one book: a JSON text copy of the data.' },
        { label: 'Line 54', code: 'exchange.getResponseHeaders().set("Content-Type", "application/json");', text: 'Tells the client the body is JSON. This header is part of every REST response with a body.' }
      ],
      sections: [
        {
          title: 'Resources are nouns',
          text: [
            'Find the things in your app first. A library app has books, members and loans. Each becomes a collection URL with a plural noun.',
            'Then let the method say what to do. The URL stays the same.'
          ],
          table: {
            head: ['You want to …', 'Not REST (verb in URL)', 'REST (noun + method)'],
            rows: [
              ['list all books', '`GET /getAllBooks`', '`GET /books`'],
              ['read book 2', '`GET /getBook?id=2`', '`GET /books/2`'],
              ['add a book', '`POST /createBook`', '`POST /books`'],
              ['change book 2', '`POST /updateBook/2`', '`PUT /books/2` or `PATCH /books/2`'],
              ['remove book 2', '`GET /deleteBook/2`', '`DELETE /books/2`']
            ],
            note: 'The last row on the left is dangerous: a GET that deletes. Lesson F explains why.'
          }
        },
        {
          title: 'A representation is a copy',
          text: [
            'The book lives inside the server, as a Java object or a database row. The client gets a text copy. It reads that copy and makes its own object. Both sides can use different languages.',
            '"Representational State Transfer" means exactly this: the state of a resource travels as a representation.'
          ],
          mermaid: 'flowchart LR\n  A["Java object in the server: id 2, title Emma"] -->|"written as JSON"| B["Text on the wire"]\n  B -->|"read by the client"| C["Object in the client, any language"]',
          diagramNote: 'Only text travels. The Java object never leaves the server.',
          fileName: 'book-2.json',
          codeLanguage: 'json',
          code: `{
  "id": 2,
  "title": "Emma",
  "author": "Jane Austen",
  "year": 1815
}`
        },
        {
          title: 'Stateless: bring everything every time',
          text: [
            'A waiter who remembers you is nice in a café. A REST server is more like a ticket machine: it knows nothing about you, so you show your ticket every time.',
            'That is why a client sends its key in the `Authorization` header with **every** request. Any copy of the server can answer any request, because none of them needs to remember anything.'
          ],
          mermaid: 'sequenceDiagram\n  participant C as Client\n  participant S as Server\n  C->>S: GET /books with Authorization: key-42\n  S-->>C: 200 and the list\n  C->>S: GET /books/2 with Authorization: key-42\n  S-->>C: 200 and book 2\n  C->>S: GET /books/3 without a key\n  S-->>C: 401 Unauthorized',
          diagramNote: 'The third request forgot the key. The server does not remember the first two, so it says 401: "who are you?"'
        },
        {
          title: 'The REST rules on one card',
          text: ['Roy Fielding described REST in the year 2000. For your first APIs these rules matter most.'],
          table: {
            head: ['Rule', 'What it means for you'],
            rows: [
              ['client and server', 'the client shows things, the server owns the data'],
              ['stateless', 'every request carries all it needs, such as the key'],
              ['resources with URLs', 'one noun URL per thing: `/books/2`'],
              ['standard methods', 'GET reads, POST creates, PUT replaces, PATCH changes, DELETE removes'],
              ['representations', 'send JSON copies with a `Content-Type` header'],
              ['cacheable', 'GET answers may be kept and reused for a while']
            ]
          },
          tip: 'Not every API that sends JSON over HTTP is REST. `POST /api` with `{"action": "deleteBook", "id": 2}` in the body is a different style, called RPC (remote procedure call).'
        }
      ],
      technical: [
        'A REST API is not a library or a Java class. It is a set of agreements on top of HTTP. The server code decides which URL and method do what. In the example the decision is an `if` on the path. Frameworks such as Spring do the same with annotations.',
        'The JDK `HttpServer` matches contexts by the start of the path. `createContext("/books", ...)` gets `/books`, `/books/2` and even `/bookshelf`. Your handler must check the rest of the path itself.',
        'Statelessness helps a server to grow. A big service runs many copies of the same server behind a load balancer, a program that hands each request to any free copy. Because no copy remembers a client, any copy can answer.'
      ],
      tryIt: {
        steps: [
          'Run `BookResources.java`.',
          'Add a fourth title, `"Heidi"`, to `TITLES`.',
          'Change the last path in the client list from `/books/9` to `/books/4`.'
        ],
        see: 'The collection now has four objects, and `GET /books/4 -> 200 {"id": 4, "title": "Heidi"}`.'
      },
      check: [
        { q: 'Which URL is REST style for "delete order 7": `POST /deleteOrder/7` or `DELETE /orders/7`?', a: '`DELETE /orders/7`. The URL is the noun, the method is the verb.' },
        { q: 'What is a representation?', a: 'A copy of a resource as text, usually JSON, that travels in the body. The server object itself never travels.' },
        { q: 'What does stateless mean for a client that needs a key?', a: 'It sends the key with every request, because the server remembers nothing between requests.' }
      ],
      keyPoints: [
        'A resource is one thing with its own URL. A collection is a plural noun: `/books`.',
        'The URL names the thing, the method says what to do.',
        'The server sends representations, usually JSON with `Content-Type: application/json`.',
        'Stateless: every request carries everything, the server keeps no conversation.',
        'An endpoint is one method plus one path.'
      ],
      commonMistakes: [
        'Verbs in URLs: `/createBook`, `/deleteBook/2`. Fix: `POST /books`, `DELETE /books/2`.',
        'Mixing singular and plural: `/book/2` but `/books`. Fix: always the plural collection name, `/books/2`.',
        'Expecting the server to remember a login from an earlier request. Fix: send the key in a header every time.',
        'Sending a Java `toString()` such as `Book@1b6d3586` as the body. Fix: write a real JSON representation.'
      ],
      related: ['Designing URLs', 'GET', 'JSON Basics and Payload Shape'],
      glossary: G
    }
  );
})();
