# Task 92_1 · Read and print the grid

Part of [Exercise 92 · Conway's Game of Life](../README.md). New ideas you need: a living grid as `char[][]`, reading lines with `Scanner`. They are explained on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `GameOfLife.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Before any Life rules run, the program must load a starting world and show it on the screen.

## The task, simply said

1. Read two integers: `rows` and `cols` (how tall and how wide the grid is).
2. Read exactly `rows` lines of text. Each line has exactly `cols` characters. Only `#` (alive) and `.` (dead) are allowed on that line.
3. Store the grid in a `char[][]`.
4. Print the grid: one row per line, with a space after every character (same style as Connect Four).

No life rules yet — only read and print.

## Test examples

| You type | The program says |
|----------|------------------|
| `3` `3` then three lines `...`, `.#.`, `...` | `. . .` then `. # .` then `. . .` |
| `2` `2` then `##` and `..` | `# #` then `. .` |

```text
Input:
3 3
...
.#.
...

Output:
. . .
. # .
. . .
```

| Check | Expected |
|-------|----------|
| A `1`×`1` grid with `#` | one line: `# ` |
| Rows and columns match the numbers on line 1 | not a different size |
| Spaces between cells | `# .` not `#.` |

## Little helpers

<details>
<summary>After <code>nextInt()</code> the next <code>nextLine()</code> is empty</summary>

`nextInt()` does not eat the Enter key. Call `nextLine()` once to throw away that empty line before you read the first row of the grid.

</details>

<details>
<summary>How do I turn a text line into <code>grid[row][col]</code>?</summary>

`String line = in.nextLine();` then `grid[row][col] = line.charAt(col);` in an inner loop over `col`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can point at `grid[0][0]` and `grid[rows-1][cols-1]` on your printed picture.
- [ ] You can explain your code out loud in your own words.

Next: [Task 92_2](../task-92-2-count-live-neighbors/README.md)