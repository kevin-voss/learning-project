# Task 04_3 · Date: calendar guard

Part of [Exercise 04 · Branching](../README.md). New ideas you need: `switch`, `%`, leap years. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `DateCheck.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a program that reads a date as three numbers for day (1-31), month (1-12) and year. The program must check and print whether it is a valid date. A date is valid if the month is between 1 and 12 and the day is between 1 and the last day of the month. The last day of the month depends on the month:

- 31 for the months January, March, May, July, August, October and December
- 30 for the months April, June, September, November
- 28 for the month February, or 29 in a leap year

A year is a leap year if it is divisible by 4. But years that are divisible by 100 and not by 400 are not leap years.

## The task, simply said

1. Ask for day, month, year.
2. Find out if the year is a leap year.
3. Find out how many days the month has (28, 29, 30 or 31).
4. Valid if the month is 1–12 **and** the day is 1 up to that last day.
5. Print if the date is valid or not.

## Test examples

Your program is right when it gives exactly these answers.

| Day | Month | Year | Answer |
|-----|-------|------|--------|
| 29 | 2 | 2024 | valid (leap year) |
| 29 | 2 | 2023 | NOT valid |
| 29 | 2 | 1900 | NOT valid (÷100 but not ÷400) |
| 29 | 2 | 2000 | valid (÷400) |
| 31 | 4 | 2025 | NOT valid (April has 30) |
| 31 | 12 | 2025 | valid |
| 0 | 5 | 2025 | NOT valid |
| 15 | 13 | 2025 | NOT valid |

## Little helpers

<details>
<summary>How do I write "divisible by 4"?</summary>

`year % 4 == 0`. "Not divisible by 100" is `year % 100 != 0`.

</details>

<details>
<summary>February always has 28 days in my program</summary>

Inside `case 2:` you need a small `if (leapYear)` with 29, `else` 28.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can explain the leap-year rule with 1900 and 2000.
- [ ] You can explain your code out loud in your own words.

That was the last task of this exercise. Set all three to `done` in the [Exercise](../README.md) and commit.
