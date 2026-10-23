# Task 08_2 · Busy post office

Part of [Exercise 08 · Modern Java 25](../README.md). New idea: **virtual threads**. Sheet: [Virtual threads](../../../../../../sheets/java/concurrency/virtual-threads.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

The post office must stamp `n` parcels at once. Each parcel `i` (from `0` to `n - 1`) has stamp cost `i * i`.

Write a Java program that:

1. Reads one integer `n` (`n >= 0`).
2. Starts **one virtual thread per parcel** (use `Executors.newVirtualThreadPerTaskExecutor()` or `Thread.ofVirtual()`).
3. Each task returns the stamp cost for its index.
4. After every task finished, print exactly two lines:

```text
workers: <n>
sum: <total of all stamp costs>
```

The sum is `0*0 + 1*1 + … + (n-1)*(n-1)`.

Do **not** print from inside the workers in a way that races. Collect results, then print on the main thread so the two lines are stable.

Use `public static void main(String[] args)`. Java 25.

## The task, simply said

1. Read `n`.
2. Open a virtual-thread executor.
3. Submit `n` jobs; job `i` returns `i * i`.
4. Close / join so every job is done.
5. Add the results.
6. Print `workers:` and `sum:`.

## Test examples

| You type | The program says |
|----------|------------------|
| `0` | `workers: 0` and `sum: 0` |
| `1` | `workers: 1` and `sum: 0` |
| `2` | `workers: 2` and `sum: 1` |
| `3` | `workers: 3` and `sum: 5` |
| `5` | `workers: 5` and `sum: 30` |
| `10` | `workers: 10` and `sum: 285` |

## Little helpers

<details>
<summary>My sum is right but workers print in a weird order</summary>

Print only after all futures are collected. Do not `System.out.println` inside each virtual thread for the graded output.

</details>

<details>
<summary>How do I wait for every job?</summary>

`try (var exec = Executors.newVirtualThreadPerTaskExecutor()) { … }` — closing the executor waits. Or call `get()` on every `Future`.

</details>

<details>
<summary>n is 0</summary>

Submit nothing. Sum is 0. Still print both lines.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You really used virtual threads (not a plain `for` on the main thread only).
- [ ] You can explain why the two output lines are printed on the main thread.

Next: [Task 08_3](../task-08-3-first-and-last/README.md)
