# Sample solution · Task 05_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac WaitingLine.java
java WaitingLine
```

## How it works, step by step

1. Four pieces of state: the committed `stock`, the holder's `pending` value, `holder` (who took the card off the shelf — nobody at the start), and a FIFO `line` of waiters. The queue stands for the database's lock queue behind `SELECT ... FOR UPDATE`.
2. `LOCK` when free: the editor becomes the holder, `pending` starts at the current stock, and the locking-SELECT line prints. When someone else holds it, the editor joins the line once and prints `waits` (the `line.contains` check keeps a clerk from queuing twice). Holding it already changes nothing.
3. `SET`: only the holder writes, and only onto `pending`. Anyone else — waiter included — gets `fails: no lock`: waiting is not holding.
4. `COMMIT`: only the holder. The pending value becomes the row's value in one move (that is the transaction boundary — work on a copy, publish at the end), the commit line prints, and the lock is free. No `SET` ever happened? Then `pending` still equals `stock` and the commit publishes an unchanged row.
5. The hand-over: if the line is not empty, the first waiter steps out and becomes the holder at once — `locks the row (after waiting)` — with a fresh `pending`. That is the clerk waiting at the shelf, taking the card the moment it lands back.

**Test run**

```text
5
A LOCK
B LOCK
A COMMIT
B SET 7
B COMMIT
```

```text
A locks the row (SELECT ... FOR UPDATE)
B waits
A commits stock=10
B locks the row (after waiting)
B commits stock=7
```

(A never `SET` anything, so its commit publishes the unchanged `stock=10`. The lock then jumps to B without a new `LOCK` line.)

| Input | Output |
|-------|--------|
| `3` / `A LOCK`, `A SET 8`, `A COMMIT` | `A locks the row (SELECT ... FOR UPDATE)`, `A commits stock=8` |
| `3` / `A LOCK`, `B LOCK`, `A COMMIT` | `A locks the row (SELECT ... FOR UPDATE)`, `B waits`, `A commits stock=10`, `B locks the row (after waiting)` |
| `3` / `B SET 5`, `B LOCK`, `B COMMIT` | `B fails: no lock`, `B locks the row (SELECT ... FOR UPDATE)`, `B commits stock=10` |
| `2` / `A COMMIT`, `A LOCK` | `A fails: no lock`, `A locks the row (SELECT ... FOR UPDATE)` |
| `0` | (nothing) |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `SET` writing into `stock` directly | other editors see the half-done change before `COMMIT` | Write to `pending`; publish only at `COMMIT` |
| Letting a waiter `SET` or `COMMIT` | B's queued write sneaks past A | Check `editor.equals(holder)` first; everyone else fails |
| Handing the lock to a random waiter | the line is not fair any more | Use a queue (`ArrayDeque`): first in, first out |
| Forgetting to reset `pending` at the hand-over | B "commits" A's unpublished value | `pending = stock` whenever a new holder takes the lock |
| `COMMIT` without a lock crashes on a null check | the program dies instead of printing | Compare names safely and print `fails: no lock` |

Back to [Task 05_2](../README.md).
