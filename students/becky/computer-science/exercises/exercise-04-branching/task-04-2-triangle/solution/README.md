# Sample solution · Task 04_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac Triangle.java
```

```bash
java Triangle
```

## How it works, step by step

1. `scanner.useLocale(Locale.US)` so `3.5` is accepted even on a computer set to a language that writes `3,5`.
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

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| No brackets around `\|\|` | Invalid triangles called isosceles | `valid && (a == b \|\| ...)` |
| Doubles compared with `==` after math | Right triangle not found | Tolerance with `Math.abs` |
| Typing `3.5` without `useLocale` | `InputMismatchException` | `scanner.useLocale(Locale.US)` or type `3,5` |

Back to [Task 04_2](../README.md).
