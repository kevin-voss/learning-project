# Sample solution · Task 92_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

From **this folder**:

```bash
javac GameOfLife.java
java GameOfLife
```

## How it works, step by step

1. `Scanner` reads `rows` and `cols`.
2. `nextLine()` once after the integers — clears the leftover newline.
3. Loop `row` from `0` to `rows - 1`, read one line, copy each `char` into `grid[row][col]`.
4. `printGrid` uses nested loops and prints each character with `" "` after it, then `println` after each row.

## Real output (test examples)

**3×3 with a dot in the middle:**

```text
. . .
. # .
. . .
```

**2×2 top alive:**

```text
# #
. .
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| No `nextLine()` after `nextInt()` | first row is empty or wrong | eat the blank line before reading the grid |
| `println` inside the inner loop | one cell per line | `println` only after the inner loop |
| No space after each cell | tests fail on `#.` | use `print(ch + " ")` |

Back to [Task 92_1](../README.md).