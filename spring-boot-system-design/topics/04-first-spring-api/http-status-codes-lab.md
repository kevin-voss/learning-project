# HTTP status codes lab: say what actually happened

Your step 04 API already returns `201`, `200`, `404`, and (after the [REST API lab](rest-api.md)) `409`. This lab zooms out: the whole status-code system, the dozen codes that matter, and a predict-then-verify exercise against your running app.

## Problem

Imagine ParcelPilot answered **200 OK** to everything: creating a parcel, requesting one that doesn't exist, even crashing halfway. Clients would have to parse your response body and guess. Was it stored? Should the driver's scanner retry? Is it *their* bug or *yours*? Returning 200 for everything is lying to clients — the status code exists precisely so machines can react to the outcome **without reading the body**.

## The five families

The first digit is the family; a client that has never seen a specific code can still act on the family.

| Family | Meaning | Beginner translation |
|---|---|---|
| **1xx** | Informational | "Keep going" — protocol plumbing, you'll rarely touch these. |
| **2xx** | Success | "It worked." |
| **3xx** | Redirection | "What you want is elsewhere — look there." |
| **4xx** | Client error | "**Your** request is wrong. Fix it before retrying." |
| **5xx** | Server error | "**My** fault. Your request may be fine — try later." |

The 4xx/5xx line is the most important boundary in the table: it assigns **blame**. A 4xx tells the client to change its request; a 5xx tells them the server broke. Get this wrong and clients retry hopeless requests or give up on fine ones.

## The dozen codes that matter

| Code | One-line meaning | In ParcelPilot |
|---|---|---|
| **200 OK** | Request succeeded, response has a body. | `GET /parcels/P-1`, successful `PATCH`. |
| **201 Created** | A new resource now exists. | `POST /parcels` (step 04). |
| **204 No Content** | Succeeded, deliberately no body. | A future `DELETE /parcels/{id}`. |
| **301 Moved Permanently** | Resource permanently at a new URL. | Not used yet; you'll meet it when URLs change in public APIs. |
| **400 Bad Request** | The request itself is malformed/invalid. | Broken JSON today; blank recipient once [Step 05](../05-validation-and-inputs/README.md) adds validation. |
| **401 Unauthorized** | Who are you? No/invalid credentials. | Arrives with JWT login in [Step 16](../16-jwt-authentication/README.md). |
| **403 Forbidden** | I know who you are; you may not do this. | Also [Step 16](../16-jwt-authentication/README.md): a customer can't advance another customer's parcel. |
| **404 Not Found** | No such resource. | `GET /parcels/does-not-exist` (step 04). |
| **409 Conflict** | Request clashes with current state. | Illegal status transition, e.g. deliver before pickup ([REST lab](rest-api.md)). |
| **415 Unsupported Media Type** | Body format not accepted (wrong/missing `Content-Type`). | `POST /parcels` without the JSON header — Spring answers this for free. |
| **429 Too Many Requests** | Slow down — rate limit exceeded. | Arrives with rate limiting in [Step 15](../15-performance-and-safety/README.md). |
| **500 Internal Server Error** | Unhandled failure inside the server. | What a blank recipient triggers *today* (the constructor throws) — exactly what steps 05–06 clean up. |
| **503 Service Unavailable** | Server temporarily can't serve (overloaded, starting, down for maintenance). | Matters once ParcelPilot is split into services that can be individually down ([Step 13](../13-split-services/README.md)). |

## Exercise: predict, then verify

Start the app (`mvn spring-boot:run`) and create one parcel so there's data:

```bash
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' \
  -d '{"id":"P-1","recipient":"Ava"}'
```

Now, **before running each command below, write your prediction in the middle column.** Then run it with `curl -i` (the `-i` prints the status line and headers) and fill in what you observed. Predicting first is the whole exercise — it's how you find out which codes you've actually internalized.

| Request | Your prediction | Observed |
|---|---|---|
| `GET /parcels/P-1` (exists) | | |
| `GET /parcels/nope` (missing) | | |
| `POST /parcels` **without** the `Content-Type` header | | |
| `POST /parcels` with malformed JSON (missing brace) | | |
| `PATCH /parcels/P-1/status` with an illegal jump (e.g. straight to `DELIVERED`) | | |

## Proof commands

```bash
# 1. GET an existing parcel -> expect 200
curl -i http://localhost:8080/parcels/P-1

# 2. GET a missing parcel -> expect 404
curl -i http://localhost:8080/parcels/nope

# 3. POST without Content-Type -> expect 415
#    (curl sends the body as form data, not JSON, so Spring refuses the format)
curl -i -X POST http://localhost:8080/parcels \
  -d '{"id":"P-2","recipient":"Ben"}'

# 4. POST malformed JSON -> expect 400 (deserialization fails before your code runs)
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' \
  -d '{"id":"P-3","recipient":'

# 5. PATCH an illegal transition -> expect 409 (P-1 is CREATED; delivery needs pickup first)
curl -i -X PATCH http://localhost:8080/parcels/P-1/status \
  -H 'Content-Type: application/json' \
  -d '{"status":"DELIVERED"}'
```

Check the first line of each response (e.g. `HTTP/1.1 404`) against your predictions. Two observations worth pausing on:

- Cases 3 and 4 return an error **without your controller ever running** — Spring's web layer rejected the request first. The framework speaks correct HTTP on your behalf.
- Case 5's `409` comes from *your* code (the lab's transition check). Notice how the error bodies are inconsistent and unhelpful across these cases — that's the mess [Step 06](../06-error-handling/README.md) cleans up.

## Pros and cons of precise status codes

**Pros:**

- **Client automation:** machines branch on codes without parsing bodies — retry on `503`, back off on `429`, surface a form error on `400`, never retry a `409`.
- **Caching:** proxies and browsers cache `200`/`301` responses safely; a lazy "everything is 200" API poisons that.
- **Monitoring:** a spike in `5xx` pages someone at 3 a.m.; a spike in `4xx` means a broken client. If everything is `200`, your dashboards are blind (this pays off in [Step 14](../14-compose-and-observe/README.md)).

**Cons:**

- Pedantry has diminishing returns: teams can burn an afternoon on `200` vs `204` for a delete, or `400` vs `422` for validation. The families and the dozen codes above cover ~99% of real decisions; beyond that, pick one, document it, stay consistent.
- Some clients mishandle rare codes, so exotic choices can cause more friction than precision buys.

## Next

- Right now the 400/409 responses carry unhelpful (or empty) bodies. [Step 05](../05-validation-and-inputs/README.md) makes `400` carry field-by-field validation errors, and [Step 06](../06-error-handling/README.md) gives every error a consistent JSON shape.
- Quick reference for methods + statuses: [Spring and HTTP](../../references/spring-and-http.md).
- Back to [Step 04](README.md).
