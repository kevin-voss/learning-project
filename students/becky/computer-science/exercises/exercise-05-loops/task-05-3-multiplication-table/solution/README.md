# Sample solution · Task 05_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac TimesTable.java
```

```bash
java TimesTable
```

## How it works, step by step

1. Outer `for`: `a` from 1 to 10.
2. Inner `for`: `b` from 1 to 10. For each `a`, `b` runs all the way through.
3. `product = a * b`. Print `a x b = product`.
4. Square check: `root = (int) Math.sqrt(product)`, then `root * root == product`. If yes, print `*` before the newline.

**Test run** (first and last lines)

```text
1 x 1 = 1*
1 x 2 = 2
1 x 3 = 3
1 x 4 = 4*
1 x 5 = 5
1 x 6 = 6
1 x 7 = 7
1 x 8 = 8
1 x 9 = 9*
1 x 10 = 10
2 x 1 = 2
2 x 2 = 4*
…
10 x 8 = 80
10 x 9 = 90
10 x 10 = 100*
```

There are 100 lines in total (10 × 10).

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Star only when `a == b` | `1 x 4 = 4` has no star | Check the product, not equal factors |
| Loops `a < 10` | Table ends at 9 | Use `a <= 10` |
| Star on every line | Too many stars | Only when `root * root == product` |
| Inner and outer swapped by accident | Still 100 lines, but order feels odd | Outer = first factor in the print |

Back to [Task 05_3](../README.md).
