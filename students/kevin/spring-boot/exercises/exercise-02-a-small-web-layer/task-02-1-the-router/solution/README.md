# Sample solution · Task 02_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac TheRouter.java
java TheRouter
```

## How it works, step by step

1. The shelf is a `LinkedHashMap<Integer, String>`, filled in the constructor with ids 1–3. A `LinkedHashMap` remembers insertion order, so the list prints in id order — also after a delete.
2. `Request` and `Response` are records: the incoming method+path, and the outgoing status+body. `Response.of(204)` is the reply with no body.
3. `main` reads each line, splits it into method and path, wraps them in a `Request`, and prints `method path ->` followed by what `route` answers.
4. `route` is the switchboard — the part Spring does for you. First the exact match `GET /books`, then the pattern matches: `idFrom` splits the path on `/` and reads slot 2 as a number (`["", "books", "2"]`). `/books` and `/books/two` give `null`, so no pattern route fits.
5. The three handlers are the controller methods, one per route: `listBooks` joins the titles in map order, `getBook` answers 200 or a 404 message, `deleteBook` removes and answers 204 — or 404 when the id was never there.
6. `render` is the `ResponseEntity`: status first, body after, body empty means only the status.
7. A request that matches nothing — wrong method or wrong path — falls through to the last line: `404 no route for METHOD path`.

**Test run**

```text
3
DELETE /books/2
GET /books/2
GET /books
```

```text
DELETE /books/2 -> 204
GET /books/2 -> 404 book 2 not found
GET /books -> 200 [Dune, Persuasion]
```

| Input | Output |
|-------|--------|
| `1` / `GET /books` | `GET /books -> 200 [Dune, Emma, Persuasion]` |
| `1` / `GET /books/2` | `GET /books/2 -> 200 Emma` |
| `1` / `GET /books/9` | `GET /books/9 -> 404 book 9 not found` |
| `1` / `DELETE /books/7` | `DELETE /books/7 -> 404 book 7 not found` |
| `1` / `POST /books` | `POST /books -> 404 no route for POST /books` |
| `0` | (nothing) |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| A plain `HashMap` for the shelf | the list prints in a random order | `LinkedHashMap` keeps id order, also after deletes |
| `split("/")` slot 1 taken as the id | `DELETE /books/2` looks up book "books" | The leading `/` makes slot 0 empty; the id is slot 2 |
| 204 with a body | `DELETE /books/1 -> 204 ` followed by text | 204 means no body: print just the status |
| Delete returns 404 when it worked | `DELETE /books/2 -> 404` | `remove` returns the removed value — `null` means it was missing |
| One big method with `if`s doing everything | works, but nothing is learned | Handlers answer; `route` only matches and forwards |
| Crash on `GET /books/two` | `NumberFormatException` in red | Parse defensively: not a number → no route |

Back to [Task 02_1](../README.md).
