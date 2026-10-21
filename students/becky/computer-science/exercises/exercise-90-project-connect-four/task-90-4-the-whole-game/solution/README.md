# Sample solution · Task 90_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac ConnectFour.java
```

```bash
java ConnectFour
```

Play by typing column numbers. The tests below were run with `printf ... | java ConnectFour`, see [`my-solution/`](../my-solution/README.md#test-a-whole-game-in-one-go).

## How it works, step by step

1. **Four boxes describe the game right now:** `board` (where the pieces are), `player` (whose turn: `'R'` or `'B'`), `piecesOnBoard` (how many landed) and `gameOver` (`true` = stop).
2. **`while (!gameOver)`** — one lap is one *try*. We cannot know how many laps a game needs, so it is a `while`, not a `for`.
3. **Ask and read.** `readColumn` gives back the typed number, or `0` for a word like `hello`. That way one simple check covers both mistakes.
4. **Wrong number?** `column < 1 || column > COLUMNS` → say so and do **nothing else**. The lap ends, `player` did not change, so the same player is asked again.
5. **Drop.** `dropPiece(board, column - 1, player)`: the players' 1 to 7 becomes Java's 0 to 6, in this one place only. `-1` back → the column is full → say so, same player again (nothing else happens, just like step 4).
6. **The piece landed.** Count it (`piecesOnBoard++`), print an empty line and the board.
7. **The staircase from exercise 04,** in this order:
   - `hasFour(board, player)` → `Player R wins!`, `gameOver = true`. We only ask about the player who just moved: the other one cannot have won with *this* piece.
   - `piecesOnBoard == ROWS * COLUMNS` → draw, `gameOver = true`. This comes **second**: if the 42nd piece makes four, that is a win, not a draw (test 5).
   - otherwise switch: `'R'` becomes `'B'`, `'B'` becomes `'R'`.
8. `gameOver` is now `true` → the `while` question is false → the loop ends → `main` ends.

Why is `main` so short? Because the hard work sits in the machines from 90_1 to 90_3. `main` only tells the story of a turn: ask, check, drop, show, decide.

The helper `readColumn` uses three new Scanner words: `hasNext()` ("is there any more input?"), `hasNextInt()` ("is the next thing a whole number?") and `next()` ("read the next word, whatever it is"). `System.exit(0)` ends the whole program at once; you only reach it when `printf` ran out of numbers.

### Test run

With `printf` the typed numbers are not shown. So each `choose a column (1-7): ` is followed directly by what the program says next. Long games are cut: `[…]` marks where boards were left out.

**Test 1:** `printf '1\n2\n1\n2\n1\n2\n1\n' | java ConnectFour` (the whole game)

```text
Connect Four! Red (R) against Blue (B).
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
1 2 3 4 5 6 7 
Player R, choose a column (1-7): 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
R . . . . . . 
1 2 3 4 5 6 7 
Player B, choose a column (1-7): 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
R B . . . . . 
1 2 3 4 5 6 7 
Player R, choose a column (1-7): 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
R . . . . . . 
R B . . . . . 
1 2 3 4 5 6 7 
Player B, choose a column (1-7): 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
R B . . . . . 
R B . . . . . 
1 2 3 4 5 6 7 
Player R, choose a column (1-7): 
. . . . . . . 
. . . . . . . 
. . . . . . . 
R . . . . . . 
R B . . . . . 
R B . . . . . 
1 2 3 4 5 6 7 
Player B, choose a column (1-7): 
. . . . . . . 
. . . . . . . 
. . . . . . . 
R B . . . . . 
R B . . . . . 
R B . . . . . 
1 2 3 4 5 6 7 
Player R, choose a column (1-7): 
. . . . . . . 
. . . . . . . 
R . . . . . . 
R B . . . . . 
R B . . . . . 
R B . . . . . 
1 2 3 4 5 6 7 
Player R wins!
```

**Test 2:** `printf '1\n2\n1\n2\n1\n2\n3\n2\n' | java ConnectFour` (the end)

```text
[… 56 lines cut …]
Player R, choose a column (1-7): 
. . . . . . . 
. . . . . . . 
. . . . . . . 
R B . . . . . 
R B . . . . . 
R B R . . . . 
1 2 3 4 5 6 7 
Player B, choose a column (1-7): 
. . . . . . . 
. . . . . . . 
. B . . . . . 
R B . . . . . 
R B . . . . . 
R B R . . . . 
1 2 3 4 5 6 7 
Player B wins!
```

**Test 3:** `printf '0\n8\nhello\n1\n1\n1\n1\n1\n1\n1\n2\n2\n3\n3\n4\n' | java ConnectFour`

```text
Connect Four! Red (R) against Blue (B).
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
1 2 3 4 5 6 7 
Player R, choose a column (1-7): That is not a column. Choose 1 to 7.
Player R, choose a column (1-7): That is not a column. Choose 1 to 7.
Player R, choose a column (1-7): That is not a column. Choose 1 to 7.
[… 40 lines cut …]
Player B, choose a column (1-7): 
B . . . . . . 
R . . . . . . 
B . . . . . . 
R . . . . . . 
B . . . . . . 
R . . . . . . 
1 2 3 4 5 6 7 
Player R, choose a column (1-7): Column 1 is full. Choose another one.
Player R, choose a column (1-7): 
B . . . . . . 
R . . . . . . 
B . . . . . . 
R . . . . . . 
B . . . . . . 
R R . . . . . 
1 2 3 4 5 6 7 
[… 24 lines cut …]
Player R, choose a column (1-7): 
B . . . . . . 
R . . . . . . 
B . . . . . . 
R . . . . . . 
B B B . . . . 
R R R R . . . 
1 2 3 4 5 6 7 
Player R wins!
```

**Test 4:** `printf '%s\n' 1 1 1 1 1 1 2 2 2 2 2 2 3 3 3 3 3 3 5 4 4 4 4 4 4 5 5 5 5 5 6 6 6 6 6 6 7 7 7 7 7 7 | java ConnectFour` (the end)

```text
[… 328 lines cut …]
Player R, choose a column (1-7): 
B B B R B B . 
R R R B R R R 
B B B R B B B 
R R R B R R R 
B B B R B B B 
R R R B R R R 
1 2 3 4 5 6 7 
Player B, choose a column (1-7): 
B B B R B B B 
R R R B R R R 
B B B R B B B 
R R R B R R R 
B B B R B B B 
R R R B R R R 
1 2 3 4 5 6 7 
The board is full. Nobody wins: it is a draw.
```

**Test 5:** `printf '%s\n' 1 1 1 1 1 1 2 2 2 2 2 2 3 3 3 3 3 3 5 4 4 4 4 4 4 5 5 5 6 5 7 6 6 6 7 7 5 7 6 7 6 7 | java ConnectFour` (the end: the 42nd piece gives Blue four up and down in column 7)

```text
[… 328 lines cut …]
Player R, choose a column (1-7): 
B B B R R R . 
R R R B B R B 
B B B R B B B 
R R R B R R B 
B B B R B B R 
R R R B R R R 
1 2 3 4 5 6 7 
Player B, choose a column (1-7): 
B B B R R R B 
R R R B B R B 
B B B R B B B 
R R R B R R B 
B B B R B B R 
R R R B R R R 
1 2 3 4 5 6 7 
Player B wins!
```

**Extra:** `printf '4\n4\n' | java ConnectFour` (input runs out in the middle of a game, the end)

```text
[… 16 lines cut …]
Player B, choose a column (1-7): 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . . . . . 
. . . B . . . 
. . . R . . . 
1 2 3 4 5 6 7 
Player R, choose a column (1-7): 
No more input. Game stopped.
```

All five test examples match the [test table](../README.md#test-examples). ✅

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Switching the player at the end of every lap | After `0` or a full column, the **other** player suddenly has the turn | Switch only inside "piece landed and nobody won" |
| Asking "full?" before "four?" | Test 5 says draw instead of `Player B wins!` | Win check first, draw check second |
| Forgetting `column - 1` | Pieces land one column too far right; `7` crashes with `Index 7 out of bounds` | Players 1 to 7, Java 0 to 6 |
| Checking `hasFour` for both players | Works, but asks twice. And the wrong player could be named | Only the player who just moved can have a new four |
| `gameOver` never set to `true` | The game asks forever after someone won | Set it in both endings: win and draw |
| `scanner.nextInt()` directly, typing `hello` | `InputMismatchException`, red text, game over | Use `readColumn` (it checks with `hasNextInt` first) |
| Counting every try, not every landed piece | Draw is called too early after wrong numbers | `piecesOnBoard++` only after `dropPiece` gave back a real row |

Back to [Task 90_4](../README.md).
