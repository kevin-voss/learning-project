# Solution · Branches (Verzweigungen) 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then for example:

```bash
javac FolderOrder.java
```

```bash
java FolderOrder
```

Same for `Triangle` and `DateCheck`.

---

## 04_1 · `FolderOrder.java`

**How it works, step by step**

1. The four numbers from the sheet go into `final` boxes, so nobody changes them by accident and the code reads like the sheet.
2. Read the quantity. Less than 1? Say so and stop (`return` ends `main` early).
3. **The discount staircase** asks `>= 200` first, then `>= 100`, then `>= 50`, else `0.0`. Java takes the first true step, so the biggest discount must be on top.
4. `net = quantity * LIST_PRICE * (1 - discount)` — "take 3 % away" is "keep 97 %".
5. `gross = net * (1 + VAT)` — "add 19 %" is "pay 119 %".
6. Shipping: the sheet says free only **above** 1000. So we add it when `gross <= 1000`. Exactly 1000.00 EUR still pays shipping.
7. Round: `Math.round(total * 100) / 100.0`. Times 100 turns euros into cents, round to whole cents, back to euros.
8. `printf("%.2f")` always prints two decimals (`218.87`, never `218.9`).

The sheet's example, by hand: 80 × 9.99 = 799.20 → minus 1 % = 791.208 → plus 19 % = 941.53752 → not above 1000, so + 99.99 = 1041.52752 → **1041.53**.

**Test run** (German computer, so a comma)

```text
How many folders? 80
Price: 1041,53 EUR

How many folders? 49
Price: 682,51 EUR

How many folders? 99
Price: 1165,15 EUR

How many folders? 100
Price: 1153,15 EUR

How many folders? 200
Price: 2258,74 EUR

How many folders? 0
Please order at least 1 folder.
```

Funny detail: 100 folders are **cheaper** than 99. Both skip shipping, but 99 only gets 1 % off while 100 gets 3 %. Real shops have these jumps too.

---

## 04_2 · `Triangle.java`

**How it works, step by step**

1. `scanner.useLocale(Locale.US)` so `3.5` is accepted on a German computer.
2. **Valid:** the sheet says "no sum of two sides is ≤ the third". Turned around: every sum must be `>` the third. Three checks glued with `&&`. Bonus: this also throws out `0` and negative sides, because a side of `-3` can never win all three checks.
3. **Equilateral:** `valid && a == b && b == c`.
4. **Isosceles:** `valid && (a == b || a == c || b == c)`. The brackets matter: without them, Java would read `valid && a == b` as one part and `|| ...` as the other, and an *invalid* triangle like `5, 1, 1` could become "isosceles". An equilateral triangle is automatically isosceles, just like the sheet says.
5. **Longest side:** guess `c`. If `a` is ≥ both others, it is `a`. Else if `b` is ≥ both others, it is `b`. The other two become `short1` and `short2`. That way `5, 3, 4` works too.
6. **Right-angled:** Pythagoras with a tolerance. `Math.abs(longest² - (short1² + short2²)) < 0.000001`. With plain `==`, the sides `1, 1, 1.4142135623730951` would fail, because `1.4142135623730951²` is `2.0000000000000004` in a computer.

Why do we use `==` for equilateral and isosceles but not for right-angled? Equal sides are compared exactly as you typed them, so `2.5 == 2.5` is safe. The right-angle check *calculates* new numbers first (squares and a sum), and calculating is where the tiny fibs appear.

**Test run**

```text
Side a in cm: 3.0
Side b in cm: 4.0
Side c in cm: 5.0
Valid:         true
Equilateral:   false
Isosceles:     false
Right-angled:  true
```

| Input | Valid | Equilateral | Isosceles | Right-angled |
|-------|-------|-------------|-----------|--------------|
| 5 3 4 | true | false | false | true |
| 2 2 2 | true | true | true | false |
| 5 5 8 | true | false | true | false |
| 1 1 1.4142135623730951 | true | false | true | true |
| 2.5 3.5 4.5 | true | false | false | false |
| 1 2 3 | false | false | false | false |
| -3 4 5 | false | false | false | false |

---

## 04_3 · `DateCheck.java`

**How it works, step by step**

1. Read day, month, year as `int`s.
2. **Leap year** in one line: `(year % 4 == 0 && year % 100 != 0) || year % 400 == 0`. Read it out loud: "divisible by 4 and not by 100, **or** divisible by 400".
3. **Last day of the month** with a `switch`. Several `case`s share one answer. `break` stops the fall-through. February has a small `if` inside. `default` gives `0` for months that do not exist.
4. **Valid:** `month >= 1 && month <= 12 && day >= 1 && day <= lastDay`. Because a wrong month gives `lastDay = 0`, no day can pass anyway. The month check stays in, so the code says exactly what the sheet says.
5. An `if / else` prints one of two sentences.

**Test run**

```text
Day: 29
Month: 2
Year: 2024
29.2.2024 is a valid date.
```

| Input | Output |
|-------|--------|
| 29 2 2023 | 29.2.2023 is NOT a valid date. |
| 29 2 1900 | 29.2.1900 is NOT a valid date. |
| 29 2 2000 | 29.2.2000 is a valid date. |
| 31 4 2025 | 31.4.2025 is NOT a valid date. |
| 30 4 2025 | 30.4.2025 is a valid date. |
| 31 12 2025 | 31.12.2025 is a valid date. |
| 0 5 2025 | 0.5.2025 is NOT a valid date. |
| 15 13 2025 | 15.13.2025 is NOT a valid date. |
| 32 1 2025 | 32.1.2025 is NOT a valid date. |

---

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Discount staircase starts with `>= 50` | 250 folders get only 1 % | Biggest number first |
| `/ 100` instead of `/ 100.0` | Price without cents | Use `100.0` |
| Shipping checked before VAT | 99 folders still pay shipping | Check `gross`, not `net` |
| `>` vs `>=` mixed up | 50 folders get no discount | "ab 50" = `>= 50`, "über 1000" = `> 1000` |
| No brackets around `\|\|` | Invalid triangles called isosceles | `valid && (a == b \|\| ...)` |
| Doubles compared with `==` after math | Right triangle not found | Tolerance with `Math.abs` |
| Forgot `break` in `switch` | April gets 28 days | One `break` after every group |
| `=` instead of `==` in an `if` | Compile error | `=` puts in, `==` compares |
| Typing `3.5` without `useLocale` | `InputMismatchException` | `scanner.useLocale(Locale.US)` or type `3,5` |
