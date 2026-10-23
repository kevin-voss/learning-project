# Task 02_1 · Payment counter

Part of [Exercise 02 · Interfaces](../README.md). New ideas you need: **interface**, **implements**, **default method**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that prints a receipt line for every payment at the counter.

First line: an integer `n` — how many payments follow.

Then `n` lines: `method cents`. The `method` is `card`, `cash` or `coupon`; `cents` is a whole number.

Print one line per payment, in input order:

| Method | Print |
|--------|-------|
| `card` | `paid <cents> cents by card` |
| `cash` | `paid <cents> cents by cash` |
| `coupon` | `coupon for <cents> cents` |

After all payments print `total: <sum> cents` (the sum of every line, coupons included).

Model it with an interface `Payment` that promises `String name()` and offers a **default** method `String receipt(int cents)` producing the `paid … by …` text. `Card`, `Cash` and `Coupon` implement it; only `Coupon` **overrides** the default receipt. Print every line by calling `receipt` through a `Payment` variable.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read how many payments come next.
2. For each line, build a `Card`, `Cash` or `Coupon` — all three are a `Payment`.
3. Print `payment.receipt(cents)`.
4. Add the cents to a running total.
5. Print the total at the end.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `card 450` | `paid 450 cents by card` then `total: 450 cents` |
| `1` then `cash 100` | `paid 100 cents by cash` then `total: 100 cents` |
| `1` then `coupon 300` | `coupon for 300 cents` then `total: 300 cents` |
| `2` then `card 450` / `coupon 300` | the two lines above, then `total: 750 cents` |
| `0` | `total: 0 cents` |

## Little helpers

<details>
<summary>Where does the "paid … by …" text live?</summary>

Once, in the interface's default `receipt`. `Card` and `Cash` write nothing for it. `Coupon` overrides `receipt` with its own sentence.

</details>

<details>
<summary>The compiler says name() has weaker access</summary>

Interface methods are public. Write `public String name()` in the classes.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `Card` and `Cash` contain no receipt text; the coupon text exists only in `Coupon`.
- [ ] You can explain your code out loud in your own words.

Next: [Task 02_2](../task-02-2-bird-watcher/README.md)
