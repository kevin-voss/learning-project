# Task 02_2 · Limits of long

Part of [Exercise 02 · Data types and variables](../README.md). New ideas you need: `long` and its limits, literals with `L` and underscores, gluing with `+`. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `LongLimits.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a Java program that prints the **smallest** and the **biggest** whole number of the data type `long` to the console as a **literal**.

**Requirements**

- Find the exact values with a suitable tool (e.g. the JDK documentation, `Long.MIN_VALUE` / `Long.MAX_VALUE` in the interactive shell, or a reference in the lecture notes).  
- Use the numbers in the program as **`long` literals** (for very big positive values: the suffix `L`).

**Typical output (to check)**

- Minimum: `-9223372036854775808`  
- Maximum: `9223372036854775807`  

Optionally you can also print the same constants from the class `java.lang.Long` and compare them with your literals.

## The task, simply said

1. Find out the smallest and the biggest number a `long` box can hold. (Tool: type `jshell` in the terminal, then `Long.MAX_VALUE`. Or look it up.)
2. Write both numbers **as digits** into your code, in two `long` boxes. That is what "as a literal" means.
3. Big numbers need an `L` at the end. Underscores are allowed to make them readable.
4. Print both, each with a label.
5. Optional: print `Long.MIN_VALUE` and `Long.MAX_VALUE` too and compare.

## Test examples

Your program is right when it gives exactly these answers.

| You run | The program says |
|---------|------------------|
| `java LongLimits` | `Minimum: -9223372036854775808` |
| | `Maximum: 9223372036854775807` |
| (optional) `Long.MIN_VALUE` and `Long.MAX_VALUE` printed too | the same two numbers, digit by digit |

Count the digits: both have **19** digits. The minimum ends in **8**, the maximum in **7**. If yours end differently, look again.

Bonus to try: what does your program print for `biggest + 1`? (Put brackets around it when you glue it to a label.)

## Your first try

What is already good:

- Both numbers are right, digit for digit, and you wrote them as real literals with underscores and the `L`. Exactly what the sheet means by "as a literal".
- You also wrote both values in a comment above the code, so anyone can check them at a glance.

What is still open:

- Your boxes are declared as `Long` with a capital L. That is a "wrapper" (idea 7 on the exercise page) and only works here because Java quietly converts it. The task asks for the plain type: try it with a small `l`.
- Run it and look at the output: both values sit in one line, and the second label is glued straight to the first number. One line each, like the "typical output" on the sheet, is easier to read.

## Little helpers

<details>
<summary>Java says "integer number too large"</summary>

Without an `L`, Java reads every whole-number literal as an `int`, and an `int` only goes up to about 2.1 billion. Put an `L` at the end of the number. (Capital `L`: a small `l` also works, but looks like the digit `1`.)

</details>

<details>
<summary>How do I use jshell?</summary>

Type `jshell` in the terminal and press Enter. Then type `Long.MAX_VALUE` and Enter: it shows the number. `/exit` leaves jshell. It is a little playground for single Java lines.

</details>

<details>
<summary>Why is the minimum one bigger than the maximum?</summary>

Zero sits on the plus side. From 0 up to the maximum are exactly as many numbers as from −1 down to the minimum. The exercise page (idea 7) has the picture.

</details>

## Done when

- [ ] Both limits are written as `long` literals in your code (not copied from `Long.MIN_VALUE` at runtime).
- [ ] The output shows both numbers, each with a label, and they match the test example.
- [ ] You can say why the `L` is needed.
- [ ] You can explain your code out loud in your own words.

Next: [Task 02_3](../task-02-3-sum-with-exponents/README.md)
