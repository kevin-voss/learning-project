# Concurrent collections: one map, many hands

> [!PICTURE]
> A **tally board in a busy warehouse**. Ten workers add strokes to the same board. With a plain board two workers write at once and one stroke is lost. A board with a lock per row lets everyone write — and no stroke disappears.

## The idea

`HashMap` and `ArrayList` are **not** safe when several threads change them at once. Updates get lost, or the structure breaks.

`java.util.concurrent` has collections built for many hands:

| Need | Use |
|------|-----|
| a shared map | `ConcurrentHashMap` |
| a counter | `AtomicInteger` / `AtomicLong` (or `LongAdder`) |
| a hand-over queue between threads | `BlockingQueue` (`ArrayBlockingQueue`, `LinkedBlockingQueue`) |
| a shared list, mostly read | `CopyOnWriteArrayList` |

The trick is **one atomic call** per update. Read-then-write in two steps (`get`, then `put`) can still lose updates, even on a concurrent map.

```java
import java.util.concurrent.ConcurrentHashMap;

var stock = new ConcurrentHashMap<String, Integer>();

// one call, safe: current value + delta, or delta when absent
stock.merge("ink", 5, Integer::sum);
stock.merge("ink", -2, Integer::sum);     // 3

// wrong under threads: two steps, another thread can slip in between
// stock.put("ink", stock.get("ink") + 5);
```

Hand-over with a queue — the producer waits when the queue is full, the consumer waits when it is empty:

```java
var queue = new java.util.concurrent.ArrayBlockingQueue<String>(10);
queue.put("parcel-1");       // producer thread
String next = queue.take();  // consumer thread
```

> [!TRY]
> 1. Start 100 virtual threads that each call `stock.merge("ink", 1, Integer::sum)`. Close the executor, print `stock.get("ink")`.
>
> You should see: `100` — every time.

> [!WARN]
> `synchronized` and `ReentrantLock` protect a block of code; concurrent collections protect **one call**. Mixing both around the same data is a common source of deadlocks. Pick one.

> [!CHECK]
> 1. Why is `map.put(k, map.get(k) + 1)` unsafe even on a `ConcurrentHashMap`?
>    <details><summary>Answer</summary>It is two calls. Another thread can update between the <code>get</code> and the <code>put</code>. Use <code>merge</code> or <code>compute</code>.</details>
> 2. Which type is a conveyor belt between a producer and a consumer thread?
>    <details><summary>Answer</summary>A <code>BlockingQueue</code>.</details>

Back to [Concurrency](README.md).
