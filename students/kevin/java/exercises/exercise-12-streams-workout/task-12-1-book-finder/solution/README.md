# Sample solution · Task 12_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac BookFinder.java
java BookFinder
```

## How it works, step by step

1. `Book` is a record: title, author and rating travel as one small frozen box. The belt carries whole books, so every step can ask for the part it needs.
2. `readShelf` reads the `n` book lines into a `List<Book>`; the last input line is the bar, `minRating`.
3. First pipeline: `filter` keeps the books with `rating >= minRating` (equal counts!), `map` builds each printed line `title (rating)`, `toList()` freezes them. `found:` is `foundLines.size()` — count and lines come from the same list, so they always agree.
4. Second pipeline over **all** books (a stream is used once, so it starts fresh from the shelf): `map(Book::author)` → `distinct` drops repeated writers → `sorted` orders A to Z → `Collectors.joining(", ")` glues everything into one string. That is why Scott appears even when none of his books pass.
5. An empty shelf joins to `""`; the `isEmpty()` check swaps in `(none)`.
6. Gluing a `double` into a string prints Java's own form: `4.5` stays `4.5`, `4.0` keeps its zero.

**Test run**

```text
4
Ivanhoe Scott 4.3
Emma Austen 4.1
Kenilworth Scott 4.0
Persuasion Austen 4.6
4.1
```

```text
found: 3
Ivanhoe (4.3)
Emma (4.1)
Persuasion (4.6)
authors: Austen, Scott
```

| Input | Output |
|-------|--------|
| `1` / `Hamlet Shakespeare 4.1` / `4.2` | `found: 0` + `authors: Shakespeare` |
| `3` / `Dune Herbert 4.5` / `Emma Austen 4.1` / `Sea Gann 4.0` / `1.0` | `found: 3`, the three lines, `authors: Austen, Gann, Herbert` |
| `1` / `Dune Herbert 4.5` / `4.5` | `found: 1` + `Dune (4.5)` |
| `3` / `Zoo Orwell 4.0` / `Ant Orwell 5.0` / `Mid Orwell 3.0` / `4.0` | `found: 2` + `Zoo (4.0)` + `Ant (5.0)` |
| `0` / `3.0` | `found: 0` + `authors: (none)` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `rating > min` | `Emma (4.1)` is missing at bar `4.1` | The task says `>=`: equal to the bar counts |
| Authors from the found list | Scott is missing when his books fail | The authors line reads **all** `n` books |
| `distinct` forgotten | `authors: Austen, Austen, Scott, Scott` | `distinct` before `sorted` |
| No empty check before printing | `authors:` alone on an empty shelf | Swap in `(none)` when the joined string is empty |
| One stream for both answers | "stream has already been operated upon" | A stream is used once: start a fresh one from the shelf |
| A loop that filters by hand | works, but the sheet's idea is lost | Say it on the belt: `filter` → `map` → `toList` |

Back to [Task 12_1](../README.md).
