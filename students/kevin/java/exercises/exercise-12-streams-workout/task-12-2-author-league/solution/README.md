# Sample solution · Task 12_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac AuthorLeague.java
java AuthorLeague
```

## How it works, step by step

1. `Book` is the record from task 12_1. A second record, `AuthorRow(author, average, books)`, holds one league row — name, average and count together, so sorting it reads like the wall.
2. `groupingBy(Book::author, averagingDouble(Book::rating))` sorts every book into the box of its author, then boils each box down to its average: a `Map<String, Double>`.
3. A second `groupingBy` with `counting()` gives the box sizes: a `Map<String, Long>`.
4. One `AuthorRow` per map entry joins the two summaries. The chain orders them: `comparing(AuthorRow::average).reversed()` — best average first — then `.thenComparing(AuthorRow::author)` for equal averages, A to Z. `reversed()` sits right after `comparing`, so only the average is flipped, not the tie-break.
5. `String.format("%.1f", average)` prints the average with one decimal and a dot (`4.2`, `4.0`).
6. `max(Comparator.comparing(Book::rating).thenComparing(Book::title, Comparator.reverseOrder()))` keeps one winner: biggest rating; on a tie the reversed title key makes the alphabetically **first** title count as the bigger one. `max` returns an `Optional<Book>` — `map(Book::title).orElse("(none)")` handles the empty shelf.

**Test run**

```text
5
Iliad Homer 5.0
Odyssey Homer 4.0
Emma Austen 4.1
Persuasion Austen 4.3
Wigan Orwell 3.9
```

```text
Homer: 4.5 (2 books)
Austen: 4.2 (2 books)
Orwell: 3.9 (1 books)
best: Iliad
```

| Input | Output |
|-------|--------|
| `2` / `Dune Herbert 4.5` / `Emma Austen 4.1` | `Herbert: 4.5 (1 books)` + `Austen: 4.1 (1 books)` + `best: Dune` |
| `4` / `Emma Austen 4.4` / `Road Orwell 3.9` / `Persuasion Austen 4.0` / `Animal Orwell 4.5` | `Austen: 4.2 (2 books)` + `Orwell: 4.2 (2 books)` + `best: Animal` |
| `3` / `Dalloway Woolf 4.0` / `Orlando Woolf 4.5` / `Lighthouse Woolf 4.0` | `Woolf: 4.2 (3 books)` + `best: Orlando` |
| `2` / `Sea Gann 4.5` / `Dune Herbert 4.5` | `Gann: 4.5 (1 books)` + `Herbert: 4.5 (1 books)` + `best: Dune` |
| `2` / `Fable Aesop 3.5` / `Odes Aesop 4.5` | `Aesop: 4.0 (2 books)` + `best: Odes` |
| `0` | `best: (none)` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `.reversed()` at the **end** of the chain | ties sit Z to A | Flip right after `comparing`, then `thenComparing` adds the tie-break in normal order |
| `max(Comparator.comparing(Book::title))` on equal ratings | `best: Sea` — the alphabetically **last** title wins | First key is the rating; the title key only breaks ties, reversed |
| Averages sorted as strings, or keys only | `Orwell` before `Austen` | Sort by the average value; the name is only the tie-break |
| Average computed with a hand-written loop | long, and easy to get wrong | `groupingBy` + `averagingDouble` does it in one line |
| `%.1f` on the raw sum | `8.4` instead of `4.2` | Format the **average**, the map value |
| Empty shelf forgotten | crash, or a blank league line on `0` | `orElse("(none)")` after `max` |

Back to [Task 12_2](../README.md).
