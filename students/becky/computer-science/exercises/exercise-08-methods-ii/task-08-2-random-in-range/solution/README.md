# Sample solution · Task 08_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

```bash
javac RandomInRange.java
java RandomInRange
```

## How it works, step by step

1. **`randomInRange`** — `(int)(Math.random() * (b - a + 1)) + a` so **b** is possible.
2. **`main`** prints two **border** checks (5..5 and 10..10), then 100 lines between 5 and 10.
3. A counter confirms all 100 stayed in range — `all in range: true`.

**Test run (first lines only; the 100 middle lines change every run)**

```text
low only: 5
high only: 10
…
all in range: true
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `* (b - a)` without `+ 1` | Never see 10 in 5..10 | Use `(b - a + 1)` |
| Cast after adding `a` | Wrong spread | Cast the product **before** adding `a` |
| `Random` class not asked | Compiles but off brief | Sheet asks for `Math.random()` |
