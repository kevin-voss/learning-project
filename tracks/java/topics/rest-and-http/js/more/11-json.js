// Lesson K: JSON basics and a predictable payload shape.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;

  T.lessons.push({
    num: '11',
    id: 'request-response-shape',
    title: 'JSON Basics and Payload Shape',
    category: 'design',
    icon: '{}',
    tagline: 'Write data as text both sides can read',
    realWorld: 'A form with labelled boxes: "Name: ____", "Age: ____". Everyone who gets the form knows where to look for the name. If each form had the boxes in other places with other labels, nobody could read them fast.',
    kid: [
      'JSON is a way to write down things so that a computer on the other side can read them. It uses curly brackets `{ }` for one thing with labels, and square brackets `[ ]` for a list.',
      'A book in JSON looks like this: `{"title": "Momo", "pages": 300}`. The label is on the left, the value on the right, with a colon in between. Text values have quotes, numbers do not.',
      'If everybody writes their books the same way, with the same labels, everybody can read them. That agreement is the **shape**.'
    ],
    definition: '**JSON** (JavaScript Object Notation) is a text format for data. It has objects `{"key": value}`, arrays `[...]`, strings, numbers, `true`, `false` and `null`. The **payload shape** is the agreed set of fields an endpoint sends and expects.',
    explain: [
      'An **object** is a set of `"key": value` pairs inside `{ }`, separated by commas. Keys are always strings in double quotes. An **array** is an ordered list of values inside `[ ]`.',
      'A value is one of six kinds: string (`"Momo"`), number (`42`, `3.5`), boolean (`true`, `false`), `null` (no value), an object or an array. Objects and arrays can sit inside each other as deep as you need.',
      'JSON is strict: double quotes only, no comma after the last item, no comments. One small mistake and the whole text cannot be read. The server should then answer `400 Bad Request`.',
      'The **shape** is the contract between client and server: which fields exist, their types, which may be missing or `null`. Keep it stable. A client written today should still work next month.',
      'The JDK can send and receive JSON as text, but it has no built-in JSON parser. Real projects use a library such as Jackson or Gson to turn JSON into Java objects and back. On this page you build small JSON texts by hand with a **text block**, to see what really travels.'
    ],
    why: 'Client and server may use different languages. JSON is plain text that every language can read and write, and it is easy for people to read too.',
    whenUse: 'In almost every REST request body and response body. Always together with the header `Content-Type: application/json`.',
    syntax: '{"key": "text", "count": 3, "ok": true, "missing": null, "list": [1, 2], "inner": {"a": 1}}',
    fileName: 'JsonShape.java',
    code: `import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class JsonShape {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/books", exchange -> {
            String json = """
                    {
                      "data": [
                        {"id": 1, "title": "Momo", "author": {"name": "Michael Ende"}, "tags": ["fantasy", "kids"], "inStock": true},
                        {"id": 2, "title": "Emma", "author": {"name": "Jane Austen"}, "tags": [], "inStock": false}
                      ],
                      "page": %d,
                      "total": 2,
                      "next": null
                    }""".formatted(1);
            byte[] body = json.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, body.length);
            try (OutputStream out = exchange.getResponseBody()) {
                out.write(body);
            }
        });
        server.start();
        URI books = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/books");

        try (HttpClient client = HttpClient.newHttpClient()) {
            HttpRequest request = HttpRequest.newBuilder(books).header("Accept", "application/json").build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String type = response.headers().firstValue("Content-Type").orElse("");
            if (type.startsWith("application/json")) {
                System.out.println(response.body());
            } else {
                System.out.println("Not JSON: " + type);
            }
        } finally {
            server.stop(0);
        }
    }
}`,
    output: `{
  "data": [
    {"id": 1, "title": "Momo", "author": {"name": "Michael Ende"}, "tags": ["fantasy", "kids"], "inStock": true},
    {"id": 2, "title": "Emma", "author": {"name": "Jane Austen"}, "tags": [], "inStock": false}
  ],
  "page": 1,
  "total": 2,
  "next": null
}`,
    codeSummary: 'The server sends one page of a book list as JSON. It uses every kind of JSON value: objects, arrays, strings, numbers, booleans and `null`. The client checks the `Content-Type` before it treats the body as JSON.',
    codeExplanation: [
      { label: 'Line 14', code: 'String json = """', text: 'A **text block** starts. It ends at the next `"""`. Quotes inside need no backslash, and the common indentation is removed.' },
      { label: 'Line 15', code: '{', text: 'The outer object, the **envelope**. It holds the list and facts about the list.' },
      { label: 'Line 16', code: '"data": [', text: 'An array: the books on this page, in order.' },
      { label: 'Line 17', code: '{"id": 1, "title": "Momo", "author": {"name": "Michael Ende"}, "tags": ["fantasy", "kids"], "inStock": true},', text: 'One book: a number, a string, a nested object, an array of strings and a boolean. A comma separates it from the next book.' },
      { label: 'Line 18', code: '"tags": [], "inStock": false}', text: 'An empty array is still an array. Send `[]`, not `null`, when a list has no items. No comma after the last book.' },
      { label: 'Line 22', code: '"next": null', text: '`null`: there is no next page. The key is there, so the client knows the field exists.' },
      { label: 'Line 23', code: '}""".formatted(1);', text: '`formatted(1)` puts the page number where `%d` stands. Closing `"""` right after `}` means no line break at the end.' },
      { label: 'Line 25', code: 'exchange.getResponseHeaders().set("Content-Type", "application/json");', text: 'The label for the body. Without it the client has to guess.' },
      { label: 'Line 38', code: 'if (type.startsWith("application/json")) {', text: '`startsWith`, because the header may also carry a charset: `application/json; charset=utf-8`.' }
    ],
    sections: [
      {
        title: 'Six kinds of values',
        text: ['Every JSON value is one of these. The right column shows what a JSON library turns it into in Java.'],
        table: {
          head: ['JSON kind', 'Example', 'In Java usually'],
          rows: [
            ['string', '`"Momo"`', '`String`'],
            ['number', '`42`, `-3.5`, `1e3`', '`int`, `long`, `double`'],
            ['boolean', '`true`, `false`', '`boolean`'],
            ['null', '`null`', '`null`'],
            ['array', '`["fantasy", "kids"]`', '`List<String>`'],
            ['object', '`{"name": "Michael Ende"}`', 'an object of your class, or a `Map<String, Object>`']
          ],
          note: 'JSON has no date type. Send dates as strings in the ISO form: `"2026-10-21"` or `"2026-10-21T15:30:00Z"`.'
        }
      },
      {
        title: 'Five mistakes that break JSON',
        text: ['Each line in the first block breaks the whole text. The second block is the same data, written correctly.'],
        fileName: 'broken.json',
        codeLanguage: 'json',
        code: `{
  'title': 'Momo',          // 1. single quotes, and 2. a comment
  pages: 300,               // 3. key without quotes
  "price": NaN,             // 4. NaN is not a JSON number
  "tags": ["fantasy",],     // 5. comma after the last item
}`,
        tip: 'Correct: `{"title": "Momo", "pages": 300, "price": null, "tags": ["fantasy"]}`. Paste unsure JSON into any JSON checker before you blame your Java code.'
      },
      {
        title: 'Escape quotes when you build JSON by hand',
        text: [
          'A title can hold a quote, such as `The "Best" Cake`. Glued into JSON as it is, the quote ends the string too early and the JSON breaks. Inside a JSON string, `"` must be written `\\"` and a backslash as `\\\\`.',
          'This is the main reason to use a JSON library in real code: it escapes for you.'
        ],
        fileName: 'JsonEscape.java',
        code: `public class JsonEscape {
    public static void main(String[] args) {
        String title = "The \\"Best\\" Cake";
        System.out.println("naive:   {\\"title\\": \\"" + title + "\\"}");
        System.out.println("escaped: {\\"title\\": \\"" + escape(title) + "\\"}");
    }

    // Puts a backslash in front of every quote and every backslash.
    static String escape(String text) {
        StringBuilder out = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (c == '"' || c == '\\\\') {
                out.append('\\\\');
            }
            out.append(c);
        }
        return out.toString();
    }
}`,
        output: `naive:   {"title": "The "Best" Cake"}
escaped: {"title": "The \\"Best\\" Cake"}`,
        warn: 'The naive line is not valid JSON: after `"The "` the parser sees `Best` outside any string and stops.'
      },
      {
        title: 'Keep the shape predictable',
        text: [
          'A good API looks the same everywhere. Lists come in the same envelope, single items look like the items in the list, errors always have the same fields.',
          'Clients can then use one piece of code for every endpoint.'
        ],
        table: {
          head: ['Do', 'Do not'],
          rows: [
            ['the same names everywhere, in `camelCase`: `inStock`', '`in_stock` here, `InStock` there'],
            ['`[]` for an empty list', '`null` for an empty list'],
            ['ids of one type: always numbers, or always strings', '`"id": 1` here, `"id": "1"` there'],
            ['errors as `{"error": {"code": "...", "message": "..."}}`', 'a plain text error on one endpoint, JSON on another'],
            ['new fields added, old fields kept', 'a field renamed without warning']
          ]
        },
        mermaid: 'flowchart LR\n  A["Java object in the server"] -->|"serialize: object to JSON"| B["JSON text in the body"]\n  B -->|"parse: JSON to object"| C["Object in the client"]',
        diagramNote: 'A JSON library does both arrows. The shape is what both sides agree to put in the middle.'
      }
    ],
    technical: [
      'JSON text is always Unicode, and on the web it is sent as UTF-8. That is why every example writes `getBytes(StandardCharsets.UTF_8)`. Without the charset, Java uses the platform default, which may differ between computers.',
      'A text block removes the indentation that all its lines share, measured from the closing `"""` or the least indented line. Line breaks inside it become `\\n`. Its content is a normal `String`, so `formatted(...)` works like `String.format`.',
      'A JSON library such as Jackson reads the text character by character and builds Java objects. It checks the syntax, escapes strings correctly and handles numbers, nesting and dates. Spring Boot uses Jackson by itself: you return a Java object from a method and the client receives JSON.',
      'JSON numbers have no fixed size. A very big id such as `9007199254740993` may lose its last digits in JavaScript clients. Many APIs send big ids as strings for that reason.'
    ],
    tryIt: {
      steps: [
        'Run `JsonShape.java`.',
        'Add a third book `{"id": 3, "title": "Heidi", ...}` and change `"total": 2` to `3`. Do not forget the comma after the second book.',
        'Now put a comma after the third book as well and look at the JSON in any JSON checker.'
      ],
      see: 'Three books in the output. Java prints the text with the extra comma all the same, because for Java it is only a `String`. The JSON checker reports an error: a client could not read it.'
    },
    check: [
      { q: 'Which of these is valid JSON: `{"a": 1,}` or `{"a": 1}`?', a: '`{"a": 1}`. A comma after the last item is not allowed.' },
      { q: 'A user has no phone numbers. Should the API send `"phones": null` or `"phones": []`?', a: '`"phones": []`. An empty list is still a list, so the client can loop over it without a null check.' },
      { q: 'Why is building JSON with `+` risky?', a: 'Values with quotes or backslashes break the text unless you escape them. A JSON library does that for you.' }
    ],
    keyPoints: [
      'JSON has objects `{}`, arrays `[]`, strings, numbers, `true`/`false` and `null`.',
      'Keys and strings use double quotes. No trailing commas, no comments.',
      'Send `Content-Type: application/json` and UTF-8 bytes.',
      'A stable shape: same names, same types, same envelope, same error format.',
      'Real code uses a JSON library such as Jackson. The JDK has none built in.'
    ],
    commonMistakes: [
      '`{\'title\': \'Momo\'}` with single quotes. Fix: `{"title": "Momo"}`.',
      '`"tags": null` for an empty list. Fix: `"tags": []`.',
      'Gluing user text into JSON with `+`. A quote in the text breaks it. Fix: escape it, or use a JSON library.',
      'Renaming a field from `title` to `name` in a live API. Old clients break. Fix: add the new field and keep the old one for a while.'
    ],
    related: ['Request and Response Anatomy', 'Status Codes', 'Designing URLs'],
    glossary: G
  });
})();
