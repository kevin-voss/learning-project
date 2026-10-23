# Task 06_3 · Boxed twins

Part of [Exercise 06 · Equals and hashCode](../README.md). New ideas you need: **wrapper**, **Integer cache**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that compares two boxed numbers — and catches the famous `==` trap red-handed.

One line with two integers `a` and `b`.

Store each number in an `Integer` box: `Integer a = Integer.valueOf(...)` and the same for `b`. `Integer` is the object around an `int` — a wrapper — and two boxes can sit at different addresses while holding the same number.

Print exactly three lines:

1. `equals: <a.equals(b)>` — same number inside the boxes?
2. `==: <a == b>` — the very same box?
3. `cached: yes` when **both** values are between `-128` and `127` (both borders included), otherwise `cached: no`

The point: Java keeps one shared shelf of boxes for the values `-128` to `127`. Two equal small numbers are literally the same box, so `==` says `true`. From `128` upwards every number gets a fresh box, so `==` says `false` even when the numbers are equal. The rule that survives every case: **compare objects with `equals`, never with `==`** — `Integer` and `String` included.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. Read the two numbers from one line.
2. Box each one in an `Integer` with `Integer.valueOf(...)`.
3. Print `equals:` — do the boxes hold the same number?
4. Print `==:` — are they the same box?
5. Print `cached:` — do both numbers sit in the -128..127 shelf?

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `127 127` | `equals: true`, `==: true`, `cached: yes` (the shelf had the box) |
| `128 128` | `equals: true`, `==: false`, `cached: no` (two fresh boxes, same number) |
| `-128 -128` | `equals: true`, `==: true`, `cached: yes` (the shelf starts here) |
| `-129 -129` | `equals: true`, `==: false`, `cached: no` (one below the shelf) |
| `5 6` | `equals: false`, `==: false`, `cached: yes` (different numbers: not equal at all) |
| `1000 2000` | `equals: false`, `==: false`, `cached: no` |

## Little helpers

<details>
<summary>Why does <code>==</code> say true for 127 and false for 128?</summary>

The **Integer cache**: Java keeps one shared box per value from `-128` to `127`. Ask twice for `127` and you get the same box twice. Ask twice for `128` and you get two fresh boxes — equal numbers, different boxes. `equals` looks inside the boxes, so it says `true` in both cases.

</details>

<details>
<summary>How do I check "between -128 and 127, borders included"?</summary>

`v >= -128 && v <= 127`. Do this check for `a` **and** for `b` — both numbers must sit on the shelf for `cached: yes`.

</details>

<details>
<summary>Why the extra parentheses around <code>(a == b)</code>?</summary>

`+` binds tighter than `==`. Without the parentheses Java glues the text first and then tries to compare text with a box — the compiler stops right there. Write `"==: " + (a == b)`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `a` and `b` are `Integer` boxes made with `Integer.valueOf(...)`, and the three lines print in order.
- [ ] You can say in one sentence why `127 127` prints `==: true` and `128 128` prints `==: false`.

Back to [Exercise 06](../README.md).
