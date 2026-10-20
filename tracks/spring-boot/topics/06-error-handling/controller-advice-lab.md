# Controller advice lab: one error shape, proven with curl

## Problem

You're told ParcelPilot's errors are inconsistent — but "inconsistent" is abstract until you see it. This lab makes you **prove the problem first**, then fix it in small increments, proving each exception→status mapping with `curl` before adding the next. By the end, four different failures return one shape, and you'll have discussed error codes and where handlers should live.

Prerequisites: the concepts from the [step 06 README](README.md) and, if exceptions are still fuzzy, [Exceptions in Java](exceptions-in-java.md).

## Part 1: prove the problem (before touching code)

Start the app as it is after step 05 (`mvn spring-boot:run`), then collect evidence:

```bash
# A. Missing parcel
curl -i http://localhost:8080/parcels/does-not-exist

# B. Validation failure
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' \
  -d '{"id":"","recipient":""}'

# C. Illegal transition (create P-1 first, then jump CREATED -> DELIVERED)
curl -s -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' -d '{"id":"P-1","recipient":"Ava"}'
curl -i -X PATCH http://localhost:8080/parcels/P-1/status \
  -H 'Content-Type: application/json' -d '{"status":"DELIVERED"}'
```

What you'll see — three failures, three dialects:

| Scenario | Status | Body |
|---|---|---|
| A. missing parcel | `404` | **empty** — the client learns nothing |
| B. validation | `400` | `{"id":"must not be blank","recipient":"must not be blank"}` — a bare field map |
| C. illegal transition | `409` | `{"error":"Cannot change status from CREATED to DELIVERED"}` — yet another shape |

Write these down (your `NOTES.md`). A client that wants to display "why did this fail?" needs three different parsers. That's the bug we're fixing.

## Part 2: build the advice incrementally

Don't write the whole handler class at once. Add **one mapping, restart, prove it with curl**, repeat. Each increment is a tiny, verifiable win.

### Increment 1: the contract + the 404

1. Create the `ErrorResponse` record (from the [README, build step 1](README.md#build-it-in-parcelpilot)).
2. Create `ParcelNotFoundException` and throw it from `GET /parcels/{id}` instead of `ResponseEntity.notFound().build()`.
3. Create `GlobalErrorHandler` with **only** the `ParcelNotFoundException` → `404` handler.

Prove it:

```bash
curl -i http://localhost:8080/parcels/does-not-exist
```

You should now get `404` **with a body**:

```json
{"code":"PARCEL_NOT_FOUND","message":"Parcel 'does-not-exist' not found","details":{},"path":"/parcels/does-not-exist"}
```

> If you still get an empty body, check: is the class annotated `@RestControllerAdvice` (not plain `@ControllerAdvice`)? Did the app restart?

### Increment 2: the 409

Remove the `try`/`catch` around `parcel.changeStatus(...)` in the `PATCH` method — let `IllegalStateException` escape — and add the `IllegalStateException` → `409` handler to the advice.

Prove it (P-1 is still `CREATED`):

```bash
curl -i -X PATCH http://localhost:8080/parcels/P-1/status \
  -H 'Content-Type: application/json' -d '{"status":"DELIVERED"}'
```

Same shape, status `409`, code `INVALID_TRANSITION`.

### Increment 3: re-home the validation handler

Delete the local `@ExceptionHandler(MethodArgumentNotValidException.class)` method from the controller and add the version from the README to the advice — same trigger, but now it builds an `ErrorResponse` with the field errors inside `details`.

Prove it:

```bash
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' -d '{"id":"","recipient":""}'
```

> Order matters here: if the local handler still exists in the controller, it **wins** over the advice for that controller, and your 400 keeps the old bare-map shape. Deleting it is part of the fix.

### Increment 4: the 400 for domain argument checks, and the catch-all 500

Add the `IllegalArgumentException` → `400` handler (the `Parcel` constructor from step 02 throws it for bad input that slipped past Bean Validation), then the `Exception` → `500` catch-all with a **generic** message.

To prove the catch-all you need an unexpected failure. Add a temporary throw somewhere reachable — for example, first line of the `list` method:

```java
if ("boom".equals(status)) throw new RuntimeException("secret internal detail");
```

```bash
curl -i 'http://localhost:8080/parcels?status=boom'
```

Confirm two things: status `500`, and the body says `"An unexpected error occurred"` — **not** "secret internal detail". Then delete the temporary throw.

## Part 3: the proof table

Rerun all four scenarios and fill in your own table. It should match:

| Scenario | Status | JSON body |
|---|---|---|
| `GET /parcels/does-not-exist` | `404` | `{"code":"PARCEL_NOT_FOUND","message":"Parcel 'does-not-exist' not found","details":{},"path":"/parcels/does-not-exist"}` |
| `PATCH` CREATED → DELIVERED | `409` | `{"code":"INVALID_TRANSITION","message":"Cannot change status from CREATED to DELIVERED","details":{},"path":"/parcels/P-1/status"}` |
| `POST` with blank fields | `400` | `{"code":"VALIDATION_FAILED","message":"Request validation failed","details":{"id":"must not be blank","recipient":"must not be blank"},"path":"/parcels"}` |
| temporary `RuntimeException` | `500` | `{"code":"INTERNAL","message":"An unexpected error occurred","details":{},"path":"/parcels"}` |

One shape, four statuses. Compare with your Part 1 notes: that's the before/after of this whole step.

## Stretch: an error code catalog

You already gave each handler a `code` string. Make it official — a small catalog that is part of your API contract:

| Code | Status | Meaning |
|---|---|---|
| `PARCEL_NOT_FOUND` | 404 | The parcel ID doesn't exist |
| `INVALID_TRANSITION` | 409 | The status change breaks the lifecycle rules |
| `VALIDATION_FAILED` | 400 | The request body failed validation |
| `INTERNAL` | 500 | Unexpected server-side failure |

Optionally centralize the strings so a typo can't split `PARCEL_NOT_FOUND` into two spellings:

```java
package com.parcelpilot;

public final class ErrorCodes {
    public static final String PARCEL_NOT_FOUND = "PARCEL_NOT_FOUND";
    public static final String INVALID_TRANSITION = "INVALID_TRANSITION";
    public static final String VALIDATION_FAILED = "VALIDATION_FAILED";
    public static final String INTERNAL = "INTERNAL";

    private ErrorCodes() {}
}
```

**Why machine-readable codes beat parsing messages:** the `message` is for humans, and humans change it — better wording, more detail, one day maybe another language. Any client doing `if (message.contains("not found"))` breaks the moment you rephrase. A code is a **stable promise**: `PARCEL_NOT_FOUND` today, `PARCEL_NOT_FOUND` in five years, regardless of wording. Clients switch on the code; humans read the message. It also gives you something finer than the status alone: two different `409`s (illegal transition vs, later, a version conflict) stay distinguishable.

## Discuss: one global handler vs per-controller handlers

Spring lets handlers live in two places: a local `@ExceptionHandler` inside a controller (applies to that controller only, and wins over the advice), or a `@RestControllerAdvice` (applies to all controllers). You just migrated from the first to the second — was that unambiguously right?

| One global advice | Per-controller handlers |
|---|---|
| One error shape guaranteed everywhere | Shapes drift apart controller by controller |
| One place to read to know all error behavior | Error behavior scattered across files |
| New controllers get correct handling for free | Every new controller re-implements (or forgets) handling |
| Can't easily vary behavior per endpoint | Can special-case one controller precisely |
| Risk: becomes a dumping ground of many handlers | Keeps very controller-specific concerns local |

Default to the global advice — a consistent contract is worth more than per-endpoint flexibility, and ParcelPilot has exactly one controller anyway. Reach for a local handler only when one controller genuinely needs *different* behavior for the same exception, and treat that as a smell worth a comment explaining why.

## Next

- Back to [Step 06](README.md) for the acceptance criteria and quiz.
- Deep dive: [Error handling and HTTP statuses](../../references/error-handling-and-http-statuses.md) — status decision table, RFC 7807, retry-ability.
- Coming up: [Step 07](../07-logging-and-observability-basics/README.md) puts the details your generic `500` hides into logs you can search.
