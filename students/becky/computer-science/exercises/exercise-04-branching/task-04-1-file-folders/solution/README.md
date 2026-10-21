# Sample solution · Task 04_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac FolderOrder.java
```

```bash
java FolderOrder
```

## How it works, step by step

1. The four numbers from the sheet go into `final` boxes, so nobody changes them by accident and the code reads like the sheet.
2. Read the quantity. Less than 1? Say so and stop (`return` ends `main` early).
3. **The discount staircase** asks `>= 200` first, then `>= 100`, then `>= 50`, else `0.0`. Java takes the first true step, so the biggest discount must be on top.
4. `net = quantity * LIST_PRICE * (1 - discount)` — "take 3 % away" is "keep 97 %".
5. `gross = net * (1 + VAT)` — "add 19 %" is "pay 119 %".
6. Shipping: the sheet says free only **above** 1000. So we add it when `gross <= 1000`. Exactly 1000.00 EUR still pays shipping.
7. Round: `Math.round(total * 100) / 100.0`. Times 100 turns euros into cents, round to whole cents, back to euros.
8. `printf(Locale.US, "%.2f")` always prints two decimals (`218.87`, never `218.9`), and `Locale.US` makes it a dot even on a computer set to a language that writes a comma (`1041,53`).

The sheet's example, by hand: 80 × 9.99 = 799.20 → minus 1 % = 791.208 → plus 19 % = 941.53752 → not above 1000, so + 99.99 = 1041.52752 → **1041.53**.

**Test run**

```text
How many folders? 80
Price: 1041.53 EUR

How many folders? 49
Price: 682.51 EUR

How many folders? 99
Price: 1165.15 EUR

How many folders? 100
Price: 1153.15 EUR

How many folders? 200
Price: 2258.74 EUR

How many folders? 0
Please order at least 1 folder.
```

Funny detail: 100 folders are **cheaper** than 99. Both skip shipping, but 99 only gets 1 % off while 100 gets 3 %. Real shops have these jumps too.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Discount staircase starts with `>= 50` | 250 folders get only 1 % | Biggest number first |
| `/ 100` instead of `/ 100.0` | Price without cents | Use `100.0` |
| Shipping checked before VAT | 99 folders still pay shipping | Check `gross`, not `net` |
| `>` vs `>=` mixed up | 50 folders get no discount | "from 50" = `>= 50`, "above 1000" = `> 1000` |
| `=` instead of `==` in an `if` | Compile error | `=` puts in, `==` compares |

Back to [Task 04_1](../README.md).
