# Task 07_1 · Info

Part of [Exercise 07 · Methods I](../README.md). New ideas you need: methods, `void`, parameters, calling a method. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `Info.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a method `info` that has **no return value** but expects one whole number `x` as a parameter. Each time it is called, the method must print the number itself, its square and its cube (each on its own line). Call the method in your main program at least three times with different values for `x`.

Example output:

```text
Number = 1
Square = 1
Cube = 1
Number = 2
Square = 4
Cube = 8
Number = 3
Square = 9
Cube = 27
```

## The task, simply said

1. Write `static void info(int x) { … }`.
2. Inside, print three lines: the number, `x * x`, and `x * x * x`.
3. In `main`, call `info` at least three times with different numbers (for example 1, 2, 3).

## Test examples

Your program is right when it prints at least these blocks (you may call `info` with more numbers, but these three must appear in order):

| Calls in main | The program must include |
|---------------|--------------------------|
| `info(1)`, `info(2)`, `info(3)` | The nine lines in the example above |

## Little helpers

<details>
<summary>Where does `info` live?</summary>

Put it in the same class as `main`, above or below `main`. Both are `static` methods inside one `.java` file.

</details>

<details>
<summary>Cube means "times itself three times"</summary>

For `x = 3`: square is `3 * 3`, cube is `3 * 3 * 3`. You can also write `x * x * x`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You called `info` at least three times from `main`.
- [ ] You can explain your code out loud in your own words.

Next: [Task 07_2 · Compound interest](../task-07-2-compound-interest/README.md).
