# Sample solution · Task 06_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac TwinParcels.java
java TwinParcels
```

## How it works, step by step

1. `Parcel` keeps `id` and `weight`. Both are what "the same parcel" means, so both appear in `equals` **and** `hashCode`.
2. `equals(Object o)`: same object → true; not a `Parcel` → false; otherwise compare the two fields. `instanceof Parcel other` does the type check and the cast in one line.
3. `hashCode()` is `Objects.hash(id, weight)`. Equal parcels now land on the same shelf, so the set can find the twin.
4. `toString()` builds the output line, so `main` prints the parcel itself.
5. `main` adds every slip to a `LinkedHashSet<Parcel>`. The set refuses twins and keeps first-seen order. `unique` is the set size; `duplicates` is `n - size`.

**Test run**

```text
3
p1 500
p2 200
p1 500
```

```text
p1 500g
p2 200g
unique: 2
duplicates: 1
```

| Input | Output |
|-------|--------|
| `2` / `p1 500` / `p1 700` | `p1 500g` / `p1 700g` / `unique: 2` / `duplicates: 0` |
| `3` / `a 1` / `a 1` / `a 1` | `a 1g` / `unique: 1` / `duplicates: 2` |
| `0` | `unique: 0` / `duplicates: 0` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `equals` written, `hashCode` forgotten | the set keeps the twins | Override both, with the same fields |
| `hashCode` uses only `id` | works (slower), but misleading | Hash the same fields `equals` compares |
| `public boolean equals(Parcel p)` | compiles, never called by the set | The parameter must be `Object` |
| `HashSet` instead of `LinkedHashSet` | right parcels, wrong order | `LinkedHashSet` keeps insertion order |
| Comparing ids with `==` | twins survive on some inputs | Strings: `id.equals(other.id)` |

Back to [Task 06_1](../README.md).
