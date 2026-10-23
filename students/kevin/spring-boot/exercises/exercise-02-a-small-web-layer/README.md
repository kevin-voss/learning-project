# Exercise 02 · A small web layer

| | |
|---|---|
| Student | Kevin |
| Subject | Spring Boot |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

The theatre opens its doors: a **switchboard operator** routes every call by method and path, the **menu card** shows guests only what they may order, and **one complaint desk** answers every bad request in the same words.

## Before you code

Course steps this exercise practices (read the parts you need):

1. Course step 04: [REST API lab](../../../../../tracks/spring-boot/topics/04-first-spring-api/rest-api.md) and [JSON and DTOs](../../../../../tracks/spring-boot/topics/04-first-spring-api/json-and-dtos.md)
2. Course step 05: [Validation and trustworthy inputs](../../../../../tracks/spring-boot/topics/05-validation-and-inputs/README.md)
3. Course step 06: [Error handling](../../../../../tracks/spring-boot/topics/06-error-handling/README.md) and [Error handling and HTTP statuses](../../../../../tracks/spring-boot/references/web-and-api/error-handling-and-http-statuses.md) (ProblemDetail)
4. Map: [Spring sheets](../../../../../sheets/spring/README.md)

Same rule as exercise 01: real Spring needs Maven and a server, so every task builds **one Spring idea by hand** in plain Java. Each task page names the stand-ins — which plain-Java class plays which Spring part.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 02_1 | [The router](task-02-1-the-router/README.md) | todo |
| 02_2 | [The gatekeeper](task-02-2-the-gatekeeper/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

---

## What you will learn

### 1. `@RestController`, `@GetMapping` and `@PathVariable` — the switchboard

Picture an old telephone switchboard. Every call names a number; the operator finds the matching plug and connects the caller to one person. A request is a **method + path** (`GET /books/2`); the route decides which method answers it.

Real Spring:

```java
@RestController
public class BookController {
    @GetMapping("/books/{id}")
    public BookDto one(@PathVariable int id) { … }   // {id} lands in the parameter
}
```

- `@RestController`: this class answers HTTP; return values become the response body.
- `@GetMapping("/books/{id}")`: this method answers `GET /books/<anything>`.
- `@PathVariable` grabs the `{id}` out of the path.

**In task 02_1 you build this by hand:** `route(Request)` is the switchboard — the part Spring does for you — and `listBooks`, `getBook`, `deleteBook` are the controller methods.

### 2. Status codes — the number on the reply card

Picture a reply card with one big number on it: you know how it went before reading the letter.

| Code | Name | Means |
|------|------|-------|
| `200` | OK | worked, here is the body |
| `201` | Created | a new thing exists now |
| `204` | No Content | worked, nothing to say back |
| `400` | Bad Request | your request is broken — fix it |
| `404` | Not Found | no such thing |

**In tasks 02_1 and 02_2** you print the number yourself and see which one fits which answer.

### 3. DTO vs entity — menu card vs recipe book

Picture a restaurant. The guest sees the **menu card**: short, only what can be ordered. The kitchen keeps the **recipe book**: everything, amounts, tricks. Handing the guest the recipe book is the classic data leak.

Real Spring:

```java
public record BookDto(String title) {}       // what the API shows

public class BookEntity { … }                // the full internal object — never goes out
```

**In task 02_2** the request arrives as a small `record BookRequest(String title, String pages)` — a form shaped for the API, not the full book.

### 4. `@Valid` and one complaint desk — rules at the door

Picture a club. The bouncer checks the form at the door: name filled in, age in range. And there is **one** complaint desk, where every rejected guest hears the same words in the same order.

Real Spring:

```java
public record BookRequest(@NotBlank String title,
                          @Min(1) @Max(2000) int pages) {}

@PostMapping
public ResponseEntity<Void> create(@Valid @RequestBody BookRequest req) { … }

@RestControllerAdvice
public class ErrorAdvice {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail onValidation(MethodArgumentNotValidException ex) { … }
}
```

- `@NotBlank`, `@Min`, `@Max`: the rules on the form.
- `@Valid`: the trigger — check before the method runs.
- `@RestControllerAdvice` + `@ExceptionHandler`: one place turns every failure into one error shape, here a `ProblemDetail`.

**In task 02_2 you build this by hand:** `validate` is the rules, `ValidationException` is what Spring throws when a rule breaks, and one `handle` method is the advice — it writes every 400 the same way.

---

## Words to know

| Word | Means |
|------|-------|
| **controller** | A class whose methods answer requests (the front desk) |
| **request** | Method + path (+ optional body), e.g. `GET /books/2` |
| **route** | The match from one method+path to one handler method |
| **`@RestController`** | Label: this class answers HTTP, return values become the body |
| **`@GetMapping`** | Label: this method answers a `GET` on this path pattern |
| **`@PathVariable`** | Grab the `{id}` out of the path |
| **status code** | The number that says how it went: 200, 201, 204, 400, 404 |
| **DTO** | Data transfer object: a small record shaped for the API (the menu card) |
| **entity** | The full internal object with everything (the recipe book) |
| **validation** | Checking rules on the input before acting on it |
| **constraint** | One rule on one field: `@NotBlank`, `@Min`, `@Max` |
| **`@Valid`** | The trigger: check the constraints before the method runs |
| **`@RestControllerAdvice`** | One class that handles exceptions for every controller |
| **`@ExceptionHandler`** | One method per exception type inside the advice |
| **ProblemDetail** | Spring's standard error body (RFC 7807) |

## Source

Written for Kevin: plain-Java practice for course steps 04–06 of the [Spring Boot track](../../../../../tracks/spring-boot/README.md).

Back to [all exercises](../README.md).
