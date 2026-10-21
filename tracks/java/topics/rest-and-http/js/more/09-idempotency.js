// Lesson I: safe and idempotent methods, retries and idempotency keys.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;

  T.lessons.push({
    num: '09',
    id: 'idempotency',
    title: 'Idempotency',
    category: 'methods',
    icon: '↻',
    tagline: 'Safe to press twice',
    realWorld: 'The button for the lift. Press it once, the lift comes. Press it five times, still one lift comes. A doorbell is different: press it five times and it rings five times.',
    kid: [
      'Some buttons do the same thing however often you press them. The light switch set to "on": press "on" again and the light stays on. That kind of button is **idempotent**.',
      'Other buttons add something each time. The button on a sweet machine: press it twice, get two sweets, pay twice.',
      'On the internet a message can get lost, so programs sometimes press a button again. With an idempotent button that is fine. With the sweet machine button you get too many sweets.'
    ],
    definition: 'A request is **idempotent** when sending it twice leaves the server in the same state as sending it once. GET, HEAD, PUT and DELETE are idempotent. POST is not. A **safe method** goes further: it changes nothing at all (GET and HEAD).',
    explain: [
      'Idempotent is about the **state on the server**, not about the answer. `DELETE /books/1` answers `204` the first time and `404` the second, but after both the book is gone. Same state, so DELETE is idempotent.',
      'PUT is idempotent because it says "make the resource look exactly like this". Doing it again writes the same thing again. POST says "add one more", so every POST adds one more.',
      'Why care? Networks fail. A client sends a request, and then the connection breaks or the timeout hits. It cannot know if the server got the request. With an idempotent method it sends the request again without fear. With POST a retry can create a duplicate, for example a second payment.',
      'For POSTs that must never happen twice, APIs use an **idempotency key**: the client makes a unique id, such as a random UUID, and sends it in a header like `Idempotency-Key`. The server remembers the keys it has seen. A repeat with the same key gets the first answer again, nothing new is created.',
      `The CS track explains the idea for all of HTTP: [idempotency](../../../computer-science/index.html#http-requests-responses/idempotency).`
    ],
    why: 'Retries are normal on networks. Knowing which requests are safe to repeat keeps data correct when things go wrong.',
    whenUse: 'Every time you write retry logic, choose a method for a new endpoint, or build anything with money or orders.',
    syntax: 'safe: GET, HEAD   idempotent: GET, HEAD, PUT, DELETE   neither: POST (and PATCH in general)',
    fileName: 'RetryDemo.java',
    code: `import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class RetryDemo {
    static final Map<Integer, String> BOOKS = new TreeMap<>(); // id -> title, sorted by id
    static int nextId = 1;

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/books", exchange -> {
            String title = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            if (exchange.getRequestMethod().equals("PUT")) { // PUT /books/7: the client names the id
                int id = Integer.parseInt(exchange.getRequestURI().getPath().substring("/books/".length()));
                BOOKS.put(id, title);
                exchange.sendResponseHeaders(200, -1);
            } else {                                         // POST /books: the server picks a new id
                BOOKS.put(nextId++, title);
                exchange.sendResponseHeaders(201, -1);
            }
            exchange.close();
        });
        server.start();
        String base = "http://127.0.0.1:" + server.getAddress().getPort();

        HttpRequest put = HttpRequest.newBuilder(URI.create(base + "/books/7"))
                .PUT(HttpRequest.BodyPublishers.ofString("Momo")).build();
        HttpRequest post = HttpRequest.newBuilder(URI.create(base + "/books"))
                .POST(HttpRequest.BodyPublishers.ofString("Momo")).build();

        try (HttpClient client = HttpClient.newHttpClient()) {
            for (HttpRequest request : List.of(put, put, post, post)) {
                int status = client.send(request, HttpResponse.BodyHandlers.discarding()).statusCode();
                System.out.println(request.method() + " " + request.uri().getPath() + " -> " + status + ", books: " + BOOKS);
            }
        } finally {
            server.stop(0);
        }
    }
}`,
    output: `PUT /books/7 -> 200, books: {7=Momo}
PUT /books/7 -> 200, books: {7=Momo}
POST /books -> 201, books: {1=Momo, 7=Momo}
POST /books -> 201, books: {1=Momo, 2=Momo, 7=Momo}`,
    codeSummary: 'The client sends the same PUT twice and the same POST twice, as a retry would. After two PUTs there is still one book 7. After two POSTs there are two new books.',
    codeExplanation: [
      { label: 'Line 13', code: 'static final Map<Integer, String> BOOKS = new TreeMap<>(); // id -> title, sorted by id', text: 'The server state. A `TreeMap` keeps keys sorted, so the printout is always in id order.' },
      { label: 'Line 14', code: 'static int nextId = 1;', text: 'The next id for a POST. The server counts it up, so each POST gets a new one.' },
      { label: 'Line 20', code: 'if (exchange.getRequestMethod().equals("PUT")) { // PUT /books/7: the client names the id', text: 'With PUT the id is in the URL. The client decides where the book lives.' },
      { label: 'Line 22', code: 'BOOKS.put(id, title);', text: 'Writes book 7. A second PUT writes the same title at the same key: no change in state.' },
      { label: 'Line 25', code: 'BOOKS.put(nextId++, title);', text: 'POST stores under a **new** id each time. `nextId++` uses the value, then adds 1.' },
      { label: 'Line 33', code: 'HttpRequest put = HttpRequest.newBuilder(URI.create(base + "/books/7"))', text: 'One request object. Sending it twice is exactly what a retry does.' },
      { label: 'Line 39', code: 'for (HttpRequest request : List.of(put, put, post, post)) {', text: 'PUT twice, then POST twice.' },
      { label: 'Line 41', code: 'System.out.println(request.method() + " " + request.uri().getPath() + " -> " + status + ", books: " + BOOKS);', text: 'Prints the whole server state after each request. The client can read `BOOKS` here only because client and server run in one program.' }
    ],
    sections: [
      {
        title: 'Safe and idempotent, method by method',
        text: [
          'Every **safe** method is also idempotent: if nothing changes, repeating it changes nothing too. Not every idempotent method is safe: DELETE changes things, but only once.'
        ],
        table: {
          head: ['Method', 'Safe?', 'Idempotent?', 'Body?', 'Usual success'],
          rows: [
            ['`GET`', 'yes', 'yes', 'no', '`200 OK`'],
            ['`HEAD`', 'yes', 'yes', 'no', '`200 OK` (headers only)'],
            ['`POST`', 'no', '**no**', 'yes', '`201 Created`'],
            ['`PUT`', 'no', 'yes', 'yes', '`200 OK` or `201 Created`'],
            ['`PATCH`', 'no', 'not promised', 'yes', '`200 OK`'],
            ['`DELETE`', 'no', 'yes', 'no', '`204 No Content`']
          ],
          note: 'This is a promise of the method. Your server code has to keep it: a PUT handler that counts something up breaks the promise.'
        }
      },
      {
        title: 'A lost answer and a retry',
        text: [
          'The dangerous moment: the server did the work, but the answer never reached the client. The client only sees a timeout. Should it try again?'
        ],
        mermaid: 'sequenceDiagram\n  participant C as Client\n  participant S as Server\n  C->>S: PUT /books/7 "Momo"\n  Note over S: stores book 7\n  S--xC: 200 (lost on the way)\n  Note over C: timeout, try again\n  C->>S: PUT /books/7 "Momo"\n  S-->>C: 200\n  Note over S: still one book 7, all good',
        diagramNote: 'The crossed arrow is an answer that never arrives. For PUT the retry is harmless. Swap PUT for POST and the server now has two books.'
      },
      {
        title: 'Same state, not the same answer',
        text: [
          'Idempotent does not mean "same response". Here the client deletes the same book twice. The first DELETE answers 204, the second 404. In both cases the book is gone afterwards.'
        ],
        fileName: 'DeleteTwice.java',
        code: `import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashSet;
import java.util.Set;

public class DeleteTwice {
    static final Set<String> BOOKS = new HashSet<>(Set.of("/books/1"));

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/books", exchange -> {
            boolean removed = BOOKS.remove(exchange.getRequestURI().getPath());
            exchange.sendResponseHeaders(removed ? 204 : 404, -1);
            exchange.close();
        });
        server.start();
        URI book = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/books/1");

        try (HttpClient client = HttpClient.newHttpClient()) {
            HttpRequest delete = HttpRequest.newBuilder(book).DELETE().build();
            for (int i = 1; i <= 2; i++) {
                int status = client.send(delete, HttpResponse.BodyHandlers.discarding()).statusCode();
                System.out.println("DELETE " + i + " -> " + status + ", books left: " + BOOKS.size());
            }
        } finally {
            server.stop(0);
        }
    }
}`,
        output: `DELETE 1 -> 204, books left: 0
DELETE 2 -> 404, books left: 0`
      },
      {
        title: 'Idempotency keys make POST safe to retry',
        text: [
          'Payments and orders must use POST, and they must never happen twice. The fix: the client sends a unique key with the request. The server remembers each key and the answer it gave.',
          'A retry carries the **same** key, so the server returns the old order. A new order gets a new key.'
        ],
        fileName: 'OrderKeys.java',
        code: `import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OrderKeys {
    static final Map<String, Integer> SEEN = new HashMap<>(); // key -> order id

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/orders", exchange -> {
            String key = exchange.getRequestHeaders().getFirst("Idempotency-Key");
            boolean isNew = !SEEN.containsKey(key);
            if (isNew) SEEN.put(key, SEEN.size() + 1);
            byte[] body = ("order " + SEEN.get(key)).getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(isNew ? 201 : 200, body.length);
            try (OutputStream out = exchange.getResponseBody()) {
                out.write(body);
            }
        });
        server.start();
        URI orders = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/orders");

        try (HttpClient client = HttpClient.newHttpClient()) {
            for (String key : List.of("key-a", "key-a", "key-b")) { // the second one is a retry
                HttpRequest request = HttpRequest.newBuilder(orders)
                        .header("Idempotency-Key", key)
                        .POST(HttpRequest.BodyPublishers.ofString("1 pizza"))
                        .build();
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                System.out.println(key + " -> " + response.statusCode() + " " + response.body());
            }
            System.out.println("Orders stored: " + SEEN.size());
        } finally {
            server.stop(0);
        }
    }
}`,
        output: `key-a -> 201 order 1
key-a -> 200 order 1
key-b -> 201 order 2
Orders stored: 2`,
        tip: 'A real client makes the key with `java.util.UUID.randomUUID().toString()` once per order, and reuses that same key for every retry of that order.'
      }
    ],
    technical: [
      'HTTP itself defines which methods are safe and idempotent (in RFC 9110, the current HTTP rule book). Tools rely on it: browsers, proxies and `HttpClient` libraries may retry idempotent requests on their own after a broken connection, but never a POST.',
      'The server must keep the promise in its code. A PUT handler that also counts "number of edits" is no longer idempotent. A GET handler that writes to a database is no longer safe. The method name alone guarantees nothing.',
      'Idempotency keys need storage: a table of key, request and answer, kept for some hours or days. The server must also handle two requests with the same key that arrive at the same moment, usually with a lock or a unique index in the database.'
    ],
    tryIt: {
      steps: [
        'Run `RetryDemo.java`.',
        'Change the list to `List.of(post, post, post)`.',
        'In `OrderKeys.java`, change the keys to `"key-a", "key-b", "key-c"`.'
      ],
      see: 'Three POSTs give books 1, 2 and 3. With three different keys the server stores three orders, all with status 201.'
    },
    check: [
      { q: 'Is DELETE idempotent, even though the second DELETE answers 404?', a: 'Yes. Idempotent means the same server state. After one or two DELETEs the resource is gone.' },
      { q: 'Your request timed out. Which of GET, PUT, POST may you retry without thinking?', a: 'GET and PUT. A POST may already have been stored, so a retry can make a duplicate.' },
      { q: 'What does the server do with a repeated `Idempotency-Key`?', a: 'It does not create anything new. It sends back the answer for the first request with that key.' }
    ],
    keyPoints: [
      'Idempotent: twice has the same effect on the server as once.',
      'Safe: no effect at all. Safe methods are GET and HEAD.',
      'GET, HEAD, PUT, DELETE are idempotent. POST is not.',
      'It is about the server state, not the answer: DELETE gives 204, then 404.',
      'Make POST retryable with an `Idempotency-Key` header.'
    ],
    commonMistakes: [
      'Retrying a payment `POST` after a timeout. Fix: send an `Idempotency-Key` and reuse it for the retry.',
      'A PUT handler like `count = count + 1`. That breaks idempotency. Fix: PUT sets values, it never adds to them.',
      'Thinking "idempotent" means "the same response". Fix: compare the server state, not the status codes.',
      'A GET that writes, such as `GET /counter/increase`. Fix: use POST for anything that changes data.'
    ],
    related: ['POST', 'PUT, PATCH, DELETE', 'GET'],
    glossary: G
  });
})();
