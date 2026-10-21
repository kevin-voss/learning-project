# Task 02_3 · Sum with exponents

Part of [Exercise 02 · Data types and variables](../README.md). New ideas you need: `double`, e-notation, "a `double` has only about 16 digits". They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `FloatingSum.java` yourself, and your answers in its `README.md` |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

### a) Program

Write a Java program that calculates and prints the following sum. Use **exponential notation** for floating-point numbers (`double`):

> 2.34 · 10⁶ + 3.45 + 4.56 · 10⁻⁶ + 5.67 · 10⁻¹²

**Java literals (example)**

| Term | How to write it in Java |
|------|-------------------------|
| 2.34 · 10⁶ | `2.34e6` |
| 3.45 | `3.45` |
| 4.56 · 10⁻⁶ | `4.56e-6` |
| 5.67 · 10⁻¹² | `5.67e-12` |

Calculate in one expression or in steps; print the **result** to the console.

### b) Reflection (in writing, e.g. in the README of the task or as a comment)

Does the program give the result you would expect by the rules of **exact mathematics**? **Explain it mathematically.**

**Pointers for the explanation (without a finished answer)**

- In mathematics the four terms all have different orders of magnitude; the exact sum contains a part of every term.  
- `double` works with **limited precision** (IEEE-754, about 15–16 significant decimal digits).  
- The term 2.34 · 10⁶ dominates the sum; very small terms (10⁻⁶, 10⁻¹²) can **no longer be fully** represented in the mantissa when they are added to such a big intermediate value (**cancellation / rounding**).  
- Compare: exact rational calculation or the rough order of magnitude of the sum vs. the real program output.

(The sheet writes the numbers with a decimal comma, like 2,34. Here they use a dot, like in Java. The formula is written with · and small raised numbers, so it shows on every screen.)

## The task, simply said

1. a) Write the four numbers in Java's e-notation, add them, print the result.
2. b) Compare Java's answer with the **exact** answer from maths.
3. b) Are they the same? Explain **why** (or why not) in a few sentences, using what you know about `double`.

## Test examples

Your program is right when it gives exactly these answers.

| You run | The program says |
|---------|------------------|
| `java FloatingSum` | `Sum: 2340003.4500045604` |

The **exact** sum from maths, worked out by hand, to compare with in part b):

```text
2340003.450004560005670
```

The same, in groups of three so you can count: `2 340 003 . 450 004 560 005 670`.

## Your first try

What is already good:

- Part a) is right: all four numbers in correct e-notation, added in one expression, and the output is exactly the test example.
- You compared your result with a second tool. Checking a result another way is exactly the right instinct.

What is still open:

- Part b): "identical to the calculator" is not yet an answer to the sheet's question. The question is about **exact mathematics**, not about another machine. Use the guiding questions below.
- The formula in your code comment (and in your notes) does not match the sheet: compare it term by term. Your code itself is right; only the comment is off.

## Questions that guide you to b)

Answer them on your desk (`my-solution/README.md`). Together they become your explanation.

1. Put Java's answer and the exact answer one under the other, dots lined up. From which digit on are they different?
2. Count the digits of the exact answer: before the dot and after the dot together. How many are there?
3. The exercise page (idea 9) says a `double` keeps about 15–16 digits. Compare that with your count from question 2. What has to happen to the rest?
4. Which of the four numbers lives furthest to the right, after the dot? Can its digits still fit into those ~16 windows next to 2 340 003?
5. Experiment: remove `+ 5.67e-12` from your program and run it again. What changes in the output? What does that tell you?
6. Your calculator showed the same as Java. How many digits can your calculator display? Does "two machines agree" prove "this is the exact maths"?

<details>
<summary>I do not know how to start the explanation</summary>

Start with a sentence like: "No, because a `double` can only keep about … digits, but the exact sum needs … digits." Then say which number gets lost, and how your experiment from question 5 proves it.

</details>

<details>
<summary>Java says "&lt;identifier&gt; expected" or "bad operand types for binary operator '^'"</summary>

You wrote `2,34` (a comma) or `10^6`. In Java a number has a dot, and "times 10 to the 6" is written `e6`: `2.34e6`.

</details>

## Done when

- [ ] a) prints `2340003.4500045604`.
- [ ] b) you answered "yes" or "no" **and** explained why in your own words, with the digit counts.
- [ ] b) you did the experiment from question 5 and wrote what it shows.
- [ ] You can explain your code out loud in your own words.

That was the last task of this exercise. Set all three to `done` in the [Exercise](../README.md), then go on to [Exercise 03](../../exercise-03-operations-and-expressions/README.md).
