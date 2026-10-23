# Structured concurrency: threads as one crew (preview)

> [!PICTURE]
> A **school trip to the museum**. Every child walks off to see a different room. The teacher does not leave until every child is back on the bus. No child is forgotten, and the bus leaves as one.

## The idea

> [!WARN]
> This feature is a **preview** in Java 25 (JEP 505). You must run it with `java --enable-preview`. Learn the idea here; keep graded tasks on final APIs.

You know [virtual threads](virtual-threads.md): submit tasks, get futures, wait. The trouble starts when tasks belong together:

- One task fails — the others keep running for nothing.
- A caller waits forever on a task whose sibling already died.
- Nobody is clearly responsible for closing the group.

**Structured concurrency** makes related tasks one unit. Open a `StructuredTaskScope`, fork the work, join: every child finishes (or is cancelled) before the scope closes. Like try-with-resources, but for threads.

```java
// java --enable-preview StructuredDemo.java
import java.util.concurrent.StructuredTaskScope;

try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    var user  = scope.fork(() -> fetchUser());     // child 1
    var order = scope.fork(() -> fetchOrder());    // child 2

    scope.join().throwIfFailed();                  // wait for both

    System.out.println(user.get() + " " + order.get());
} // scope closes: no thread leaks past this line
```

- `ShutdownOnFailure`: first failure cancels the siblings. The most used policy.
- The two calls run **at the same time**, but the code reads top-to-bottom, like one task.

> [!NOTE]
> Its quiet partner, **scoped values** (JEP 506, final in Java 25), gives every thread in such a crew a safe read-only "shared notebook" — the modern replacement for thread-locals.

> [!CHECK]
> 1. One child task fails. What does `ShutdownOnFailure` do with the others?
>    <details><summary>Answer</summary>It cancels (shuts down) the sibling tasks.</details>
> 2. Why is this "structured"?
>    <details><summary>Summary</summary>Threads start and end inside one block, like variables in a method. Nothing leaks out.</details>

Back to [Concurrency](README.md).
