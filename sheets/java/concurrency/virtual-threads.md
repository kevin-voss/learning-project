# Virtual threads: many helpers, little weight

> [!PICTURE]
> A **post office with a thousand tiny helpers**. Old style: each helper is a heavy adult who needs a whole desk. New style: each helper is a paper slip. One adult can juggle thousands of slips. Waiting for a stamp no longer blocks a whole desk.

## The idea

A normal **platform thread** is expensive. Starting tens of thousands of them can crush the machine.

A **virtual thread** is a light thread the JVM schedules on a few real carrier threads. Waiting (I/O, sleep, a lock) parks the virtual thread without holding a heavy desk.

You need **Java 21+**. **Java 25** has virtual threads as a finished feature.

```java
try (var executor = java.util.concurrent.Executors.newVirtualThreadPerTaskExecutor()) {
  for (int i = 0; i < 1000; i++) {
    int n = i;
    executor.submit(() -> System.out.println("job " + n));
  }
} // close waits until every job finished
```

- `newVirtualThreadPerTaskExecutor()` starts one virtual thread per task.
- Closing the executor **joins** all tasks.
- Print order can mix. If order matters, collect results and sort before you print.

> [!TRY]
> 1. Run a tiny program that starts 20 virtual threads, each returning `n * n`, then print the squares from `0` to `19` in order.
> 2. Check `java --version` shows 21 or newer (25 is ideal here).
>
> You should see: twenty lines, `0` then `1` then `4` … up to `361`.

> [!WARN]
> Do not share a plain `ArrayList` from many threads without care. Prefer each task to **return** a value, then gather the futures on the main thread.

> [!CHECK]
> 1. When do you pick a virtual thread instead of a platform thread?
>    <details><summary>Answer</summary>When you have many tasks that mostly wait (network, sleep, locks), not when each task burns the CPU hard for a long time.</details>
> 2. Does `executor.close()` wait for jobs?
>    <details><summary>Answer</summary>Yes. The try-with-resources close joins the submitted tasks.</details>

**Next:** [Structured concurrency](structured-concurrency.md) (preview)
