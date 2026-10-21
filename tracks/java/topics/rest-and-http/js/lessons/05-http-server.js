// Lesson E: a tiny server with com.sun.net.httpserver.HttpServer.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;

  T.lessons.push({
    num: '05',
    id: 'java-http-server',
    title: 'A Tiny Server with HttpServer',
    category: 'java',
    icon: '◎',
    tagline: 'Listen on a port, answer each request',
    realWorld: 'A shop with several doors. A sign on each door says what happens behind it: "Bakery", "Post office". The doorman reads your ticket and sends you to the right door. Behind each door one person serves you.',
    kid: [
      'A server is like a shop that opens in the morning and waits for customers. It has doors with signs: `/greet`, `/books`. Behind each door stands one helper.',
      'When a customer comes in through the `/greet` door, the helper behind it does the job: reads what the customer wants, writes an answer and hands it over.',
      'In Java the shop is `HttpServer`. A door with its sign is a **context**. The helper is a **handler**. At night you close the shop with `stop`.'
    ],
    definition: '`com.sun.net.httpserver.HttpServer` is a small HTTP server inside the JDK. You create it on an address and port, attach a **handler** to a path with `createContext`, and call `start()`. For each request the server calls your handler with an `HttpExchange`.',
    explain: [
      'A **handler** is an object that implements the interface `HttpHandler`. The interface has one method: `void handle(HttpExchange exchange) throws IOException`. This is the [interfaces](../interfaces/index.html) idea: the server only knows the promise "I can handle", not your class.',
      'An `HttpExchange` is one request and its response together. You read the request with `getRequestMethod()`, `getRequestURI()`, `getRequestHeaders()` and `getRequestBody()`. You answer with `getResponseHeaders()`, `sendResponseHeaders(status, length)` and `getResponseBody()`.',
      'A **context** links a path to a handler: `server.createContext("/greet", handler)`. When a request comes in, the server picks the context with the longest path that the request path starts with. If none fits, the server itself answers `404`.',
      'The length in `sendResponseHeaders` matters. A number above 0 is the exact body size in bytes. `-1` means "no body at all". `0` means "length not known yet, I will stream it".',
      'The JDK server is perfect for learning, tests and small tools. Real web apps use a framework such as Spring Boot, which builds on the same ideas: paths, methods, handlers.'
    ],
    why: 'To call an API you need a server. Writing a tiny one yourself shows what every server does: read the request, decide, answer.',
    whenUse: 'For examples and tests that must run without internet, for small tools on your own computer, and to understand what frameworks do for you.',
    syntax: 'HttpServer s = HttpServer.create(new InetSocketAddress(host, port), 0); s.createContext("/path", handler); s.start(); … s.stop(0);',
    fileName: 'TinyServer.java',
    code: `import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class TinyServer {
    // A handler is a class that implements the HttpHandler interface.
    static class GreetingHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String query = exchange.getRequestURI().getQuery(); // "name=Ada" or null
            String name = (query == null) ? "stranger" : query.replace("name=", "");
            byte[] body = ("Hello, " + name + "!").getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=utf-8");
            exchange.sendResponseHeaders(200, body.length);
            try (OutputStream out = exchange.getResponseBody()) {
                out.write(body);
            }
        }
    }

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/greet", new GreetingHandler());
        server.start();
        System.out.println("Server is listening.");

        String base = "http://127.0.0.1:" + server.getAddress().getPort();
        try (HttpClient client = HttpClient.newHttpClient()) {
            for (String path : List.of("/greet", "/greet?name=Ada", "/nothing")) {
                HttpRequest request = HttpRequest.newBuilder(URI.create(base + path)).build();
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                System.out.println(path + " -> " + response.statusCode() + " " + response.body());
            }
        } finally {
            server.stop(0);
            System.out.println("Server stopped.");
        }
    }
}`,
    output: `Server is listening.
/greet -> 200 Hello, stranger!
/greet?name=Ada -> 200 Hello, Ada!
/nothing -> 404 <h1>404 Not Found</h1>No context found for request
Server stopped.`,
    codeSummary: 'A server with one context, `/greet`, served by a handler class. The client part calls it with and without a name, and once on a path the server does not know.',
    codeExplanation: [
      { label: 'Line 16', code: 'static class GreetingHandler implements HttpHandler {', text: 'The handler class. `implements HttpHandler` promises one method, `handle`.' },
      { label: 'Line 18', code: 'public void handle(HttpExchange exchange) throws IOException {', text: 'The server calls this once per request. `exchange` holds that request and its response.' },
      { label: 'Line 19', code: 'String query = exchange.getRequestURI().getQuery(); // "name=Ada" or null', text: 'The query string after `?`, already decoded. It is `null` when the URL has no `?`.' },
      { label: 'Line 22', code: 'exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=utf-8");', text: 'Plain text, encoded as UTF-8. Set headers first.' },
      { label: 'Line 23', code: 'exchange.sendResponseHeaders(200, body.length);', text: 'Sends status and headers, and promises exactly `body.length` bytes.' },
      { label: 'Line 24', code: 'try (OutputStream out = exchange.getResponseBody()) {', text: 'Writes the body. Closing the stream ends the exchange. Forget it and the client waits forever.' },
      { label: 'Line 31', code: 'HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);', text: 'Creates the server on this computer and a free port. It does not listen yet.' },
      { label: 'Line 32', code: 'server.createContext("/greet", new GreetingHandler());', text: 'The door sign: requests whose path starts with `/greet` go to this handler.' },
      { label: 'Line 33', code: 'server.start();', text: 'Now it listens, on a thread of its own. `main` goes on at once.' },
      { label: 'Line 44', code: 'server.stop(0);', text: 'Closes the port and ends the server thread, so the program can end.' }
    ],
    sections: [
      {
        title: 'The long form and the short form',
        text: [
          '`HttpHandler` has exactly one method. For such an interface Java lets you write a **lambda** in place of a whole class: `exchange -> { ... }`. The part before `->` is the parameter, the block is the body of `handle`.',
          'Both lines below do the same. The rest of this page uses the short form.'
        ],
        table: {
          head: ['Long form: a class', 'Short form: a lambda'],
          rows: [
            ['`server.createContext("/greet", new GreetingHandler());`', '`server.createContext("/greet", exchange -> { ... });`'],
            ['the code sits in `handle(HttpExchange exchange)`', 'the code sits in the `{ ... }` after `->`'],
            ['good for big handlers you want to test alone', 'good for short handlers']
          ]
        },
        mermaid: 'classDiagram\n  class HttpHandler {\n    <<interface>>\n    +handle(HttpExchange exchange) void\n  }\n  class GreetingHandler {\n    +handle(HttpExchange exchange) void\n  }\n  class HttpServer {\n    +createContext(path, handler)\n    +start()\n    +stop(delay)\n  }\n  HttpHandler <|.. GreetingHandler\n  HttpServer --> HttpHandler : calls handle',
        diagramNote: 'The server only knows the interface. Any class or lambda that fits `handle` can serve a path.'
      },
      {
        title: 'What happens for one request',
        text: ['The server has a thread called the **dispatcher**. It waits for connections, reads each request and calls the right handler.'],
        mermaid: 'sequenceDiagram\n  participant C as Client\n  participant D as Dispatcher thread\n  participant H as Handler for /greet\n  C->>D: GET /greet?name=Ada\n  D->>D: find the longest matching context\n  D->>H: handle(exchange)\n  H->>H: read query, build body\n  H-->>C: sendResponseHeaders(200, 11)\n  H-->>C: write body, close stream\n  Note over D: wait for the next request',
        diagramNote: 'By default the dispatcher runs your handler itself, so the server answers one request at a time.',
        tip: 'For many requests at once give the server a thread pool before `start()`: `server.setExecutor(Executors.newFixedThreadPool(4));`. Then shut the pool down after `stop`.'
      },
      {
        title: 'Contexts match the start of the path',
        text: [
          'A context gets every path that **starts with** its text. `/books` gets `/books/42` and, maybe surprising, `/bookshelf`. The longest match wins, and a context `/` catches everything else.',
          'So your handler must look at the rest of the path itself.'
        ],
        fileName: 'PrefixMatch.java',
        code: `import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class PrefixMatch {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        for (String context : List.of("/", "/books")) {
            server.createContext(context, exchange -> {
                byte[] body = ("context " + context).getBytes(StandardCharsets.UTF_8);
                exchange.sendResponseHeaders(200, body.length);
                try (OutputStream out = exchange.getResponseBody()) {
                    out.write(body);
                }
            });
        }
        server.start();
        String base = "http://127.0.0.1:" + server.getAddress().getPort();

        try (HttpClient client = HttpClient.newHttpClient()) {
            for (String path : List.of("/books", "/books/42", "/bookshelf", "/about")) {
                HttpRequest request = HttpRequest.newBuilder(URI.create(base + path)).build();
                String body = client.send(request, HttpResponse.BodyHandlers.ofString()).body();
                System.out.println(path + " -> " + body);
            }
        } finally {
            server.stop(0);
        }
    }
}`,
        output: `/books -> context /books
/books/42 -> context /books
/bookshelf -> context /books
/about -> context /`,
        warn: 'To be strict, check the path in the handler: `path.equals("/books") || path.startsWith("/books/")`, and answer 404 for the rest.'
      },
      {
        title: 'One handler, several methods',
        text: [
          'A REST resource answers several methods on the same path. The handler reads `getRequestMethod()` and picks a branch. For a method it does not support it answers `405 Method Not Allowed` and lists the allowed ones in the `Allow` header.',
          'This server keeps a to-do list in memory. GET shows it, POST adds the text from the body.'
        ],
        fileName: 'TodoServer.java',
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

public class TodoServer {
    static final List<String> TODOS = new ArrayList<>();

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/todos", exchange -> {
            switch (exchange.getRequestMethod()) {
                case "GET" -> reply(exchange, 200, String.join(", ", TODOS));
                case "POST" -> {
                    TODOS.add(new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8));
                    reply(exchange, 201, "added");
                }
                default -> {
                    exchange.getResponseHeaders().set("Allow", "GET, POST");
                    reply(exchange, 405, "use GET or POST");
                }
            }
        });
        server.start();
        URI todos = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/todos");

        try (HttpClient client = HttpClient.newHttpClient()) {
            List<HttpRequest> requests = List.of(
                    HttpRequest.newBuilder(todos).POST(HttpRequest.BodyPublishers.ofString("feed cat")).build(),
                    HttpRequest.newBuilder(todos).POST(HttpRequest.BodyPublishers.ofString("buy milk")).build(),
                    HttpRequest.newBuilder(todos).GET().build(),
                    HttpRequest.newBuilder(todos).DELETE().build());
            for (HttpRequest request : requests) {
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                System.out.println(request.method() + " -> " + response.statusCode() + " " + response.body());
            }
        } finally {
            server.stop(0);
        }
    }

    static void reply(HttpExchange exchange, int status, String text) throws IOException {
        byte[] bytes = text.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream out = exchange.getResponseBody()) {
            out.write(bytes);
        }
    }
}`,
        output: `POST -> 201 added
POST -> 201 added
GET -> 200 feed cat, buy milk
DELETE -> 405 use GET or POST`,
        tip: 'The helper `reply` keeps every handler short. Most examples on this page have one like it.'
      },
      {
        title: 'Rules for every handler',
        text: ['Most bugs in a hand-written server come from one of these rules.'],
        bullets: [
          'Read the request body when there is one: `getRequestBody().readAllBytes()`.',
          'Set response headers **before** `sendResponseHeaders`.',
          'Use the byte length of the body, or `-1` when there is no body (for example with `204`).',
          'Always close the response body stream, best with `try (OutputStream out = ...)`.',
          'Catch your own errors and answer `500`. An uncaught exception closes the connection without any answer.'
        ]
      }
    ],
    technical: [
      '`HttpServer.create` binds a server socket to the address. The second argument is the **backlog**: how many new connections may wait in line before the system refuses more. `0` uses the system default.',
      '`start()` starts the dispatcher thread. Without `setExecutor`, the dispatcher calls your handlers itself. A slow handler then delays every other client. With an executor, the dispatcher hands each exchange to a pool thread.',
      'If a handler throws an exception, the JDK closes the connection and never sends a status. The client then gets an `IOException`, not a 500. That is why real servers wrap every handler in a `try`/`catch` that answers 500.',
      'The package name starts with `com.sun`, but it is a supported part of the JDK in the module `jdk.httpserver`. Since Java 18 the JDK also has the command `jwebserver`, which serves files from a folder.'
    ],
    tryIt: {
      steps: [
        'Run `TinyServer.java`.',
        'Add a second context `/bye` with a lambda that answers `Goodbye!`.',
        'Add `"/bye"` to the list of paths in the client.',
        'In `TodoServer.java`, add `PUT` to the `Allow` header text and run it.'
      ],
      see: 'A new line `/bye -> 200 Goodbye!`. The 405 line still appears, because the `switch` has no `PUT` branch yet. The `Allow` header is only a hint for the client.'
    },
    check: [
      { q: 'Which interface must a handler implement, and what is its one method?', a: '`HttpHandler`, with `void handle(HttpExchange exchange) throws IOException`.' },
      { q: 'A context is `/books`. Which handler gets `/books/7/reviews`?', a: 'The `/books` handler, because the path starts with `/books` (unless a longer context such as `/books/7` exists).' },
      { q: 'What does `sendResponseHeaders(204, -1)` mean?', a: 'Status 204 No Content, and `-1` says there is no body at all.' }
    ],
    keyPoints: [
      '`HttpServer.create(address, 0)`, `createContext(path, handler)`, `start()`, `stop(0)`.',
      'A handler implements `HttpHandler`. A lambda `exchange -> { ... }` is the short form.',
      'Contexts match by the start of the path. The longest one wins.',
      'Headers first, then `sendResponseHeaders(status, length)`, then the body, then close.',
      'Answer 405 with an `Allow` header for methods you do not support.'
    ],
    commonMistakes: [
      'Not closing the exchange: the client hangs. Fix: `try (OutputStream out = exchange.getResponseBody()) { out.write(bytes); }`.',
      '`exchange.sendResponseHeaders(204, 0)`. `0` means "body of unknown length". Fix: `-1` for no body.',
      'An exception inside a handler, such as `Integer.parseInt("abc")`. The client gets no answer. Fix: catch it and reply 400 or 500.',
      'Calling `server.createContext` twice with the same path. Java throws `IllegalArgumentException`. Fix: one context per path, branch on the method inside.'
    ],
    related: ['Calling an API with HttpClient', 'What REST Means', 'Interfaces'],
    glossary: G
  });
})();
