# Sample solution · Task 04_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac SliceOfTheWall.java
java SliceOfTheWall
```

## How it works, step by step

1. `WALL` is the table: seven rows in insertion order — the order nobody guarantees.
2. Before any request is read, `main` copies the wall and sorts it. That copy is the `ORDER BY title` — the fixed order every page needs.
3. `PageRequest` is a record with `page` and `size` — the same two numbers as `PageRequest.of(page, size)`.
4. `page(sorted, req)` cuts the slice: `from = page * size`, `to = Math.min(from + size, sorted.size())`. The `Math.min` is the clamp — the last page may be short. A `from` past the wall returns `[]`.
5. `totalPages` is a ceiling division in whole numbers: `(7 + size - 1) / size`. Size 3 → 3 pages; size 7 or 10 → 1 page.
6. Java prints a `List` as `[a, b, c]` and an empty list as `[]` — exactly the shape the task wants, so the list goes straight into the line.

**Test run**

```text
3
PAGE 0 3
PAGE 2 3
PAGE 3 3
```

```text
page 0 of 3: [Beloved, Carrie, Dracula]
page 2 of 3: [Ulysses]
page 3 of 3: []
```

| Input | Output |
|-------|--------|
| `1` / `PAGE 0 3` | `page 0 of 3: [Beloved, Carrie, Dracula]` |
| `1` / `PAGE 2 3` | `page 2 of 3: [Ulysses]` |
| `1` / `PAGE 3 3` | `page 3 of 3: []` |
| `1` / `PAGE 0 7` | `page 0 of 1: [Beloved, Carrie, Dracula, Dune, Emma, Persuasion, Ulysses]` |
| `1` / `PAGE 0 10` | `page 0 of 1: [Beloved, Carrie, Dracula, Dune, Emma, Persuasion, Ulysses]` |
| `0` | (nothing) |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Slicing the insertion order | `page 0` shows `[Dune, Emma, Persuasion]` | Sort a copy first — that is `Sort.by("title")` |
| `7 / 3` pages | `totalPages` is 2, page 2 vanishes | Ceiling: `(7 + size - 1) / size` |
| No clamp on `to` | `PAGE 2 3` crashes with `IndexOutOfBoundsException` | `Math.min(from + size, sorted.size())` |
| A page past the end throws | `PAGE 3 3` crashes | A start past the wall is an empty page: `[]` |
| Pages treated as 1-based | `PAGE 0 3` shows the second slice | Pages are 0-based, like `PageRequest.of` |
| Sorting inside `page()` on every call | right answers, wrong lesson | Sort once, before slicing |

Back to [Task 04_2](../README.md).
