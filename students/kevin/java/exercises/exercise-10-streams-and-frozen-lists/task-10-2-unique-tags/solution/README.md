# Sample solution · Task 10_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

```bash
javac UniqueTags.java
java UniqueTags
```

## How it works, step by step

1. Read raw tags into a list.
2. Stream: lowercase → `distinct` → `sorted` → `toList()` (frozen).
3. Print one tag per line. Lowercase before distinct so `Berlin` and `berlin` collapse.

**Test run**

```text
5
Berlin
oslo
Berlin
Rome
oslo
```

```text
berlin
oslo
rome
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Distinct before lowercase | two lines for Berlin/berlin | Lowercase first |
| Mutable list you keep editing | harder to reason about | Prefer `toList()` |

Back to [Task 10_2](../README.md).
