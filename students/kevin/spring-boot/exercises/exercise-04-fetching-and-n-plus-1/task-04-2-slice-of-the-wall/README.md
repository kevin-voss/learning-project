# Task 04_2 · Slice of the wall

Part of [Exercise 04 · Fetching and N plus 1](../README.md). New ideas you need: **pagination**, **`PageRequest`**, **`Sort.by`** and why the order is mandatory. They are all explained in the exercise page. Sheet: [Fetching and N+1](../../../../../../sheets/hibernate/fetching-and-n-plus-one.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task

`PageRequest.of(page, size, Sort.by("title"))` sends `ORDER BY title LIMIT … OFFSET …` to the database. The order is not decoration: without it, rows come out in any order and page 2 can repeat rows of page 1. Here you build that slice by hand, in plain Java.

The wall of titles, in **insertion order** (the order the rows happen to sit in the table):

```text
Dune, Emma, Persuasion, Beloved, Ulysses, Dracula, Carrie
```

First line: an integer `n` — how many requests follow.

Then `n` lines, each: `PAGE <page> <size>`. The page is **0-based**, the size is 1 or more.

For every request print one line:

```text
page <p> of <totalPages>: [<titles on that page>]
```

Rules:

- The titles are **always sorted alphabetically first** — that is `Sort.by("title")`. Then the slice is cut.
- `totalPages = ceil(7 / size)` — the number of pages for all seven titles at that size.
- A page past the end prints `[]` — an empty list, not an error.

Model it like Spring Data does: a `record PageRequest(int page, int size)` and a method `page(List<String> all, PageRequest req)` that slices with `subList` and **clamped bounds** (the start may sit past the end of the list; the end never may).

Use `public static void main(String[] args)`.

## The task, simply said

1. Read how many requests come next.
2. Sort a copy of the wall alphabetically — before any slicing.
3. For every `PAGE p s`: build a `PageRequest(p, s)`.
4. Cut the slice with `subList` and clamped bounds; a start past the wall is `[]`.
5. Compute `totalPages` with a ceiling division.
6. Print `page <p> of <totalPages>: <titles>` — the list prints as `[a, b, c]` by itself.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `PAGE 0 3` | `page 0 of 3: [Beloved, Carrie, Dracula]` |
| `1` then `PAGE 2 3` | `page 2 of 3: [Ulysses]` |
| `1` then `PAGE 3 3` | `page 3 of 3: []` |
| `1` then `PAGE 0 7` | `page 0 of 1: [Beloved, Carrie, Dracula, Dune, Emma, Persuasion, Ulysses]` |
| `1` then `PAGE 0 10` | `page 0 of 1: [Beloved, Carrie, Dracula, Dune, Emma, Persuasion, Ulysses]` |
| `0` | nothing |

## Little helpers

<details>
<summary>How do I compute ceil(7 / size) with whole numbers?</summary>

`(titles + size - 1) / size`. For 7 and 3: `(7 + 2) / 3 = 3`. No `Math.ceil` and no doubles needed.

</details>

<details>
<summary>What does "clamped bounds" mean?</summary>

`from = page * size` may point past the wall — then the page is `[]`. And `to = from + size` may point past the wall — clamp it with `Math.min(from + size, titles.size())`, so the last page is allowed to be short.

</details>

<details>
<summary>Why sort at all? The slice works without it.</summary>

It works, but it teaches the wrong lesson: without `Sort.by("title")` the database may hand out rows in any order, so page 2 can repeat rows of page 1. Sort first, then slice — every time.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `page(all, req)` exists, slices with `subList` and clamped bounds, and the sorting happens before the slicing.
- [ ] You can say why page 2 could repeat rows of page 1 without an ORDER BY.

Back to [Exercise 04](../README.md).
