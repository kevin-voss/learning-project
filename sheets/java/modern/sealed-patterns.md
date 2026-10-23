# Sealed types and pattern matching

> [!PICTURE]
> A **post office stamp menu**. Only three stamps exist: small, large, fragile. The machine knows every kind. When a parcel arrives, it looks at the stamp and picks the right action — no mystery fourth stamp.

## The idea

A **sealed** type says: "only these child types are allowed." The compiler knows the full list.

**Pattern matching** in a `switch` unpacks the child and its fields in one step. No long chain of `instanceof` and casts.

You need **Java 21+** for the style below. **Java 25** includes it.

```java
sealed interface Event permits Created, Shipped, Delivered {}

record Created(String id) implements Event {}
record Shipped(String id, String vehicle) implements Event {}
record Delivered(String id) implements Event {}

String label(Event e) {
  return switch (e) {
    case Created(String id) -> "new " + id;
    case Shipped(String id, String vehicle) -> id + " on " + vehicle;
    case Delivered(String id) -> id + " arrived";
  };
}
```

- `permits` lists every allowed shape.
- Each `case` names a record and pulls out its components.
- No `default` is needed when every permitted type has a case.

> [!TRY]
> 1. Read [Records](records.md) if `record` is new.
> 2. In a scratch file, build the three records above and print `label(new Shipped("mail-1", "bike-3"))`.
>
> You should see: `mail-1 on bike-3`.

> [!NOTE]
> Compact source files and a short `void main()` also arrived in Java 25. For graded tasks in this repo, keep `public static void main(String[] args)` so the test runner finds your program.

> [!CHECK]
> 1. Why can the `switch` skip `default`?
>    <details><summary>Answer</summary>The type is sealed. The compiler knows Created, Shipped and Delivered are the only shapes.</details>
> 2. What does `case Shipped(String id, String vehicle)` do?
>    <details><summary>Answer</summary>It matches a Shipped event and names its two fields for the arrow body.</details>

**Next:** [Virtual threads](../concurrency/virtual-threads.md)
