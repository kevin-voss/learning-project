# Sample solution · Task 04_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac DateCheck.java
```

```bash
java DateCheck
```

## How it works, step by step

1. Read day, month, year as `int`s.
2. **Leap year** in one line: `(year % 4 == 0 && year % 100 != 0) || year % 400 == 0`. Read it out loud: "divisible by 4 and not by 100, **or** divisible by 400".
3. **Last day of the month** with a `switch`. Several `case`s share one answer. `break` stops the fall-through. February has a small `if` inside. `default` gives `0` for months that do not exist.
4. **Valid:** `month >= 1 && month <= 12 && day >= 1 && day <= lastDay`. Because a wrong month gives `lastDay = 0`, no day can pass anyway. The month check stays in, so the code says exactly what the sheet says.
5. An `if / else` prints one of two sentences.

**Test run**

```text
Day: 29
Month: 2
Year: 2024
29.2.2024 is a valid date.
```

| Input | Output |
|-------|--------|
| 29 2 2023 | 29.2.2023 is NOT a valid date. |
| 29 2 1900 | 29.2.1900 is NOT a valid date. |
| 29 2 2000 | 29.2.2000 is a valid date. |
| 31 4 2025 | 31.4.2025 is NOT a valid date. |
| 30 4 2025 | 30.4.2025 is a valid date. |
| 31 12 2025 | 31.12.2025 is a valid date. |
| 0 5 2025 | 0.5.2025 is NOT a valid date. |
| 15 13 2025 | 15.13.2025 is NOT a valid date. |
| 32 1 2025 | 32.1.2025 is NOT a valid date. |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Forgot `break` in `switch` | April gets 28 days | One `break` after every group |
| `=` instead of `==` in an `if` | Compile error | `=` puts in, `==` compares |

Back to [Task 04_3](../README.md).
