# Sample solution · Task 01_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac OvertimePay.java
java OvertimePay
```

## How it works, step by step

1. `Worker.pay` owns the hourly math: `Math.min(hours, 40)` normal hours plus the overtime hours at `30`.
2. `Manager.pay` does **not** repeat that math. It calls `super.pay(hours)` and adds the flat `100`. One rule lives in one place.
3. `main` stores each line's person in a `Worker` variable. Calling `pay` on it finds the `Manager` version when the object is a manager — polymorphism again.
4. `Math.min(hours, 40)` keeps the border clean: at exactly 40 hours the overtime part is `0`.

**Test run**

```text
3
ana worker 10
cy manager 10
ben worker 50
```

```text
ana gets 200 credits
cy gets 300 credits
ben gets 1100 credits
```

| Input | Output |
|-------|--------|
| `1` / `ben worker 40` | `ben gets 800 credits` |
| `1` / `ben worker 41` | `ben gets 830 credits` |
| `1` / `cy manager 40` | `cy gets 900 credits` |
| `1` / `dee worker 0` | `dee gets 0 credits` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Manager copies the worker formula | right answers, wrong lesson | `return super.pay(hours) + 100;` |
| Overtime at exactly 40 | `ben worker 40` prints 830 | Overtime counts hours **above** 40 |
| `if (w instanceof Manager)` when printing | works but noisy | Just call `pay` through the `Worker` variable |
| Whole line pay for manager without worker base | `cy manager 40` prints 100 | The bonus is **on top of** worked pay |

Back to [Task 01_2](../README.md).
