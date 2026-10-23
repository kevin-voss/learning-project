# CompletableFuture: a promise with a next step

> [!PICTURE]
> A **dry cleaner's ticket**. You hand in the coat and get a ticket. You can say now "when it is ready, fold it and put it in a bag" — and go. Later you show the ticket and collect the bag.

## The idea

A `Future` from an executor is the ticket: you wait with `get()`. A **`CompletableFuture`** is a ticket you can attach **next steps** to, so the pipeline runs on its own and you only wait at the end.

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Executors;

try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
    CompletableFuture<Integer> price =
        CompletableFuture.supplyAsync(() -> fetchPriceCents("shop-a"), exec)  // start
                         .thenApply(cents -> cents - 100);                      // next step

    System.out.println(price.join());   // wait here, once
}
```

| Call | Means |
|------|-------|
| `supplyAsync(task, exec)` | run `task` on the executor, return the ticket |
| `thenApply(f)` | when ready, transform the value |
| `thenAccept(c)` | when ready, do something, no new value |
| `join()` | wait and get the value (no checked exception, unlike `get()`) |
| `allOf(f1, f2, …)` | one ticket that is ready when all are |
| `exceptionally(e -> fallback)` | what to use if the task failed |

Many tickets at once, results in **your** order:

```java
List<CompletableFuture<Integer>> tickets = shops.stream()
    .map(s -> CompletableFuture.supplyAsync(() -> fetchPriceCents(s), exec))
    .toList();

CompletableFuture.allOf(tickets.toArray(new CompletableFuture[0])).join();

for (var t : tickets) System.out.println(t.join());   // same order as shops
```

> [!TRY]
> 1. Make two `supplyAsync` tickets that return `21` and `21`, add `thenApply(n -> n * 2)` to each, print both `join()` results.
>
> You should see: `42` and `42`.

> [!WARN]
> Virtual threads make plain blocking code cheap again. Reach for `CompletableFuture` when you need **composition** (then-this, then-that, all-of), not only to run things in parallel.

> [!CHECK]
> 1. Which call blocks?
>    <details><summary>Answer</summary><code>join()</code> (and <code>get()</code>). <code>thenApply</code> does not.</details>
> 2. Why collect the tickets in a list before joining?
>    <details><summary>Answer</summary>So all tasks start first and run at the same time; joining one by one in the loop still keeps your order.</details>

**Next:** [Concurrent collections](concurrent-collections.md)
