# Exercise 08 · Methods II

| | |
|---|---|
| Student | Becky |
| Subject | Computer Science · Programming 1 (Hochschule Hannover) |
| Language | Java |
| Created | 2026-11-12 |

## The story in one sentence

Last time you wrote methods with different ingredients; now the **same recipe name** can mean slightly different things, you pull **lucky numbers** from a jar, measure **corners of a triangle**, and **flip a row of blocks** without losing the original row.

You will build four programs:

1. **Total price with VAT** — one price method, three ways to call it (overloading).
2. **Random in range** — a fair whole number between two limits.
3. **Triangle angles** — cos rule, rounding, and small helper methods.
4. **Mirror array** — reverse a copy, or reverse in place.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 08_1 | [Total price with VAT](task-08-1-total-price-with-vat/README.md) | todo |
| 08_2 | [Random in range](task-08-2-random-in-range/README.md) | todo |
| 08_3 | [Triangle angles](task-08-3-triangle-angles/README.md) | todo |
| 08_4 | [Mirror array](task-08-4-mirror-array/README.md) | todo |
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

> [!PICTURE]
> Picture a shop till: sometimes the cashier scans **price, count, and tax**; sometimes the tax is always **19 %**; sometimes you buy **one** item. One word on the button — **totalPrice** — but the till knows which details you gave.

### 1. Method overloading — same name, different ingredient lists

```java
static double totalPrice(double unitPrice, int quantity, double vatPercent) { /* … */ }
static double totalPrice(double unitPrice, int quantity) { /* … 19 % VAT */ }
static double totalPrice(double unitPrice) { /* … qty 1, 19 % */ }
```

Java picks the version that **fits** the values you pass. Same name, different parameter lists.

**In task 08_1** you write all three and call each from `main`.

### 2. Commercial rounding — money and display

**Commercial** rounding (German: *kaufmännisch*) means: look at the next digit; 5 or more rounds up.

For **two** decimal places (cents):

```java
static double roundCommercial(double value, int decimalPlaces) {
    double factor = Math.pow(10, decimalPlaces);
    return Math.round(value * factor) / factor;
}
```

**In task 08_1** you round the gross total to **2** places. **In task 08_3** you reuse the same idea for **3** places on angles.

### 3. VAT gross price

Gross = net × quantity × (1 + VAT% / 100).

Example: 2.50 EUR × 4 pieces × 19 % → 2.50 × 4 × 1.19 = **11.90** EUR.

**In task 08_1** the full method takes unit price, quantity, and VAT rate.

### 4. `Math.random()` — a fraction in [0, 1)

`Math.random()` returns a `double` like `0.374…` (never exactly 1.0).

To get a whole number from **a** through **b** inclusive (both ends count):

```java
int n = (int) (Math.random() * (b - a + 1)) + a;
```

Think: `(b - a + 1)` is how many choices you have; multiply by a random fraction; add `a` to shift the window.

**In task 08_2** you put that in a method and print 100 values between 5 and 10.

### 5. Law of cosines — angle from three sides

For a triangle with sides `a`, `b`, `c` opposite angles α, β, γ:

```text
cos α = (b² + c² − a²) / (2 · b · c)
```

Then α = arccos(…) in **degrees** (`Math.toDegrees(Math.acos(...))`).

Same pattern for β and γ — swap which side sits in the numerator's “minus” term.

**In task 08_3** one method computes one angle; `main` reads three sides and prints three rounded angles.

### 6. Mirror copy vs mirror in place

| Idea | What happens to the original array |
|------|-------------------------------------|
| **Copy** | Stays the same; you `return` a new array |
| **In place** | Element order reverses inside the same array |

Swapping from both ends inward is enough for in-place:

```java
for (int i = 0; i < arr.length / 2; i++) {
    int j = arr.length - 1 - i;
    int tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}
```

**In task 08_4** you write both styles and prove it in `main` with `[1, 13, 3, 42, 5]`.

---

## Words to know

| Word | Means |
|------|-------|
| overload | Two methods with the **same name** but different parameters |
| VAT | Value-added tax (German: MwSt); here a percent added to net price |
| gross price | Price **including** VAT |
| commercial rounding | Round half-up to a fixed number of decimal places |
| `Math.random()` | Pseudo-random fraction from 0 up to (but not including) 1 |
| inclusive range | Both end numbers count (5 and 10 both allowed) |
| law of cosines | Links side lengths to an angle when you do not use sqrt of sums |
| mirror (array) | Reverse index order: first becomes last |
| in place | Change the array you were given; no new array |

## Source

> Prof. Dr.-Ing. Dennis Chong · Tim Dannhauer, M. Sc. · Hochschule Hannover, Faculty IV – Business and Computer Science, Department of Business Information Systems  
> **Programming 1 | Exercise 08 Methods II**

Back to [all exercises](../README.md).
