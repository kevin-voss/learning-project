# Exercise 07 · Methods I

| | |
|---|---|
| Student | Becky |
| Subject | Computer Science · Programming 1 (Hochschule Hannover) |
| Language | Java |
| Created | 2026-11-05 |

## The story in one sentence

Your programs grew long lists of steps in `main`. Today you learn **methods**: named mini-programs you can write once and **call** whenever you need the same job again — like teaching a robot "make tea" instead of repeating every tiny move.

You will build four programs that practice methods:

1. **Info** — a method that prints a number, its square and its cube.
2. **Compound interest** — a method that returns money after several years when the interest rate creeps up a little each year.
3. **Calendar methods** — leap year, days in a month, valid date, next day (you already did the ideas in exercise 04, now split into methods).
4. **String and array methods** — padding numbers, sums, counting, comparing arrays, building a range.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 07_1 | [Info](task-07-1-info/README.md) | todo |
| 07_2 | [Compound interest](task-07-2-compound-interest/README.md) | todo |
| 07_3 | [Calendar methods](task-07-3-calendar-methods/README.md) | todo |
| 07_4 | [String and array methods](task-07-4-string-and-array-methods/README.md) | todo |
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
> Picture a **recipe card** on the fridge: "Pancakes". You do not rewrite the whole recipe every Sunday — you read the card and say "make pancakes". A **method** is that card for your code.

### 1. A method — a named recipe

```java
static void greet() {
    System.out.println("Hello!");
}
```

- `static` means "this recipe belongs to the class" (for now, always write `static` on your methods).
- `void` means "this recipe does not hand back a number or word — it just **does** something".
- `greet` is the name you chose.
- `( )` is the list of **ingredients** (parameters). Empty here.
- `{ }` is the body — the steps.

**In task 07_1** you write `info` and call it three times from `main`.

### 2. Calling a method

```java
public static void main(String[] args) {
    greet();
    greet();
}
```

The name, then `( )`, then `;`. Java jumps into the method, runs it, and comes back.

**In task 07_1** each call prints three lines for one value of `x`.

### 3. Parameters — ingredients on the card

```java
static void info(int x) {
    System.out.println("Number = " + x);
}
```

Inside `( )` you say what type and name you need. When someone calls `info(3)`, the box `x` holds `3` for that visit only.

**In tasks 07_2–07_4** almost every method takes one or more parameters.

### 4. Return — hand something back

```java
static int doubleIt(int n) {
    return n * 2;
}
```

Instead of `void` you write the **type** of what comes back (`int`, `boolean`, `double`, `String`, …). `return` sends the answer to whoever called the method.

```java
int answer = doubleIt(5);   // answer is 10
```

**In task 07_2** your method **returns** the end capital; `main` prints it.

### 5. `boolean` methods — yes/no answers

```java
static boolean isLeapYear(int year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}
```

Call it inside an `if`:

```java
if (isLeapYear(2024)) {
    System.out.println("29 days in February");
}
```

**In task 07_3** you build small yes/no and counting methods, then **reuse** them inside bigger ones.

### 6. Methods calling methods

```java
static int daysInMonth(int month, int year) {
    if (month == 2) {
        if (isLeapYear(year)) {
            return 29;
        }
        return 28;
    }
    // …
}
```

You already figured out leap years in [exercise 04](../exercise-04-branching/README.md). Now `daysInMonth` asks `isLeapYear` instead of copying the rule.

**In task 07_3** `isValidDate` calls `daysInMonth`; `nextDay` calls `isValidDate` and `daysInMonth`.

### 7. Returning a `String`

```java
static String nextDay(int day, int month, int year) {
    // …
    return day + "." + month + "." + year;
}
```

The caller gets text, not a number.

**In task 07_3** `main` prints that string when the date is valid.

### 8. Arrays as parameters

```java
static int sum(int[] values) {
    int total = 0;
    for (int i = 0; i < values.length; i++) {
        total = total + values[i];
    }
    return total;
}
```

You pass the **whole shelf** (`values`), not one slot at a time.

**In task 07_4** you sum an array, count how often a number appears, compare two `double[]`, and build a new array from an interval.

### 9. Returning a new array

```java
static int[] range(int from, int to) {
    int[] result = new int[to - from + 1];
    // fill result …
    return result;
}
```

**In task 07_4** the interval method returns every integer from `from` through `to` inclusive.

### 10. Zero-padding a number as text

The sheet wants a number turned into text with **at least** `width` characters, filled with `0` on the left:

| Number | Width | Text |
|--------|-------|------|
| 7 | 3 | `007` |
| 42 | 5 | `00042` |

You can build the string in a loop, or use `String.format("%05d", 42)` once you are comfortable.

**In task 07_4** part (a).

### 11. Comparing `double[]` — almost the same

Two arrays match only if they have the **same length** and each pair of values is the **same**. For `double`, use a tiny tolerance (same idea as the triangle task in exercise 04):

```java
Math.abs(a[i] - b[i]) < 0.000001
```

**In task 07_4** part (d).

### 12. Rising interest — one year at a time

Start capital `C`, start rate `p` percent, `n` years. Each year:

1. Multiply capital by `(1 + p / 100)`.
2. Add `0.01` to `p` (0.01 **percentage points**, not 0.01 percent of the rate).

Example: 1000 EUR, 5 %, 2 years → year 1 at 5 %, year 2 at 5.01 %.

**In task 07_2** you put that loop inside one method and return the final capital.

---

## Words to know

| Word | Means |
|------|-------|
| method | A named block of code you can call |
| parameter | A value the caller must supply (ingredient) |
| return | Send a result back to the caller |
| void | The method returns nothing |
| call | Run a method by writing its name and `( )` |
| leap year | February has 29 days (same rule as exercise 04) |
| percentage point | The rate itself goes up by 0.01 (5 % → 5.01 %), not "5 % of 5 %" |
| end capital | Money after all years of interest |
| interval | All whole numbers from `from` through `to`, both ends included |
| frequency | How many times a value appears in an array |

## Source

> Prof. Dr.-Ing. Dennis Chong · Tim Dannhauer, M. Sc. · Hochschule Hannover, Faculty IV – Business and Computer Science, Department of Business Information Systems  
> **Programming 1 | Exercise 07 Methods I**

Back to [all exercises](../README.md).
