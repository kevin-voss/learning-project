# Task 90_2 · Drop a piece

Part of [Exercise 90 · Project: Connect Four](../README.md). New ideas you need: methods with parameters and a return value, a `for` loop that counts backwards, `return` inside a loop, constants for the whole class. They are all explained in the exercise page (parts 3, 6, 7 and 8).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** `ConnectFour.java` is half-ready: fill in the `TODO`s |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

From Becky's rules (translated into English), the part this task covers:

> - 2 players must be defined (e.g. Red/ Blue)
> - The board must be filled from the bottom up (horizontal filling)

## The task, simply said

1. Your board from 90_1 is already in the file, as two finished methods: `createBoard()` and `printBoard(board)`.
2. The two players are `'R'` (Red) and `'B'` (Blue).
3. Write the method `dropPiece(board, column, piece)`. `column` is Java's number, 0 to 6.
4. It looks at the column from the **bottom** row up to the **top** row.
5. The first empty hole it finds gets the piece. Then it gives back that row number.
6. Is the column already full? Then nothing changes and it gives back `-1`.
7. `main` is finished: it drops a fixed list of pieces, prints what each `dropPiece` gave back, and prints the board at the end.

## Test examples

`main` drops these pieces, one after the other (columns as players say them, 1 to 7). Row 5 is the bottom, row 0 the top.

| Drop | Piece | Column | `dropPiece` gives back | Why |
|------|-------|--------|------------------------|-----|
| 1 | R | 4 | 5 | Empty column: the piece falls to the bottom |
| 2 | B | 4 | 4 | Lands on top of the R |
| 3 | R | 4 | 3 | |
| 4 | B | 4 | 2 | |
| 5 | R | 4 | 1 | |
| 6 | B | 4 | 0 | The very top hole: still fits |
| 7 | R | 4 | -1 | Column full: nothing changes |
| 8 | B | 1 | 5 | Left edge, bottom |
| 9 | R | 7 | 5 | Right edge, bottom |
| 10 | B | 1 | 4 | On top of the B in column 1 |

The board at the end:

```text
. . . B . . .
. . . R . . .
. . . B . . .
. . . R . . .
B . . B . . .
B . . R . . R
1 2 3 4 5 6 7
```

Column 4 has exactly 6 pieces: the 7th drop did **not** overwrite the top one.

## Little helpers

<details>
<summary>Why start at the bottom, not at the top?</summary>

Think of a real piece: it falls until it hits something. From the top you would have to find the *last* empty hole. From the bottom it is simply the *first* empty hole you meet. First found = done = `return`.

</details>

<details>
<summary>How does a <code>for</code> loop count backwards?</summary>

Start big, keep going while you are still on the board, and count down: Exercise page, part 3, the last example.

</details>

<details>
<summary>All drops say <code>-1</code></summary>

Is your `return -1` *inside* the loop? Then the method gives up after looking at the first hole. "Nothing found" can only be said when the loop has looked at **every** hole, so it belongs after the loop.

</details>

<details>
<summary>The 7th drop changes the top piece to R</summary>

Your method puts the piece somewhere without checking that the hole is empty. Only an `EMPTY` hole may get the piece.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can say why `dropPiece` gives back `-1` and not `0` when the column is full.
- [ ] You can explain your code out loud in your own words.

Next: [Task 90_3](../task-90-3-find-the-winner/README.md)
