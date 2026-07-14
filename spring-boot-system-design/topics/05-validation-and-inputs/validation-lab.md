# Validation lab: break it, then guard it

## Problem

You're told validation matters — but the lesson sticks better when you watch your own API misbehave first. In this lab you feed ParcelPilot garbage *before* adding any validation, record exactly how it fails, then add the guards from the [step README](README.md) one at a time and prove each curl now gets a clean `400`.

Work in `applications/parcelpilot`, app running with `mvn spring-boot:run`, curls in a second terminal.

## Part 1: break it (before validation)

Do these on your **step 04 state**, before adding any constraint. Write down what each returns — you'll compare after.

```bash
# 1a. empty object -> id and recipient are null
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' \
  -d '{}'
```

If your `Parcel` constructor checks its arguments (step 02), you get something like:

```text
HTTP/1.1 500
Content-Type: application/json

{"timestamp":"2026-07-14T17:20:11.123+00:00","status":500,"error":"Internal Server Error","path":"/parcels"}
```

A `500` for a client mistake — and the body doesn't say *what* was wrong. Meanwhile your server log shows a stack trace for `IllegalArgumentException`, as if the app had a bug. It doesn't; the request did.

```bash
# 1b. whitespace recipient -> may slip past a null-check
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' \
  -d '{"id":"P-666","recipient":"   "}'
```

If the constructor only checks `null` (not blank), this returns `201` — and now:

```bash
curl -s http://localhost:8080/parcels | grep P-666
```

A parcel addressed to three spaces is in your store. Nobody can deliver it, and it will show up in every list from now on. **Garbage in, garbage stored.**

> Depending on how strict your step 02 constructor is, 1a/1b may 500 or may store garbage. Both outcomes are bad in different ways — that's the point. Note which one *you* got.

Restart the app (`Ctrl+C`, `mvn spring-boot:run`) to flush the in-memory map before Part 2.

## Part 2: guard it, step by step

### 2a. Dependency first

Add to `pom.xml` (details in the [step README](README.md#build-it-in-parcelpilot)):

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

Restart. Re-run curl 1a. **Nothing changed.** The engine is installed but no rules exist and nothing triggers them. Dependencies alone do nothing — worth seeing once.

### 2b. Constraints on the DTO

```java
package com.parcelpilot;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateParcelRequest(
        @NotBlank(message = "id must not be blank")
        @Pattern(regexp = "P-\\d+", message = "id must look like P-1, P-42, ...")
        String id,

        @NotBlank(message = "recipient must not be blank")
        @Size(max = 100, message = "recipient must be at most 100 characters")
        String recipient
) {}
```

Restart, re-run 1a. **Still nothing changed** — rules exist, but no trigger. (If you skipped ahead and added `@Valid` already, you'll see the new behavior early. Fine.)

### 2c. The trigger: `@Valid`

In `ParcelController`:

```java
import jakarta.validation.Valid;

@PostMapping
public ResponseEntity<ParcelResponse> create(@Valid @RequestBody CreateParcelRequest req) {
    // unchanged body
}
```

Restart, re-run 1a. Now you get a `400`! But the body is Spring's generic one — no field names, no messages. Close, not done.

### 2d. The handler: field → message

Inside `ParcelController`:

```java
import java.util.HashMap;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<Map<String, String>> onValidationError(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
        errors.put(fieldError.getField(), fieldError.getDefaultMessage());
    }
    return ResponseEntity.badRequest().body(errors);
}
```

Restart one more time. Now run the full proof table.

## Part 3: prove it

Run each payload against `POST /parcels` and check the result (map key order may vary):

| # | Payload | Expected status | Expected body |
|---|---|---|---|
| 1 | `{}` | `400` | `{"id":"id must not be blank","recipient":"recipient must not be blank"}` |
| 2 | `{"id":"P-1","recipient":"   "}` | `400` | `{"recipient":"recipient must not be blank"}` |
| 3 | `{"id":"parcel-1","recipient":"Ava"}` | `400` | `{"id":"id must look like P-1, P-42, ..."}` |
| 4 | `{"id":"","recipient":""}` | `400` | both fields named (blank id also fails `@Pattern` — either id message is acceptable) |
| 5 | `{"id":"P-1","recipient":"Ava"}` | `201` | `{"id":"P-1","recipient":"Ava","status":"CREATED"}` |
| 6 | `{"id":"P-1","recipient":"<a name longer than 100 chars>"}` | `400` | `{"recipient":"recipient must be at most 100 characters"}` |

Template for each row:

```bash
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' \
  -d '<payload from the table>'
```

For row 6, generate the long name instead of typing it:

```bash
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' \
  -d "{\"id\":\"P-1\",\"recipient\":\"$(printf 'A%.0s' {1..101})\"}"
```

Finally, confirm no garbage got stored along the way:

```bash
curl -s http://localhost:8080/parcels
```

Only the parcel from row 5 should be there.

## Stretch: guard the PATCH endpoint too

`PATCH /parcels/{id}/status` takes a body like `{"status":"PICKED_UP"}`. Right now a typo (`"PICKEDUP"`, `"picked_up"`, `""`) travels all the way into your domain code before anything complains. Guard the shape at the boundary:

```java
package com.parcelpilot;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UpdateStatusRequest(
        @NotBlank(message = "status must not be blank")
        @Pattern(regexp = "CREATED|PICKED_UP|DELIVERED",
                 message = "status must be one of CREATED, PICKED_UP, DELIVERED")
        String status
) {}
```

Add `@Valid` to the PATCH method's `@RequestBody` parameter, then prove it:

```bash
# unknown status -> 400 at the boundary, with a message listing valid values
curl -i -X PATCH http://localhost:8080/parcels/P-1/status \
  -H 'Content-Type: application/json' \
  -d '{"status":"TELEPORTED"}'

# known status but illegal transition (e.g. CREATED -> DELIVERED) -> still 409 from the domain
curl -i -X PATCH http://localhost:8080/parcels/P-1/status \
  -H 'Content-Type: application/json' \
  -d '{"status":"DELIVERED"}'
```

**Why both layers?** The `@Pattern` answers "is `TELEPORTED` even a status that exists?" — a question about the request's *shape*, answerable without looking at any parcel. Whether `CREATED → DELIVERED` is a *legal transition* depends on the parcel's current state, and only the domain (`Parcel`) knows that. Validation checks fields in isolation; transition rules need state. The `409` stays exactly where step 02 put it.

## Pros and limits

You now reject malformed input with named field errors before it touches your domain or store — the biggest usability jump per line of code in this whole curriculum. What's still rough: the validation `400` has one JSON shape, the `404` and `409` have another, and unparseable JSON produces a third. Three dialects, one API.

## Next

- Back to [Step 05 README](README.md) to tick the acceptance criteria.
- How the machinery works: [Bean Validation explained](bean-validation-explained.md).
- The big picture on contracts and error design: [Validation and API contracts](../../references/validation-and-api-contracts.md).
- One error schema for everything: [Step 06: error handling](../06-error-handling/README.md).
