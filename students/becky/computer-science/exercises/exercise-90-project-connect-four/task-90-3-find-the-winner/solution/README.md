# Sample solution · Task 90_3 🏁

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

`hasFour` searches the board four times, once per direction. Each search has the same shape: two loops pick a **start hole**, and one `if` with four `&&` asks "are this hole and the next three all `piece`?".

1. **Across.** A four in a row of 7 can start in column 0, 1, 2 or 3. Started in column 4 it would need column 7, which does not exist. So the column loop runs `column <= COLUMNS - 4` (that is `<= 3`). The four holes are `[row][column]`, `[row][column + 1]`, `[row][column + 2]`, `[row][column + 3]`.
2. **Up and down.** Same idea turned on its side: the four go **down** from the start hole, so the **row** grows: `[row + 1][column]` and so on. A column has 6 holes, so a four can start in row 0, 1 or 2: `row <= ROWS - 4`.
3. **Slanted `\`.** Each step goes one row down **and** one column right: `[row + 1][column + 1]`, `[row + 2][column + 2]`, `[row + 3][column + 3]`. Both limits from above apply: row 0 to 2, column 0 to 3.
4. **Slanted `/`.** Each step goes one row **up** and one column right: `[row - 1][column + 1]` … The row gets smaller, so the start must be low enough that `row - 3` is still 0 or more: rows 3, 4, 5.
5. **Found it?** `return true;` at once. No need to look further: one four is enough to win.
6. **Nothing found?** Only after all four searches, at the very end, `return false;`.

Why does `&&` never crash on the edge? Because the loop limits make sure every hole we ask about exists. And `&&` stops at the first `false`, so on a mostly empty board most checks end after one look.

`showTest` is a small helper so `main` does not repeat the same five lines six times: print the name, the board, and both answers.

**Test run**

```text
$ java ConnectFour
Test 1: across (bottom row, columns 4-7)
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . B B B . 
. . . R R R R 
1 2 3 4 5 6 7 
R has four: true
B has four: false

Test 2: up and down (column 7, bottom four)
. . . . . . . 
. . . . . . . 
. . . . . . B 
. . . . . R B 
. . . . . R B 
. . . . . R B 
1 2 3 4 5 6 7 
R has four: false
B has four: true

Test 3: slanted / (from the bottom left corner)
. . . . . . . 
. . . . . . . 
. . . R . . . 
. . R . . . . 
. R . . . . . 
R . . . . . . 
1 2 3 4 5 6 7 
R has four: true
B has four: false

Test 4: slanted \ (from the top, column 4, down to column 7)
. . . B . . . 
. . . . B . . 
. . . . . B . 
. . . . . . B 
. . . . . . . 
. . . . . . . 
1 2 3 4 5 6 7 
R has four: false
B has four: true

Test 5: no four (three across, three up, a gap, a lonely B)
B . . . . . . 
. . . . . . . 
. . . . . . R 
. . . . . . B 
. . . . . . B 
R R R . R . B 
1 2 3 4 5 6 7 
R has four: false
B has four: false

Test 6: empty board
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
1 2 3 4 5 6 7 
R has four: false
B has four: false
```

All six tests match the [test table](../README.md#test-examples). ✅

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `column < COLUMNS` in the across search | `ArrayIndexOutOfBoundsException: Index 7 out of bounds for length 7` (test 2) | A four must fit: start columns 0 to 3, `column <= COLUMNS - 4` |
| `column < COLUMNS - 4` | Test 1 (columns 4 to 7) says `false` | `<=`, not `<`: column 3 is a valid start |
| `/` search starting at row 0 | `Index -1 out of bounds` (test 5, the lonely B) | Going up needs room above: start at row 3 |
| `return false;` inside a loop | Only the very first start hole is checked; tests 1 to 4 say `false` | `return false;` once, at the end of the method |
| Checking only 3 holes (`column + 2` as the last) | Test 1 says `true` for B, test 5 for R (three "win") | Four holes: `+ 0`, `+ 1`, `+ 2`, `+ 3` |
| Mixing up `[row][column]` and `[column][row]` | Wrong answers or `Index 6 out of bounds for length 6` | Always row first |

Back to [Task 90_3](../README.md).
