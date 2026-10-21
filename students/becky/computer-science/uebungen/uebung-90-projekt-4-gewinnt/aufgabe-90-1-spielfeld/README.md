# Aufgabe 90_1 · Spielfeld

Part of [Übung 90 · Projekt 4 gewinnt](../README.md). New ideas you need: 2D array, `for` loop, loop inside a loop. They are all explained in the Übung page (parts 2, 3 and 4).

| Folder | What it is |
|--------|-----------|
| [`meine-loesung/`](meine-loesung/README.md) | **Your desk.** `ConnectFour.java` is half-ready: fill in the `TODO`s |
| [`musterloesung/`](musterloesung/README.md) | The Musterlösung. Peek only when you are done |

## The task (original)

This Aufgabe builds the *Spielfelder* every rule talks about. From Becky's rules:

> **4-Gewinnt**
>
> - Spielfelder müssen von unten nach oben befüllt werden (Horizontale befüllung)

The rules do not say how big the board is. We use the classic size: **6 rows, 7 columns**. Filling it comes in Aufgabe 90_2.

## The task, simply said

1. Make a board: a 2D array of `char` with 6 rows and 7 columns.
2. Put a `'.'` into every hole. A dot means "empty".
3. Print the board row by row, from top to bottom, with a space after every sign.
4. Under the board, print the column numbers `1 2 3 4 5 6 7`, so players know where to drop.
5. Use loops for all of it. No `System.out.println(". . . . . . .");` six times!

## Test examples

The program has no input: just start it. It is right when it prints exactly this:

| You type | The program says |
|----------|------------------|
| *(nothing, just start it)* | 6 lines `. . . . . . .`, then `1 2 3 4 5 6 7` |

```text
. . . . . . .
. . . . . . .
. . . . . . .
. . . . . . .
. . . . . . .
. . . . . . .
1 2 3 4 5 6 7
```

Check the borders too:

| Check | Expected |
|-------|----------|
| Count the dot lines | exactly 6 (not 5, not 7) |
| Count the dots in one line | exactly 7 |
| First and last column number | `1` and `7` (not `0` and `6`) |
| Each number stands under its column | yes, because both use "sign + space" |
| Change `ROWS` to `4` and run again | 4 dot lines: your loops use `ROWS`, not a fixed `6` |

## Little helpers

<details>
<summary>Which number comes first in <code>new char[?][?]</code>?</summary>

Rows first, then columns. Think "egg carton: which row, then which hole in that row". Übung page, part 2.

</details>

<details>
<summary>All the dots come out in one long line</summary>

`print` stays on the line, `println` starts a new one. Where does one row end? Exactly there, after the inner loop, you need a new line.

</details>

<details>
<summary>The column numbers say <code>0 1 2 3 4 5 6</code></summary>

Your loop counts like Java (from 0). The players count from 1. What can you add to the number when you print it? Mind the brackets: `"" + column + 1` glues a `1` onto the text.

</details>

<details>
<summary>Red text: <code>ArrayIndexOutOfBoundsException</code></summary>

A loop went one step too far. For 7 columns the numbers are 0 to 6, so the loop must stop **before** 7: `column < COLUMNS`, not `<=`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You use loops, not six copied print lines.
- [ ] You can show on the printed board where `board[0][0]` and `board[5][6]` are.
- [ ] You can explain your code out loud in your own words.

Next: [Aufgabe 90_2](../aufgabe-90-2-stein-einwerfen/README.md)
