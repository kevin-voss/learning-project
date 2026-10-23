# Sequenced collections: first and last, made easy

> [!PICTURE]
> A **queue at a bakery**. You can talk to the first person in the line and to the last. Before Java 21, the line only let you count: "person number 0, please".

## The idea

Lists have a front and a back. For years, Java had no shared words for that: `list.get(0)` for `ArrayList`, `Deque.getFirst()` for a deque, `list.get(list.size() - 1)` everywhere.

Since **Java 21** (JEP 431), every ordered collection is a **`SequencedCollection`** with the same four moves:

| Move | Does |
|------|------|
| `getFirst()` | the first element |
| `getLast()` | the last element |
| `addFirst(x)` / `addLast(x)` | put one at the front / back |
| `reversed()` | the same elements, other way round |

```java
import java.util.ArrayList;
import java.util.List;

var guests = new ArrayList<>(List.of("ana", "ben", "cy"));

System.out.println(guests.getFirst());   // ana
System.out.println(guests.getLast());    // cy

for (String g : guests.reversed()) {
    System.out.println(g);               // cy, ben, ana
}
```

`reversed()` returns a **view**. It does not copy the list and it does not change the original.

> [!TRY]
> 1. Make a `List.of("a", "b", "c")` and print `getFirst()` and `getLast()`.
> 2. Loop over `.reversed()` and print each letter.
>
> You should see: `a`, `c`, then `c`, `b`, `a`.

> [!WARN]
> `List.of(...)` is unmodifiable, so `addFirst` throws on it. Call `getFirst`, `getLast` and `reversed` freely — adding needs a mutable list such as `new ArrayList<>(List.of(...))`.

> [!NOTE]
> `LinkedHashMap` and `LinkedHashSet` got the same treatment: `sequencedKeySet()`, `firstEntry()`, `lastEntry()` and friends.

> [!CHECK]
> 1. How do you print the last guest without knowing the size?
>    <details><summary>Answer</summary><code>guests.getLast()</code>.</details>
> 2. Does `reversed()` change the original list?
>    <details><summary>Answer</summary>No. It returns a view in the other order.</details>

**Next:** [Compact main](compact-main.md)
