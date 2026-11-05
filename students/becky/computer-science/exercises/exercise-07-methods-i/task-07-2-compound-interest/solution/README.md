# Sample solution · Task 07_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

```bash
javac CompoundInterest.java
java CompoundInterest
```

(Run from this `solution/` folder.)

## How it works, step by step

1. `rate` starts at the given percent (for example 5.0).
2. Each year: multiply `capital` by `(1 + rate / 100)`, then `rate += 0.01`.
3. After `years` iterations, return `capital`.
4. `main` prints three sheet examples plus a 0-year check.

**Test run**

```text
1050.0
1102.605
538.603
End capital: 200.0
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Add 0.01 to capital | Wrong amounts | Add 0.01 to **rate** after each year |
| Use `rate / 100` with int division | Rate becomes 0 | Use `100.0` |
| Print inside the method only | Hard to reuse | **Return** the value; let `main` print |
| One combined formula | Off by one year on rate | Loop year by year like the sheet |
