# Sample solution · Task 90_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac ConnectFour.java
```

```bash
java ConnectFour
```

## How it works, step by step

1. `final int ROWS = 6;` and `final int COLUMNS = 7;` — the size, written down once. Every loop asks these two boxes, so the code says *what* it means ("all rows") instead of a magic `6`.
2. `char[][] board = new char[ROWS][COLUMNS];` — the egg carton: 6 rows, 7 holes in each. Rows first, columns second.
3. **Filling:** a loop over the rows, and inside it a loop over the columns. `board[row][column] = '.';` runs 6 × 7 = 42 times, once for every hole. Why fill at all? A new `char` array is full of invisible "nothing" signs, not dots. You must put the dots in yourself.
4. **Printing:** the same two loops. `print(board[row][column] + " ")` puts one sign and a space and **stays on the line**. After the inner loop one row is complete, so `println()` starts the next line. That is why the `println()` sits *between* the two closing `}`.
5. **Column numbers:** one more loop over the columns. Java's `column` is 0 to 6, players want 1 to 7, so we print `(column + 1)`. The brackets matter: without them, `column + 1 + " "` still works, but `"" + column + 1` would print `01`, `11`, `21` … because text + number glues.
6. Each sign and each number is "one character + one space", so the numbers stand exactly under their columns.

Why loops and not 6 × `println(". . . . . . .")`? Because in 90_2 the holes will hold `R` and `B`. Then you must print what is **in** the array, hole by hole, and only loops can do that.

**Test run**

```text
$ java ConnectFour
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
1 2 3 4 5 6 7 
```

6 lines of 7 dots, numbers 1 to 7 below: ✅

**Border check:** the same file with `ROWS = 4` (and nothing else changed):

```text
$ java ConnectFour
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
1 2 3 4 5 6 7 
```

4 lines: the loops really use `ROWS`. ✅

(Every line ends with one invisible space after the last sign. That is fine: you cannot see it, and it keeps the code simple.)

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `new char[7][6]` | 7 lines of 6 dots | Rows first: `new char[ROWS][COLUMNS]` |
| `row <= ROWS` in the loop | `ArrayIndexOutOfBoundsException: Index 6 out of bounds for length 6` | Stop **before** the size: `row < ROWS` |
| `println` inside the inner loop | 42 lines with one dot each | `print` in the inner loop, `println()` after it |
| No `println()` after a row | One long line of 42 dots | `println()` between the two closing `}` |
| Forgot to fill the board | Strange empty-looking signs instead of dots | Fill every hole with `'.'` first |
| `column` instead of `column + 1` | `0 1 2 3 4 5 6` | Players count from 1: print `(column + 1)` |

Back to [Task 90_1](../README.md).
