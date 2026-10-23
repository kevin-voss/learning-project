# Sample solution · Task 04_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac ReadingLog.java
java ReadingLog
```

## How it works, step by step

1. `books` is an `ArrayList<String>`: it grows with every `ADD` and shrinks with every `DROP`, and it keeps the order the clerk typed. No size is fixed up front.
2. `while (in.hasNextLine())` reads command lines until the input ends. The task gives no count, so the input itself must say "no more".
3. `ADD` checks `contains` **before** `add`, so a title is never on the list twice. The second try gets the message instead of a second entry.
4. `DROP` makes the same check the other way round: only a title that is there can be removed.
5. `SHOW` glues the titles with `", "` — a comma **between** two titles, never before the first. An empty list gets its own line: `(none)`.
6. `COUNT` is `books.size()`; `HAS` is `contains` turned into `yes` or `no`.

**Test run**

```text
ADD hamlet
ADD dune
ADD hamlet
DROP romeo
HAS hamlet
HAS romeo
SHOW
COUNT
```

```text
already read: hamlet
not on the list: romeo
has hamlet: yes
has romeo: no
books: hamlet, dune
count: 2
```

| Input | Output |
|-------|--------|
| `ADD hamlet` / `ADD dune` / `SHOW` | `books: hamlet, dune` |
| `ADD hamlet` / `ADD hamlet` / `COUNT` | `already read: hamlet` and `count: 1` |
| `ADD hamlet` / `HAS hamlet` | `has hamlet: yes` |
| `DROP hamlet` (empty list) | `not on the list: hamlet` |
| `SHOW` (empty list) | `books: (none)` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `add` first, check later | the title is on the list twice, `SHOW` shows it twice | Check `contains` before `add` |
| Printing on every `ADD` | tests fail: a plain add must be silent | Only the two problem cases print |
| `String[] books = new String[?]` | the size is unknown up front | `ArrayList<String>` grows alone |
| Empty `SHOW` prints `books: ` | an empty line of titles | `isEmpty()` first, then `(none)` |

Back to [Task 04_1](../README.md).
