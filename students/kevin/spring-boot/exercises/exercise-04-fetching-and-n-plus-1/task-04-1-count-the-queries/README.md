# Task 04_1 · Count the queries

Part of [Exercise 04 · Fetching and N plus 1](../README.md). New ideas you need: **LAZY**, **N+1**, **JOIN FETCH**. They are all explained in the exercise page. Sheet: [Fetching and N+1](../../../../../../sheets/hibernate/fetching-and-n-plus-one.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task

Real Hibernate hides its SQL; here your program prints every query it "runs" and counts them — that is the statistics and the SQL log in one. The data lives in code, no database:

| id | author | books |
|----|--------|-------|
| 1 | ana | Dune, Emma |
| 2 | ben | Persuasion |
| 3 | cy | (none) |

Input: **one** line, either `MODE lazy` or `MODE fetch`.

The program prints:

1. every SQL it runs, as one line starting with `-- ` (that is the SQL log), in the order the queries run;
2. one line per author, in id order:
   ```text
   <name>: <k> books
   ```
3. at the end:
   ```text
   queries: <count>
   ```

**Lazy mode** (the collection is LAZY, like a locked locker):

- first one query for the list of authors: `-- SELECT * FROM authors`
- then, every time an author's books are touched for the **first** time, one more query: `-- SELECT * FROM books WHERE author_id = <id>`
- cy has no books, but her empty shelf still costs a query
- that is N+1: `queries: 4`

**Fetch mode** (the locker contents arrive with the list, like `JOIN FETCH`):

- one single query: `-- SELECT * FROM authors JOIN books` — it fills every author's books up front
- no `WHERE author_id` line may appear
- `queries: 1`

Model it like Hibernate does: an `Author` whose `books()` method loads the list on the **first** call (keep it `null` until then) and bumps a shared query counter. In fetch mode every author's books are filled from the join before anything is printed. Route every SQL through one place that prints **and** counts.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read the one input line and pick the mode.
2. Keep a query counter and a `sql(...)` method that prints a `-- ` line and counts.
3. Build the three authors in id order.
4. Lazy: one `-- SELECT * FROM authors`; each author's `books()` loads on first touch with its own `-- SELECT * FROM books WHERE author_id = <id>`.
5. Fetch: one `-- SELECT * FROM authors JOIN books` that fills every author's books up front.
6. Print the three author lines, then `queries:` with the count.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `MODE lazy` | `-- SELECT * FROM authors`, then the three `-- SELECT * FROM books WHERE author_id = …` lines (1, 2, 3), then `ana: 2 books`, `ben: 1 books`, `cy: 0 books` and `queries: 4` |
| `MODE fetch` | `-- SELECT * FROM authors JOIN books`, then `ana: 2 books`, `ben: 1 books`, `cy: 0 books` and `queries: 1` — no `WHERE author_id` anywhere |

## Little helpers

<details>
<summary>What counts as a query?</summary>

Every `-- ` line. One `sql(String)` method prints and counts — then no query can escape the counter. That is what `hibernate.generate_statistics=true` does for you.

</details>

<details>
<summary>How do I make the collection lazy?</summary>

Keep the books field `null` and load it inside `books()` when it is still `null`. That `if` **is** the lazy loading: the cost moves to the first touch.

</details>

<details>
<summary>Where do the books come from?</summary>

A `Map<Integer, List<String>>` in code stands for the books table. Lazy mode reads it inside `books()`; fetch mode copies from it once, up front.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] In lazy mode the fourth query exists only because cy's empty books were touched too.
- [ ] You can say what `JOIN FETCH` changes — and why making everything EAGER is not the fix.

Next: [Task 04_2](../task-04-2-slice-of-the-wall/README.md)
