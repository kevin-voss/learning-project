# Sample solution · Task 90_2 🏁

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

1. **Constants at the top.** `ROWS`, `COLUMNS` and `EMPTY` sit outside `main`, so `dropPiece`, `createBoard` and `printBoard` can all see them.
2. **The 90_1 code became two methods.** `createBoard()` builds and fills the carton and *gives it back* (`char[][]` is its out-type). `printBoard(board)` only prints, it gives nothing back (`void`). `main` now reads like a story: create, drop, print.
3. **`dropPiece(board, column, piece)`** takes three things in: which board, which column (0 to 6), which piece. It gives one `int` back: the row.
4. **Counting backwards:** `for (int row = ROWS - 1; row >= 0; row--)` visits rows 5, 4, 3, 2, 1, 0: from the bottom up, exactly the way a piece falls.
5. **First empty hole wins:** `if (board[row][column] == EMPTY)` → put the piece there and `return row;`. The `return` stops the loop and the method at once, so the piece lands in **one** hole only, the lowest free one.
6. **Nothing found:** when the loop runs out, every hole was taken. `return -1;` says "full". Not `0`, because `0` is a real row (the top one).
7. **Players vs. Java:** `main` keeps the drops as players say them (`4` = the middle column) and calls `dropPiece(board, column - 1, piece)`. The translation happens in one place only.
8. **Taking turns:** `i % 2 == 1` is true for drop 1, 3, 5 … (Java counts the drops from 0), so every second piece is `'B'`.

Why does the method change the board even though it only *returns* a row? An array is not copied when you hand it to a method. `dropPiece` gets the **same** egg carton that `main` holds, so a piece put in there is in `main`'s board too.

**Test run**

```text
$ java ConnectFour
R into column 4: lands in row 5
B into column 4: lands in row 4
R into column 4: lands in row 3
B into column 4: lands in row 2
R into column 4: lands in row 1
B into column 4: lands in row 0
R into column 4: full, -1
B into column 1: lands in row 5
R into column 7: lands in row 5
B into column 1: lands in row 4

. . . B . . . 
. . . R . . . 
. . . B . . . 
. . . R . . . 
B . . B . . . 
B . . R . . R 
1 2 3 4 5 6 7 
```

Compare with the [test table](../README.md#test-examples): rows 5, 4, 3, 2, 1, 0, then `-1` for the 7th piece in column 4, and the edges (columns 1 and 7) work. ✅

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Loop from top to bottom (`row = 0; row < ROWS; row++`) | Pieces stick to the **top** | Start at `ROWS - 1`, count down with `row--` |
| `row > 0` instead of `row >= 0` | Column holds only 5 pieces, 6th gives `-1` | The top row is 0, it must be checked too |
| No `return` after placing | One drop fills the **whole** column | `return row;` right after `board[row][column] = piece;` |
| `return -1;` inside the loop | Every drop says `-1`, or only the bottom hole works | Put it **after** the loop |
| `dropPiece(board, column, piece)` with the players' number | Pieces land one column too far right; column 7 crashes | Players say 1 to 7, Java needs `column - 1` |
| Constants inside `main` | `cannot find symbol ROWS` in `dropPiece` | Move them to the top of the class as `static final` |

Back to [Task 90_2](../README.md).
