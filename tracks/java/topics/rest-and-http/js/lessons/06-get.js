// Lesson F: GET, the safe method for reading.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;

  T.lessons.push({
    num: '06',
    id: 'get',
    title: 'GET',
    category: 'methods',
    icon: 'GET',
    tagline: 'Read without changing anything',
    realWorld: 'Reading the menu in a restaurant. You can read it ten times. Nothing is cooked, nothing is paid, the kitchen does not even notice.',
    kid: [
      'GET means "show me". You ask: "Show me the books by Le Guin." The server looks and shows you a list.',
      'Looking never breaks anything. You can look once, twice or a hundred times. The books stay the same.',
      'If you want only some things, you add a little note to the address after a question mark: `?author=Le+Guin`. That note is the **query string**.'
    ],
    definition: '**GET** asks the server for a representation of a resource. It is a **safe method** (it must not change data) and **idempotent** (asking twice is the same as asking once). It usually has no body. Filters go in the query string.',
    explain: [
      'A GET request names what you want in the URL. `GET /books` asks for the collection, `GET /books/2` for one book. The answer is usually `200 OK` with JSON in the body, or `404 Not Found`.',
      'The **query string** is the part after `?`. It holds `name=value` pairs joined by `&`: `/books?author=Le+Guin&limit=2`. Use it for filters, sorting and pages. The path names *which* resource, the query says *how* you want to see it.',
      'Some characters have a meaning in URLs: space, `&`, `=`, `?`, `#`, `%`. Inside a value they must be **encoded**. `URLEncoder.encode("Le Guin", UTF_8)` gives `Le+Guin`. On the server `URLDecoder.decode` turns it back.',
      '**Safe** means: the client does not ask for any change. Browsers, search engines and link previews send GET requests on their own, all the time. If a GET deleted something, a search robot could empty your database by following links.',
      'Because GET is safe and idempotent, its answers may be **cached**: kept and reused for a while. The server says how long with a header such as `Cache-Control: max-age=60`.'
    ],
    why: 'Reading is the most common thing a client does. One clear method for "only read" lets browsers, caches and robots treat those requests safely.',
    whenUse: 'Every time you only read: a list, one item, a search, a page of results. Never for anything that creates, changes or deletes.',
    syntax: 'GET /collection   GET /collection/{id}   GET /collection?filter=value&sort=field&limit=10',
    fileName: 'BookSearch.java',
    code: `import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

public class BookSearch {
    static final String[][] BOOKS = {
        {"A Wizard of Earthsea", "Le Guin"}, {"Dune", "Herbert"}, {"The Dispossessed", "Le Guin"}
    };

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/books", exchange -> {
            String raw = exchange.getRequestURI().getRawQuery();             // "author=Le+Guin"
            String author = URLDecoder.decode(raw.substring("author=".length()), StandardCharsets.UTF_8);
            List<String> titles = new ArrayList<>();
            for (String[] book : BOOKS) {
                if (book[1].equals(author)) titles.add(book[0]);
            }
            byte[] body = String.join(" | ", titles).getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, body.length);
            try (OutputStream out = exchange.getResponseBody()) {
                out.write(body);
            }
        });
        server.start();
        String base = "http://127.0.0.1:" + server.getAddress().getPort();

        try (HttpClient client = HttpClient.newHttpClient()) {
            String query = "author=" + URLEncoder.encode("Le Guin", StandardCharsets.UTF_8);
            HttpRequest request = HttpRequest.newBuilder(URI.create(base + "/books?" + query)).GET().build();
            for (int i = 1; i <= 2; i++) {
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                System.out.println("GET /books?" + query + " -> " + response.statusCode() + " " + response.body());
            }
            System.out.println("Books on the server: " + BOOKS.length);
        } finally {
            server.stop(0);
        }
    }
}`,
    output: `GET /books?author=Le+Guin -> 200 A Wizard of Earthsea | The Dispossessed
GET /books?author=Le+Guin -> 200 A Wizard of Earthsea | The Dispossessed
Books on the server: 3`,
    codeSummary: 'The client searches the books by author with a query string. It sends the same GET twice and gets the same answer twice. The server still has its three books: GET only reads.',
    codeExplanation: [
      { label: 'Line 15', code: 'static final String[][] BOOKS = {', text: 'The data: each inner array is `{title, author}`. See [arrays](../arrays/index.html).' },
      { label: 'Line 22', code: 'String raw = exchange.getRequestURI().getRawQuery();             // "author=Le+Guin"', text: '`getRawQuery()` gives the query exactly as sent, still encoded.' },
      { label: 'Line 23', code: 'String author = URLDecoder.decode(raw.substring("author=".length()), StandardCharsets.UTF_8);', text: 'Cuts off `author=` and decodes the value: `Le+Guin` becomes `Le Guin`.' },
      { label: 'Line 25', code: 'for (String[] book : BOOKS) {', text: 'Goes through all books and keeps the titles of that author. Nothing is changed: a GET handler only reads.' },
      { label: 'Line 38', code: 'String query = "author=" + URLEncoder.encode("Le Guin", StandardCharsets.UTF_8);', text: 'Encodes the value for the URL. The space becomes `+`. Without it, `URI.create` throws an error, because a space is not allowed in a URL.' },
      { label: 'Line 39', code: 'HttpRequest request = HttpRequest.newBuilder(URI.create(base + "/books?" + query)).GET().build();', text: 'One GET request. A request object can be sent many times.' },
      { label: 'Line 40', code: 'for (int i = 1; i <= 2; i++) {', text: 'Sends the same request twice, to show that GET is idempotent: same question, same answer, no change.' },
      { label: 'Line 44', code: 'System.out.println("Books on the server: " + BOOKS.length);', text: 'Still 3. Reading did not change the data: GET is safe.' }
    ],
    sections: [
      {
        title: 'A GET request as text',
        text: [
          'A GET has a request line, headers and an empty line. It has no body. Everything the server needs is in the URL and the headers.',
          '`Accept` says which format the client wants back.'
        ],
        fileName: 'get-books.http',
        codeLanguage: 'http',
        code: `GET /books?author=Le+Guin&limit=2 HTTP/1.1
Host: api.example.com
Accept: application/json`
      },
      {
        title: 'Path or query string?',
        text: ['A simple test: does the part name **one thing**, or does it say **how to look** at things?'],
        table: {
          head: ['You want …', 'Put it in', 'Example'],
          rows: [
            ['one book by its id', 'the path', '`GET /books/2`'],
            ['the reviews of book 2', 'the path', '`GET /books/2/reviews`'],
            ['only books by one author', 'the query', '`GET /books?author=Le+Guin`'],
            ['sorted by year, newest first', 'the query', '`GET /books?sort=-year`'],
            ['the second page of 20', 'the query', '`GET /books?page=2&size=20`']
          ],
          note: 'A missing filter means "no filter": `GET /books` returns all books.'
        }
      },
      {
        title: 'Encode values for the URL',
        text: [
          'Spaces and signs such as `&` or `=` would break the query. `URLEncoder.encode` replaces them with safe codes: a space becomes `+`, other signs become `%` and two hex digits.',
          'Encode each **value**, not the whole URL. Otherwise the `?` and `=` that you need are encoded too.'
        ],
        fileName: 'EncodeDemo.java',
        code: `import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class EncodeDemo {
    public static void main(String[] args) {
        String[] values = {"Le Guin", "rock & roll", "café", "a=b?c", "100%"};
        for (String value : values) {
            String encoded = URLEncoder.encode(value, StandardCharsets.UTF_8);
            String back = URLDecoder.decode(encoded, StandardCharsets.UTF_8);
            System.out.println(value + " -> " + encoded + " -> " + back);
        }
    }
}`,
        output: `Le Guin -> Le+Guin -> Le Guin
rock & roll -> rock+%26+roll -> rock & roll
café -> caf%C3%A9 -> café
a=b?c -> a%3Db%3Fc -> a=b?c
100% -> 100%25 -> 100%`,
        tip: '`é` becomes `%C3%A9`: two bytes in UTF-8, each written as `%` and two hex digits.'
      },
      {
        title: 'Never change data with GET',
        text: [
          'Link previews in chat apps, search robots and browsers that load pages early all send GET requests nobody asked for. A GET that deletes is a trap.',
          'Ask yourself: "Is it fine if a robot sends this 100 times?" If not, it is not a GET.'
        ],
        mermaid: 'sequenceDiagram\n  participant R as Search robot\n  participant S as Server\n  R->>S: GET /books/2/delete (found as a link)\n  S-->>R: 200 OK\n  Note over S: book 2 is gone, nobody wanted that\n  R->>S: GET /books/3/delete\n  S-->>R: 200 OK',
        diagramNote: 'The robot only reads links. With `DELETE /books/2` it could never remove a book, because robots do not send DELETE.',
        table: {
          head: ['Wrong', 'Right'],
          rows: [
            ['`GET /books/2/delete`', '`DELETE /books/2`'],
            ['`GET /orders/create?item=7`', '`POST /orders` with a body'],
            ['`GET /login?password=secret`', '`POST /login` with the password in the body']
          ],
          note: 'URLs end up in browser history and server logs. Never put passwords or keys in a query string.'
        }
      }
    ],
    technical: [
      'HTTP allows a body on GET, but it has no defined meaning. Many servers, proxies and caches drop it. The builder method `GET()` takes no body for that reason. Keep GET without a body.',
      'Caches are allowed to store GET responses and answer later requests from the copy. `Cache-Control: max-age=60` says "this copy is good for 60 seconds". With an `ETag` header the client can ask "has it changed?" and get a short `304 Not Modified` with no body.',
      '`HEAD` is GET without the body: same status and headers, nothing else. Clients use it to check if a resource exists or how big it is, without downloading it.',
      'URLs have a length limit in practice (often around 8 000 characters). A search with very many fields is sometimes sent as `POST /books/search` with a JSON body. That is a trade-off, because POST answers are not cached.'
    ],
    tryIt: {
      steps: [
        'Run `BookSearch.java`.',
        'Change `"Le Guin"` in the client to `"Herbert"`.',
        'Change it to `"Nobody"`.'
      ],
      see: 'With Herbert: `200 Dune`. With Nobody: `200` and an empty body. An empty list is still a correct answer to "show me".'
    },
    check: [
      { q: 'Why must a GET request never delete anything?', a: 'GET is safe. Browsers, robots and link previews send GETs by themselves, so a deleting GET would delete things nobody asked to delete.' },
      { q: 'Where do you put "only books from 1990": in the path or the query string?', a: 'In the query string: `GET /books?year=1990`. It filters the collection, it is not a new resource.' },
      { q: 'What does `URLEncoder.encode("rock & roll", UTF_8)` return, and why?', a: '`rock+%26+roll`. A raw `&` would start a new query pair, so it is encoded as `%26`, and spaces become `+`.' }
    ],
    keyPoints: [
      'GET reads. It is safe (no change) and idempotent (twice = once).',
      'The path names the resource, the query string filters and sorts.',
      'Encode query values with `URLEncoder.encode(value, UTF_8)`.',
      'GET has no body. Answers can be cached.',
      'No secrets in URLs: they land in logs and history.'
    ],
    commonMistakes: [
      '`GET /books/2/delete`. Fix: `DELETE /books/2`.',
      '`URI.create(base + "/books?author=Le Guin")` with a raw space. It throws `IllegalArgumentException`. Fix: encode the value with `URLEncoder.encode`.',
      'Encoding the whole URL: `URLEncoder.encode("http://x/books?a=1", UTF_8)`. Fix: encode only the values.',
      'Putting a password or API key in the query string. Fix: send it in a header or in a POST body.'
    ],
    related: ['POST', 'Idempotency', 'Designing URLs'],
    glossary: G
  });
})();
