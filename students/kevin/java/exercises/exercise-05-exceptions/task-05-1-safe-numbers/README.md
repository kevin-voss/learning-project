# Task 05_1 · Safe numbers

Part of [Exercise 05 · Exceptions](../README.md). New ideas you need: **try/catch**, **`NumberFormatException`**, **exception messages**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program for the post office counter. The counter receives `n` tokens, and some are not numbers.

First line: an integer `n` — how many tokens follow.

Then `n` lines, each holding one token (letters, digits, minus signs — anything without spaces).

For each line:

1. Try `Integer.parseInt` on the token. When it works, the token is **valid**: nothing is printed for it, it is counted and its value joins the sum.
2. When it throws, catch it and print `skip: <token>`.

After all lines print exactly these three lines, in this order:

```text
sum: <S>
valid: <V>
invalid: <I>
```

Negative whole numbers like `-5` **are** valid. The program must not crash on any token.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read how many tokens come next.
2. For each token: try to parse it as a number, inside a `try`.
3. Alarm → the catch prints `skip: <token>` and counts one invalid.
4. No alarm → the value joins the sum and counts one valid.
5. At the end print `sum:`, `valid:` and `invalid:`, in that order.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `4` then `10` / `abc` / `-5` / `3` | `skip: abc`, then `sum: 8` / `valid: 3` / `invalid: 1` |
| `3` then `7` / `-2` / `20` | `sum: 25` / `valid: 3` / `invalid: 0` (no skip lines) |
| `1` then `xyz` | `skip: xyz`, then `sum: 0` / `valid: 0` / `invalid: 1` |
| `0` | `sum: 0` / `valid: 0` / `invalid: 0` |

## Little helpers

<details>
<summary>How does trying a parse tell me the token is bad?</summary>

Put `Integer.parseInt(token)` inside a `try`. A token that is not a number sounds the `NumberFormatException` alarm, and Java jumps straight to your `catch`. That catch is where the skip line prints and `invalid` grows.

</details>

<details>
<summary>Is -5 a number?</summary>

Yes. `Integer.parseInt("-5")` returns `-5`; the minus sign belongs to the number. Only text that cannot be a whole number sounds the alarm.

</details>

<details>
<summary>Where do sum, valid and invalid come from?</summary>

Three counters, all starting at 0. Grow them while you read, one per line. Print the three report lines after the loop, in the fixed order: sum, valid, invalid.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] A bad token prints `skip: <token>` — the program never crashes and reads every line.
- [ ] You can explain your code out loud in your own words.

Next: [Task 05_2](../task-05-2-vending-machine/README.md)
