# Concurrency: many things at once

> [!PICTURE]
> A **post office with many counters**. One clerk can only serve one customer at a time. More counters, more customers served — until the desks themselves run out of room.

Java runs work in **threads**. Two features matter on this path:

| Topic | Home |
|-------|------|
| Thousands of light threads (Java 21, final) | [Virtual threads](virtual-threads.md) |
| A ticket you attach "then do this" to | [CompletableFuture](completable-futures.md) |
| One map or queue shared by many threads | [Concurrent collections](concurrent-collections.md) |
| Threads that start and end as one group (preview) | [Structured concurrency](structured-concurrency.md) |

Deeper words (`synchronized`, locks, deadlocks, `volatile`) are read-only extras for now; the three sheets above cover what everyday Java 25 code uses.

Back to the [Java topic map](../README.md).

**Next:** [Virtual threads](virtual-threads.md)
