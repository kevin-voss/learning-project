# Exercise 05 · Loops

| | |
|---|---|
| Student | Becky |
| Subject | Computer Science · Programming 1 (Hochschule Hannover) |
| Language | Java |
| Created | 2026-10-22 |

## The story in one sentence

Until now your programs either walked **one straight road** or stood at a **fork**. Today they learn to **walk the same road again and again** — like counting the steps of a staircase, or asking "another sweet?" until someone says no.

You will build four little programs that repeat:

1. A **value table** that walks along x and prints f(x) at every step.
2. A **number collector** that keeps asking for numbers until you say stop with a negative.
3. The **small times table** (1×1 to 10×10), with a star on square numbers.
4. A **shrinking word** that prints a string as a triangle.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 05_1 | [Value table](task-05-1-value-table/README.md) | todo |
| 05_2 | [Running stats](task-05-2-running-stats/README.md) | todo |
| 05_3 | [Multiplication table](task-05-3-multiplication-table/README.md) | todo |
| 05_4 | [Triangle string](task-05-4-triangle-string/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all four tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished). See [students/README.md](../../../../README.md#cursor-commands-for-students).

---

## What you will learn

### 1. `for` — the counting walk

Picture a staircase with sticky notes on the steps: 0, 1, 2, …, 10. You walk up and at every step you do the same little job (say the number out loud).

```java
for (int x = 0; x <= 10; x = x + 1) {
    System.out.println(x);
}
```

Three parts inside the `( )`, separated by `;`:

1. **Start:** `int x = 0` — put a 0 in the box (only once, at the beginning).
2. **Keep going while:** `x <= 10` — as long as this is true, take another lap.
3. **After each lap:** `x = x + 1` — make the box one bigger (or any step you like).

**In task 05_1** you walk from start x to stop x with a step the user chooses, and print `f(x)` at every stop.

### 2. `while` — keep going until

Sometimes you do not know how many laps you need. Think of eating crisps: *"Have another?"* — yes, yes, yes — until someone says no.

```java
int number = scanner.nextInt();
while (number >= 0) {
    // do something with number
    number = scanner.nextInt();   // ask again!
}
```

- Check the question **before** each lap.
- If the first answer is already "no" (negative), the body never runs. That is fine.
- Inside the loop you must change something, or you walk forever.

**In task 05_2** you keep asking for the next number until a negative one arrives.

### 3. Nested loops — a loop inside a loop

Picture a block of flats: for every **floor**, walk every **door**.

```java
for (int floor = 1; floor <= 3; floor++) {
    for (int door = 1; door <= 4; door++) {
        System.out.println("Flat " + floor + "." + door);
    }
}
```

The inner loop finishes **completely** for each value of the outer loop. So you get 3 × 4 = 12 lines.

**In task 05_3** the outer loop is the first factor (1…10), the inner loop is the second factor (1…10).

### 4. Accumulator — a piggy bank

A loop can **collect**. Start a box at 0. Every lap, drop something in.

```java
int count = 0;
int sum = 0;
// each time you get a number:
count = count + 1;
sum = sum + number;
double average = (double) sum / count;
```

- `count` = how many numbers so far.
- `sum` = all of them added up.
- Average needs a `double` division. Write `(double) sum / count`, or the answer stays a whole number.

**In task 05_2** you print count, sum and average after every valid number.

### 5. Step size — not always +1

The third part of a `for` can add 2, or 0.5, or anything:

```java
for (double x = 0; x <= 10; x = x + 2.5) {
    // x is 0, then 2.5, then 5, then 7.5, then 10
}
```

Use `double` when start, stop or step can have a dot.

⚠️ Floating-point steps can miss the last value by a tiny bit (`0.1 + 0.1 + …`). For this exercise the sheet uses nice numbers, so `x <= stop` is enough.

**In task 05_1** start, stop and step all come from the keyboard.

### 6. Square numbers and `Math.sqrt`

A **square number** is what you get when you multiply a whole number by itself: 1, 4, 9, 16, 25, …

```java
int product = a * b;
int root = (int) Math.sqrt(product);   // "how many times itself?" as a whole number
boolean square = root * root == product;
```

If `root * root` is exactly the product, it is a square. Then print a `*` after the number.

**In task 05_3** every line looks like `3 x 3 = 9*` when the result is a square.

### 7. Strings have a length — and you can cut them

A `String` is a row of letters in boxes numbered from **0**.

```text
K l a u s u r
0 1 2 3 4 5 6     ← positions (length is 7)
```

```java
String text = scanner.next();
int n = text.length();                 // how many letters
String shorter = text.substring(0, 5); // letters from 0 up to (not including) 5 → "Klaus"
```

**In task 05_4** you print the whole word, then one letter shorter, then shorter again, down to one letter.

### 8. Reading from the keyboard — reminder

Same ears as before:

```java
Scanner scanner = new Scanner(System.in);
scanner.useLocale(Locale.US);          // so 2.5 works with a dot
double start = scanner.nextDouble();
int number = scanner.nextInt();
String word = scanner.next();          // one word (stops at space / Enter)
```

---

## Words to know

| Word | Means |
|------|-------|
| loop | Do the same block again and again |
| `for` | A loop that counts (start, condition, step) |
| `while` | A loop that keeps going while a question is true |
| nested | One loop sitting inside another |
| step / step size | How much the loop variable grows each lap |
| accumulator | A box that collects (sum, count) |
| average | Sum divided by count |
| square number | 1, 4, 9, 16, … (a whole number times itself) |
| substring | A piece cut from a string |
| sentinel | A special value that means "stop" (here: a negative number) |

## Source

> Prof. Dr.-Ing. Dennis Chong · Tim Dannhauer, M. Sc. · Hochschule Hannover, Faculty IV – Business and Computer Science, Department of Business Information Systems
> **Programming 1 | Exercise 05 Loops**

Back to [all exercises](../README.md).
