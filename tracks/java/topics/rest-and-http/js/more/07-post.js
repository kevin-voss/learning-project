// Lesson G: POST, the method that creates.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;

  T.lessons.push({
    num: '07',
    id: 'post',
    title: 'POST',
    category: 'methods',
    icon: 'POST',
    tagline: 'Send data, create something new',
    realWorld: 'Handing in a form at the town hall. You fill it in and give it to the clerk. The clerk files it and gives you a slip: "Your case number is 7." Hand in the same form twice, and you have two cases.',
    kid: [
      'POST means "here is something new, please keep it". You write a note, "a book called Momo", and give it to the server.',
      'The server puts it on the shelf, gives it a number and says: "Thank you, I made book number 1. You find it at `/books/1`."',
      'If you give the same note again, the server makes **another** book, number 2. POST does not check if you already sent it.'
    ],
    definition: '**POST** sends data in the request body for the server to process. Most often it creates a new resource in a collection: `POST /books`. The server picks the new id and answers `201 Created` with a `Location` header. POST is neither safe nor idempotent.',
    explain: [
      'The client sends POST to the **collection**, not to an item: `POST /books`, because the book has no id yet. The server chooses the id.',
      'The new data travels in the **body**, usually JSON, with the header `Content-Type: application/json`. The server reads the body, checks it (is the title there?), stores the new resource and answers.',
      'A good answer to a create is `201 Created`. The `Location` header tells where the new resource lives, such as `/books/3`. The body often holds the new resource with its id, so the client needs no second request.',
      'If the body is wrong, for example a field is missing, the server answers `400 Bad Request` with a short error in JSON. Nothing is stored.',
      'POST is not idempotent: each POST may create one more resource. If a POST times out, the client does not know if the server stored it. A blind retry can make a duplicate. Lesson I, idempotency, shows how to protect against that.'
    ],
    why: 'Creating needs a way to send data that is not in the URL yet. POST carries it in the body, and the server decides the id.',
    whenUse: 'To create a new resource when the server picks its id: a new order, a new user, a new comment. Also for actions that fit no other method, such as "send this email".',
    syntax: 'POST /collection with Content-Type: application/json and a JSON body → 201 Created, Location: /collection/{newId}',
    fileName: 'BookCreate.java',
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

public class BookCreate {
    static final List<String> TITLES = new ArrayList<>();

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/books", exchange -> {
            String json = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            String title = textField(json, "title");
            if (title == null) {
                reply(exchange, 400, """
                        {"error": "title is missing"}""");
                return;
            }
            TITLES.add(title);
            int id = TITLES.size();
            exchange.getResponseHeaders().set("Location", "/books/" + id);
            reply(exchange, 201, """
                    {"id": %d, "title": "%s"}""".formatted(id, title));
        });
        server.start();
        URI books = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/books");

        try (HttpClient client = HttpClient.newHttpClient()) {
            for (String field : List.of("title", "title", "name")) {
                HttpRequest request = HttpRequest.newBuilder(books)
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString("""
                                {"%s": "Momo"}""".formatted(field)))
                        .build();
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                String location = response.headers().firstValue("Location").orElse("-");
                System.out.println(response.statusCode() + " Location: " + location + " " + response.body());
            }
            System.out.println("Books on the server: " + TITLES);
        } finally {
            server.stop(0);
        }
    }

    // Finds "name": "value" in a small JSON text. Real programs use a JSON library.
    static String textField(String json, String name) {
        int at = json.indexOf('"' + name + '"');
        if (at < 0) return null;
        int start = json.indexOf('"', json.indexOf(':', at) + 1) + 1;
        return json.substring(start, json.indexOf('"', start));
    }

    static void reply(HttpExchange exchange, int status, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "application/json");
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream out = exchange.getResponseBody()) {
            out.write(bytes);
        }
    }
}`,
    output: `201 Location: /books/1 {"id": 1, "title": "Momo"}
201 Location: /books/2 {"id": 2, "title": "Momo"}
400 Location: - {"error": "title is missing"}
Books on the server: [Momo, Momo]`,
    codeSummary: 'The client posts three JSON bodies to `/books`. The first two are the same and create **two** books: POST is not idempotent. The third has the wrong field name and gets `400 Bad Request`.',
    codeExplanation: [
      { label: 'Line 20', code: 'String json = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);', text: 'Reads the whole request body as text.' },
      { label: 'Line 21', code: 'String title = textField(json, "title");', text: 'Looks for the field `title` in the JSON. `null` means it is not there.' },
      { label: 'Line 23', code: 'reply(exchange, 400, """', text: 'A bad body: answer `400 Bad Request` with a JSON error, store nothing, and `return`.' },
      { label: 'Line 28', code: 'int id = TITLES.size();', text: 'The **server** picks the new id. Here it is the position in the list, starting at 1.' },
      { label: 'Line 29', code: 'exchange.getResponseHeaders().set("Location", "/books/" + id);', text: 'Tells the client where the new book lives.' },
      { label: 'Line 30', code: 'reply(exchange, 201, """', text: '`201 Created` plus the new book with its id in the body.' },
      { label: 'Line 37', code: 'for (String field : List.of("title", "title", "name")) {', text: 'Three POSTs: two correct ones with the same title, one with the wrong field name.' },
      { label: 'Line 40', code: '.POST(HttpRequest.BodyPublishers.ofString("""', text: 'Method POST with a JSON body. The text block holds `{"title": "Momo"}` without any backslash.' },
      { label: 'Line 47', code: 'System.out.println("Books on the server: " + TITLES);', text: 'Two books called Momo. Sending the same POST twice made a duplicate.' },
      { label: 'Line 55', code: 'int at = json.indexOf(\'"\' + name + \'"\');', text: 'Searches for `"title"` with its quotes. `\'"\'` is the quote character, and `char + String` gives a `String`.' }
    ],
    sections: [
      {
        title: 'A POST and its answer as text',
        text: [
          'The request has a body and the two headers that describe it. The answer has `201`, a `Location` and the stored resource.'
        ],
        fileName: 'create-book.http',
        codeLanguage: 'http',
        code: `POST /books HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Length: 17

{"title": "Momo"}

HTTP/1.1 201 Created
Location: /books/1
Content-Type: application/json

{"id": 1, "title": "Momo"}`
      },
      {
        title: 'Which answer for which POST',
        text: ['A POST can end in several ways. Each has its own status code, so the client knows what happened without reading the body.'],
        table: {
          head: ['What happened', 'Status', 'Body'],
          rows: [
            ['a new resource was stored', '`201 Created` + `Location`', 'the new resource'],
            ['an action was done, nothing new to point to', '`200 OK`', 'the result'],
            ['accepted, work happens later', '`202 Accepted`', 'where to check the progress'],
            ['the JSON is broken or a field is missing', '`400 Bad Request`', 'an error message'],
            ['the body is not JSON at all', '`415 Unsupported Media Type`', 'an error message'],
            ['it already exists (same e-mail, say)', '`409 Conflict`', 'an error message']
          ]
        }
      },
      {
        title: 'Two clicks, two orders',
        text: [
          'A user clicks "Buy" twice because the page is slow. The browser sends two POSTs. The server cannot tell a double click from two real orders, so it stores two.',
          'The same happens when a client retries a POST after a timeout: the first one may have arrived, only its answer got lost.'
        ],
        mermaid: 'sequenceDiagram\n  participant U as Browser\n  participant S as Shop server\n  U->>S: POST /orders (first click)\n  U->>S: POST /orders (second click)\n  S-->>U: 201 Location: /orders/7\n  S-->>U: 201 Location: /orders/8\n  Note over S: two orders, one customer',
        diagramNote: 'Fixes: disable the button after the first click, and let the server spot repeats with an idempotency key (lesson I).'
      },
      {
        title: 'POST for actions',
        text: [
          'Some things are not "create a resource": cancel an order, send an e-mail, start a report. When no other method fits, use POST on a clear noun URL.',
          'Keep the noun style: the action is a sub-resource of the thing it acts on.'
        ],
        table: {
          head: ['Action', 'Request', 'Answer'],
          rows: [
            ['cancel order 7', '`POST /orders/7/cancellation`', '`200 OK` with the cancelled order'],
            ['send an e-mail', '`POST /emails`', '`202 Accepted`, it is sent later'],
            ['log in', '`POST /sessions` with name and password', '`201 Created` with a token']
          ]
        },
        tip: 'Before you reach for POST, check if PUT, PATCH or DELETE says it better. `PATCH /orders/7` with `{"status": "cancelled"}` is often the cleaner choice.'
      }
    ],
    technical: [
      '`BodyPublishers.ofString(text)` encodes the text as UTF-8 and sets `Content-Length` to the byte count. On the server, `getRequestBody()` is an `InputStream` that ends after exactly that many bytes.',
      'The JDK has no JSON parser. `textField` in the example is a toy: it fails on quotes inside values, numbers, nested objects. Real programs use a library such as Jackson or Gson, which turns JSON into Java objects and back. Spring Boot does this for you.',
      'A server must treat every body as untrusted: check that fields exist, have the right type and size, and answer 400 when not. Never build database commands from body text without checks.'
    ],
    tryIt: {
      steps: [
        'Run `BookCreate.java`.',
        'Add a fourth POST: put `"title"` once more at the end of the `List.of(...)`.',
        'Change the 201 answer to print the id as `"id": "%d"` (with quotes) and run it.'
      ],
      see: 'A third Momo with `Location: /books/3`. With the quotes the id becomes a JSON string, `"3"`, not a number. Both are valid JSON, but a client that expects a number would break.'
    },
    check: [
      { q: 'Why does a POST for a new book go to `/books` and not to `/books/3`?', a: 'The new book has no id yet. The server picks it and reports it in the `Location` header.' },
      { q: 'Which status and header does a good create answer have?', a: '`201 Created` and `Location: /books/{newId}`.' },
      { q: 'Why can a retried POST create a duplicate?', a: 'POST is not idempotent. If the first request arrived but its answer was lost, the retry creates a second resource.' }
    ],
    keyPoints: [
      'POST sends a body to a collection to create something new.',
      'The server picks the id and answers `201 Created` with `Location`.',
      'Set `Content-Type: application/json` when the body is JSON.',
      'Bad body: `400 Bad Request` and store nothing.',
      'POST is not idempotent: two sends can make two resources.'
    ],
    commonMistakes: [
      '`POST /books/3` to create a book with an id the client made up. Fix: `POST /books` and let the server pick, or use `PUT /books/3` if the client really owns the ids.',
      'Answering `200 OK` with no `Location` after a create. Fix: `201 Created` and `Location: /books/3`.',
      'Forgetting `Content-Type: application/json`. Some servers answer 415. Fix: `.header("Content-Type", "application/json")`.',
      'Retrying a payment POST after a timeout without any protection. Fix: send an `Idempotency-Key` header, see lesson I.'
    ],
    related: ['PUT, PATCH, DELETE', 'Idempotency', 'Status Codes'],
    glossary: G
  });
})();
