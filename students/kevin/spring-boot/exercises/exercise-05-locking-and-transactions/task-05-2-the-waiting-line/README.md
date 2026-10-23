# Task 05_2 · The waiting line

Part of [Exercise 05 · Locking and transactions](../README.md). New ideas you need: **pessimistic locking** (`SELECT ... FOR UPDATE`) and the **transaction boundary**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Same stock card as in task 05_1, `stock = 10` — but this time a clerk takes the card off the shelf. One editor at a time holds the lock; everyone else waits in a line (first in, first out). Nobody holds the lock at the start.

First line: an integer `n` — how many commands follow.

Then `n` lines, each one command:

| Command | What the program does | Output |
|---------|----------------------|--------|
| `<E> LOCK` | nobody holds the lock: E takes it | `<E> locks the row (SELECT ... FOR UPDATE)` |
| | E already holds it | nothing |
| | someone else holds it | E joins the line once: `<E> waits` |
| `<E> SET <value>` | only the holder may: writes the pending value | nothing — otherwise `<E> fails: no lock` |
| `<E> COMMIT` | only the holder may, see below | otherwise `<E> fails: no lock` |

`COMMIT` for the holder: the pending value becomes the row's value (`stock` stays as it is when no `SET` happened), the program prints `<E> commits stock=<value>`, and the lock is free. If the line is not empty, the first waiter takes the lock at once: `<W> locks the row (after waiting)`.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. One lock, one line; nobody holds the lock at the start.
2. `LOCK`: take it when it is free, wait when it is not, nothing when you already hold it.
3. `SET` and `COMMIT` are for the holder only; anyone else gets `fails: no lock`.
4. The holder's `SET` writes a pending value; the row only changes at `COMMIT`.
5. `COMMIT` prints the new stock and hands the lock to the first waiter.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `3` then `A LOCK` / `A SET 8` / `A COMMIT` | `A locks the row (SELECT ... FOR UPDATE)` and `A commits stock=8` |
| `3` then `A LOCK` / `B LOCK` / `A COMMIT` | `A locks the row (SELECT ... FOR UPDATE)`, `B waits`, `A commits stock=10` and `B locks the row (after waiting)` |
| `5` then `A LOCK` / `B LOCK` / `A COMMIT` / `B SET 7` / `B COMMIT` | the hand-over from the row above, then `B commits stock=7` |
| `3` then `B SET 5` / `B LOCK` / `B COMMIT` | `B fails: no lock`, `B locks the row (SELECT ... FOR UPDATE)` and `B commits stock=10` |
| `2` then `A COMMIT` / `A LOCK` | `A fails: no lock` and `A locks the row (SELECT ... FOR UPDATE)` |
| `0` | nothing |

## Little helpers

<details>
<summary>Where does the holder's SET go before COMMIT?</summary>

Into a pending value next to the row. The row itself changes only at `COMMIT` — that is the transaction: work on your copy, publish at the end.

</details>

<details>
<summary>B is waiting. May B SET or COMMIT meanwhile?</summary>

No. Only the holder writes and commits. A waiter who tries gets `fails: no lock` — waiting is not holding.

</details>

<details>
<summary>Who is next when the lock frees?</summary>

The first waiter — a queue (`ArrayDeque`), not a set. They become the holder without sending a new `LOCK` line.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] Only the holder writes or commits, and a freed lock goes to the first waiter.
- [ ] You can explain when pessimistic locking beats optimistic — and when it costs.

Back to [Exercise 05](../README.md).
