# Sample solution · Task 10_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

```bash
javac PositiveSquares.java
java PositiveSquares
```

## How it works, step by step

1. Read `n` integers into a list.
2. Stream: `filter` keeps `> 0`, `mapToInt` squares, `sum` totals.
3. Print `sum: …`. Zeros and negatives contribute nothing.

**Test run**

```text
5
3
-1
4
0
2
```

```text
sum: 29
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `>= 0` instead of `>` | zero squared into the sum | Use `> 0` |
| Square before filter | negatives become positive squares | Filter first |

Back to [Task 10_1](../README.md).
