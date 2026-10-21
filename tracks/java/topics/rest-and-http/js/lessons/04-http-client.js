// Lesson D: calling an API from Java with java.net.http.HttpClient.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;

  T.lessons.push(
    {
      num: '04',
      id: 'java-http-client',
      title: 'Calling an API with HttpClient',
      category: 'java',
      icon: '→',
      tagline: 'Build a request, send it, read the response',
      realWorld: 'Posting a letter and waiting at the letterbox. You write the letter, put it in an envelope with an address, drop it in and wait until the answer comes back.',
      kid: [
        'To ask a server something from Java you need three things. A **messenger** who runs to the server: `HttpClient`. A **note** with your question: `HttpRequest`. And the **answer** the messenger brings back: `HttpResponse`.',
        'You write the note with a builder: "to this address, please, with this label, and this is a GET". Then you say `build()` and the note is ready.',
        'The messenger runs with `send`. You stand and wait until he is back. Then you look at the answer: the number on top, and the text inside.'
      ],
      definition: '`java.net.http.HttpClient` sends HTTP requests from Java. You build an `HttpRequest` with a builder, call `client.send(request, bodyHandler)`, and get an `HttpResponse` with the status code, the headers and the body.',
      explain: [
        'The package `java.net.http` is part of the JDK since Java 11, so you need no library. It has three main types: `HttpClient` (sends), `HttpRequest` (what to send) and `HttpResponse<T>` (what came back, with a body of type `T`).',
        'A **builder** is an object that collects settings step by step. `HttpRequest.newBuilder(uri)` starts one. Each method such as `.header(...)` or `.timeout(...)` returns the builder again, so you can chain calls. `.build()` makes the final, unchangeable request.',
        'A **body handler** says what to do with the response body bytes. `HttpResponse.BodyHandlers.ofString()` turns them into a `String`, so `response.body()` is a `String`. A **body publisher** does the opposite for requests: `HttpRequest.BodyPublishers.ofString(json)` turns your text into bytes.',
        '`send` is **synchronous** (blocking): your thread waits until the whole response is there. It can throw `IOException` (no connection, connection lost) and `InterruptedException` (someone stopped your waiting thread). Both are checked exceptions, so `main` says `throws Exception` or you catch them. See [exceptions](../exceptions/index.html).',
        'Every answer, also `404` or `500`, is a normal response and no exception. Always check `response.statusCode()` before you use the body.'
      ],
      why: 'Programs need data from other programs: prices, weather, users. `HttpClient` lets Java ask for it with a few lines and no extra library.',
      whenUse: 'Whenever your Java program calls a web API. For many calls at once, see the deeper lesson on `sendAsync`.',
      syntax: 'HttpResponse<String> r = client.send(HttpRequest.newBuilder(URI.create(url)).header(name, value).GET().build(), HttpResponse.BodyHandlers.ofString());',
      fileName: 'WeatherClient.java',
      code: `import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

public class WeatherClient {
    public static void main(String[] args) throws Exception {
        HttpServer server = startFakeWeatherApi();
        String base = "http://127.0.0.1:" + server.getAddress().getPort();

        try (HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(2)).build()) {
            HttpRequest request = HttpRequest.newBuilder(URI.create(base + "/weather?city=Oslo"))
                    .header("Accept", "application/json")
                    .timeout(Duration.ofSeconds(5))
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("Status: " + response.statusCode());
            System.out.println("Type:   " + response.headers().firstValue("Content-Type").orElse("?"));
            if (response.statusCode() == 200) {
                System.out.println("Body:   " + response.body());
            } else {
                System.out.println("No weather today.");
            }
        } finally {
            server.stop(0);
        }
    }

    // A fake weather API on this computer, so the example runs without internet.
    static HttpServer startFakeWeatherApi() throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/weather", exchange -> {
            String city = exchange.getRequestURI().getQuery().replace("city=", "");
            byte[] body = """
                    {"city": "%s", "tempC": 7}""".formatted(city).getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, body.length);
            try (OutputStream out = exchange.getResponseBody()) {
                out.write(body);
            }
        });
        server.start();
        return server;
    }
}`,
      output: `Status: 200
Type:   application/json
Body:   {"city": "Oslo", "tempC": 7}`,
      codeSummary: 'The `main` method is a typical client: build a request with a header and a timeout, send it, check the status, use the body. The method at the bottom fakes a weather API on this computer, so the program needs no internet.',
      codeExplanation: [
        { label: 'Line 14', code: 'HttpServer server = startFakeWeatherApi();', text: 'Starts the fake API. With a real API you skip this and use its address, such as `https://api.example.com`.' },
        { label: 'Line 17', code: 'try (HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(2)).build()) {', text: 'A client with a setting: give up if no connection is made within 2 seconds. Make one client and reuse it for many requests.' },
        { label: 'Line 18', code: 'HttpRequest request = HttpRequest.newBuilder(URI.create(base + "/weather?city=Oslo"))', text: 'Starts the request builder with the full URL. `?city=Oslo` is the **query string**.' },
        { label: 'Line 19', code: '.header("Accept", "application/json")', text: 'Tells the server: "I can read JSON".' },
        { label: 'Line 20', code: '.timeout(Duration.ofSeconds(5))', text: 'If the whole answer takes longer than 5 seconds, `send` throws `HttpTimeoutException`. Without a timeout it may wait forever.' },
        { label: 'Line 22', code: '.build();', text: 'Makes the finished request. It cannot change any more, so you can send it again later.' },
        { label: 'Line 23', code: 'HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());', text: 'Sends and waits. The body handler `ofString()` makes `response.body()` a `String`.' },
        { label: 'Line 26', code: 'response.headers().firstValue("Content-Type").orElse("?")', text: 'Reads a response header. The name ignores case.' },
        { label: 'Line 27', code: 'if (response.statusCode() == 200) {', text: 'Check the status **before** you trust the body. A 404 body is an error message, not weather.' },
        { label: 'Line 41', code: 'String city = exchange.getRequestURI().getQuery().replace("city=", "");', text: 'The fake server reads `city=Oslo` from the query and keeps `Oslo`. Lesson E explains the server side.' }
      ],
      sections: [
        {
          title: 'Three types work together',
          text: ['The client sends a request and returns a response. The response has a type parameter: `HttpResponse<String>` means "the body is a String".'],
          mermaid: 'classDiagram\n  class HttpClient {\n    +send(request, handler) HttpResponse\n    +sendAsync(request, handler) CompletableFuture\n  }\n  class HttpRequest {\n    +uri() URI\n    +method() String\n    +headers() HttpHeaders\n  }\n  class HttpResponse~T~ {\n    +statusCode() int\n    +headers() HttpHeaders\n    +body() T\n  }\n  HttpClient ..> HttpRequest : sends\n  HttpClient ..> HttpResponse : returns',
          diagramNote: 'Dashed arrows mean "uses". You make the request, the client makes the response.'
        },
        {
          title: 'The builder methods you need',
          text: ['Every request starts with `HttpRequest.newBuilder(URI.create(url))` and ends with `.build()`. In between you pick the method and add what you need.'],
          table: {
            head: ['Builder call', 'What it sets'],
            rows: [
              ['`.GET()`', 'method GET (also the default)'],
              ['`.POST(BodyPublishers.ofString(json))`', 'method POST with a body'],
              ['`.PUT(BodyPublishers.ofString(json))`', 'method PUT with a body'],
              ['`.method("PATCH", BodyPublishers.ofString(json))`', 'any method by name, here PATCH'],
              ['`.DELETE()`', 'method DELETE, no body'],
              ['`.header("Content-Type", "application/json")`', 'one header (call it again for more)'],
              ['`.timeout(Duration.ofSeconds(5))`', 'the longest wait for the response']
            ],
            note: 'For the response: `BodyHandlers.ofString()` gives a `String`, `BodyHandlers.discarding()` throws the body away (good for 204 answers).'
          }
        },
        {
          title: 'A 404 is an answer, not an exception',
          text: [
            'The server can say "not found". That is still a correct answer, so `send` returns normally. Your code must look at the number.',
            'Here the client asks for a path that exists and one with a typo. The fake server only knows `/weather`, so the JDK answers 404 for the other one.'
          ],
          fileName: 'StatusCheck.java',
          code: `import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

public class StatusCheck {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/weather", exchange -> {
            exchange.sendResponseHeaders(204, -1); // 204: OK, no body
            exchange.close();
        });
        server.start();
        String base = "http://127.0.0.1:" + server.getAddress().getPort();

        try (HttpClient client = HttpClient.newHttpClient()) {
            for (String path : List.of("/weather", "/wether")) {
                HttpRequest request = HttpRequest.newBuilder(URI.create(base + path)).build();
                HttpResponse<Void> response = client.send(request, HttpResponse.BodyHandlers.discarding());
                int code = response.statusCode();
                String verdict = code / 100 == 2 ? "worked" : "failed";
                System.out.println(path + " -> " + code + " " + verdict);
            }
        } finally {
            server.stop(0);
        }
    }
}`,
          output: `/weather -> 204 worked
/wether -> 404 failed`,
          tip: '`code / 100` is the first digit of the status: 2 means it worked, 4 means the request was wrong, 5 means the server broke. Integer division drops the rest.'
        },
        {
          title: 'When nobody answers: the exceptions',
          text: [
            'Exceptions come only when there is **no answer**. Two cases matter most: the server is too slow (`HttpTimeoutException`), or nobody listens on that port (`ConnectException`). Both are subclasses of `IOException`.',
            'This program makes both happen on purpose. The server waits one second before it answers, but the client only waits 200 milliseconds. Then the program stops the server and calls again.'
          ],
          fileName: 'WhenNobodyAnswers.java',
          code: `import com.sun.net.httpserver.HttpServer;
import java.net.ConnectException;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpTimeoutException;
import java.time.Duration;

public class WhenNobodyAnswers {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/slow", exchange -> {
            try {
                Thread.sleep(1000); // a slow server: one second
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            exchange.sendResponseHeaders(204, -1);
            exchange.close();
        });
        server.start();
        URI address = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/slow");

        try (HttpClient client = HttpClient.newHttpClient()) {
            try {
                HttpRequest quick = HttpRequest.newBuilder(address).timeout(Duration.ofMillis(200)).build();
                client.send(quick, HttpResponse.BodyHandlers.discarding());
            } catch (HttpTimeoutException e) {
                System.out.println("Timeout: the server did not answer in time.");
            }

            server.stop(0); // now nobody listens on that port
            try {
                client.send(HttpRequest.newBuilder(address).build(), HttpResponse.BodyHandlers.discarding());
            } catch (ConnectException e) {
                System.out.println("ConnectException: nobody listens on that port.");
            }
        }
    }
}`,
          output: `Timeout: the server did not answer in time.
ConnectException: nobody listens on that port.`,
          warn: 'Always set a timeout on requests to other computers. A server that never answers would freeze your program forever.'
        },
        {
          title: 'The same code with a real API',
          text: [
            'Nothing changes for a real API on the internet except the URL. With `https://` the client encrypts the connection for you. Try `https://jsonplaceholder.typicode.com/todos/1`, a free test API, in place of the fake weather URL.',
            'The examples on this page use a local server so that they run without internet and always print the same thing.'
          ],
          tip: 'Keep keys out of your code. Read them from an environment variable with `System.getenv("API_KEY")` and send them in the `Authorization` header.'
        }
      ],
      technical: [
        '`HttpClient` holds a pool of open connections. When you send several requests to the same host, it reuses one TCP connection, which saves time. That is why you create one client and reuse it.',
        'Since Java 21 `HttpClient` is `AutoCloseable`. `close()` waits for running requests and frees its threads and connections. In `try (HttpClient client = ...)` that happens automatically at the end of the block.',
        'By default the client asks for HTTP/2 and falls back to HTTP/1.1 if the server does not speak it, as the tiny JDK server does. You can force a version with `HttpClient.newBuilder().version(HttpClient.Version.HTTP_1_1)`.',
        'The body handler runs while bytes arrive. `ofString()` collects all bytes and decodes them with the charset from the `Content-Type` header, or UTF-8 if none is given.'
      ],
      tryIt: {
        steps: [
          'Run `WeatherClient.java`.',
          'Change `city=Oslo` to `city=Rome`.',
          'In `WhenNobodyAnswers.java`, change the timeout from `200` to `2000` milliseconds and run it.'
        ],
        see: '`Body:   {"city": "Rome", "tempC": 7}`. With the longer timeout the first line disappears: the slow server is now fast enough.'
      },
      check: [
        { q: 'What does `.build()` do on an `HttpRequest` builder?', a: 'It makes the finished request from all the settings. After that the request cannot change.' },
        { q: 'Your request gets status 500. Does `send` throw an exception?', a: 'No. It returns a normal response with `statusCode()` 500. You check the number yourself.' },
        { q: 'When does `send` throw `ConnectException`?', a: 'When no server listens at that host and port, so there is no answer at all.' }
      ],
      keyPoints: [
        '`HttpClient` sends, `HttpRequest` describes, `HttpResponse<T>` holds the answer.',
        'Build requests with `newBuilder(uri)`, chain settings, finish with `build()`.',
        '`BodyHandlers.ofString()` gives a `String` body. `BodyPublishers.ofString(text)` sends one.',
        'Check `statusCode()` before you use the body. 4xx and 5xx are no exceptions.',
        'Set a timeout. Create one client and reuse it.'
      ],
      commonMistakes: [
        'Using `response.body()` without checking `statusCode()`. Fix: `if (response.statusCode() == 200) { ... }`.',
        '`HttpRequest.newBuilder(URI.create("localhost:8080/x"))` without `http://`. Fix: always write the scheme, `http://localhost:8080/x`.',
        'Creating a new `HttpClient` for every request in a loop. Fix: create one before the loop and reuse it.',
        'No `.timeout(...)`. A dead server freezes the program. Fix: add `.timeout(Duration.ofSeconds(5))`.'
      ],
      related: ['Client and Server', 'A Tiny Server with HttpServer', 'Async Calls with sendAsync'],
      glossary: G
    }
  );
})();
