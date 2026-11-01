# Sample solution · Task 06_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac RevenueStatistics.java
```

```bash
java RevenueStatistics
```

## How it works, step by step

1. Ask how many months. If the count is below 1, print `Invalid month count.` and `return` — no array, no stats.
2. `new double[count]` creates one box per month.
3. A `for` loop from 1 to `count` asks each month and stores at `revenue[month - 1]`.
4. Walk the array once: add to **sum**, track **min** and **max**. Start min and max at `revenue[0]`, not at 0, so a month with 800 is not beaten by zero.
5. **Average** is `sum / count`. Because the values are `double`, Java divides in floating point.
6. Print the five lines with the exact labels from the task.

**Test run**

```text
How many months? 3
Revenue for month 1: 1000
Revenue for month 2: 1500
Revenue for month 3: 800
Period size: 3
Total revenue: 3300.0
Minimum monthly revenue: 800.0
Maximum monthly revenue: 1500.0
Average monthly revenue: 1100.0

How many months? 0
Invalid month count.
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `min = 0` before the loop | Minimum stays 0 | Start from `revenue[0]` |
| `int[]` for money | Average truncated | Use `double[]` or cast when dividing |
| Integer division for average | 3300/3 = 1100 but wrong type | Keep sum in `double` |

Back to [Task 06_2](../README.md).
