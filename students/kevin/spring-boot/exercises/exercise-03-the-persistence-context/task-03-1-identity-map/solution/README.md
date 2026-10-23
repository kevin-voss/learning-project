# Sample solution · Task 03_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac IdentityMap.java
java IdentityMap
```

## How it works, step by step

1. `Session` is the persistence context. It owns the cart: `Map<Integer, Book> cart` — the **identity map**. It also owns the load counter, so "how often did the database run" is counted where the reads happen.
2. `find` looks in the cart **first**. A hit hands back the very same `Book` object — no load, no new object. That is the whole identity map: one row is one object per session.
3. A miss reads the "database" (`readFromDatabase`, the only stand-in SELECT), bumps `loads`, builds a `Book` with the next object number and puts it on the cart. The object number stands for `==` in real Java.
4. An unknown id returns `null` before any counting: no load, and nothing lands on the cart.
5. `clear` only empties the map. The `Book` objects live on — the session just forgot them. That is **detached**.
6. `main` prints one line per `FIND` (`book 1 -> #1 (Dune)`) and, after the loop, `loads:` — the number of real database reads.

**Test run**

```text
3
FIND 1
CLEAR
FIND 1
```

```text
book 1 -> #1 (Dune)
book 1 -> #2 (Dune)
loads: 2
```

(The second `#2`, not `#1`: after `CLEAR` the cart is empty, so the session builds a new object and reads the database again.)

| Input | Output |
|-------|--------|
| `2` / `FIND 1`, `FIND 1` | `book 1 -> #1 (Dune)` twice, `loads: 1` |
| `2` / `FIND 1`, `FIND 2` | `book 1 -> #1 (Dune)`, `book 2 -> #2 (Emma)`, `loads: 2` |
| `1` / `FIND 99` | `book 99 -> not found`, `loads: 0` |
| `2` / `FIND 99`, `FIND 3` | `book 99 -> not found`, `book 3 -> #1 (Persuasion)`, `loads: 1` |
| `2` / `CLEAR`, `CLEAR` | only `loads: 0` |
| `0` | `loads: 0` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `find` always reads the "database" | two `FIND 1` print `#1` and `#2`, `loads: 2` | Look in the cart map first; only a miss loads |
| `CLEAR` also resets the object counter | after `CLEAR` the book is `#1` again | The counter counts objects ever built; a new visit builds a new object |
| The unknown id is cached or counted | `FIND 99` twice prints `loads: 1` | Not found: no load, nothing on the cart |
| `CLEAR` prints a line | extra output in every `CLEAR` test | `CLEAR` prints nothing |
| `loads:` only printed when books were found | `FIND 99` alone prints no `loads: 0` | Print `loads:` after the loop, always |

Back to [Task 03_1](../README.md).
