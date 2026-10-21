# Musterlösung · Aufgabe 03_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`musterloesung/`), then:

```bash
javac EuroCent.java
```

```bash
java EuroCent
```

Or all at once, without typing:

```bash
printf '1495\n' | java EuroCent
```

## How it works, step by step

1. `CENTS_PER_EURO = 100` is a `final int`. Now the code says *why* it divides by 100.
2. Read the cents as an `int`, as the sheet asks.
3. **a)** `cents / CENTS_PER_EURO` is `int / int`, so Java keeps only the whole part: 1495 / 100 = **14** full euros. `cents % CENTS_PER_EURO` is the leftover: 1495 % 100 = **95** cents.
4. **b)** `(double) cents / CENTS_PER_EURO`: the cast turns 1495 into 1495.0 **before** dividing, so the result keeps its dot: **14.95**. (`cents / 100.0` does the same. With the constant, which is an `int`, we need the cast.)
5. **c)** `(int) (euros + 0.5)`: first add half a euro, then let `(int)` chop off everything after the dot.
   - 14.95 + 0.5 = 15.45 → **15**
   - 14.49 + 0.5 = 14.99 → **14**
   - 14.50 + 0.5 = 15.00 → **15**

   The brackets around `euros + 0.5` matter: without them, Java would cast `euros` first and add 0.5 afterwards (and complain that it cannot put a `double` into an `int` box).

**Another way for c), only whole numbers:** `(cents + 50) / 100`. Adding 50 cents and dividing as `int` rounds the same way and never touches a `double`. It is a nice trick, but the sheet asks for an **explicit type conversion**, so the solution uses the cast.

**Test run**

The input comes in through the pipe, so the typed number is not shown after `Cent: `.

```text
$ printf '1495\n' | java EuroCent
Cent: 14 EUR 95 CENT
14.95 EUR
15 EUR

$ printf '1449\n' | java EuroCent
Cent: 14 EUR 49 CENT
14.49 EUR
14 EUR

$ printf '1450\n' | java EuroCent
Cent: 14 EUR 50 CENT
14.5 EUR
15 EUR

$ printf '49\n' | java EuroCent
Cent: 0 EUR 49 CENT
0.49 EUR
0 EUR

$ printf '50\n' | java EuroCent
Cent: 0 EUR 50 CENT
0.5 EUR
1 EUR

$ printf '0\n' | java EuroCent
Cent: 0 EUR 0 CENT
0.0 EUR
0 EUR

$ printf '100\n' | java EuroCent
Cent: 1 EUR 0 CENT
1.0 EUR
1 EUR

$ printf '199\n' | java EuroCent
Cent: 1 EUR 99 CENT
1.99 EUR
2 EUR
```

All eight match the test examples.

**About the dot.** `println` always prints a `double` with a dot and as few digits as needed (`14.5`, `1.0`). If you want two digits, `System.out.printf("%.2f EUR%n", euros)` prints `14.50 EUR`, but on a German computer it prints `14,50 EUR` with a comma, because `printf` follows the computer's language settings.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `double euros = cents / 100;` | `14.0` instead of `14.95` | `cents / 100.0` or `(double) cents / 100` |
| `(int) euros` without `+ 0.5` | 1495 gives `14`, not `15` | Add 0.5, then cast |
| `(int) euros + 0.5` | Compile error (`double` into `int`) | Brackets: `(int) (euros + 0.5)` |
| `Math.round(euros)` | Right answer, but the sheet forbids it | Use the cast |
| `fullEuros + " EUR" + restCents` | `14 EUR95` | Spaces inside the quotes |

Back to [Aufgabe 03_2](../README.md).
