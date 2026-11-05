# Sample solution · Task 07_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac Info.java
```

```bash
java Info
```

## How it works, step by step

1. `info` is `void` — it only prints, it does not `return` a value.
2. The parameter `x` is a copy of whatever the caller passed (`1`, `2`, …).
3. Each `println` builds one line with `+` and the formulas `x * x` and `x * x * x`.
4. `main` calls `info` five times so the automated tests can also check `0` and a negative number.

**Test run (first three calls — the sheet's example)**

```text
Number = 1
Square = 1
Cube = 1
Number = 2
Square = 4
Cube = 8
Number = 3
Square = 9
Cube = 27
Number = 0
Square = 0
Cube = 0
Number = -2
Square = 4
Cube = -8
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Forgot `static` on `info` | "non-static method …" from `main` | Write `static void info` |
| Only one `*` for cube | Cube of 3 is 9 | Use `x * x * x` |
| Method never called | No output | Call `info(...)` from `main` |
| Wrong labels | Tests look for `Number =` | Match the task's English labels |
