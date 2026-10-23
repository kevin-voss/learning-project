# Money: BigDecimal, never double

> [!PICTURE]
> A **cash register with real coins**. Three coins of 10 cents are exactly 30 cents. A calculator that works in "roughly a third" would hand you 29.999… cents — nobody wants that at the till.

## The idea

`double` stores binary fractions. `0.1` has no exact binary form, so cents drift:

```java
System.out.println(0.1 + 0.2);        // 0.30000000000000004
System.out.println(2.99 * 3);         // 8.969999999999999
```

For money use one of two exact tools:

1. **Whole cents in `int` / `long`** — simplest. `299 * 3 = 897` cents. Format at the end.
2. **`BigDecimal`** — exact decimals with a scale (number of decimal places) and an explicit rounding rule. Use it when prices come as text with decimals, or for rates and taxes.

```java
import java.math.BigDecimal;
import java.math.RoundingMode;

BigDecimal price = new BigDecimal("2.99");    // from TEXT, never from a double
BigDecimal total = price.multiply(BigDecimal.valueOf(3));     // 8.97
BigDecimal withVat = total.multiply(new BigDecimal("1.19"))
                          .setScale(2, RoundingMode.HALF_UP); // 10.67
System.out.println(withVat);                   // 10.67
```

- `new BigDecimal("2.99")` is exact. `new BigDecimal(2.99)` copies the double's error — **never** do that.
- `add`, `subtract`, `multiply`, `divide` return new values; the old ones never change.
- `setScale(2, RoundingMode.HALF_UP)` fixes two decimals with school rounding.
- `divide` needs a scale and rounding or it throws on `1/3`.
- Compare with `compareTo`, not `equals` (`2.50` and `2.5` are `equals`-different but `compareTo`-equal).

> [!TRY]
> 1. Print `new BigDecimal("0.1").add(new BigDecimal("0.2"))`.
> 2. Print `new BigDecimal(0.1)` (the double constructor) and look at the tail.
>
> You should see: `0.3`, then a long ugly number.

> [!WARN]
> `BigDecimal` is slower than `int`. For a shop with whole cents, counting cents in a `long` is both exact and fast. Reach for `BigDecimal` when decimals or rates are part of the input.

> [!CHECK]
> 1. Which constructor for a price typed by a user?
>    <details><summary>Answer</summary>The <code>String</code> one: <code>new BigDecimal("2.99")</code>.</details>
> 2. What does `setScale(2, RoundingMode.HALF_UP)` do?
>    <details><summary>Answer</summary>Rounds to two decimal places, 5 rounds up.</details>

**Next:** [Collectors](collectors.md)
