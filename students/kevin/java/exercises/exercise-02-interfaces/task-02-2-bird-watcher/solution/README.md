# Sample solution · Task 02_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac BirdWatcher.java
java BirdWatcher
```

## How it works, step by step

1. `Bird implements Comparable<Bird>`: the class promises Java "I can say who comes first between me and another bird".
2. `compareTo` does the whole rule. `Integer.compare` on the wingspans; only when that is `0` does `name.compareTo` break the tie. Both return the negative / zero / positive numbers Java expects.
3. `main` fills a `Bird[]`, calls `Arrays.sort(birds)` and never writes a sorting loop. `Arrays.sort` calls your `compareTo` for every comparison.
4. After the sort, `birds[0]` is the smallest and `birds[birds.length - 1]` the largest.

**Test run**

```text
3
owl 100
wren 15
gull 120
```

```text
wren: 15 cm
owl: 100 cm
gull: 120 cm
smallest: wren
largest: gull
```

| Input | Output |
|-------|--------|
| `2` / `robin 25` / `finch 25` | `finch: 25 cm` / `robin: 25 cm` / `smallest: finch` / `largest: robin` |
| `1` / `kiwi 40` | `kiwi: 40 cm` / `smallest: kiwi` / `largest: kiwi` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `implements Comparable` without `<Bird>` | `compareTo(Object)` and casts everywhere | Write `Comparable<Bird>` and `compareTo(Bird other)` |
| `return this.wingspan - other.wingspan` | fine here, but overflows for huge values | Prefer `Integer.compare(a, b)` |
| Ties left to chance | `robin` before `finch` in some runs | Compare names when wingspans are equal |
| `compareTo` not `public` | "weaker access privileges" | Interface methods are public |

Back to [Task 02_2](../README.md).
