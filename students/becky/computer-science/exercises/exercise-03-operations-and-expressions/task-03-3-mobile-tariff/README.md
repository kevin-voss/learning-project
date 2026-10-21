# Task 03_3 · Mobile tariff: phone bill

Part of [Exercise 03 · Operations and expressions](../README.md). New ideas you need: `final` constants, units, times before plus, `int / int`, the `(int)` cast. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** `MobileTariff.java` is half-ready: fill in the `TODO`s |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Take a mobile phone tariff with the following conditions:

- **Monthly base fee:** 9.95 EUR
- **Data volume:** 5 GB included, after that **2.95 EUR** per **500 MB**
- **Phone calls:** 100 minutes included, after that **9 cents** per minute

Write a program that asks the user for the **monthly data volume in GB** (without decimal places) and the **number of monthly phone minutes** (without decimal places), and from that extrapolates the **yearly costs** in this mobile tariff.

Since this is a rough estimate, the calculated **yearly costs must be printed as euro amounts without decimal places**.

**Test values (to check)**

| Data volume | Phone minutes | Yearly costs |
|-------------|---------------|--------------|
| 5 GB        | 100 minutes   | 119 EUR      |
| 5 GB        | 150 minutes   | 173 EUR      |
| 5 GB        | 200 minutes   | 227 EUR      |
| 7 GB        | 100 minutes   | 261 EUR      |
| 7 GB        | 150 minutes   | 315 EUR      |
| 7 GB        | 200 minutes   | 369 EUR      |
| 10 GB       | 100 minutes   | 473 EUR      |
| 10 GB       | 150 minutes   | 527 EUR      |
| 10 GB       | 200 minutes   | 581 EUR      |

Test your program with these example values, among others.

**Reflection**

Your program probably gives wrong values when **less than 5 GB** or **less than 100 minutes** are entered. **Why is that?** (Answer in writing, e.g. in this README under a heading of your own or as a comment in the source code — **without** putting the solution here in advance.)

**Requirements**

- Keep the tariff values (base fee, included volume, prices, included minutes) in the program as constants or clearly named values.
- **Test** the program with the table above and your own inputs.

**Hints**

- The class name and the file name must match.
- Make sure you use the units (GB, MB, EUR, cent) consistently in the calculation.

(The sheet writes 9,95 and 2,95 with a decimal comma. Here they are 9.95 and 2.95, like in Java.)

## The task, simply said

1. Put every number of the tariff in a `final` box. They are all **per month**.
2. Ask: how many GB per month? How many minutes per month? (whole numbers)
3. How much is used **on top of** the free 5 GB and the free 100 minutes?
4. Extra data is paid in blocks of **500 MB**, 2.95 EUR each. How many blocks are the extra GB?
5. Extra minutes cost **9 cent** each. That is 0.09 EUR.
6. One month = fee + data blocks + extra minutes.
7. One year = 12 months.
8. Print the yearly cost **without** digits after the dot.
9. Try 3 GB with 100 minutes, then 5 GB with 50 minutes. Answer the reflection question in your own words.

## Test examples

Your program is right when it gives exactly these answers.

| GB per month | Minutes per month | The program says |
|--------------|-------------------|------------------|
| 5 | 100 | Yearly cost: 119 EUR ← only the fee |
| 5 | 150 | Yearly cost: 173 EUR |
| 5 | 200 | Yearly cost: 227 EUR |
| 7 | 100 | Yearly cost: 261 EUR |
| 7 | 150 | Yearly cost: 315 EUR |
| 7 | 200 | Yearly cost: 369 EUR |
| 10 | 100 | Yearly cost: 473 EUR |
| 10 | 150 | Yearly cost: 527 EUR |
| 10 | 200 | Yearly cost: 581 EUR |
| 6 | 100 | Yearly cost: 190 EUR (one extra GB) |
| 5 | 101 | Yearly cost: 120 EUR (one extra minute) |
| 8 | 130 | Yearly cost: 364 EUR |

The first nine rows are the table from the sheet. For fewer than 5 GB or fewer than 100 minutes there is no "right" answer yet: see the reflection question.

## Your first try

What is already good:

- All tariff values have their own named box, and you spotted that one extra GB means **two** 500-MB blocks.
- You already noticed the program cannot be fully right without `if`. That is exactly the reflection question, so write your thought down in your own words.

What is still open:

- The free 5 GB and 100 minutes are a **monthly** gift. Look at the moment when your program turns a month into a year, and at the moment when it takes away the free amount. Which should come first? Work out 5 GB and 100 minutes by hand and compare it with your program.
- Your program works out a total, but it prints a different box. Check which number ends up on the screen, and that it has no digits after the dot.

## Little helpers

<details>
<summary>5 GB and 100 minutes do not give 119</summary>

With nothing on top, the bill is only the fee: 9.95 × 12 = 119.4. If you get something else, print your boxes one by one (`extraGb`, `extraMinutes`, the monthly cost) and see where the first wrong number appears.

</details>

<details>
<summary>How do I turn GB into 500-MB blocks?</summary>

Same unit first: how many MB are in one GB? Then: how many times do 500 MB fit into that? Two small steps, two lines.

</details>

<details>
<summary>9 cent or 9 EUR?</summary>

Everything else is in EUR. So 9 cent must be written in EUR too.

</details>

<details>
<summary>How do I get rid of the digits after the dot?</summary>

One of the casts from the exercise page does exactly this (idea 7). The table cannot tell you if it should chop or round, because every real result ends in `.0` or `.4`. Both give the same nine numbers.

</details>

## Done when

- [ ] All nine rows of the sheet's table give the right answer, plus the three extra rows.
- [ ] Every tariff value is a `final` constant, and 9 cent is written in EUR.
- [ ] You answered the reflection question in your own words (as a comment in your code or here under a heading of your own).
- [ ] You can explain your code out loud in your own words.

That was the last task of this exercise. Set all three to `done` in the [Exercise](../README.md) and commit.
