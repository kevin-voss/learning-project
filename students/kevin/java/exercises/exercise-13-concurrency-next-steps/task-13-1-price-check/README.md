# Task 13_1 · Price check

Part of [Exercise 13 · Concurrency next steps](../README.md). New ideas you need: **CompletableFuture**, **supplyAsync**, **thenApply**, **join**. They are all explained in the exercise page. Sheet: [CompletableFuture: a promise with a next step](../../../../../../sheets/java/concurrency/completable-futures.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

The post office compares prices at many shops at once. Every lookup is slow — the shop takes its time — and waiting for one shop after another wastes the day.

Write a Java program that reads the shops and prints every price after a voucher.

First line: an integer `n` — how many shops follow.

Then `n` lines, each: `shop cents`. The `shop` is one word. The `cents` is a whole number, `0` or more.

For **every** line, start a lookup with `CompletableFuture.supplyAsync(..., executor)` on a virtual-thread executor (`Executors.newVirtualThreadPerTaskExecutor()`). The lookup simulates the slow shop with `Thread.sleep(10)` and returns the cents. Attach `thenApply` to subtract a `100`-cent voucher, but a price never drops below `0` (use `Math.max(0, cents - 100)`).

Collect the futures in a `List` in input order. Then print one line per shop, in input order:

```text
<shop>: <cents after voucher>
```

After all shop lines, print:

```text
cheapest: <shop with the lowest price after the voucher>
```

Two shops with the same lowest price? The **first in the input** wins. With `n = 0`, print only `cheapest: (none)`.

The output must be the same on every run, no matter which lookup finishes first.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read how many shops come next.
2. For each line, start a ticket with `supplyAsync` on a virtual-thread executor; the task sleeps 10 ms and returns the cents.
3. Add `thenApply` to the ticket: voucher off, never below 0.
4. Keep every ticket in a list, in input order.
5. Join the tickets in that order and print `shop: price`.
6. Print `cheapest:` with the lowest price (tie → first in input). No shops → `cheapest: (none)`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `shop-a 250` | `shop-a: 150` and `cheapest: shop-a` |
| `1` then `tiny 50` | `tiny: 0` and `cheapest: tiny` |
| `1` then `edge 100` | `edge: 0` and `cheapest: edge` |
| `3` then `alpha 150` / `beta 150` / `gamma 300` | `alpha: 50`, `beta: 50`, `gamma: 200` and `cheapest: alpha` |
| `3` then `dear 500` / `cheap 120` / `mid 200` | `dear: 400`, `cheap: 20`, `mid: 100` and `cheapest: cheap` |
| `3` then `a 30` / `b 80` / `c 100` | `a: 0`, `b: 0`, `c: 0` and `cheapest: a` |
| `0` | `cheapest: (none)` |

## Little helpers

<details>
<summary>My lines come out in a different order every run</summary>

Print on the main thread only. Join the tickets in the order you collected them — ticket `i` belongs to shop `i`. Printing from inside the lookup races with the other lookups.

</details>

<details>
<summary>Where does the sleep go?</summary>

Inside the lookup task, in a `try`/`catch` for `InterruptedException` (a `Supplier` cannot throw a checked exception). The sleep stands for the slow call to the shop.

</details>

<details>
<summary>How do I find the cheapest?</summary>

After the lines are printed, walk the tickets in list order, `join` each, and keep the smallest price with its shop. Compare with `<` (not `<=`), so the first shop wins a tie.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] Every shop ran through `supplyAsync` + `thenApply` on a virtual-thread executor, and the lines are in input order.
- [ ] You can explain why the output is the same on every run.

Next: [Task 13_2](../task-13-2-stock-counter/README.md)
