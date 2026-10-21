# Task 01_4 · Alphabet

Part of [Exercise 01 · First programs](../README.md). New ideas you need: `println`, text in quotes, `\n` and `\t`. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `Task01_4.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

a) Write a Java program that prints the string `ABCDEFGHIJKL` to the console. Use `Task01_4` as the file and class name.

b) Insert the character sequences `\n` and `\t` somewhere inside the double quotes of a `System.out.println()` statement. How do these character sequences affect the output?

c) Try to produce the following output using only a single `System.out.println()` statement by using `\n` and `\t` appropriately (without using any spaces):

```
    A B C D
    E F G H
    I J K L
```

## The task, simply said

1. a) Print `ABCDEFGHIJKL` in one line.
2. b) Play: put `\n` and `\t` into the text and run it. Write in one sentence each what they do.
3. c) Build the grid: 3 rows, 4 letters per row, every row pushed a bit to the right.
4. c) Only **one** `println`. Inside the quotes: letters, `\n` and `\t`. **No** spaces.

## Test examples

Your program is right when it gives exactly these answers.

| Part | The program says |
|------|------------------|
| a) | `ABCDEFGHIJKL` |
| b) | your own text, broken into lines where you wrote `\n`, with wide gaps where you wrote `\t` |
| c) | 3 rows: `A B C D`, `E F G H`, `I J K L`. Each row starts with a gap, and there is a gap between the letters |

For c), this is what it looks like in a terminal. The gaps are **tabs**, not spaces:

```text
        A       B       C       D
        E       F       G       H
        I       J       K       L
```

The gaps are wider than on the sheet. That is fine: a tab jumps to the next "tab stop", and the terminal puts one every 8 places (the sheet's editor every 4). What counts is the pattern: **gap before every letter**, **new row after every 4th letter**.

Check without trusting your eyes: `java Task01_4 | cat -t` shows every tab as `^I`. Row 1 of part c) must look exactly like `^IA^IB^IC^ID`.

## Your first try

What is already good:

- Part a) is right: `ABCDEFGHIJKL` in one line.
- You used `\n` and `\t` inside one single `println` and made real grids with them, so you already found out what both do.

What is still open:

- Part c): your grids have 2 or 3 letters per row; the sheet wants **4** per row, so 3 rows. And on the sheet every row starts with a gap too, also before `A`, `E` and `I`.
- Part b) asks a question: write down in your own words what `\n` and `\t` do (your desk README has a place for it).

## Little helpers

<details>
<summary>How do I know where to put \n and where \t?</summary>

Read the grid like a typewriter, letter by letter: "gap, A, gap, B, gap, C, gap, D, new line, gap, E, …". Every "gap" is a `\t`, every "new line" is a `\n`. Now write exactly that sentence as code.

</details>

<details>
<summary>The first row is not pushed to the right</summary>

The gap before `A` must be at the very start of the text, right after the opening `"`.

</details>

<details>
<summary>I get an empty line at the very end</summary>

`println` already ends the last line by itself. So the text does not need a `\n` after `L`.

</details>

<details>
<summary>Java says "illegal escape character"</summary>

You wrote a backslash followed by a letter Java does not know, for example `\N` or `\ t`. It must be a small `n` or a small `t`, directly after the `\`.

</details>

## Done when

- [ ] a) prints `ABCDEFGHIJKL`.
- [ ] b) you wrote down in one sentence each what `\n` and `\t` do.
- [ ] c) one single `println`, no spaces inside the quotes, 3 rows with 4 letters, a tab before every letter.
- [ ] You can explain your code out loud in your own words.

That was the last task of this exercise. Set all four to `done` in the [Exercise](../README.md), then go on to [Exercise 02](../../exercise-02-data-types-and-variables/README.md).
