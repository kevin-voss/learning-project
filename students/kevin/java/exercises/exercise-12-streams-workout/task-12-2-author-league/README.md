# Task 12_2 · Author league

Part of [Exercise 12 · Streams workout](../README.md). New ideas you need: **`groupingBy` with `averagingDouble` and `counting`**, **`Comparator.comparing(...).reversed().thenComparing(...)`**, **`max` with an `Optional`**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that hangs the author league table on the library wall.

First line: an integer `n` — how many books are on the shelf.

Then `n` lines, each: `title author rating`. Title and author are one word each. The rating is a number with one decimal, like `4.5`.

Print one line per author, sorted by average rating, best first:

```text
<author>: <average rating, 1 decimal> (<count> books)
```

- Two authors share the average: the one whose name comes first alphabetically prints first.
- The average prints with one decimal and a dot, like `4.2`. `String.format("%.1f", avg)` does that.
- The count is how many books the author has on the shelf. The word `books` is always there, even for one book.

Then the best-book line:

```text
best: <title of the highest-rated book>
```

- Two books share the top rating: the alphabetically first title wins.
- When `n` is `0`, there is no league and no best book: print only `best: (none)`.

Use `Collectors.groupingBy(Book::author, Collectors.averagingDouble(Book::rating))` for the averages and a second `groupingBy` with `counting()` (or the box size) for the counts. Sort the entries with `Comparator.comparing(...).reversed().thenComparing(...)` and find the best book with `max` and a comparator chain.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read `n` books into `Book` records.
2. Group by author: one map with the average rating, one map with the book count.
3. Sort the authors: average down, ties by name up.
4. Print one league line per author.
5. `max` with a comparator chain finds the best book; print `best: <title>` — or `(none)` on an empty shelf.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `2` / `Dune Herbert 4.5` / `Emma Austen 4.1` | `Herbert: 4.5 (1 books)`, `Austen: 4.1 (1 books)`, `best: Dune` |
| `4` / `Emma Austen 4.4` / `Road Orwell 3.9` / `Persuasion Austen 4.0` / `Animal Orwell 4.5` | `Austen: 4.2 (2 books)`, `Orwell: 4.2 (2 books)` — tie, name order — `best: Animal` |
| `3` / `Dalloway Woolf 4.0` / `Orlando Woolf 4.5` / `Lighthouse Woolf 4.0` | `Woolf: 4.2 (3 books)` — 12.5 / 3 rounds to one decimal — `best: Orlando` |
| `2` / `Sea Gann 4.5` / `Dune Herbert 4.5` | `Gann: 4.5 (1 books)`, `Herbert: 4.5 (1 books)`, `best: Dune` — the alphabetically first title wins the tie |
| `2` / `Fable Aesop 3.5` / `Odes Aesop 4.5` | `Aesop: 4.0 (2 books)`, `best: Odes` |
| `5` / `Iliad Homer 5.0` / `Odyssey Homer 4.0` / `Emma Austen 4.1` / `Persuasion Austen 4.3` / `Wigan Orwell 3.9` | `Homer: 4.5 (2 books)`, `Austen: 4.2 (2 books)`, `Orwell: 3.9 (1 books)`, `best: Iliad` |
| `0` | only `best: (none)` |

## Little helpers

<details>
<summary>Two maps or one? How do the average and the count meet?</summary>

Two `groupingBy` streams, then one league row per author that holds name, average and count. A tiny record for that row makes the sort easy to read.

</details>

<details>
<summary>Where do I put .reversed() in the chain?</summary>

Right after `comparing`: first the order is flipped to best-first, then `thenComparing` adds the tie-break in normal name order.

</details>

<details>
<summary>max picks the biggest — but the tie wants the alphabetically FIRST title?</summary>

Give the title key a backwards order (`Comparator.reverseOrder()`), so under the comparator the earlier title counts as the bigger one.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] The averages come from `groupingBy` + `averagingDouble`, not from a hand-written sum loop.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 12](../README.md).
