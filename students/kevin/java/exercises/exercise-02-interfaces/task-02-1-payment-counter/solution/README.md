# Sample solution · Task 02_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac PaymentCounter.java
java PaymentCounter
```

## How it works, step by step

1. `Payment` promises `name()` and ships a **default** `receipt(cents)` that uses that name. The "paid … by …" sentence is written exactly once.
2. `Card` and `Cash` keep the promise with one line each: their `name()`. They inherit `receipt` untouched.
3. `Coupon` also gives a `name()` (the promise is a must) and **overrides** `receipt` with its own sentence.
4. `create` picks the class from the method word. `main` holds the result in a `Payment` variable and calls `receipt` — Java runs the coupon version for coupons, the default for the rest.
5. A plain `int total` adds up the cents; one last `println` prints it.

**Test run**

```text
2
card 450
coupon 300
```

```text
paid 450 cents by card
coupon for 300 cents
total: 750 cents
```

| Input | Output |
|-------|--------|
| `1` / `cash 100` | `paid 100 cents by cash` / `total: 100 cents` |
| `1` / `coupon 300` | `coupon for 300 cents` / `total: 300 cents` |
| `0` | `total: 0 cents` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `String name()` without `public` in a class | "attempting to assign weaker access privileges" | Interface methods are public: `public String name()` |
| Receipt text copied into `Card` and `Cash` | works, but three copies of one sentence | Leave `receipt` to the default; override only in `Coupon` |
| `Coupon` forgets `name()` | "Coupon is not abstract and does not override name()" | Every implementing class must keep **every** promise |
| Printing with `if (method.equals("coupon"))` | works, learns nothing | Decide the class once in `create`; print through `Payment` |

Back to [Task 02_1](../README.md).
