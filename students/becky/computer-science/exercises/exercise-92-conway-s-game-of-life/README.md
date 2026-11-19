# Exercise 92 · Conway's Game of Life

| | |
|---|---|
| Student | Becky |
| Subject | Computer Science · Programming 1 |
| Language | Java |
| Created | 2026-11-19 |

## The story in one sentence

You build tiny worlds on a checkerboard: some squares are **alive**, the rest are **empty**, and simple counting rules decide who lives and who dies in the next **generation** — like ants on floor tiles that appear and vanish by their neighbours.

## The task (from the sheet)

These are the rules for this exercise sheet, written in English:

> **Conway's Game of Life**
>
> On a rectangular grid, each cell is either **alive** (`#`) or **dead** (`.`).  
> Look at the eight cells around a cell (up, down, left, right, and the four diagonals). Do **not** count the cell itself.
>
> **Life rules** (one generation = one application for every cell):
>
> 1. A **live** cell with **2 or 3** live neighbours stays alive.
> 2. A **live** cell with any other neighbour count dies (becomes empty).
> 3. A **dead** cell with **exactly 3** live neighbours becomes alive.
> 4. A **dead** cell with any other neighbour count stays dead.
>
> Cells outside the grid do not exist — they are not neighbours.

You build the game in four steps: read a grid, count neighbours for one cell, compute the **next** grid once, then run many generations.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 92_1 | [Read and print the grid](task-92-1-read-and-print-the-grid/README.md) | todo |
| 92_2 | [Count live neighbors](task-92-2-count-live-neighbors/README.md) | todo |
| 92_3 | [One generation step](task-92-3-one-generation-step/README.md) | todo |
| 92_4 | [Run N generations](task-92-4-run-n-generations/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all four tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In every task the file is called `GameOfLife.java`. Each step adds to the same program: copy your own finished file from the last task into the next `my-solution/` folder before you start.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished). See [students/README.md](../../../../README.md#cursor-commands-for-students).

---

## What you already know

| From | You know | In this exercise |
|------|----------|------------------|
| Exercise 06 | 2D arrays, row then column | The grid is `char[][]` — `#` and `.` |
| Exercise 05 | Nested `for` loops | Walk every cell; visit all eight neighbours |
| Exercise 08 | Methods | `countLiveNeighbors`, `nextGeneration`, `printGrid` |
| Exercise 04 | `Scanner` | First line: `rows cols`, then one text line per row |

More on arrays and methods: [arrays](../../../../../tracks/java/topics/arrays/index.html) · [methods](../../../../../tracks/java/topics/methods/index.html).

---

## What you will learn

### 1 · A living grid (not just numbers)

> [!PICTURE]
> Imagine bathroom floor tiles. Some tiles have a toy on them (alive). Empty tiles have nothing (dead). The whole floor is a **grid**.

A grid is a 2D array of `char`:

```java
char[][] grid = new char[3][3];
grid[1][1] = '#';   // alive in the middle
grid[0][0] = '.';   // dead in the corner
```

In task **92_1** you read how many rows and columns there are, then read each row as text, and print the grid with a space after every cell.

### 2 · Eight neighbours (not nine)

> [!PICTURE]
> Stand on one tile. Look at the eight tiles around you — not the one under your feet.

For cell `(row, col)` loop `dr` from `-1` to `1` and `dc` from `-1` to `1`. Skip `dr == 0 && dc == 0`. Only count a neighbour when `row + dr` and `col + dc` are still inside the grid, and that cell is `#`.

In task **92_2** you print one line: `live neighbors: ` and the number.

### 3 · One generation (everyone at once)

> [!PICTURE]
> Everyone looks at their neighbours at the same time, then **everyone moves** to their new state together. Nobody changes early and confuses the count.

Build a **new** grid. For each cell, count neighbours on the **old** grid, apply the four life rules, write into the new grid. Then print the new grid.

In task **92_3** you do exactly one generation.

### 4 · Many generations (time lapse)

> [!PICTURE]
> A flip-book: each page is one generation. Turn the pages and patterns dance — blinking lines, little spaceships gliding across the grid.

Read an integer `generations`. Apply `nextGeneration` that many times (on a copy each time, not on the board while you are still reading it).

In task **92_4** you print only the **final** grid.

---

## Words to know

| Word | Means |
|------|-------|
| Cell | One square on the grid; one `char` in the array |
| Alive / live | A cell with `#` on it |
| Dead | A cell with `.` on it |
| Generation | One full update: every cell follows the rules once |
| Neighbour | One of the (up to) eight cells around a cell, not the cell itself |
| Conway's Game of Life | A famous zero-player game invented by John Horton Conway (1970) |

## Source

Teacher-created exercise sheet for Becky: **Conway's Game of Life**, based on the standard Life rules above.

Back to [all exercises](../README.md).