# Sample solution · Task 05_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac ValueTable.java
```

```bash
java ValueTable
```

## How it works, step by step

1. Read start, stop and step as `double`s (so a step like `0.5` works).
2. The `for` walks `x` from start to stop: keep going while `x <= stop`, then add step.
3. At every stop: `fx = x * x + 3 * x - 1`.
4. Print `f(…) = …`. If `x` is a whole number, print it without `.0` so it matches the sheet (`f(0)`, not `f(0.0)`).

**Test run**

```text
Start x: 0
Stop x: 10
Step x: 1
f(0) = -1.0
f(1) = 3.0
f(2) = 9.0
f(3) = 17.0
f(4) = 27.0
f(5) = 39.0
f(6) = 53.0
f(7) = 69.0
f(8) = 87.0
f(9) = 107.0
f(10) = 129.0

Start x: 0
Stop x: 4
Step x: 2
f(0) = -1.0
f(2) = 9.0
f(4) = 27.0

Start x: 0
Stop x: 1
Step x: 0.5
f(0) = -1.0
f(0.5) = 0.75
f(1) = 3.0
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `x < stop` instead of `<=` | Last value missing | Stop counts too |
| `int` for step | `0.5` will not work | Use `double` |
| `x * x + 3 * x + 1` | Wrong sign on the constant | Minus 1 at the end |
| Endless loop | Program never stops | Step must not be 0 |

Back to [Task 05_1](../README.md).
