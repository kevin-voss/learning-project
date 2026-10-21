# Task 90_4 · The whole game

Part of [Exercise 90 · Project: Connect Four](../README.md). New ideas you need: the `while` loop, checking input. They are explained in the exercise page (parts 5 and 9). Everything else you built in 90_1 to 90_3.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** `ConnectFour.java` is half-ready: fill in the `TODO`s |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

All of Becky's rules (translated into English), because now the whole game comes together:

> **Connect Four**
>
> *Rules of the game:*
> - 2 players must be defined (e.g. Red/ Blue)
> - The board must be filled from the bottom up (horizontal filling)
> - The game is over when: the board is full (= no winner) or 4 of the same colour in a row (horizontal, vertical, diagonal = a winner must be declared)

## The task, simply said

1. Make an empty board and print it. Red (`R`) starts.
2. Ask: `Player R, choose a column (1-7): ` and read the number.
3. Not 1 to 7 (or not a number at all)? Say `That is not a column. Choose 1 to 7.` The **same** player tries again.
4. Drop the piece with `dropPiece`. Column full? Say `Column 4 is full. Choose another one.` The **same** player tries again.
5. The piece landed: print an empty line and the board.
6. Four in a row (`hasFour`)? Print `Player R wins!` and stop.
7. Otherwise, all 42 holes full? Print `The board is full. Nobody wins: it is a draw.` and stop.
8. Otherwise it is the other player's turn. Back to step 2.

## Test examples

Type the numbers one after the other (each one + Enter). Or let `printf` type them for you, see [`my-solution/`](my-solution/README.md#test-a-whole-game-in-one-go).

| You type | The program says (at the end) | What it tests |
|----------|-------------------------------|---------------|
| `1 2 1 2 1 2 1` | `Player R wins!` | Four up and down in column 1 |
| `1 2 1 2 1 2 3 2` | `Player B wins!` | Blue can win too: the players really take turns |
| `0 8 hello 1 1 1 1 1 1 1 2 2 3 3 4` | three times `That is not a column. Choose 1 to 7.`, then `Column 1 is full. Choose another one.`, at the end `Player R wins!` | Wrong numbers, a word, a full column: always the same player again. R wins across the bottom row |
| `1 1 1 1 1 1 2 2 2 2 2 2 3 3 3 3 3 3 5 4 4 4 4 4 4 5 5 5 5 5 6 6 6 6 6 6 7 7 7 7 7 7` | `The board is full. Nobody wins: it is a draw.` | All 42 holes full, nobody has four |
| `1 1 1 1 1 1 2 2 2 2 2 2 3 3 3 3 3 3 5 4 4 4 4 4 4 5 5 5 6 5 7 6 6 6 7 7 5 7 6 7 6 7` | `Player B wins!` (not "draw"!) | The very last piece makes four: a win beats a full board |

The board of the draw game at the end:

```text
B B B R B B B
R R R B R R R
B B B R B B B
R R R B R R R
B B B R B B B
R R R B R R R
1 2 3 4 5 6 7
```

## Little helpers

<details>
<summary><code>for</code> or <code>while</code>?</summary>

How many turns does a game have? 7? 42? Nobody knows before it starts. Exercise page, part 5: when you stop because *something happens*, it is a `while` loop. A `boolean` like `gameOver` is a good question for it.

</details>

<details>
<summary>After a wrong number, the other player gets the turn</summary>

Switching players must only happen when a piece really **landed** (and nobody won). Look at where your switch is: is it inside the "piece landed" part, or at the end of every lap?

</details>

<details>
<summary>The game never stops</summary>

Something inside the loop must set your "game over" box to `true`: after a win and after a full board. Stop a running program with `Ctrl + C`.

</details>

<details>
<summary>The last test says "draw" instead of "B wins"</summary>

Order matters, like the staircase in exercise 04: ask "four in a row?" **before** "board full?".

</details>

<details>
<summary>How do I know the board is full?</summary>

Count the pieces that really landed. 6 rows × 7 columns = 42 holes. (Or check the top row: if no hole there is empty, the board is full.)

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You played one real game against someone (or against yourself).
- [ ] You can explain why a wrong number does not switch the player.
- [ ] You can explain your code out loud in your own words.

That was the last task of this project. Set all four to `done` in the [Exercise](../README.md) and commit. Want more? Ideas: let the players type their names, show who won with the four pieces in lower case (`r`), or ask "play again?" at the end.
