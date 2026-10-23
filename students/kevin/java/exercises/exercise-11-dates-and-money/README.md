# Exercise 11 · Dates and money

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java |
| Created | 2026-10-22 |

## The story in one sentence

At the post office counter every parcel gets a stamp that says how **late** it is — and the cash register adds up prices so exactly that not one **cent** is lost.

## Before you code

The two sheets this exercise practises (read each once, ten minutes):

1. [java.time: dates you can trust](../../../../../sheets/java/apis/java-time.md)
2. [Money: BigDecimal, never double](../../../../../sheets/java/apis/money.md)

Map of the everyday API tools: [Everyday APIs](../../../../../sheets/java/apis/README.md).
Map of all Java homes: [sheets/java](../../../../../sheets/java/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 11_1 | [Overdue stamps](task-11-1-overdue-stamps/README.md) | todo |
| 11_2 | [Exact money](task-11-2-exact-money/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

---

## What you will learn

### 1. `LocalDate` — one page of the wall calendar

Picture a wall calendar: one page is one day. No clock on it, no time zone — only the day.

```java
import java.time.LocalDate;

LocalDate due = LocalDate.parse("2026-10-01"); // text → one calendar page
LocalDate back = due.plusDays(14);              // flip 14 pages forward

System.out.println(back);                       // 2026-10-15
System.out.println(back.isAfter(due));          // true: it lies after
```

- A `LocalDate` never changes: `plusDays` hands you a **new** page.
- `parse` wants exactly this shape: `yyyy-MM-dd`.

**In task 11_1** you read every parcel's `due` and `return` with `LocalDate.parse` and ask `isAfter` whether the parcel came back too late.

### 2. `ChronoUnit.DAYS.between` — the ruler between two pages

Picture the ruler next to the calendar: point it at two pages and it counts the days between. Across a month end, across a leap day — always right.

```java
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

LocalDate due = LocalDate.parse("2024-02-28");
LocalDate back = LocalDate.parse("2024-03-01");

System.out.println(ChronoUnit.DAYS.between(due, back)); // 2 — leap day counted
```

- It counts **forward** from the first date to the second.
- Second date before the first? The answer is **negative** — ask `isAfter` first.

**In task 11_1** the ruler counts how many days late a parcel is; you write no calendar math of your own.

### 3. `new BigDecimal(String)` — a register that counts real coins

Picture three 10-cent coins: together exactly 30 cents. A `double` works in "roughly", so cents drift — no till may do that.

```java
import java.math.BigDecimal;

System.out.println(0.1 + 0.2);            // 0.30000000000000004

BigDecimal a = new BigDecimal("0.1");     // from TEXT, never from a double
BigDecimal b = new BigDecimal("0.2");
System.out.println(a.add(b));             // 0.3 — exactly
```

- `new BigDecimal("2.99")` is exact; `new BigDecimal(2.99)` copies the double's error.
- `add` and `multiply` return **new** values; the old ones never change.

**In task 11_2** prices arrive as text like `2.99`; you build every amount with `new BigDecimal(String)` so the register never loses a cent.

### 4. `setScale(2, RoundingMode.HALF_UP)` — rounding to cents like in school

Picture the till: it holds only whole cents, so `1.4875` must become `1.49`. School rounding says 0–4 down, 5–9 up.

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

BigDecimal total = new BigDecimal("1.25");
BigDecimal withVat = total.multiply(new BigDecimal("1.19"))
                          .setScale(2, RoundingMode.HALF_UP);

System.out.println(withVat);              // 1.49  (1.4875 rounds up)
```

- `setScale(2, HALF_UP)` gives exactly two decimal places, 5 rounds up.
- Without it, multiplying piles up places: `1.25 × 1.19` shows `1.4875`.

**In task 11_2** you round every vat amount with `setScale(2, RoundingMode.HALF_UP)` so the counter always prints two decimals.

---

## Words to know

| Word | Means |
|------|-------|
| **`LocalDate`** | One calendar day (`2026-10-23`), no clock; it never changes |
| **immutable** | The value never changes; every method returns a new one |
| **`LocalDate.parse`** | Turn `yyyy-MM-dd` text into a `LocalDate` |
| **`plusDays(n)`** | A new date, `n` pages forward |
| **`isAfter`** | Is this date later than the other? |
| **`ChronoUnit.DAYS.between(a, b)`** | How many whole days from `a` to `b` (negative backwards) |
| **`double`** | A fast decimal number with tiny rounding errors — wrong for money |
| **`BigDecimal`** | An exact decimal number, built from text like `"2.99"` |
| **scale** | How many decimal places a `BigDecimal` carries |
| **`setScale(2, RoundingMode.HALF_UP)`** | Round to two decimals; 5 rounds up |

## Source

Written for Kevin: practice for the [java.time](../../../../../sheets/java/apis/java-time.md) and [Money](../../../../../sheets/java/apis/money.md) sheets.

Back to [all exercises](../README.md).
