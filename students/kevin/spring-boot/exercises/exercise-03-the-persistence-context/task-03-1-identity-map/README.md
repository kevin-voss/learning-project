# Task 03_1 · Identity map

Part of [Exercise 03 · The persistence context](../README.md). New ideas you need: **the cart (the persistence context)**, **the identity map**, **managed and detached**. They are all explained in the exercise page. Sheet: [The persistence context](../../../../../../sheets/hibernate/persistence-context.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task

Real Hibernate runs a real session against a real database. Here you build the same mechanism in plain Java: your program **is** the session, and the "database" is three rows in your code.

Rows of the fake database:

| id | title |
|----|-------|
| 1 | Dune |
| 2 | Emma |
| 3 | Persuasion |

First line: an integer `n` — how many commands follow.

Then `n` lines, each one command: `FIND <id>` or `CLEAR`.

Your session keeps three things:

1. a `Map<Integer, Book>` — the cart (this map is the **identity map**);
2. one counter that numbers every `Book` ever built — the number stands for the object identity (`==` in Java);
3. one counter of database reads.

Rules for `FIND <id>`:

- The id is on the cart: hand back that same object. No database read.
- The id is not on the cart: read the database (count one load), build a `Book` with the next object number, put it on the cart.
- An unknown id finds nothing: no load counted, nothing cached.

Print one line per `FIND`:

```text
book <id> -> #<objectNumber> (<title>)
```

An unknown id prints:

```text
book <id> -> not found
```

`CLEAR` empties the cart — the transaction ended, the old `Book` objects are detached now — and prints nothing. After all commands print:

```text
loads: <database reads>
```

Use `public static void main(String[] args)`.

## The task, simply said

1. Read how many commands come next.
2. Keep the cart (`Map<Integer, Book>`), the object counter and the load counter.
3. `FIND`: cart first. Only a miss reads the "database", builds a new `Book` and fills the cart.
4. Unknown id: print `not found` — nothing counted, nothing cached.
5. `CLEAR`: empty the cart, print nothing.
6. At the very end print `loads:` — even when it is `0`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `2` then `FIND 1` / `FIND 1` | `book 1 -> #1 (Dune)` twice and `loads: 1` |
| `2` then `FIND 1` / `FIND 2` | `book 1 -> #1 (Dune)`, `book 2 -> #2 (Emma)` and `loads: 2` |
| `3` then `FIND 1` / `CLEAR` / `FIND 1` | `book 1 -> #1 (Dune)`, `book 1 -> #2 (Dune)` and `loads: 2` |
| `1` then `FIND 99` | `book 99 -> not found` and `loads: 0` |
| `2` then `FIND 99` / `FIND 3` | `book 99 -> not found`, `book 3 -> #1 (Persuasion)` and `loads: 1` |
| `2` then `CLEAR` / `CLEAR` | only `loads: 0` |
| `0` | `loads: 0` |

## Little helpers

<details>
<summary>What does the #number mean?</summary>

It stands for the Java object identity: same number = the same object (`==` is true). In real Hibernate you could print `firstFind == secondFind` — that prints `true`.

</details>

<details>
<summary>How do I build the fake database?</summary>

A `Map<Integer, String>` with the three rows, or a small method with a `switch`. Only the load step reads it — that is where the load counter goes up.

</details>

<details>
<summary>What exactly does CLEAR delete?</summary>

Nothing. `cart.clear()` only empties the map. The `Book` objects still exist in memory — the session just forgot them. That is the detached state.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] A `FIND` on a book that is already on the cart never touches the "database" — the counter proves it.
- [ ] You can explain your code out loud in your own words.

Next: [Task 03_2](../task-03-2-the-quiet-update/README.md)
