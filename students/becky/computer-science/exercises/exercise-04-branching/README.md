# Exercise 04 · Branching

| | |
|---|---|
| Student | Becky |
| Subject | Computer Science · Programming 1 (Hochschule Hannover) |
| Language | Java |
| Created | 2026-10-21 |

## The story in one sentence

Until now your programs walked **one straight road**: line 1, line 2, line 3. Today they learn to stand at a **fork in the road** and choose a way, just like you do every morning: *"If it rains, I take my umbrella. Otherwise I take my sunglasses."*

You will build three little programs that make choices:

1. A **shop till** that knows discounts and free delivery.
2. A **triangle detective** that tells you what kind of triangle you have.
3. A **calendar guard** that knows if a date really exists.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 04_1 | [File folders: shop till](task-04-1-file-folders/README.md) | todo |
| 04_2 | [Triangle: triangle detective](task-04-2-triangle/README.md) | todo |
| 04_3 | [Date: calendar guard](task-04-3-date/README.md) | todo |
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

### 1. `if` — the door guard

Picture a door guard at a playground. He only lets you in **if** you are tall enough.

```java
if (height >= 120) {
    System.out.println("Have fun on the slide!");
}
```

- Inside the `( )` is a **question** that is either true or false.
- Inside the `{ }` is what happens **only when the answer is true**.
- If the answer is false, Java just skips the `{ }` and walks on.

**In the task:** shipping is only added *if* the order is not too expensive.

### 2. `if … else` — two roads

Now the guard says something either way.

```java
if (height >= 120) {
    System.out.println("Have fun on the slide!");
} else {
    System.out.println("Try the sandpit!");
}
```

Exactly **one** of the two roads is taken. Never both, never none.

**In the task:** a date is either valid or not valid. One sentence or the other.

### 3. `else if` — a staircase

Sometimes there are more than two roads. Think of prizes at a running race:

```java
if (place == 1) {
    prize = "gold";
} else if (place == 2) {
    prize = "silver";
} else if (place == 3) {
    prize = "bronze";
} else {
    prize = "a hug";
}
```

Java walks down the stairs from the top and **stops at the first step that is true**. All the steps below are ignored.

⚠️ That is why **order matters**. In the shop task: 250 folders is "50 or more" *and* "100 or more" *and* "200 or more". If you ask `>= 50` first, Java stops there and gives only 1 % discount. So ask the **biggest** number first.

**In the task:** the discount (0 %, 1 %, 3 %, 5 %).

### 4. Comparing — the question words

| Java | Says | Example that is true |
|------|------|----------------------|
| `>` | bigger than | `5 > 3` |
| `<` | smaller than | `3 < 5` |
| `>=` | bigger **or the same** | `50 >= 50` |
| `<=` | smaller **or the same** | `1000 <= 1000` |
| `==` | exactly the same | `4 == 4` |
| `!=` | **not** the same | `4 != 7` |

Careful with words on the sheet:

- "**from** a quantity of 50" means 50 counts too → `>= 50`.
- "**above** 1000 EUR" means 1000 itself does **not** count → `> 1000`.

And: `=` is "put this in the box", `==` is "are these the same?". Mixing them up is the most famous beginner mistake in the world.

### 5. `boolean` — a light switch

A `boolean` is a box that holds only `true` or `false`, like a light switch is only on or off.

```java
boolean hungry = true;
boolean bigEnough = height >= 120;   // the answer of a question goes in the box
```

You can keep the answer and use it later. That makes long questions easy to read:

```java
if (bigEnough) { ... }
```

**In the task:** `valid`, `equilateral`, `isosceles`, `rightAngled`, `leapYear` are all light switches.

### 6. `&&`, `||`, `!` — glue for questions

| Java | Word | Story |
|------|------|-------|
| `&&` | AND | Ice cream **if** homework is done **and** it is sunny. Both must be true. |
| `\|\|` | OR | Go outside **if** it is Saturday **or** it is Sunday. One is enough. |
| `!` | NOT | `!raining` = "it is not raining". Flips true and false. |

```java
boolean iceCream = homeworkDone && sunny;
boolean weekend = day == 6 || day == 7;
```

When you mix `&&` and `||`, use brackets so Java (and you!) know what belongs together:

```java
boolean leapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
```

**In the task:** the three triangle rules are glued with `&&`; "two sides are the same" uses `||`.

### 7. `switch` — the sorting machine

Imagine a post office with boxes numbered 1 to 12. A letter comes in with a number, and the machine drops it into the right box.

```java
switch (month) {
    case 4: case 6: case 9: case 11:
        lastDay = 30;
        break;            // stop here, do not fall into the next box
    default:
        lastDay = 0;      // "none of the boxes above"
}
```

- `case 4:` = "if month is 4, start here".
- Several `case`s in a row share the same code.
- `break` = "done, leave the switch". Forget it and Java keeps running into the next case!
- `default` = the box for everything else.

`switch` only works when you ask "is it **exactly** this value?". For "bigger than" you still need `if`.

**In the task:** how many days a month has.

### 8. `%` — the leftovers

`%` is the **remainder** after sharing fairly. You have 10 sweets and 4 friends: everyone gets 2, and **2 are left over**. So `10 % 4` is `2`.

If nothing is left over, the number can be shared perfectly: `2024 % 4` is `0`, so 2024 is **divisible by 4**.

```java
boolean even = number % 2 == 0;
```

**In the task:** the leap-year rule. Divisible by 4 → leap year. But divisible by 100 → not. But divisible by 400 → yes again. (1900 was not a leap year, 2000 was.)

### 9. `int`, `double` and `final`

- `int` holds whole numbers: `80` folders, month `12`.
- `double` holds numbers with a dot: `9.99` EUR, `3.5` cm.
- `final` on a box means "this never changes". Prices and tax rates from the sheet are perfect for that. By habit, their names are in CAPITALS.

```java
final double VAT = 0.19;
```

### 10. Percent and rounding money

Percent means "out of 100". 19 % is `0.19`.

- **Take 3 % away:** multiply by `1 - 0.03` (that is `0.97`).
- **Add 19 % on top:** multiply by `1 + 0.19` (that is `1.19`).

"Rounding commercially" is how shops round: `.5` and more goes **up**, less goes **down**. Java's `Math.round` rounds to a **whole** number, so we use a trick:

```text
1041.52752   × 100  →  104152.752
Math.round           →  104153
÷ 100.0              →  1041.53
```

```java
double rounded = Math.round(total * 100) / 100.0;
```

Write `100.0`, not `100`. Otherwise Java does whole-number division and the cents disappear.

### 11. Doubles can tell tiny fibs

A computer stores `double`s in a way that is *almost* exact. Try it:

```java
System.out.println(0.1 + 0.2);   // 0.30000000000000004 (!)
```

So for doubles, `==` can say `false` even when the math says "same". The fix: ask "are they **really, really close**?"

```java
final double TOLERANCE = 0.000001;
boolean same = Math.abs(x - y) < TOLERANCE;   // Math.abs drops the minus sign
```

**In the task:** the right-angle check. For sides `1`, `1`, `1.4142135623730951` the long side squared is `2.0000000000000004`, not `2`.

### 12. Reading from the keyboard — the program's ears

`Scanner` listens to what you type. You write it into your program yourself, like in exercise 03:

```java
Scanner scanner = new Scanner(System.in);
int quantity = scanner.nextInt();       // waits until you type a whole number + Enter
double side = scanner.nextDouble();     // same, for numbers with a dot
```

Is your computer set to a language that writes numbers with a comma? Then the Scanner wants `3,5` instead of `3.5`. The line `scanner.useLocale(Locale.US);` tells the Scanner to accept the dot.

---

## Words to know

| Word | Means |
|------|-------|
| branch | The program chooses a road (`if`, `switch`) |
| quantity | How many you buy |
| list price | Price for one, before anything else |
| discount | Money taken off |
| net amount | Price after discount, before tax |
| VAT | Tax added on top (19 %) |
| shipping | Money for delivery |
| commercial rounding | `.5` up, below `.5` down |
| valid | Allowed, makes sense |
| equilateral | All 3 sides the same |
| isosceles | At least 2 sides the same |
| right-angled | Has a corner like a book (90°) |
| leap year | A year with 29 February |
| divisible | Shares with no leftovers (`% == 0`) |

## Source

> Prof. Dr.-Ing. Dennis Chong · Tim Dannhauer, M. Sc. · Hochschule Hannover, Faculty IV – Business and Computer Science, Department of Business Information Systems
> **Programming 1 | Exercise 04 Branching**

Back to [all exercises](../README.md).
