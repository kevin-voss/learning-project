# Task 06_1 · Faculty lookup

Part of [Exercise 06 · Arrays](../README.md). New ideas you need: `String[]`, index, length, range check. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Hanover University of Applied Sciences has five faculties:

- Faculty 1: Electrical Engineering and Information Technology
- Faculty 2: Mechanical Engineering and Bioprocess Engineering
- Faculty 3: Media, Information and Design
- Faculty 4: Business and Computer Science
- Faculty 5: Diaconia, Health and Social Affairs

Write a program that stores all faculty names in an array. Then the program reads a faculty number from the user and prints the name of that faculty. Make sure your program also reacts sensibly to invalid numbers.

Example run from the sheet:

```text
Faculty number: 4
Faculty name: Business and Computer Science
```

## The task, simply said

1. Put the five names in a `String[]` in order (faculty 1 first, faculty 5 last).
2. Ask: `Faculty number: ` and read an integer.
3. If the number is 1, 2, 3, 4, or 5, print `Faculty name: ` and the matching name.
4. If the number is anything else, print `Invalid faculty number.` (and do not pretend a name exists).

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `4` | `Faculty name: Business and Computer Science` |
| `1` | `Faculty name: Electrical Engineering and Information Technology` |
| `5` | `Faculty name: Diaconia, Health and Social Affairs` |
| `0` | `Invalid faculty number.` |
| `6` | `Invalid faculty number.` |
| `-3` | `Invalid faculty number.` |

## Little helpers

<details>
<summary>My program crashes with ArrayIndexOutOfBoundsException</summary>

Array indexes start at **0**, but faculty numbers start at **1**. Either store five names and use `number - 1`, or check the number **before** you use `[ ]`.

</details>

<details>
<summary>I print a name for number 6</summary>

Check that the number is between 1 and 5 **first**. Only then read from the array.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can explain why `faculties[0]` is the name for faculty 1 (or how your indexing works).
- [ ] You can explain your code out loud in your own words.

Next: [Task 06_2](../task-06-2-revenue-statistics/README.md)
