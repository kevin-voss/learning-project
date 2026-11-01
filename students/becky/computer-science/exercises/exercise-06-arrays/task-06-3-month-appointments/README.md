# Task 06_3 · Month appointments

Part of [Exercise 06 · Arrays](../README.md). New ideas you need: `String[][]`, nested loops, menu in a loop. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

**a)** Write a program to manage appointments in one month (day 1 through day 31). For each full hour of the day (0 through 23) a text entry should be possible. Create a two-dimensional array for the appointments and initialize every day so that hours **7 through 22** hold a single space `" "` and all other hours hold the text `Sleeping`.

**b)** Extend your solution with a loop that lets the user choose:

- **E** — Enter a new appointment: read day, hour, and appointment text, then store the text in the right place in the array.
- **A** — Show all appointments for one day: read the day, then print every hour from 0 through 23 for that day.
- **Q** — Quit the program.

## The task, simply said

**Part a — build the grid**

1. Make `String[][] calendar` for days 1…31 and hours 0…23 (index 0 for days is unused, or shift — stay consistent).
2. For each day 1…31 and each hour 0…23: if hour is 7…22, store `" "`; else store `"Sleeping"`.

**Part b — menu**

1. Repeat until the user chooses **Q**:
   - Print `Action (E=enter, A=show day, Q=quit): ` and read one word.
   - **E:** ask `Day: `, `Hour: `, `Appointment: ` (one line of text). If day is 1…31 and hour is 0…23, save the text in the grid. Otherwise print `Invalid day or hour.`
   - **A:** ask `Day: `. If day is 1…31, print 24 lines: `Hour H: ` + the text in that cell (H from 0 to 23). Otherwise print `Invalid day.`
   - **Q:** stop the program.
   - Any other letter: print `Unknown action.`

**Show-day format (for tests)**

Each line looks like `Hour 7: ` followed by the cell text. A blank slot shows as one space after the colon, like `Hour 7:  ` (the sheet used a space character in those cells).

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `A`, `3`, `Q` | On day 3: hours 0–6 and 23 show `Sleeping`; hours 7–22 show a blank slot (`Hour 7:  ` with a space after the colon) |
| `E`, `5`, `10`, `Exam`, `A`, `5`, `Q` | Hour 10 on day 5 includes `Exam`; other hours follow the init rules |
| `E`, `0`, `8`, `Oops`, `Q` | `Invalid day or hour.` |
| `A`, `40`, `Q` | `Invalid day.` |
| `X`, `Q` | `Unknown action.` |

## Little helpers

<details>
<summary>After nextInt my nextLine reads an empty string</summary>

Call `scanner.nextLine()` once after `nextInt()` to swallow the rest of the line before you read the appointment text.

</details>

<details>
<summary>Day 5 hour 10 — do I use [5][10] or [4][10]?</summary>

Draw a tiny table on paper. If day 1 lives in `calendar[1][0]`, then day 5 hour 10 is `calendar[5][10]`. If you store day 1 in `calendar[0][0]`, you must subtract 1 from the day. Match what you check in **E** and **A**.

</details>

## Done when

- [ ] Part **a**: a fresh day shows `Sleeping` at night and blank slots from 7 to 22.
- [ ] Part **b**: **E** stores text, **A** prints all 24 hours, **Q** exits.
- [ ] Every test example above gives the right answer.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 06](../README.md).
