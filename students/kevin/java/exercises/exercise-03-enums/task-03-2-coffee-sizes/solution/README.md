# Sample solution · Task 03_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac CoffeeSizes.java
java CoffeeSizes
```

## How it works, step by step

1. `Size` is an **enum with fields**. Each constant names its own code, volume and price: `S("S", 200, 150)` runs the constructor once and fills the fields of `S`.
2. `find` loops over `Size.values()` — every constant, in menu order. A matching code gives back the constant; no match ends the loop, so it returns `null`. No exception anywhere.
3. `main` splits each line into code and count. Known code: the amount is `count * size.priceCents` — the price comes from the enum, so `150`, `200` and `250` appear exactly once in the whole file.
4. Unknown code: print the line and add nothing. Count `0`: the order line still prints, with `= 0 cents`.
5. The total line prints **after** the loop, always — also after zero lines or only unknown codes.

**Test run**

```text
3
S 2
M 1
XL 1
```

```text
order: 2 x S = 300 cents
order: 1 x M = 200 cents
unknown size: XL
total: 500 cents
```

| Input | Output |
|-------|--------|
| `1` / `S 1` | `order: 1 x S = 150 cents`, `total: 150 cents` |
| `1` / `M 2` | `order: 2 x M = 400 cents`, `total: 400 cents` |
| `2` / `S 1` `XL 1` | `order: 1 x S = 150 cents`, `unknown size: XL`, `total: 150 cents` |
| `1` / `L 0` | `order: 0 x L = 0 cents`, `total: 0 cents` |
| `0` | `total: 0 cents` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `s.code == token` | the size is never found, every line is unknown | Compare Strings with `.equals` |
| Prices in an `if (code.equals("S"))` chain | works, but the menu lives twice | Keep the prices in the enum; use `size.priceCents` |
| `Size.valueOf(token)` on `XL` | the program dies with an exception | Loop over `values()` and return `null` when nothing matches |
| Skipping the order line for count `0` | the `= 0 cents` line is missing | Count `0` is a normal order; it prints |
| Total only when there were orders | `0` prints nothing | The total line goes after the loop, unconditionally |

Back to [Task 03_2](../README.md).
