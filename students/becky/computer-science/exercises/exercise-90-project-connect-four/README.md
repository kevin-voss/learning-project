# Exercise 90 · Project: Connect Four

| | |
|---|---|
| Student | Becky |
| Subject | Computer Science · Programming 1 (Hochschule Hannover) |
| Language | Java |
| Created | 2026-10-21 |

> **This is a project, not a weekly sheet.** It is Becky's own idea: build the game *Connect Four* in Java. It has the number 90 so it sorts after the course sheets. Do it whenever you like, at your own speed.

## The story in one sentence

You build the game **Connect Four** for two people at one computer: Red and Blue drop pieces into a standing board, the pieces fall down, and whoever gets **four in a row** first wins.

A whole game is too big for one step, so you build it like a LEGO set, one bag at a time:

1. **The board:** an empty grid of 6 rows and 7 columns on the screen.
2. **Dropping a piece:** the piece falls to the lowest free hole.
3. **Finding a winner:** four in a row across, up and down, or slanted.
4. **The whole game:** take turns, check every answer, say who won.

Every step is a program that runs on its own. Each one starts where the last one stopped.

## The task (from the sheet)

These are Becky's rules, translated into English:

> **Connect Four**
>
> *Rules of the game:*
> - 2 players must be defined (e.g. Red/ Blue)
> - The board must be filled from the bottom up (horizontal filling)
> - The game is over when: the board is full (= no winner) or 4 of the same colour in a row (horizontal, vertical, diagonal = a winner must be declared)

In short: two players (Red `R` and Blue `B`). Pieces fill the board from the bottom up. The game ends when one colour has four in a row (that player wins) or when the board is full (nobody wins, a draw).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 90_1 | [Game board](task-90-1-game-board/README.md) | todo |
| 90_2 | [Drop a piece](task-90-2-drop-a-piece/README.md) | todo |
| 90_3 | [Find the winner](task-90-3-find-the-winner/README.md) | todo |
| 90_4 | [The whole game](task-90-4-the-whole-game/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all four tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In every task the file is called `ConnectFour.java`. It is the same game, growing step by step: the desk of 90_2 already has a finished 90_1 inside, and so on.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished). See [students/README.md](../../../../README.md#cursor-commands-for-students).

---

## What you already know

This project builds on the four sheets before it. You will use all of this again:

| From | You know | In this project |
|------|----------|-----------------|
| Exercise 01 | `System.out.print` and `println` | Printing the board line by line |
| Exercise 02 | `int`, `char`, `boolean` boxes | `'R'`, `'B'`, `'.'` are `char`s; "game over?" is a `boolean` |
| Exercise 03 | `+ - * / %` | `column - 1`, `ROWS * COLUMNS`, `i % 2` for taking turns |
| Exercise 04 | `if` / `else if` / `else`, `&&`, `\|\|`, `!`, `final`, `Scanner` | Every check in the game |

Want to read more about the new ideas below? The site has a full lesson for each: [loops and decisions](../../../../../tracks/java/topics/control-flow/index.html), [arrays](../../../../../tracks/java/topics/arrays/index.html) and [methods](../../../../../tracks/java/topics/methods/index.html).

**Look how it works on the web:** the site's [project 3: Tic-tac-toe](../../../../../projects/03-tic-tac-toe/README.md) is the same idea in JavaScript, on a 3 × 3 board with three in a row. Same egg carton, same win check with loops, same "whose turn is it?". If you get stuck here, peeking at how it works there often helps.

---

## What you will learn

Three new ideas: **2D arrays** (the board), **loops** (doing things again and again) and **methods** (little machines with a name).

### 1. An array — a row of eggs

Until now one box held one value: `int age = 7;`. An **array** is a row of boxes with one name. Each box has a number, and Java starts counting at **0**.

```java
int[] drops = {4, 4, 1, 7};
System.out.println(drops[0]);      // 4  (the first box)
System.out.println(drops[3]);      // 7  (the last box)
System.out.println(drops.length);  // 4  (how many boxes)
```

**In the task:** 90_2 keeps its list of test drops in an `int[]`.

### 2. A 2D array — the egg carton

Now take an egg carton with **6 rows of 7 holes**. To find one egg you say the **row** and the **column**: "row 5, column 3". That is a **2D array**: an array of rows, and every row is an array of holes.

```java
char[][] board = new char[6][7];   // 6 rows, 7 columns, all empty
board[5][3] = 'R';                 // row 5, column 3 gets a red piece
char piece = board[5][3];          // look into that hole: 'R'
```

Always **row first, then column**: `board[row][column]`. Java counts from 0, so the holes are numbered like this:

```text
            column 0 1 2 3 4 5 6
row 0 (top)        . . . . . . .
row 1              . . . . . . .
row 2              . . . . . . .
row 3              . . . . . . .
row 4              . . . . . . .
row 5 (bottom)     . . . R . . .
```

People playing the game count columns **1 to 7**. Java counts **0 to 6**. So when a player says "column 4", Java needs `4 - 1 = 3`. Translate once, right where you read the number, and never think about it again.

Ask for a hole that does not exist (`board[6][0]` or `board[0][7]`) and Java stops with an `ArrayIndexOutOfBoundsException`. That just means "this egg carton has no such hole".

A `char` is one single sign in **single** quotes: `'R'`, `'B'`, `'.'`. Compare two `char`s with `==`, like numbers.

**In the task:** the whole board in every task. 90_1 builds it, all others use it.

### 3. The `for` loop — running laps

A coach says: "Run **3 laps**." You count: lap 1, lap 2, lap 3, stop. That is a `for` loop: you know **how many times** before you start.

```java
for (int lap = 1; lap <= 3; lap++) {
    System.out.println("Lap " + lap);
}
```

The three parts inside `( )`, separated by `;`:

1. `int lap = 1` — **start**: where do I begin counting?
2. `lap <= 3` — **keep going?** Asked before every lap. False → stop.
3. `lap++` — **after each lap**: count one more. `lap++` is short for `lap = lap + 1`, and `lap--` for `lap = lap - 1`.

For arrays we count from 0 and stop **before** the length: `for (int column = 0; column < 7; column++)` visits 0, 1, 2, 3, 4, 5, 6. Seven columns, no `ArrayIndexOutOfBoundsException`.

A loop can also count **backwards**, from the bottom of the board up to the top:

```java
for (int row = 5; row >= 0; row--) { ... }   // 5, 4, 3, 2, 1, 0
```

**In the task:** printing the column numbers (90_1), and walking up a column to find the lowest free hole (90_2).

### 4. A loop inside a loop — reading a book

How do you read a page? Line after line. And in each line? Word after word. A loop inside a loop:

```java
for (int row = 0; row < 6; row++) {            // every line, from top to bottom
    for (int column = 0; column < 7; column++) { // every hole in this line
        System.out.print(board[row][column] + " ");
    }
    System.out.println();                         // line done: next line
}
```

The inner loop runs **all 7 times** for **each** of the 6 rows: 42 holes, every one visited once.

**In the task:** filling the board with `'.'` and printing it (90_1), and checking every place a four could start (90_3).

### 5. The `while` loop — "as long as …"

Sometimes you do not know how many laps. "Keep playing **as long as** nobody has won." That is a `while` loop: only the "keep going?" question, no counting.

```java
boolean gameOver = false;
while (!gameOver) {          // ! means "not": as long as the game is NOT over
    // play one turn
    // ... and somewhere set gameOver = true;
}
```

⚠️ Something inside the loop **must** make the question false one day. If `gameOver` never becomes `true`, the loop never ends. (Stop a stuck program with `Ctrl + C`.)

| Loop | Use it when | Example |
|------|-------------|---------|
| `for` | You know how many times | 7 columns, 6 rows |
| `while` | You stop when something happens | Play until someone wins |

**In the task:** the game loop in 90_4.

### 6. Methods — the vending machine

A vending machine has a **name** on the front. You put things **in** (coins, a button number) and you get **one thing out** (a drink). You do not need to know what happens inside.

A **method** is the same: a piece of code with a name. You put values in (the **parameters**) and get one value back (the **return value**).

```java
static int add(int a, int b) {
    return a + b;       // "here is your drink": give back the answer and leave
}
```

Read the first line from left to right: `static` (always, for now) · `int` = **what comes out** · `add` = **the name** · `(int a, int b)` = **what goes in**.

Using it ("calling" it):

```java
int sum = add(2, 3);    // sum is 5
```

- `return` hands the answer back **and leaves the method at once**. Code after it does not run.
- A method that only **does** something and gives nothing back has `void` as its out-type, like a machine that just plays a song. `printBoard` is one.
- A method can also give back a `boolean`: then it is a **question** you can ask. `hasFour(board, 'R')` is `true` or `false`.
- Methods go **inside** the class but **outside** `main`. `main` is a method too: the one Java calls first.
- For now every method starts with `static`. What `static` really means comes later in the course.

The big win: the game in 90_4 is short and readable, because the hard parts are machines with good names:

```java
int row = dropPiece(board, column - 1, player);
if (hasFour(board, player)) { ... }
```

**In the task:** `dropPiece` (90_2) and `hasFour` (90_3), used together in 90_4.

### 7. Constants for the whole class

In exercise 04 you wrote `final` boxes inside `main`. A method cannot see the boxes of `main`. So from 90_2 on, the board size lives **outside** `main`, at the top of the class, where every method can see it:

```java
public class ConnectFour {
    static final int ROWS = 6;
    static final int COLUMNS = 7;
    static final char EMPTY = '.';
    ...
}
```

Now `for (int row = 0; row < ROWS; row++)` reads like a sentence, and a bigger board is one change in one place.

### 8. `return` in the middle of a loop — "found it!"

You look for your shoes in five rooms. As soon as you find them, you stop looking. In a method, `return` inside a loop does exactly that:

```java
for (int row = ROWS - 1; row >= 0; row--) {
    if (board[row][column] == EMPTY) {
        return row;          // found a free hole: stop and give back the row
    }
}
return -1;                   // all rooms searched, no shoes
```

The `return -1` after the loop only runs when the loop found nothing. `-1` is a good "nothing found" answer because no row has that number.

**In the task:** `dropPiece` (90_2) and `hasFour` (90_3, "four found → `return true`").

### 9. Reading input you can trust

In 90_4 the players type a column. People type wrong things: `0`, `8`, or `hello`. The game must say "try again" and **not** switch players. The desk file has a ready-made helper `readColumn` that reads the next number and turns a word into `0` (never a valid column). You only need to check the number it gives you:

```java
int column = readColumn(scanner);
if (column < 1 || column > COLUMNS) {
    System.out.println("That is not a column. Choose 1 to 7.");
}
```

---

## Words to know

| Word | Means |
|------|-------|
| Connect Four | The game: four in a row wins |
| player | Red (`R`) or Blue (`B`) |
| board / board holes | The 6 × 7 grid |
| piece | One red or blue disc |
| drop in | Put a piece in at the top of a column |
| filled from the bottom up | A piece falls to the lowest free hole |
| row | A line across (`board[row][...]`) |
| column | A line up and down (`board[...][column]`) |
| in a row | Four next to each other, no gap |
| across | Left to right |
| up and down | Top to bottom |
| slanted | Like `/` or `\` |
| board full | All 42 holes taken |
| no winner / draw | Board full and nobody has four |
| announce the winner | Print who won |
| loop | Code that runs again and again (`for`, `while`) |
| 2D array | The egg carton: `char[][]` |
| method | A little machine with a name |
| parameter | What you put into a method |
| return value | What a method gives back |

## Source

> Becky's own project idea and rules (*Connect Four*, "Rules of the game"), translated into English. Not one of the weekly sheets of Programming 1 (Hochschule Hannover); it uses what the course teaches next: loops, arrays and methods.

Back to [all exercises](../README.md).
