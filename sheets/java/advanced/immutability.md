# Immutability: data that stays put

> [!PICTURE]
> A **museum exhibit**. You look. You do not move the statue. If you need a different arrangement, you build a new display — you do not secretly slide the old one.

## The idea

**Immutable** data does not change after you create it. Records already freeze their components. Lists can be frozen too.

Why care? Shared data in threads, clearer reasoning, fewer “who changed this?” bugs. Virtual threads make “many readers” common — immutable values are safer to share.

```java
record Tag(String name) {}

var tags = List.of("urgent", "berlin");          // unmodifiable
var copy = List.copyOf(new ArrayList<>(tags)); // freeze a mutable list

// tags.add("x");  // throws UnsupportedOperationException
```

Build a new value instead of editing:

```java
record Parcel(String id, List<String> tags) {
  Parcel {
    tags = List.copyOf(tags);   // defensive: store a frozen copy
  }
}
```

> [!TRY]
> 1. Create `List.of(1, 2, 3)` and try `.add(4)` inside a `try/catch`.
> 2. Print the exception’s simple name.
>
> You should see: `UnsupportedOperationException`.

> [!NOTE]
> `List.of` and `List.copyOf` reject `null` elements. That is a feature: no silent nulls in the list.

> [!WARN]
> Three lists that look alike but are not: `List.of(...)` is **frozen** (no `add`, no `set`); `Arrays.asList(...)` is **fixed-size** (no `add`, but `set` works and writes through to the array); `new ArrayList<>(...)` is fully **mutable**. Pick on purpose.

> [!CHECK]
> 1. Can you change a record component after `new`?
>    <details><summary>Answer</summary>No. Make a new record with the new values.</details>
> 2. Why freeze a list inside a record?
>    <details><summary>Answer</summary>So a caller who still holds the original mutable list cannot change what the record stores.</details>

**Next:** [Streams](streams.md)
