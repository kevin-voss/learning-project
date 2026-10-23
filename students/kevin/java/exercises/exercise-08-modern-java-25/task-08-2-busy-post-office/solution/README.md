# Sample solution · Task 08_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac BusyPostOffice.java
```

```bash
java BusyPostOffice
```

## How it works, step by step

1. Read `n`.
2. Open `Executors.newVirtualThreadPerTaskExecutor()` — each submitted job gets a **virtual thread**.
3. Capture `index` in a final-style local (`int index = i`) so the lambda may use it.
4. Each job returns `(long) index * index`. No printing inside the job: that would race.
5. `future.get()` waits for that job. Add into `sum`.
6. Leaving the `try` closes the executor (joins remaining work).
7. Print the two stable lines on the main thread.

**Test run**

```text
5
```

```text
workers: 5
sum: 30
```

(`0+1+4+9+16 = 30`)

| n | workers | sum |
|---|---------|-----|
| 0 | 0 | 0 |
| 1 | 1 | 0 |
| 3 | 3 | 5 |
| 10 | 10 | 285 |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Print inside each worker | lines in random order | Collect, then print once |
| Reuse `i` directly in the lambda | compile error | `int index = i;` then use `index` |
| Platform `new Thread` only | works but misses the lesson | Use `newVirtualThreadPerTaskExecutor()` |

Back to [Task 08_2](../README.md).
