# Task 92_4 · Run N generations

Part of [Exercise 92 · Conway's Game of Life](../README.md). New idea: repeat one generation many times. The exercise page explains it.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Start from your own file after task 92_3 |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Read a starting world and how many generations to run. Apply the Life rules that many times. Print **only the final** grid.

## The task, simply said

1. Read `rows` and `cols`.
2. Read the `rows` grid lines (`#` and `.`).
3. Read one integer: `generations` (how many times to apply the rules). It can be `0`.
4. If `generations` is `0`, print the starting grid unchanged.
5. If `generations` is positive, call `nextGeneration` that many times and print the result.

Do not print the in-between grids — only the last one.

## Test examples

| You type | The program says |
|----------|------------------|
| `3` `3`, `...` / `###` / `...`, then `1` | Vertical blinker (same as task 92_3) |
| Same starting grid, then `2` | Horizontal line again: `...` / `###` / `...` |
| `2` `2`, `##` / `..`, then `0` | Starting grid unchanged |

```text
Input:
3 3
...
###
...
2

Output:
. . .
# # #
. . .
```

| Check | Expected |
|-------|----------|
| `generations` is `0` | output matches input |
| Blinker after `2` generations | back to horizontal |

## Little helpers

<details>
<summary><code>generations</code> is <code>0</code></summary>

The loop runs zero times. Print the grid you already read.

</details>

<details>
<summary>Do I need a third grid in the loop?</summary>

Each step: `grid = nextGeneration(grid);` — the method returns a new array, so the variable always points at the latest generation.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `0` generations does not change the board.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 92](../README.md)