# Sample solution · Task 08_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac FirstAndLast.java
java FirstAndLast
```

## How it works, step by step

1. The stops go into an `ArrayList<String>`. Any `List` is a `SequencedCollection` since Java 21, so the three new methods are already there.
2. `getFirst()` and `getLast()` replace `get(0)` and `get(size() - 1)`. No index math, no off-by-one.
3. `reversed()` is a **view** of the same list in the other order. It copies nothing and leaves `stops` unchanged.
4. `String.join(" ", stops.reversed())` turns that view into one line.

**Test run**

```text
3
depot
market
harbour
```

```text
first: depot
last: harbour
reversed: harbour market depot
```

| Input | Output |
|-------|--------|
| `1` / `depot` | `first: depot` / `last: depot` / `reversed: depot` |
| `2` / `a` / `b` | `first: a` / `last: b` / `reversed: b a` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `getFirst` "cannot find symbol" | compile error | Java 21+ needed; check `java --version` |
| `Collections.reverse(stops)` | works but mutates the list | `reversed()` is a read-only view; the original stays |
| Using a `String[]` | no `getFirst` on arrays | Use a `List<String>` |

Back to [Task 08_3](../README.md).
