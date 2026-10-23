# Task 12_1 · Book finder

Part of [Exercise 12 · Streams workout](../README.md). New ideas you need: **a record as the stream element**, **`filter` + `map` + `toList`**, **`distinct` + `sorted` + `Collectors.joining`**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that answers the library team's first question: which books on the shelf are good enough, and which writers are on the shelf at all?

First line: an integer `n` — how many books are on the shelf.

Then `n` lines, each: `title author rating`. Title and author are one word each. The rating is a number with one decimal, like `4.5`.

Then one last line: the minimum rating (a number with one decimal).

Print exactly, in this order:

```text
found: <k>
```

then one line per book with `rating >= min`, in input order (equal to the minimum counts!):

```text
<title> (<rating>)
```

Print the rating as the number you parsed: `4.5`, `4.0`.

Then the authors of **all** `n` books — distinct, alphabetical, joined with `", "`:

```text
authors: <author>, <author>, ...
```

When `n` is `0`, this line is `authors: (none)`.

Use a stream pipeline: `filter` + `map` + `toList` for the found books, and `distinct` + `sorted` + `Collectors.joining(", ")` for the authors. Model one book as `record Book(String title, String author, double rating)`.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. Read `n` books: each line becomes one `Book` record.
2. Read the minimum rating.
3. Stream: `filter` (rating >= min) → `map` to `title (rating)` → `toList`.
4. Print `found: <size>`, then the lines.
5. Second stream over all books: `map` to author → `distinct` → `sorted` → `joining(", ")`.
6. Print `authors: ...` — or `(none)` on an empty shelf.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `4` / `Ivanhoe Scott 4.3` / `Emma Austen 4.1` / `Kenilworth Scott 4.0` / `Persuasion Austen 4.6` / `4.1` | `found: 3`, then `Ivanhoe (4.3)`, `Emma (4.1)`, `Persuasion (4.6)`, then `authors: Austen, Scott` |
| `1` / `Hamlet Shakespeare 4.1` / `4.2` | `found: 0`, then `authors: Shakespeare` |
| `3` / `Dune Herbert 4.5` / `Emma Austen 4.1` / `Sea Gann 4.0` / `1.0` | `found: 3` and the three book lines, then `authors: Austen, Gann, Herbert` |
| `4` / `Ivanhoe Scott 4.3` / `Emma Austen 4.1` / `Kenilworth Scott 4.0` / `Persuasion Austen 4.6` / `5.0` | `found: 0`, then `authors: Austen, Scott` |
| `1` / `Dune Herbert 4.5` / `4.5` | `found: 1`, then `Dune (4.5)` |
| `3` / `Zoo Orwell 4.0` / `Ant Orwell 5.0` / `Mid Orwell 3.0` / `4.0` | `found: 2`, then `Zoo (4.0)`, `Ant (5.0)` — input order, not sorted |
| `0` / `3.0` | `found: 0`, then `authors: (none)` |

## Little helpers

<details>
<summary>How do I count the found books?</summary>

The list from `toList()` knows: `lines.size()`. Count and printed lines come from the same list, so they can never disagree.

</details>

<details>
<summary>Does the authors line use the found books or all books?</summary>

All `n` books. A stream is used once, so start a fresh one from the shelf for the authors.

</details>

<details>
<summary>Where does the (none) come from?</summary>

An empty shelf joins to an empty string `""`. Check `isEmpty()` and print `(none)` instead.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] Both answers come from stream pipelines, not from hand-written filter loops.
- [ ] You can explain your code out loud in your own words.

Next: [Task 12_2](../task-12-2-author-league/README.md)
