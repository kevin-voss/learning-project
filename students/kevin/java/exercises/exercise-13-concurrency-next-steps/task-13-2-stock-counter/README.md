# Task 13_2 · Stock counter

Part of [Exercise 13 · Concurrency next steps](../README.md). New ideas you need: **ConcurrentHashMap**, **merge**, and the **race condition** of a two-step update. They are all explained in the exercise page. Sheet: [Concurrent collections: one map, many hands](../../../../../../sheets/java/concurrency/concurrent-collections.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

The post office has **one** stock board. Ten clerks update it at the same time — and every stroke must survive.

Write a Java program that reads stock movements and prints the final board.

First line: an integer `n` — how many movements follow.

Then `n` lines, each: `sku delta`. The `sku` is one word. The `delta` is a whole number and may be **negative** (goods coming in or going out). The same `sku` repeats.

Submit **every** line as its own task on a virtual-thread executor (`Executors.newVirtualThreadPerTaskExecutor()`). The task does one update on a shared `ConcurrentHashMap<String, Integer>`:

```java
stock.merge(sku, delta, Integer::sum)
```

Then close the executor — closing waits until every task has finished. Print one line per sku, in **alphabetical** order (copy the keys into a `TreeMap`, or sort them):

```text
<sku>: <total>
```

Finally:

```text
skus: <number of distinct skus>
```

With `n = 0`, print only `skus: 0`. A sku whose total is `0` is still printed.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read how many movements come next.
2. Make one shared `ConcurrentHashMap`.
3. Submit every line as its own task: one `merge` per line.
4. Close the executor; closing waits for every clerk.
5. Print every sku in alphabetical order with its total.
6. Print how many distinct skus there are.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `2` then `ink 5` / `paper 3` | `ink: 5`, `paper: 3` and `skus: 2` |
| `12` then nine `ink 1` and three `ink -1` mixed (see below) | `ink: 6` and `skus: 1` |
| `3` then `mug -5` / `mug -2` / `mug 4` | `mug: -3` and `skus: 1` |
| `2` then `box 5` / `box -5` | `box: 0` and `skus: 1` |
| `4` then `zebra 1` / `apple 2` / `mango 3` / `apple 1` | `apple: 3`, `mango: 3`, `zebra: 1` and `skus: 3` |
| `3` then `cup 0` / `cup 4` / `cup 0` | `cup: 4` and `skus: 1` |
| `0` | `skus: 0` |

The `12`-line input, exactly as the tests type it: `ink 1`, `ink 1`, `ink -1`, `ink 1`, `ink 1`, `ink -1`, `ink 1`, `ink -1`, `ink 1`, `ink 1`, `ink 1`, `ink 1`.

## Little helpers

<details>
<summary>My totals are sometimes wrong, sometimes right</summary>

That is the race condition. Update with ONE `merge` per line. Never `get` and then `put` — another task slips in between and its stroke is lost.

</details>

<details>
<summary>How do I print in alphabetical order?</summary>

After the executor closed, copy the map into a `TreeMap` (or sort the keys). Sorting happens when all clerks are done, so nothing writes while you read.

</details>

<details>
<summary>A sku lands on exactly 0</summary>

It stays in the map with total `0` and is printed like everyone else. Nothing filters it out.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] Every line went through its own task with ONE `merge`; no `get`-then-`put` anywhere.
- [ ] You can explain to a friend why two-step get-then-put loses strokes.

Back to [Exercise 13](../README.md).
