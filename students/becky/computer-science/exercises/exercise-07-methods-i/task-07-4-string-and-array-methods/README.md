# Task 07_4 · String and array methods

Part of [Exercise 07 · Methods I](../README.md). New ideas you need: `String` return values, `int[]` parameters and return, comparing doubles. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `MethodToolbox.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write the following methods in Java and test each one thoroughly in a suitable `main` program:

**a)** A method that turns a number into text. An extra parameter says how many characters the text must have **at least**. If the number needs fewer digits, pad with **`0` on the left**.

**b)** A method that returns the sum of a given `int` array.

**c)** A method that, for a given `int` array and a given number, returns **how often** that number appears.

**d)** A method that returns whether two given `double` arrays have the **same length** and the **same values in the same order**.

**e)** A method that takes a closed whole-number interval (`from` through `to`, both ends included) and returns an array containing every number in that interval.

## The task, simply said

1. Write the five methods (names are your choice).
2. In `main`, run demos and **print** each result so you can see it works (the tests look for the lines below).
3. Assume `from <= to` in part (e).

## Test examples

When your program runs (no typing needed), it must print **at least** these result lines:

| Part | Demo | Printed line must include |
|------|------|---------------------------|
| a | number `7`, width `3` | `007` |
| a | number `42`, width `5` | `00042` |
| b | `{1, 2, 3}` | `sum: 6` |
| c | `{1, 2, 2, 3, 2}`, look for `2` | `count 2: 3` |
| d | `{1.0, 2.0}` and `{1.0, 2.0}` | `equal: true` |
| d | `{1.0, 2.0}` and `{2.0, 1.0}` | `equal: false` |
| e | from `2` to `5` | `range: 2 3 4 5` |

You may print extra demo lines; the tests only check the pieces above.

## Little helpers

<details>
<summary>Empty array sum</summary>

The sum of `{}` is `0` — the loop runs zero times.

</details>

<details>
<summary>Comparing doubles</summary>

Use a small tolerance (for example `0.000001`) when comparing each slot in part (d).

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You have five methods and a `main` that demonstrates each one.
- [ ] You can explain one method out loud without reading the code.

Back to [Exercise 07](../README.md).
