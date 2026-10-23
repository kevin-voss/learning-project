# Task 01_2 · Overtime pay

Part of [Exercise 01 · Inheritance and polymorphism](../README.md). New idea you need: **`super.method()`** inside an override. It is explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that computes the weekly pay of post office workers.

First line: an integer `n` — how many workers follow.

Then `n` lines: `name role hours`. The `role` is `worker` or `manager`. The `hours` are whole hours (`0` or more).

Pay rules:

1. A **worker** gets `20` credits per hour for the first `40` hours.
2. Every hour **above** 40 counts `30` credits (overtime).
3. A **manager** gets the worker pay **plus** a flat `100` credits bonus.

Print exactly one line per worker, in input order:

```text
<name> gets <pay> credits
```

Model this with a `Worker` class (`pay(int hours)`) and a `Manager` class that overrides `pay` and **starts from** `super.pay(hours)`. Compute each line through a `Worker` variable (a `Manager` is a `Worker`).

Use `public static void main(String[] args)`.

## The task, simply said

1. Read how many workers come next.
2. For each line, build a `Worker` or a `Manager`.
3. Ask that object for its pay — the same call for both.
4. Print the line.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `ana worker 10` | `ana gets 200 credits` |
| `1` then `ben worker 40` | `ben gets 800 credits` |
| `1` then `ben worker 41` | `ben gets 830 credits` |
| `1` then `cy manager 40` | `cy gets 900 credits` |
| `1` then `dee worker 0` | `dee gets 0 credits` |

## Little helpers

<details>
<summary>How do I use the worker pay inside Manager?</summary>

`super.pay(hours)` is the parent's answer. Your override returns that, plus the extra.

</details>

<details>
<summary>Do I need an if for the overtime?</summary>

Inside `Worker.pay` yes, one `if` on `hours > 40` (or `Math.min`). The overtime rule belongs to the worker; the bonus belongs to the manager.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `Manager.pay` calls `super.pay(hours)`; the bonus number `100` appears nowhere else.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 01](../README.md).
