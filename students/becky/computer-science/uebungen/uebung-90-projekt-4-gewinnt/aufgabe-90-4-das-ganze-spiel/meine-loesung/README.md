# Meine Lösung · Aufgabe 90_4 ✏️

This is your desk. `ConnectFour.java` is half-ready: all the machines from 90_1 to 90_3 are in it and finished (`createBoard`, `printBoard`, `dropPiece`, `hasFour`), plus a ready-made helper `readColumn` that reads the players' numbers. The game itself is yours. Look for `TODO` in `main` and solve them from top to bottom.

The file already runs. Until you fill in the TODOs it asks Red for one column, says `(you chose 4, the game is not built yet)` and stops.

Did you do 90_3 first? Good, because `hasFour` is finished in this file. Want to use your own `dropPiece` and `hasFour` from 90_2 and 90_3 instead? Copy them over the ones here.

## How to run it

Open a terminal **in this folder** (`meine-loesung/`), then:

```bash
javac ConnectFour.java
```

```bash
java ConnectFour
```

Now play: type a column number and press Enter. Stop a running game any time with `Ctrl + C`.

`javac` = "translate my code for the computer". `java` = "now run it". Changed the code? Run `javac` again before `java`, or you run the old version.

## Test a whole game in one go

Typing 42 numbers for the draw test is boring. `printf` can type for you: every number followed by `\n` (= Enter), and `|` hands them to your program.

```bash
printf '1\n2\n1\n2\n1\n2\n1\n' | java ConnectFour
```

```bash
printf '0\n8\nhello\n1\n1\n1\n1\n1\n1\n1\n2\n2\n3\n3\n4\n' | java ConnectFour
```

```bash
printf '%s\n' 1 1 1 1 1 1 2 2 2 2 2 2 3 3 3 3 3 3 5 4 4 4 4 4 4 5 5 5 5 5 6 6 6 6 6 6 7 7 7 7 7 7 | java ConnectFour
```

(`printf '%s\n' a b c` prints every word on its own line: a short way to write many `\n`.) The numbers you "type" this way do not show up on the screen, so each question is followed directly by the answer of the program. When the numbers run out before the game is over, `readColumn` says `No more input. Game stopped.`

## Rules for this desk

- Change anything you like here.
- Do not copy from [`../musterloesung/`](../musterloesung/README.md). Look there only when you are done.
- Stuck? Read the [Übung page](../../README.md) again, then the helpers in the [Aufgabe](../README.md). In Cursor: `/stuck`, then `/check`.
