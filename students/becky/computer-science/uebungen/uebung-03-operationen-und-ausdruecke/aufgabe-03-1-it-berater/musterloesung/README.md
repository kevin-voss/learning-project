# Musterlösung · Aufgabe 03_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`musterloesung/`), then:

```bash
javac ConsultantInvoice.java
```

```bash
java ConsultantInvoice
```

Or all at once, without typing:

```bash
printf '70\n490\n' | java ConsultantInvoice
```

## How it works, step by step

1. **Two constants.** `HOURLY_RATE = 120.0` and `PRICE_PER_KM = 0.75` are `final double`. `final`, because the sheet says so and because a price list should not change by accident. `double`, because 0.75 has a dot (and the sheet prints `120.0`, which is how a `double` looks).
2. **One Scanner.** It is made once and asked twice with `nextInt()`. Hours and kilometres are `int`, because only full hours and whole kilometres count.
3. **`print`, not `println`, for the questions.** So the number you type appears right after `Stunden: `, exactly like in the sheet's example.
4. **Three small sums instead of one big one.** `workCost = hours * HOURLY_RATE` is `int * double`: Java turns `70` into `70.0` first, the result is a `double` (`8400.0`). Same for `travelCost`. Then `totalCost` adds both. Three boxes with good names make the code read like the bill.
5. **Traceable output.** Each line glues text, the input, the constant and the result together with `+`. Because the constants are used in the text too, the bill is still right when the price changes next year.

The sheet's example, by hand: 70 × 120.0 = 8400.0, 490 × 0.75 = 367.5, together 8767.5.

**Test run**

The input comes in through the pipe, so the typed numbers are not shown and the two questions end up on the first line. When you type the numbers yourself, it looks exactly like the sheet.

```text
$ printf '70\n490\n' | java ConsultantInvoice
Stunden: Kilometer: Arbeitskosten: 70 Stunden zu je 120.0 EUR = 8400.0
Fahrtkosten: 490 km zu je 0.75 EUR = 367.5
Gesamtkosten: 8767.5 EUR

$ printf '0\n0\n' | java ConsultantInvoice
Stunden: Kilometer: Arbeitskosten: 0 Stunden zu je 120.0 EUR = 0.0
Fahrtkosten: 0 km zu je 0.75 EUR = 0.0
Gesamtkosten: 0.0 EUR

$ printf '1\n1\n' | java ConsultantInvoice
Stunden: Kilometer: Arbeitskosten: 1 Stunden zu je 120.0 EUR = 120.0
Fahrtkosten: 1 km zu je 0.75 EUR = 0.75
Gesamtkosten: 120.75 EUR

$ printf '8\n120\n' | java ConsultantInvoice
Stunden: Kilometer: Arbeitskosten: 8 Stunden zu je 120.0 EUR = 960.0
Fahrtkosten: 120 km zu je 0.75 EUR = 90.0
Gesamtkosten: 1050.0 EUR
```

All four match the test examples. (Yes, "1 Stunden" is bad German. Fixing that needs an `if`, which comes in Übung 04.)

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Prices as normal variables | Works, but the sheet's requirement is missed | `final double HOURLY_RATE = 120.0;` |
| `final int HOURLY_RATE = 120;` | Output says `120 EUR` instead of `120.0 EUR` | Money with a dot → `double` |
| `new Scanner(System.in)` for every number | `NoSuchElementException` when the input is piped | One Scanner, used twice |
| `"Gesamtkosten: " + workCost + travelCost` | `8400.0367.5` (glued, not added) | Add in its own box first, or use brackets |
| `120.0` and `0.75` typed again in the text | Bill shows old prices after a price change | Use the constants in the text too |
| Missing spaces inside the quotes | `70Stunden zu je120.0` | Spaces belong inside the `"..."` |

Back to [Aufgabe 03_1](../README.md).
