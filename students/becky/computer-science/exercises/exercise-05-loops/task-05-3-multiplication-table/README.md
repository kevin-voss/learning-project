# Task 05_3 · Multiplication table

Part of [Exercise 05 · Loops](../README.md). New ideas you need: nested `for`, square numbers. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `TimesTable.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a program that computes and prints the small times table using nested loops. If the result is a square number, mark it with a star:

```text
1 x 1 = 1*
1 x 2 = 2
1 x 3 = 3
...
10 x 8 = 80
10 x 9 = 90
10 x 10 = 100*
```

## The task, simply said

1. Outer loop: first factor from 1 to 10.
2. Inner loop: second factor from 1 to 10.
3. Multiply. Print `a x b = product`.
4. If the product is a square number (1, 4, 9, 16, …), add a `*` at the end of the line.
5. No keyboard input — the program just prints.

## Test examples

Your program is right when it gives exactly these answers.

| Line | Must look like |
|------|----------------|
| First | `1 x 1 = 1*` |
| Not a square | `1 x 2 = 2` (no star) |
| Square from different factors | `1 x 4 = 4*` |
| Diagonal square | `5 x 5 = 25*` |
| Last | `10 x 10 = 100*` |
| Near the end | `10 x 8 = 80`, `10 x 9 = 90` |

## Little helpers

<details>
<summary>How do I know if a number is a square?</summary>

Take the whole-number square root, multiply it by itself, and see if you get the product back. The exercise page shows `Math.sqrt`.

</details>

<details>
<summary>I only put a star when a == b</summary>

That catches 1×1, 2×2, … but misses 1×4 = 4 and 2×8 = 16. Check the **product**, not whether the factors are equal.

</details>

<details>
<summary>My table stops at 9 or starts at 0</summary>

Both loops must run from **1 to 10** inclusive: `for (int a = 1; a <= 10; a++)`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can say why the inner loop runs completely for each outer value.
- [ ] You can explain your code out loud in your own words.

Next: [Task 05_4](../task-05-4-triangle-string/README.md)
