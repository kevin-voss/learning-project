# Sample solution · Task 92_2 🏁

## How to check

```bash
javac GameOfLife.java
java GameOfLife
```

## How it works, step by step

1. Read the grid like task 92_1.
2. Read `row` and `col` with `nextInt()` — no extra `nextLine()` needed after them.
3. `countLiveNeighbors` walks `dr` and `dc` from `-1` to `1`, skips `(0,0)`, checks bounds, counts `#`.
4. Print `live neighbors: ` and the number.

The corner of a 2×2 block of `#` has three in-bounds neighbours (not eight).

## Real output

```text
live neighbors: 3
live neighbors: 0
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Counting the cell itself | count too high | skip when `dr == 0 && dc == 0` |
| Reading outside the array | red `ArrayIndexOutOfBoundsException` | check `r` and `c` before `grid[r][c]` |
| Counting `.` as live | count too high | only add when `== '#'` |

Back to [Task 92_2](../README.md).