# Sample solution · Task 06_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac RecordShortcut.java
java RecordShortcut
```

## How it works, step by step

1. `record Parcel(String id, int weight) {}` — one line. Java generates the constructor, `id()`, `weight()`, `equals`, `hashCode` and `toString` from those two components.
2. The `LinkedHashSet<Parcel>` works exactly as in task 06_1, because the generated `equals` and `hashCode` compare both components.
3. The output line is built from the accessors: `p.id() + " " + p.weight() + "g"`. The record's own `toString` would print `Parcel[id=p1, weight=500]`.
4. Compare the file with `TwinParcels.java`: three methods gone, same behaviour. That is what records are for — data whose identity **is** its fields.

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
| `0` | `unique: 0` / `duplicates: 0` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `System.out.println(p)` | `Parcel[id=p1, weight=500]` | Build the line from `p.id()` and `p.weight()` |
| `p.id` without parentheses | "id has private access" | Components are read through methods: `p.id()` |
| Writing `equals` anyway | works, but the point is lost | Delete it; the record already has it |

Back to [Task 06_2](../README.md).
