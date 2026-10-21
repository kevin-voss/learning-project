# My solution · Task 90_4 ✏️

This is your desk. It is empty on purpose: you write the whole program yourself, from the first line to the last.

Create a file `ConnectFour.java` in this folder. The class inside must have the same name: `public class ConnectFour`. The [exercise page](../../README.md) explains every idea you need.

Start from **your own** 90_3: copy your `ConnectFour.java` from [`../../task-90-3-find-the-winner/my-solution/`](../../task-90-3-find-the-winner/my-solution/README.md) into this folder. It has your `createBoard`, `printBoard`, `dropPiece` and `hasFour`. The game in `main` is new.

## How to run it

When your file is written, open a terminal **in this folder** (`my-solution/`), then:

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

(`printf '%s\n' a b c` prints every word on its own line: a short way to write many `\n`.) The numbers you "type" this way do not show up on the screen, so each question is followed directly by the answer of the program. When the numbers run out before the game is over, your program should stop with a short message, for example `No more input. Game stopped.`, and not crash.

## Test it

The task has tests: they type the inputs for you and check what your program prints. Any file and class name works. Run them from the main folder of the repo (where the `Makefile` is):

```bash
make test-task TASK=90_4
```

In Cursor, `/test` runs them and explains the first ❌ (and makes extra tests for edge cases when you ask).

## Rules for this desk

- Change anything you like here.
- Do not copy from [`../solution/`](../solution/README.md). Look there only when you are done.
- Stuck? Read the [exercise page](../../README.md) again, then the helpers in the [task](../README.md). In Cursor: `/stuck`, then `/check`.
