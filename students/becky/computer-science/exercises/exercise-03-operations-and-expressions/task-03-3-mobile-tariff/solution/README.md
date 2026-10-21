# Sample solution · Task 03_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac MobileTariff.java
```

```bash
java MobileTariff
```

Or all at once, without typing:

```bash
printf '7\n150\n' | java MobileTariff
```

## How it works, step by step

1. **Every tariff value is a `final` constant**, with its unit in the name or the comment: `MONTHLY_FEE = 9.95`, `FREE_GB = 5`, `DATA_STEP_MB = 500`, `PRICE_PER_DATA_STEP = 2.95`, `FREE_MINUTES = 100`, `PRICE_PER_MINUTE = 0.09` (9 cent, written in EUR like everything else), plus `MB_PER_GB = 1000` and `MONTHS_PER_YEAR = 12`.
2. **Read GB and minutes** as `int`. Both are per month.
3. **Extra use in one month:** `extraGb = gigabytes - FREE_GB`, `extraMinutes = minutes - FREE_MINUTES`. The free amounts are a **monthly** gift, so they are taken away while we are still in "one month". Multiplying by 12 first and then taking away 5 GB once would give the free amount only once a year.
4. **Units:** GB → MB → 500-MB blocks: `extraGb * MB_PER_GB / DATA_STEP_MB`. 2 extra GB = 2000 MB = 4 blocks. `*` and `/` have the same rank, so Java works from left to right: first 2 × 1000, then ÷ 500. `int / int` is fine here, because whole GB always make whole blocks. So one extra GB costs 2 × 2.95 = 5.90 EUR.
5. **One month:** `MONTHLY_FEE + extraDataSteps * PRICE_PER_DATA_STEP + extraMinutes * PRICE_PER_MINUTE`. Times before plus: both multiplications happen first, then the three parts are added.
6. **One year:** `monthlyCost * MONTHS_PER_YEAR`.
7. **No digits after the dot:** `(int) yearlyCost` chops them off. 119.4 → 119.

**Chop or round?** Worked out exactly, the nine rows of the sheet are 119.4, 173.4, 227.4, 261.0, 315.0, 369.0, 473.4, 527.4 and 581.4. Every one ends in `.0` or `.4`, so chopping with `(int)` and rounding the shop way (`(int) (yearlyCost + 0.5)`, like in 03_2) give **the same** table. The sheet only says "without decimal places" and "rough estimate", so the solution uses the plain cast. They differ only for inputs like 5 GB and 105 minutes (124.8: chop → 124, round → 125).

**Test run**

The input comes in through the pipe, so the typed numbers are not shown and both questions end up on one line.

```text
$ printf '5\n100\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 119 EUR
$ printf '5\n150\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 173 EUR
$ printf '5\n200\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 227 EUR
$ printf '7\n100\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 261 EUR
$ printf '7\n150\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 315 EUR
$ printf '7\n200\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 369 EUR
$ printf '10\n100\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 473 EUR
$ printf '10\n150\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 527 EUR
$ printf '10\n200\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 581 EUR
$ printf '6\n100\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 190 EUR
$ printf '5\n101\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 120 EUR
$ printf '8\n130\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 364 EUR
```

All nine rows of the sheet's table and the three extra rows match.

## Reflection: why is it wrong below 5 GB or 100 minutes?

```text
$ printf '3\n100\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: -22 EUR
$ printf '5\n50\n' | java MobileTariff
Data volume per month in GB: Phone minutes per month: Yearly cost: 65 EUR
```

With 3 GB, `extraGb = 3 - 5 = -2`. The program happily calculates "−2 GB extra", that is −4 blocks × 2.95 EUR = **−11.80 EUR** per month. The customer gets **money back** for data they did not use, and the yearly bill even drops below zero. Same with 50 minutes: −50 × 0.09 = −4.50 EUR per month, so the bill drops from 119 to 65 EUR.

In real life the free amount is a **floor**: below it you pay the fee, nothing less. The formula does not know that, because it always subtracts. To say "if the extra amount is negative, use 0 instead" the program has to **make a choice**, and choices are what exercise 04 (`if`) is about:

```java
// exercise 04 — just a teaser, not part of this solution
if (extraGb < 0) {
    extraGb = 0;
}
```

(Java also has a ready-made helper for it, `Math.max(0, gigabytes - FREE_GB)`: "take the bigger of the two". It is not part of exercise 03, so the solution leaves it out.)

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Input × 12 first, then minus the free amount | 5 GB / 100 min gives far more than 119 | Free amounts are per month: subtract first, × 12 last |
| 2.95 per **GB** instead of per 500 MB | 7 GB / 100 min gives 190 instead of 261 | 1 GB = 2 blocks of 500 MB |
| `PRICE_PER_MINUTE = 9` | 5 GB / 150 min gives 5519 | 9 cent = `0.09` EUR |
| Printing the extra costs instead of the total | 5 GB / 100 min gives 0 | Print the box with fee + extras |
| Printing the `double` | `119.39999999999999` | `(int)` cast at the end |
| `(int)` on every part before adding | Up to a few euros too little | Cast once, at the very end |

Back to [Task 03_3](../README.md).
