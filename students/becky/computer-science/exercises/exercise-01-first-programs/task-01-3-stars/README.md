# Task 01_3 · Stars

Part of [Exercise 01 · First programs](../README.md). New ideas you need: `println`, spaces inside quotes. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `Task01_3.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a Java program that produces the following output using multiple `System.out.println()` statements. Use `Task01_3` as the file and class name.

```
*
**
***
****
*****
 ****
  ***
   **
    *
```

## The task, simply said

1. Make a file and class `Task01_3`.
2. Look at the picture. Every line of the picture = one `println`.
3. Count the stars in each line, and the spaces in front of them.
4. Write the lines one below the other.

## Test examples

Your program is right when it gives exactly these answers.

| Line | Spaces in front | Stars | Looks like |
|------|-----------------|-------|------------|
| 1 | 0 | 1 | `*` |
| 2 | 0 | 2 | `**` |
| 3 | 0 | 3 | `***` |
| 4 | 0 | 4 | `****` |
| 5 | 0 | 5 | `*****` |
| 6 | 1 | 4 | `␣****` |
| 7 | 2 | 3 | `␣␣***` |
| 8 | 3 | 2 | `␣␣␣**` |
| 9 | 4 | 1 | `␣␣␣␣*` |

(`␣` = one space, so you can count it.) The whole output of `java Task01_3`:

```text
*
**
***
****
*****
 ****
  ***
   **
    *
```

9 lines: on the way **up** 1, 2, 3, 4, 5 stars, on the way **down** 4, 3, 2, 1 stars with more and more spaces in front. (The copy of the task in your course repository misses the `***` line on the way up. The paper sheet has it, and the paper sheet is the original.)

## Your first try

What is already good:

- Your picture uses one `println` per line, exactly as the sheet asks, and the spaces push the falling half to the right so its right edge stays straight.
- You went further and tried to build the picture with loops. That is the topic of a later exercise, so you are already curious about the next step. Great.

What is still open:

- Your `println` part prints all 9 lines of the paper sheet, `***` on the way up included. Only the copy of the task in your repository is missing that line: fix the picture in your repository's README so it matches the sheet.
- This exercise only knows `println`. Keep the loop version as a bonus, but make sure the `println`-only part alone produces the picture.

## Little helpers

<details>
<summary>My stars are on the left, the sheet's are on the right</summary>

The empty places on the left are **spaces**, and spaces inside the quotes are printed too. Put them in front of the stars, inside the quotes.

</details>

<details>
<summary>The picture looks almost right, but something is off</summary>

Put your output and the sheet's picture next to each other and go line by line: number of spaces, number of stars. Do not trust your eyes for the whole picture; trust counting.

</details>

<details>
<summary>Is there no shorter way than writing nine println?</summary>

Yes, with **loops** ("do this 5 times"). They come in a later exercise. For now, nine `println` are exactly right: the task even says "using multiple `println()` statements".

</details>

## Done when

- [ ] Your output matches the sheet's picture: the same number of lines, the same spaces and stars in every line.
- [ ] You used only `println` with text in quotes.
- [ ] You can explain your code out loud in your own words.

Next: [Task 01_4](../task-01-4-alphabet/README.md)
