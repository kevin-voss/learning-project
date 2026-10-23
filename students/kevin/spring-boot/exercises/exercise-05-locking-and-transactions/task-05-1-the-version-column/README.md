# Task 05_1 · The version column

Part of [Exercise 05 · Locking and transactions](../README.md). New ideas you need: the **lost update** and **optimistic locking** (the version stamp). They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

One stock card lives inside the program: `stock = 10`, `version = 1`. Two editors, `A` and `B`, work on it. Each editor holds a local copy: the value they want to write, plus the version they read the card at — or nothing at all before their first read.

The program reads a script of their turns and prints what happens.

First line: an integer `n` — how many commands follow.

Then `n` lines, each one command:

| Command | What the program does | Output |
|---------|----------------------|--------|
| `<E> READ` | copies the card into the editor's local copy | `<E> reads stock=<value> version=<version>` |
| `<E> SET <value>` | changes only the editor's local copy | nothing — unless they never read: `<E> fails: nothing read` |
| `<E> COMMIT` | offers the copy to the card | the three cases below |

`COMMIT` is the whole idea:

1. The editor read nothing → `<E> fails: nothing read`.
2. The editor's version equals the card's version → nobody wrote in between. The value is written, the card's version goes up by one: `<E> commits stock=<value> version=<newVersion>`. The editor's copy is cleared — they must `READ` again before their next commit.
3. The versions differ → someone wrote in between: `<E> fails: version <editorVersion> is stale, row is at <rowVersion>`. This is the `OptimisticLockException`. The copy stays; the editor must `READ` again.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. The card starts at stock 10, version 1.
2. `READ` copies the value and the version into the editor's hand.
3. `SET` changes only that copy, never the card.
4. `COMMIT` with equal versions: write the value, version + 1, clear the copy.
5. `COMMIT` with different versions: the stale line, and the copy stays.
6. Anything without a read first: `fails: nothing read`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `3` then `A READ` / `A SET 8` / `A COMMIT` | `A reads stock=10 version=1` and `A commits stock=8 version=2` |
| `6` then `A READ` / `B READ` / `A SET 8` / `B SET 9` / `A COMMIT` / `B COMMIT` | `A reads stock=10 version=1`, `B reads stock=10 version=1`, `A commits stock=8 version=2` and `B fails: version 1 is stale, row is at 2` |
| `8` then `A READ` / `B READ` / `A SET 8` / `A COMMIT` / `B COMMIT` / `B READ` / `B SET 9` / `B COMMIT` | the stale line again, then `B reads stock=8 version=2` and `B commits stock=9 version=3` |
| `2` then `A COMMIT` / `A READ` | `A fails: nothing read` and `A reads stock=10 version=1` |
| `1` then `B SET 5` | `B fails: nothing read` |
| `0` | nothing |

## Little helpers

<details>
<summary>How do I keep the two editors apart?</summary>

A small map `name -> editor` with `A` and `B` in it, or two variables. Each editor holds their value and the version they read. Use `Integer` (or a `boolean hasRead`) so "read nothing yet" can be `null` / `false`.

</details>

<details>
<summary>SET prints nothing — where does the "nothing read" line come from?</summary>

`SET` needs a copy to change. When the editor has no copy, the command fails loudly — that is the failure line, and `COMMIT` answers the same way.

</details>

<details>
<summary>B failed with "stale". What is in B's hands now?</summary>

The old copy with the old version. Another `COMMIT` fails the same way, until `READ` copies the card again — in real life the 409 tells the client: reload and retry.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `COMMIT` compares versions, writes and bumps on success, and changes nothing on failure.
- [ ] You can explain why B must `READ` again after the stale line.

Next: [Task 05_2](../task-05-2-the-waiting-line/README.md)
