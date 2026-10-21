# Task 03_1 · IT consultant: consultant's bill

Part of [Exercise 03 · Operations and expressions](../README.md). New ideas you need: `final` constants, `int` × `double`, gluing text and numbers, one `Scanner`. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `ConsultantInvoice.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

A self-employed consultant in the IT industry charges his customers **120 EUR** for every hour of work done. On top of that come travel costs, which are charged at a flat rate of **0.75 EUR** per kilometre driven. Only **full hours of work** and **whole kilometres** are billed.

Write a program that reads the number of hours worked and the number of kilometres driven, and from them works out the **total cost** of the job. Design the output so that the calculation can be followed step by step, for example like this:

```text
Hours: 70
Kilometres: 490
Work cost: 70 hours at 120.0 EUR each = 8400.0
Travel cost: 490 km at 0.75 EUR each = 367.5
Total cost: 8767.5 EUR
```

**Requirements**

- The **hourly rate** and the **flat rate per kilometre** must appear in the program as **constants**.
- Follow the **naming conventions** for variables (`camelCase`, meaningful names).
- **Test** the program (your own values and the example values).

**Hints**

- Input and output on the console.
- The class name and the file name must match (as in the exercises so far).

(The sheet writes 0,75 with a decimal comma. Here it is 0.75, like in Java.)

## The task, simply said

1. Put the two prices in `final` boxes: 120 EUR per hour, 0.75 EUR per km.
2. Ask: how many hours? (whole number)
3. Ask: how many kilometres? (whole number)
4. Work cost = hours × price per hour.
5. Travel cost = kilometres × price per km.
6. Total = work cost + travel cost.
7. Print it like the example: one line per step, so the customer can check every number.

## Test examples

Your program is right when it gives exactly these answers.

| Hours | km | The program says |
|-------|----|------------------|
| 70 | 490 | `Work cost: 70 hours at 120.0 EUR each = 8400.0`<br>`Travel cost: 490 km at 0.75 EUR each = 367.5`<br>`Total cost: 8767.5 EUR` ← the example from the sheet |
| 0 | 0 | `… = 0.0` · `… = 0.0` · `Total cost: 0.0 EUR` (nothing done, nothing to pay) |
| 1 | 1 | `… = 120.0` · `… = 0.75` · `Total cost: 120.75 EUR` |
| 8 | 120 | `… = 960.0` · `… = 90.0` · `Total cost: 1050.0 EUR` (one working day with a trip) |

## Your first try

What is already good:

- Your program reads both numbers and the total is right: 70 hours and 490 km give 8767.5.
- Clear names for your boxes, and you wrote the unit (`in €`) next to the prices.

What is still open:

- The sheet asks for the hourly rate and the price per km as **constants**. Right now they are ordinary boxes that could be changed by accident. Idea 5 on the exercise page shows the "pen".
- Your bill is one long line. The sheet wants it **traceable**: one line for the work, one for the travel, one for the total, like the example. Compare your output with the example word by word.

## Little helpers

<details>
<summary>How do I make a constant?</summary>

Put `final` in front of the type, and write the name in capitals. Then try to change it on the next line and see what `javac` says. (Delete that line again afterwards.)

</details>

<details>
<summary>My program crashes with <code>NoSuchElementException</code> when I pipe the input in</summary>

Count how often you wrote `new Scanner(System.in)`. It should be **once**. Every number is then read from that same `scanner`. See idea 9 on the exercise page.

</details>

<details>
<summary>My line says <code>120.0 EUR = 8400.0</code> without the hours</summary>

Text and numbers are glued with `+`. Glue in the `hours` box between `"Work cost: "` and `" hours at "`. Watch the spaces inside the quotes.

</details>

<details>
<summary>Should the price be <code>int</code> or <code>double</code>?</summary>

120 would fit in an `int`, but 0.75 has a dot. And the sheet prints `120.0`. What type prints a number with `.0`?

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] Both prices are `final` constants and are used in the calculation **and** in the printed text.
- [ ] There is only one `new Scanner(System.in)` in your file.
- [ ] You can explain your code out loud in your own words.

Next: [Task 03_2](../task-03-2-euros-and-cents/README.md)
