// Lesson M (deeper): asynchronous calls with HttpClient.sendAsync and CompletableFuture.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;

  T.lessons.push({
    num: '13',
    id: 'http-client-async',
    title: 'Async Calls with sendAsync',
    category: 'deeper',
    icon: '⇉',
    tagline: 'Send many requests, wait once',
    realWorld: 'Ordering at a food court with a buzzer. You order pizza at one stand and noodles at the next, and get a buzzer from each. You do not stand and wait at the first stand. You sit down, and when the buzzers ring, you fetch your food.',
    kid: [
      'With `send` you ask one question and stand still until the answer comes. If you have three questions, you wait three times, one after the other.',
      'With `sendAsync` you ask and get a little **ticket** back at once. The ticket says: "your answer will be here later". You can ask the next question right away.',
      'When you really need the answers, you show your tickets and wait. All three answers were travelling at the same time, so the waiting is much shorter.'
    ],
    definition: '`client.sendAsync(request, handler)` sends a request **without** blocking and returns a `CompletableFuture<HttpResponse<T>>` at once. The future completes when the response is there. You chain work on it with `thenApply` and wait for the value with `join()`.',
    explain: [
      '**Synchronous** means "wait here until it is done", like `send`. **Asynchronous** means "start it, go on, and get the result later". `sendAsync` is the asynchronous twin of `send`: same request, same body handler.',
      'A `CompletableFuture<T>` is a box for a value of type `T` that is not there yet. It is "done" when the value arrives, or "failed" when an exception happens. It comes from `java.util.concurrent`.',
      '`thenApply(f)` says: "when the value is there, run `f` on it, and give me a new future for the result". `HttpResponse::body` is a **method reference**, a short form of the lambda `response -> response.body()`.',
      '`join()` waits until the future is done and returns the value. If the request failed, `join()` throws a `CompletionException` with the real exception, such as `ConnectException`, as its cause.',
      'Async pays off when you need several independent answers: start all requests first, then join them. The total time is about the time of the slowest request, not the sum of all.'
    ],
    why: 'Waiting for the network is slow compared with the CPU. Async calls let one program wait for many answers at once instead of one after the other.',
    whenUse: 'When you call several APIs or many URLs and the calls do not depend on each other: a dashboard with weather, news and prices, or downloading 20 pages.',
    syntax: 'CompletableFuture<String> f = client.sendAsync(request, BodyHandlers.ofString()).thenApply(HttpResponse::body);  String body = f.join();',
    fileName: 'AsyncCalls.java',
    code: `import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class AsyncCalls {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = Executors.newFixedThreadPool(3); // the server answers 3 at a time
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.setExecutor(pool);
        server.createContext("/weather", exchange -> {
            try { Thread.sleep(300); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }
            byte[] body = ("sunny in " + exchange.getRequestURI().getQuery()).getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, body.length);
            try (OutputStream out = exchange.getResponseBody()) {
                out.write(body);
            }
        });
        server.start();
        String base = "http://127.0.0.1:" + server.getAddress().getPort() + "/weather?";

        try (HttpClient client = HttpClient.newHttpClient()) {
            List<CompletableFuture<String>> futures = new ArrayList<>();
            for (String city : List.of("Oslo", "Rome", "Lima")) {
                HttpRequest request = HttpRequest.newBuilder(URI.create(base + city)).build();
                CompletableFuture<String> future = client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                        .thenApply(HttpResponse::body);
                futures.add(future);
                System.out.println("sent " + city + ", not waiting");
            }
            System.out.println("main is free while all three answers travel");
            for (CompletableFuture<String> future : futures) {
                System.out.println("got: " + future.join());
            }
        } finally {
            server.stop(0);
            pool.shutdown();
        }
    }
}`,
    output: `sent Oslo, not waiting
sent Rome, not waiting
sent Lima, not waiting
main is free while all three answers travel
got: sunny in Oslo
got: sunny in Rome
got: sunny in Lima`,
    codeSummary: 'Each answer takes 300 ms. The client starts all three requests without waiting, then joins the futures in order. All three run at the same time, so the program waits about 300 ms in total instead of 900 ms.',
    codeExplanation: [
      { label: 'Line 17', code: 'ExecutorService pool = Executors.newFixedThreadPool(3); // the server answers 3 at a time', text: 'A pool of 3 threads for the server. Without it the tiny server would answer one request after the other and the demo would gain nothing.' },
      { label: 'Line 19', code: 'server.setExecutor(pool);', text: 'The dispatcher now hands each request to a pool thread.' },
      { label: 'Line 21', code: 'try { Thread.sleep(300); } catch (InterruptedException e) { Thread.currentThread().interrupt(); }', text: 'A slow API: 300 milliseconds per answer.' },
      { label: 'Line 35', code: 'CompletableFuture<String> future = client.sendAsync(request, HttpResponse.BodyHandlers.ofString())', text: 'Starts the request and returns **at once** with a future. No waiting here.' },
      { label: 'Line 36', code: '.thenApply(HttpResponse::body);', text: 'When the response arrives, take its body. The future now holds a `String`, not the whole response.' },
      { label: 'Line 38', code: 'System.out.println("sent " + city + ", not waiting");', text: 'Printed right after sending. All three lines appear before any answer is used.' },
      { label: 'Line 42', code: 'System.out.println("got: " + future.join());', text: '`join()` waits for this future. The first join waits about 300 ms; by then the other two are done too, so their joins return at once.' },
      { label: 'Line 46', code: 'pool.shutdown();', text: 'Stops the pool threads. Like `server.stop(0)`, without it the program would not end.' }
    ],
    sections: [
      {
        title: 'Waiting in a row or waiting together',
        text: ['With `send` the main thread waits three times in a row. With `sendAsync` it starts all three and waits once.'],
        mermaid: 'sequenceDiagram\n  participant M as main thread\n  participant C as HttpClient\n  participant S as Server\n  M->>C: sendAsync Oslo\n  C->>S: GET ?Oslo\n  M->>C: sendAsync Rome\n  C->>S: GET ?Rome\n  M->>C: sendAsync Lima\n  C->>S: GET ?Lima\n  Note over S: all three take 300 ms at the same time\n  S-->>C: three answers\n  M->>C: join, join, join\n  C-->>M: three bodies',
        diagramNote: 'main never waits for one request before it sends the next. The client threads do the waiting.'
      },
      {
        title: 'The future methods you need',
        text: ['A handful of methods covers almost every use. Each `then...` returns a new future, so you can chain them.'],
        table: {
          head: ['Method', 'What it does'],
          rows: [
            ['`client.sendAsync(request, handler)`', 'starts the request, returns `CompletableFuture<HttpResponse<T>>`'],
            ['`.thenApply(response -> ...)`', 'turns the value into another value, for example the body'],
            ['`.thenAccept(body -> ...)`', 'uses the value, returns nothing (for example to print it)'],
            ['`.exceptionally(e -> fallback)`', 'gives a value when something failed'],
            ['`.join()`', 'waits and returns the value, or throws `CompletionException`'],
            ['`CompletableFuture.allOf(f1, f2, f3).join()`', 'waits until all of them are done']
          ]
        }
      },
      {
        title: 'Errors arrive inside the future',
        text: [
          'With `send` an error is thrown at once. With `sendAsync` it travels inside the future. `exceptionally` catches it and gives a fallback value, so `join()` does not throw.',
          'The exception you get is a `CompletionException`. The real reason is its **cause**: `e.getCause()`.'
        ],
        fileName: 'AsyncFallback.java',
        code: `import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

public class AsyncFallback {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.start();
        int port = server.getAddress().getPort();
        server.stop(0); // the port is closed now: every request will fail

        try (HttpClient client = HttpClient.newHttpClient()) {
            HttpRequest request = HttpRequest.newBuilder(URI.create("http://127.0.0.1:" + port + "/news")).build();
            CompletableFuture<String> news = client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                    .thenApply(HttpResponse::body)
                    .exceptionally(e -> "no news (" + e.getCause().getClass().getSimpleName() + ")");
            System.out.println("waiting for the news ...");
            System.out.println(news.join());
        }
    }
}`,
        output: `waiting for the news ...
no news (ConnectException)`,
        tip: 'Put `exceptionally` at the end of the chain. Then it also catches errors from your own `thenApply` code.'
      },
      {
        title: 'When async is worth it',
        text: ['Async code is harder to read and to debug. Use it when it really saves time.'],
        table: {
          head: ['Situation', 'Use'],
          rows: [
            ['one request, then work with the answer', '`send`'],
            ['request B needs the answer of request A', '`send` twice, or `thenCompose` (more advanced)'],
            ['many independent requests', '`sendAsync` for all, then `join`'],
            ['a program with a window that must not freeze', '`sendAsync` with `thenAccept`']
          ]
        },
        warn: 'Do not call `join()` right after each `sendAsync`. Then you wait in a row again and win nothing. Start all requests first, join later.'
      }
    ],
    technical: [
      '`HttpClient` has its own threads. One **selector thread** watches all open connections and wakes up when bytes arrive. The work after that, such as your `thenApply` code, runs on threads of the client executor (a shared pool unless you set one with `HttpClient.newBuilder().executor(...)`).',
      '`send` is built on the same machinery: it calls `sendAsync` and then waits on the future. So both have the same features and the same speed for a single request.',
      'A future that nobody joins still runs. If `main` ends first, the JVM may stop before the answer arrives, because the client threads are daemon threads. `try (HttpClient client = ...)` helps: `close()` waits for running requests.',
      'Since Java 21 the JDK also has **virtual threads**, very cheap threads. With them, many programs call plain `send` on thousands of threads at once, instead of chaining futures. That idea belongs to concurrency, a topic of its own.'
    ],
    tryIt: {
      steps: [
        'Run `AsyncCalls.java`.',
        'Add `"Cairo"` and `"Pune"` to the list of cities.',
        'Change `newFixedThreadPool(3)` to `newFixedThreadPool(1)` and run it again. Notice how long it takes.'
      ],
      see: 'Five `sent` lines, the `main is free` line, then five `got` lines in the same order. With one server thread the output stays the same, but it takes about five times 300 ms: the server now answers one by one.'
    },
    check: [
      { q: 'What does `sendAsync` return, and when?', a: 'A `CompletableFuture<HttpResponse<T>>`, at once, before the answer is there.' },
      { q: 'What does `.thenApply(HttpResponse::body)` do?', a: 'When the response arrives, it takes the body, so the new future holds the body `String`.' },
      { q: 'You send three requests with `sendAsync` and call `join()` right after each one. Is it faster than `send`?', a: 'No. Each `join` waits before the next request starts, so they run one after the other again.' }
    ],
    keyPoints: [
      '`sendAsync` returns a `CompletableFuture` at once. `send` waits.',
      '`thenApply` changes the value when it arrives. `join()` waits for it.',
      'Start all independent requests first, then join them.',
      'Errors come as `CompletionException`. The real reason is `getCause()`.',
      'Use async only when several independent calls can overlap.'
    ],
    commonMistakes: [
      '`client.sendAsync(r1, h).join(); client.sendAsync(r2, h).join();` waits in a row. Fix: start both, then join both.',
      'Expecting a `ConnectException` in `exceptionally`. It is wrapped. Fix: look at `e.getCause()`.',
      'Forgetting to join or close, so `main` ends before the answer. Fix: `join()` the futures, or let `try (HttpClient ...)` close the client.',
      'Printing inside `thenAccept` and expecting a fixed order. Answers arrive in any order. Fix: collect the futures and join them in your order.'
    ],
    related: ['Calling an API with HttpClient', 'A Tiny Server with HttpServer', 'Idempotency'],
    glossary: G
  });
})();
