# Task 05_2 · Running stats

Part of [Exercise 05 · Loops](../README.md). New ideas you need: `while`, accumulator, average. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `RunningStats.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a program that repeatedly asks the user to enter a number. After each input the program prints the count, the sum and the average of the values entered so far and then asks for another input. The program only ends when a negative number is entered.

Example program run:

```text
Next number: 100
Count: 1
Sum: 100
Average: 100.0
Next number: 200
Count: 2
Sum: 300
Average: 150.0
Next number: 50
Count: 3
Sum: 350
Average: 116.66666666666667
Next number: 300
Count: 4
Sum: 650
Average: 162.5
Next number: -1
```

(The German sheet writes "Durschnitt" for average — a spelling slip. Use **Average** in English.)

## The task, simply said

1. Ask for a number.
2. If it is negative → stop. Do not count it.
3. If it is zero or positive → add it to the piggy bank (count +1, sum += number).
4. Print count, sum and average.
5. Ask again. Go back to step 2.

## Test examples

Your program is right when it gives exactly these answers.

| Numbers typed (last is stop) | After the last valid number |
|------------------------------|-----------------------------|
| 100, 200, 50, 300, −1 | Count 4, Sum 650, Average 162.5 (the sheet) |
| 10, −5 | Count 1, Sum 10, Average 10.0 |
| 0, 0, −1 | Count 2, Sum 0, Average 0.0 (zero counts!) |
| −1 | No count/sum/average lines (stops at once) |

## Little helpers

<details>
<summary>The negative number is counted too</summary>

Read the number **before** you add it. Only update count and sum when `number >= 0`.

</details>

<details>
<summary>Average is always a whole number (116 instead of 116.66…)</summary>

`sum / count` with two `int`s stays whole. Write `(double) sum / count`.

</details>

<details>
<summary>The loop never ends</summary>

You must read a **new** number inside the loop. Otherwise the first number is checked forever.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can say why the stop number is not added to the sum.
- [ ] You can explain your code out loud in your own words.

Next: [Task 05_3](../task-05-3-multiplication-table/README.md)
