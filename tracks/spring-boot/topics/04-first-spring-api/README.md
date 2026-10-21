# Step 04: Spring Boot, the first web API

> [!PICTURE]
> Picture the ParcelPilot depot. A customer walks up to the **front desk** with a filled-in form: "please send this parcel to Ava". The clerk reads the form, hands it to the back room, and gives the customer a receipt. The front desk is your **controller**. The form and the receipt are **DTOs**. The customer could be a person, a phone app or `curl`.

<div data-anim="restaurant"></div>

## The problem right now

Your program only talks to its own terminal via `main`. To be useful, other programs (a phone app, a website, `curl`) must create and read parcels **over the network**, without your Java source. The standard way to do that is an HTTP **API**.

## HTTP and REST, in one minute

You already know these ideas. Here is the short version; the full lessons are linked.

- A **client** sends a **request** (method + path + optional JSON body). The **server** answers with a **response** (status code + optional body). Full lesson: [HTTP requests and responses](../../../computer-science/index.html#http-requests-responses).
- **REST** names data as **resources** (`/parcels/P-1`) and uses HTTP **methods** as the verbs (`GET` reads, `POST` creates, `PATCH` changes, `DELETE` removes). `GET` is **safe**: it never changes data. Full lesson: [REST and HTTP in Java](../../../java/topics/rest-and-http/index.html).

```mermaid
sequenceDiagram
  participant C as curl (client)
  participant S as Spring Boot (server)
  C->>S: POST /parcels  body={"id":"P-2","recipient":"Ava"}
  S-->>C: 201 Created  body={"id":"P-2","recipient":"Ava","status":"CREATED"}
```

The ParcelPilot endpoints you build in this step and its lab:

| You want to… | Request | Typical response |
|---|---|---|
| Create a parcel | `POST /parcels` | `201 Created` + the new parcel |
| Read one | `GET /parcels/P-1` | `200 OK`, or `404 Not Found` |
| Filter | `GET /parcels?status=CREATED` | `200 OK` + a list |
| Change status (lab) | `PATCH /parcels/P-1/status` | `200 OK`, or `409 Conflict` |

## Key words

| Word | Beginner meaning |
|---|---|
| **Endpoint** | One callable method+path, e.g. `GET /parcels/{id}`. |
| **Spring Boot** | A framework that runs your Java as a web server with minimal setup. |
| **Controller** | A class whose methods handle incoming HTTP requests (the front desk). |
| **Annotation** | A `@Something` label that tells Spring how to treat a class or method. |
| **DTO** | Data Transfer Object: a small class shaped for the API request or response (the form and the receipt). |
| **Dependency injection** | Spring creates your objects and hands them what they need. See the [DI walkthrough](dependency-injection-walkthrough.md). |

## Why Spring Boot? Pros and cons

**What it brings us:** an embedded web server, automatic JSON conversion, and dependency injection, so you focus on parcels, not plumbing.

**Pros:** fast to start, huge ecosystem, industry standard for Java.
**Cons:** annotations do hidden "magic", the app is larger, and there's a learning curve for what happens behind the scenes.

**Real-world example:** a delivery company's app calls `GET /parcels?status=CREATED` to list pickups and `PATCH /parcels/{id}/status` when a driver scans a package.

## Build it in ParcelPilot (do this exactly)

Still one project: `applications/parcelpilot`. We turn it into a Spring Boot app.

### 1. Make `pom.xml` a Spring Boot project

Add the Spring Boot parent and the web starter (keep your JUnit dependency). A **starter** is a bundle of related libraries:

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.3.2</version>
</parent>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

### 2. Add the application entry point

`@SpringBootApplication` marks the start of a Spring Boot app, and `SpringApplication.run(...)` boots the embedded web server:

```java
package com.parcelpilot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ParcelPilotApplication {
    public static void main(String[] args) {
        SpringApplication.run(ParcelPilotApplication.class, args);
    }
}
```

### 3. Add request/response DTOs

DTOs are small classes shaped for the API. `record` makes them one line. We keep them separate from the internal `Parcel` so the API shape and the domain can evolve independently (the full reasoning, plus how these records become JSON, is in [JSON and DTOs](json-and-dtos.md)):

```java
package com.parcelpilot;

public record CreateParcelRequest(String id, String recipient) {}
public record ParcelResponse(String id, String recipient, String status) {}
```

### 4. Write the controller (the heart of this step)

Every annotation is explained in comments below, and in depth in [Annotations and imports in Spring Boot](annotations-imports.md) (what `@RestController`, `@GetMapping`, `@RequestBody`, etc. mean, and why imports matter). It's fine for now that this one class holds the data and the endpoints. A real database arrives in step 10, and you'll split responsibilities into controller/service/repository **layers** in step 11. Want to see that layering shape (and why we don't do it yet)? See Stage 4 of [Code organization](../../references/architecture/code-organization.md).

```java
package com.parcelpilot;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController                 // this class handles HTTP and returns JSON
@RequestMapping("/parcels")     // every path below starts with /parcels
public class ParcelController {

    // Temporary in-memory storage (a Map). Replaced by a database in step 10.
    private final Map<String, Parcel> store = new ConcurrentHashMap<>();

    // POST /parcels  -> create a parcel from the JSON body
    @PostMapping
    public ResponseEntity<ParcelResponse> create(@RequestBody CreateParcelRequest req) {
        Parcel parcel = new Parcel(req.id(), req.recipient()); // constructor validates input
        store.put(parcel.id(), parcel);
        return ResponseEntity
                .status(201)                                   // 201 Created
                .body(toResponse(parcel));
    }

    // GET /parcels/{id}  -> read one parcel, or 404 if missing
    @GetMapping("/{id}")
    public ResponseEntity<ParcelResponse> getOne(@PathVariable String id) {
        Parcel parcel = store.get(id);
        if (parcel == null) {
            return ResponseEntity.notFound().build();          // 404 Not Found
        }
        return ResponseEntity.ok(toResponse(parcel));          // 200 OK
    }

    // GET /parcels?status=CREATED  -> filtered list (query parameters)
    @GetMapping
    public List<ParcelResponse> list(@RequestParam(required = false) String status) {
        List<ParcelResponse> result = new ArrayList<>();
        for (Parcel p : store.values()) {
            if (status == null || p.status().name().equals(status)) {
                result.add(toResponse(p));
            }
        }
        return result;                                         // 200 OK + JSON array
    }

    private ParcelResponse toResponse(Parcel p) {
        return new ParcelResponse(p.id(), p.recipient(), p.status().name());
    }
}
```

**What the annotations mean:**

- `@RestController`: the class handles HTTP and its return values become the JSON response body.
- `@RequestMapping("/parcels")`: a shared path prefix for the whole class.
- `@PostMapping`, `@GetMapping`: map a method to `POST`/`GET`.
- `@RequestBody`: convert the incoming JSON into a Java object.
- `@PathVariable`: grab a value from the URL path (`{id}`).
- `@RequestParam`: grab a value from the query string (`?status=...`).
- `ResponseEntity`: lets you set the status code and body explicitly.

### 5. (Lab) Add status changes

Do the [REST API lab](rest-api.md) to add `PATCH /parcels/{id}/status`, returning `409 Conflict` on illegal transitions (reusing the rules from step 02). The lab ends with a predict-then-verify tour of the status codes.

## Test it

```bash
cd applications/parcelpilot
mvn spring-boot:run
```

In a second terminal (`-i` shows the status line and headers):

```bash
# create
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' \
  -d '{"id":"P-2","recipient":"Ava"}'

# read it back
curl -i http://localhost:8080/parcels/P-2

# read a missing one -> 404
curl -i http://localhost:8080/parcels/does-not-exist

# filter
curl -i 'http://localhost:8080/parcels?status=CREATED'
```

## Acceptance criteria

- [ ] `mvn spring-boot:run` starts and the app listens on port 8080.
- [ ] `POST /parcels` returns `201` and the created parcel as JSON.
- [ ] `GET /parcels/{id}` returns `200`+JSON for an existing parcel and `404` for a missing one.
- [ ] `GET /parcels?status=CREATED` returns only matching parcels.
- [ ] (Lab) an illegal status change returns `409 Conflict`.
- [ ] You've predicted and verified the status codes in the [REST API lab](rest-api.md#part-2-status-codes-predict-then-verify).
- [ ] You can point at each annotation in your controller and say what it does (see [annotations guide](annotations-imports.md)).
- [ ] You can explain why `GET` must be **safe** (see [REST and HTTP in Java](../../../java/topics/rest-and-http/index.html)).

## Say it like a developer

- "I exposed a REST **endpoint**: `POST /parcels` creates a parcel."
- "`/parcels/P-1` is a **resource**, and the **method** (`GET`, `POST`, `PATCH`) is the verb on it."
- "The controller takes the request **body** as JSON and turns it into a `CreateParcelRequest` **DTO** via `@RequestBody`."
- "`@PathVariable` pulls `{id}` out of the URL, and `@RequestParam` pulls `?status=` out of the query string."
- "I return a `201 Created` **status code** on success and `404 Not Found` when the parcel doesn't exist."
- "`GET` is **safe**: reading never changes data."

## Check

> [!CHECK]
> 1. Why keep separate `CreateParcelRequest` / `ParcelResponse` DTOs instead of exposing the internal `Parcel`?
>    <details><summary>Answer</summary>So the API shape and the internal domain can change independently. You can change internal fields without breaking clients, and you do not leak internal details.</details>
> 2. Which status code fits: create succeeded / the parcel does not exist / an illegal status change?
>    <details><summary>Answer</summary><code>201 Created</code>, <code>404 Not Found</code>, <code>409 Conflict</code>.</details>
> 3. What does "`GET` is **safe**" mean?
>    <details><summary>Answer</summary>A safe method only reads and never changes server data. Calling <code>GET</code> a hundred times must not create, modify, or delete anything.</details>
> 4. What do `@RequestBody`, `@PathVariable`, and `@RequestParam` each grab?
>    <details><summary>Answer</summary><code>@RequestBody</code> converts the incoming JSON body into a Java object. <code>@PathVariable</code> grabs a value from the URL path (<code>/parcels/{id}</code>). <code>@RequestParam</code> grabs a value from the query string (<code>?status=CREATED</code>).</details>

## Reflect (stretch)

Stop and restart the app, then `GET /parcels/P-2`. It's gone, because the `Map` lives in memory. That restart-data-loss still gets fixed later: **portability** in step 09 (Docker) and **durability** in step 10 (a database). But the NEXT problem is nearer: the API **trusts input blindly**. Try `POST /parcels` with an empty `"id"` or a blank `"recipient"` and watch either a confusing `500` or a broken parcel get happily stored. An API that accepts garbage is a bug factory.

## Next

[Step 05](../05-validation-and-inputs/README.md): reject bad input at the boundary with Bean Validation, and return helpful 400s.
