# Task 92_2 · Count live neighbors

Part of [Exercise 92 · Conway's Game of Life](../README.md). New ideas you need: eight neighbours, nested loops with offsets. They are on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Start from your own `GameOfLife.java` from task 92_1 |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

For one cell, count how many of the eight surrounding cells are alive (`#`). Out-of-bounds positions are not neighbours.

## The task, simply said

1. Read the grid the same way as in task 92_1 (`rows`, `cols`, then `rows` lines).
2. Read two more integers: `row` and `col` (which cell to inspect). They are **0-based**, like Java arrays: top-left is `0 0`.
3. Count live neighbours of that cell. Do **not** count the cell itself.
4. Print exactly one line: `live neighbors: ` followed by the number (for example `live neighbors: 3`).

Still no generation rules — only counting.

## Test examples

| You type | The program says |
|----------|------------------|
| `2` `2`, lines `##` and `##`, then `0` `0` | `live neighbors: 3` |
| `1` `1`, line `#`, then `0` `0` | `live neighbors: 0` |
| `3` `3`, lines `...`, `...`, `...`, then `1` `1` | `live neighbors: 0` |

```text
Input:
2 2
##
##
0 0

Output:
live neighbors: 3
```

(From `(0,0)` the neighbours inside the grid are `(0,1)`, `(1,0)`, and `(1,1)` — all `#`.)

| Check | Expected |
|-------|----------|
| Centre of an empty 3×3 grid | `live neighbors: 0` |
| A lone `#` in 1×1 | `live neighbors: 0` |

## Little helpers

<details>
<summary>How do I visit all eight neighbours?</summary>

Two loops: `dr` from `-1` to `1`, `dc` from `-1` to `1`. If both are `0`, `continue`. Compute `r = row + dr`, `c = col + dc`. If `r` or `c` is outside the grid, skip. If `grid[r][c] == '#'`, add one.

</details>

<details>
<summary>Should I count the cell at <code>(row, col)</code>?</summary>

No. The eight tiles **around** you, not the tile you stand on.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] Your neighbour loops never read outside the array (no `ArrayIndexOutOfBoundsException`).
- [ ] You can explain your code out loud in your own words.

Next: [Task 92_3](../task-92-3-one-generation-step/README.md)