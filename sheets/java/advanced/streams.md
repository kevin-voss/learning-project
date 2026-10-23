# Streams: a conveyor for lists

> [!PICTURE]
> A **post office sorting belt**. Parcels roll by. You keep the heavy ones, stamp each, then count them. You do not hand-edit the whole pile in place — you describe the steps on the belt.

## The idea

A **stream** is a pipeline over a sequence: source → zero or more steps → a result.

```java
var nums = List.of(3, -1, 4, 0, 2);

int sum = nums.stream()
    .filter(n -> n > 0)      // keep positives
    .mapToInt(n -> n * n)    // square
    .sum();                  // 3²+4²+2² = 29
```

Common steps:

| Step | Job |
|------|-----|
| `filter` | keep some items |
| `map` | turn each item into something else |
| `sorted` | order them |
| `distinct` | drop duplicates |
| `toList()` | collect into a list (unmodifiable) |
| `sum` / `count` / `reduce` | one answer from many |

Streams do not replace every loop. They shine when you **transform a collection** in a short pipeline.

> [!TRY]
> 1. From `List.of("Berlin", "oslo", "Berlin", "Rome")`, build a stream: lowercase, distinct, sorted, `toList()`.
> 2. Print the list.
>
> You should see: `[berlin, oslo, rome]` (order may be berlin, oslo, rome).

> [!WARN]
> A stream is used **once**. After `sum()` or `toList()`, that stream is spent. Call `.stream()` again on the list if you need another pass.

> [!CHECK]
> 1. What does `filter` do?
>    <details><summary>Answer</summary>It keeps only items that pass the test.</details>
> 2. Does `list.stream().toList()` change the original list?
>    <details><summary>Answer</summary>No. It builds a new list from the pipeline.</details>

**Next:** back to the [advanced map](README.md)
