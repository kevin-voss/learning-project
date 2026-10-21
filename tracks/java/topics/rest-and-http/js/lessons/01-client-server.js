// Lessons A–B: who talks to whom, and what one HTTP message looks like.
(function () {
  const T = Java.topics.restAndHttp;
  const G = T.glossary;
  const CS = '../../../computer-science/index.html';

  T.lessons.push(
    {
      num: '01',
      id: 'client-server',
      title: 'Client and Server',
      category: 'foundations',
      icon: '⇄',
      tagline: 'One asks, one answers',
      realWorld: 'An ice cream stand. You walk up and ask for one scoop of vanilla. The person behind the counter hands it over. You always ask first. The stand never shouts at you before you ask.',
      kid: [
        'Imagine two friends with walkie-talkies. One friend asks: "What is the password?" The other friend answers: "Banana." Then both wait again.',
        'On the internet the friend who asks is the **client**. The friend who answers is the **server**. The server sits still and listens all day. The client decides when to ask.',
        'Every question gets exactly one answer. A question is a **request**. An answer is a **response**. The rules for how to ask and answer are called **HTTP**.'
      ],
      definition: 'A **client** is a program that sends a request. A **server** is a program that waits for requests and sends back one response for each. On the web they talk with HTTP.',
      explain: [
        'The client always starts. It knows the address of the server, opens a connection and sends a request. The server never calls a client on its own. It only answers.',
        'A server waits on an **address** and a **port**. The address picks the computer, for example `127.0.0.1`. The port is a number that picks one program on that computer, like a flat number in a building. `127.0.0.1` has the name `localhost`: it means "this computer".',
        '**HTTP** (HyperText Transfer Protocol) is a set of text rules. A request says what the client wants. A response says how it went and carries the answer. One request, one response, then the conversation is done.',
        'Your browser is a client. The `curl` command is a client. A Java program can be a client too, with the class `java.net.http.HttpClient`. And a Java program can be a server, with `com.sun.net.httpserver.HttpServer`. The example below is both at once: it starts a tiny server and then asks it a question.',
        `The web basics live in the computer science track: [client and server](${CS}#client-server) and [IPs, ports and requests](${CS}#networks-ips-requests). This page tells you all you need for Java, so you can stay here.`
      ],
      why: 'Programs on different computers need a shared way to talk. HTTP is that shared way: a Java server, a phone app and a browser all understand it.',
      whenUse: 'Every time a program needs data from another program over a network: weather data, a login, a list of books, a payment.',
      syntax: 'client → request (method, path, headers, body) → server → response (status, headers, body) → client',
      mermaid: 'sequenceDiagram\n  participant C as Client (main thread)\n  participant S as Server (port 51164)\n  Note over S: start() and listen\n  C->>S: Request: GET /hello\n  Note over S: run the handler for /hello\n  S-->>C: Response: 200 and "Hello, client!"\n  Note over C: read status and body',
      visualLabel: 'One request, one response',
      visualNote: 'Time runs from top to bottom. The solid arrow is the request, the dashed arrow is the response. The client waits between them.',
      fileName: 'HelloHttp.java',
      code: `import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class HelloHttp {
    public static void main(String[] args) throws Exception {
        // The server: listens on this computer. Port 0 means "pick any free port".
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/hello", exchange -> {
            System.out.println("Server: got " + exchange.getRequestMethod() + " " + exchange.getRequestURI());
            byte[] body = "Hello, client!".getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, body.length);
            try (OutputStream out = exchange.getResponseBody()) {
                out.write(body);
            }
        });
        server.start();
        int port = server.getAddress().getPort();

        // The client: asks the server and waits for the answer.
        try (HttpClient client = HttpClient.newHttpClient()) {
            URI address = URI.create("http://127.0.0.1:" + port + "/hello");
            HttpRequest request = HttpRequest.newBuilder(address).GET().build();
            System.out.println("Client: sending GET /hello");
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Client: status " + response.statusCode());
            System.out.println("Client: body " + response.body());
        } finally {
            server.stop(0);
            System.out.println("Server stopped.");
        }
    }
}`,
      output: `Client: sending GET /hello
Server: got GET /hello
Client: status 200
Client: body Hello, client!
Server stopped.`,
      codeSummary: 'One program plays both roles: the top half starts a server on a free port, the bottom half is a client that sends one GET request and prints the answer. Lessons D and E explain each half in detail.',
      codeExplanation: [
        { label: 'Line 13', code: 'HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);', text: 'Creates a server on this computer. Port `0` asks the operating system for any free port, so the program never clashes with another one. The last `0` means "default waiting line".' },
        { label: 'Line 14', code: 'server.createContext("/hello", exchange -> {', text: 'Says: "when a request for `/hello` comes in, run this code". `exchange -> { ... }` is a **lambda**, a short way to hand over a piece of code. `exchange` holds the request and the response.' },
        { label: 'Line 17', code: 'exchange.sendResponseHeaders(200, body.length);', text: 'Sends the status code `200` (OK) and says how many bytes of body follow.' },
        { label: 'Line 18', code: 'try (OutputStream out = exchange.getResponseBody()) {', text: 'Writes the body bytes. The `try (...)` closes the stream at the end, and closing it finishes the response. See [io basics](../io-basics/index.html) for streams.' },
        { label: 'Line 22', code: 'server.start();', text: 'From now on the server listens on its own thread. `main` goes on to the next line at once.' },
        { label: 'Line 23', code: 'int port = server.getAddress().getPort();', text: 'Asks which free port the system picked, so the client knows where to call.' },
        { label: 'Line 26', code: 'try (HttpClient client = HttpClient.newHttpClient()) {', text: 'Creates the client. It is closed at the end of the `try` block.' },
        { label: 'Line 28', code: 'HttpRequest request = HttpRequest.newBuilder(address).GET().build();', text: 'Builds the request: method `GET`, address `http://127.0.0.1:<port>/hello`.' },
        { label: 'Line 30', code: 'HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());', text: 'Sends the request and **waits** until the response is back. `ofString()` turns the body bytes into a `String`. While main waits, the server prints its line.' },
        { label: 'Line 34', code: 'server.stop(0);', text: 'Stops the server in the `finally` block, so it stops even after an error. Without it the program never ends: the server thread keeps listening.' }
      ],
      sections: [
        {
          title: 'Who starts the talk',
          text: [
            'The server starts first and waits. It does nothing until a request comes in. Then the client sends, and the server answers.',
            'One server can answer many clients. Each client gets its own response. The clients do not see each other.'
          ],
          mermaid: 'flowchart LR\n  B["Browser"] -->|request| S["Server on port 8080"]\n  C["curl in a terminal"] -->|request| S\n  J["Java HttpClient"] -->|request| S\n  S -.->|response| B\n  S -.->|response| C\n  S -.->|response| J',
          diagramNote: 'Three different clients talk to the same server. They all speak HTTP, so the server does not care which kind of client asks.'
        },
        {
          title: 'The address: scheme, host, port, path',
          text: [
            'The client needs a full address, a **URL**. In the example it is `http://127.0.0.1:51164/hello`. Each part has a job.',
            'The port number in your run is different every time, because port `0` lets the system pick a free one. That is why the examples on this page never print the port.'
          ],
          table: {
            head: ['Part', 'In the example', 'What it picks'],
            rows: [
              ['scheme', '`http`', 'the rules to use (`https` adds encryption)'],
              ['host', '`127.0.0.1`', 'the computer (`localhost` = this computer)'],
              ['port', '`51164`', 'the program on that computer'],
              ['path', '`/hello`', 'the thing you ask for inside that program']
            ],
            note: 'Without a port in the URL, `http` uses 80 and `https` uses 443.'
          },
          tip: 'Port `0` is only for "give me any free port" when you create a server. A client always calls a real port number.'
        },
        {
          title: 'Ask three times, get three answers',
          text: [
            'Each request is a new question. The server answers each one on its own. Here the server counts its visitors in a variable that lives inside the server program.',
            'A static field `visits` is used, because code inside a lambda may change fields but not local variables of `main`.'
          ],
          fileName: 'VisitCounter.java',
          code: `import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class VisitCounter {
    static int visits = 0; // lives in the server part

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/visit", exchange -> {
            visits++;
            byte[] body = ("You are visitor number " + visits).getBytes(StandardCharsets.UTF_8);
            exchange.sendResponseHeaders(200, body.length);
            try (OutputStream out = exchange.getResponseBody()) {
                out.write(body);
            }
        });
        server.start();
        URI address = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/visit");

        try (HttpClient client = HttpClient.newHttpClient()) {
            for (int i = 1; i <= 3; i++) {
                HttpRequest request = HttpRequest.newBuilder(address).build();
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                System.out.println("Request " + i + " -> " + response.body());
            }
        } finally {
            server.stop(0);
        }
    }
}`,
          output: `Request 1 -> You are visitor number 1
Request 2 -> You are visitor number 2
Request 3 -> You are visitor number 3`,
          tip: '`HttpRequest.newBuilder(address).build()` without `.GET()` is also a GET. GET is the default.'
        },
        {
          title: 'Many kinds of clients and servers',
          text: [
            'Client and server are **roles**, not kinds of computers. Your laptop can be both at once, like in the example.'
          ],
          table: {
            head: ['Clients (they ask)', 'Servers (they answer)'],
            rows: [
              ['a web browser', 'a website, for example a Spring Boot app'],
              ['`curl` in the terminal', 'the tiny `HttpServer` from this page'],
              ['a phone app', 'a weather service'],
              ['Java `HttpClient`', 'a server written in another language']
            ]
          },
          warn: 'If the client calls before the server has started, or on the wrong port, there is nobody to answer. Java then throws a `ConnectException` ("connection refused"). Lesson D shows it.'
        }
      ],
      technical: [
        '`server.start()` opens a **server socket**: the operating system reserves the port for this program. A JDK thread called the dispatcher waits on that socket for new connections.',
        '`client.send(...)` opens a **TCP connection** to host and port (TCP is the part of the network that delivers bytes in order). Then it writes the request as text bytes. The dispatcher reads them, finds the context `/hello` and calls your handler on its own thread. Your handler writes the response bytes back over the same connection.',
        'The main thread is blocked inside `send` the whole time. When the last byte of the response arrives, `ofString()` decodes the bytes with UTF-8 and `send` returns an `HttpResponse`.',
        'The JVM ends when the last non-daemon thread ends. The dispatcher thread is one of them. That is why `server.stop(0)` is needed: it closes the socket and ends that thread. `0` means "wait 0 seconds for running requests".'
      ],
      tryIt: {
        steps: [
          'Save the first example as `HelloHttp.java`.',
          'Run it with `java HelloHttp.java`.',
          'Change `"Hello, client!"` to your own text and run it again.',
          'Remove the line `server.stop(0);` and run it again. Stop it with Ctrl+C.'
        ],
        see: 'Five lines, starting with `Client: sending GET /hello`. Your text appears in the body line. Without `stop(0)` the program prints everything but does not end.'
      },
      check: [
        { q: 'Who sends the first message, the client or the server?', a: 'The client. The server only waits and answers.' },
        { q: 'What does port `0` mean in `new InetSocketAddress("127.0.0.1", 0)`?', a: '"Pick any free port for me." You ask the server which one with `server.getAddress().getPort()`.' },
        { q: 'Why does the program not end when you forget `server.stop(0)`?', a: 'The server thread still listens. The JVM only ends when all such threads have ended.' }
      ],
      keyPoints: [
        'The client asks, the server answers: one request, one response.',
        'A server listens on a host and a port. `localhost` and `127.0.0.1` mean this computer.',
        'A URL has a scheme, a host, a port and a path.',
        '`HttpClient` is the Java client, `HttpServer` is a tiny built-in Java server.',
        'Stop the server with `server.stop(0)`, or the program keeps running.'
      ],
      commonMistakes: [
        'Calling `http://localhost:8080/hello` while the server listens on another port. Fix: read the port with `server.getAddress().getPort()` and build the URL from it.',
        'Forgetting `server.start()`. The client gets `ConnectException`. Fix: call `start()` before the first request.',
        'Forgetting `server.stop(0)`. The program never ends. Fix: stop the server in a `finally` block.',
        'Thinking the server can send a message first. It cannot: in HTTP the client always starts.'
      ],
      related: ['Request and Response Anatomy', 'Calling an API with HttpClient', 'A Tiny Server with HttpServer'],
      glossary: G
    },
    {
      num: '02',
      id: 'request-response-anatomy',
      title: 'Request and Response Anatomy',
      category: 'foundations',
      icon: '✉',
      tagline: 'Start line, headers, empty line, body',
      realWorld: 'A letter in an envelope. On the envelope: who it is for and a sticker that says "fragile". Inside: the letter itself. The post office reads the envelope. Only the person who opens it reads the letter.',
      kid: [
        'When you send a letter, you write three things. On top: what you want ("Please send me a book"). On the envelope: little labels ("for Grandma", "urgent"). Inside: the letter itself.',
        'An HTTP request is the same. The first line says what you want. Then come labels called **headers**. Then an empty line. Then the **body**, the letter inside.',
        'The answer, the response, looks the same. Its first line has a number that says how it went. **200** means "all good". **404** means "I could not find it".'
      ],
      definition: 'An HTTP message is text in four parts: a **start line**, **headers**, an **empty line** and an optional **body**. A request starts with a method and a path, a response starts with a status code.',
      explain: [
        'The **request line** has three words: the **method** (what to do, such as `GET` or `POST`), the **path** (which thing, such as `/notes`) and the HTTP version (`HTTP/1.1`).',
        'Then come the **headers**: one `Name: value` per line. They carry extra facts. `Host` names the server. `Content-Type` says what kind of data the body is, such as `text/plain` or `application/json`. `Content-Length` says how many bytes the body has.',
        'An **empty line** ends the headers. Everything after it is the **body**: the actual data. A GET request usually has no body. A POST request usually has one.',
        'The response has the same shape. Its **status line** is the version, a three-digit **status code** and a short reason: `HTTP/1.1 201 Created`. Then response headers, an empty line and the response body.',
        `More details on headers and bodies: the CS lesson [HTTP requests and responses](${CS}#http-requests-responses). In Java you rarely see this text. The classes read and write it for you, but each part has its own method, and you need to know which one.`
      ],
      why: 'Both sides must find each part in the same place. The fixed shape lets any client talk to any server.',
      whenUse: 'Every time you build a request or read a response in Java, you set or read exactly these parts.',
      syntax: 'request: METHOD /path HTTP/1.1 · headers · empty line · body    response: HTTP/1.1 CODE Reason · headers · empty line · body',
      fileName: 'Anatomy.java',
      code: `import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

public class Anatomy {
    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/notes", exchange -> {
            // The server reads the four parts of the request.
            System.out.println("Server got method: " + exchange.getRequestMethod());
            System.out.println("Server got path:   " + exchange.getRequestURI().getPath());
            System.out.println("Server got header: " + exchange.getRequestHeaders().getFirst("Content-Type"));
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            System.out.println("Server got body:   " + body);

            // The server writes status, headers and body of the response.
            byte[] answer = "Saved your note.".getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "text/plain");
            exchange.sendResponseHeaders(201, answer.length);
            try (OutputStream out = exchange.getResponseBody()) {
                out.write(answer);
            }
        });
        server.start();
        URI address = URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/notes");

        try (HttpClient client = HttpClient.newHttpClient()) {
            HttpRequest request = HttpRequest.newBuilder(address)
                    .header("Content-Type", "text/plain")
                    .POST(HttpRequest.BodyPublishers.ofString("Buy milk"))
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Client got status: " + response.statusCode());
            System.out.println("Client got header: " + response.headers().firstValue("Content-Type").orElse("none"));
            System.out.println("Client got body:   " + response.body());
        } finally {
            server.stop(0);
        }
    }
}`,
      output: `Server got method: POST
Server got path:   /notes
Server got header: text/plain
Server got body:   Buy milk
Client got status: 201
Client got header: text/plain
Client got body:   Saved your note.`,
      codeSummary: 'The client sends a POST with a header and a text body. The server prints every part it receives, then answers with status 201, a header and a body. The client prints those three parts.',
      codeExplanation: [
        { label: 'Line 15', code: 'exchange.getRequestMethod()', text: 'The method from the request line: `POST`.' },
        { label: 'Line 16', code: 'exchange.getRequestURI().getPath()', text: 'The path from the request line: `/notes`. `getRequestURI()` is the whole target, `getPath()` is the part before any `?`.' },
        { label: 'Line 17', code: 'exchange.getRequestHeaders().getFirst("Content-Type")', text: 'Reads one header. Header names ignore upper and lower case, so `content-type` finds it too.' },
        { label: 'Line 18', code: 'new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8)', text: 'The body arrives as bytes. `readAllBytes()` reads them all, `new String(..., UTF_8)` turns them into text.' },
        { label: 'Line 23', code: 'exchange.getResponseHeaders().set("Content-Type", "text/plain");', text: 'Sets a response header. Headers must be set **before** `sendResponseHeaders`, because that call sends them.' },
        { label: 'Line 24', code: 'exchange.sendResponseHeaders(201, answer.length);', text: 'Sends the status line and all headers. `201` means Created. The second number is the body length in bytes.' },
        { label: 'Line 34', code: '.header("Content-Type", "text/plain")', text: 'The client adds a header to the request.' },
        { label: 'Line 35', code: '.POST(HttpRequest.BodyPublishers.ofString("Buy milk"))', text: 'Sets the method to POST and the body to the text `Buy milk`. A **body publisher** turns your data into bytes for the request.' },
        { label: 'Line 39', code: 'response.headers().firstValue("Content-Type").orElse("none")', text: '`firstValue` returns an `Optional`, a box that may be empty. `orElse("none")` gives `"none"` when the header is missing.' },
        { label: 'Line 40', code: 'response.body()', text: 'The response body, already a `String` because of `BodyHandlers.ofString()`.' }
      ],
      sections: [
        {
          title: 'The request as plain text',
          text: [
            'This is the text the client in the example sends over the connection. You never type it in Java, but it helps to see it once.',
            'Read it top to bottom: request line, three headers, one empty line, the body. `Content-Length: 8` matches the 8 bytes of `Buy milk`.'
          ],
          fileName: 'request.http',
          codeLanguage: 'http',
          code: `POST /notes HTTP/1.1
Host: 127.0.0.1:51164
Content-Type: text/plain
Content-Length: 8

Buy milk`,
          mermaid: 'flowchart TD\n  A["Start line: POST /notes HTTP/1.1"] --> B["Headers: one Name: value per line"]\n  B --> C["Empty line: the headers end here"]\n  C --> D["Body: Buy milk"]',
          diagramNote: 'Every HTTP message, request or response, has these four parts in this order. Only the body may be missing.'
        },
        {
          title: 'The response as plain text',
          text: [
            'This is the real answer the tiny Java server sends, captured with `curl -i`. The JDK server writes header names as `Content-type` with a small `t`. That is fine: header names ignore case.',
            'The server added `Date` and `Content-length` by itself.'
          ],
          fileName: 'response.http',
          codeLanguage: 'http',
          code: `HTTP/1.1 201 Created
Date: Wed, 21 Oct 2026 15:33:28 GMT
Content-type: text/plain
Content-length: 16

Saved your note.`
        },
        {
          title: 'Headers you meet first',
          text: ['There are many headers. These few cover almost every beginner program.'],
          table: {
            head: ['Header', 'In', 'Example', 'Means'],
            rows: [
              ['`Host`', 'request', '`Host: api.example.com`', 'which server name you want'],
              ['`Accept`', 'request', '`Accept: application/json`', 'which formats you can read'],
              ['`Content-Type`', 'both', '`Content-Type: application/json`', 'what kind of data the body is'],
              ['`Content-Length`', 'both', '`Content-Length: 16`', 'how many bytes the body has'],
              ['`Authorization`', 'request', '`Authorization: Bearer abc123`', 'who you are (a key or token)'],
              ['`Location`', 'response', '`Location: /notes/7`', 'where a new thing now lives']
            ],
            note: '`HttpClient` sets `Host` and `Content-Length` for you. You set `Accept`, `Content-Type` and `Authorization` with `.header(...)`.'
          }
        },
        {
          title: 'Which Java method reads which part',
          text: ['The same four parts have a getter or setter on each side.'],
          table: {
            head: ['Part', 'Client side (HttpRequest / HttpResponse)', 'Server side (HttpExchange)'],
            rows: [
              ['method', '`.GET()`, `.POST(...)`, `.method("PATCH", ...)`', '`getRequestMethod()`'],
              ['path and query', '`newBuilder(URI.create(url))`', '`getRequestURI().getPath()`, `.getQuery()`'],
              ['request headers', '`.header("Accept", "application/json")`', '`getRequestHeaders().getFirst(name)`'],
              ['request body', '`BodyPublishers.ofString(text)`', '`getRequestBody().readAllBytes()`'],
              ['status code', '`response.statusCode()`', '`sendResponseHeaders(code, length)`'],
              ['response headers', '`response.headers().firstValue(name)`', '`getResponseHeaders().set(name, value)`'],
              ['response body', '`response.body()`', '`getResponseBody().write(bytes)`']
            ]
          },
          warn: 'On the server the order matters: set the headers, then `sendResponseHeaders`, then write the body. Headers you set after `sendResponseHeaders` are never sent.'
        }
      ],
      technical: [
        'On the wire every line ends with two characters: carriage return and line feed (CR LF). The empty line is CR LF alone. That is how the server knows the headers are over.',
        'The server reads exactly `Content-Length` bytes as the body. If the length is wrong, it reads too little or waits for bytes that never come. The JDK classes count the bytes for you. That is why you pass `answer.length` (bytes), not the length of the `String` (characters): the letter `ü` is one character but two bytes in UTF-8.',
        'Header names are case-insensitive. The JDK server stores them with the first letter big and the rest small (`Content-type`). HTTP/2 even sends them all in small letters. Never compare header names with `equals`. Use the lookup methods, which ignore case.'
      ],
      tryIt: {
        steps: [
          'Run `Anatomy.java`.',
          'Change the body `"Buy milk"` to `"Buy milk and bread"`.',
          'Change the status `201` to `202` in the server.',
          'Add a request header `.header("X-Color", "blue")` and print it on the server with `getFirst("X-Color")`.'
        ],
        see: 'The server prints the new body. The client prints `Client got status: 202`. The server prints `blue` for your own header.'
      },
      check: [
        { q: 'What separates the headers from the body?', a: 'One empty line.' },
        { q: 'Which header tells the receiver what kind of data the body is?', a: '`Content-Type`, for example `application/json` or `text/plain`.' },
        { q: 'On the server, why must you set headers before `sendResponseHeaders`?', a: 'That call sends the status line and all headers at once. Later headers are never sent.' }
      ],
      keyPoints: [
        'Request: method, path, headers, body. Response: status code, headers, body.',
        'Headers are `Name: value` lines. An empty line ends them.',
        '`Content-Type` names the body format, `Content-Length` its size in bytes.',
        'Header names ignore case.',
        'Server order: headers, then `sendResponseHeaders`, then body.'
      ],
      commonMistakes: [
        '`exchange.sendResponseHeaders(200, text.length())` with a `String`. Fix: send the byte count, `bytes.length`, because one character can be several bytes.',
        'Setting `Content-Type` after `sendResponseHeaders`. Fix: set all headers first.',
        'Sending JSON without `Content-Type: application/json`. Fix: always set it, so the other side knows how to read the body.',
        'Sending a body with GET. Many servers ignore it. Fix: put filters for GET in the query string, and send bodies with POST, PUT or PATCH.'
      ],
      related: ['Client and Server', 'Status Codes', 'JSON Basics and Payload Shape'],
      glossary: G
    }
  );
})();
