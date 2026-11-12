# Sample solution · Task 08_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

```bash
javac TotalPriceWithVat.java
java TotalPriceWithVat
```

## How it works, step by step

1. **`roundCommercial`** — multiply by 10², `Math.round`, divide back (2 places for money).
2. **`totalPrice` (3 args)** — net × qty × (1 + VAT/100), then round.
3. **Two-arg overload** — calls the three-arg version with VAT **19**.
4. **One-arg overload** — quantity **1** and VAT **19**.
5. **`main`** prints one line per overload plus the 7 % rounding check.

**Test run**

```text
3-arg: 11.9
2-arg: 59.5
1-arg: 9.52
round: 3.56
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Three separate formulas | Drift when VAT rules change | Short overloads **call** the long one |
| Round too early | Wrong cents on 1.11 × 3 × 7 % | Round **once** on the final gross |
| VAT as 0.19 in `(1 + vat)` | Totals 100× too small | Divide percent by 100 |
