# Sample solution · Task 04_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac CountTheQueries.java
java CountTheQueries
```

## How it works, step by step

1. `sql(query)` is the only way to run a query: it prints the `-- ` line and bumps the counter. One door for every SELECT — that is the SQL log and `generate_statistics` in one method.
2. `Author` holds its books in a field that starts as `null`. `books()` is the locker: when it is still `null`, it runs `-- SELECT * FROM books WHERE author_id = <id>` and fills the list. The second call finds a filled list — no query. That `if` **is** lazy loading.
3. Lazy mode runs `-- SELECT * FROM authors` once (the "1" in N+1). A first pass then touches every `books()` in id order — ana, ben, cy — and each first touch fires its own SELECT, so four SQL lines in total. Cy's list is empty, but touching it still costs the query.
4. Fetch mode runs `-- SELECT * FROM authors JOIN books` **instead of** the authors SELECT — the join replaces it — and `fillFromJoin` fills every author before printing. No `books()` call is ever a first touch, so nothing extra loads: `queries: 1`.
5. Only after all touching, the second pass prints the three author lines and `queries:` — every SQL first, then the results, like reading the log top to bottom. Both modes print the same author lines; only the number of trips differs.

**Test run, lazy**

```text
MODE lazy
```

```text
-- SELECT * FROM authors
-- SELECT * FROM books WHERE author_id = 1
-- SELECT * FROM books WHERE author_id = 2
-- SELECT * FROM books WHERE author_id = 3
ana: 2 books
ben: 1 books
cy: 0 books
queries: 4
```

**Test run, fetch**

```text
MODE fetch
```

```text
-- SELECT * FROM authors JOIN books
ana: 2 books
ben: 1 books
cy: 0 books
queries: 1
```

| Input | Output |
|-------|--------|
| `MODE lazy` | the four `-- SELECT` lines, the three author lines, `queries: 4` |
| `MODE fetch` | one `-- SELECT * FROM authors JOIN books`, the three author lines, `queries: 1` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| No query for the author list | lazy mode ends at `queries: 3` | The "1" in N+1 is the `-- SELECT * FROM authors` |
| Cy skips her query because she has no books | `queries: 3` | An empty lazy collection is loaded with a query too |
| Fetch mode also prints the `WHERE author_id` lines | `queries: 4` in fetch mode | Fill every author's books from the join before printing |
| Counting by hand next to the prints | `queries:` does not match the `--` lines | Print and count in one `sql(...)` method |
| `queries:` printed before the author lines | the count is wrong | Touch every collection first, then print — the count is last |

Back to [Task 04_1](../README.md).
