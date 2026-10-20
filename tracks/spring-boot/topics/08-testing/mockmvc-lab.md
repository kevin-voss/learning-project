# Lab: MockMvc, your curl checklist as code

Companion lab to [Step 08](README.md). Build the HTTP test class one test at a time.

## The problem

Since step 04 your verification routine for ParcelPilot has been manual:

```bash
mvn spring-boot:run          # terminal 1: start the app, wait for it
# terminal 2: the checklist
curl -i -X POST http://localhost:8080/parcels -H 'Content-Type: application/json' -d '{"id":"P-1","recipient":"Ava"}'
curl -i http://localhost:8080/parcels/P-1
curl -i http://localhost:8080/parcels/does-not-exist
curl -i -X POST http://localhost:8080/parcels -H 'Content-Type: application/json' -d '{"id":"P-2","recipient":""}'
curl -i -X PATCH http://localhost:8080/parcels/P-1/status -H 'Content-Type: application/json' -d '{"status":"DELIVERED"}'
curl -i 'http://localhost:8080/parcels?status=CREATED'
```

Then you read six outputs by eye, checking status lines *and* JSON bodies. A couple of minutes per run, easy to skip one, and nothing stops a regression if you forget. After a change to `GlobalErrorHandler` or a validation annotation, did you really re-run all six? Every time?

## The solution: `@WebMvcTest`

`@WebMvcTest` starts only the **web slice** of the app — your controller, the `@RestControllerAdvice`, validation, and JSON conversion — and hands you a `MockMvc` object that performs simulated HTTP requests against it. No real port, no `spring-boot:run`, no second terminal. Each `curl` line becomes a test method that runs in milliseconds under plain `mvn test`.

No new dependencies: `spring-boot-starter-test` has been in your `pom.xml` since step 04.

## Build the test class incrementally

Create `src/test/java/com/parcelpilot/ParcelControllerTest.java`. Start with the skeleton and add one test at a time, running `mvn test` after each — you'll see the suite grow.

### 0. The skeleton

```java
package com.parcelpilot;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ParcelController.class)
class ParcelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    // tests go here
}
```

What each piece is:

- `@WebMvcTest(ParcelController.class)` — load the web slice for this one controller. Your `GlobalErrorHandler` is included automatically because `@RestControllerAdvice` classes are part of the web slice.
- `@Autowired MockMvc` — Spring builds the MockMvc object and injects it (the same dependency injection you know from step 04, now in a test).
- The two `static` imports bring in the request builders (`get`, `post`, `patch`) and the result matchers (`status()`, `jsonPath()`). Without them, every line would read `MockMvcRequestBuilders.get(...)`.

### 1. The 404 case (missing parcel, `ErrorResponse` shape)

The `curl` it replaces: `curl -i http://localhost:8080/parcels/does-not-exist`.

```java
@Test
void getParcel_thatDoesNotExist_returns404WithErrorResponse() throws Exception {
    mockMvc.perform(get("/parcels/does-not-exist"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.code").value("PARCEL_NOT_FOUND"))
            .andExpect(jsonPath("$.message").isNotEmpty())
            .andExpect(jsonPath("$.path").value("/parcels/does-not-exist"));
}
```

Reading a `jsonPath`: `$` is the root of the response JSON, `$.code` is its `code` field. So this test pins three of the four `ErrorResponse` fields from step 06 — the contract clients parse, not just the status line.

Run `mvn test`. One new green test. Two things to check if the value assertions fail: your `GlobalErrorHandler` may use a different `code` string — assert **your** actual value; the test documents your contract, whatever it is.

### 2. The 400 case (validation, field details)

The `curl` it replaces: the POST with `"recipient":""`.

```java
@Test
void createParcel_withBlankRecipient_returns400WithFieldDetails() throws Exception {
    mockMvc.perform(post("/parcels")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("""
                            {"id":"P-400","recipient":""}
                            """))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_FAILED"))
            .andExpect(jsonPath("$.details.recipient").isNotEmpty());
}
```

New pieces:

- `.contentType(MediaType.APPLICATION_JSON)` — the same job as `-H 'Content-Type: application/json'` in curl. Forget it and Spring answers `415 Unsupported Media Type`, not `400`.
- `.content("""…""")` — the request body. The `"""` text block (Java 15+) saves you from escaping every quote.
- `$.details.recipient` — inside the `details` map from step 06, the entry for the `recipient` field. This asserts not only *that* validation failed but that it blamed the **right field**. If your `details` is a list of objects instead of a map, use e.g. `jsonPath("$.details[0].field").value("recipient")` — match your own shape.

### 3. The 201 case (valid create)

```java
@Test
void createParcel_withValidBody_returns201AndTheParcel() throws Exception {
    mockMvc.perform(post("/parcels")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("""
                            {"id":"P-201","recipient":"Ava"}
                            """))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value("P-201"))
            .andExpect(jsonPath("$.recipient").value("Ava"))
            .andExpect(jsonPath("$.status").value("CREATED"));
}
```

Note the id `P-201`, not `P-1`: the controller's `ConcurrentHashMap` lives for the whole test class, so every test creates its **own** parcels. Reusing an id across tests makes them depend on execution order — the classic recipe for flaky tests.

### 4. The 409 case (illegal transition)

This test has a *given* step: the parcel must exist first.

```java
@Test
void updateStatus_skippingPickup_returns409() throws Exception {
    // given: a parcel in status CREATED
    mockMvc.perform(post("/parcels")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("""
                            {"id":"P-409","recipient":"Ben"}
                            """))
            .andExpect(status().isCreated());

    // when/then: CREATED -> DELIVERED skips PICKED_UP; step 02's rule forbids it
    mockMvc.perform(patch("/parcels/P-409/status")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("""
                            {"status":"DELIVERED"}
                            """))
            .andExpect(status().isConflict())
            .andExpect(jsonPath("$.code").value("INVALID_TRANSITION"));
}
```

This is the full chain in one test: the domain rule from step 02 throws `IllegalStateException`, the step 06 error handler catches it, and the client sees `409 Conflict` with a machine-readable code. The rule itself is already unit-tested in `ParcelTrackerTest` — this test pins the *translation* to HTTP.

## Proof

```bash
cd applications/parcelpilot
mvn test
```

Expected tail of the output (2 domain tests from step 03 + 4 new ones):

```text
[INFO] Results:
[INFO]
[INFO] Tests run: 6, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
```

Then break something on purpose: change the 404 `code` string in `GlobalErrorHandler` and re-run. Expected: one test red, with a diff-style message like `JSON path "$.code" expected:<PARCEL_NOT_FOUND> but was:<NOT_FOUND>`. Revert, green again. Total time for the whole checklist: a few seconds, versus minutes by hand.

## Common failures and fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| `ApplicationContext failure` / context fails to load | `@WebMvcTest` names a class that isn't a `@RestController`, or (from step 10 on) the controller needs a bean the slice doesn't provide | Check the class in `@WebMvcTest(...)`; once a repository exists, provide it with `@MockBean` (see [reference](../../references/testing.md)) |
| `No value at JSON path "$.code"` | Your `ErrorResponse` field is named differently, or the body is empty | Print the real body with `.andDo(print())` and adjust the path to your actual shape |
| `expected:<…> but was:<…>` on a jsonPath | The test's expected string doesn't match your handler's actual value | Decide which one is the contract; fix the other |
| Got `415` instead of `400` | Missing `.contentType(MediaType.APPLICATION_JSON)` | Add the content type to the request |
| Got `404` instead of `409` on the PATCH | The *given* step didn't run, or ids clash with another test | Ensure the create happens inside the same test and ids are unique per test |
| Test passes alone, fails with the class | Shared state in the controller's map (duplicate ids across tests) | One unique parcel id per test |

Tip: appending `.andDo(print())` to any `mockMvc.perform(...)` chain dumps the full request and response to the test output — the MockMvc equivalent of `curl -i -v`.

## Slice (`@WebMvcTest`) vs whole app (`@SpringBootTest`)

| | `@WebMvcTest` (slice) | `@SpringBootTest` (whole app) |
|---|---|---|
| Starts | Web layer only | Every bean in the application |
| Speed | Fast (a second or two per class) | Slow (full context per new configuration) |
| Catches | Routing, validation, error handling, JSON contracts | Everything, including cross-layer wiring |
| Use for | Most HTTP contract tests (this lab) | A handful of whole-app smoke tests |
| Risk | Needs mocks for non-web beans (from step 10 on) | Suite slows down until nobody runs it |

Default to the slice. Reach for `@SpringBootTest` only when the thing you're verifying genuinely spans more than the web layer.

## Next

- Back to [Step 08](README.md) for acceptance criteria and the quiz.
- [Unit vs integration vs E2E](unit-vs-integration-vs-e2e.md) for where these tests sit in the pyramid.
- [Testcontainers lab](testcontainers-lab.md) — read now, complete after [step 10](../10-persistence/README.md).
- [Testing reference](../../references/testing.md) for `@MockBean`, parameterized tests, and flaky-test causes.
