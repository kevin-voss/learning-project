# Task 11_1 · Overdue stamps

Part of [Exercise 11 · Dates and money](../README.md). New ideas you need: **`LocalDate.parse`**, **`isAfter`**, **`ChronoUnit.DAYS.between`**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

The post office counter must know how late every parcel is. Write a Java program that reads the parcels of one day and prints each parcel's stamp.

First line: an integer `n` — how many parcels follow.

Then `n` lines, each: `title due return`.

- `title` is one word: the name of the parcel.
- `due` and `return` are dates as ISO text, `yyyy-MM-dd` (for example `2026-10-01`).

Print exactly one line per parcel, in input order:

- return is **not after** due → `<title>: on time`
- return is after due → `<title>: late <d> days`, where `<d>` is the number of days between due and return

After all parcel lines, print one more line:

```text
total fee: <sum> cents
```

The fee is `20` cents for every late day, added up over all late parcels. With `n = 0` the program prints only `total fee: 0 cents`.

Use `LocalDate.parse`, `ChronoUnit.DAYS.between` and `isAfter` — no calendar math of your own.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. Read how many parcels come next.
2. For each line, read the title and turn both dates into `LocalDate` with `parse`.
3. Is the return date after the due date? No → print `on time`. Yes → count the days with the ruler and print `late <d> days`.
4. Add `20` cents to one total for every late day.
5. After all parcels, print `total fee: <total> cents`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `book 2026-10-01 2026-10-01` | `book: on time` and `total fee: 0 cents` |
| `1` then `book 2026-10-01 2026-10-02` | `book: late 1 days` and `total fee: 20 cents` |
| `1` then `card 2025-01-29 2025-02-01` | `card: late 3 days` and `total fee: 60 cents` |
| `1` then `parcel 2024-02-28 2024-03-01` | `parcel: late 2 days` and `total fee: 40 cents` |
| `1` then `gift 2026-10-10 2026-10-01` | `gift: on time` and `total fee: 0 cents` |
| `0` | `total fee: 0 cents` |
| `3` then `book 2026-05-01 2026-05-01` / `lamp 2026-05-01 2026-05-04` / `toy 2026-05-10 2026-05-09` | `book: on time`, `lamp: late 3 days`, `toy: on time` and `total fee: 60 cents` |

The leap row is the proof that the ruler counts `2024-02-29`: two days, not one.

## Little helpers

<details>
<summary>How do I count the days between the two dates?</summary>

`ChronoUnit.DAYS.between(due, returnDay)` is the ruler. Put the earlier date first, then the count is positive. Careful: `return` is a Java keyword, so name your variable `returnDay` or `returned`.

</details>

<details>
<summary>Why does my early parcel print a negative number of days?</summary>

`between(a, b)` counts forward: when `b` lies before `a`, the answer is negative. Ask `isAfter` first, and only count when it says yes.

</details>

<details>
<summary>Do I have to split 2026-10-01 into year, month and day myself?</summary>

No. `LocalDate.parse("2026-10-01")` does the whole job — that is the point of the sheet.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You parse, compare and count with `LocalDate.parse`, `isAfter` and `ChronoUnit.DAYS.between` — no month math of your own.
- [ ] You can explain your code out loud in your own words.

Next: [Task 11_2](../task-11-2-exact-money/README.md)
