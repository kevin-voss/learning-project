// Lesson H: PUT replaces, PATCH changes a part, DELETE removes.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;

  T.lessons.push({
    num: '08',
    id: 'put-patch-delete',
    title: 'PUT, PATCH, DELETE',
    category: 'methods',
    icon: 'Δ',
    tagline: 'Replace, change a part, or remove',
    realWorld: 'A card in a box of recipe cards. PUT throws the old card away and puts in a new, complete card. PATCH takes a pen and fixes one line on the card. DELETE takes the card out of the box.',
    kid: [
      'You have a drawing of a house. **PUT** means: "Here is a whole new drawing, throw the old one away." Whatever is not on the new drawing is gone.',
      '**PATCH** means: "Keep the drawing, only paint the door red." Everything else stays.',
      '**DELETE** means: "Throw the drawing away." If you ask to throw it away again, there is nothing left to throw, and that is fine.'
    ],
    definition: '**PUT** replaces the whole resource at a URL with the body. **PATCH** changes only the fields in the body. **DELETE** removes the resource. All three go to the item URL, such as `/books/1`. PUT and DELETE are idempotent, PATCH usually is too, but HTTP does not promise it.',
    explain: [
      '**PUT** sends the complete new version. The server stores exactly that. A field you leave out is gone afterwards. Use PUT when the client has the whole resource, for example after an edit form with all fields.',
      '**PATCH** sends only what changes: `{"year": "1815"}`. The server merges it into the stored resource. This is handy for big resources and small edits, like ticking a to-do as done.',
      '**DELETE** has no body. A good answer is `204 No Content`: it worked, there is nothing to send. A second DELETE of the same item finds nothing and answers `404`. The server state is the same after one or two DELETEs, so DELETE is idempotent.',
      'All three answer `404 Not Found` when the item does not exist (PUT may create it instead, see below). They answer `200 OK` with the new version, or `204 No Content` with no body.',
      'In Java the builder has `.PUT(publisher)` and `.DELETE()`. For PATCH there is no own method, so you write `.method("PATCH", publisher)`.'
    ],
    why: 'Clear methods for "replace", "change a part" and "remove" make an API easy to guess, and they tell the client which requests are safe to retry.',
    whenUse: 'PUT when the client sends the full resource. PATCH for small changes to a few fields. DELETE to remove a resource.',
    syntax: 'PUT /books/{id} + full JSON   PATCH /books/{id} + changed fields   DELETE /books/{id} (no body)',
    fileName: 'BookUpdate.java',
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
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class BookUpdate {
    static Map<String, String> book = new LinkedHashMap<>(); // book 1 on the server

    public static void main(String[] args) throws Exception {
        book.put("title", "Emma");
        book.put("author", "Austen");
        book.put("year", "1815");
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/books/1", exchange -> {
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            switch (exchange.getRequestMethod()) {
                case "GET" -> reply(exchange, book == null ? 404 : 200, book == null ? "" : toJson(book));
                case "PUT" -> { book = readFlatJson(body); reply(exchange, 200, toJson(book)); }      // replace all
                case "PATCH" -> { book.putAll(readFlatJson(body)); reply(exchange, 200, toJson(book)); } // merge
                case "DELETE" -> { book = null; reply(exchange, 204, ""); }
                default -> reply(exchange, 405, "");
            }
        });
        server.start();
        URI uri = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/books/1");

        try (HttpClient client = HttpClient.newHttpClient()) {
            call(client, "GET", uri, null);
            call(client, "PUT", uri, """
                    {"title": "Emma", "author": "Jane Austen"}""");
            call(client, "PATCH", uri, """
                    {"year": "1815"}""");
            call(client, "DELETE", uri, null);
            call(client, "GET", uri, null);
        } finally {
            server.stop(0);
        }
    }

    static void call(HttpClient client, String method, URI uri, String json) throws Exception {
        HttpRequest.BodyPublisher body = (json == null)
                ? HttpRequest.BodyPublishers.noBody()
                : HttpRequest.BodyPublishers.ofString(json);
        HttpRequest request = HttpRequest.newBuilder(uri).method(method, body).build();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(method + " -> " + response.statusCode() + " " + response.body());
    }

    // A toy reader for flat JSON with text values: {"a": "1", "b": "2"}.
    static Map<String, String> readFlatJson(String json) {
        Map<String, String> fields = new LinkedHashMap<>();
        String inner = json.trim().substring(1, json.trim().length() - 1);
        for (String pair : inner.split(",")) {
            String[] parts = pair.split(":");
            fields.put(unquote(parts[0]), unquote(parts[1]));
        }
        return fields;
    }

    static String unquote(String text) { return text.trim().replace(String.valueOf('"'), ""); }

    static String quote(String text) { return '"' + text + '"'; }

    static String toJson(Map<String, String> fields) {
        List<String> pairs = new ArrayList<>();
        for (Map.Entry<String, String> field : fields.entrySet()) {
            pairs.add(quote(field.getKey()) + ": " + quote(field.getValue()));
        }
        return "{" + String.join(", ", pairs) + "}";
    }

    static void reply(HttpExchange exchange, int status, String json) throws IOException {
        byte[] bytes = json.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(status, bytes.length == 0 ? -1 : bytes.length);
        try (OutputStream out = exchange.getResponseBody()) {
            out.write(bytes);
        }
    }
}`,
    output: `GET -> 200 {"title": "Emma", "author": "Austen", "year": "1815"}
PUT -> 200 {"title": "Emma", "author": "Jane Austen"}
PATCH -> 200 {"title": "Emma", "author": "Jane Austen", "year": "1815"}
DELETE -> 204
GET -> 404`,
    codeSummary: 'One book lives on the server. The client reads it, replaces it with PUT (the year is gone, because the new version has none), adds the year back with PATCH, deletes it, and gets 404 when it reads again.',
    codeExplanation: [
      { label: 'Line 17', code: 'static Map<String, String> book = new LinkedHashMap<>(); // book 1 on the server', text: 'The resource: field names and values. A `LinkedHashMap` keeps the order you put things in, so the JSON always has the same order. See [collections](../collections/index.html).' },
      { label: 'Line 26', code: 'switch (exchange.getRequestMethod()) {', text: 'One URL, four methods. Each `case` is one meaning.' },
      { label: 'Line 28', code: 'case "PUT" -> { book = readFlatJson(body); reply(exchange, 200, toJson(book)); }      // replace all', text: 'PUT throws the old map away and stores the new one. Fields that are not in the body are gone.' },
      { label: 'Line 29', code: 'case "PATCH" -> { book.putAll(readFlatJson(body)); reply(exchange, 200, toJson(book)); } // merge', text: '`putAll` adds new fields and overwrites the ones sent. All other fields stay.' },
      { label: 'Line 30', code: 'case "DELETE" -> { book = null; reply(exchange, 204, ""); }', text: 'Removes the book. `204 No Content`: done, no body.' },
      { label: 'Line 40', code: '{"title": "Emma", "author": "Jane Austen"}""");', text: 'The full new version for PUT. It has no `year`, so after the PUT the book has no year.' },
      { label: 'Line 42', code: '{"year": "1815"}""");', text: 'PATCH sends only the field that changes.' },
      { label: 'Line 54', code: 'HttpRequest request = HttpRequest.newBuilder(uri).method(method, body).build();', text: '`.method(name, body)` works for any method, also PATCH. `noBody()` is the publisher for "no body".' },
      { label: 'Line 84', code: 'exchange.sendResponseHeaders(status, bytes.length == 0 ? -1 : bytes.length);', text: 'An empty body is sent as `-1`, "no body". The 204 and the 404 here have none.' }
    ],
    sections: [
      {
        title: 'PUT and PATCH with the same body',
        text: [
          'The difference shows best with the same small body. Start with the book `{"title": "Emma", "author": "Austen", "year": "1815"}` and send `{"author": "Jane Austen"}`.'
        ],
        table: {
          head: ['Method', 'The book afterwards', 'Why'],
          rows: [
            ['`PUT /books/1`', '`{"author": "Jane Austen"}`', 'the body **is** the new book; title and year are gone'],
            ['`PATCH /books/1`', '`{"title": "Emma", "author": "Jane Austen", "year": "1815"}`', 'only `author` changes']
          ],
          note: 'With PUT, always send every field. With PATCH, send only what changes.'
        }
      },
      {
        title: 'The three requests as text',
        text: ['PUT and PATCH have a JSON body. DELETE has none.'],
        fileName: 'change-book.http',
        codeLanguage: 'http',
        code: `PUT /books/1 HTTP/1.1
Content-Type: application/json

{"title": "Emma", "author": "Jane Austen", "year": "1815"}

PATCH /books/1 HTTP/1.1
Content-Type: application/json

{"year": "1816"}

DELETE /books/1 HTTP/1.1`
      },
      {
        title: 'The whole life of one resource',
        text: ['Put the methods together and you get the life of a resource. People call these four jobs **CRUD**: create, read, update, delete.'],
        mermaid: 'stateDiagram-v2\n  [*] --> Stored: POST /books (201)\n  Stored --> Stored: GET /books/1 (200)\n  Stored --> Stored: PUT or PATCH /books/1 (200)\n  Stored --> Gone: DELETE /books/1 (204)\n  Gone --> Gone: GET or DELETE /books/1 (404)\n  Gone --> [*]',
        diagramNote: 'Each arrow is one request with its usual status code. After DELETE every request to that URL finds nothing.',
        table: {
          head: ['CRUD', 'Method', 'URL', 'Success'],
          rows: [
            ['Create', '`POST`', '`/books`', '`201 Created`'],
            ['Read', '`GET`', '`/books/1`', '`200 OK`'],
            ['Update', '`PUT` / `PATCH`', '`/books/1`', '`200 OK` or `204`'],
            ['Delete', '`DELETE`', '`/books/1`', '`204 No Content`']
          ]
        }
      },
      {
        title: 'PUT can create, DELETE can hide',
        text: [
          'If the **client** owns the id, PUT can create: `PUT /users/ada/settings` stores the settings whether they existed or not. The answer is `201 Created` the first time and `200 OK` later.',
          'Many servers do not really erase on DELETE. They set a mark such as `deleted: true` and hide the item. This is a **soft delete**. For the client it looks the same: the next GET answers 404.'
        ],
        warn: 'Never use PUT for a partial update. A client that sends only `{"year": "1816"}` with PUT wipes the title and the author.'
      }
    ],
    technical: [
      '`HttpRequest.Builder` has `GET()`, `POST(..)`, `PUT(..)`, `DELETE()` and the general `method(name, publisher)`. PATCH came after the first HTTP rules, so it got no own builder method.',
      'The JDK `HttpURLConnection`, the old client class from Java 1.1, cannot send PATCH at all. That is one reason to use the newer `HttpClient`.',
      'There are two standard PATCH formats. **JSON Merge Patch** (`Content-Type: application/merge-patch+json`) is what the example does: send the fields, they replace the old ones. **JSON Patch** (`application/json-patch+json`) sends a list of steps such as `{"op": "replace", "path": "/year", "value": "1816"}`.',
      'A PATCH like `{"op": "add"}` to a list, or "add 1 to the counter", gives a different result each time. That is why HTTP does not call PATCH idempotent in general.'
    ],
    tryIt: {
      steps: [
        'Run `BookUpdate.java`.',
        'Change the PUT body to `{"title": "Persuasion"}`.',
        'Add a second `call(client, "DELETE", uri, null);` right after the first one.'
      ],
      see: 'After the PUT the book is only `{"title": "Persuasion"}`; the PATCH adds the year. The second DELETE also says `204` here, because this toy server does not check. A careful server says `404`: there is nothing left to delete.'
    },
    check: [
      { q: 'The book has title, author and year. You send `PUT` with only `{"year": "1816"}`. What is stored?', a: 'Only `{"year": "1816"}`. PUT replaces the whole resource.' },
      { q: 'How do you send a PATCH with `HttpClient`?', a: '`HttpRequest.newBuilder(uri).method("PATCH", HttpRequest.BodyPublishers.ofString(json)).build()`.' },
      { q: 'Why is `DELETE /books/1` idempotent, even though the second answer is 404?', a: 'Idempotent is about the server state, not the answer. After one or two DELETEs the book is gone either way.' }
    ],
    keyPoints: [
      'PUT replaces the whole resource. Send every field.',
      'PATCH changes only the fields you send.',
      'DELETE removes. `204 No Content` is the usual answer.',
      'All three go to the item URL, `/books/{id}`.',
      'In Java: `.PUT(..)`, `.method("PATCH", ..)`, `.DELETE()`.'
    ],
    commonMistakes: [
      'Sending a few fields with PUT. The others are wiped. Fix: use PATCH for partial changes.',
      'Looking for `.PATCH(...)` on the builder. Fix: `.method("PATCH", publisher)`.',
      '`DELETE /books` to remove one book. That would mean "remove all books". Fix: `DELETE /books/1`.',
      'Answering `200` with an empty body after DELETE. Fix: use `204 No Content`, which says "there is no body".'
    ],
    related: ['POST', 'Idempotency', 'Status Codes'],
    glossary: G
  });
})();
