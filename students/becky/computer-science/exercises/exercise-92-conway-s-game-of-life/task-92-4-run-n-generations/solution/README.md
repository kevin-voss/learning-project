# Sample solution · Task 92_4 🏁

## How to check

```bash
javac GameOfLife.java
java GameOfLife
```

## How it works, step by step

1. Read `rows`, `cols`, grid lines, then `generations`.
2. Loop `step` from `0` to `generations - 1`, each time `grid = nextGeneration(grid)`.
3. When `generations` is `0`, the loop never runs — print the grid you just read.
4. Print only the **final** grid.

**Blinker, 2 generations** — back to horizontal:

```text
. . .
# # #
. . .
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Printing every middle step | extra lines in output | only print after the loop |
| `generations` read before grid lines | wrong board | read all row lines, then the integer |
| Reusing one array in place inside the loop | corrupted simulation | `nextGeneration` returns a fresh array |

Back to [Task 92_4](../README.md).