# Sample solution · Task 92_3 🏁

## How to check

```bash
javac GameOfLife.java
java GameOfLife
```

## How it works, step by step

1. Read the start grid.
2. `nextGeneration` makes a new `char[][]`.
3. For every cell, count neighbours on the **old** grid, apply the four Life rules, write into the new grid.
4. Print the new grid only.

**Blinker** (`...` / `###` / `...`) → after one step:

```text
. # .
. # .
. # .
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Updating the old grid in place | wrong pattern, strange growth | write into a **new** grid |
| Dead cell with 2 neighbours becomes alive | extra `#` | only **3** neighbours birth a cell |
| Live cell with 3 neighbours dies | blinker breaks | live + 3 neighbours **stays** alive |

Back to [Task 92_3](../README.md).