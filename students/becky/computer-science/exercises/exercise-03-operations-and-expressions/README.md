# Exercise 03 · Operations and expressions

| | |
|---|---|
| Student | Becky |
| Subject | Computer Science · Programming 1 (Hochschule Hannover) |
| Language | Java |
| Created | 2026-10-21 |

## The story in one sentence

Your programs become **little cash registers**: you type a few numbers, and they do the sums for you, step by step, so everybody can check the bill.

You will build three of them:

1. A **consultant's bill**: hours of work plus kilometres of driving.
2. A **piggy bank counter**: a pile of cents turned into euros, three different ways.
3. A **phone bill for a whole year**: a fee, a few free gigabytes and minutes, and extra money for everything above.

## Builds on

- **Exercise 01:** a class with `main`, `System.out.println`, `javac` and `java`.
- **Exercise 02:** boxes (variables) with a type: `int` for whole numbers, `double` for numbers with a dot. And: a `double` is not always 100 % exact.

New here: you **calculate** with those boxes, you **read** numbers from the keyboard, and you **change the type** of a number on purpose.

The big lessons on this site go deeper, if you want more: [Operators](../../../../../tracks/java/topics/operators/index.html) · [Types & Variables](../../../../../tracks/java/topics/types-and-variables/index.html) · [I/O Basics](../../../../../tracks/java/topics/io-basics/index.html) (that one is about the keyboard and the `Scanner`).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 03_1 | [IT consultant: consultant's bill](task-03-1-it-consultant/README.md) | in progress |
| 03_2 | [Euros and cents: piggy bank counter](task-03-2-euros-and-cents/README.md) | done |
| 03_3 | [Mobile tariff: phone bill](task-03-3-mobile-tariff/README.md) | in progress |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all three tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished). See [students/README.md](../../../../README.md#cursor-commands-for-students).

---

## What you will learn

### 1. The calculator keys: `+ - * / %`

Java is a calculator that never gets tired.

```java
int apples = 3 + 4;      // 7
int left = 10 - 6;       // 4
double price = 3 * 1.5;  // 4.5
```

`*` means "times" (there is no `×` key on the keyboard). `/` means "divided by". `%` comes in idea 3.

**In the task:** every task is one long sum. In 03_1: hours × price per hour.

### 2. `int / int` — sharing sweets fairly

You have **7 sweets** and **2 children**. Each child gets **3**. You cannot cut a sweet, so the half is simply not given out.

Java does the same when **both** numbers are `int`:

```java
int each = 7 / 2;        // 3, not 3.5 — the .5 is thrown away
```

The moment **one** of the two is a `double`, Java keeps the part after the dot:

```java
double each = 7 / 2.0;   // 3.5
```

⚠️ `double x = 7 / 2;` is still `3.0`! Java divides first (`int / int` = 3) and only then puts the 3 into the `double` box. Too late.

**In the task:** 03_2 needs both: `1495 / 100` gives the **full** euros (14), `1495 / 100.0` gives `14.95`.

### 3. `%` — the leftovers

`%` gives what is **left over** after sharing fairly. 7 sweets, 2 children: each gets 3, and **1 is left**. So `7 % 2` is `1`.

```java
int fullEuros = 1495 / 100;   // 14  → how many full 100s fit in?
int restCents = 1495 % 100;   // 95  → what is left over?
```

`/` and `%` are best friends: one says "how many fit", the other says "what is left".

**In the task:** 03_2 a), "14 EUR 95 CENT".

### 4. `int` and `double` together

Mixing is allowed. Java turns the `int` into a `double` first (that is always safe, nothing gets lost) and then calculates:

```java
int hours = 70;
double cost = hours * 120.0;    // 70 becomes 70.0 → 8400.0
```

So the rule of thumb: count things with `int` (hours, kilometres, cents, minutes), and use `double` for money with a dot.

**In the task:** 03_1, hours (`int`) × hourly rate (`double`).

### 5. `final` — numbers written in pen

Some numbers never change, like the price list on a shop wall. You write them in **pen**, not pencil. In Java the pen is called `final`:

```java
final double HOURLY_RATE = 120.0;
HOURLY_RATE = 200.0;   // ✗ compile error: you cannot change a final box
```

- By habit, their names are in `CAPITALS_WITH_UNDERSCORES`.
- Why bother? The price is in **one** place. If it changes next year, you change one line. And `HOURLY_RATE` tells the reader what `120.0` means.

**In the task:** every price on the three sheets is a `final` constant. The sheets even ask for it.

### 6. Times before plus — who goes first?

Like in maths at school: `*`, `/` and `%` come **before** `+` and `-`.

```java
double bill = 9.95 + 2 * 2.95;     // 2 * 2.95 first → 9.95 + 5.9 = 15.85
double wrong = (9.95 + 2) * 2.95;  // brackets first → 35.2525
```

When you are not sure, use brackets. They never hurt, and they make the plan easy to read.

**In the task:** 03_3, fee + data + minutes in one line.

### 7. Casts — changing the type on purpose

A **cast** is a pair of brackets with a type name inside, like a stamp: "from now on, you are this type".

```java
int whole = (int) 14.95;        // 14 — (int) cuts off the part after the dot
double exact = (double) 7 / 2;  // 3.5 — 7 becomes 7.0 BEFORE the division
```

⚠️ `(int)` does **not** round. It just chops: `(int) 14.99` is `14`. To round the shop way (`.5` and more goes up), add `0.5` first and then chop:

```text
14.49 + 0.5 = 14.99  → (int) → 14
14.50 + 0.5 = 15.00  → (int) → 15
14.95 + 0.5 = 15.45  → (int) → 15
```

**In the task:** 03_2 c) (round with a cast) and 03_3 (no digits after the dot).

### 8. Gluing text and numbers: `+` has two jobs

With numbers, `+` adds. As soon as text in `"..."` is involved, `+` **glues**:

```java
int hours = 70;
System.out.println("Hours: " + hours);   // Hours: 70
```

Careful, Java reads from left to right:

```java
System.out.println("Sum: " + 2 + 3);    // Sum: 23  (glued, glued)
System.out.println("Sum: " + (2 + 3));  // Sum: 5   (brackets: add first)
```

And a `double` is always printed with a **dot** and at least one digit after it: `8400.0`, `14.5`. That is exactly how the sheet's examples look.

**In the task:** the bill in 03_1 shows every step on its own line.

### 9. Reading the keyboard: the `Scanner`

The `Scanner` is the program's **ear**. One ear is enough for the whole program.

```java
import java.util.Scanner;               // at the very top of the file

Scanner scanner = new Scanner(System.in);
System.out.print("Hours: ");          // print, not println: the cursor stays on the line
int hours = scanner.nextInt();          // waits for a whole number + Enter
int km = scanner.nextInt();             // the SAME scanner again
```

⚠️ Make **one** `Scanner` and reuse it. A second `new Scanner(System.in)` is like a second ear that starts listening too late: the first one may already have swallowed your next number. With typed input it often still works by luck; with input from a file or a pipe it crashes with `NoSuchElementException`.

**In the task:** every task reads its numbers this way. Your files in `my-solution/` already have it.

### 10. Units: compare apples with apples

You cannot subtract 5 **GB** from 3000 **MB** without changing one of them first. Before you calculate, ask: "Are both sides in the same unit? Per month or per year? Euro or cent?"

```java
final int MB_PER_GB = 1000;
int extraMb = extraGb * MB_PER_GB;      // GB → MB, now it fits the 500-MB price
double minutePrice = 0.09;              // 9 cent, written in EUR like everything else
```

**In the task:** 03_3 is full of traps: GB vs. MB, cent vs. euro, month vs. year.

### 11. Testing: check the borders

A program is only "right" when you have **tried** it. Try the example from the sheet, then your own numbers, and especially the **borders**: `0`, `1`, `49` vs. `50` cents, exactly 5 GB. Bugs love borders.

To try a program quickly without typing, you can **pipe** the input in:

```bash
printf '70\n490\n' | java ConsultantInvoice
```

`printf` "types" `70`, Enter, `490`, Enter for you. (The typed numbers are not shown then, so the prompts end up on one line. That is fine.)

**In the task:** every task has a table of test examples. 03_3 has nine from the sheet.

---

## Words to know

| Word | Means |
|------|-------|
| operation / operator | A calculator key: `+ - * / %` |
| expression | A sum Java can work out, like `hours * HOURLY_RATE` |
| constant | A box that never changes (`final`) |
| type conversion, cast | Change the type, e.g. `(int) 14.95` → `14` |
| explicit | Written out on purpose in the code |
| integer | Whole number (`int`) |
| floating-point number | Number with a dot (`double`) |
| decimal places | The digits after the dot |
| commercial rounding | Up to `.49` down, from `.50` up |
| traceable | Every step can be checked by reading the output |
| hourly rate | Money for one hour of work |
| flat rate | Fixed price per unit, e.g. per km |
| base fee | Paid every month, used or not |
| included | Free, already paid with the fee |
| extrapolate | Work out the year from one month |
| rough estimate | Close enough, no cents needed |

## Source

> Hochschule Hannover, Faculty IV – Business and Computer Science, Department of Business Information Systems
> **Programming 1 | Exercise 03 Operations and expressions**

Back to [all exercises](../README.md).
