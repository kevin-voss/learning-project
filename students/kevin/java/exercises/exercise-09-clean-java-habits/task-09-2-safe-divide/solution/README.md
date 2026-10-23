# Sample solution · Task 09_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

```bash
javac SafeDivide.java
java SafeDivide
```

## How it works, step by step

1. `divide` returns `OptionalInt.empty()` when `b == 0`.
2. Otherwise `OptionalInt.of(a / b)` — normal Java truncating division.
3. `main` turns empty into the word `undefined`.

**Test run**

```text
3
10 2
7 0
-9 4
```

```text
5
undefined
-2
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Return `0` for bad divide | Looks like a real answer | Use empty Optional |
| Catch `ArithmeticException` only | Works but hides the rule | Check `b == 0` first |

Back to [Task 09_2](../README.md).
