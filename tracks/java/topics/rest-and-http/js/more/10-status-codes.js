// Lesson J: status codes, the five families and the common ones.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;

  T.lessons.push({
    num: '10',
    id: 'status-codes',
    title: 'Status Codes',
    category: 'design',
    icon: '200',
    tagline: 'The first digit tells the story',
    realWorld: 'The slip from the parcel service. "Delivered." "Moved, here is the new address." "Wrong address, please check." "Our van broke down." One glance and you know what to do next.',
    kid: [
      'When you ask the server something, its answer starts with a number with three digits. Look at the **first** digit.',
      '**2** means "yes, done". **3** means "look somewhere else". **4** means "you asked in a wrong way". **5** means "sorry, something broke here at my place".',
      'So with a 4 you fix your question. With a 5 you wait and try again later, because it is not your fault.'
    ],
    definition: 'A **status code** is the three-digit number in the first line of every response. The first digit names the family: 1xx info, 2xx success, 3xx redirect, 4xx client error, 5xx server error. The other two digits give the detail.',
    explain: [
      '**2xx success**: the request worked. `200 OK` is the general yes, `201 Created` says something new exists (with a `Location` header), `204 No Content` says "done, no body".',
      '**3xx redirection**: the resource is somewhere else. `301 Moved Permanently` and `302 Found` come with a `Location` header. `304 Not Modified` tells a cache that its copy is still good.',
      '**4xx client error**: the client must change something. `400 Bad Request` (broken body), `401 Unauthorized` (who are you? no or a wrong key), `403 Forbidden` (I know you, but you may not), `404 Not Found`, `405 Method Not Allowed`, `409 Conflict` (clashes with the current state), `429 Too Many Requests` (slow down).',
      '**5xx server error**: the server failed, the request may have been fine. `500 Internal Server Error` is a bug or a crash, `503 Service Unavailable` means "overloaded or in maintenance, try later".',
      `The full list is in the CS lesson [status codes](../../../computer-science/index.html#http-requests-responses/status-codes). In Java you read the number with \`response.statusCode()\` and set it with \`exchange.sendResponseHeaders(code, length)\`.`
    ],
    why: 'A client must react without reading text written for humans. The number lets a program decide: use the body, fix the request, or retry later.',
    whenUse: 'In every response your server sends, and in every client after every `send`: check the code before you use the body.',
    syntax: 'client: int code = response.statusCode(); int family = code / 100;   server: exchange.sendResponseHeaders(404, -1);',
    fileName: 'StatusTour.java',
    code: `import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

public class StatusTour {
    public static void main(String[] args) throws Exception {
        // This server answers /status/404 with 404, /status/201 with 201, and so on.
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/status/", exchange -> {
            int code = Integer.parseInt(exchange.getRequestURI().getPath().substring("/status/".length()));
            exchange.sendResponseHeaders(code, -1);
            exchange.close();
        });
        server.start();
        String base = "http://127.0.0.1:" + server.getAddress().getPort() + "/status/";

        try (HttpClient client = HttpClient.newHttpClient()) {
            for (int asked : List.of(200, 201, 204, 301, 400, 401, 404, 500, 503)) {
                HttpRequest request = HttpRequest.newBuilder(URI.create(base + asked)).build();
                int code = client.send(request, HttpResponse.BodyHandlers.discarding()).statusCode();
                System.out.println(code + " " + family(code));
            }
        } finally {
            server.stop(0);
        }
    }

    static String family(int code) {
        return switch (code / 100) {
            case 1 -> "info: wait, more is coming";
            case 2 -> "success: use the answer";
            case 3 -> "redirect: look at the Location header";
            case 4 -> "client error: fix the request";
            case 5 -> "server error: try again later";
            default -> "not a valid status";
        };
    }
}`,
    output: `200 success: use the answer
201 success: use the answer
204 success: use the answer
301 redirect: look at the Location header
400 client error: fix the request
401 client error: fix the request
404 client error: fix the request
500 server error: try again later
503 server error: try again later`,
    codeSummary: 'A server that answers with whatever code the path asks for, and a client that sorts each code into its family with `code / 100`. This is how a real client decides what to do next.',
    codeExplanation: [
      { label: 'Line 13', code: 'server.createContext("/status/", exchange -> {', text: 'One context for all paths that start with `/status/`.' },
      { label: 'Line 14', code: 'int code = Integer.parseInt(exchange.getRequestURI().getPath().substring("/status/".length()));', text: 'Takes the number at the end of the path, `/status/404` gives 404.' },
      { label: 'Line 15', code: 'exchange.sendResponseHeaders(code, -1);', text: 'Answers with that code and no body.' },
      { label: 'Line 22', code: 'for (int asked : List.of(200, 201, 204, 301, 400, 401, 404, 500, 503)) {', text: 'Nine common codes. `List.of` boxes the numbers into `Integer`s, and the loop unboxes each into an `int`.' },
      { label: 'Line 24', code: 'int code = client.send(request, HttpResponse.BodyHandlers.discarding()).statusCode();', text: 'No exception for 404 or 500: the client gets a normal response and reads the code. `discarding()` throws the body away.' },
      { label: 'Line 25', code: 'System.out.println(code + " " + family(code));', text: 'The 301 arrives as it is, because `HttpClient` does not follow redirects unless you ask it to.' },
      { label: 'Line 32', code: 'static String family(int code) {', text: 'Turns a code into its family. This is the decision every client makes.' },
      { label: 'Line 33', code: 'return switch (code / 100) {', text: 'Integer division: `404 / 100` is `4`. The first digit picks the branch. See [control flow](../control-flow/index.html) for `switch`.' }
    ],
    sections: [
      {
        title: 'The five families',
        text: ['Learn the families first. With them you understand a code you have never seen: `418` starts with 4, so the client did something wrong.'],
        table: {
          head: ['Family', 'Meaning', 'What the client does'],
          rows: [
            ['`1xx`', 'information, more is coming', 'nothing, `HttpClient` handles it'],
            ['`2xx`', 'success', 'use the body'],
            ['`3xx`', 'redirection', 'go to the `Location`, or use the cached copy'],
            ['`4xx`', 'client error', 'fix the request, do not retry the same one'],
            ['`5xx`', 'server error', 'retry later, maybe tell the user']
          ]
        }
      },
      {
        title: 'The codes you meet first',
        text: ['These cover almost every REST API. Pairs that confuse people are next to each other.'],
        table: {
          head: ['Code', 'Name', 'Use it when'],
          rows: [
            ['`200`', 'OK', 'GET found it, PUT or PATCH worked and you send the new version'],
            ['`201`', 'Created', 'POST (or PUT) made a new resource; add `Location`'],
            ['`204`', 'No Content', 'DELETE worked, or an update with nothing to send back'],
            ['`400`', 'Bad Request', 'the JSON is broken or a field is missing'],
            ['`401`', 'Unauthorized', 'no key, or the key is wrong: "who are you?"'],
            ['`403`', 'Forbidden', 'the key is fine, but this user may not do this'],
            ['`404`', 'Not Found', 'no resource at that URL'],
            ['`405`', 'Method Not Allowed', 'the URL exists, but not with this method'],
            ['`409`', 'Conflict', 'clashes with the current state, such as a taken user name'],
            ['`500`', 'Internal Server Error', 'a bug: an exception nobody caught'],
            ['`503`', 'Service Unavailable', 'overloaded or in maintenance']
          ]
        }
      },
      {
        title: 'Pick the code: a small decision tree',
        text: ['On the server, ask these questions in order.'],
        mermaid: 'flowchart TD\n  A{"Did the server fail?"} -->|yes| B["5xx: 500 or 503"]\n  A -->|no| C{"Is the request valid and allowed?"}\n  C -->|no| D["4xx: 400, 401, 403, 404, 409"]\n  C -->|yes| E{"Was something new created?"}\n  E -->|yes| F["201 Created + Location"]\n  E -->|no| G{"Is there a body to send?"}\n  G -->|yes| H["200 OK"]\n  G -->|no| I["204 No Content"]',
        diagramNote: 'Inside the 4xx box, check in this order: is it readable (400), do I know you (401), may you (403), does it exist (404).'
      },
      {
        title: 'Errors need a status and a body',
        text: [
          'A client program reads the number first. If an error comes with `200 OK`, the client thinks all is well and uses the error text as data.',
          'Send the right code **and** a short JSON body that a human can read in the logs.'
        ],
        fileName: 'errors.http',
        codeLanguage: 'http',
        code: `# Wrong: the code says OK, the body says error
HTTP/1.1 200 OK
Content-Type: application/json

{"ok": false, "error": "book not found"}

# Right: the code says what happened, the body explains
HTTP/1.1 404 Not Found
Content-Type: application/json

{"error": {"code": "BOOK_NOT_FOUND", "message": "No book with id 9."}}`,
        warn: 'Never send stack traces or passwords in an error body. The client sees everything in it.'
      }
    ],
    technical: [
      'The status line on HTTP/1.1 is `HTTP/1.1 404 Not Found`. The words after the number, the **reason phrase**, are only for humans. HTTP/2 drops them completely. That is why `HttpResponse` has `statusCode()` but no method for the reason text.',
      '`HttpClient` follows no redirects by default. With `HttpClient.newBuilder().followRedirects(HttpClient.Redirect.NORMAL)` it follows 3xx answers to the `Location` by itself, but never from `https` to `http`.',
      'The JDK server sends almost any number you pass, even `999`. It adds rules for codes that never have a body: for `204` and `304` it forces "no body" and logs a warning if you pass a length.',
      'When a handler throws, the JDK server sends **no** status at all and closes the connection. The client then gets `IOException: HTTP/1.1 header parser received no bytes`, not a 500. A framework such as Spring catches the exception for you and answers `500`.'
    ],
    tryIt: {
      steps: [
        'Run `StatusTour.java`.',
        'Add `418` and `429` to the list.',
        'Add `999` to the list.'
      ],
      see: '`418 client error: fix the request` and `429 client error: fix the request`. `999` has no family: `999 not a valid status`.'
    },
    check: [
      { q: 'A client gets `503`. Should it change the request?', a: 'No. 5xx means the server has the problem. Wait and retry later.' },
      { q: 'What is the difference between 401 and 403?', a: '401: the server does not know who you are (no or a wrong key). 403: it knows you, but you are not allowed to do this.' },
      { q: 'Why is "200 with an error inside the body" a bad idea?', a: 'Clients decide by the code. They would treat the error as success and use the error text as data.' }
    ],
    keyPoints: [
      'The first digit is the family: 2 yes, 3 elsewhere, 4 your mistake, 5 my mistake.',
      '200 OK, 201 Created, 204 No Content are the main success codes.',
      '400, 401, 403, 404, 409 are the main client errors. 500 and 503 the main server errors.',
      'In Java: `response.statusCode()` and `code / 100`.',
      'Errors get the right code plus a small JSON body.'
    ],
    commonMistakes: [
      '`200 OK` with `{"error": "..."}` in the body. Fix: send the 4xx or 5xx code that fits.',
      '`500` for a missing field in the request. That is the client’s mistake. Fix: `400 Bad Request`.',
      '`404` when the user is not logged in. Fix: `401 Unauthorized`, so the client knows to send a key.',
      'Retrying a `400` again and again. The same request fails the same way. Fix: only retry 5xx and timeouts.'
    ],
    related: ['Request and Response Anatomy', 'JSON Basics and Payload Shape', 'Calling an API with HttpClient'],
    glossary: G
  });
})();
