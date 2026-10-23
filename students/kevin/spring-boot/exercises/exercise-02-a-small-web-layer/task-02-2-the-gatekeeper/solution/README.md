# Sample solution · Task 02_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac TheGatekeeper.java
java TheGatekeeper
```

## How it works, step by step

1. `BookRequest` is the DTO: a small record shaped for the API — a form with two fields, not the full book.
2. `validate` is `@Valid` plus the constraint annotations. It walks the rules in contract order and collects every broken one in a list: blank title first, then "is pages even a number", then the 1–2000 range. The range check lives inside the `try`, so it only runs when pages parsed.
3. The `-` stands for a blank title (a real blank would end the line). `title.equals("-")` is the `@NotBlank`.
4. `ValidationException` is what Spring throws when a constraint fails. It extends `RuntimeException` — unchecked, so no `throws` on every method — and carries the list. Its message is the list joined with `"; "`.
5. `create` is the controller method and does the happy path only: validate, throw when the list is not empty, otherwise answer `201 created <title>`. It never writes a 400.
6. `handle` is the `@RestControllerAdvice` with its `@ExceptionHandler` — the one complaint desk. It writes every 400 in the same shape: `400 ` plus the messages. In real Spring its return value would be a `ProblemDetail`.
7. `main` plays the part Spring plays around your controller: it calls `create` inside try/catch and prints whatever the answer is — the 201 line from the controller or the 400 line from the advice.

**Test run**

```text
4
POST Dune 412
POST - 100
POST Dune many
POST - many
```

```text
201 created Dune
400 title must not be blank
400 pages must be a number
400 title must not be blank; pages must be a number
```

| Input | Output |
|-------|--------|
| `POST Dune 412` | `201 created Dune` |
| `POST - 100` | `400 title must not be blank` |
| `POST Dune many` | `400 pages must be a number` |
| `POST Dune 0` | `400 pages must be between 1 and 2000` |
| `POST Dune 2001` | `400 pages must be between 1 and 2000` |
| `POST Dune 2000` | `201 created Dune` |
| `POST Dune 1` | `201 created Dune` |
| `POST - many` | `400 title must not be blank; pages must be a number` |
| `0` | (nothing) |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `create` prints the 400 itself | works for one rule, and the advice idea is gone | `create` throws; only `handle` formats errors |
| The range checked before the parse | crash on `POST Dune many` | The range check lives inside the `try`, after `parseInt` |
| Only the first error reported | `POST - many` misses the pages message | Collect **all** broken rules in one list, then throw once |
| Rules in a different order | `pages` before `title` in the two-error test | Check in contract order: title, number, range |
| Catching `NumberFormatException` outside `validate` | `main` messes with validation | The parse is a `validate` detail; keep it there |
| Checked exception (`extends Exception`) | `unreported exception` compile errors | Unchecked: `extends RuntimeException`, like Spring's own |

Back to [Task 02_2](../README.md).
