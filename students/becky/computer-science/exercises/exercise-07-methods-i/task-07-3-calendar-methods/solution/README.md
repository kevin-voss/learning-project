# Sample solution · Task 07_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

```bash
javac CalendarMethods.java
java CalendarMethods
```

Type three numbers (day, month, year), each followed by Enter. The sample reads them without extra prompts so automated tests can feed the numbers.

## How it works, step by step

1. **`isLeapYear`** — same rule as exercise 04: ÷4 yes, ÷100 no, ÷400 yes again.
2. **`daysInMonth`** — `switch` on month; February asks `isLeapYear`.
3. **`isValidDate`** — month in 1..12 and day in 1..lastDay.
4. **`nextDay`** — add one to the day; if it passes the month's length, set day to 1 and bump month (and year if needed).
5. **`main`** — read three ints; invalid → `Invalid date.`; valid → print the string from `nextDay`.

**Test runs**

```text
31 12 2024  →  1.1.2025
28 2 2024   →  29.2.2024
31 1 2025   →  1.2.2025
29 2 2023   →  Invalid date.
31 4 2025   →  Invalid date.
15 13 2025  →  Invalid date.
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Copied leap rule wrong | 1900/2000 surprises | Use the full ÷4, ÷100, ÷400 rule |
| `nextDay` before check | Garbage on bad input | Validate in `main` first |
| Forgot December → January | 32.12.2024 | When month > 12, month = 1 and year++ |
| February always 28 | 29.2.2024 fails | Call `isLeapYear` in `daysInMonth` |
