# Logging lab: from silent 500 to a story you can read

Hands-on companion to [Step 07](README.md). Work in `applications/parcelpilot`. Each part is Problem → Solution → Proof; run every command yourself and compare against the expected output.

## Problem: the silent 500

Prove the starting pain first. Add a temporary trap at the top of `getOne` in `ParcelController` (you'll delete it at the end):

```java
if ("boom".equals(id)) {
    throw new RuntimeException("simulated storage failure");
}
```

Start the app and trip it:

```bash
cd applications/parcelpilot
mvn spring-boot:run
```

```bash
# second terminal
curl -i http://localhost:8080/parcels/boom
```

The client gets the clean step-06 JSON `500`. Now look at the app terminal: if you haven't added logging yet, there is **nothing** — no clue what failed, where, or why. That silence is the problem this whole step exists to fix.

## Part 1: add logs incrementally

### 1a. INFO on create

Add the logger field and one INFO line to `create` (exact code in [the README, Build section](README.md#build-it-in-parcelpilot)). Restart, then:

```bash
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' \
  -d '{"id":"P-10","recipient":"Ava"}'
```

Expected in the app terminal:

```text
2026-07-14T18:22:31.512+02:00  INFO 41235 --- [nio-8080-exec-1] com.parcelpilot.ParcelController         : Created parcel P-10 for recipient Ava
```

### 1b. ERROR + stack trace in the catch-all

Add the `log.error(...)` line to `GlobalErrorHandler` (README, Build step 3). Restart, hit `boom` again:

```bash
curl -i http://localhost:8080/parcels/boom
```

Expected in the app terminal — the message line **plus** the stack trace beneath it:

```text
2026-07-14T18:24:05.113+02:00 ERROR 41235 --- [nio-8080-exec-2] com.parcelpilot.GlobalErrorHandler       : Unhandled error on GET /parcels/boom

java.lang.RuntimeException: simulated storage failure
	at com.parcelpilot.ParcelController.getOne(ParcelController.java:47)
	...
```

If you see the ERROR line with **no** stack trace, the exception is being consumed by a `{}` placeholder — it must be the bare **last** argument.

## Part 2: exercise — concatenation vs `{}` placeholder

See the difference with your own eyes. Temporarily add both styles to `create`:

```java
log.info("Placeholder style: created parcel {}", parcel.id());
log.info("Concatenation style: created parcel " + parcel.id());
```

Restart, create parcel `P-11`, and look at the output: **the two lines look identical.** That's the trap — concatenation *seems* fine, because the difference isn't in the output, it's in the cost. Now change both lines from `info` to `debug` and restart (default level is INFO, so neither prints):

- The `{}` line costs almost nothing: SLF4J checks the level and stops.
- The `+` line **builds the full string anyway**, then throws it away — on every single create, forever.

You can't see wasted work in a terminal, which is exactly why the habit matters: always `{}`, so the cheap path is the default. Remove both experiment lines, keep your original one.

## Part 3: exercise — turn on DEBUG and watch the machinery appear

Add to `src/main/resources/application.properties`:

```properties
logging.level.com.parcelpilot=DEBUG
```

Restart and read a parcel:

```bash
curl -i http://localhost:8080/parcels/P-10
```

Your `log.debug("Reading parcel {}", id)` line now appears. Then go further — watch Spring's own internals narrate a request:

```properties
logging.level.org.springframework.web=DEBUG
```

Restart, repeat the curl, and you'll see lines like:

```text
2026-07-14T18:30:12.201+02:00 DEBUG 41235 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : GET "/parcels/P-10", parameters={}
2026-07-14T18:30:12.204+02:00 DEBUG 41235 --- [nio-8080-exec-1] s.w.s.m.m.a.RequestMappingHandlerMapping : Mapped to com.parcelpilot.ParcelController#getOne(String)
2026-07-14T18:30:12.231+02:00 DEBUG 41235 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed 200 OK
```

Spring was logging all along — at DEBUG, below the default threshold. Two takeaways: levels are how frameworks stay quiet until you need them, and *this* is why config beats code — you just changed the app's verbosity twice without touching Java. **Remove the `org.springframework.web` line** when done (it's noisy); keeping `com.parcelpilot=DEBUG` locally is fine.

## Part 4 (stretch): request IDs prove their worth under concurrency

Build the `RequestIdFilter` and the `%X{requestId}` console pattern from [the README, Build step 4](README.md#build-it-in-parcelpilot). Restart, then fire two requests **at the same time**, each with its own ID:

```bash
curl -s -H 'X-Request-Id: req-aaa' http://localhost:8080/parcels/P-10 &
curl -s -H 'X-Request-Id: req-bbb' http://localhost:8080/parcels/boom &
wait
```

Expected in the app terminal — interleaved lines, but each stamped with its own ID (order may vary):

```text
18:31:02.118 DEBUG [req-aaa] com.parcelpilot.ParcelController : Reading parcel P-10
18:31:02.119 DEBUG [req-bbb] com.parcelpilot.ParcelController : Reading parcel boom
18:31:02.127 ERROR [req-bbb] com.parcelpilot.GlobalErrorHandler : Unhandled error on GET /parcels/boom
```

Without the IDs, you could not say which request the ERROR belonged to. With them, `req-bbb`'s story is one grep away. Also check the response headers echo the ID back:

```bash
curl -si -H 'X-Request-Id: req-ccc' http://localhost:8080/parcels/P-10 | head -5
```

```text
HTTP/1.1 200
X-Request-Id: req-ccc
```

Omit the header entirely and the filter generates one — verify a random 8-character ID appears in both the log and the response.

## Part 5: the "what never to log" audit

Play reviewer. For each proposed log line, decide **allow or reject** (and why) before opening the answer:

1. `log.info("Created parcel {} for recipient {}", id, recipient)`
2. `log.debug("Auth header was: {}", request.getHeader("Authorization"))`
3. `log.info("Login failed for {} with password {}", username, password)`
4. `log.info("Parcel {} delivering to {}, {}, {}", id, street, city, postcode)`
5. `log.warn("Rejected transition {} -> {} for parcel {}", from, to, id)`

<details><summary>Show answers</summary>

1. **Allow** (for ParcelPilot today). A name is borderline PII — fine in a learning project; in a real system you'd log only the parcel ID.
2. **Reject.** The `Authorization` header carries a token or credentials; anyone reading the log could impersonate the caller. This becomes acute in [step 16 (JWT authentication)](../16-jwt-authentication/README.md).
3. **Reject, hard.** Never a password — not even a wrong one (typos are often one character off the real password).
4. **Reject.** A full home address is exactly the PII that privacy law protects. Log the parcel ID; the address is retrievable from storage by people authorized to see it.
5. **Allow.** IDs and status names — no secrets, no PII, and genuinely useful WARN.

</details>

## Clean up

- Delete the `boom` trap from `getOne`.
- Remove any leftover experiment lines from Part 2.
- Keep: the logger fields, the INFO/DEBUG/ERROR lines, `logging.level.com.parcelpilot=DEBUG` (optional, local), and the stretch filter if you built it.

## Pros and cons recap

| Pros | Cons |
|---|---|
| The next 500 comes with a stack trace and request context on record | Every log line is volume: noisy INFO buries the signal |
| Levels give you a detail dial per package, changed in config not code | One careless line can leak a token or address into long-term storage |
| Request IDs turn interleaved output into per-request stories | MDC needs cleanup discipline (`finally { MDC.remove(...) }`) on reused threads |
| stdout logging is Docker-ready as-is ([step 09](../09-docker/README.md)) | Logs answer "what happened", not "how many/how fast" — that's metrics ([step 14](../14-compose-and-observe/README.md)) |

## Next

- Back to the step: [Step 07 README](README.md)
- Concepts in depth: [SLF4J and log levels](slf4j-and-log-levels.md)
- Full reference: [../../references/logging.md](../../references/logging.md)
- Next step: [Step 08: testing](../08-testing/README.md)
