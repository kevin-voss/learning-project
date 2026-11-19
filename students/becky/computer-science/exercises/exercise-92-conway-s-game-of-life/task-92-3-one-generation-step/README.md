# Task 92_3 · One generation step

Part of [Exercise 92 · Conway's Game of Life](../README.md). New ideas you need: the four Life rules, building a **new** grid. They are on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Start from your own file after task 92_2 |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Apply Conway's rules **once** to every cell. Print the new grid.

Rules (same as the exercise page):

| Cell now | Live neighbours | Cell next |
|----------|-----------------|-----------|
| `#` | 2 or 3 | `#` |
| `#` | anything else | `.` |
| `.` | exactly 3 | `#` |
| `.` | anything else | `.` |

## The task, simply said

1. Read the starting grid (`rows`, `cols`, then `rows` lines) — same as before.
2. Make a **second** grid for the result (do not overwrite the old one while you are still counting).
3. For every `(row, col)`, use your neighbour count on the **old** grid and set the new cell to `#` or `.` with the table above.
4. Print the **new** grid (space after every character).

## Test examples

Classic **blinker** on a 3×3 board: a horizontal line of three alive cells becomes a vertical line after one generation.

| You type | The program says |
|----------|------------------|
| `3` `3` then `...`, `###`, `...` | `. # .` then `. # .` then `. # .` |

```text
Input:
3 3
...
###
...

Output:
. # .
. # .
. # .
```

| Check | Expected |
|-------|----------|
| Empty 2×2 grid stays empty | four `.` cells |
| 2×2 block of four `#` | still four `#` (each has 3 neighbours) |

## Little helpers

<details>
<summary>Why two grids?</summary>

If you change the old grid while neighbours are still being counted, cells that already changed would confuse the counts. Count on the old copy; write into the new copy.

</details>

<details>
<summary>Live cell with exactly 3 neighbours?</summary>

It stays alive — rule 1 allows **2 or 3**.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You use a method like `nextGeneration` that returns a new `char[][]`.
- [ ] You can explain your code out loud in your own words.

Next: [Task 92_4](../task-92-4-run-n-generations/README.md)