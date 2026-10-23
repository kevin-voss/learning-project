# Task 02_1 · The router

Part of [Exercise 02 · A small web layer](../README.md). New ideas you need: **`@RestController`**, **route**, **`@PathVariable`**, **status codes**. They are all explained in the exercise page. Course: [REST API lab](../../../../../../tracks/spring-boot/topics/04-first-spring-api/rest-api.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Build a tiny controller: a router that reads requests and sends each one to a handler — the switchboard Spring runs for you.

The books are preloaded in the code (not in the input): id 1 → `Dune`, 2 → `Emma`, 3 → `Persuasion`. Keep them in a `LinkedHashMap<Integer, String>` so a delete keeps the id order.

First line: an integer `n` — how many requests follow. Then `n` lines, each: `METHOD path`, e.g. `GET /books` or `DELETE /books/2`.

The routes:

| Request | Response |
|---------|----------|
| `GET /books` | `200 [Dune, Emma, Persuasion]` — titles in id order, `[]` when the shelf is empty |
| `GET /books/{id}` | `200 <title>`, or `404 book <id> not found` when no book has that id |
| `DELETE /books/{id}` | `204` and the book is gone: a later `GET` answers 404 and the list shrinks. Deleting a missing id → `404 book <id> not found` |
| any other method or path | `404 no route for <METHOD> <path>` |

Print one line per request:

```text
<METHOD> <path> -> <response>
```

Model it like this:

```java
record Request(String method, String path) {}
record Response(int status, String body) {}   // body may be empty: print just the status
```

Have a `route(Request)` method that matches by method and path pattern (`split("/")` to read the id), and separate handler methods like `listBooks()`, `getBook(int id)`, `deleteBook(int id)`. The handler methods are the controller methods; `route` is what Spring does for you.

Use `public static void main(String[] args)`.

## The task, simply said

1. Put the three books in a `LinkedHashMap` before reading anything.
2. Read each `METHOD path` line into a `Request`.
3. `route` matches the method and the path pattern and calls ONE handler.
4. Read the id out of `/books/2` with `split("/")`.
5. Every handler answers with a `Response`: status and body (body empty for 204).
6. Print `METHOD path -> status body` per request — with no request, print nothing.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `GET /books` | `GET /books -> 200 [Dune, Emma, Persuasion]` |
| `1` then `GET /books/2` | `GET /books/2 -> 200 Emma` |
| `1` then `GET /books/9` | `GET /books/9 -> 404 book 9 not found` |
| `3` then `DELETE /books/2` / `GET /books/2` / `GET /books` | `DELETE /books/2 -> 204`, then `GET /books/2 -> 404 book 2 not found`, then `GET /books -> 200 [Dune, Persuasion]` |
| `1` then `DELETE /books/7` | `DELETE /books/7 -> 404 book 7 not found` |
| `1` then `POST /books` | `POST /books -> 404 no route for POST /books` |
| `0` | nothing |

## Little helpers

<details>
<summary>How do I read the id out of <code>/books/2</code>?</summary>

`path.split("/")` gives `["", "books", "2"]` — the leading `/` makes an empty first part. `parts[2]` is the id, and `Integer.parseInt` turns it into a number. A path without a number there is not a route.

</details>

<details>
<summary>What does a 204 print?</summary>

Only the status: `DELETE /books/1 -> 204`. The body is empty on purpose — "worked, nothing to say back".

</details>

<details>
<summary>Why a LinkedHashMap?</summary>

A plain `HashMap` forgets the order things went in. The list must print titles in id order — also after a delete removes one in the middle.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `route` only matches and forwards; each handler answers with a `Response`.
- [ ] You can say which method plays the controller and which one is the part Spring does for you.

Next: [Task 02_2](../task-02-2-the-gatekeeper/README.md)
