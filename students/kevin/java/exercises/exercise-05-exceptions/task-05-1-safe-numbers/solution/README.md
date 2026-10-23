# Sample solution · Task 05_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac SafeNumbers.java
java SafeNumbers
```

## How it works, step by step

1. Three counters start at `0`: `sum`, `valid`, `invalid`. They are the clerk's tally sheet.
2. Each token gets its own `try`. `Integer.parseInt(token)` is the risky line: a real number comes back, anything else throws `NumberFormatException`.
3. No alarm → the two lines after it run: the value joins `sum`, `valid` grows. Alarm → Java jumps straight to `catch`: the token is refused with `skip: <token>`, `invalid` grows. Either way the loop serves the next line.
4. `"-5"` parses fine — the minus sign belongs to the number — so negatives count as valid.
5. After the loop the three report lines print in the fixed order: sum, valid, invalid.

**Test run**

```text
4
10
abc
-5
3
```

```text
skip: abc
sum: 8
valid: 3
invalid: 1
```

| Input | Output |
|-------|--------|
| `3` / `7` `-2` `20` | `sum: 25` / `valid: 3` / `invalid: 0` (no skip lines) |
| `1` / `xyz` | `skip: xyz` / `sum: 0` / `valid: 0` / `invalid: 1` |
| `0` | `sum: 0` / `valid: 0` / `invalid: 0` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| No try/catch at all | red text: `Exception in thread "main" java.lang.NumberFormatException` | Wrap the parse in `try`; handle the alarm in `catch` |
| Catching, then stopping | the first bad token ends the run | The catch prints its line; the loop simply continues |
| Printing the exception's own message | `skip: For input string: "abc"` | Print your token: `"skip: " + token` |
| Growing only one counter | report lines disagree with the input | Grow `sum`/`valid` or `invalid` on every single line |
| Report lines in the wrong order | `valid:` before `sum:` | The order is fixed: sum, valid, invalid |

Back to [Task 05_1](../README.md).
