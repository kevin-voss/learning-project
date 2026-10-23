# Task 02_2 · The gatekeeper

Part of [Exercise 02 · A small web layer](../README.md). New ideas you need: **`@Valid`**, **constraints**, **`@RestControllerAdvice`**, **`ProblemDetail`**. They are all explained in the exercise page. Course: [step 05 validation](../../../../../../tracks/spring-boot/topics/05-validation-and-inputs/README.md) and [step 06 error handling](../../../../../../tracks/spring-boot/topics/06-error-handling/README.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Build the bouncer of a `POST /books` endpoint: check the form before the book is created, and give every bad request one complaint desk.

First line: an integer `n` — how many requests follow. Then `n` lines, each: `POST <title> <pages>`. The title is one word; `-` stands for a blank title. The pages token may fail to be a number at all.

The rules, checked in this order:

1. The title must not be `-` → message `title must not be blank`.
2. The pages must parse as an integer → message `pages must be a number`.
3. The pages must be between 1 and 2000 inclusive → message `pages must be between 1 and 2000` (only checked when pages is a number).

Valid → `201 created <title>`. Invalid → `400 <message1>; <message2>` listing **every** broken rule, in the order above.

Model it like this:

```java
record BookRequest(String title, String pages) {}
List<String> validate(BookRequest request)   // this is @Valid + the constraint annotations
class ValidationException extends RuntimeException   // carrying the list
```

The controller method `create(BookRequest)` throws that exception and **never** formats errors. ONE `handle(ValidationException)` method turns it into the `400` line — this is the `@RestControllerAdvice` with its `@ExceptionHandler`, and the message line is the `ProblemDetail`. `main` calls the controller inside try/catch and prints what `handle` returns.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read each `POST <title> <pages>` line into a `BookRequest`.
2. `validate` checks the rules in order and collects every broken one in a list.
3. Rules 1–2 always run; rule 3 only runs when pages is a number.
4. Any broken rule → `create` throws `ValidationException` with the list.
5. `handle` writes the one 400 line: `400 message; message`.
6. No broken rule → `201 created <title>`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `POST Dune 412` | `201 created Dune` |
| `1` then `POST - 100` | `400 title must not be blank` |
| `1` then `POST Dune many` | `400 pages must be a number` |
| `1` then `POST Dune 0` | `400 pages must be between 1 and 2000` |
| `1` then `POST Dune 2001` | `400 pages must be between 1 and 2000` |
| `1` then `POST Dune 2000` | `201 created Dune` (border is valid) |
| `1` then `POST Dune 1` | `201 created Dune` (border is valid) |
| `1` then `POST - many` | `400 title must not be blank; pages must be a number` |
| `0` | nothing |

## Little helpers

<details>
<summary>May <code>create</code> print the error itself?</summary>

No. It throws `ValidationException`; only `handle` formats the 400. That split is the whole point: the controller does the happy path, the advice owns every error.

</details>

<details>
<summary>Why check the rules in that order?</summary>

`validate` adds each broken rule to a list as it walks the checks. The list order is the report order — same as Spring running the constraints top to bottom.

</details>

<details>
<summary>What does the <code>-</code> mean?</summary>

It stands for a blank string, because a real blank would end the line. `title.equals("-")` means the guest handed in an empty form — that is your `@NotBlank`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `create` never formats an error; `handle` is the only place that writes a 400.
- [ ] You can say which method is `@Valid`, which one is the `@ExceptionHandler`, and what plays the `ProblemDetail`.

Back to [Exercise 02](../README.md).
