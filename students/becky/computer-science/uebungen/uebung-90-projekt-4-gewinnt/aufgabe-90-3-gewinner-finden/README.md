# Aufgabe 90_3 · Gewinner finden

Part of [Übung 90 · Projekt 4 gewinnt](../README.md). New ideas you need: a method that gives back a `boolean`, loops inside loops, `return` inside a loop, `&&`. They are all explained in the Übung page (parts 4, 6 and 8; `&&` is from Übung 04).

| Folder | What it is |
|--------|-----------|
| [`meine-loesung/`](meine-loesung/README.md) | **Your desk.** `ConnectFour.java` is half-ready: fill in the `TODO`s |
| [`musterloesung/`](musterloesung/README.md) | The Musterlösung. Peek only when you are done |

## The task (original)

From Becky's rules, the part this Aufgabe covers:

> - Spiel ist beendet wenn: Spielfeld voll (=kein Gewinner) oder 4 der selben Farbe in einer Reihe ( Horizontal, Vertikal, Diagonal = ein Gewinner muss deklariert werden)

Here you build the "4 der selben Farbe in einer Reihe" part. "Spielfeld voll" and announcing the winner come in 90_4.

## The task, simply said

1. Write the method `hasFour(board, piece)`. It gives back `true` or `false`.
2. `true` when `piece` has four in a row anywhere on the board:
   - **across** (horizontal): four next to each other in one row,
   - **up and down** (vertical): four on top of each other in one column,
   - **slanted `\`**: each step one row down and one column right,
   - **slanted `/`**: each step one row up and one column right.
3. Otherwise `false`.
4. Never look outside the board: a four starting in column 5 does not fit.
5. `main` is finished: it sets up six boards by hand and asks `hasFour` for `R` and for `B` on each one.

## Test examples

Row 0 is the top, row 5 the bottom; columns as players say them. Some pieces float in the air: `hasFour` does not care about gravity, it only looks for four in a row.

| Test | Board | `hasFour(board, 'R')` | `hasFour(board, 'B')` |
|------|-------|-----------------------|-----------------------|
| 1 | R across in the bottom row, columns 4 to 7 (the right edge), three B on top | true | false |
| 2 | B up and down in column 7, the bottom four (the right edge), three R next to it | false | true |
| 3 | R slanted `/` from the bottom left corner (row 5, column 1) up to column 4 | true | false |
| 4 | B slanted `\` from the top row, column 4, down to column 7 | false | true |
| 5 | No four: R R R _ R in the bottom row, B B B R up column 7, one lonely B in the top left corner | false | false |
| 6 | The empty board | false | false |

Tests 1 to 5 all touch an **edge** of the board, because that is where loop mistakes hide. A loop that stops one step too early misses the four and says `false`. A loop that goes one step too far makes Java stop with red text (`ArrayIndexOutOfBoundsException`).

## Little helpers

<details>
<summary>Where can a row of four start?</summary>

Draw a row of 7 holes on paper and put a four in it, as far right as possible. In which column does it start? Every start further right falls off the board. Now do the same for a column of 6 holes.

</details>

<details>
<summary>How do I check four holes at once?</summary>

Four questions glued with `&&` (Übung 04): "is this hole `piece` **and** the next one **and** the next one **and** the next one?". For "the next one" across, the column grows by 1, 2, 3. Up and down, the row grows. Slanted, both change.

</details>

<details>
<summary>The <code>/</code> test crashes with <code>Index -1 out of bounds</code></summary>

Going up means `row - 1`, `row - 2`, `row - 3`. If you start in row 0, 1 or 2, that goes above the top. Which rows are low enough to start a `/` four?

</details>

<details>
<summary>The empty board says <code>true</code></summary>

Do you return `true` too early, or `false` inside the loop? Give back `true` the moment you **find** a four. Give back `false` only at the very end, after all four searches found nothing.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can show with your finger, on test 3 and test 4, how the row and the column change at each step.
- [ ] You can explain your code out loud in your own words.

Next: [Aufgabe 90_4](../aufgabe-90-4-das-ganze-spiel/README.md)
