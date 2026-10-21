# REST API lab: change a status, then read the status codes

> [!PICTURE]
> A delivery driver scans a parcel at the depot door: "picked up!". The front desk checks the rule card. If the parcel is still `CREATED`, the stamp goes on. If someone tries to stamp `DELIVERED` first, the clerk says "no, that clashes with what we know". That "no" is `409 Conflict`.

The theory lives elsewhere. HTTP: [requests and responses](../../../computer-science/index.html#http-requests-responses). REST, methods, safe and idempotent: [REST and HTTP in Java](../../../java/topics/rest-and-http/index.html). This lab is hands-on only.

## Part 1: add `PATCH /parcels/{id}/status`

A scanner sends `{"status":"PICKED_UP"}`. The parcel decides if that move is legal (the rules from step 02).

**1. Teach `Parcel` one entry point for a status change:**

```java
public void changeStatus(Status target) {
    switch (target) {
        case PICKED_UP -> markPickedUp();
        case DELIVERED -> markDelivered();
        default -> throw new IllegalStateException("cannot move to " + target);
    }
}
```

**2. Add a request DTO** in `UpdateStatusRequest.java`. The status arrives as plain text; the controller turns it into a `Status`:

```java
package com.parcelpilot;

public record UpdateStatusRequest(String status) {}
```

**3. Add the endpoint to `ParcelController`:**

```java
@PatchMapping("/{id}/status")
public ResponseEntity<?> changeStatus(@PathVariable String id,
                                      @RequestBody UpdateStatusRequest req) {
    Parcel parcel = store.get(id);
    if (parcel == null) {
        return ResponseEntity.notFound().build();                        // 404
    }
    try {
        parcel.changeStatus(Status.valueOf(req.status()));             // "PICKED_UP" -> Status.PICKED_UP
    } catch (IllegalStateException e) {
        return ResponseEntity.status(409).body(Map.of("error", e.getMessage())); // 409
    }
    return ResponseEntity.ok(toResponse(parcel));                         // 200
}
```

The `try`/`catch` inside the controller is a little messy. That is on purpose: step 06 moves it into one central error handler. A typo like `{"status":"PICKEDUP"}` makes `Status.valueOf` throw and ends in a `500` for now; step 05 turns it into a helpful `400`.

> [!TRY]
> 1. Restart the app and create `P-1` (see the README's Test it section).
> 2. Run:
>    ```bash
>    curl -i -X PATCH http://localhost:8080/parcels/P-1/status \
>      -H 'Content-Type: application/json' -d '{"status":"PICKED_UP"}'
>    ```
> 3. Run the same command again.
>
> You should see: `200` the first time, `409` the second time. Same request, different result: this `PATCH` is **not idempotent**. Networks retry, so remember this for step 12 (queues).

> [!WARN]
> Never sneak a change into a `GET` (for example a "last viewed" stamp). Dashboards poll, browsers prefetch, proxies cache: they all trust that `GET` changes nothing. If viewing must be recorded, give it its own `POST`.

## Part 2: status codes, predict then verify

The status code lets a machine react **without reading the body**. The first digit is the family: `2xx` it worked, `4xx` **your** request is wrong, `5xx` **my** server broke.

| Code | Meaning | In ParcelPilot |
|---|---|---|
| `200 OK` | Worked, has a body | `GET /parcels/P-1`, a good `PATCH` |
| `201 Created` | A new thing exists | `POST /parcels` |
| `204 No Content` | Worked, no body | a future `DELETE` |
| `400 Bad Request` | The request is malformed | broken JSON; blank fields after step 05 |
| `401` / `403` | Who are you? / Not allowed | login in step 16 |
| `404 Not Found` | No such resource | `GET /parcels/nope` |
| `409 Conflict` | Clashes with the current state | illegal status move |
| `415 Unsupported Media Type` | Wrong body format | `POST` without `Content-Type: application/json` |
| `429 Too Many Requests` | Slow down | rate limiting in step 15 |
| `500 Internal Server Error` | The server broke | a blank recipient today (steps 05–06 clean it up) |
| `503 Service Unavailable` | Temporarily down | a split-out service in step 13 |

Create one parcel first:

```bash
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' -d '{"id":"P-1","recipient":"Ava"}'
```

**Before** you run each command, write your prediction in the middle column. Predicting first is the whole exercise.

| Request | Your prediction | Observed |
|---|---|---|
| `GET /parcels/P-1` | | |
| `GET /parcels/nope` | | |
| `POST /parcels` without `Content-Type` | | |
| `POST /parcels` with broken JSON | | |
| `PATCH` `P-1` straight to `DELIVERED` | | |

```bash
curl -i http://localhost:8080/parcels/P-1                       # expect 200
curl -i http://localhost:8080/parcels/nope                      # expect 404
curl -i -X POST http://localhost:8080/parcels \
  -d '{"id":"P-2","recipient":"Ben"}'                           # expect 415
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' -d '{"id":"P-3","recipient":'   # expect 400
curl -i -X PATCH http://localhost:8080/parcels/P-1/status \
  -H 'Content-Type: application/json' -d '{"status":"DELIVERED"}'      # expect 409
```

Two things to notice:

- `415` and `400` come back **before your controller runs**. Spring rejected the request for you.
- The error bodies all look different (or are empty). Step 06 gives every error one shape.

> [!NOTE]
> **REST vs RPC.** Some APIs expose actions instead of resources: `POST /advanceParcelStatus`. That works, but every endpoint becomes its own rule to learn, and caches cannot help. Model resources first. When an action truly is not a create/read/update/delete, an honest action path like `POST /parcels/P-1/recalculate-route` is fine.

> [!CHECK]
> 1. You send the same `PATCH ... PICKED_UP` twice. Why is the second answer `409`?
>    <details><summary>Answer</summary>After the first call the parcel is already <code>PICKED_UP</code>. Picking it up again is not a legal move, so the domain throws and the controller answers <code>409 Conflict</code>. The <code>PATCH</code> is not idempotent.</details>
> 2. Which side is to blame for a `4xx`, and which for a `5xx`?
>    <details><summary>Answer</summary><code>4xx</code>: the client sent a wrong request and should fix it. <code>5xx</code>: the server broke; the request may be fine.</details>
> 3. Why does `POST` without `Content-Type` return `415` and never reach your code?
>    <details><summary>Answer</summary>Spring's web layer checks the body format before calling the controller. Without the JSON header it cannot turn the body into a <code>CreateParcelRequest</code>, so it refuses the request itself.</details>

**Next:** back to [Step 04](README.md) and tick the acceptance criteria.
