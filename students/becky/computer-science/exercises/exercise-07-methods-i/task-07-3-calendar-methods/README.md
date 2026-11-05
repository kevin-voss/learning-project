# Task 07_3 · Calendar methods

Part of [Exercise 07 · Methods I](../README.md). New ideas you need: methods that return `boolean`, `int`, and `String`; methods calling methods. Leap-year rules are in [exercise 04](../../exercise-04-branching/README.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `CalendarMethods.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

**a)** Write a method that returns whether a given year is a leap year.

**b)** Write a method that returns how many days a given month (1–12) has in a given year. Use the leap-year method for February.

**c)** Write a method that returns whether a given date (day, month, year) is valid. The month must be 1–12 and the day must be 1 through the last day of that month. Use the days-in-month method.

**d)** Write a method that, for a given date (day, month, year), returns the **next day's date as a String** (for example `1.3.2024`). Use the other methods as needed.

**e)** Write a `main` method that reads day, month and year from the user. If the date is invalid, print an error message. If it is valid, print the next day's date.

*Hint from the sheet:* You already worked out many of these calculations in the branching exercise — now split them into methods.

## The task, simply said

1. **a)** `isLeapYear(year)` → `true` or `false` (same rule as exercise 04).
2. **b)** `daysInMonth(month, year)` → 28, 29, 30 or 31.
3. **c)** `isValidDate(day, month, year)` → check month range and day ≤ days in month.
4. **d)** `nextDay(day, month, year)` → add one day, roll month/year when needed; return text `day.month.year`.
5. **e)** Read three numbers; if invalid print **`Invalid date.`**; else print the string from `nextDay`.

## Test examples

Your program is right when it gives exactly these answers.

| Day | Month | Year | The program says |
|-----|-------|------|------------------|
| 31 | 12 | 2024 | `1.1.2025` |
| 28 | 2 | 2024 | `29.2.2024` |
| 31 | 1 | 2025 | `1.2.2025` |
| 29 | 2 | 2023 | `Invalid date.` |
| 31 | 4 | 2025 | `Invalid date.` |
| 15 | 13 | 2025 | `Invalid date.` |

(Only the **result line** is checked in tests — not the words you use to ask for day, month, year.)

## Little helpers

<details>
<summary>nextDay on an invalid date</summary>

The sheet focuses on valid dates in part (d). In `main`, check validity **before** you call `nextDay`.

</details>

<details>
<summary>String format</summary>

Use dots between numbers, no leading zeros required: `1.1.2025` not `01.01.2025`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You have at least four helper methods plus `main`.
- [ ] You can point to where one method calls another.

Next: [Task 07_4 · String and array methods](../task-07-4-string-and-array-methods/README.md).
