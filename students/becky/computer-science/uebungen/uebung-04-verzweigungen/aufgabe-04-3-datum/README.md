# Aufgabe 04_3 · Datum: calendar guard

Part of [Übung 04 · Verzweigungen](../README.md). New ideas you need: `switch`, `%`, leap years. They are all explained in the Übung page.

| Folder | What it is |
|--------|-----------|
| [`meine-loesung/`](meine-loesung/README.md) | **Your desk.** `DateCheck.java` is half-ready: fill in the `TODO`s |
| [`musterloesung/`](musterloesung/README.md) | The Musterlösung. Peek only when you are done |

## The task (original)

Schreiben Sie ein Programm, das ein Datum in Form dreier Zahlen für Tag (1-31), Monat (1-12) und Jahr einliest. Das Programm soll prüfen und ausgeben, ob es sich um ein gültiges Datum handelt. Ein gültiges Datum liegt vor, wenn der Monat zwischen 1 und 12 liegt und der Tag zwischen 1 und dem letzten Tag des Monats. Der letzte Tag des Monats ist dabei abhängig vom Monat:

- 31 für die Monate Januar, März, Mai, Juli, August, Oktober und Dezember
- 30 für die Monate April, Juni, September, November
- 28 für den Monat Februar bzw. 29 im Falle eines Schaltjahres

Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist. Jahre, die durch 100, aber nicht durch 400 teilbar sind, sind aber keine Schaltjahre.

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

That was the last Aufgabe of this Übung. Set all three to `done` in the [Übung](../README.md) and commit.
