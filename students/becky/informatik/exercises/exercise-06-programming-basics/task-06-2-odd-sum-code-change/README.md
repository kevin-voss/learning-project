# Task 06_2 · Odd-sum code change

Part of [Exercise 06 · Programming basics](../README.md). New ideas you need: **same loop**, different **if** rule (**odd** instead of even). They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

How must the code be changed so that the **sum of the odd numbers** is computed?

Use the same idea as task **06_1**: `a = 1`, `b = 5`, loop `i` from `a` to `b`, a running total `sum`, print a line after every `i`, then a line for the total. Only the **rule inside the `if`** changes (odd instead of even). Use English labels **`Sum`** and **`Total sum`** in the printouts (see 06_1).

## The task, simply said

- Keep the same loop shape as in task **06_1**.
- Add to `sum` only when `i` is **odd** (1, 3, 5 in this range).
- Print each step and the final total, like before.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| *(nothing)* | Six lines (see below). |

Program output (exactly):

```text
1 | Sum: 1
2 | Sum: 1
3 | Sum: 4
4 | Sum: 4
5 | Sum: 9
Total sum: 9
```

## Little helpers

<details>
<summary>How do I test “odd” in JavaScript?</summary>

For integers, “odd” means “not even.” You can write `i % 2 !== 0` or `i % 2 === 1` (for positive `i` both work the same way).

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 06](../README.md).
