# Sample solution · Task 11_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac ExactMoney.java
java ExactMoney
```

## How it works, step by step

1. Every price is built with `new BigDecimal(parts[1])` — from **text**. The constructor from `double` would copy the rounding error of `2.99` into the till.
2. The till starts at `new BigDecimal("0.00")`, not `BigDecimal.ZERO`: with zero scale it would print `total: 0`, and the note must show `0.00`.
3. `lineTotal` multiplies the price by the quantity (`BigDecimal.valueOf(qty)`) and rounds with `setScale(2, RoundingMode.HALF_UP)` — cents, school rounding.
4. `total = total.add(line)` because a `BigDecimal` never changes: `add` hands back a new value, like `plusDays` does.
5. `withVat` multiplies the total by `1.19` (also from text) and rounds HALF_UP back to cents: `1.25 → 1.4875 → 1.49`.
6. Printing uses `toPlainString()`, so the amount always shows plain digits.

**Test run**

```text
3
pen 2.99 3
book 12.50 1
ink 3.20 2
```

```text
pen: 8.97
book: 12.50
ink: 6.40
total: 27.87
with vat: 33.17
```

| Input | Output |
|-------|--------|
| `2` / `stamp 0.10 1` / `coin 0.20 1` | `stamp: 0.10`, `coin: 0.20`, `total: 0.30` and `with vat: 0.36` |
| `1` / `toy 0.25 5` | `toy: 1.25`, `total: 1.25` and `with vat: 1.49` |
| `1` / `bag 4.50 0` | `bag: 0.00`, `total: 0.00` and `with vat: 0.00` |
| `0` | `total: 0.00` and `with vat: 0.00` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `new BigDecimal(2.99)` (the double) | long tails like `2.989999...` | From text only: `new BigDecimal("2.99")` |
| `double` for prices | `0.1 + 0.2` prints `0.30000000000000004` | Every amount is a `BigDecimal` |
| Total starts at `BigDecimal.ZERO` | an empty note prints `total: 0` | Start at `new BigDecimal("0.00")` |
| Printing without `setScale` | `with vat: 0.3570` | `setScale(2, RoundingMode.HALF_UP)` before printing |
| Rounding with `HALF_DOWN` or cutting | `1.4875` becomes `1.48` | `RoundingMode.HALF_UP`: 5 rounds up |
| `total.add(line);` alone | the total stays `0.00` | `total` is immutable: `total = total.add(line);` |

Back to [Task 11_2](../README.md).
