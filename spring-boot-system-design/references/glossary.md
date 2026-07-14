# Glossary

Every key term from the course, alphabetically, each linked to the step that introduces it. Use this as a lookup aid: when you hit an unfamiliar word while working a step, find it here and jump to where it's taught. It is **not** meant to be read top to bottom — and meeting a term you don't know yet is normal, because steps introduce terms exactly when you need them.

Links point to the step README, or to the specific companion file when the term only appears there. A second link means the term is developed further later.

---

## 0–9

**400 Bad Request** — The HTTP status for "your request was malformed — fix it and retry." → [Step 05](../topics/05-validation-and-inputs/README.md)

**401 Unauthorized** — The HTTP status for "not authenticated" (no valid login/token). → [Step 16](../topics/16-jwt-authentication/README.md)

**403 Forbidden** — The HTTP status for "authenticated, but not allowed to do this." → [Step 16](../topics/16-jwt-authentication/README.md)

**409 Conflict** — The HTTP status for "your update clashed with someone else's." → [Step 10](../topics/10-persistence/README.md)

**429 Too Many Requests** — The HTTP status for "you've hit the rate limit." → [Step 15](../topics/15-performance-and-safety/README.md)

## A

**Abstraction** — Describing *what* something does while hiding *how*. → [Step 02](../topics/02-oop-and-composition/interfaces-and-abstractions.md)

**Acknowledge (ack)** — The consumer telling the broker "done, you can drop this message." → [Step 12](../topics/12-queues/README.md)

**Actuator** — Spring's built-in health/metrics endpoints (`/actuator/health`). → [Step 14](../topics/14-compose-and-observe/README.md)

**Adapter** — Code that translates between the outside world (HTTP, DB) and your domain. → [Step 11](../topics/11-monolith/README.md) (deep dive: [ports and adapters](../topics/11-monolith/ports-and-adapters.md))

**Additive change** — Adding something new to a contract without touching what exists — safe. → [Step 13](../topics/13-split-services/service-contracts.md)

**Annotation** — A `@Something` label that tells Spring (or the compiler) how to treat a class or method. → [Step 04](../topics/04-first-spring-api/README.md)

**API** — A defined way for programs to talk to each other. → [Step 04](../topics/04-first-spring-api/README.md)

**API contract** — The agreed shape and rules of your API: what clients must send, what they get back. → [Step 05](../topics/05-validation-and-inputs/README.md) (deep dive: [validation-and-api-contracts.md](validation-and-api-contracts.md))

**Application context** — Spring's container: the registry holding all beans, built at startup. → [Step 04](../topics/04-first-spring-api/dependency-injection-walkthrough.md)

**Artifact** — The thing your build produces (here, a JAR). → [Step 03](../topics/03-maven/README.md)

**Assertion** — A check inside a test, e.g. "the status must equal DELIVERED." → [Step 03](../topics/03-maven/README.md)

**Asynchronous (async)** — The caller gets a response now, and the work happens later. → [Step 12](../topics/12-queues/README.md)

**At-least-once** — Delivery guarantee: nothing is lost, but duplicates happen (ack after processing). → [Step 12](../topics/12-queues/idempotency-lab.md)

**At-most-once** — Delivery guarantee: no duplicates possible, but a message can be lost (ack before processing). → [Step 12](../topics/12-queues/idempotency-lab.md)

**Authentication (authn)** — Proving *who* you are (login). → [Step 16](../topics/16-jwt-authentication/README.md) (deep dive: [authentication.md](authentication.md))

**Authority** — Spring Security's word for one granted permission string; a role is an authority with a `ROLE_` prefix. → [Step 16](../topics/16-jwt-authentication/authz-vs-authn-lab.md)

**Authorization (authz)** — Deciding *what* you're allowed to do (roles/permissions). → [Step 16](../topics/16-jwt-authentication/README.md)

**Availability** — The share of time a service can actually answer requests. → [Step 13](../topics/13-split-services/network-failure-lab.md)

## B

**Backlog** — Messages piling up in a queue because the consumer isn't taking them. → [Step 13](../topics/13-split-services/network-failure-lab.md)

**Backoff** — Waiting longer between retry attempts (1s, 10s, 60s…) instead of hammering instantly. → [Step 12](../topics/12-queues/retries-and-dead-letters.md)

**Base image** — The image your image starts from, named by `FROM`. → [Step 09](../topics/09-docker/dockerfile-line-by-line.md)

**Bean** — An object that Spring creates and manages for you. → [Step 04](../topics/04-first-spring-api/dependency-injection-walkthrough.md)

**Bean Validation** — The Java standard for declaring input rules with annotations (`jakarta.validation`). → [Step 05](../topics/05-validation-and-inputs/README.md) (deep dive: [bean validation explained](../topics/05-validation-and-inputs/bean-validation-explained.md))

**Bearer token** — A token sent in the `Authorization: Bearer <token>` header. → [Step 16](../topics/16-jwt-authentication/README.md)

**Boundary** — The edge where outside data enters your app; later, the line separating one module's responsibility from another's. → [Step 05](../topics/05-validation-and-inputs/README.md), [Step 11](../topics/11-monolith/README.md)

**Boundary violation** — Code in one module importing another module's internals. → [Step 11](../topics/11-monolith/module-boundaries-lab.md)

**Breaking change** — Renaming/removing/retyping something a consumer relies on — dangerous. → [Step 13](../topics/13-split-services/service-contracts.md)

**Breakpoint** — The marker that tells the debugger where to pause. → [Step 01](../topics/01-java-basics/debugging-your-first-program.md)

**Broker** — The server that stores and routes messages (RabbitMQ here). → [Step 12](../topics/12-queues/README.md)

**Bug** — A gap between what the code does and what you intended. → [Step 01](../topics/01-java-basics/debugging-your-first-program.md)

**Build context** — The set of files Docker is allowed to read during a build (usually your project folder). → [Step 09](../topics/09-docker/README.md)

**Build tool** — A program that automates compiling, testing, and packaging. → [Step 03](../topics/03-maven/README.md)

**Builder (pattern)** — Construct an object step-by-step, readably. → [Step 02](../topics/02-oop-and-composition/README.md)

**Bytecode** — The compiled `.class` instructions the JVM understands. → [Step 01](../topics/01-java-basics/how-java-works.md)

## C

**Cache** — A fast, temporary copy of data to avoid repeating slow work. → [Step 15](../topics/15-performance-and-safety/README.md)

**Cache invalidation** — Removing/updating stale cache entries after data changes. → [Step 15](../topics/15-performance-and-safety/README.md) (deep dive: [cache invalidation lab](../topics/15-performance-and-safety/cache-invalidation-lab.md))

**Cache-aside** — Pattern: check the cache first, and on a miss read the DB and fill the cache. → [Step 15](../topics/15-performance-and-safety/README.md)

**Catch** — To intercept a thrown exception and decide what to do instead of crashing. → [Step 01](../topics/01-java-basics/exceptions-intro.md)

**Checked exception** — An exception the compiler forces you to declare or catch (e.g. `IOException`). → [Step 06](../topics/06-error-handling/README.md)

**Checksum (migration)** — A fingerprint of a migration file, used to detect that an applied file was edited. → [Step 10](../topics/10-persistence/flyway-migrations-explained.md)

**CI (Continuous Integration)** — A server that runs your build + tests automatically. → [Step 03](../topics/03-maven/README.md)

**Claim** — A fact inside a JWT, e.g. `sub` (subject) or `role`. → [Step 16](../topics/16-jwt-authentication/README.md)

**Class** — A blueprint that describes what a kind of thing *is* and *can do*. → [Step 01](../topics/01-java-basics/README.md)

**Classpath** — The list of places the JVM looks to find your classes and libraries. → [Step 01](../topics/01-java-basics/how-java-works.md)

**Client** — Anything that sends a request to a server (here: `curl`). → [Step 00](../topics/00-start-here/README.md)

**Cohesion** — How focused a module is on one job (more is better). → [Step 11](../topics/11-monolith/README.md)

**Collection** — An object that holds other objects (a container). → [Step 01](../topics/01-java-basics/collections-basics.md)

**Column** — One field of every row in a table (e.g. `status`). → [Step 10](../topics/10-persistence/sql-and-databases.md)

**Command** — One instruction you type in a terminal and run, e.g. `curl ...`. → [Step 00](../topics/00-start-here/README.md)

**Compensating migration** — A *new* migration that undoes or corrects an earlier one, instead of editing history. → [Step 10](../topics/10-persistence/flyway-migrations-explained.md)

**Component scan** — Spring's startup search for classes marked `@Component` / `@Service` / `@RestController` etc. → [Step 04](../topics/04-first-spring-api/dependency-injection-walkthrough.md)

**`compose.yaml`** — The file describing all services, networks, volumes, and settings for Docker Compose. → [Step 14](../topics/14-compose-and-observe/README.md)

**Composition** — An object *has* the helpers it needs, given from outside ("has-a"). → [Step 02](../topics/02-oop-and-composition/README.md)

**Constraint** — One validation rule on one field, e.g. `@NotBlank` = "must not be null or only spaces." → [Step 05](../topics/05-validation-and-inputs/README.md)

**Constructor** — Special setup code that runs when you create an object. → [Step 01](../topics/01-java-basics/README.md)

**Constructor injection** — Receiving dependencies as constructor parameters — the recommended style. → [Step 04](../topics/04-first-spring-api/dependency-injection-walkthrough.md)

**Consumer (worker)** — The code that takes messages off a queue and processes them. → [Step 12](../topics/12-queues/README.md)

**Container** — A running instance of an image, isolated from the rest of your machine. → [Step 00](../topics/00-start-here/README.md) (more: [Step 09](../topics/09-docker/README.md))

**Contract (of an interface)** — The promise: "anything of this type can do these things." → [Step 02](../topics/02-oop-and-composition/interfaces-and-abstractions.md)

**Contract (between services)** — The agreed message/API shape *and meaning* two services rely on to talk. → [Step 13](../topics/13-split-services/README.md) (deep dive: [service contracts](../topics/13-split-services/service-contracts.md))

**Controller** — A class whose methods handle incoming HTTP requests. → [Step 04](../topics/04-first-spring-api/README.md)

**Convention** — A standard folder layout Maven expects, so you write almost no config. → [Step 03](../topics/03-maven/README.md)

**Correlation ID (request ID)** — A unique ID given to one logical operation so you can find all its log lines, across services. → [Step 07](../topics/07-logging-and-observability-basics/README.md) (deep dive: [correlation IDs](../topics/14-compose-and-observe/correlation-ids.md))

**Coupling** — How tightly parts depend on each other (less is usually better). → [Step 11](../topics/11-monolith/README.md)

**Crash** — Informal for: an exception reached the top with nobody catching it, so the program ended. → [Step 01](../topics/01-java-basics/exceptions-intro.md)

**Credential** — A secret used to log in (here: username + password). → [Step 16](../topics/16-jwt-authentication/README.md)

**CRUD** — Create, Read, Update, Delete. → [Step 10](../topics/10-persistence/jpa-and-repositories.md)

## D

**Database** — A separate program built to store and query data reliably. → [Step 10](../topics/10-persistence/README.md)

**Database per service** — Each service owns its own data, and others can't read it directly. → [Step 13](../topics/13-split-services/README.md)

**Dead-letter queue (DLQ)** — A separate queue where messages go after too many failures, instead of looping forever. → [Step 12](../topics/12-queues/retries-and-dead-letters.md)

**Debugger** — An IDE tool that pauses your program on a line so you can inspect everything. → [Step 01](../topics/01-java-basics/debugging-your-first-program.md)

**Debugging** — Systematically locating a bug using evidence. → [Step 01](../topics/01-java-basics/debugging-your-first-program.md)

**Deduplication (dedup)** — Detecting "I've already handled this one" and skipping the repeat. → [Step 12](../topics/12-queues/idempotency-lab.md)

**Default method** — An interface method *with* a body, used by implementations that don't override it. → [Step 02](../topics/02-oop-and-composition/interfaces-and-abstractions.md)

**Dependency (in code)** — Something an object needs to do its job (e.g. a tracker needs a clock). → [Step 02](../topics/02-oop-and-composition/README.md)

**Dependency (Maven)** — An external library your project uses, which Maven downloads automatically. → [Step 03](../topics/03-maven/README.md)

**Dependency direction** — Who imports whom; here adapters import the core, never the reverse. → [Step 11](../topics/11-monolith/ports-and-adapters.md)

**Dependency injection (DI)** — Someone else creates the dependency and hands it in, instead of your class calling `new`. → [Step 04](../topics/04-first-spring-api/README.md) (deep dive: [DI walkthrough](../topics/04-first-spring-api/dependency-injection-walkthrough.md))

**`depends_on`** — Tells Compose to start (and optionally wait for) other services first. → [Step 14](../topics/14-compose-and-observe/README.md)

**Deserialization** — Turning JSON text **into** a Java object (text → object). → [Step 04](../topics/04-first-spring-api/json-and-dtos.md)

**Design pattern** — A named, reusable solution to a common problem. → [Step 02](../topics/02-oop-and-composition/README.md) (deep dive: [design-patterns.md](design-patterns.md))

**Docker** — The tool that downloads images and runs them as containers. → [Step 00](../topics/00-start-here/README.md) (more: [Step 09](../topics/09-docker/README.md))

**Docker Compose** — A tool to define and run a multi-container system from one file. → [Step 14](../topics/14-compose-and-observe/README.md)

**Dockerfile** — A recipe listing the steps to build an image. → [Step 09](../topics/09-docker/README.md) (deep dive: [Dockerfile line by line](../topics/09-docker/dockerfile-line-by-line.md))

**`.dockerignore`** — Files Docker should not copy (like `.gitignore`). → [Step 09](../topics/09-docker/README.md)

**Domain** — The core business rules and objects (e.g. the parcel lifecycle). → [Step 11](../topics/11-monolith/README.md)

**Domain object** — Your internal class with rules and behavior (like `Parcel`) — not the same thing as a DTO. → [Step 04](../topics/04-first-spring-api/json-and-dtos.md)

**DTO (Data Transfer Object)** — A small class whose only job is to define the API's request/response shape. → [Step 04](../topics/04-first-spring-api/README.md) (deep dive: [JSON and DTOs](../topics/04-first-spring-api/json-and-dtos.md))

## E

**Encapsulation** — Keep data private, and only change it through methods that enforce rules. → [Step 02](../topics/02-oop-and-composition/README.md)

**End-to-end (E2E) test** — Tests the fully running system from the outside, like a real client would. → [Step 08](../topics/08-testing/README.md) (deep dive: [unit vs integration vs e2e](../topics/08-testing/unit-vs-integration-vs-e2e.md))

**Endpoint** — One callable method+path, e.g. `GET /parcels/{id}`. → [Step 04](../topics/04-first-spring-api/README.md)

**Entity** — A Java class mapped to a database table (`@Entity`). → [Step 10](../topics/10-persistence/README.md) (deep dive: [JPA and repositories](../topics/10-persistence/jpa-and-repositories.md))

**Enum** — A fixed, named set of allowed values (e.g. the parcel statuses). → [Step 02](../topics/02-oop-and-composition/README.md) (deep dive: [enums explained](../topics/02-oop-and-composition/enums-explained.md))

**Environment variable** — A setting passed to a program at startup (e.g. DB address, password). → [Step 10](../topics/10-persistence/README.md)

**Error code** — A short machine-readable string like `PARCEL_NOT_FOUND` that clients match on instead of parsing prose. → [Step 06](../topics/06-error-handling/README.md)

**Error contract** — The agreed shape of every error response, so clients can rely on it. → [Step 06](../topics/06-error-handling/README.md) (deep dive: [error-handling-and-http-statuses.md](error-handling-and-http-statuses.md))

**Event** — A message describing a fact that already happened (past tense), e.g. `ParcelDelivered`. → [Step 12](../topics/12-queues/README.md)

**Eventual consistency** — Different services become consistent shortly after a change, not instantly. → [Step 13](../topics/13-split-services/README.md)

**Eviction** — Removing an entry from the cache (by invalidation, TTL, or memory pressure). → [Step 15](../topics/15-performance-and-safety/cache-invalidation-lab.md)

**Exactly-once** — The dream delivery guarantee; effectively unattainable across real systems — you build at-least-once + idempotency and get the same *effect*. → [Step 12](../topics/12-queues/idempotency-lab.md)

**Exception** — An object signaling "something went wrong," thrown up the call chain until someone handles it. → [Step 01](../topics/01-java-basics/exceptions-intro.md) (more: [Step 06](../topics/06-error-handling/README.md))

**`@ExceptionHandler`** — Marks a method as the handler for one exception type. → [Step 06](../topics/06-error-handling/README.md)

**Exhaustive switch** — A `switch` covering every enum constant, so the compiler flags forgotten cases. → [Step 02](../topics/02-oop-and-composition/enums-explained.md)

**`EXPLAIN` / `EXPLAIN ANALYZE`** — SQL commands showing the plan the database would use for a query (and, with `ANALYZE`, real timings). → [Step 10](../topics/10-persistence/indexes-intro.md)

**`EXPOSE` / `-p`** — Declares / maps the port a containerized app listens on. → [Step 09](../topics/09-docker/README.md)

## F

**Facade** — A thin front interface hiding which implementation is behind it (how SLF4J relates to Logback). → [Step 07](../topics/07-logging-and-observability-basics/README.md)

**Factory (pattern)** — A method decides which object to create for you. → [Step 02](../topics/02-oop-and-composition/README.md)

**Failure isolation** — One service failing doesn't automatically break the others. → [Step 13](../topics/13-split-services/README.md)

**Field / attribute** — A piece of data an object stores. → [Step 01](../topics/01-java-basics/README.md)

**Field error** — One validation failure tied to one field, with a message. → [Step 05](../topics/05-validation-and-inputs/README.md)

**Flyway** — The library that finds, orders, runs, and records database migrations at app startup. → [Step 10](../topics/10-persistence/flyway-migrations-explained.md)

## G

**Garbage collector (GC)** — The JVM part that automatically frees memory you no longer use. → [Step 01](../topics/01-java-basics/how-java-works.md)

**Generics** — The `<...>` part that says what type a collection holds, e.g. `List<Parcel>`. → [Step 01](../topics/01-java-basics/collections-basics.md)

**Given-When-Then** — A way to structure a test: set up (given), act (when), check (then). → [Step 08](../topics/08-testing/README.md)

## H

**Hashing** — Turning input into a fixed-size, one-way fingerprint (used for keys, integrity, passwords). → [Step 15](../topics/15-performance-and-safety/README.md)

**Header (HTTP)** — Extra info on a request/response, e.g. `Content-Type: application/json`. → [Step 04](../topics/04-first-spring-api/README.md)

**Health check** — A command Compose runs to see if a service is actually ready. → [Step 14](../topics/14-compose-and-observe/README.md)

**Hexagonal architecture** — Core in the middle, ports on its edges, adapters plugged in from outside. → [Step 11](../topics/11-monolith/ports-and-adapters.md)

**Hibernate** — The most common JPA implementation. → [Step 10](../topics/10-persistence/jpa-and-repositories.md)

**HTTP** — The language clients and servers use to talk over a network. → [Step 00](../topics/00-start-here/README.md)

## I

**Idempotent** — Doing the same thing twice has the same result as doing it once. → [Step 12](../topics/12-queues/README.md) (deep dive: [idempotency lab](../topics/12-queues/idempotency-lab.md))

**Image** — A frozen, ready-to-run package of a program. → [Step 00](../topics/00-start-here/README.md) (more: [Step 09](../topics/09-docker/README.md))

**Independent deployment** — Releasing one service without redeploying the others. → [Step 13](../topics/13-split-services/README.md)

**Index (database)** — A sorted lookup structure the database maintains next to a table to find rows fast. → [Step 10](../topics/10-persistence/indexes-intro.md)

**Inheritance** — An object *is a* special kind of another ("is-a") — powerful but easy to misuse. → [Step 02](../topics/02-oop-and-composition/README.md)

**Integration test** — Tests several parts wired together, e.g. HTTP request → controller → error handler → JSON. → [Step 08](../topics/08-testing/README.md)

**Interface** — A contract: a list of methods without the how. → [Step 02](../topics/02-oop-and-composition/README.md) (deep dive: [interfaces and abstractions](../topics/02-oop-and-composition/interfaces-and-abstractions.md))

**Internal (of a module)** — Everything not in a module's public API: free to change, forbidden to outsiders. → [Step 11](../topics/11-monolith/module-boundaries-lab.md)

## J

**Jackson** — The Java library Spring Boot uses to convert between JSON and objects, automatically. → [Step 04](../topics/04-first-spring-api/json-and-dtos.md)

**JAR** — One packaged file containing your compiled program, runnable with `java -jar`. → [Step 03](../topics/03-maven/README.md)

**JDK (Java Development Kit)** — Everything to **build** Java: `javac`, the JVM, libraries. → [Step 01](../topics/01-java-basics/how-java-works.md)

**JIT (Just-In-Time compiler)** — Part of the JVM that speeds up frequently-run code. → [Step 01](../topics/01-java-basics/how-java-works.md)

**JPA** — The Java standard for mapping classes to database tables (annotations like `@Entity`). → [Step 10](../topics/10-persistence/README.md) (deep dive: [JPA and repositories](../topics/10-persistence/jpa-and-repositories.md))

**JRE (Java Runtime Environment)** — Just enough to **run** Java (the JVM + libraries), no compiler. → [Step 01](../topics/01-java-basics/how-java-works.md)

**JSON** — A text format for structured data that every language can read: `{"id":"P-1"}`. → [Step 04](../topics/04-first-spring-api/README.md) (deep dive: [JSON and DTOs](../topics/04-first-spring-api/json-and-dtos.md))

**`jsonPath`** — A way to point at a value inside a JSON response in a test, e.g. `$.code`. → [Step 08](../topics/08-testing/README.md)

**JUnit** — The most common Java testing library. → [Step 03](../topics/03-maven/README.md)

**JVM (Java Virtual Machine)** — The program that runs your bytecode. → [Step 01](../topics/01-java-basics/how-java-works.md)

**JWT (JSON Web Token)** — A signed token carrying claims (who you are, your role). → [Step 16](../topics/16-jwt-authentication/README.md)

## K

**Key / value** — In a `Map`, the label you look up by (key) and what you get back (value). → [Step 01](../topics/01-java-basics/collections-basics.md)

## L

**Layer (Docker)** — Each Dockerfile instruction creates a cached layer; unchanged layers are reused for faster builds. → [Step 09](../topics/09-docker/README.md)

**Layered vs feature packages** — Two ways to organize code: by technical layer (`controller/`, `service/`) or by feature (`parcel/`, `notification/`). → [Step 11](../topics/11-monolith/layered-vs-feature-packages.md)

**Lifecycle (Maven)** — Maven's fixed sequence of build steps (validate → compile → test → package → …). → [Step 03](../topics/03-maven/testing-with-maven.md)

**Local repository (`~/.m2`)** — The folder where Maven caches downloaded dependencies. → [Step 03](../topics/03-maven/common-build-failures.md)

**Locking** — Preventing conflicting simultaneous changes to the same data. → [Step 10](../topics/10-persistence/locking-explained.md) (more: [Step 15](../topics/15-performance-and-safety/README.md))

**Log** — A time-ordered record of events your app writes while running; one entry = timestamp + level + class + message. → [Step 07](../topics/07-logging-and-observability-basics/README.md) (deep dive: [logging.md](logging.md))

**Log level** — The severity label of a log line: `TRACE`, `DEBUG`, `INFO`, `WARN`, `ERROR`. → [Step 07](../topics/07-logging-and-observability-basics/README.md)

**Logback** — The logging *implementation* that formats and writes the lines — Spring Boot's default. → [Step 07](../topics/07-logging-and-observability-basics/README.md)

**Logger** — The object you call to write log lines, usually one per class. → [Step 07](../topics/07-logging-and-observability-basics/README.md)

## M

**`main`** — The one method Java runs first when the program starts. → [Step 01](../topics/01-java-basics/README.md)

**Maven** — The build tool this course uses for Java. → [Step 03](../topics/03-maven/README.md) (deep dive: [maven.md](maven.md))

**MDC (Mapped Diagnostic Context)** — A per-request "sticky note" attached to every log line, e.g. a request ID. → [Step 07](../topics/07-logging-and-observability-basics/README.md) (more: [correlation IDs](../topics/14-compose-and-observe/correlation-ids.md))

**Message** — A small piece of data describing something that happened or should happen. → [Step 12](../topics/12-queues/README.md)

**Method** — An action an object can do. → [Step 01](../topics/01-java-basics/README.md)

**Metric** — A named number the app keeps updated, e.g. a request counter or a timer. → [Step 14](../topics/14-compose-and-observe/metrics-intro.md)

**Microservice** — A small app that is built, deployed, and scaled independently. → [Step 13](../topics/13-split-services/README.md) (deep dive: [monolith-and-microservices.md](monolith-and-microservices.md))

**Migration** — A versioned SQL script that creates/changes tables, applied exactly once. → [Step 10](../topics/10-persistence/README.md) (deep dive: [Flyway migrations explained](../topics/10-persistence/flyway-migrations-explained.md))

**MockMvc** — A Spring tool that performs fake-but-realistic HTTP requests against your controller without starting a real server. → [Step 08](../topics/08-testing/README.md)

**Modular monolith** — A monolith with clear internal modules (boundaries), still one deployable. → [Step 11](../topics/11-monolith/README.md)

**Module** — A self-contained slice of the app for one feature (e.g. `parcel`, `notification`). → [Step 11](../topics/11-monolith/README.md)

**Monolith** — One application, built and deployed as a single unit. → [Step 11](../topics/11-monolith/README.md) (deep dive: [monolith-and-microservices.md](monolith-and-microservices.md))

**Multi-stage build** — Build in a big image, then copy only the result into a small image. → [Step 09](../topics/09-docker/README.md) (deep dive: [Dockerfile line by line](../topics/09-docker/dockerfile-line-by-line.md))

## N

**Nack / requeue** — The consumer telling the broker "failed" — optionally putting the message back in line. → [Step 12](../topics/12-queues/retries-and-dead-letters.md)

**Network (Compose)** — A private network so services reach each other by name (e.g. `rabbitmq`). → [Step 14](../topics/14-compose-and-observe/README.md)

**Network call** — Talking over the network, which is slower and can fail, unlike a local method call. → [Step 13](../topics/13-split-services/README.md)

**`new`** — The keyword that creates a new object from a class. → [Step 01](../topics/01-java-basics/README.md)

## O

**Object / instance** — One actual thing built from a class. → [Step 01](../topics/01-java-basics/README.md)

**Observability** — Being able to see what a running system is doing (logs, health, metrics). → [Step 14](../topics/14-compose-and-observe/README.md)

**OOP (Object-Oriented Programming)** — Organizing code as objects that hold data + behavior. → [Step 02](../topics/02-oop-and-composition/README.md)

**Optimistic locking** — Detecting clashing edits with a `version` number instead of blocking. → [Step 10](../topics/10-persistence/README.md) (deep dive: [locking explained](../topics/10-persistence/locking-explained.md), lab: [optimistic locking lab](../topics/15-performance-and-safety/optimistic-locking-lab.md))

**ORM (Object-Relational Mapping)** — Maps Java objects to database rows automatically. → [Step 10](../topics/10-persistence/jpa-and-repositories.md)

**`@Override`** — Annotation marking "this method fulfills a promise from the interface/parent" — checked by the compiler. → [Step 02](../topics/02-oop-and-composition/interfaces-and-abstractions.md)

## P

**p95** — The value 95% of requests stay under — a "typical worst case." → [Step 14](../topics/14-compose-and-observe/metrics-intro.md)

**Parameterized logging** — Writing `log.info("Created parcel {}", id)` with `{}` placeholders instead of string concatenation. → [Step 07](../topics/07-logging-and-observability-basics/README.md)

**Partial failure** — Some parts of the system are down or unreachable while others keep working. → [Step 13](../topics/13-split-services/network-failure-lab.md)

**Password hashing** — Storing a one-way, salted fingerprint of a password, never the password itself. → [Step 16](../topics/16-jwt-authentication/README.md)

**`PasswordEncoder`** — Spring Security's tool to hash and verify passwords (Argon2/bcrypt). → [Step 16](../topics/16-jwt-authentication/README.md)

**PATH** — The list of folders your terminal searches when you type a command name. → [GUIDE.md — Install (Ubuntu)](../GUIDE.md#install-ubuntu)

**Persistence** — Data that survives even after the app stops. → [Step 10](../topics/10-persistence/README.md)

**Pessimistic locking** — Blocking others from touching a row until you're done with it. → [Step 10](../topics/10-persistence/locking-explained.md)

**Platform independence** — "Write once, run anywhere": the same bytecode runs on any machine with a JVM. → [Step 01](../topics/01-java-basics/how-java-works.md)

**Poison message** — A message that fails processing every single time (bad data, permanent bug). → [Step 12](../topics/12-queues/retries-and-dead-letters.md)

**`pom.xml`** — Maven's project file: Java version, libraries, build settings. → [Step 03](../topics/03-maven/README.md)

**Port (network)** — A numbered "door" on a computer, e.g. `8080`, so traffic reaches the right program. → [Step 00](../topics/00-start-here/README.md)

**Port (hexagonal)** — An interface owned by the core describing something it needs (storage, notifying) or offers. → [Step 11](../topics/11-monolith/ports-and-adapters.md)

**PostgreSQL** — The relational (table-based) database this course uses. → [Step 10](../topics/10-persistence/README.md)

**Primary key** — The column that uniquely identifies a row (`id`). → [Step 10](../topics/10-persistence/sql-and-databases.md)

**`private`** — Hides a field so only its own class can change it directly. → [Step 01](../topics/01-java-basics/README.md)

**Producer** — The code that puts a message on the queue. → [Step 12](../topics/12-queues/README.md)

**Proxy (pattern)** — A stand-in object that adds behavior (like caching) around another. → [Step 15](../topics/15-performance-and-safety/README.md)

**Public API (of a module)** — The few classes/interfaces a module deliberately offers to others. → [Step 11](../topics/11-monolith/module-boundaries-lab.md)

## Q

**Query** — A request for data (a `SELECT`). → [Step 10](../topics/10-persistence/sql-and-databases.md)

**Queue** — A waiting line for messages: added at the back, processed from the front. → [Step 12](../topics/12-queues/README.md) (deep dive: [what is a queue](../topics/12-queues/what-is-a-queue.md))

## R

**Rate limiting** — Capping how many requests a client may make in a time window. → [Step 15](../topics/15-performance-and-safety/README.md) (deep dive: [rate limiting lab](../topics/15-performance-and-safety/rate-limiting.md))

**Redis** — A very fast in-memory data store often used as a cache. → [Step 15](../topics/15-performance-and-safety/README.md)

**Regression** — A feature that used to work and silently broke after a change. → [Step 08](../topics/08-testing/README.md)

**Regular expression (regex)** — A pattern language for text, e.g. `P-\d+` = "P-, then one or more digits." → [Step 05](../topics/05-validation-and-inputs/bean-validation-explained.md)

**Repository** — A Spring interface that reads/writes entities without you writing SQL. → [Step 10](../topics/10-persistence/README.md) (deep dive: [JPA and repositories](../topics/10-persistence/jpa-and-repositories.md))

**Request / response** — You ask (request), and the server answers (response). → [Step 00](../topics/00-start-here/README.md)

**Resource** — A thing your API exposes, e.g. a parcel at `/parcels/P-1`. → [Step 04](../topics/04-first-spring-api/README.md)

**REST** — A popular API style: name data as resources (nouns) + use HTTP methods as verbs. → [Step 04](../topics/04-first-spring-api/README.md)

**`@RestControllerAdvice`** — A Spring annotation for a class that handles exceptions for **all** controllers and returns JSON. → [Step 06](../topics/06-error-handling/README.md)

**Retry** — Trying a failed operation again, ideally with a limit and a delay. → [Step 12](../topics/12-queues/retries-and-dead-letters.md) (more: [network failure lab](../topics/13-split-services/network-failure-lab.md))

**`return`** — Hands a value back out of a method. → [Step 01](../topics/01-java-basics/README.md)

**Role** — A named bundle of permissions (`OPERATOR`, `CUSTOMER`) assigned to a user. → [Step 16](../topics/16-jwt-authentication/authz-vs-authn-lab.md)

**Row / record** — One entry in a table (one parcel). → [Step 10](../topics/10-persistence/sql-and-databases.md)

## S

**Salt** — Random data added before hashing so identical passwords get different hashes. → [Step 16](../topics/16-jwt-authentication/README.md)

**Schema (database)** — The shape of the database: which tables and columns exist. → [Step 10](../topics/10-persistence/sql-and-databases.md)

**Schema (message)** — A written, checkable description of a message's shape. → [Step 13](../topics/13-split-services/service-contracts.md)

**Seam** — A place where you can swap one implementation for another without touching surrounding code. → [Step 02](../topics/02-oop-and-composition/interfaces-and-abstractions.md)

**Serialization** — Turning a Java object **into** JSON text (object → text). → [Step 04](../topics/04-first-spring-api/json-and-dtos.md)

**Server** — A program that waits for requests and sends back responses. → [Step 00](../topics/00-start-here/README.md)

**Service (Compose)** — One container definition inside `compose.yaml`. → [Step 14](../topics/14-compose-and-observe/README.md)

**Service boundary** — The clear line of responsibility a service owns. → [Step 13](../topics/13-split-services/README.md)

**Signature (JWT)** — Proof the token wasn't tampered with, verified with a secret/key. → [Step 16](../topics/16-jwt-authentication/README.md)

**Singleton** — Pattern: exactly one shared instance exists. → [Step 02](../topics/02-oop-and-composition/README.md)

**SLF4J** — The logging *API* your code talks to (Simple Logging Facade for Java). → [Step 07](../topics/07-logging-and-observability-basics/README.md)

**Spring Boot** — A framework that runs your Java as a web server with minimal setup. → [Step 04](../topics/04-first-spring-api/README.md)

**`@SpringBootTest`** — Loads the *entire* application in a test — powerful, thorough, and slow. → [Step 08](../topics/08-testing/README.md)

**SQL** — Structured Query Language: how you talk to a relational database. → [Step 10](../topics/10-persistence/README.md) (deep dive: [SQL and databases](../topics/10-persistence/sql-and-databases.md))

**Stack trace** — The crash report: exception type, message, and the chain of method calls that led there. → [Step 01](../topics/01-java-basics/exceptions-intro.md)

**Stale data** — A cached copy that no longer matches the source of truth. → [Step 15](../topics/15-performance-and-safety/cache-invalidation-lab.md)

**State** — The current situation of an object (e.g. status = `PICKED_UP`). → [Step 02](../topics/02-oop-and-composition/README.md)

**Status code** — A number describing an HTTP result: `200`, `201`, `404`, `409`… → [Step 04](../topics/04-first-spring-api/README.md) (lab: [status codes lab](../topics/04-first-spring-api/http-status-codes-lab.md))

**stdout logging** — Writing logs to the terminal/standard output so Docker can collect them. → [Step 14](../topics/14-compose-and-observe/README.md)

**Synchronous** — The caller waits for the work to finish before getting a response. → [Step 12](../topics/12-queues/README.md)

## T

**Table** — A named collection of rows with fixed columns. → [Step 10](../topics/10-persistence/sql-and-databases.md)

**Tag (Docker image)** — A name + version for an image, e.g. `parcelpilot-api:09`. → [Step 09](../topics/09-docker/README.md)

**Terminal** — A text window where you type commands instead of clicking buttons. → [Step 00](../topics/00-start-here/README.md)

**Test pyramid** — A guideline: many fast unit tests, some integration tests, few end-to-end tests. → [Step 08](../topics/08-testing/README.md) (deep dive: [unit vs integration vs e2e](../topics/08-testing/unit-vs-integration-vs-e2e.md))

**Test slice** — Loading only *part* of the Spring app in a test (e.g. just the web layer), so tests stay fast. → [Step 08](../topics/08-testing/README.md)

**Testcontainers** — A library that starts a real database in a throwaway Docker container for your tests. → [Step 08](../topics/08-testing/README.md)

**`this`** — Inside a class, "this specific object." → [Step 01](../topics/01-java-basics/README.md)

**Throw** — To raise an exception: `throw new IllegalArgumentException("...")` says "stop, this is invalid." → [Step 01](../topics/01-java-basics/exceptions-intro.md)

**Timeout** — Giving up on a network call after a set time instead of waiting forever. → [Step 13](../topics/13-split-services/network-failure-lab.md)

**Transaction** — A group of database changes that all succeed or all fail together. → [Step 10](../topics/10-persistence/README.md)

**Transient vs permanent failure** — A failure that fixes itself (worth retrying) vs one retries can never fix. → [Step 12](../topics/12-queues/retries-and-dead-letters.md)

**`try`/`catch`** — The construct that handles an exception instead of letting it crash the current operation. → [Step 06](../topics/06-error-handling/README.md)

**TTL (Time To Live)** — How long a cached value stays before expiring. → [Step 15](../topics/15-performance-and-safety/README.md)

**Type** — The kind of a value: `String` (text), `int` (whole number), `boolean` (true/false). → [Step 01](../topics/01-java-basics/README.md)

## U

**Unchecked exception** — An exception the compiler doesn't force you to handle (`RuntimeException` and subclasses). → [Step 06](../topics/06-error-handling/README.md)

**Unit test** — Small automated code that checks one behavior alone — no Spring, no network, milliseconds fast. → [Step 03](../topics/03-maven/README.md) (more: [Step 08](../topics/08-testing/README.md))

**Use case / application layer** — The steps that carry out an operation (e.g. "mark delivered"). → [Step 11](../topics/11-monolith/README.md)

## V

**`@Valid`** — The trigger: tells Spring "check the constraints on this object before calling my method." → [Step 05](../topics/05-validation-and-inputs/README.md)

**Validation** — Checking that input follows the rules before you act on it. → [Step 05](../topics/05-validation-and-inputs/README.md) (deep dive: [bean validation explained](../topics/05-validation-and-inputs/bean-validation-explained.md))

**Volume** — Docker storage living *outside* a container, so data isn't lost when the container is replaced. → [Step 10](../topics/10-persistence/README.md)

## W

**`@WebMvcTest`** — The annotation for the web test slice: controllers, error handlers, validation, JSON — nothing else. → [Step 08](../topics/08-testing/README.md)

**Working directory** — The folder your terminal is currently "standing in" — commands run relative to it. → [Step 00](../topics/00-start-here/editor-and-terminal.md)

**Write-through** — Writing to the cache and the database together on every write. → [Step 15](../topics/15-performance-and-safety/cache-invalidation-lab.md)
