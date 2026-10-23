# Sample solution · Task 06_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac BoxedTwins.java
java BoxedTwins
```

## How it works, step by step

1. The one input line splits into two numbers. Each goes into an `Integer` box with `Integer.valueOf(...)` — an `Integer` is a **wrapper**, the box around an `int`, and it is an object: it has methods, it lives somewhere in memory.
2. `a.equals(b)` compares the numbers **inside** the boxes. This is the rule from the whole exercise: compare objects by content with `equals`.
3. `a == b` compares the **boxes** themselves — same address in memory or not. Both prints need parentheses: `"==: " + (a == b)`, because `+` would otherwise glue first and compare text with a box.
4. `cached` checks the **Integer cache**: Java keeps one shared shelf of boxes for `-128` to `127`. Both numbers on the shelf → the `==` line said `true` because both variables hold literally the same box. One number off the shelf (128 and up, or below -128) → fresh boxes, `==` says `false` although the numbers are equal.
5. The three lines always print, in this order — `equals`, `==`, `cached` — six different stories with the same three sentences.

**Test run**

```text
128 128
```

```text
equals: true
==: false
cached: no
```

| Input | Output |
|-------|--------|
| `127 127` | `equals: true`, `==: true`, `cached: yes` |
| `-128 -128` | `equals: true`, `==: true`, `cached: yes` |
| `-129 -129` | `equals: true`, `==: false`, `cached: no` |
| `5 6` | `equals: false`, `==: false`, `cached: yes` |
| `1000 2000` | `equals: false`, `==: false`, `cached: no` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `int a = ...` instead of `Integer a` | `a.equals` does not compile — an `int` has no methods | Box the numbers: `Integer a = Integer.valueOf(...)` |
| `"==: " + a == b` | does not compile: text compared with a box | Parentheses first: `"==: " + (a == b)` |
| Checking the border as `v > -128 && v < 127` | `-128 -128` prints `cached: no` | The borders count: `v >= -128 && v <= 127` |
| `cached` checked for only one number | `127 5000` wrongly prints `cached: yes` | Both numbers must sit on the shelf: check `a` and `b` |
| "Fixing" the `==` line to print `true` always | the test with `128 128` fails | The `false` is the point: show the trap, do not hide it |

Back to [Task 06_3](../README.md).
