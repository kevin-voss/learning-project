# Sample solution · Task 03_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac SignalTower.java
java SignalTower
```

## How it works, step by step

1. `Light` is the fixed menu of colours. `Light.valueOf("RED")` turns the typed word into the constant — it cannot fail, because the sheet promises only these three words arrive.
2. `actionFor` computes the action with a **switch expression**: the whole `switch` is an expression that hands back a String, so `return switch (light) { ... };` fills the answer in one go. Picture a vending machine: press a colour, get the item — an ordinary switch would only light a lamp.
3. `case RED -> "stop";` is the arrow form: one answer per constant, no `break`. When a case needs more than one line, it gets a block `{ }` and hands the result back with `yield` — YELLOW looks at the cars and yields `clear` only above 10.
4. There is **no `default`**: the three constants are the whole menu, so the switch is exhaustive. The compiler checks the menu — add a colour to `Light` and it refuses to compile until the new colour gets a case.
5. `main` prints `light + ": " + action` per line, in input order. `n = 0` means the loop never runs: no output at all.

**Test run**

```text
3
RED 2
GREEN 7
YELLOW 20
```

```text
RED: stop
GREEN: go
YELLOW: clear
```

| Input | Output |
|-------|--------|
| `1` / `RED 0` | `RED: stop` |
| `1` / `GREEN 0` | `GREEN: go` |
| `1` / `YELLOW 3` | `YELLOW: stop` |
| `1` / `YELLOW 10` | `YELLOW: stop` — 10 is not more than 10 |
| `1` / `YELLOW 11` | `YELLOW: clear` |
| `3` / `RED 2` `GREEN 7` `YELLOW 20` | `RED: stop`, `GREEN: go`, `YELLOW: clear` |
| `0` | nothing |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `switch (light)` without assigning the result | the action never reaches the print | Let the switch hand the value back: `String action = switch (light) { ... };` |
| `case RED: return "stop";` mixed with `->` | does not compile: the two forms do not mix | Stay with arrows; hand values back with `yield` |
| `return "clear";` inside the YELLOW block | does not compile — an arrow case yields, it does not return | Write `yield "clear";` |
| Missing semicolon after the closing `}` of the switch | red text right at that line | The switch expression ends like a statement: `};` |
| A `default` case "to be safe" | compiles, but the compiler stops guarding you | Leave `default` out: listing all constants makes the switch exhaustive |
| `cars >= 10` for the clear case | `YELLOW 10` wrongly prints `clear` | "More than 10" is `cars > 10` |

Back to [Task 03_3](../README.md).
